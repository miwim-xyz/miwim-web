# Miwim — Competitive Analysis & Market Sizing

---

## Market Sizing

### TAM — Total Addressable Market: $50B+

| Segment | Size | Source / Basis |
|---------|------|---------------|
| Global VPN market | $45B (2025), 31% CAGR | Allied Market Research, Grand View Research |
| Residential proxy market | $1.5B (2025) | Transparency Market Research |
| DePIN infrastructure | $4B+ TVL (2025) | DePIN.ninja, Messari |
| Total TAM | **$50B+** | Combined addressable |

The VPN market alone is projected to reach $130B+ by 2030. DePIN is the fastest-growing sub-sector in crypto, with total value locked growing 150%+ year-over-year.

### SAM — Serviceable Addressable Market: $5B

| Segment | Size | Rationale |
|---------|------|-----------|
| Asia-Pacific VPN/proxy | $3B | China, Russia, Iran, Vietnam — users behind national firewalls |
| Residential IP premium (APAC) | $500M | Users willing to pay premium for genuine residential IPs |
| DePIN proxy/bandwidth protocols | $1.5B | Emerging category: Grass, Mysterium, Sentinel, Miwim |
| **SAM** | **$5B** | |

Key driver: 800M+ internet users live behind government firewalls. Demand is growing as censorship tightens and more services are geo-restricted.

### SOM — Serviceable Obtainable Market: $200M (3-year target)

| Metric | Target | Calculation |
|--------|--------|-------------|
| C-end paying users | 50,000 | 0.006% of 800M firewall users |
| Average revenue per user | $30/month | Blended basic + premium tiers |
| C-end ARR | $18M | 50K × $30 × 12 |
| B2B white-label clients | 200 | Proxy resellers and 机场 operators |
| Average B2B revenue | $1,000/month | Usage-based API fees |
| B2B ARR | $2.4M | 200 × $1K × 12 |
| **Total SOM ARR** | **$20.4M** | Conservative 0.4% SAM capture |

At 10x revenue multiple (standard for infra SaaS), this implies a $200M+ valuation opportunity within 3 years.

---

## Competitive Landscape

### Category 1: Traditional VPN Providers

**Players**: NordVPN, ExpressVPN, Surfshark, CyberGhost, PIA

| Dimension | Assessment |
|-----------|------------|
| Market position | Dominant globally, $B+ revenue combined |
| Strengths | Brand recognition, cross-platform apps, massive server networks (5000+ servers), marketing budgets |
| Weaknesses | All datacenter IPs (easily detected and blocked), centralized infrastructure, ineffective in China/Iran, no residential IP access, no token incentive |
| Pricing | $3-12/month (annual plans) |
| China effectiveness | Very low — most are blocked; requires manual protocol switching |

**Why Miwim wins here**: Traditional VPNs use datacenter IPs that are trivially detectable by DPI (Deep Packet Inspection). They cannot serve the Chinese market effectively. Miwim uses residential IPs from real homes, which are fundamentally harder to block.

---

### Category 2: Centralized Proxy Providers (机场)

**Players**: 奶昔云, 一元机场, STC-Server, TagInternet, various Telegram-based operators

| Dimension | Assessment |
|-----------|------------|
| Market position | Dominant in Chinese proxy market, millions of users combined |
| Strengths | Excellent UX for Chinese users, familiar protocols (Singbox, Clash, V2Ray), competitive pricing, large user base, strong word-of-mouth |
| Weaknesses | Single operator = single point of failure; frequent "跑路" (operator absconding with funds); no decentralization; no token economics; supply limited to rented servers |
| Pricing | ¥15-100/month (varies widely) |
| Trust model | Pure trust — users prepay and hope operator doesn't disappear |

**Key market data**:
- Multiple major 机场 shut down in 2023-2024, affecting hundreds of thousands of users
- No recourse mechanism — when an operator vanishes, users lose all prepaid balance
- Users routinely maintain 2-3 backup 机场 subscriptions due to trust issues

**Why Miwim wins here**: Same UX and protocol support (Singbox), but decentralized infrastructure means no single entity can "跑路". User funds are protected by smart contracts, not trust.

---

### Category 3: DePIN Bandwidth Networks

**Players**: Grass, Nodepay, Mysterium, Sentinel, Orchid

#### Grass
| Dimension | Assessment |
|-----------|------------|
| Valuation | $1B+ (2024 raise) |
| Nodes | 2M+ active nodes globally |
| Model | Users install browser extension → contribute idle bandwidth → earn points/tokens |
| Strengths | Massive scale, strong DePIN narrative, large community, VC backing |
| Weaknesses | No consumer product — sells bandwidth to enterprise clients (web scraping, data collection). No VPN/proxy app for end users. No white-label API. No China-specific focus. |
| Revenue | Pre-revenue (points system, token TGE planned) |

**Why Miwim is different from Grass**: Grass aggregates bandwidth supply but only sells B2B. Miwim aggregates supply AND builds the consumer product AND offers white-label distribution. Grass proves the supply model works; Miwim adds the demand layer.

#### Mysterium
| Dimension | Assessment |
|-----------|------------|
| Raised | $30M+ |
| Model | Decentralized VPN with $MYST token |
| Strengths | Pioneer in decentralized VPN, working product, token live |
| Weaknesses | Poor UX (technical setup required), small node count, no China market awareness, no Singbox protocol support, no white-label API, minimal marketing |
| Users | Low thousands (estimated) |

**Why Miwim is different from Mysterium**: Mysterium proved the concept but failed on execution. UX is too technical, and they never built for the largest demand market (China). Miwim starts with China-first UX and Singbox support.

#### Sentinel
| Dimension | Assessment |
|-----------|------------|
| Model | Cosmos-based decentralized VPN framework |
| Strengths | Fully decentralized, open-source, modular architecture |
| Weaknesses | Framework, not a product — requires technical knowledge to use. Tiny user base. No consumer app. Built on Cosmos (limited ecosystem). |

#### Orchid
| Dimension | Assessment |
|-----------|------------|
| Raised | $48M ICO (2019) |
| Model | Pay-per-use VPN with $OXT token |
| Strengths | Well-funded, working product, multi-hop routing |
| Weaknesses | Complex UX (nanopayments confuse users), high per-GB cost, small node network, failed to gain traction post-ICO, token down 95%+ from ATH |

---

### Category 4: Residential Proxy Vendors (B2B)

**Players**: Bright Data (formerly Luminati), Oxylabs, Smartproxy, IPRoyal, NetNut

| Dimension | Assessment |
|-----------|------------|
| Market position | Dominant in B2B residential proxy, $1B+ combined revenue |
| Strengths | Massive IP pools (72M+ for Bright Data), enterprise integrations, compliance features, reliable |
| Weaknesses | Extremely expensive ($8-15/GB), B2B only, ethically questionable IP sourcing (bundled with free mobile apps without clear consent), centralized pricing, no consumer product |
| Pricing | $8-15 per GB (residential), $0.5-1 per GB (datacenter) |

**Why Miwim disrupts this**: DePIN model sources residential IPs ethically (providers opt-in with informed consent and get paid). Pricing can be 5-10x cheaper because providers are incentivized by tokens rather than expensive commercial agreements. Miwim targets both C-end (which these players ignore) and B2B (at significantly lower prices).

---

## Competitive Matrix

| Feature | Traditional VPN | 机场 | DePIN (Grass) | DePIN (Mysterium) | B2B Proxy (Bright Data) | **Miwim** |
|---------|:-:|:-:|:-:|:-:|:-:|:-:|
| Decentralized | ✗ | ✗ | ✓ | ✓ | ✗ | **✓** |
| Residential IPs | ✗ | ✗ | ✓ | ✓ | ✓ | **✓** |
| Consumer app | ✓ | ✓ | ✗ | Partial | ✗ | **✓** |
| White-label API | ✗ | ✗ | ✗ | ✗ | ✓ | **✓** |
| Token incentive | ✗ | ✗ | ✓ | ✓ | ✗ | **✓** |
| Anti-censorship | ✗ | ✓ | ✗ | Partial | ✗ | **✓** |
| China-optimized | ✗ | ✓ | ✗ | ✗ | ✗ | **✓** |
| Singbox support | ✗ | ✓ | ✗ | ✗ | ✗ | **✓** |

**Miwim is the only project with all eight checkmarks.**

---

## Miwim's Unique Positioning

### The Gap
No existing project combines: (1) decentralized supply via DePIN, (2) consumer-grade VPN app, (3) white-label B2B API, (4) token economics with real utility, (5) China-first UX design. Every competitor solves one or two of these; Miwim solves all five.

### Closest Comparable: Grass
- Grass at $1B+ valuation proves DePIN bandwidth is a real category
- Grass only does supply aggregation → enterprise sales
- Miwim does supply aggregation → consumer product + B2B white-label + token economy
- If Grass is the "AWS of bandwidth", Miwim is "AWS + Vercel + Stripe" — the full stack

### Defensible Moat
1. **Network effects**: More providers → better coverage → more users → more revenue → higher token value → more providers (flywheel)
2. **Supply lock-in**: Providers who stake $MIWIM and build reputation have switching costs
3. **B2B lock-in**: White-label clients build their businesses on Miwim's API — high switching cost
4. **Geographic coverage**: First network to achieve residential IP coverage in 50+ countries becomes very hard to replicate
5. **Protocol expertise**: Singbox protocol integration + China-specific DPI evasion is hard-won technical knowledge

---

## Key Data Points for Pitch

| Metric | Value | Source |
|--------|-------|--------|
| Global VPN market (2025) | $45B | Grand View Research |
| VPN market CAGR | 31% | Allied Market Research |
| Users behind firewalls | 800M+ | Freedom House, OpenNet Initiative |
| Grass valuation | $1B+ | Polychain-led round, 2024 |
| Grass node count | 2M+ | Official dashboard |
| DePIN TVL growth YoY | 150%+ | DePIN.ninja |
| Residential proxy market | $1.5B | Transparency Market Research |
| Bright Data revenue | ~$500M ARR (est.) | Industry estimates |
| Residential proxy pricing | $8-15/GB | Bright Data, Oxylabs public pricing |
| 机场 monthly churn | 15-25% | Community surveys, anecdotal |
| Major 机场 shutdowns (2023-24) | 10+ notable cases | V2EX, Telegram communities |

---

## Investor Target List — Categories

### Tier 1: DePIN / Infrastructure-focused Crypto VCs
These VCs actively invest in DePIN and understand the thesis.
- Multicoin Capital (invested in Helium, Render)
- Polychain Capital (led Grass round)
- Borderless Capital (DePIN thesis fund)
- IoTeX ecosystem fund
- Protocol Labs / Filecoin ecosystem

### Tier 2: Crypto VCs with infra portfolio
- a16z crypto
- Paradigm
- Framework Ventures
- Hashkey Capital (APAC focus)
- Foresight Ventures (China-origin)

### Tier 3: Angels & Strategic
- DePIN project founders (cross-invest common)
- 机场 operators looking to transition to decentralized model
- Proxy industry veterans
- Crypto KOLs with DePIN focus

### Tier 4: Traditional VC (infra angle)
- Pitch as "decentralized infrastructure" not "VPN" or "proxy"
- Focus on B2B API revenue model (more familiar to traditional VCs)
- Comparable: Cloudflare's early days (infrastructure layer for the internet)
