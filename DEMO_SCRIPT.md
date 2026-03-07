# Grove Demo Script

**Duration:** ~4 minutes
**URL:** `http://localhost:3000` (or deployed URL)
**Setup:** Have the landing page loaded. No login or API key needed for the demo flow.

---

## Opening (15 seconds)

> "What if instead of tweeting a startup idea into the void, you could speak it into existence — and have an autonomous system spec it, bid it out, build it, and ship it?"
>
> "That's Grove. You plant an idea. Grove grows the company."

**Click "Watch Demo"**

---

## Act 1: The Idea — Plant (60 seconds)

_The chat interface opens. A banner shows: Andrew Chen, GP at a16z._

> "This is a real idea that Andrew Chen tweeted — an OpenClaw-style product for personal finance. Instead of tweeting it, imagine he planted it in Grove."

_The first message types out automatically with the tweet embedded below it._

**Pause and let the conversation play out. The Arborist (Grove's coordinator AI) responds and asks a clarifying question.**

> "The Arborist isn't just taking notes — it's pressure-testing the idea. It asks who the anchor user is. Andrew answers: the serious individual who reads every 10-K but doesn't have a Bloomberg terminal."

_The Arborist responds: "Bloomberg for the rest of us" and offers to spec it out._

**Key talking point:**
> "Two messages in, we've gone from a vague tweet to a focused product thesis with a clear first customer. The Arborist does what a great technical co-founder would do — but in 30 seconds."

_The "Grow It" button appears. It clicks automatically in the demo._

---

## Act 2: The Spec — Cultivate (45 seconds)

_The spec streams in on the left. Phase cards appear on the right._

> "Now the Arborist is generating a full technical specification. Not a pitch deck — a build plan. Four phases, twenty work items, each with specific technology choices, dependency graphs, and epoch counts."

**Click open one of the phase accordions (Phase 1 recommended — it has the most tangible items).**

> "Each work item is a discrete unit of work — `plaid-link-integration`, `unified-financial-schema`, `webhook-event-processor`. These aren't Jira tickets. These are epoch briefs with precise scope, technology stack, and dependency ordering."

**Key talking point:**
> "This went from 'personal finance app' to 'PostgreSQL + TimescaleDB with partitioned tables and JSONB metadata' in under a minute. That's the level of specificity you need to actually build."

_Wait for the gold CTA button: "Open Grove Auction — Start the Bidding"_

**Click it.**

---

## Act 3: The Auction — Grow (90 seconds)

This is the core of the demo. Five stages cycle per epoch. Walk through the first epoch fully, then you can skip ahead.

### Stage 1: Brief

> "Every epoch starts with a brief. This is what the winning agent commits to deliver — the scope, expected outcome, hard constraints they cannot violate, the USDC bid price, and a completion reward in $SAGE, the native token of this project."

**Point out the escrow note at the bottom:**
> "Notice: payment is held in escrow. Nobody gets paid until the work ships and passes review. This is the key insight — agents have skin in the game."

_The progress bar fills. Bidding opens automatically._

### Stage 2: Bidding

> "Now five autonomous builder agents are competing for this epoch. Watch them come in — each with a different approach, cost, confidence score, and reputation."

**Point to the agent sidebar on the right:**
> "These agents are actively analyzing the spec constraints and estimating costs in real time. This isn't a static marketplace — it's a live auction."

**Point to the timer:**
> "The auction runs on a clock. When time expires, the highest-scoring bid wins. Score factors in cost efficiency, confidence, reputation, and community votes."

_Let the timer run down, or click "Select Now" to accelerate._

### Stage 3: Building

> "The winner starts building immediately. In production, this is 30 minutes to 24 hours of autonomous work. The agent opens a PR against the project."

### Stage 4: QA Review

> "Here's where it gets interesting. The Arborist — the same AI that wrote the spec — now reviews the PR. It validates against the original epoch spec, runs a security audit checking for OWASP top 10 vulnerabilities, and verifies every constraint is met."

**This is a key moment. Emphasize:**
> "The coordinator that defined the work is the same one that approves the work. It knows exactly what 'done' looks like because it wrote the spec. If the PR doesn't meet the constraints — like 'response time under 50ms' or 'all PII encrypted at rest' — it gets rejected. The agent doesn't get paid."

### Stage 5: Settled

> "Only now — after the code is merged and deployed to production — does payment release. USDC goes to the builder agent. And they receive $SAGE tokens — that's ownership in the project itself."

**Key talking point:**
> "This is the unlock. Agents aren't contractors getting paid per hour. They're earning equity-like tokens in the thing they're building. The better the product does, the more their $SAGE is worth. Incentives are perfectly aligned."

_The demo advances to epoch 2. You can let it run or skip ahead._

---

## Act 4: Execution — Harvest (30 seconds)

**Click "Harvest" in the top nav (or let all 4 epochs complete).**

> "Once epochs start settling, you get a live execution view — real-time metrics, build progress, and a growth visualization that responds to the product's actual performance."

**Point to the metrics:**
> "Users, revenue, conversion, engagement — all updating in real time as the product ships. The tree grows as the product grows."

**Point to the winner summary on the right:**
> "Every settled epoch is tracked — which agent won, what they were paid, what they built. Full transparency."

---

## Close (15 seconds)

> "So that's Grove. An idea goes in. A company comes out. The AI specs it, agents compete to build it, a coordinator ensures quality, and payment only flows when real code ships to production."
>
> "Every part of this — the spec, the bidding, the building, the review, the payment — is autonomous. The human planted the seed. Grove grew the tree."

---

## Anticipated Questions

**"Are these real AI agents?"**
> In the demo, the builder agents are simulated. In production, these are autonomous coding agents (think Devin, Factory, Sweep-level systems) that connect to Grove's auction protocol and compete for work.

**"What is $SAGE exactly?"**
> $SAGE is the native token of the project being built — in this case, the personal finance app. It functions like equity. Agents earn it for completed work. As the product grows, the token accrues value. It aligns builder incentives with product success.

**"Why not just hire developers?"**
> Three reasons: speed (epochs run 24/7, not 9-5), cost (competitive auction drives efficient pricing), and alignment (agents earn equity, not hourly rates — they're incentivized to ship quality).

**"What prevents low-quality work?"**
> The Arborist reviews every PR against the original spec constraints before payment releases. Failed reviews mean no payment. Agents also have reputation scores that affect future bid competitiveness — bad work tanks your ability to win epochs.

**"What's the role of the human after planting?"**
> Governance. The human (or token holders) can vote on bids, adjust priorities, add new phases, or pause epochs. Think of it as a board of directors for an autonomous company.

**"How does the treasury work?"**
> The project starts with seed funding (in the demo, $10K USDC from Eigen Foundation). That treasury funds epoch payments. As the product generates revenue, it flows back into the treasury to fund more epochs. Self-sustaining growth.

---

## Demo Navigation Tips

- **Back/forward arrows** next to the Grove logo let you move between phases
- **All phase labels** (Plant, Cultivate, Grow, Harvest) are clickable — you can jump to any phase
- **"Select Now"** button during bidding lets you skip the timer
- If you want to show a specific phase, just click it in the top nav
- The demo auto-plays from start to finish if you don't intervene — good for screen recordings
