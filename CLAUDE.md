# CLAUDE.md — Miwim Web Project

## What is this project?
Miwim is a decentralized proxy infrastructure (DePIN). This repo builds the public-facing website and documentation site.

## Read order
1. **`docs/Website_Spec.md`** — The complete build specification. Read this FIRST and IN FULL before writing any code. It contains: tech stack, design system (Solarized color palette), page-by-page content, interactive hero spec, Nextra docs structure, deployment config, and implementation priority.
2. **`docs/content-source/`** — Reference files for writing documentation and whitepaper content:
   - `Technical_Plan.md` — Full technical architecture, including 4 core designs (node roles, residential routing, privacy model, token pricing). Use this to write the `/docs/technical/*` MDX pages.
   - `Tokenomics.md` — Complete token economy model. Use this to write `/docs/whitepaper/tokenomics.mdx` and the landing page tokenomics section.
   - `Competitive_Analysis.md` — Market sizing (TAM/SAM/SOM) and competitor analysis. Use this to write `/docs/whitepaper/problem.mdx`, `/docs/whitepaper/solution.mdx`, and the landing page Key Numbers section.

## Key decisions already made
- **Framework**: Next.js 14+ (App Router) + Tailwind CSS 4 + Framer Motion
- **Docs**: Nextra, mounted at `/docs` within the same Next.js project
- **Color system**: Solarized (matching existing Android app). Dark theme default. Primary: `#2aa198` (cyan), Accent: `#d33682` (magenta), Gold: `#b58900`.
- **Hero**: Interactive physics-driven network canvas (nodes follow mouse cursor as gravity well). Full implementation spec in Website_Spec.md Section 1.
- **Hero headline**: Rotating keyword animation — words cycle through with slide-up transition.
- **Language**: English only. No i18n.
- **Deployment**: Vercel.
- **Waitlist**: Tally.so embed or simple API route.

## Build priority
- **P0 (days 1-3)**: Hero (with interactive canvas + rotating keyword) + Problem + Solution + Waitlist CTA + Footer. Ship this first.
- **P1 (days 3-5)**: How it works + Key numbers + Tokenomics + Roadmap. Full landing page.
- **P2 (days 5-7)**: Nextra docs site setup + Whitepaper chapters + Basic technical docs.
- **P3 (week 2)**: Polish — animations, OG images, SEO meta, remaining technical docs.

## Commands
```bash
# Development
pnpm dev            # Start dev server

# Build
pnpm build          # Production build

# Deploy
vercel              # Deploy to Vercel (or push to main for auto-deploy)
```

## Don't
- Don't use any color outside the Solarized palette defined in Website_Spec.md Section 4
- Don't add i18n / Chinese content
- Don't use external physics libraries for the hero canvas if raw canvas + rAF is sufficient
- Don't create a separate repo for docs — it's part of this project at `/docs`
- Don't fake trust bar logos — if no real logos, skip the section
