# $MIWIM Tokenomics Model

## Overview

| Parameter | Value |
|-----------|-------|
| Token name | $MIWIM |
| Total supply | 1,000,000,000 (fixed, no inflation) |
| Initial circulating at TGE | ~5-8% (50M-80M tokens) |
| Full emission timeline | 4 years |
| Chain | TBD (recommend Solana or Base for low fees) |

---

## Token Allocation

| Category | % | Tokens | Vesting | Notes |
|----------|---|--------|---------|-------|
| Node rewards | 40% | 400,000,000 | 4-year emission with annual halving | Primary incentive for bandwidth providers |
| Team & advisors | 20% | 200,000,000 | 2-year vest, 6-month cliff | Aligned with long-term network health |
| Investors | 15% | 150,000,000 | 1-year vest, milestone-based unlock | Seed/Series A allocation |
| Ecosystem fund | 15% | 150,000,000 | Controlled by multisig/DAO | Grants, partnerships, liquidity provision |
| Community | 10% | 100,000,000 | Various schedules | Airdrop, referral rewards, early user incentives |

---

## Emission Schedule (Node Rewards)

Node reward emission follows a halving curve to decrease inflation as the network matures.

| Year | Tokens Released | % of Node Pool | Monthly Avg |
|------|----------------|----------------|-------------|
| Year 1 | 160,000,000 | 40% | ~13.3M/month |
| Year 2 | 100,000,000 | 25% | ~8.3M/month |
| Year 3 | 80,000,000 | 20% | ~6.7M/month |
| Year 4 | 60,000,000 | 15% | ~5.0M/month |

Node rewards are distributed proportionally based on:
- Bandwidth contributed (50% weight)
- Uptime (30% weight)
- Geographic scarcity bonus (20% weight — rare locations earn more)

---

## Token Flow — How $MIWIM Circulates

```
Provider stakes tokens → Contributes bandwidth → User pays (fiat or token)
    ↑                                                    ↓
    ←── Platform collects revenue → Buyback & reward ───←
```

### The Complete Loop

1. **Provider joins**: Stakes minimum 5,000 $MIWIM to register a node
2. **Provider earns**: Receives $MIWIM proportional to bandwidth served and quality score
3. **User subscribes**: Pays in fiat (USD/CNY) or $MIWIM (20% discount if paying with token)
4. **Platform collects**: Revenue flows to platform treasury
5. **Buyback**: 10% of platform revenue used for monthly token buyback on open market
6. **Burn/redistribute**: Bought-back tokens are partially burned (5%) and partially redistributed to top-performing nodes (5%)

---

## Demand Sinks (Buy Pressure)

These mechanisms create persistent demand for $MIWIM, preventing "mine and dump":

### 1. User Payment Discount (20% off)
- Users who pay subscription with $MIWIM get 20% discount
- Example: $10/mo plan costs only $8 equivalent in $MIWIM
- Creates natural buy pressure from consumer demand
- Estimated impact: If 30% of users pay with token at scale, ~$25K/mo buy pressure at $1M ARR

### 2. Provider Staking (Minimum 5,000 $MIWIM)
- Every node provider must stake tokens to participate
- Staked tokens are locked while node is active
- Slash mechanism: 10% of stake burned if SLA violated (>5% downtime in a month)
- At 500 nodes: 2.5M tokens locked in provider stakes

### 3. B2B Client Staking (Minimum 10,000 $MIWIM)
- White-label API clients must stake tokens to access the API
- Higher tiers (more bandwidth, more concurrent users) require higher stakes
- Tier 1 (basic): 10,000 $MIWIM
- Tier 2 (pro): 50,000 $MIWIM
- Tier 3 (enterprise): 200,000 $MIWIM

### 4. Revenue Buyback (10% of revenue)
- 10% of all platform revenue (C-end subscriptions + B2B API fees) used for monthly buyback
- Buyback executed on-chain via TWAP (Time-Weighted Average Price) to minimize slippage
- At $1M ARR: ~$100K annual buyback = significant buy pressure for early-stage token

### 5. Governance
- Token required for voting on network parameters:
  - Node reward distribution ratios
  - Geographic incentive multipliers
  - Fee structure changes
  - Ecosystem fund grant allocation
- Creates holding incentive for engaged community members

---

## Supply Sources (Sell Pressure) & Mitigation

| Source | Estimated Monthly Volume | Mitigation |
|--------|------------------------|------------|
| Node rewards | 13.3M tokens (Y1) → 5M (Y4) | Halving curve + staking lock requirement |
| Referral rewards | ~500K tokens/month | 30-day vesting on referral tokens |
| Ecosystem grants | Variable | Milestone-based unlock, not upfront |
| Early investor unlock | After 1-year cliff | Milestone-gated, not time-only |
| Team unlock | After 6-month cliff | 2-year linear vest |

### Key Sell Pressure Mitigations
1. **Provider lock**: Providers must keep staked tokens while node is active — they can't sell their stake without losing their revenue stream
2. **Halving reduces new supply**: Y1 emission is 160M, Y4 is only 60M — by the time more tokens are in circulation, demand sinks should absorb the reduced new supply
3. **Utility creates natural holding**: If users get 20% discount by holding, they hold rather than sell
4. **Vesting on everything**: No allocation unlocks fully on day 1

---

## TGE (Token Generation Event) Plan

### Phase 1: Testnet (Q1 2027)
- Deploy token contract on testnet
- Simulate staking, rewards, and slashing
- Provider beta testers earn testnet tokens
- Duration: 4-6 weeks

### Phase 2: Mainnet Launch
- Deploy token contract on mainnet
- Initial liquidity via ecosystem fund (5% of supply = 50M tokens)
- Provider staking goes live
- Node rewards begin accruing

### Phase 3: Public Distribution
- Community airdrop to beta testers and early users (2% of supply)
- Referral program launch
- DEX liquidity pool established
- Investor tokens begin vesting

### Initial Circulating Supply at TGE
| Source | Tokens | % of Supply |
|--------|--------|-------------|
| Liquidity provision | 30,000,000 | 3% |
| Community airdrop | 20,000,000 | 2% |
| Early node rewards (accrued) | ~10,000,000 | 1% |
| **Total initial float** | **~60,000,000** | **~6%** |

Low float = controlled price discovery. All other tokens are locked, vesting, or staked.

---

## Key Investor Talking Points

### "Why does this project need a token?"
1. **Trustless settlement**: Anonymous providers in 50+ countries can't be paid via PayPal. Token enables permissionless, cross-border micropayments.
2. **Proof of work**: On-chain bandwidth proofs require a native unit of account. Token is the measurement layer.
3. **Aligned incentives**: Staking creates skin-in-the-game for providers. Slashing punishes bad actors. This can't be done with fiat.
4. **Network effects**: Token value reflects network value. As more users and providers join, the token captures that value for all participants.

### "How is this different from 'mine and dump'?"
- 5 distinct demand sinks (user discount, provider staking, B2B staking, buyback, governance)
- Revenue-backed buyback creates price floor that grows with adoption
- Provider staking locks tokens — you can't earn AND sell simultaneously
- Low initial float prevents day-1 dumping

### "What's the revenue-to-token relationship?"
At $1M ARR:
- $100K/year in buyback (10% of revenue)
- If token market cap is $10M, that's 1% annual buyback yield
- As ARR grows to $5M+, buyback becomes increasingly meaningful relative to circulating supply

---

## Comparable Token Economics

| Project | Market Cap | Revenue | Token Model | Miwim Comparison |
|---------|-----------|---------|-------------|------------------|
| Grass | $1B+ | Pre-revenue | Points → Token (planned) | Miwim has revenue from day 1 (subscriptions) |
| Helium (HNT) | $1.5B | $2M+ ARR | Burn-and-mint | Miwim uses staking + buyback instead |
| Filecoin | $3B | Storage revenue | Collateral staking | Similar provider staking model |
| Mysterium (MYST) | ~$50M | Minimal | Pay-per-use | Miwim adds subscription + B2B + buyback |

---

## Risk Factors & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Token price collapse | Providers leave, network shrinks | Revenue buyback creates floor; reduce emission if needed |
| Regulatory pressure | Token deemed security | Structure as utility token; decentralize governance early |
| Low initial liquidity | High volatility scares users | Ecosystem fund provides initial liquidity; TWAP buyback |
| Provider dumping | Constant sell pressure | Staking lock + halving + vesting on all allocations |
| Competition launches token | Market confusion | First-mover advantage in full-stack DePIN proxy category |
