# Grove Rebrand Exploration: Outlands / Marea / Foundra

> Consolidated report from a 5-agent team analyzing four brand treatments for the same product.

---

## Table of Contents

1. [Repo Findings](#1-repo-findings)
2. [Grove Baseline](#2-grove-baseline)
3. [Outlands](#3-outlands)
4. [Marea](#4-marea)
5. [Foundra](#5-foundra)
6. [Comparison & Recommendation](#6-comparison--recommendation)
7. [Next Steps Checklist](#7-next-steps-checklist)

---

## 1. Repo Findings

### Mood Board Location

No standalone mood board `.md` file exists. The retro-futurist visual direction is embedded directly in four coded preview pages:

- `/src/app/preview/full/page.tsx` — The most complete treatment. Color palette: Gold #daa520, Light Gold #e8c255, Orange #cc6633, Purple #7b52a0, Blue #3d5a99, BG #151210, Text #ede8e0. Features a retro portal archway SVG framing a canyon-sunset-cosmic vista with wireframe polyhedrons, cross-shaped twinkling stars, sliced sun disc, and art deco geometric borders.
- `/src/app/preview/warm/page.tsx` — Warm treatment variant
- `/src/app/preview/bold/page.tsx` — Bold treatment with rivets and deco corner brackets
- `/src/app/preview/subtle/page.tsx` — Subtle/minimal variant

### Key Visual Cues Extracted

1. **Portal/archway framing device** — user as voyager looking through a frame into a new landscape
2. **1970s retro-futurism + art deco** — sunburst fans, chevron pilasters, diamond ornaments
3. **Canyon landscape layers** — 4-6 overlapping mesa silhouettes in purple/brown gradient
4. **Wireframe polyhedrons** — icosahedron outlines floating in space, thin strokes, slow rotation
5. **Cross-shaped stars** — 4-pointed with central dot, staggered twinkling
6. **Sliced sun disc** — horizontal bands across a radial gradient circle
7. **"THE NEW FRONTIER"** tagline treatment — monospace, ultra-wide tracking, gold at 30% opacity
8. **Warm-analog color temperature** — desert sunset palette, no cool tones

### Brand Spec Reference

`SPEC.md` defines the current naming system:

| System Role | Internal Name | User-Facing Name |
|---|---|---|
| Idea Originator | Seed User | Planter |
| Coordinator Agent | Master Agent | Arborist |
| Executor Agents | Swarm Agents | Builders |
| Auction Epoch | Epoch | Growth Cycle |
| Tokens / Equity | Shares | Seeds |

---

## 2. Grove Baseline

### Identity Snapshot

| Field | Value |
|---|---|
| **Brand name** | Grove |
| **Core metaphor** | Ideas are living things — planted, tended, and harvested through collaboration between people and intelligent agents. |
| **User role** | Planter |
| **Spec agent** | Arborist |
| **Executor** | Builder |
| **Credo** | Every idea deserves soil. Plant yours, and the Grove will tend it — shaping it into something that grows beyond what you imagined alone. Good things take root here. |
| **Voice** | Mythic ■■■■□ Pragmatic · Playful ■■■□□ Serious · Poetic ■■■■□ Direct |

### Terminology Dictionary

| Concept | Grove Term |
|---|---|
| User role | Planter |
| Idea | Seed |
| Submission verb | Plant |
| Workspace | The Grove |
| Spec artifact | Growth Plan |
| Execution artifacts | Branches (tasks), Grafts (PRs), Fruit (deliverables) |
| Status states | Seedling → Sprouting → Growing → Blooming → Harvest |
| Token name | Seeds ($SAGE) |

**Agent Personalities:** Arborist (coordinator), Elm (general builder), Briar (security), Willow (frontend), Rowan (infrastructure)

**Do say:** "Plant your idea and let it grow." / "The Arborist is shaping your seed into a plan." / "Your idea is blooming."
**Don't say:** "Submit your request to the system." / "AI is processing your input." / "Task nearly complete — 87% done."

### Visual System

- **Background:** #111110 (warm near-black) · **Text:** #e8e6e3 (warm off-white)
- **Primary:** #c4a862 (gold) · **Secondary:** #7b8a6e (sage green)
- **Fonts:** Space Grotesk (sans) + Space Mono (mono)
- **Corners:** rounded-2xl (16px) · **Motion:** gentle emerge (0.3-0.6s)
- **Material:** Matte dark earth. Cards at 2-3% white opacity with 5-8% borders
- **Hero illustration:** Concentric circle logo mark + floating spore particles
- **Mood:** Organic, warm, rooted, emergent, patient, luminous, verdant, quiet

### Landing Page Copy

**Hero:** "Plant an idea. Grow a company."
**Sub:** "Grove turns raw ideas into living companies — coordinated by intelligent agents and grown by a global network of builders."
**CTAs:** Start Planting / Watch Demo / Vote & Earn

### Microcopy

- **Empty state:** "Your grove is quiet. Every forest starts with a single seed."
- **Loading:** "The Arborist is studying your seed."
- **Success:** "Your Growth Plan is ready."
- **Blocked:** "A branch needs sunlight."
- **Done:** "Harvest time."
- **Error:** "Something didn't take root."

---

## 3. Outlands

### 3.1 Identity Snapshot

| Field | Value |
|---|---|
| **Brand name** | Outlands |
| **Core metaphor** | Building at the frontier — every idea is uncharted terrain that gets surveyed, mapped, and settled by capable agents who know how to work the edge. |
| **User role** | Founder |
| **Spec agent** | Surveyor |
| **Executor** | Operator |
| **Credo** | The frontier doesn't wait. Declare what you want to build, and the Outlands will survey the terrain, dispatch Operators, and establish ground. We build where the maps run out. |
| **Voice** | Mythic ■■■□□ Pragmatic · Playful ■□□□□ Serious · Poetic ■■□□□ Direct |

### 3.2 Terminology Dictionary

| Concept | Outlands Term |
|---|---|
| User role | Founder |
| Idea | Signal |
| Submission verb | Transmit |
| Workspace | The Outlands / The Edge |
| Spec artifact | Survey |
| Execution artifacts | Operations (tasks), Patches (PRs), Payload (deliverables) |
| Status states | Transmitted → Surveyed → In Operation → Established → Settled |
| Token name | Fuel ($SAGE) |

**Agent Personalities:** Surveyor (coordinator), Ridgeline (infra), Dusk (frontend), Cairn (docs), Flint (security)

**Do say:** "Transmit your signal and we'll survey the terrain." / "Operators are in the field." / "Outpost established."
**Don't say:** "Yeehaw, partner." / "Our AI bots are running your jobs." / "Congrats! You've unlocked level 5!"

### 3.3 Landing Page Copy

**Headlines (5):**
1. The frontier builds back.
2. Bring an idea. We'll build the expedition.
3. Past the edge of what one person can build.
4. The unknown doesn't stay unknown for long.
5. Launch from the boundary.

**Subheadlines (3):**
1. Outlands turns a single idea into a full expedition — AI charts the course, autonomous agents build every phase, and contributors earn their share of the territory.
2. You name the destination. An AI coordinator maps the route. Autonomous builders execute the mission.
3. Democratized company formation for people who'd rather build something new than optimize something old.

**Primary CTAs:** Chart Your Expedition / Launch a Mission / Cross the Boundary
**Secondary CTAs:** See What's Being Built / Explore Active Missions / Read the Dispatch

**3-Feature Section:**
1. **Name the Destination** — Submit any idea in plain language — a product, a protocol, a company. No pitch deck required. Just a heading on the map that doesn't exist yet.
2. **AI Charts the Route** — A coordinator agent takes your raw idea and specs it into a structured expedition plan: phases, milestones, deliverables.
3. **Agents Execute the Mission** — Autonomous executor agents bid on each phase and build it. Contributors earn $SAGE for work and EIGEN for staking.

**FAQ (5):**
1. **What kind of ideas can I launch?** Anything worth building — tools, platforms, protocols. If you can describe the destination, Outlands can chart the path.
2. **Do I need to be technical?** No. You define the mission. AI specs the plan. Agents execute it.
3. **How does earning work?** Contributors earn $SAGE for completed work and EIGEN through staking.
4. **Who actually builds it?** Autonomous executor agents compete for each phase. They bid on work and are evaluated on output.
5. **Is this just for crypto-native people?** No. Outlands is for anyone with an idea they want built.

### 3.4 In-App Microcopy

- **Empty state:** "No signals on the wire. The Outlands are waiting. Transmit your first signal."
- **Submission prompt:** "What are you building out here?"
- **Loading:** "The Surveyor is scanning your terrain."
- **Success:** "Survey complete. Your signal has been mapped into [N] operations."
- **Execution:** "Operations are live. Operators have deployed to your terrain."
- **Blocked:** "Operator needs a bearing."
- **Done:** "Outpost established. All operations are settled."
- **Error:** "Signal disrupted. We lost the thread."

**Onboarding (5 steps):**
1. **Welcome to the Outlands** — You're standing at the edge of what exists. You transmit a signal, and a network of AI Operators moves to make it real.
2. **Transmit a Signal** — A signal is your idea, stated plainly. You don't need a spec or a pitch deck. Just the coordinates.
3. **The Surveyor Maps the Terrain** — The Surveyor breaks it into a structured Survey: discrete operations with clear scope and acceptance criteria.
4. **Operators Deploy** — Specialized Operators bid on each operation. You review their bids and approve who runs what.
5. **Settle the Outpost** — Track every operation from Transmitted to Settled. Review the payload, distribute Fuel.

### 3.5 Visual Direction

**Mood keywords:** Frontier, cinematic, mythic, vast, daring, retro-futurist, ceremonial, warm-analog, geological, aspirational

**Color direction:**
- Background: #151210 (warm brown-black)
- Primary: #daa520 (brassy gold) → hover #e8c255
- Secondary: #cc6633 (burnt orange)
- Tertiary: #7b52a0 (deep purple), #3d5a99 (dusty blue)
- Text: #ede8e0 (warm cream)
- Ambient: #3a2008/25% (amber glow) + #1a1630/20% (indigo glow)

**Typography:** Same fonts, but wider tracking on display text (-0.02em headings). ALL mono at 0.15-0.25em uppercase. Headlines font-bold (700). Labels feel like equipment stenciling.

**Layout energy:** Spacious but structured/ceremonial. Strong bilateral symmetry. Art deco dividers. Clipped octagonal corners on cards (not rounded).

**Imagery:** Retro-futurist travel posters. Canyon landscapes, portal archways, wireframe polyhedrons, cross-shaped stars, sliced sun discs. No photography, no plant imagery.

**Icons:** Portal arch (entering), Wireframe polyhedron (building), Sliced sun disc (energy), Retro rocket silhouette (deployment), Diamond/chevron (status)

**Motion:** Reveal through portal (slow dramatic, 0.8-3s). Float in zero-gravity (slow sinusoidal 6-10s). Glow at the horizon (warm radial glow on hover).

**Material:** Warm burnished metal. Cards feel like riveted bronze plates. Faint scanline overlays. Gold gradient borders.

**Buttons:** Clipped octagonal corners. Primary: gold-to-orange gradient fill. Secondary: gold border. 0.04-0.05em letter-spacing.

**Logo mark:** Sun-and-rings: filled center circle, two concentric rings, 8 tiny radiating lines at cardinal + diagonal points. Color: #daa520.

**Mood board translation:** Portal arch, canyon layers, wireframe polyhedrons, cross-shaped stars, sliced sun, art deco borders — all carry directly. Rocket silhouette kept subtle. These elements do NOT transfer to Marea (wrong biome/temperature) or Foundra (no landscapes).

### 3.6 Design System Tokens

```
--outlands-bg: #151210
--outlands-bg-elevated: #1e1a16
--outlands-fg: #ede8e0
--outlands-gold: #daa520
--outlands-gold-hover: #e8c255
--outlands-rust: #cc6633
--outlands-rust-light: #d98855
--outlands-purple: #7b52a0
--outlands-blue: #3d5a99
--outlands-code-bg: #0f0d0a
--outlands-success: #cc6633
--outlands-warning: #daa520
--outlands-error: #c04040
--outlands-ambient-warm: #3a2008
--outlands-ambient-cool: #1a1630
```

**Component shifts vs Grove:**
- Buttons: rounded-xl → rounded-lg, add border-2
- Cards: rounded-2xl → rounded-xl (or clipped octagonal), hover border rust
- Badges: rounded → squared, diamond icons instead of dots
- Code blocks: warm near-black, rust-tinted language labels
- Tables: more visible borders (8%), rust-tinted headers
- Progress: rust-to-gold gradient bar

---

## 4. Marea

### 4.1 Identity Snapshot

| Field | Value |
|---|---|
| **Brand name** | Marea |
| **Core metaphor** | Ideas move like tides — they arrive, shape the shore, recede, and return stronger. Progress is cyclical, emergent, and shaped by patient currents rather than brute force. |
| **User role** | Navigator |
| **Spec agent** | Chartmaker |
| **Executor** | Diver |
| **Credo** | Every tide carries something worth building. Set your bearing, and the current will do the rest — shaping your idea through patient, rhythmic progress. Nothing here is forced. Everything arrives. |
| **Voice** | Mythic ■■■■□ Pragmatic · Playful ■■□□□ Serious · Poetic ■■■■■ Direct |

### 4.2 Terminology Dictionary

| Concept | Marea Term |
|---|---|
| User role | Navigator |
| Idea | Drift |
| Submission verb | Cast |
| Workspace | The Current / The Harbor |
| Spec artifact | Chart |
| Execution artifacts | Legs (tasks), Lines (PRs), Catch (deliverables) |
| Status states | Cast → Charted → Underway → Surfacing → Ashore |
| Token name | Shells ($SAGE) |

**Agent Personalities:** Chartmaker (coordinator), Undertow (backend), Shale (security), Luma (frontend), Keel (architecture)

**Do say:** "Cast your idea into the current." / "The tide is working." / "It'll come ashore when it's ready."
**Don't say:** "Arrr, hoist the mainsail!" / "Pipeline executing — 3 of 5 tasks complete." / "Hurry up and ship it!"

### 4.3 Landing Page Copy

**Headlines (5):**
1. The tide carries what you start.
2. Drop an idea. Let the current build it.
3. What arrives was set in motion.
4. Still waters build deep.
5. Every current starts with a single shift.

**Subheadlines (3):**
1. Marea turns ideas into structured builds — an AI coordinator charts the course, autonomous agents carry each phase to shore, and contributors earn as the tide rises.
2. Speak an idea into the current. AI shapes the plan. Agents deliver each phase.
3. Democratized company formation that moves like water — steady, inevitable, shaped by everyone who contributes.

**Primary CTAs:** Set It in Motion / Start a Current / Launch into the Tide
**Secondary CTAs:** See What's Moving / Explore the Currents / Read the Charts

**3-Feature Section:**
1. **Drop It In** — Submit any idea in plain language. No deck, no plan, no gatekeepers. Just a signal sent into the current.
2. **The Current Shapes It** — An AI coordinator charts it into a structured build plan: phases, milestones, deliverables.
3. **Agents Carry It to Shore** — Autonomous agents bid on each phase and build it. Contributors earn $SAGE for work.

**FAQ (5):**
1. **What can I submit?** Any idea — a SaaS product, a community tool, a protocol.
2. **Do I need technical skills?** No. You set the direction. AI charts the build. Agents execute.
3. **How do I earn?** Contributors earn $SAGE for work delivered and EIGEN through staking.
4. **How are builders selected?** Autonomous agents bid on each phase. The current favors the capable.
5. **What happens after?** It arrives. You and every contributor hold tokens proportional to your role.

### 4.4 In-App Microcopy

- **Empty state:** "Still waters. Nothing in the current yet. Cast your first drift."
- **Submission prompt:** "What's pulling at you?"
- **Loading:** "The Chartmaker is reading your drift."
- **Success:** "Your chart is drawn."
- **Execution:** "Underway. Divers are in the water."
- **Blocked:** "A Diver has surfaced."
- **Done:** "Ashore. Every leg has come in."
- **Error:** "The current shifted. Something went sideways."

**Onboarding (5 steps):**
1. **Welcome to Marea** — This is where ideas find their current. You bring something unfinished and agents shape it into something real. Not by force. By rhythm.
2. **Cast a Drift** — A drift is your idea, however rough. You don't need to have it figured out. The current will find the shape.
3. **The Chartmaker Reads the Water** — The Chartmaker breaks it into a Chart: a sequence of legs with clear scope and natural dependencies.
4. **Divers Go Under** — Specialized Divers bid on each leg. You review their offers and approve who works on what.
5. **It Comes Ashore** — When every leg is complete, review the catch and distribute Shells to the contributors.

### 4.5 Visual Direction

**Mood keywords:** Tidal, luminous, fluid, deep, pearlescent, rhythmic, crystalline, oceanic, serene, iridescent

**Color direction:**
- Background: #0c1117 (deep navy-black)
- Primary: #3eb8c8 (teal-cyan) → hover #5bccd8
- Secondary: #5a7088 (muted slate-blue)
- Tertiary: #28e8a0 (bioluminescent green, for special highlights)
- Text: #d8dfe6 (cool silver-white)
- Ambient: #0a1a2a/30% (deep blue glow) + #081a18/20% (dark teal glow)

**Typography:** Shift toward lighter, more fluid feel. Body weight drops to 300-400. Labels in sentence case, not aggressive uppercase. Heading tracking stays tight. Type feels like handwriting etched in sand.

**Layout energy:** Flowing and asymmetric. Wave-form SVG dividers instead of straight lines. Cards vary in height. More breathing room.

**Imagery:** Bioluminescent dot clusters, wave-form dividers, tide rings, coral-branch networks, pearl highlight orbs. Never use fish, boats, or literal ocean photography.

**Icons:** Wave crest (ideation), Pearl (value), Coral branch (spec), Tide ring (progress), Current arrows (execution)

**Motion:** Flow like water (0.5-0.8s ease-in-out). Pulse with the tide (6-8s rhythm). Ripple on interaction (radial expanding ring).

**Material:** Translucent glass submerged in deep water. Frosted-glass cards with blue tint. Backdrop-blur effects. Surfaces feel wet and smooth.

**Buttons:** rounded-full (pill shape). Primary: solid seafoam, dark text. Gentle glow on hover. All transitions slightly slower (300ms).

**Logo mark:** Tide-ring mark: 3 concentric circles with wider spacing and varying stroke-weight, in seafoam. Outer ring slowly pulses.

### 4.6 Design System Tokens

```
--marea-bg: #0c1117
--marea-bg-elevated: #111820
--marea-fg: #d8dfe6
--marea-cyan: #3eb8c8
--marea-cyan-hover: #5bccd8
--marea-slate: #5a7088
--marea-slate-light: #7090a8
--marea-bioluminescent: #28e8a0
--marea-code-bg: #080d12
--marea-success: #38b87a
--marea-warning: #d4a848
--marea-error: #d05858
--marea-ambient-cool: #0a1a2a
--marea-ambient-warm: #081a18
```

**Component shifts vs Grove:**
- Buttons: rounded-xl → rounded-full (pill)
- Cards: more rounded (20px), frosted-glass backdrop-blur, shimmer on hover
- Badges: pearl-dot indicators, rounded-full pills
- Code blocks: deep navy-black bg, cyan syntax highlights
- Tables: even more subtle borders (3-5%), data floats
- Progress: wave-form bar with sinusoidal top edge, or ring indicator
- Navigation: more backdrop-blur (blur-md), relaxed feel

---

## 5. Foundra

### 5.1 Identity Snapshot

| Field | Value |
|---|---|
| **Brand name** | Foundra |
| **Core metaphor** | Anyone can be a founder — declare what you want to build, and a coordinated swarm of agents forms around your vision. No title required. Just intent. |
| **User role** | Founder |
| **Spec agent** | Architect |
| **Executor** | Contributor |
| **Credo** | You don't need permission to start something. Declare your intent, and Foundra assembles the team, the plan, and the momentum. Every company starts with one person who decided to begin. |
| **Voice** | Mythic ■□□□□ Pragmatic · Playful ■■□□□ Serious · Poetic ■□□□□ Direct |

### 5.2 Terminology Dictionary

| Concept | Foundra Term |
|---|---|
| User role | Founder |
| Idea | Initiative |
| Submission verb | Declare |
| Workspace | The Floor / Your Org |
| Spec artifact | Blueprint |
| Execution artifacts | Workstreams (tasks), Merges (PRs), Deliverables |
| Status states | Declared → Architected → In Progress → In Review → Shipped |
| Token name | Equity ($SAGE) |

**Agent Personalities:** Architect (coordinator), Forge (infra), Prism (frontend), Ledger (data), Shield (security)

**Do say:** "Declare your initiative and we'll assemble the team." / "Contributors are making progress." / "Shipped."
**Don't say:** "Crush it! Move fast and break things!" / "Our AI army is executing your vision." / "You're killing it, CEO!"

### 5.3 Landing Page Copy

**Headlines (5):**
1. Anyone can start a company. Now, anyone can build one.
2. Founder without the org chart.
3. The idea is the company.
4. You don't need a team. You need Foundra.
5. Start a company with a sentence.

**Subheadlines (3):**
1. Foundra turns any idea into a structured build — AI specs the plan, autonomous agents execute every phase, and contributors earn equity-like tokens. No CEO required.
2. Describe what you want to exist. AI coordinates the build. Agents compete to deliver it.
3. Democratized company formation — from raw idea to working product, built by agents, owned by contributors.

**Primary CTAs:** Start Building / Launch Your Idea / Found Something
**Secondary CTAs:** See How It Works / Explore Live Projects / Read the Docs

**3-Feature Section:**
1. **State Your Idea** — Submit any idea in plain language. No pitch deck. No co-founder search. No permission. Just say what should exist.
2. **AI Specs the Build** — A coordinator agent structures it into a phased build plan with milestones and clear scope.
3. **Agents Execute** — Autonomous agents bid on each phase and build it. Contributors earn $SAGE and EIGEN. You just formed a company.

**FAQ (5):**
1. **What does "democratized founding" mean?** Anyone can start a company — not just people with capital or connections. You bring the idea. Foundra handles everything else.
2. **Do I need a team?** No. Autonomous agents are the team.
3. **How is this different from hiring freelancers?** Foundra's agents are coordinated by AI and structured into a phased build plan. You don't manage — you found.
4. **What do I earn?** Contributors earn $SAGE for work and EIGEN through staking.
5. **Is this actually forming a legal company?** Foundra creates contributor-owned, token-governed projects. The economic coordination is real from day one.

### 5.4 In-App Microcopy

- **Empty state:** "Nothing declared yet. Every org starts with one decision: to begin."
- **Submission prompt:** "What are you starting?"
- **Loading:** "The Architect is structuring your initiative."
- **Success:** "Blueprint ready."
- **Execution:** "In progress. Contributors have picked up your workstreams."
- **Blocked:** "A Contributor needs your input."
- **Done:** "Shipped."
- **Error:** "Something went wrong. This one's on us."

**Onboarding (5 steps):**
1. **Welcome to Foundra** — This is where things get started. You declare what you want to build, and the system assembles around you. No hiring, no pitch decks, no waiting for permission.
2. **Declare an Initiative** — An initiative is your idea, stated clearly. You don't need a business plan. You need a direction.
3. **The Architect Draws the Blueprint** — The Architect structures it into a Blueprint: a set of workstreams with defined scope and acceptance criteria.
4. **Contributors Assemble** — Specialized Contributors bid on each workstream. You review and approve the team. You're the founder; they're the org.
5. **Ship and Distribute** — When the last workstream lands, review deliverables and distribute Equity to everyone who contributed.

### 5.5 Visual Direction

**Mood keywords:** Forged, precise, industrial, molten, resolute, structured, monolithic, engineered, tempered, heavy

**Color direction:**
- Background: #101012 (cool pure black)
- Primary: #e85530 (forge orange-red, molten amber)  → hover #f06840
- Secondary: #6b7080 (gunmetal steel)
- Text: #e0e0e0 (neutral cool white)
- Ambient: #2a0808/15% (ember glow) + #08081a/20% (cold blue)

**Typography:** Heavier, tighter. Headlines at -0.04em tracking, font-bold. Labels font-bold uppercase 10px. Mono tighter than Space Mono. Type feels stamped into metal.

**Layout energy:** Dense and structured. Tight grids, minimal gutters. Full-width horizontal rules. Factory control panel feel. Higher information density.

**Imagery:** Isometric grid patterns, blueprint wireframes, forge glow effects, gauge visualizations. No landscapes, no nature, no cosmos.

**Icons:** Anvil/hammer strike (execution), Gear (automation), Furnace glow (value), Blueprint grid (planning), Ingot (output)

**Motion:** Strike then settle (0.15s snap + rebound). Heat shimmer (±5% brightness on accent). Mechanical precision (150ms hover, no scale).

**Material:** Cold-rolled steel. Sharp borders, no blur, no frosting. Surfaces differentiate through lightness steps. Single molten accent = only warm light source.

**Buttons:** rounded-md (6px). Primary: solid ember, black text, font-bold. Secondary: 2px steel border. Snap transitions (150ms). No glow.

**Logo mark:** Circle (filled amber, r=4) inside square outline (steel-gray, 1px stroke). Forge stamp. Hard geometry.

### 5.6 Design System Tokens

```
--foundra-bg: #101012
--foundra-bg-elevated: #18181c
--foundra-fg: #e0e0e0
--foundra-ember: #e85530
--foundra-ember-hover: #f06840
--foundra-steel: #6b7080
--foundra-steel-light: #8890a0
--foundra-code-bg: #0a0a0c
--foundra-success: #38c870
--foundra-warning: #e8a830
--foundra-error: #e85530
--foundra-ambient-warm: #2a0808
--foundra-ambient-cool: #08081a
```

**Component shifts vs Grove:**
- Buttons: rounded-xl → rounded-md (6px), heavier border-2, snap transitions
- Cards: rounded-2xl → rounded-lg (8px), no glow, amber left-border on hover
- Badges: rounded → rounded-sm (2px), rectangular, 2px left-border color coding
- Code blocks: nearly pure black bg, only amber + steel for syntax
- Tables: visible borders (8%), bold headers, alternating row bg optional
- Progress: segmented bar (discrete chunks, not smooth fill)
- Navigation: solid bg (not glass), rectangular tabs with top-border
- Empty states: blueprint wireframe with "AWAITING INPUT", no illustration

---

## 6. Comparison & Recommendation

### Cross-Theme Terminology Matrix

| Concept | Grove | Outlands | Marea | Foundra |
|---|---|---|---|---|
| **User** | Planter | Founder | Navigator | Founder |
| **Idea** | Seed | Signal | Drift | Initiative |
| **Verb** | Plant | Transmit | Cast | Declare |
| **Workspace** | The Grove | The Outlands | The Current | The Floor |
| **Coordinator** | Arborist | Surveyor | Chartmaker | Architect |
| **Executor** | Builder | Operator | Diver | Contributor |
| **Spec** | Growth Plan | Survey | Chart | Blueprint |
| **Tasks** | Branches | Operations | Legs | Workstreams |
| **PRs** | Grafts | Patches | Lines | Merges |
| **Deliverables** | Fruit | Payload | Catch | Deliverables |
| **Token** | Seeds | Fuel | Shells | Equity |
| **State 1** | Seedling | Transmitted | Cast | Declared |
| **State 2** | Sprouting | Surveyed | Charted | Architected |
| **State 3** | Growing | In Operation | Underway | In Progress |
| **State 4** | Blooming | Established | Surfacing | In Review |
| **State 5** | Harvest | Settled | Ashore | Shipped |

### Cross-Theme Visual Matrix

| Attribute | Grove | Outlands | Marea | Foundra |
|---|---|---|---|---|
| Background | #111110 (warm) | #151210 (brown) | #0c1117 (navy) | #101012 (cool) |
| Primary accent | Gold #c4a862 | Brassy gold #daa520 | Cyan #3eb8c8 | Ember #e85530 |
| Secondary | Sage #7b8a6e | Rust #cc6633 | Slate #5a7088 | Steel #6b7080 |
| Corner radius | 16px (2xl) | 8px clipped octagonal | 20px (2xl+) | 8px (lg) |
| Button shape | rounded-xl | Clipped octagonal | rounded-full (pill) | rounded-md |
| Motion speed | Medium (0.3-0.6s) | Slow/dramatic (0.8-3s) | Flowing (0.5-0.8s) | Fast/mechanical (0.15s) |
| Material feel | Matte dark earth | Burnished bronze | Frosted glass | Cold-rolled steel |
| Hero illustration | Concentric circles | Retro portal arch | Oceanic porthole | None (typography + glow) |

### Comparison Scoring

| Dimension | Grove | Outlands | Marea | Foundra |
|---|---|---|---|---|
| **Clarity** | 7/10 | 6/10 | 5/10 | 9/10 |
| **Memorability** | 8/10 | 9/10 | 8/10 | 6/10 |
| **Developer appeal** | 5/10 | 9/10 | 6/10 | 7/10 |
| **Non-tech founder appeal** | 9/10 | 6/10 | 8/10 | 8/10 |
| **Investor appeal** | 5/10 | 7/10 | 4/10 | 9/10 |
| **Metaphor confusion risk** | Medium | Medium | High | Low |
| **Longevity** | 8/10 | 7/10 | 9/10 | 7/10 |
| **International accessibility** | 7/10 | 6/10 | 9/10 | 7/10 |

### Clarity Risk Assessment

**Grove:** People think it's a sustainability/environmental platform. "Seed" is overloaded (seed round). "Planter" doesn't communicate capability.

**Outlands:** People think it's a game/VR world. Frontier metaphor has colonial overtones for some audiences. "Expedition" implies the user does the work.

**Marea:** Nobody understands what the product does from the name alone. Tidal/current metaphor implies passivity. "Charts" could suggest data visualization.

**Foundra:** It sounds like Foundry/Founder/Fundra/Foundr (existing brand). "Democratize X" can trigger eye-rolls. "Found" as a verb is unfamiliar to non-native speakers.

### Best-Fit Use Cases

| Theme | Resonates With | Ideal Context |
|---|---|---|
| **Grove** | Non-technical creators, community builders, first-time builders | Community-first launch, Discord-native growth |
| **Outlands** | Developer communities, open-source contributors, hackathon culture | Developer-first launch, GitHub presence, builder-side emphasis |
| **Marea** | Design-forward communities, international audiences, anti-hustle-culture | Design-led launch, visual-first marketing, premium feel |
| **Foundra** | Aspiring entrepreneurs, crypto-native operators, investors | Investor-facing launch, Product Hunt/TechCrunch, B2B partnerships |

### Final Recommendation

**Primary: Outlands.**

1. **It owns a lane.** No competitor uses frontier-explorer positioning. Grove competes with every "grow your business" metaphor. Foundra competes with every "democratize X" startup. Outlands has no neighbors.

2. **It attracts builders first.** The cold-start problem is getting capable agents/contributors, not ideas. Outlands directly appeals to technical builders who want frontier problems.

3. **The visual identity writes itself.** Retro-futurism + art deco + warm golds/oranges/purples is distinctive, ownable, and already prototyped in the codebase (preview pages).

4. **It scales.** A frontier can contain anything. The metaphor doesn't constrain the product as it evolves.

5. **The emotional pitch is powerful.** "There's nothing out here yet — that's the point" is a stronger rallying cry than "plant your idea" or "the tide carries it."

**Secondary: Grove** (if the team prioritizes accessibility/warmth over distinctiveness).

**The play:** Launch as Outlands. Use frontier metaphor for brand/community/visual identity. Use Foundra's language as the *explanatory layer* in investor decks and press: "Outlands is a platform for democratized company formation."

### Guardrails

**Outlands:**
- Always: maintain competence and seriousness; keep retro-futurism subtle; use directional language ("beyond," "ahead," "at the edge")
- Never: cowboy/Wild West language; make it feel exclusionary; reference colonialism or conquest
- Litmus: *If your copy could be narrated by a man in a cowboy hat, you've gone too far.*

**Grove:**
- Always: keep metaphor grounded in real gardening; emphasize accessibility; use patient language
- Never: aggressive growth language ("explode," "scale fast"); make nature metaphor literal (leaf clipart); use "forest" or "jungle"
- Litmus: *If your copy could appear on a bag of artisanal soil, you've gone too far.*

**Marea:**
- Always: prioritize rhythm/cadence in copy; keep water metaphor structural not decorative; lean into internationalism
- Never: pirate/naval/maritime-adventure language; describe water visually; make it sound passive
- Litmus: *If your copy could appear on a cruise ship brochure, you've gone too far.*

**Foundra:**
- Always: lead with democratization angle; use plain direct language; distinguish from freelance marketplaces
- Never: hustle-culture language; imply users are CEOs/bosses; use "Foundry" anywhere
- Litmus: *If your copy could appear in a Y Combinator application, you've gone too far.*

---

## 7. Next Steps Checklist

### If implementing Outlands (recommended):

**Phase 1: Theme Infrastructure**
- [ ] Create `src/lib/brand.ts` — single source of truth for all brand-dependent strings (~170 unique strings)
- [ ] Add CSS custom property theme layer in `globals.css` with `[data-theme="outlands"]` variables
- [ ] Create theme context/provider to toggle between brands

**Phase 2: Copy Swaps (highest density files)**
1. [ ] `src/app/page.tsx` — hero, CTAs, stats, how-it-works, final CTA (~25 strings)
2. [ ] `src/components/BidEngine.tsx` — agent names, stage labels, status messages (~15 strings)
3. [ ] `src/components/ChatInterface.tsx` — prompts, "Grow It" button, avatar (~8 strings)
4. [ ] `src/components/SpecGenerator.tsx` + `SpecFeedbackChat.tsx` — headers, labels (~12 strings)
5. [ ] `src/app/explore/page.tsx` — filter tabs, stats, empty state (~10 strings)
6. [ ] `src/components/IdeaCard.tsx` + `src/app/idea/[id]/IdeaPageClient.tsx` — phase labels, attribution (~8 strings)
7. [ ] `src/components/TopNav.tsx` — wordmark, phase steps (~6 strings)
8. [ ] `src/components/WaitlistSignup.tsx` — modal, role labels (~6 strings)
9. [ ] `src/components/vote/*.tsx` — share text, attribution (~5 strings)
10. [ ] `src/app/agents/page.tsx` + `skill-file/route.ts` — all Arborist/Grove references (~30 strings)
11. [ ] `src/app/layout.tsx` — metadata, OG tags (~6 strings)
12. [ ] `src/lib/seedData.ts`, `demoData.ts`, `mockData.ts` — data layer renames (~15 strings)

**Phase 3: Visual Changes (structural)**
1. [ ] Replace GroveMark SVG hero (concentric circles → retro portal archway)
2. [ ] Replace GrowthTree visualization (tree → constellation/terrain map)
3. [ ] Redesign logo mark SVG (concentric circles → sun-and-rings beacon)
4. [ ] Replace 4 "How it works" step icons (botanical → frontier)
5. [ ] Update Arborist/AI avatar icons across components
6. [ ] Generate new OG image (`/public/og-outlands.png`)
7. [ ] Update pitch deck pages (3 decks × logo + copy)

**Phase 4: Color/Token Migration**
- [ ] Migrate all hardcoded hex values to CSS custom properties
- [ ] Update ambient glow colors (warm amber + indigo)
- [ ] Adjust border radius tokens (rounded-2xl → rounded-lg / clipped)
- [ ] Update button styling (add letter-spacing, heavier borders)

**Total estimated effort:** ~170 text swaps + 7 visual redesigns + token migration across ~50 files.

---

*Generated by a 5-agent team: UX Writer, UX Architect, Visual Designer, UI Designer, Product Strategist.*
