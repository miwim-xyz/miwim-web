# Miwim — MVP Technical Plan

**Goal**: In 9 weeks (Week 0 + 8 build weeks), validate demand, build the minimum viable product, and bring real traction data to investor conversations.

---

## Business Architecture: Backbone + Edge Dual-Track

Miwim operates two distinct product lines sharing the same decentralized supply infrastructure:

| | Miwim Backbone | Miwim Edge |
|---|---|---|
| **Node type** | Datacenter VPS only | Residential home broadband only |
| **Target user** | C-end — consumers who need VPN/proxy for daily use | B/Pro-end — e-commerce, scraping, anti-detection |
| **Value prop** | Low latency, high bandwidth, one-tap connect | Genuine residential IPs, high purity, anti-fingerprint |
| **Pricing** | Monthly subscription, $8-15/mo | Per-GB premium, $1-3/GB |
| **Margin** | Lower, volume-driven | Higher, value-driven |
| **Routing** | Single-hop (fast mode) or multi-hop (private mode) | Always multi-hop via reverse tunnel through relay |
| **Cross-sell** | Backbone users can pay per-session for Edge IPs | Edge clients can use Backbone for non-sensitive traffic |

Both product lines share: the same Android app (mode toggle), the same backend platform, the same provider agent, the same token economy. The split is in routing logic and pricing, not in infrastructure.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      MIWIM PLATFORM BACKEND                      │
│                                                                 │
│  ┌──────────┐  ┌──────────────┐  ┌─────────────────────────┐   │
│  │ Node     │  │ Subscription │  │ Config Generator         │   │
│  │ Registry │  │ API          │  │ (Backbone / Edge configs) │   │
│  └────┬─────┘  └──────┬───────┘  └───────────┬─────────────┘   │
│       │               │                      │                 │
│  ┌────┴───────────────┴──────────────────────┴──────┐          │
│  │              PostgreSQL + Redis                   │          │
│  └───────────────────────────────────────────────────┘          │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │ Health Monitor   │  │ Analytics        │                    │
│  │ (Prometheus)     │  │ (Grafana)        │                    │
│  └──────────────────┘  └──────────────────┘                    │
└────────┬────────────────────┬──────────────────┬────────────────┘
         │                    │                  │
  ┌──────┴──────┐   ┌────────┴────────┐  ┌──────┴──────┐
  │ DC Provider │   │ Residential     │  │ Android     │
  │ Agent (Go)  │   │ Agent (Go)      │  │ App (Kotlin)│
  │ Backbone    │   │ Reverse tunnel  │  │ Singbox lib │
  │ relay/exit  │   │ to relay → Edge │  └─────────────┘
  └─────────────┘   └─────────────────┘
```

**Key change**: Residential agents initiate **outbound reverse tunnels** to relay nodes (not inbound connections). This bypasses home NAT/CGNAT/firewall without any router configuration by the provider.

---

## Tech Stack

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Provider agent | Go + Singbox core | Performance, single binary, native Singbox integration |
| Backend API | Go (Fiber framework) | Fast, lightweight, same language as agent |
| Database | PostgreSQL | Reliable, good for relational data (users, nodes, subscriptions) |
| Cache | Redis | Health score cache, session management, rate limiting |
| Monitoring | Prometheus + Grafana | Industry standard, provider agent exposes /metrics |
| Reverse proxy | Caddy | Auto-HTTPS, simple config, good for MVP |
| Deployment | Docker + docker-compose | Simple orchestration, no K8s needed for MVP |
| Android app | Kotlin + Singbox library | Already built — modify to connect to backend |

---

## Database Schema (MVP)

```sql
-- Node registry
CREATE TABLE nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id UUID REFERENCES providers(id),
    ip VARCHAR(45) NOT NULL,
    port INTEGER NOT NULL,
    country VARCHAR(2) NOT NULL,        -- ISO 3166-1 alpha-2
    city VARCHAR(100),
    protocol VARCHAR(20) NOT NULL,       -- shadowsocks, vmess, trojan, etc.
    protocol_config JSONB NOT NULL,      -- protocol-specific config
    health_score DECIMAL(5,2) DEFAULT 0, -- 0-100
    status VARCHAR(20) DEFAULT 'pending', -- pending, active, degraded, offline
    last_heartbeat TIMESTAMPTZ,
    total_bandwidth_gb DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Providers (node operators)
CREATE TABLE providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100),
    email VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    total_nodes INTEGER DEFAULT 0,
    total_bandwidth_served_gb DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (C-end)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    subscription_token VARCHAR(64) UNIQUE NOT NULL, -- used in subscribe URL
    plan VARCHAR(20) DEFAULT 'free',  -- free, basic, premium
    status VARCHAR(20) DEFAULT 'active',
    preferred_country VARCHAR(2),
    traffic_used_gb DECIMAL(10,2) DEFAULT 0,
    traffic_limit_gb DECIMAL(10,2) DEFAULT 100,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Connection logs (for analytics)
CREATE TABLE connection_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    node_id UUID REFERENCES nodes(id),
    connected_at TIMESTAMPTZ DEFAULT NOW(),
    disconnected_at TIMESTAMPTZ,
    bytes_up BIGINT DEFAULT 0,
    bytes_down BIGINT DEFAULT 0,
    avg_latency_ms INTEGER,
    disconnect_reason VARCHAR(50)
);

-- Node health history (for scoring)
CREATE TABLE node_health_logs (
    id BIGSERIAL PRIMARY KEY,
    node_id UUID REFERENCES nodes(id),
    checked_at TIMESTAMPTZ DEFAULT NOW(),
    latency_ms INTEGER,
    packet_loss DECIMAL(5,2),
    bandwidth_mbps DECIMAL(8,2),
    is_reachable BOOLEAN
);

-- Indexes
CREATE INDEX idx_nodes_country_status ON nodes(country, status);
CREATE INDEX idx_nodes_health ON nodes(health_score DESC) WHERE status = 'active';
CREATE INDEX idx_users_token ON users(subscription_token);
CREATE INDEX idx_conn_logs_user ON connection_logs(user_id, connected_at DESC);
CREATE INDEX idx_health_logs_node ON node_health_logs(node_id, checked_at DESC);
```

---

## Week-by-Week Plan

### Week 0: Landing Page + Demand Validation (runs parallel with setup)

**Goal**: Validate demand from both sides of the marketplace before writing product code. Get waitlist signups + genesis node commitments + intent data.

#### Tasks

**1. Ship a minimal landing page (2-3 days max)**
- Web3-style dark theme, single page scroll
- Sections: Hero → Problem/Solution → How it works → Two CTAs
- Deploy on Vercel with custom domain (miwim.io or miwim.network)
- Do NOT spend more than 3 days on this — ugly but live beats beautiful but delayed

**2. Set up dual waitlist funnel**
- **User waitlist** (top CTA): "Join the waitlist — get early access + airdrop eligibility"
  - Collect: email, country, current VPN/proxy spend, biggest pain point
- **Genesis Node signup** (second CTA): "Run a genesis node — earn founding provider rewards"
  - Collect: email, server location, datacenter or home broadband, approximate bandwidth, IP count
- Use Tally.so or Typeform — zero backend needed

**3. Create social presence**
- Twitter/X: @miwim_network — post 2-3x/week about DePIN, proxy market, project updates
- Telegram: Miwim Community group — for waitlist members and genesis node applicants
- Optional: Discord if team bandwidth allows

**4. Seed initial traffic**
- Post in: DePIN communities, V2EX proxy threads, Telegram 机场 groups, r/selfhosted, r/VPN
- Target: 200+ user waitlist signups, 30+ genesis node applications in first week
- The survey responses (not just email count) are the real value for investor conversations

**Deliverables**:
- [ ] Landing page live with dual waitlist
- [ ] Social channels active
- [ ] 200+ user signups with survey data
- [ ] 30+ genesis node applications with server details
- [ ] Supply map: "We have provider commitments in X countries"

---

### Week 1-2: Seed Node Network

**Goal**: 5-10 nodes across 3-5 countries, all reporting health to backend.

#### Tasks

**1. Deploy provider nodes (manual)**
- Target locations: US (West Coast), Japan, Singapore, Hong Kong, Germany
- Use existing VPS providers: Vultr, DigitalOcean, Bandwagon, or friends' servers
- Manual setup via SSH — don't build auto-registration yet
- Minimum spec per node: 1 vCPU, 512MB RAM, 500GB bandwidth/month

**2. Build provider agent v0.1**
```
provider-agent/
├── main.go              # Entry point
├── config.go            # Configuration (backend URL, node credentials)
├── singbox.go           # Start/manage Singbox process
├── heartbeat.go         # POST health data to backend every 30s
├── metrics.go           # Expose /metrics for Prometheus
└── install.sh           # One-liner installer for new nodes
```

Agent responsibilities:
- Start and manage Singbox server process
- Every 30 seconds: measure latency (ping 8.8.8.8), check port accessibility, report to backend via `POST /api/nodes/{id}/heartbeat`
- Expose Prometheus metrics endpoint on :9090/metrics
- Auto-restart Singbox if it crashes

**3. Set up backend (basic)**
- Deploy Go Fiber API server
- Endpoints needed:
  - `POST /api/nodes/register` — node self-registers
  - `POST /api/nodes/{id}/heartbeat` — health report
  - `GET /api/nodes` — list all nodes (internal)
- PostgreSQL for persistence, Redis for health score cache

**4. Health scoring v0.1**
- Cron job every 5 minutes
- Active check: ping each node, measure latency, test port accessibility
- Score formula: `health_score = uptime_pct * 0.4 + (100 - latency_rank) * 0.3 + bandwidth_rank * 0.3`
- Threshold: score < 30 → mark as `degraded`, unreachable for 10 min → `offline`

**Deliverables**:
- [ ] 5+ nodes deployed across 3+ countries
- [ ] Provider agent running on all nodes, heartbeating to backend
- [ ] Backend API receiving and storing health data
- [ ] Basic health scoring running

---

### Week 3-4: App Integration & Routing

**Goal**: End-to-end flow works — user opens app, connects, traffic routes through decentralized network.

#### Tasks

**1. Smart routing v0.1**
```
Algorithm:
1. User requests connection (country preference optional)
2. Query nodes WHERE status = 'active' AND (country = preference OR preference IS NULL)
3. Sort by health_score DESC
4. Return top 3 nodes as: primary + 2 fallbacks
5. Cache routing result in Redis (TTL: 5 min)
```

Endpoint: `GET /api/route?country=JP&user_id=xxx`
Returns: ordered list of node configs (primary + fallbacks)

**2. Config generator**
- Generates Singbox JSON config dynamically per user
- Includes primary node + 2 fallback nodes in outbound chain
- Endpoint: `GET /api/subscribe/{subscription_token}`
- Returns: valid Singbox JSON that the Android app can import

```json
{
  "outbounds": [
    {
      "type": "urltest",
      "tag": "auto",
      "outbounds": ["node-jp-1", "node-us-1", "node-sg-1"],
      "interval": "3m",
      "tolerance": 50
    },
    {
      "type": "shadowsocks",
      "tag": "node-jp-1",
      "server": "xxx.xxx.xxx.xxx",
      "server_port": 8388,
      "method": "2022-blake3-aes-128-gcm",
      "password": "..."
    }
  ]
}
```

**3. Connect Android app**
- Modify existing app to fetch config from backend
- User flow: Login → fetch subscription URL → auto-import config → display node list → one-tap connect
- Store subscription_token locally after login
- Auto-refresh config every 30 minutes (picks up new/updated nodes)

**4. Basic subscription flow (manual)**
- For MVP: user signs up via app, you manually approve in database
- Set `status = 'active'` and `plan = 'basic'` for approved users
- No payment integration needed — this is beta, everything is free

**Deliverables**:
- [ ] Smart routing returns best nodes per user
- [ ] Config generator produces valid Singbox configs
- [ ] Android app fetches config and connects successfully
- [ ] End-to-end: user opens app → one tap → connected via decentralized network

---

### Week 5-6: Beta Testing & Data Collection

**Goal**: 50-100 real users, 2 weeks of usage data.

#### Tasks

**1. Recruit beta testers (50-100)**
- Sources:
  - Telegram: DePIN communities, 机场 discussion groups, V2EX proxy threads
  - Twitter/X: DePIN-focused accounts, proxy/VPN discussion
  - Personal network: friends, crypto communities
- Offer: free access during beta, potential token airdrop for early users
- Create feedback channel: Telegram group or Discord

**2. Instrument everything**

Metrics to track (store in PostgreSQL + expose to Grafana):

| Metric | How | Target |
|--------|-----|--------|
| Daily active users (DAU) | Count unique user_ids in connection_logs per day | Track trend |
| Avg session duration | disconnected_at - connected_at per session | > 30 min |
| Connection success rate | successful connections / total attempts | > 95% |
| Avg latency per node | From health_logs | < 200ms for APAC nodes |
| Node switching frequency | Count reconnection events per user per day | < 3/day |
| Uptime per node | % of time node status = 'active' in 24h | > 95% |
| Total bandwidth served | Sum of bytes_up + bytes_down across all users | Track growth |
| Day-1/7 retention | % of users who connect again after 1/7 days | D1 > 60%, D7 > 30% |
| Countries accessed | Distinct target countries from DNS/connection logs | Coverage metric |

**3. Auto-failover v0.1**
- Singbox urltest outbound already handles failover at client level
- Backend enhancement: if primary node goes offline, push-update user config within 60s
- Target: < 3 second recovery time for user
- Log all failover events for analysis

**4. Simple analytics dashboard**
- Grafana dashboard with key metrics
- Panels: active nodes map, active users count, bandwidth served (24h), latency heatmap, uptime % per node
- Internal-only (not user-facing)

**Deliverables**:
- [ ] 50+ beta users actively using the app
- [ ] 2 weeks of clean usage data
- [ ] Grafana dashboard showing all key metrics
- [ ] Auto-failover working with < 3s recovery

---

### Week 7-8: Pitch Preparation

**Goal**: Pitch-ready deck with real data, working demo, investor target list.

#### Tasks

**1. Compile traction report**
One-pager with real numbers:
```
Miwim Beta Traction Report (as of [date])

Network:
- X active nodes across Y countries
- Z% average uptime over 2-week beta
- Average latency: Xms (APAC), Yms (Global)

Users:
- X total beta users
- X% Day-7 retention
- X average daily sessions
- X average session duration

Infrastructure:
- X TB total bandwidth served
- X connection success rate
- X average failover recovery time
```

**2. Record demo video (2 minutes)**
Script:
- 0:00 — Open app, show login
- 0:15 — Show node list (countries, health scores)
- 0:30 — One-tap connect
- 0:45 — Speed test (show real speeds)
- 1:00 — Switch to backend dashboard (Grafana)
- 1:15 — Show node map, health scores, active users
- 1:30 — Show uptime chart, bandwidth served
- 1:45 — "This is running on a decentralized network of X nodes across Y countries"

**3. Finalize pitch deck**
- Update Miwim_Pitch_Deck.pptx with real traction data
- Replace all placeholder metrics
- Add team slide with real bios and photos
- Add contact information

**4. Build investor target list (30-50 names)**
- Research each investor's portfolio for DePIN/infra overlap
- Identify warm intro paths (mutual connections, portfolio founders)
- Prepare personalized outreach for top 10 targets
- Draft cold outreach email template for remaining

**Deliverables**:
- [ ] Traction one-pager with real data
- [ ] 2-minute demo video
- [ ] Updated pitch deck
- [ ] Investor target list with outreach strategy

---

## What NOT to Build for MVP

| Feature | Why Not Now | When to Build |
|---------|------------|---------------|
| iOS / desktop apps | Time-consuming, Android proves the concept | Post-seed, Q4 2026 |
| Payment integration | Manual approval is fine for 50-100 users | Post-seed, before scaling |
| Token smart contracts | Not needed until network is validated | Q1 2027 |
| Auto node registration | Manual SSH setup is fine for 10 nodes | Post-seed, at 50+ nodes |
| White-label API | No B2B clients during beta | Post-seed, Q4 2026 |
| On-chain proof of bandwidth | Complex cryptography, not needed for MVP | Q1 2027 |
| DAO governance | Way too early | Q2 2027+ |
| Referral system | Nice-to-have, not MVP | Post-seed |
| Multi-protocol support | Singbox handles this well enough | Post-seed |

**Principle**: Every week spent on non-essential features is a week you're not in front of investors. The MVP only needs to prove three things: (1) decentralized nodes can reliably serve traffic, (2) users want this product, (3) the team can execute.

---

## Core Architecture: Four Key Technical Designs

The following four sections address the critical technical questions that investors will ask and that the engineering team must solve. These designs go beyond the MVP timeline but should be understood before fundraising.

---

### Design 1: Node Role Auto-Detection & Assignment

Nodes are not manually labeled — the provider agent automatically benchmarks the node at registration, and the platform assigns a role based on results.

#### Benchmark Suite (runs on agent startup, re-runs every 6 hours)

| Test | Method | Output |
|------|--------|--------|
| Latency matrix | Ping 10 target endpoints across CN, JP, US, EU, SG | Latency to each region in ms |
| Bandwidth | iperf3-style upload/download test to platform server | Up/down Mbps |
| IP type classification | Query ipinfo.io / ip2location API | `datacenter` or `residential` + ISP name |
| Route quality | Traceroute to CN/JP/US/EU targets | Hop count, path quality score |

#### Role Assignment Logic

```
IF ip_type == "residential" AND uptime_history > 90%:
    role = "residential_exit"    // Highest value — home IP traffic
    
ELIF ip_type == "datacenter" AND bandwidth > 100Mbps AND latency_to_CN < 50ms:
    role = "relay"               // High bandwidth relay near Chinese users
    
ELIF ip_type == "datacenter" AND latency_to_target_region < 30ms:
    role = "exit"                // Datacenter exit close to target websites
    
ELSE:
    role = "backup"              // Standby for failover pool
```

#### Key Principles
- Roles are **dynamic**, re-evaluated every 6 hours based on fresh benchmarks
- A single node can serve **multiple roles** simultaneously (e.g., relay for CN users + exit for JP users)
- Nodes with health_score < 30 are automatically removed from active duty
- Geographic scarcity bonus: roles in underserved regions earn higher token rewards

#### MVP Simplification
For the 8-week MVP, roles can be manually assigned based on known node locations. But the benchmark agent code should be built early — it's a key technical differentiator that investors will ask about.

---

### Design 2: Residential IP Routing Architecture (Miwim Edge)

Users never directly connect to residential nodes. All Edge (residential IP) traffic flows through a forced chain proxy with **reverse tunnel** architecture:

```
User (CN) ──TLS──> Relay (HK datacenter) ──reverse tunnel──> Residential Exit (US home) ──> Target website

Key: The residential node initiates the tunnel OUTBOUND to the relay.
     The relay does NOT connect inbound to the residential node.
     This bypasses home NAT/CGNAT/firewall — zero router config needed.

Target sees: Real US residential IP address
Relay sees:  User IP + encrypted blob (cannot see destination)
Exit sees:   Relay IP + destination (cannot see user identity)
```

#### Why Reverse Tunnel (Critical Design Decision)

Home broadband nodes sit behind CGNAT, dynamic IPs, and ISP firewalls. Inbound connections are nearly impossible without port forwarding (which most users can't or won't do). The reverse tunnel solves this:

1. Residential agent starts → initiates **outbound** VLESS/WS connection to assigned relay on port 443
2. This outbound connection looks like normal HTTPS traffic to the home ISP — no blocking
3. The tunnel stays persistent (24/7 keepalive)
4. When a user's traffic arrives at the relay, the relay forwards it **down** the existing tunnel to the residential exit
5. Residential exit processes the request and sends the response back through the same tunnel

**Protocol choice:**
- **MVP: VLESS over WebSocket (port 443)** — maximum compatibility with home networks, looks like HTTPS, ISPs won't block it
- **Future: WireGuard** — for high-performance providers who can configure it; kernel-level, lower overhead

This means the provider onboarding flow is: **download agent → run it → done.** No port forwarding, no router config, no technical knowledge needed. This is what makes the DePIN supply side scalable.

#### Singbox Config Structure (generated per user)

```json
{
  "outbounds": [
    {
      "type": "urltest",
      "tag": "edge-auto",
      "outbounds": ["chain-1", "chain-2", "chain-3"],
      "interval": "30s",
      "tolerance": 50
    },
    {
      "type": "chain",
      "tag": "chain-1",
      "outbounds": ["relay-hk-1", "residential-us-1"]
    },
    {
      "type": "shadowsocks",
      "tag": "relay-hk-1",
      "server": "relay-hk.miwim.io",
      "server_port": 8388,
      "method": "2022-blake3-aes-128-gcm",
      "password": "..."
    },
    {
      "type": "vless",
      "tag": "residential-us-1",
      "server": "10.0.0.x",
      "server_port": 443,
      "uuid": "...",
      "tls": { "enabled": true }
    }
  ]
}
```

Note: `residential-us-1` server address is the relay's internal tunnel endpoint, not the residential node's public IP. The residential node's real IP is never exposed to the user's config.

#### Residential Node Agent Behavior
- On startup: initiates **outbound** VLESS/WS persistent tunnel to assigned relay node
- Tunnel keepalive: heartbeat every 15s, auto-reconnect on drop
- Firewall: agent only opens outbound connections — no inbound ports needed
- Traffic exits via the node's default NIC (home network adapter)
- Reports health (latency, bandwidth, ISP stability) to platform every 30 seconds
- If home internet drops, relay detects tunnel loss within 15s; platform removes node from active pool

#### Residential IP Pool Design
- Users are assigned to an **IP pool** (e.g., "US West residential pool"), not a fixed node
- Pool contains 5-20 residential nodes in the same region
- When one node goes offline, traffic automatically routes to another node in the pool
- For users needing a **fixed IP** (e-commerce, account management): dedicated binding at higher price, with SLA guarantee from the provider's staking

#### Backbone vs Edge Routing Comparison

| | Miwim Backbone | Miwim Edge |
|---|---|---|
| Hops | 1 (fast mode) or 2 (private mode) | Always 2 (relay → residential exit) |
| Latency | ~150ms (single) / ~175ms (multi) | ~200-250ms (home network variance) |
| Tunnel type | Direct or relay-to-DC-exit | Reverse tunnel from residential to relay |
| IP type | Datacenter | Genuine residential |
| Failover | Singbox urltest, <1s switch | Singbox urltest + IP pool rotation |
| Use case | Daily browsing, streaming | E-commerce, scraping, anti-detection |

---

### Design 3: Privacy Protection Against Malicious Nodes

Since node providers sit in the data path, privacy protection must be architectural — not just policy-based.

#### Layer 1: TLS End-to-End Encryption
User HTTPS traffic is encrypted end-to-end by TLS. Even if an exit node inspects packets, it sees:
- Destination domain (via SNI header) — **visible**
- Actual content (passwords, data, cookies) — **encrypted, invisible**

This is the same exposure level as using any ISP. The exit node is functionally equivalent to a transparent proxy.

#### Layer 2: Multi-Hop Identity/Destination Separation (Core Protection)

| Node Role | Can See | Cannot See |
|-----------|---------|------------|
| Relay node | User's real IP address | Destination domain, content |
| Exit node | Destination domain (SNI) | User's real IP address |
| Neither | — | Both user identity AND destination simultaneously |

This separation is the critical design. No single node can answer the question "who is accessing what." It's the same principle as Tor's onion routing, simplified to 2 hops for performance.

#### Layer 3: Encrypted Client Hello (ECH) — Premium Tier
For users who need maximum privacy, enable ECH on supported connections. This encrypts the SNI field, so even the exit node cannot see which domain the user is visiting — it only sees the target server's IP address.

Note: ECH requires target server support (Cloudflare, major CDNs). Not universally available but growing.

#### Layer 4: Zero-Log Agent + Attestation

| Threat | Defense |
|--------|---------|
| Provider modifies agent binary to add logging | Binary hash attestation: agent reports its SHA256 at startup. Platform rejects mismatched hashes. Future: SGX/SEV secure enclave. |
| Provider runs packet sniffer alongside agent | Traffic sampling audit: platform sends canary requests through nodes and verifies they weren't intercepted or tampered with. |
| Provider correlates traffic patterns over time | Node rotation: users are automatically rotated across different exit nodes. Even a malicious node only sees fragmentary, anonymous traffic for a short period. |

#### Layer 5: Economic Deterrent (Staking + Slashing)
- Providers stake 5,000+ $MIWIM to register a node
- If caught tampering (failed attestation, canary interception, user complaints): **10% of stake is slashed**
- At $0.05/token, that's a $250 penalty per violation — more than the economic gain from logging
- Repeat offenders are permanently banned and lose entire stake

#### Privacy Comparison vs Competitors

| Provider Type | Knows User Identity | Knows Destination | Knows Content |
|--------------|:---:|:---:|:---:|
| Centralized VPN (NordVPN) | Yes | Yes | No (TLS) |
| Centralized airport (奶昔云) | Yes | Yes | No (TLS) |
| Miwim relay node | Yes | No | No |
| Miwim exit node | No | Yes (SNI) | No (TLS) |
| Miwim with ECH | No | No | No |

**Miwim is architecturally more private than any centralized alternative.** This is a strong differentiator for both users and investors.

---

### Design 4: Token Pricing & Stability Mechanism

#### Service Pricing: Hybrid Oracle Model (Recommended)

All services are priced in USD. Token is an alternative payment method with a discount.

```
Plan price:      $10/month (set in USD, stable)
Fiat payment:    $10 via Stripe/stablecoin
Token payment:   $10 × 0.80 discount = $8 equivalent in $MIWIM
Token amount:    $8 / TWAP_24h_price
                 If $MIWIM = $0.05, user pays 160 tokens
                 If $MIWIM = $0.10, user pays 80 tokens
```

#### Price Oracle Implementation

| Phase | Oracle Source | Update Frequency |
|-------|-------------|-----------------|
| Pre-token (MVP) | N/A — fiat only | — |
| TGE | Uniswap/Raydium on-chain TWAP | Every block, 24h moving average |
| Scale | Chainlink + DEX TWAP median | Every block, dual-source for manipulation resistance |

Using 24-hour TWAP (Time-Weighted Average Price) instead of spot price prevents flash-crash exploits where someone dumps the token, buys services cheap, then lets the price recover.

#### Provider Reward Pricing (Same Principle, Reversed)

```
Provider rate:   $0.10 per GB served (set in USD, stable)
Payout:          $0.10 / TWAP_24h_price = X $MIWIM tokens
                 If $MIWIM = $0.05, provider earns 2 tokens/GB
                 If $MIWIM = $0.10, provider earns 1 token/GB
```

Provider earnings are stable in USD terms regardless of token volatility. This prevents the scenario where providers leave because token price dropped and their earnings became worthless.

#### Token Price Stability Mechanisms

| Mechanism | How It Works | When It Activates |
|-----------|-------------|-------------------|
| Emission-to-revenue cap | If token price drops below threshold, fewer tokens minted per GB — reduces sell pressure | Automatic, continuous |
| Revenue buyback | 10% of platform revenue buys tokens monthly via TWAP orders | Monthly, regardless of price |
| Provider reward vesting | Provider token rewards vest over 30 days — cannot sell immediately | Always active |
| Low initial float | Only 5-8% circulating at TGE — organic demand absorbs early emissions | TGE through Year 1 |
| Staking lock | Provider + B2B stakes are locked while active — removes tokens from circulation | Always active |

#### Concrete Example: Full Cycle

```
Month 1 after TGE:
- 50 providers, each staking 5,000 tokens    = 250,000 tokens locked
- 10 B2B clients, each staking 10,000 tokens = 100,000 tokens locked
- Monthly emission: ~13.3M tokens
- Monthly provider vesting release: ~12M tokens (after 30-day delay)
- Platform revenue: $10K → $1K buyback
- User token payments: 30% of users × $8K revenue = $2.4K equivalent bought by users

Net monthly flow:
  Sell pressure: ~12M tokens (vested provider rewards)
  Buy pressure:  $3.4K equivalent + staking demand
  Float absorbed by staking: 350K tokens locked

At this early stage, the key stabilizer is low float + staking lock.
As revenue grows to $100K+/month, the buyback becomes the dominant stabilizer.
```

---

## Risk Mitigation for MVP Phase

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Nodes get blocked (IP banned) | Medium | High | Diversify providers, have backup nodes ready, use obfuscation protocols |
| Low beta user signup | Medium | Medium | Incentivize with future token airdrop promise, leverage personal network |
| Poor connection quality | Medium | High | Over-provision nodes (10 nodes for 50 users), monitor aggressively |
| Provider nodes go offline | High | Medium | Auto-failover + multiple fallback nodes per user config |
| App bugs during beta | High | Low | Fast iteration cycle, direct feedback via Telegram |

---

## Cost Estimate (8-week MVP)

| Item | Monthly Cost | 2-Month Total |
|------|-------------|---------------|
| VPS nodes (10× $5-20/mo) | $100-200 | $200-400 |
| Backend server (1× decent VPS) | $20-40 | $40-80 |
| Domain + CDN | $10 | $20 |
| Monitoring (Grafana Cloud free tier) | $0 | $0 |
| **Total** | **$130-250** | **$260-500** |

The entire MVP can be built for under $500 in infrastructure costs. The main investment is engineering time.
