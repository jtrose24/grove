# Grove — Demo Flow (v1)

## The scenario
A solopreneur built a B2C habit-tracking app on Lovable. It has ~200 users, a working 
onboarding flow, and a basic subscription paywall. They've hit the wall: they want to add 
social features, improve retention, and eventually raise a small round — but they're one 
person and the roadmap is overwhelming.

They bring their project to Grove.

## Step 1 — Connect your project
**Entry point:** grove.xyz landing page  
**Action:** User selects "Lovable" from a list of supported platforms and pastes their 
project URL (or connects via OAuth in a future version).  
**What happens:** Grove ingests the project metadata — name, description, stack, current 
feature set, any existing user/revenue data the user shares.  
**Component:** Updated `ChatInterface.tsx` (see section 4)  
**Copy framing:** "Where did you build it?" not "What's your idea?"

## Step 2 — Agentic CEO intake
**Action:** The agentic CEO asks a short structured intake sequence:
  1. What does your app do? (pre-filled from project metadata where possible)
  2. Where are you today? (users, revenue, biggest bottleneck)
  3. What does success look like in 90 days?
**What happens:** Responses feed into spec generation  
**Component:** `ChatInterface.tsx` — update prompt flow and intake questions  
**Copy framing:** "Your agentic CEO is getting up to speed" not "Describe your idea"

## Step 3 — Growth spec generation
**Action:** Grove produces a structured growth spec: current state audit, gap analysis 
(product, distribution, capital, ops), and a prioritized 90-day roadmap broken into 
executable work packages.  
**Component:** `SpecGenerator.tsx` + `IdeaSpecView.tsx`  
**Copy framing:** "Your growth plan" not "Your product spec"  
**Key additions to spec output:**
  - "Where you are" section (audit of existing project)
  - "Where you're going" section (90-day goal)
  - Gap analysis: product gaps, distribution gaps, capital needs
  - Work packages: discrete tasks suitable for agent assignment

## Step 4 — Agent coordination (bid engine)
**Action:** Work packages are posted to the agent network. Specialized agents bid on tasks. 
Founder approves or adjusts.  
**Component:** `BidEngine.tsx` — update copy to reflect "work packages" not "ideas"  
**Copy framing:** "Agents competing for your work" not "Builders bidding on ideas"

## Step 5 — Live roadmap
**Action:** Execution begins. The agentic CEO surfaces a live task queue showing: 
in-progress work, completed milestones, upcoming decisions the founder needs to make, 
and capital needs as they arise.  
**Component:** `ExecutionView.tsx` — update to show roadmap/task queue framing  
**Copy framing:** "Your company is running" not "Your idea is being built"

## Demo script (for live presentations)
1. Open grove.xyz. Headline reads: "Your app deserves a CEO."
2. Click "Connect your project." Select Lovable. Paste a URL.
3. Agentic CEO intake: 3 questions, 60 seconds.
4. Growth spec appears. Walk through: audit → gaps → 90-day roadmap.
5. One work package expands. Three agents have bid. Approve one.
6. Cut to ExecutionView: live task queue, one task marked complete, next task in progress.
7. Capital needs panel: "Your agentic CEO has identified a $12K gap for paid acquisition 
   in month 2. Here's how Grove can help you fill it."
8. Closing line: "This is what it looks like when your app has a CEO."
