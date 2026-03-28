# Miwim Website — Full Build Specification

> **Purpose of this document**: This is a complete specification for building the Miwim project website from scratch. It is designed to be handed directly to a coding agent (Claude Code) for implementation. Every design decision, content block, and technical requirement is specified here — the agent should not need to ask clarifying questions.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Site Architecture](#3-site-architecture)
4. [Design System](#4-design-system)
5. [Main Site — Page-by-Page Spec](#5-main-site--page-by-page-spec)
6. [Documentation Site (Docs)](#6-documentation-site-docs)
7. [Whitepaper Content](#7-whitepaper-content)
8. [Technical Documentation Content](#8-technical-documentation-content)
9. [Assets to Generate](#9-assets-to-generate)
10. [SEO & Meta](#10-seo--meta)
11. [Deployment](#11-deployment)
12. [Post-Launch Checklist](#12-post-launch-checklist)

---

## 1. Project Overview

### What is Miwim?
Miwim is a decentralized proxy infrastructure powered by DePIN (Decentralized Physical Infrastructure Networks). It operates two product lines:

- **Miwim Backbone**: Datacenter proxy nodes for C-end consumers — low-latency VPN alternative, monthly subscription ($8-15/mo)
- **Miwim Edge**: Residential IP proxy via home broadband providers — for B2B/Pro users needing genuine residential IPs for e-commerce, scraping, anti-detection ($1-3/GB)

Both lines share a decentralized supply network where providers contribute idle servers and home bandwidth in exchange for $MIWIM token rewards.

### Website Goals (ranked)
1. **Build investor trust** — VC visits from pitch deck link must land on a credible, professional site
2. **Grow waitlist** — Capture user emails + intent data before product launch
3. **Recruit genesis nodes** — Get server/bandwidth providers to sign up
4. **Establish DePIN credibility** — Whitepaper + technical docs signal serious project, not a meme coin
5. **SEO foundation** — Rank for "decentralized proxy", "DePIN VPN", "residential proxy DePIN"

### Language
Pure English. No i18n needed. The target audience is global crypto/DePIN investors and English-speaking proxy users.

### Current Assets
None. Logo, brand identity, illustrations, whitepaper, docs — all must be created as part of this build.

---

## 2. Tech Stack

### Main Site (Landing Page)
```
Framework:    Next.js 14+ (App Router)
Styling:      Tailwind CSS 4
Animations:   Framer Motion
Icons:        Lucide React
Deployment:   Vercel
Domain:       miwim.io (or miwim.network — TBD, use placeholder)
```

### Documentation Site
```
Framework:    Nextra (Next.js-based, GitBook-like)
              OR Docusaurus if Nextra doesn't fit
Styling:      Built-in theme + Tailwind overrides
Deployment:   Same Vercel project, mounted at /docs
```

### Forms / Waitlist
```
Waitlist:     Tally.so embed (or simple API route + Supabase if preferred)
Analytics:    Plausible or Vercel Analytics (privacy-friendly, no cookie banner needed)
```

### Monorepo Structure
```
miwim-web/
├── apps/
│   ├── site/          # Next.js main landing site
│   └── docs/          # Nextra documentation site
├── packages/
│   └── ui/            # Shared components (buttons, cards, etc.)
├── public/
│   ├── images/        # Generated SVG illustrations
│   ├── brand/         # Logo variants
│   └── og/            # Open Graph images
├── content/
│   ├── whitepaper/    # Whitepaper MDX files
│   └── docs/          # Technical documentation MDX files
└── package.json       # Turborepo or pnpm workspace
```

**Alternative (simpler)**: If monorepo adds too much complexity for MVP, use a single Next.js project with Nextra integrated via `next.config.js`. Docs live at `/docs/*` as MDX pages within the same app.

---

## 3. Site Architecture

### URL Structure
```
/                     # Landing page (single-page scroll)
/docs                 # Documentation home (Nextra)
/docs/whitepaper      # Whitepaper — full document, chaptered
/docs/whitepaper/introduction
/docs/whitepaper/problem
/docs/whitepaper/solution
/docs/whitepaper/architecture
/docs/whitepaper/tokenomics
/docs/whitepaper/roadmap
/docs/whitepaper/team
/docs/technical       # Technical documentation
/docs/technical/architecture-overview
/docs/technical/node-roles
/docs/technical/residential-routing
/docs/technical/privacy-model
/docs/technical/token-pricing
/docs/technical/provider-agent
/docs/technical/smart-routing
/docs/technical/api-reference   # Placeholder for future white-label API docs
/docs/community       # Community links, contributing guide
```

### Navigation (Main Site)
```
Logo [MIWIM]                          [Docs]  [Whitepaper]  [Join Waitlist →]
```
- Logo links to /
- "Docs" links to /docs
- "Whitepaper" links to /docs/whitepaper
- "Join Waitlist" is a CTA button → scrolls to waitlist section OR opens modal

### Navigation (Docs Site)
Nextra sidebar:
```
📄 Overview
📁 Whitepaper
   ├── Introduction
   ├── Problem
   ├── Solution
   ├── Architecture
   ├── Tokenomics
   ├── Roadmap
   └── Team
📁 Technical
   ├── Architecture overview
   ├── Node roles & detection
   ├── Residential IP routing
   ├── Privacy model
   ├── Token pricing mechanism
   ├── Provider agent
   ├── Smart routing
   └── API reference (coming soon)
📁 Community
   ├── Getting started
   ├── Run a node
   └── Links
```

---

## 4. Design System

### Philosophy
**Solarized crypto infrastructure.** The site matches the existing Android app's Solarized color system. Dark-mode-first, with a light theme available. Design language inspired by Brevo: generous whitespace, clean typography hierarchy, rotating keyword hero animation, product screenshots as social proof, and card-based feature layouts. The result should feel like a polished infrastructure product — not a degen meme coin and not a generic SaaS.

**Key Brevo-inspired patterns to implement:**
- Hero headline with **rotating keyword animation** (words cycle through with a slide-up transition, like Brevo's "Email / SMS / Order / Interaction" rotator)
- **Product mockup** in hero (Android app screenshot, angled/floating with subtle shadow)
- **Trust bar** with partner/backer logos (placeholder for now, replace when available)
- **Generous section spacing** — each section breathes with 120-160px vertical padding on desktop
- **Card grid layouts** with hover elevation and border glow on brand color
- Clean **two-column** layouts (text left + visual right) alternating with centered layouts
- Sticky nav with **blur backdrop** that transitions from transparent to solid on scroll

### Color Palette — Solarized System

The color palette is based on Ethan Schoonover's Solarized, matching the Android app exactly. Both dark and light themes are defined.

```css
/* ==================== DARK THEME (default) ==================== */

/* Backgrounds */
--bg-primary:     #000000;     /* Pure black OLED — main page background */
--bg-card:        #161618;     /* Card / elevated surface background */
--bg-card-deep:   #0A0A0B;     /* Deeper card variant, nested elements */
--bg-glass:       rgba(22, 22, 24, 0.8); /* Glassmorphism with backdrop-blur */

/* Text */
--text-primary:   #F3F4F6;     /* Primary text — near white */
--text-secondary: #93a1a1;     /* Body text — Solarized base1 (gray-cyan) */
--text-tertiary:  #657b83;     /* Muted — Solarized base00 */

/* Brand / Semantic */
--color-primary:  #2aa198;     /* Solarized cyan — PRIMARY brand color */
--color-secondary:#268bd2;     /* Solarized blue — secondary actions, links */
--color-accent:   #d33682;     /* Solarized magenta — accent, highlights, CTA hover */
--color-warning:  #cb4b16;     /* Solarized orange */
--color-danger:   #dc322f;     /* Solarized red */
--color-success:  #859900;     /* Solarized green */
--color-gold:     #b58900;     /* Solarized yellow — token/financial related */
--color-discord:  #5865F2;     /* Discord brand purple-blue */

/* Borders */
--border-subtle:  rgba(147, 161, 161, 0.1);   /* base1 at 10% */
--border-hover:   rgba(147, 161, 161, 0.2);   /* base1 at 20% */
--border-active:  rgba(42, 161, 152, 0.4);    /* primary at 40% */

/* ==================== LIGHT THEME ==================== */
/* Applied via class="light" on <html> or via prefers-color-scheme */

.light {
  --bg-primary:     #fdf6e3;   /* Solarized base3 — warm cream */
  --bg-card:        #eee8d5;   /* Solarized base2 — soft warm gray */
  --bg-card-deep:   #fdf6e3;
  --bg-glass:       rgba(238, 232, 213, 0.8);

  --text-primary:   #002b36;   /* Solarized base03 — deep teal-black */
  --text-secondary: #586e75;   /* Solarized base01 — muted green-gray */
  --text-tertiary:  #93a1a1;   /* Solarized base1 */

  /* Brand colors stay the same in both themes */
  /* Border colors adjust automatically via text-secondary opacity */
  --border-subtle:  rgba(88, 110, 117, 0.12);
  --border-hover:   rgba(88, 110, 117, 0.25);
  --border-active:  rgba(42, 161, 152, 0.5);
}
```

**Color usage rules:**
- `--color-primary` (Solarized cyan `#2aa198`) is the dominant brand color. Use for primary buttons, active states, links, key highlights.
- `--color-secondary` (Solarized blue `#268bd2`) for secondary buttons, informational elements, links on hover.
- `--color-accent` (Solarized magenta `#d33682`) sparingly — for the rotating hero keyword, special callouts, and hover glow effects. This is the "pop" color.
- `--color-gold` (`#b58900`) for anything token/financial related — token allocation bars, pricing, $MIWIM mentions.
- The dark theme is the default and primary design target. Light theme support is a P2 nice-to-have.

### Typography
```css
/* Font stack */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Import Inter from Google Fonts — weights 400, 500, 600, 700 */
/* Import JetBrains Mono for code blocks */

/* Scale */
h1: 56px / 700 / line-height 1.1 / letter-spacing -0.02em   /* Hero headline */
h2: 40px / 700 / line-height 1.2 / letter-spacing -0.01em   /* Section titles */
h3: 24px / 600 / line-height 1.3                              /* Card titles */
h4: 18px / 600 / line-height 1.4                              /* Sub-headers */
body: 16px / 400 / line-height 1.7 / color: text-secondary    /* Paragraphs */
small: 14px / 400 / line-height 1.6 / color: text-tertiary    /* Captions, labels */
mono: 'JetBrains Mono', monospace / 14px                       /* Code, technical */
```

### Component Tokens

**Cards**:
```css
background: var(--bg-card);
border: 1px solid var(--border-subtle);
border-radius: 16px;
padding: 32px;
transition: all 0.3s ease;

&:hover {
  border-color: var(--border-active);   /* Cyan border glow on hover */
  box-shadow: 0 0 30px rgba(42, 161, 152, 0.08); /* Subtle primary glow */
  transform: translateY(-2px);
}
```

**Primary button** (Solarized cyan):
```css
background: var(--color-primary);       /* #2aa198 */
color: #002b36;                         /* Dark text on cyan bg */
padding: 14px 32px;
border-radius: 12px;
font-weight: 600;
font-size: 15px;
transition: all 0.2s;

&:hover {
  background: #35b5ab;                  /* Slightly lighter cyan */
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(42, 161, 152, 0.3);
}
```

**Ghost button** (secondary):
```css
background: transparent;
border: 1px solid var(--border-hover);
color: var(--text-primary);
padding: 14px 32px;
border-radius: 12px;
font-weight: 500;

&:hover {
  background: var(--bg-card);
  border-color: var(--color-primary);
}
```

**Accent button** (magenta, for special CTAs):
```css
background: var(--color-accent);        /* #d33682 */
color: white;
padding: 14px 32px;
border-radius: 12px;

&:hover {
  background: #e0459a;
  box-shadow: 0 4px 20px rgba(211, 54, 130, 0.3);
}
```

**Glow effects** (use on hero and key CTAs only):
```css
/* Primary glow — behind hero elements, cards */
box-shadow: 0 0 120px rgba(42, 161, 152, 0.12);

/* Accent glow — behind rotating keyword in hero */
box-shadow: 0 0 80px rgba(211, 54, 130, 0.15);

/* Gold glow — behind token-related elements */
box-shadow: 0 0 60px rgba(181, 137, 0, 0.1);
```

**Gradient text** (hero headline — use Solarized brand colors):
```css
background: linear-gradient(135deg, var(--text-primary) 0%, var(--color-primary) 60%, var(--color-secondary) 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Motion Guidelines (Brevo-inspired)

**General principles:**
- Use Framer Motion for all scroll-triggered and layout animations
- Animations should feel **fluid and confident** — not bouncy or playful
- Every section animates in on scroll with `fadeInUp` (20px translate + opacity)
- Stagger children by 0.08s for sequential reveal

**Specific animations:**

1. **Hero keyword rotator** (Brevo's signature pattern):
   - A set of 4-5 words cycle through one position in the headline
   - Words: "Unstoppable" / "Decentralized" / "Permissionless" / "Censorship-proof" / "Trustless"
   - Animation: current word slides up and fades out, new word slides up from below and fades in
   - Cycle: 2.5 second hold per word, 0.4s transition
   - The rotating word should be colored in `--color-accent` (magenta) while static text is `--text-primary`
   - Implementation: Framer Motion `AnimatePresence` with `y: 20 → 0 → -20` and opacity transitions

2. **Sticky navbar**:
   - Starts transparent with no backdrop blur
   - On scroll past ~80px: transition to `background: var(--bg-glass)` with `backdrop-filter: blur(16px)` and a subtle bottom border
   - Transition: 0.3s ease

3. **Scroll-triggered section reveals**:
   - Each section fades in when it enters the viewport (IntersectionObserver threshold: 0.15)
   - Title first, then description, then cards/visual (staggered by 0.1s)
   - Use `whileInView` from Framer Motion

4. **Card hover**:
   - Subtle lift (`translateY(-2px)`) + border color shift to brand cyan + glow shadow
   - 0.3s ease transition

5. **Product mockup float** (in Solution section, not hero):
   - Android app screenshot appears in Section 3 (Solution / Backbone card)
   - Floats with gentle `translateY` oscillation (3px, 4s cycle, CSS animation)
   - Subtle shadow underneath grows/shrinks with the float
   - Slight perspective rotation for 3D depth
   - Only renders when section is in viewport

6. **Trust bar** (if applicable):
   - Logos scroll horizontally in an infinite marquee
   - Use CSS animation with `translateX` — no JS needed
   - Pause on hover

7. **Stats counter**:
   - Numbers in the Key Numbers section count up from 0 when section enters viewport
   - Use a simple counter hook with `requestAnimationFrame`
   - Duration: 1.5s, easing: ease-out

8. **Background — interactive network canvas (hero only)**:
   - Full-viewport `<canvas>` with physics-driven node mesh (see Hero section for full spec)
   - Nodes drift with Brownian motion, attracted to cursor position, forming a gravity well effect
   - This replaces static gradient blobs — the background IS interactive, not decorative
   - Pause animation via IntersectionObserver when hero scrolls out of viewport (performance)
   - On mobile: reduce node count (70 → 35), disable mouse interaction (use gentle random drift only)

### Responsive Breakpoints
```
sm:   640px
md:   768px
lg:   1024px
xl:   1280px
2xl:  1536px

Max content width: 1200px, centered with auto margins
Section padding: py-32 lg:py-40 (generous, Brevo-style)
Mobile section padding: py-20
Card grid: 1 col mobile → 2 col md → 3 col lg
Hero: stack vertically on mobile, side-by-side on lg+
```

---

## 5. Main Site — Page-by-Page Spec

The main landing page is a single-page scroll with 9 sections. Each section is described below with exact content.

---

### Section 1: Hero

**Design references**: Combines freedom.gov's cinematic dark minimalism and dramatic typography with antigravity.google's physics-based interactive background. The result: a high-impact, immersive hero where the background IS the product metaphor — a living decentralized network that responds to the viewer.

**Layout**: Full viewport height, centered content (not two-column). Freedom.gov style: content is vertically centered with maximum dramatic impact. Product mockup moves to Section 3 (Solution) instead.

#### Background: Interactive network mesh (the signature element)

This is the hero's defining feature. A full-viewport `<canvas>` element renders a network of 60-80 floating nodes connected by lines:

**Physics behavior (Matter.js or custom verlet solver):**
- Nodes are small circles (3-6px radius), colored in `--color-primary` (#2aa198 cyan) at ~40% opacity
- Connecting lines between nearby nodes (within 150px) — thin (0.5px), `--text-tertiary` color at ~15% opacity
- Nodes drift slowly with random initial velocities (Brownian motion, very gentle — 0.2-0.5px/frame)
- **Mouse interaction**: The cursor acts as a gravitational attractor/repulsor:
  - Default: nodes within 200px radius are gently attracted toward cursor position (like gravity well)
  - As nodes cluster near cursor, their connections become brighter and denser — visually forming a "network hub" around the mouse
  - When cursor moves away, nodes slowly drift back to random positions
  - On click/hold: brief repulsion burst — nodes scatter outward from click point, then slowly re-cluster
- Lines between nodes adjust opacity based on distance (closer = brighter, like signal strength)
- 3-5 "special" nodes are slightly larger (8px) and colored in `--color-accent` (#d33682 magenta) — they represent "relay nodes" in the visual metaphor

**Performance:**
- Use `requestAnimationFrame` with delta time
- Cap at 60fps, throttle on low-end devices
- Reduce node count on mobile (30-40 nodes)
- No external physics library needed — simple distance-based forces are enough for this effect
- Canvas is `position: absolute; inset: 0; z-index: 0; pointer-events: none` (pass through clicks to content above)

**Why this works for Miwim:**
The interactive network mesh IS the product. Every node drifting on screen represents a provider in the Miwim network. When the user's cursor creates a gravity well and nodes cluster around it, that's the metaphor for "decentralized nodes serving your traffic." It's not decoration — it's communication.

#### Foreground content (centered over canvas)

```
[Container: max-w-3xl, mx-auto, text-center, z-10 relative]

[Announcement pill — small, rounded-full, border-subtle, inline-flex, gap-2]
[Pulsing cyan dot (CSS animation)] "Seed round open — $100K-$500K"
Font: 13px, --text-secondary, letter-spacing 0.5px

[Main headline — dramatic, freedom.gov scale]
Font: 64px on desktop / 40px on mobile, font-weight 700
Line-height: 1.05, letter-spacing: -0.03em
Color: --text-primary

Line 1: "The [ROTATING WORD] proxy"
Line 2: "network, owned by everyone."

ROTATING WORD animation:
→ "unstoppable"
→ "decentralized"
→ "permissionless"
→ "censorship-proof"
→ "trustless"

- Each word is colored in --color-accent (#d33682 magenta)
- Transition: AnimatePresence — current word clips up and fades, new word slides up from below
- Hold: 2.8s per word, transition: 0.4s
- The rotating word has subtle text-shadow: 0 0 40px rgba(211,54,130,0.3)

[Subheadline — max-w-xl, mx-auto, margin-top: 28px]
Font: 18px, font-weight 400, --text-secondary, line-height 1.7
"DePIN-powered proxy infrastructure with decentralized relay nodes,
genuine residential IPs, and white-label APIs."

[Button row — margin-top: 40px, flex, justify-center, gap-16]
[Join Waitlist]      → Primary button (cyan, large: py-16 px-36, font-size 16px)
[Read Whitepaper →]  → Ghost button → links to /docs/whitepaper

[Stats row — margin-top: 56px, flex, justify-center, gap-40, --text-tertiary]
Four items, each with a small colored dot (6px circle) and label:
• (cyan dot)    "DePIN infrastructure"
• (gold dot)    "$MIWIM token"
• (green dot)   "Android app live"
• (blue dot)    "White-label API"
Font: 13px, --text-tertiary, uppercase, letter-spacing 1px
```

#### Scroll indicator
Centered at bottom of viewport. Thin line (1px, 40px tall, --text-tertiary at 30%) with a small circle sliding down it in a loop (CSS animation, 2s cycle). Minimal, not a chunky chevron.

#### Trust bar (below hero, separate section)
```
[Thin divider line, --border-subtle]
[Container: py-16, flex, justify-center, items-center, gap-8]
[Muted text: "Powered by" — 12px, --text-tertiary]
[Row of grayscale tech logos — infinite horizontal marquee]
— Placeholder logos: Singbox, Solana/Base ecosystem mark, etc.
— Replace with real partner/investor logos when available
— If no logos at launch, SKIP this section entirely — don't fake it
[Thin divider line, --border-subtle]
```

#### Implementation notes for Claude Code

```
// Pseudocode for the interactive network canvas

const NODES = 70;         // Reduce to 35 on mobile
const CONNECT_DIST = 150; // Max distance for edge drawing
const MOUSE_RADIUS = 200; // Cursor influence radius
const MOUSE_FORCE = 0.3;  // Attraction strength (0-1)

class Node {
  x, y: number;           // Position
  vx, vy: number;         // Velocity (very small, -0.5 to 0.5)
  radius: number;         // 3-6px, a few "special" nodes at 8px
  isSpecial: boolean;     // true for 3-5 accent-colored nodes
}

function animate(mouseX, mouseY) {
  for each node:
    // Random drift (Brownian motion)
    node.vx += (Math.random() - 0.5) * 0.02;
    node.vy += (Math.random() - 0.5) * 0.02;
    
    // Mouse gravity attraction
    const dist = distance(node, mouse);
    if (dist < MOUSE_RADIUS) {
      const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
      node.vx += (mouseX - node.x) * force * 0.001;
      node.vy += (mouseY - node.y) * force * 0.001;
    }
    
    // Damping
    node.vx *= 0.98;
    node.vy *= 0.98;
    
    // Boundary wrapping
    wrap(node, canvas.width, canvas.height);
    
    // Update position
    node.x += node.vx;
    node.y += node.vy;

  // Draw edges between nearby nodes
  for each pair (nodeA, nodeB):
    const d = distance(nodeA, nodeB);
    if (d < CONNECT_DIST) {
      const opacity = (1 - d / CONNECT_DIST) * 0.15;
      drawLine(nodeA, nodeB, opacity);
    }

  // Draw nodes
  for each node:
    const color = node.isSpecial ? ACCENT : PRIMARY;
    drawCircle(node, color);
}

// On click: brief repulsion burst
canvas.addEventListener('click', (e) => {
  for each node within 250px of click:
    apply outward impulse proportional to closeness
});

// Use IntersectionObserver to pause animation when hero is not visible
```

The library choice is flexible — raw canvas with `requestAnimationFrame` is preferred (no dependency). If the developer finds Matter.js easier, that's acceptable as long as performance stays smooth (60fps, no jank on scroll).

---

---

### Section 2: Problem (Why Miwim?)

**Layout**: Section title centered, then 3 cards in a row.

**Section header**:
```
[Eyebrow — small, uppercase, cyan]
"THE PROBLEM"

[Title]
"The centralized proxy market is fundamentally broken"
```

**3 problem cards** (glass cards, icon + title + description):
```
Card 1:
Icon: Shield with X (or lock-broken)
Title: "Trust crisis"
Body: "Centralized VPN providers and proxy services shut down
without warning — taking user funds and data with them."

Card 2:
Icon: Server-off
Title: "IP monopoly"
Body: "Residential IP resources are controlled by a handful of
companies. Prices are $8-15/GB. Access is restricted."

Card 3:
Icon: Zap-off (or target)
Title: "Single point of failure"
Body: "When one provider is blocked or seized, every user
loses access simultaneously. No redundancy, no recourse."
```

---

### Section 3: Solution (Two Product Lines)

**Layout**: Section title centered, then two large cards side-by-side representing Backbone and Edge.

**Section header**:
```
[Eyebrow]
"THE SOLUTION"

[Title]
"Two products, one decentralized network"
```

**Card A — Miwim Backbone**:
```
[Badge: "For consumers"]
[Icon: Zap or Globe]
Title: "Miwim Backbone"
Subtitle: "Decentralized VPN for everyday use"
Description: "Global network of datacenter relay nodes delivering
low-latency, high-bandwidth proxy access. One-tap connect via
our Android app. Monthly subscription starting at $8."

Features (small bullet-like list):
• Low latency (~150ms CN→US)
• Singbox protocol support
• Auto-failover in <1 second
• Fast mode or private (multi-hop) mode
```

**Card B — Miwim Edge**:
```
[Badge: "For business"]
[Icon: Home or Fingerprint]
Title: "Miwim Edge"
Subtitle: "Genuine residential IPs on demand"
Description: "Real home broadband IPs sourced ethically through
DePIN incentives. Anti-detection grade purity for e-commerce,
data collection, and account management."

Features:
• Genuine residential IPs from real homes
• Forced multi-hop for maximum privacy
• IP pool rotation or dedicated binding
• Per-GB pricing starting at $1/GB
```

**Below the two cards**:
```
[Small note, centered]
"Both product lines share the same decentralized supply network,
the same app, and the same $MIWIM token economy. The split is in
routing and pricing — not infrastructure."
```

---

### Section 4: How It Works

**Layout**: Visual diagram with 3 tiers (Supply → Platform → Demand), animated on scroll.

**Section header**:
```
[Eyebrow]
"HOW IT WORKS"

[Title]
"A three-sided marketplace for bandwidth"
```

**Diagram** (build as an SVG or styled div layout — NOT an image):

```
SUPPLY SIDE
┌──────────┐  ┌──────────────┐  ┌──────────────┐
│ VPS /    │  │ Home         │  │ Mobile       │
│ Servers  │  │ Broadband    │  │ Hotspots     │
└────┬─────┘  └──────┬───────┘  └──────┬───────┘
     │               │                 │
     └───────────────┼─────────────────┘
                     ▼
┌─────────────────────────────────────────────────┐
│              MIWIM PLATFORM                      │
│  Node Scheduler • Smart Routing • Token Economy  │
│  Subscription API • White-Label Gateway          │
└──────────┬──────────────┬──────────────┬────────┘
           ▼              ▼              ▼
    ┌────────────┐ ┌────────────┐ ┌────────────┐
    │ Backbone   │ │ Edge       │ │ White-Label │
    │ C-end VPN  │ │ B2B Resi   │ │ API (B2B)  │
    └────────────┘ └────────────┘ └────────────┘
DEMAND SIDE
```

Render this as a clean, animated component — use Framer Motion to animate each tier appearing sequentially. Use Solarized brand colors: cyan (`#2aa198`) for platform, blue (`#268bd2`) for supply, green (`#859900`) for demand.

---

### Section 5: Key Numbers

**Layout**: 4-5 large stat cards in a row.

**Section header**:
```
[Eyebrow]
"MARKET OPPORTUNITY"

[Title]
"Building at the intersection of three massive markets"
```

**Stats**:
```
$50B+          31%           800M+          $1B+
TAM: VPN +     VPN market    Users behind   Grass valuation
Proxy + DePIN  CAGR          firewalls      (DePIN comparable)
```

Each stat: Large number (gradient text or cyan), small label below (text-tertiary). Glass card or just clean typography on dark bg.

---

### Section 6: Tokenomics (Brief)

**Layout**: Left side — allocation visual (horizontal bars or pie chart). Right side — 5 utility cards.

**Section header**:
```
[Eyebrow]
"$MIWIM TOKEN"

[Title]
"Not a fundraising tool — the network's settlement layer"
```

**Left column — Token allocation**:
```
Total supply: 1,000,000,000 $MIWIM

40%  Node rewards        ████████████████████
20%  Team & advisors     ██████████
15%  Investors           ███████▌
15%  Ecosystem fund      ███████▌
10%  Community           █████
```

Use colored horizontal bars matching brand palette. Each bar has percentage, label, and brief note (e.g., "4-year emission, annual halving").

**Right column — Token utility** (5 small cards or icon rows):
```
Pay    — 20% discount when paying with $MIWIM
Stake  — Providers stake to guarantee SLA
Earn   — Bandwidth providers earn $MIWIM
Govern — Token holders vote on network params
Burn   — 10% of revenue buys back and burns
```

**CTA at bottom**:
```
[Read full tokenomics →]  (links to /docs/whitepaper/tokenomics)
```

---

### Section 7: Roadmap

**Layout**: Horizontal timeline with 4 phases. Current phase highlighted.

```
Q3 2026          Q4 2026          Q1 2027          Q2 2027
●────────────────○────────────────○────────────────○
FOUNDATION       GROWTH           TOKEN LAUNCH     SCALE

MVP launch       iOS + Desktop    Testnet→Mainnet  500+ global nodes
10+ nodes        White-label API  $MIWIM TGE       10K+ users
100 beta users   50+ nodes        Provider staking  50+ B2B clients
Seed round       1K users         Bandwidth proof   Marketplace
                 First B2B
```

Current phase (Q3 2026) should be highlighted with a filled circle and a glow effect. Future phases use outline circles.

---

### Section 8: Dual CTA — Waitlist + Genesis Nodes

**Layout**: Two side-by-side cards, each with a form.

**Section header**:
```
[Eyebrow]
"JOIN THE NETWORK"

[Title]
"Two ways to get involved"
```

**Card A — User Waitlist**:
```
Title: "Get early access"
Description: "Be among the first to use Miwim. Waitlist members
get priority access and airdrop eligibility."

Form fields:
- Email (required)
- Country (dropdown, optional)
- "How much do you spend on VPN/proxy per month?" (dropdown: Free / <$5 / $5-15 / $15-30 / $30+)
- "What's your biggest pain point?" (dropdown: Speed / Price / Trust / IP blocked / Other)

[Join Waitlist] button
```

**Card B — Genesis Node**:
```
Title: "Run a genesis node"
Description: "Contribute idle servers or home bandwidth.
Genesis node providers earn founding rewards and bonus
token allocation."

Form fields:
- Email (required)
- Server location / Country (text input)
- Node type (dropdown: Datacenter VPS / Home broadband / Both)
- Approximate bandwidth (dropdown: <50 Mbps / 50-200 Mbps / 200+ Mbps / Not sure)

[Apply as Provider] button
```

**Implementation**: Embed Tally.so forms (or build simple API routes that POST to Supabase / Google Sheets). If using Tally, style the embeds to match the dark theme.

---

### Section 9: Footer

**Layout**: Clean, minimal, dark.

```
[Logo]  MIWIM

Decentralized proxy infrastructure

Products          Resources         Community        Legal
Backbone          Whitepaper        Twitter/X        Privacy Policy
Edge              Technical Docs    Telegram         Terms of Service
API (coming)      Blog (coming)     Discord
                  FAQ (coming)      GitHub

───────────────────────────────────────────────
© 2026 Miwim Network. All rights reserved.
```

Social links with icons: Twitter/X, Telegram, Discord, GitHub.

---

## 6. Documentation Site (Docs)

### Platform
Use **Nextra** (https://nextra.site) — it's built on Next.js, supports MDX, has a built-in dark theme, sidebar navigation, and search. It integrates naturally into the same Next.js project.

### Theme Customization
- Dark mode by default (match main site's color palette)
- Override Nextra's default accent to match `--color-primary: #2aa198` (Solarized cyan)
- Custom logo in sidebar header
- Add "Back to main site" link in nav
- Footer matches main site footer

### Structure
All content is MDX files in `/content/docs/` directory. Nextra auto-generates sidebar from file structure.

```
docs/
├── index.mdx                    # Docs landing page
├── whitepaper/
│   ├── _meta.json               # Sidebar ordering
│   ├── index.mdx                # Whitepaper overview
│   ├── introduction.mdx
│   ├── problem.mdx
│   ├── solution.mdx
│   ├── architecture.mdx
│   ├── tokenomics.mdx
│   ├── roadmap.mdx
│   └── team.mdx
├── technical/
│   ├── _meta.json
│   ├── index.mdx                # Technical docs overview
│   ├── architecture-overview.mdx
│   ├── node-roles.mdx
│   ├── residential-routing.mdx
│   ├── privacy-model.mdx
│   ├── token-pricing.mdx
│   ├── provider-agent.mdx
│   ├── smart-routing.mdx
│   └── api-reference.mdx        # Placeholder
└── community/
    ├── _meta.json
    ├── getting-started.mdx
    ├── run-a-node.mdx
    └── links.mdx
```

---

## 7. Whitepaper Content

The whitepaper should read as a serious crypto infrastructure document — not a marketing brochure. Tone: technical but accessible. Length: ~4,000-6,000 words total across all chapters.

### Chapter 1: Introduction
- What is Miwim — one paragraph elevator pitch
- Why now — DePIN market timing, censorship growth, residential IP demand
- Document structure overview

### Chapter 2: Problem
- Trust crisis in centralized proxy/VPN market (data: 10+ major shutdowns in 2023-24)
- IP resource monopoly (Bright Data pricing, $8-15/GB, ethical concerns)
- Single point of failure (censorship, seizure, blocking)
- The gap: no project combines decentralized supply + consumer product + B2B API + token economics

### Chapter 3: Solution — Miwim Network
- Overview of Backbone + Edge dual-track architecture
- Miwim Backbone: datacenter proxy for consumers
- Miwim Edge: residential IP proxy for business
- White-label API: infrastructure-as-a-service for proxy resellers
- Why all three must exist together (flywheel effect)

### Chapter 4: Architecture
- Network topology: Supply → Platform → Demand
- Node role auto-detection (benchmark suite, role assignment logic)
- Residential IP routing (reverse tunnel architecture, forced chain proxy)
- Privacy model (5 layers: TLS, multi-hop separation, ECH, zero-log attestation, economic deterrent)
- Smart routing engine (health scoring, geographic optimization, failover)
- Latency analysis (multi-hop overhead, Backbone vs Edge comparison)

### Chapter 5: Tokenomics
- Token overview: $MIWIM, 1B supply, fixed
- Allocation table (40/20/15/15/10 split with vesting details)
- Emission schedule (4-year halving curve)
- Token utility (Pay, Stake, Earn, Govern, Burn)
- Demand sinks (user discount, provider staking, B2B staking, revenue buyback, governance)
- Price stability mechanisms (emission cap, TWAP buyback, vesting, low float)
- Hybrid oracle pricing model (USD-denominated, token discount, 24h TWAP)
- Provider reward pricing (USD-stable, token-denominated payout)

### Chapter 6: Roadmap
- Q3 2026: Foundation (MVP, seed nodes, beta users, seed round)
- Q4 2026: Growth (iOS/desktop, white-label API, first B2B)
- Q1 2027: Token launch (testnet, mainnet, TGE, staking)
- Q2 2027: Scale (500+ nodes, 10K+ users, marketplace)

### Chapter 7: Team
- Placeholder section: "Team details will be updated prior to TGE."
- Structure for each member: Name, Role, Background (1-2 sentences), LinkedIn/Twitter
- Advisory board placeholder

---

## 8. Technical Documentation Content

These are developer-facing technical docs. Tone: precise, concise, code-heavy where relevant. Include diagrams (Mermaid or inline SVG) where they help.

### Architecture Overview
- System diagram (supply → platform → demand)
- Component list: Provider Agent, Backend API, Node Registry, Config Generator, Health Monitor, Smart Router
- Tech stack table

### Node Roles & Detection
- Benchmark suite details (latency matrix, bandwidth test, IP type, route quality)
- Role assignment pseudocode
- Dynamic re-evaluation (6-hour cycle)
- MVP simplification notes

### Residential IP Routing (Edge)
- Reverse tunnel architecture diagram
- VLESS over WebSocket protocol choice and rationale
- Singbox chain outbound config example (full JSON)
- Agent behavior: outbound tunnel initiation, keepalive, reconnect
- IP pool design and rotation logic
- Dedicated IP binding for premium users

### Privacy Model
- 5-layer defense description
- What relay sees vs what exit sees (table)
- Binary attestation flow
- Canary traffic audit mechanism
- Slashing penalties
- Comparison table vs centralized alternatives

### Token Pricing Mechanism
- Hybrid oracle model explanation
- TWAP calculation
- User payment flow (fiat vs token)
- Provider reward payout flow
- Concrete example with numbers
- Edge cases: price crash, price spike, manipulation attempt

### Provider Agent
- System requirements (Go, systemd, network)
- Installation (one-liner script)
- Configuration file format
- Heartbeat protocol (POST /api/nodes/{id}/heartbeat)
- Metrics endpoint (/metrics)
- Benchmark routine
- Reverse tunnel setup (for residential nodes)

### Smart Routing
- Algorithm pseudocode
- Health score formula: uptime×0.4 + (100-latency_rank)×0.3 + bandwidth_rank×0.3
- Geographic relay placement rule
- Failover chain construction (3 chains per user)
- Redis caching strategy

### API Reference (Placeholder)
- "The Miwim white-label API is currently in development. Documentation will be published here when the API enters beta in Q4 2026."
- Planned endpoints overview (subscribe, node-list, usage, billing)

---

## 9. Assets to Generate

Since we're starting from scratch, the following assets must be created during the build:

### Logo
- Text-based logo: "MIWIM" in Inter 700, with custom letter-spacing
- Optional: Abstract icon mark — a stylized "M" or network/mesh symbol
- Variants needed:
  - Full logo (icon + text), dark background
  - Full logo, light background (for docs)
  - Icon only (for favicon, social)
  - Monochrome white (for footer, overlays)
- Format: SVG (primary), PNG fallbacks at 32px, 180px, 512px

### Favicon
- Generate from logo icon mark
- Sizes: 16x16, 32x32, 180x180 (Apple touch), 512x512
- Also: site.webmanifest with theme_color `#2aa198` (Solarized cyan)

### Open Graph Images
- Default OG image (1200x630): Dark background, logo, tagline "Decentralized Proxy Infrastructure"
- Whitepaper OG image: "Miwim Whitepaper — Decentralized Proxy Infrastructure"
- Docs OG image: "Miwim Technical Documentation"

### Illustrations (SVG, inline or component-based)
These should be clean, abstract, geometric — matching the crypto/infrastructure aesthetic. NOT photo-realistic, NOT cartoon. Think: colored lines, nodes, connections, geometric shapes.

Needed:
1. **Hero background**: Interactive physics-driven network canvas — nodes with mouse-following gravity well effect (see Hero section for full implementation spec). Built with raw `<canvas>` + `requestAnimationFrame`, no external library needed.
2. **How it works diagram**: Three-tier supply→platform→demand (built as React component)
3. **Backbone visual**: Abstract representation of fast, direct data flow
4. **Edge visual**: Abstract representation of multi-hop residential routing
5. **Token flywheel**: Circular flow diagram for tokenomics section

These can be built as Tailwind-styled divs + SVG elements. No need for external illustration tools.

---

## 10. SEO & Meta

### Meta Tags (per page)
```html
<title>Miwim — Decentralized Proxy Infrastructure</title>
<meta name="description" content="DePIN-powered proxy network with decentralized VPN, residential IPs, and white-label APIs. Governed by the $MIWIM token." />
<meta property="og:title" content="Miwim — Decentralized Proxy Infrastructure" />
<meta property="og:description" content="The internet's proxy layer, owned by everyone." />
<meta property="og:image" content="https://miwim.io/og/default.png" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@miwim_network" />
```

### Structured Data
- Organization schema for Miwim
- WebSite schema with search action

### Sitemap
- Auto-generate via Next.js sitemap plugin
- Include all landing page sections and all docs pages

### Robots.txt
```
User-agent: *
Allow: /
Sitemap: https://miwim.io/sitemap.xml
```

---

## 11. Deployment

### Vercel Configuration
```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_SITE_URL": "https://miwim.io"
  }
}
```

### Domain Setup
- Primary: miwim.io (or miwim.network)
- Redirect: www → non-www
- HTTPS: Automatic via Vercel

### Environment Variables
```
NEXT_PUBLIC_SITE_URL=https://miwim.io
NEXT_PUBLIC_TALLY_USER_FORM_ID=xxxxx     # User waitlist form
NEXT_PUBLIC_TALLY_PROVIDER_FORM_ID=xxxxx # Provider form
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=miwim.io    # Analytics
```

---

## 12. Post-Launch Checklist

After the initial build, the following must be manually completed:

- [ ] Register domain (miwim.io or miwim.network)
- [ ] Create Tally.so forms and update form IDs in env
- [ ] Create Twitter/X account: @miwim_network
- [ ] Create Telegram group
- [ ] Create Discord server (optional)
- [ ] Create GitHub org: github.com/miwim-network (for open-source credibility)
- [ ] Set up Plausible analytics (or Vercel Analytics)
- [ ] Fill in team section when ready
- [ ] Submit sitemap to Google Search Console
- [ ] Test all OG images with Twitter Card Validator and Facebook Debugger
- [ ] Verify mobile responsiveness on real devices
- [ ] Test waitlist form submission end-to-end

---

## Implementation Priority

If time is constrained, build in this order:

1. **P0 (ship in 2-3 days)**: Hero + Problem + Solution + CTA (waitlist forms) + Footer. This is enough for "Week 0" launch.
2. **P1 (days 3-5)**: How it works + Key numbers + Tokenomics + Roadmap sections. Full landing page.
3. **P2 (days 5-7)**: Docs site setup + Whitepaper content + Basic technical docs.
4. **P3 (week 2)**: Polish — animations, OG images, SEO, remaining technical docs.

P0 is the minimum needed to start collecting waitlist signups. Don't let P2-P3 block the launch of P0.
