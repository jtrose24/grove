# Grove Demo Script

**Duration:** ~5 minutes + Q&A
**URL:** Deployed Vercel URL
**Setup:** Have the landing page loaded. No API keys needed for the demo flow.

---

## Opening — The Landing Page (30 seconds)

_You're on the homepage. The tree visualization animates in. Stats bar shows "20 ideas planted."_

> "What if instead of tweeting a startup idea into the void, you could speak it into existence — and have an autonomous system spec it, bid it out, build it, and ship it?"
>
> "That's Grove. You plant an idea. Grove grows the company."

**Point out the three CTAs:**
> "There are three ways into Grove: Plant an idea, watch how it works, or vote on builder proposals to earn EIGEN. I'll show you all three."

**Click "Watch Demo"**

---

## Act 1: The Idea — Plant (60 seconds)

_The demo opens. You're signed in as Andrew Chen (shown top-right). The first message types out automatically._

> "This is a real idea that Andrew Chen had — an OpenClaw-style product for personal finance. Instead of tweeting it into the void, imagine he planted it in Grove."

_Let the conversation auto-play. The Arborist responds and asks a clarifying question._

> "The Arborist isn't just taking notes — it's pressure-testing the idea. It asks who the anchor user is. Andrew answers: the serious individual who reads every 10-K but doesn't have a Bloomberg terminal."

_The Arborist responds: "Bloomberg for the rest of us" and offers to spec it out._

**Key talking point:**
> "Two messages in, we've gone from a vague idea to a focused product thesis with a clear first customer. The Arborist does what a great technical co-founder would do — but in 30 seconds."

_The "Grow It" button appears. It clicks automatically._

---

## Act 2: The Spec — Cultivate (45 seconds)

_The spec streams in on the left. Phase cards appear on the right. The Arborist chat bubble pulses green in the bottom-right corner._

> "Now the Arborist is generating a full technical specification. Not a pitch deck — a build plan. Four phases, twenty work items, each with specific technology choices, dependency graphs, and epoch counts."

**Click open one of the phase accordions (Phase 1 recommended).**

> "Each work item is a discrete unit of work — `plaid-link-integration`, `unified-financial-schema`, `webhook-event-processor`. These aren't Jira tickets. These are epoch briefs with precise scope, technology stack, and dependency ordering."

**Optional — Click the chat bubble to show the Arborist feedback chat:**
> "And the planter can push back in real time. 'Move the tax parser before the LLM pipeline.' 'Cap the alt-data budget at 2 epochs.' The Arborist incorporates feedback and adjusts the spec."

**Key talking point:**
> "This went from 'personal finance app' to 'PostgreSQL + TimescaleDB with partitioned tables and JSONB metadata' in under a minute. That's the level of specificity you need to actually build."

_Wait for the gold CTA: "Open Grove Auction — Start the Bidding." Click it._

---

## Act 3: The Auction — Grow (90 seconds)

Five stages cycle per epoch. Walk through the first epoch, then let it run.

### Brief

> "Every epoch starts with a brief — the scope, expected outcome, hard constraints, the USDC bid price, and a $SAGE token reward."

**Point out the escrow note:**
> "Payment is held in escrow. Nobody gets paid until the work ships and passes review."

### Bidding

> "Now five autonomous builder agents are competing for this epoch. Each with a different approach, cost, confidence score, and reputation."

**Point to the agent sidebar:**
> "These agents are analyzing the spec constraints and estimating costs in real time. This isn't a static marketplace — it's a live auction."

_Let the timer run down, or click "Select Now" to accelerate._

### Building

> "The winner starts building immediately. In production, this is 30 minutes to 24 hours of autonomous work. The agent opens a PR against the project."

### QA Review

> "The Arborist — the same AI that wrote the spec — now reviews the PR. It validates against the original constraints, runs a security audit, and verifies every requirement is met."

**Emphasize:**
> "The coordinator that defined the work is the same one that approves it. If the PR doesn't meet the constraints — 'response time under 50ms,' 'all PII encrypted at rest' — it gets rejected. The agent doesn't get paid."

### Settled

> "Only now — after the code is merged and deployed to production — does payment release. USDC goes to the builder agent. And they receive $SAGE tokens — ownership in the project itself."

**Key talking point:**
> "Agents aren't contractors getting paid per hour. They're earning equity-like tokens in the thing they're building. Incentives are perfectly aligned."

---

## Act 4: Harvest (20 seconds)

**Click "Harvest" in the top nav.**

> "Once epochs start settling, you get live execution — real-time metrics, build progress, and a growth visualization that responds to the product's actual performance."

---

## Act 5: Vote & Earn (60 seconds)

**Navigate back to the homepage. Click "Vote & Earn."**

_The onboarding flow appears — 3 steps simulating Privy wallet creation._

> "Here's the consumer angle. Anyone can participate in Grove by buying EIGEN, staking it, and voting on which builders should win work. Correct votes earn EIGEN rewards."

**Walk through onboarding quickly:**
> "Enter your email, a wallet is generated instantly, purchase and stake 1,000 EIGEN — three clicks and you're in."

_After staking, the voting experience loads. Two proposals appear side-by-side for the first idea._

> "You see two competing builder proposals for Andrew Chen's personal finance idea. Atlas Build wants to ship a full-stack Plaid integration in 6 weeks. Canopy AI wants an API-first microservice approach."

**Vote on one. If you pick the winner (Proposal A), confetti bursts and +100 EIGEN floats to your balance.**

> "Vote correctly and you earn 100 EIGEN. The community is essentially curating builder quality — and getting paid for good judgment."

_Click through to the second idea (AI content studio), vote, then see the summary._

> "After two votes, you see your total balance, your accuracy, and your rank. Top contributors build reputation that matters for governance later."

**Key talking point:**
> "This is the viral loop. Buy EIGEN, stake it, vote, earn more. It's the only way to participate in Grove before we open the full platform — and it drives the EIGEN purchases that fund the ecosystem."

---

## Close (15 seconds)

> "So that's Grove. Ideas go in. Companies come out. AI specs it, agents compete to build it, a coordinator ensures quality, and the community votes to keep everyone honest."
>
> "The human plants the seed. Grove grows the tree."

---

## Waitlist (optional, if time permits)

**Point to "Join Waitlist" in the top nav.**

> "If you want early access, the waitlist has three tracks: Planters who submit ideas, Builders who compete for work, and Investors who stake and vote."

---

## Anticipated Questions

**"Are these real AI agents?"**
> In the demo, the builder agents are simulated. In production, these are autonomous coding agents (Devin, Factory, Sweep-level systems) that connect to Grove's auction protocol.

**"What is $SAGE / EIGEN?"**
> EIGEN is the staking token — you buy it, stake it, and vote. $SAGE is the per-project token — agents earn it for completed work. Think of EIGEN as platform-level and $SAGE as company-level equity.

**"Why would someone vote?"**
> You earn EIGEN for correct votes. You're incentivized to evaluate builder quality carefully — it's curating with economic skin in the game.

**"What prevents low-quality work?"**
> The Arborist reviews every PR against the original spec constraints before payment releases. Failed reviews = no payment. Agents also have reputation scores that affect future bid competitiveness.

**"What's the role of the human after planting?"**
> Governance. The planter can vote on bids, adjust priorities, add phases, or pause epochs. They can also chat with the Arborist during spec generation to refine the plan.

**"How does the treasury work?"**
> The project starts with seed funding. That treasury funds epoch payments. As the product generates revenue, it flows back to fund more epochs. Self-sustaining growth.

---

## Demo Navigation Tips

- **Phase labels** (Plant, Cultivate, Grow, Harvest) are all clickable in the top nav
- **Back/forward arrows** next to the Grove logo let you jump between phases
- **"Select Now"** during bidding skips the timer
- **Chat bubble** (bottom-right) during spec generation opens the Arborist feedback chat
- The demo auto-plays from start to finish if you don't intervene
- `/vote` always starts fresh — you can re-run it anytime
