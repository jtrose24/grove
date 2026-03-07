# Venice Demo — 5 Minute Bakeoff Presentation

**Context:** Internal team bakeoff. Everyone is presenting their version of what Venice should look like at v1.

**Setup:** Browser open to the Grove homepage.

---

## 0:00–0:40 — Framing

> "For my version of Venice, I tried to answer a simple question: what does it actually feel like to speak an idea into this product, iterate on it, land on a spec, and then watch it come to life as executors bid and build?"

> "So I built that flow end-to-end. I spent less time on the executor experience itself — that could be a fast follow — and more time on the planter's journey from raw idea to live execution."

> "As I built it, I realized it needed a demo to show the full loop, so I'll walk through that. And then I realized something about launch: planters and executors will both be gated. And since the individual project tokens won't be investable at launch either, you can't speculate on them directly. So the only permissionless way to engage with Venice at launch is to watch the flow of ideas and bidding — and vote on them to earn. That became the third piece I built."

> "Let me show you all three."

**Click "Watch Demo."**

---

## 0:40–1:40 — The Planter Experience

_Demo opens. Signed in as Andrew Chen (top-right). First message auto-types._

> "This is Andrew Chen planting an idea — OpenClaw for personal finance. About 40 words. The kind of thing you'd say to a friend over coffee."

_Let the Arborist conversation play. It asks a sharpening question._

> "The Arborist immediately pressure-tests it. 'Who's your anchor user?' Andrew answers: the person who reads every 10-K but doesn't have a Bloomberg terminal. Two exchanges — we go from a vague idea to 'Bloomberg for the rest of us' with a clear first customer."

> "This is the core of the planter experience. You talk to Venice like you'd talk to a great co-founder. It sharpens the idea, not just transcribes it."

_"Grow It" appears and auto-clicks._

---

## 1:40–2:40 — The Spec: Arborist Builds the Plan

_Spec streams on the left. Phase cards appear on the right._

> "Now the Arborist generates a real build plan. Four phases, twenty work items, each with technology choices, dependencies, and epoch counts."

**Open Phase 1 accordion.**

> "`plaid-link-integration`, `unified-financial-schema`, `webhook-event-processor` — PostgreSQL + TimescaleDB, Redis Streams, OAuth2. This is architect-level specificity from a natural language conversation."

**Point to the chat bubble (bottom-right):**

> "And the planter can push back — 'move the tax parser before the LLM pipeline,' 'cap this at 2 epochs.' The Arborist adjusts in real time. It's a conversation, not a one-shot generation. This felt important to me — the planter should feel like they're shaping the plan, not just receiving one."

_"Open Grove Auction" button appears. Click it._

---

## 2:40–3:30 — The Auction: Executors Compete

_Epoch 1 brief loads. Five builder agents appear._

> "Each work item becomes an epoch — a self-contained contract with scope, constraints, USDC payment, and a project token reward."

_Bidding opens. Agents submit bids._

> "Five builder agents competing. Different approaches, costs, confidence, reputations. The auction selects the best bid."

_Let timer run or click "Select Now." Building → QA → Settle._

> "Winner builds, opens a PR. The same Arborist that wrote the spec reviews the code against the original constraints. If it doesn't meet spec — no payment. Then settlement: USDC plus project tokens. The agents earn equity in what they build."

> "I didn't go deep on the executor-side UX — what it looks like from the agent's perspective to receive a brief, submit a bid, manage a portfolio. That's a real product surface but felt like a fast follow. The important thing here is the planter sees their idea becoming real, epoch by epoch."

---

## 3:30–4:40 — The Permissionless Entry Point

> "This is the piece that clicked for me when I thought about launch. Planters are gated — we're curating who can submit ideas. Executors are gated — we need quality agents. And the individual project tokens aren't investable yet, so you can't speculate on them directly."

> "So what can anyone actually do at launch? Watch the flow of ideas and bidding — and vote on it."

### The Fishbowl: Explore

**Navigate back to homepage. Click "Explore all →" in the stats bar.**

_The Explore page loads — grid of all 20+ ideas with status badges, phase indicators, and planter info._

> "So we created a way to browse everything that's happening inside Venice. This is the fishbowl. You can see every idea that's been planted, which ones have live bids, how mature they are — is it still in the idea stage, is it being specced out, is there an active auction, is it already shipping code?"

> "Imagine bookmarking the ones you're personally invested in or following. You're watching this ecosystem of ideas being built in real time — even if you can't plant or execute yet."

**Click into one of the ideas briefly to show the detail page, then navigate back.**

> "And then the question becomes: what would it actually look like for someone — maybe not even crypto-native, maybe they've never held EIGEN — to create an account and get involved with these ideas?"

### Onboarding & Voting

**Navigate back to homepage. Click "Vote & Earn."**

_Onboarding flow: email → wallet created → stake 1,000 EIGEN._

> "This is what that looks like. Simulated Privy flow — enter your email, a wallet is created for you instantly, purchase and stake EIGEN. Three steps. No MetaMask, no seed phrases. Someone who's never touched crypto can do this."

_Voting experience loads. Two proposals side-by-side._

> "Now you're in. You see two competing builder proposals for an idea you were just watching in the fishbowl. You evaluate the approaches and vote."

**Vote on one. If correct — confetti, +100 EIGEN floats to balance.**

> "Correct vote, you earn EIGEN. This is the permissionless loop: buy EIGEN, stake, vote, earn more. It's the only way to participate at launch — and it's the thing that drives EIGEN demand before anything else is open."

_Click through to the second idea, vote, then summary._

> "After voting you see your accuracy, rank, total earnings. The scorecard creates the competitive/addictive element — 'top 3% contributor,' streaks, all of that."

---

## 4:40–5:00 — What I Think This Means for V1

> "So to recap what I built: the full planter journey from idea to live execution, a demo that shows the whole loop, the fishbowl where anyone can browse what's happening, and a permissionless Vote & Earn flow that could be the launch product."

> "The pieces I'd want to discuss:"
>
> "**The planter flow** — is the Arborist conversation the right entry point? How much should planters be able to steer the spec?"
>
> "**The executor experience** — I kept it light here. How deep does that need to be at v1?"
>
> "**Explore as the fishbowl** — is browse + bookmark + follow enough to keep people engaged before they can vote? What else do they want to see?"
>
> "**Vote & Earn as the launch wedge** — if planters and executors are both gated and tokens aren't investable, this might be the only permissionless surface. Is that enough to bootstrap engagement?"

---

## Q&A Notes

| Topic | Notes |
|-------|-------|
| **Planter flow** | Conversation → spec → auction → track execution. Planter can chat with Arborist during spec to refine. |
| **Spec generation** | Uses Claude to generate structured work items with tech stacks, deps, epoch counts. Live (not just demo). |
| **Executor flow** | Simulated in demo. 5 agents bid, winner builds, Arborist QA reviews, payment settles. Executor-side UX is a fast follow. |
| **Explore (fishbowl)** | Browse all ideas, see status/phase/live bids. Future: bookmark, follow, notifications. The spectator experience before you can participate. |
| **Vote & Earn** | Simulated Privy onboarding. Stake EIGEN, vote on proposals, earn for correct votes. Scorecard with accuracy/rank/streaks. |
| **Launch gating** | Planters: gated. Executors: gated. Project tokens: not investable. Explore: open. Vote & Earn: permissionless. |
| **Waitlist** | Three tracks in nav: Planter (submit ideas), Builder (compete for work), Investor (stake and vote). |
| **What's live vs simulated** | Spec generation is live (calls Claude API). Everything else is simulated demo data with realistic UX. |
