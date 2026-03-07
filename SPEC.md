# Grove — Demo Web App Spec

## 0. Overview

Grove is a web-based demo application that allows users to:

- Speak or type an idea into a conversational interface.
- Collaborate with an LLM to refine and debate the idea.
- Press "Grow It" to activate a Coordinator Agent.
- Watch the idea become a structured build spec.
- Observe live auctions where external agents bid to execute pieces of the spec.
- Participate in voting / prediction on which bid will create the most value.
- Watch selected agents execute their work live.
- See real-time impact metrics update as the work ships.

This demo focuses on:
- Conversational ideation
- Spec generation by a coordinator
- Live bidding & voting
- Live execution + impact visualization

---

## 1. Naming System

### App Name
**Grove**

### Tagline
> "Plant an idea. Grow a company."

### Roles

| System Role        | Internal Name  | User-Facing Name |
|--------------------|----------------|------------------|
| Idea Originator    | Seed User      | Planter          |
| Coordinator Agent  | Master Agent   | Arborist         |
| Executor Agents    | Swarm Agents   | Builders         |
| Auction Epoch      | Epoch          | Growth Cycle     |
| Tokens / Equity    | Shares         | Seeds            |

---

## 2. Core User Flow

### Flow 1 — Planting an Idea

1. User lands on homepage.
2. Large chat interface centered.
3. Prompt: *"What would you like to grow?"*
4. User types or speaks idea.
5. LLM responds conversationally.
6. Iteration continues.
7. User clicks: 🌱 **Grow It**

### Flow 2 — Arborist Spec Generation

Upon clicking "Grow It":

- Transition animation: Seed → Tree Blueprint
- Arborist activates.
- UI splits into:
  - **Left Panel:** Live spec generation stream (LLM output), structured breakdown into Phases
  - **Right Panel:** Visualization of "Growth Plan"
    - Roots (Foundations)
    - Trunk (Core Product)
    - Branches (Features)
    - Canopy (Growth/Distribution)

**Spec example structure:**
- Phase 1: Core Product Definition
- Phase 2: MVP Build
- Phase 3: Distribution Strategy
- Phase 4: Monetization Layer

Each Phase becomes a **Bid Opportunity Card**.

### Flow 3 — Live Bidding (Growth Cycle)

Each Phase enters a timed Growth Cycle (default: 2 minutes for demo).

**Bid Card UI Must Show:**
- Phase Name
- Description
- Countdown timer
- Live bids appearing in real-time

**Each bid includes:**
- Builder Name (with avatar)
- Reputation score
- Proposed approach (short)
- Cost (in Seeds)
- Predicted Value
- Confidence score
- Live Upvotes / Downvotes

**Prediction Market Layer**

Users can: 👍 Endorse / 👎 Doubt

Display:
- Sentiment Bar (green/red split)
- Live probability % of success

**Arborist selects winning bid at end of timer based on:**
```
weighted_score =
  (predicted_value * confidence)
  + (upvotes - downvotes)
  + (builder_reputation)
```

Winner is highlighted with growth animation.

---

## 3. Execution View (Magical Moment #1)

After winner selected, UI transitions to **"Live Build Mode"**:

**Left — Live activity stream:**
- "Builder X is scaffolding backend…"
- "API routes deployed…"
- "Landing page A/B test launched…"

**Right — Impact dashboard (real-time updating):**
- Users
- Revenue
- Conversion
- Engagement
- Traffic
- Feature completion %

Metrics should animate upward gradually. Even if simulated, it must feel real.

---

## 4. Impact Visualization (Magical Moment #2)

Tree grows visually as:
- Features ship → branches expand
- Users increase → canopy fills out
- Revenue grows → fruit appears

Simple SVG animation for demo.

---

## 5. Interface Layout

### Landing Page

**Hero:**
> Grow companies the way forests grow.
> Naturally. Collectively. Intelligently.

**CTA:**
- Start Planting
- Watch Demo

### Main App Layout

```
-------------------------------------------------
Top Nav: Grove | Active Project | Seeds | Profile
-------------------------------------------------
| Chat / Spec Panel | Live Bidding / Build Panel |
-------------------------------------------------
```

---

## 6. Brand & Design System

**Reference:** https://eigencloud.xyz

**Borrow:**
- Typography weight hierarchy
- Clean grid structure
- Modern spacing system

**Add:**
- Softer gradients
- Organic shapes
- Slight blur/glass effects
- Subtle animated background (floating spores/light particles)

**Color Direction:**

| Role     | Color              | Hex       |
|----------|--------------------|-----------|
| Primary  | Deep Forest Green  | `#0E2F24` |
| Primary  | Moss               | `#1F5A45` |
| Primary  | Seed Gold          | `#C6A85E` |
| Accent   | Sky Blue           | —         |
| Accent   | Warm Soil Brown    | —         |

**UI Feel:** Rounded corners, soft shadows, breathing animations

---

## 7. Core Components to Build

1. **Chat Interface** — Streaming LLM responses, voice input (optional), message persistence
2. **Spec Generator** — Streaming markdown rendering, structured parsing into phases
3. **Bid Engine (Simulated OK)** — Real-time bid appearance, countdown timer, voting interaction, dynamic sorting
4. **Selection Engine** — Weighted scoring logic, winner animation
5. **Live Execution Feed** — Simulated streaming logs, status indicators
6. **Growth Visualization** — SVG tree with progressive states

---

## 8. Backend Requirements (Demo Scope)

Can be mocked.

**Required endpoints:**
- `POST /idea`
- `POST /generate-spec`
- `GET /bids/:phase`
- `POST /vote`
- `POST /select-winner`
- `GET /execution-stream`
- `GET /metrics`

**Real-time:** WebSockets or polling every 2–5 seconds.

---

## 9. Example Initial Copy

### Homepage

**Headline:** Plant an idea. Grow a company.

**Subhead:** Grove turns raw ideas into living companies — coordinated by intelligent agents and grown by a global network of builders.

**How It Works:**

1. **Plant** — Speak your idea into existence.
2. **Cultivate** — The Arborist turns it into a structured growth plan.
3. **Grow** — Builders compete to bring it to life.
4. **Harvest** — Watch value emerge in real time.

---

## 10. Demo Constraints (Build This Morning)

**Prioritize:**
- [x] Chat interface
- [x] Spec streaming
- [x] Fake but realistic live bidding
- [x] Voting UI
- [x] Winner selection animation
- [x] Fake live metrics

**Skip for now:**
- [ ] Real token economics
- [ ] True blockchain
- [ ] Real agent marketplace
- [ ] Auth system

---

## 11. Future Extensions (Not Needed Now)

- Real agent SDK
- On-chain seed issuance
- Reputation markets
- Multi-phase concurrency
- Real revenue integration

---

## 12. Technical Stack

**Frontend:** Next.js, Tailwind, Framer Motion, Zustand

**Backend:** Node, WebSocket server, Mock data engine

**LLM:** Claude / OpenAI streaming

---

## 13. Emotional Goal of Demo

User should feel:
- Empowered
- Surprised
- Participatory
- Watching intelligence coordinate
- Witnessing a living system

> The demo should feel less like software and more like watching something grow.
