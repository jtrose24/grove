import { Bid, SpecPhase, Metrics } from './store'
import { MOCK_BUILDERS } from './mockData'

// ─── Types ───────────────────────────────────────────────────────────────────

export type IdeaPhase = 'ideation' | 'spec-gen' | 'bidding' | 'execution' | 'settled'

export interface Planter {
  id: string
  name: string
  handle: string
  avatar: string // emoji
}

export interface SeedIdea {
  id: string
  title: string
  description: string
  category: string
  phase: IdeaPhase
  planterId: string
  plantedAt: number // timestamp
  conversation: { role: 'user' | 'assistant'; content: string }[]
  spec?: string
  specPhases?: SpecPhase[]
  bids?: Record<string, Bid[]>
  selectedBids?: Record<string, Bid>
  metrics?: Metrics
  builderName?: string
  progress?: number
}

// ─── Planters ────────────────────────────────────────────────────────────────

export const SEED_PLANTERS: Planter[] = [
  { id: 'pl-1', name: 'Sreeram Kannan', handle: 'saborchain', avatar: '🧬' },
  { id: 'pl-2', name: 'Gajesh Naik', handle: 'gaborchain', avatar: '🔮' },
  { id: 'pl-3', name: 'Vignesh Muralidharan', handle: 'vigneshka', avatar: '🌐' },
  { id: 'pl-4', name: 'Gautham', handle: 'gauthamzz', avatar: '🛡' },
  { id: 'pl-5', name: 'Andrew Miller', handle: 'socaborchain', avatar: '🔬' },
  { id: 'pl-6', name: 'Xyn', handle: 'xyn_ai', avatar: '⚡' },
  { id: 'pl-7', name: 'Calvin Liu', handle: 'calvinlieu', avatar: '📊' },
  { id: 'pl-8', name: 'Ali Yahya', handle: 'alive_eth', avatar: '🧠' },
  { id: 'pl-9', name: 'Hasu', handle: 'hasufl', avatar: '🏛' },
  { id: 'pl-10', name: 'Tarun Chitra', handle: 'tarunchitra', avatar: '📐' },
  { id: 'pl-11', name: 'Robert Leshner', handle: 'rleshner', avatar: '🏦' },
  { id: 'pl-12', name: 'Stani Kulechov', handle: 'staborchain', avatar: '👻' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const DAY = 86400000

function daysAgo(d: number): number {
  return Date.now() - d * DAY + Math.floor(Math.random() * DAY * 0.5)
}

function makeBid(phaseId: string, builder: typeof MOCK_BUILDERS[number], cost: number, pv: number, conf: number, winner?: boolean): Bid {
  return {
    id: `bid-${phaseId}-${builder.id}`,
    builderId: builder.id,
    builderName: builder.name,
    builderAvatar: builder.avatar,
    reputation: builder.reputation,
    approach: winner
      ? 'Full-stack Next.js monorepo, deploy on Vercel edge network.'
      : 'Ship a lean MVP with React + Supabase, focus on core loop first.',
    cost,
    predictedValue: pv,
    confidence: conf,
    upvotes: Math.floor(Math.random() * 20 + 3),
    downvotes: Math.floor(Math.random() * 4),
    timestamp: Date.now() - Math.floor(Math.random() * DAY * 3),
  }
}

function makeSpec(title: string, phases: { title: string; desc: string }[]): { text: string; parsed: SpecPhase[] } {
  const text = phases.map((p, i) => `### Phase ${i + 1}: ${p.title}\n${p.desc}`).join('\n\n')
  const parsed: SpecPhase[] = phases.map((p, i) => ({
    id: `phase-${i + 1}`,
    number: i + 1,
    title: p.title,
    description: p.desc,
  }))
  return { text, parsed }
}

// ─── Seed Ideas ──────────────────────────────────────────────────────────────

const s1 = makeSpec('Verifiable ML Inference', [
  { title: 'ZK Circuit Design', desc: 'Design arithmetic circuits for common ML operations — matrix multiplication, ReLU, softmax. Optimize for proof generation time under 30s for small models.' },
  { title: 'Model Compilation Pipeline', desc: 'ONNX → circuit compiler. Support transformers up to 100M params. Quantization-aware compilation with accuracy loss < 1%.' },
  { title: 'On-chain Verifier', desc: 'Solidity verifier contract. Gas cost < 500k for proof verification. EIP-4844 blob support for large proofs.' },
  { title: 'SDK & Developer Experience', desc: 'TypeScript SDK for model owners. One-line verify() call. Dashboard for proof history, latency metrics, cost tracking.' },
])

const s2 = makeSpec('Autonomous Agents Marketplace', [
  { title: 'Agent Runtime', desc: 'Sandboxed execution environment for autonomous agents. Capability-based permissions. Resource metering and billing per compute-second.' },
  { title: 'Reputation & Discovery', desc: 'Agent rating system based on task completion, uptime, accuracy. Search and filter by capability, price, reputation score.' },
  { title: 'Payment Rails', desc: 'Escrow-based payments. Milestone releases. Dispute resolution via staked arbitrators. Multi-token support.' },
  { title: 'Agent Builder Studio', desc: 'Visual workflow editor for non-technical users. Template library. One-click deployment with auto-scaling.' },
])

const s3 = makeSpec('Decentralized Identity Aggregator', [
  { title: 'Credential Ingestion', desc: 'Connect to ENS, Lens, Farcaster, GitHub, X. Pull verifiable credentials, social graph, reputation signals into unified profile.' },
  { title: 'Privacy-Preserving Proofs', desc: 'Generate ZK proofs about identity attributes without revealing underlying data. "Prove you have >1000 followers without showing your handle."' },
  { title: 'Cross-chain Resolution', desc: 'Resolve identities across Ethereum, Solana, Cosmos. Unified API endpoint. Sub-second lookups with caching layer.' },
  { title: 'Developer API & Widget', desc: 'Embeddable identity card widget. REST + GraphQL APIs. Rate limiting, analytics dashboard, webhook notifications.' },
])

const s4 = makeSpec('DeFi Strategy Backtester', [
  { title: 'Historical Data Pipeline', desc: 'Index on-chain data for top 50 DeFi protocols. Block-level granularity. Store pool states, rates, TVL snapshots. 2+ years of history.' },
  { title: 'Strategy DSL', desc: 'Domain-specific language for expressing yield strategies. Support conditionals, rebalancing triggers, risk limits. Compile to simulation engine.' },
  { title: 'Simulation Engine', desc: 'Event-driven backtester with realistic gas costs, slippage, MEV impact. Monte Carlo for stress testing. Parallel execution for parameter sweeps.' },
  { title: 'Visualization & Sharing', desc: 'Interactive charts for P&L, drawdown, Sharpe ratio. Strategy sharing marketplace. Leaderboard with verified returns.' },
])

const s5 = makeSpec('Onchain Hiring Protocol', [
  { title: 'Candidate Profile Indexer', desc: 'Index GitHub contributions, on-chain activity, credential NFTs. Build skill graphs. Privacy controls for selective disclosure.' },
  { title: 'Job Posting & Matching', desc: 'Smart contract for job listings with required skills and compensation ranges. ML matching engine scoring candidates against requirements.' },
  { title: 'Assessment Framework', desc: 'On-chain skill assessments with ZK proofs of completion. Coding challenges, design tasks, domain knowledge tests. Proctored execution environment.' },
  { title: 'Escrow & Payout', desc: 'Multi-milestone employment contracts. Automated payroll via streaming payments. Dispute resolution with staked jurors.' },
])

const s6 = makeSpec('Collaborative Knowledge Graph', [
  { title: 'Entity Extraction Pipeline', desc: 'NLP pipeline for extracting entities and relationships from documents, papers, and web content. Support for technical domains.' },
  { title: 'Graph Storage & Query', desc: 'Neo4j-based storage with custom query language. Sub-second traversals for 6-degree queries. Real-time updates via event streaming.' },
  { title: 'Contribution Incentives', desc: 'Token rewards for adding verified nodes and edges. Quality scoring via peer review. Stake-weighted governance for disputed facts.' },
  { title: 'Visualization & API', desc: 'Interactive 3D graph explorer. Embedding-based semantic search. REST API with pagination. Export to common formats.' },
])

const s7 = makeSpec('AI-Native Code Review', [
  { title: 'Static Analysis Engine', desc: 'AST-level analysis for JS/TS/Python/Rust. Detect anti-patterns, security vulnerabilities, performance issues. Custom rule authoring.' },
  { title: 'LLM Review Pipeline', desc: 'Context-aware code review using Claude. Understands repo structure, coding conventions, PR history. Inline suggestions with confidence scores.' },
  { title: 'GitHub Integration', desc: 'GitHub App with PR comments, status checks, auto-approve for low-risk changes. Configurable review policies per team.' },
  { title: 'Learning & Adaptation', desc: 'Learn from accepted/rejected suggestions. Per-repo style models. Team preference profiles. Weekly improvement reports.' },
])

export const SEED_IDEAS: SeedIdea[] = [
  // ── 3 Settled (10-14 days ago) ─────────────────────────────────
  {
    id: 'idea-01',
    title: 'Verifiable ML Inference on EigenLayer',
    description: 'A protocol for generating and verifying zero-knowledge proofs of ML model inference, enabling trustless AI computation on-chain via EigenLayer AVS.',
    category: 'AI / Crypto',
    phase: 'settled',
    planterId: 'pl-1',
    plantedAt: daysAgo(13),
    conversation: [
      { role: 'user', content: 'What if we could prove that an ML model ran correctly without re-running it? ZK proofs for inference, deployed as an EigenLayer AVS.' },
      { role: 'assistant', content: 'This is the missing piece for trustless AI on-chain. The key challenge is proof generation time — current ZK-ML circuits are slow for large models. But if you scope to small models first (sub-100M params) and optimize the circuit design, you could have something production-ready. Who\'s the first customer — DeFi protocols that need verified price predictions, or AI marketplaces that need compute verification?' },
      { role: 'user', content: 'DeFi first. Oracles that can prove their predictions came from the model they claim to use. Then expand to any protocol that consumes AI outputs.' },
      { role: 'assistant', content: 'Perfect wedge. "Prove your oracle isn\'t lying" is an immediate pain point. You\'re ready — let me spec this out into a build plan.' },
    ],
    spec: s1.text,
    specPhases: s1.parsed,
    bids: {
      'phase-1': [
        makeBid('phase-1', MOCK_BUILDERS[0], 3200, 28000, 0.92, true),
        makeBid('phase-1', MOCK_BUILDERS[2], 3800, 25000, 0.88),
        makeBid('phase-1', MOCK_BUILDERS[4], 2900, 22000, 0.79),
      ],
      'phase-2': [
        makeBid('phase-2', MOCK_BUILDERS[0], 4100, 35000, 0.90, true),
        makeBid('phase-2', MOCK_BUILDERS[1], 4500, 30000, 0.85),
      ],
    },
    selectedBids: {
      'phase-1': makeBid('phase-1', MOCK_BUILDERS[0], 3200, 28000, 0.92, true),
      'phase-2': makeBid('phase-2', MOCK_BUILDERS[0], 4100, 35000, 0.90, true),
    },
    metrics: { users: 847, revenue: 12400, conversion: 8.2, engagement: 76, traffic: 2100, completion: 100 },
    builderName: 'Atlas Build',
    progress: 100,
  },
  {
    id: 'idea-02',
    title: 'Autonomous Agents Marketplace',
    description: 'A decentralized marketplace where autonomous AI agents can be discovered, hired, and paid for completing tasks — with reputation, escrow, and dispute resolution built in.',
    category: 'AI / Marketplace',
    phase: 'settled',
    planterId: 'pl-8',
    plantedAt: daysAgo(11),
    conversation: [
      { role: 'user', content: 'Agents are everywhere but there\'s no marketplace for them. I want to build the "app store" for autonomous agents — discovery, reputation, payments, all on-chain.' },
      { role: 'assistant', content: 'The timing is perfect. Every protocol is building agents but nobody has solved discovery and trust. The critical piece is the reputation system — it needs to be based on verifiable outcomes, not just ratings. And payments need milestone-based escrow so users aren\'t paying upfront for agents that might fail. What\'s the initial vertical — crypto-native tasks like trading bots, or broader like research agents?' },
      { role: 'user', content: 'Crypto-native first. Trading, yield optimization, governance participation. Then expand to general purpose.' },
      { role: 'assistant', content: 'Smart. Crypto users are already comfortable with on-chain payments and understand agent delegation. Let me build this out.' },
    ],
    spec: s2.text,
    specPhases: s2.parsed,
    bids: {
      'phase-1': [
        makeBid('phase-1', MOCK_BUILDERS[2], 3500, 32000, 0.91, true),
        makeBid('phase-1', MOCK_BUILDERS[3], 2800, 20000, 0.82),
      ],
      'phase-2': [
        makeBid('phase-2', MOCK_BUILDERS[2], 2900, 26000, 0.89, true),
        makeBid('phase-2', MOCK_BUILDERS[0], 3200, 28000, 0.87),
      ],
    },
    selectedBids: {
      'phase-1': makeBid('phase-1', MOCK_BUILDERS[2], 3500, 32000, 0.91, true),
      'phase-2': makeBid('phase-2', MOCK_BUILDERS[2], 2900, 26000, 0.89, true),
    },
    metrics: { users: 1234, revenue: 18700, conversion: 11.4, engagement: 82, traffic: 3400, completion: 100 },
    builderName: 'Canopy AI',
    progress: 100,
  },
  {
    id: 'idea-03',
    title: 'Decentralized Identity Aggregator',
    description: 'Unify your on-chain and off-chain identity into a single portable profile with privacy-preserving proofs. Connect ENS, Lens, GitHub, X, and more.',
    category: 'Identity',
    phase: 'settled',
    planterId: 'pl-4',
    plantedAt: daysAgo(10),
    conversation: [
      { role: 'user', content: 'Identity is fragmented across 20 platforms. I want one profile that aggregates everything — ENS, Lens, Farcaster, GitHub — and lets you prove things about yourself without revealing the raw data.' },
      { role: 'assistant', content: 'This is a foundational primitive that every app will need. The ZK proof angle is what makes this defensible — "prove you have >1000 GitHub stars without revealing your username" is a powerful capability. The challenge is adoption — you need apps that accept these proofs. What\'s your distribution strategy?' },
      { role: 'user', content: 'Start with crypto hiring platforms. They already need identity verification and skill attestation. Then expand to any app that needs know-your-user.' },
      { role: 'assistant', content: 'Crypto hiring is the perfect beachhead — high willingness to pay, clear pain point. Let me spec this.' },
    ],
    spec: s3.text,
    specPhases: s3.parsed,
    bids: {
      'phase-1': [
        makeBid('phase-1', MOCK_BUILDERS[1], 2800, 24000, 0.90, true),
        makeBid('phase-1', MOCK_BUILDERS[4], 3100, 22000, 0.84),
        makeBid('phase-1', MOCK_BUILDERS[3], 2500, 19000, 0.78),
      ],
    },
    selectedBids: {
      'phase-1': makeBid('phase-1', MOCK_BUILDERS[1], 2800, 24000, 0.90, true),
    },
    metrics: { users: 623, revenue: 8900, conversion: 6.7, engagement: 71, traffic: 1800, completion: 100 },
    builderName: 'Verdant Labs',
    progress: 100,
  },

  // ── 4 Execution (5-10 days ago) ────────────────────────────────
  {
    id: 'idea-04',
    title: 'DeFi Strategy Backtester',
    description: 'Backtest any DeFi yield strategy against 2+ years of on-chain data. Realistic gas costs, slippage, and MEV impact. Share and compare strategies on a public leaderboard.',
    category: 'DeFi / Tools',
    phase: 'execution',
    planterId: 'pl-10',
    plantedAt: daysAgo(9),
    conversation: [
      { role: 'user', content: 'Every DeFi farmer runs strategies blind. There\'s no backtesting infrastructure. I want to build the QuantConnect of DeFi — full historical simulation with real on-chain data.' },
      { role: 'assistant', content: 'This is desperately needed. The key differentiator vs existing tools is fidelity — you need to model gas costs, MEV, and slippage accurately, not just token price movements. A DSL for expressing strategies would make this accessible beyond just quants. Who are you targeting first — fund managers or individual DeFi power users?' },
      { role: 'user', content: 'Individual power users first — they\'re underserved and will evangelize. Fund managers come later with a premium tier.' },
      { role: 'assistant', content: 'Right approach. Power users are your marketing team. Let me build the spec.' },
    ],
    spec: s4.text,
    specPhases: s4.parsed,
    bids: {
      'phase-1': [
        makeBid('phase-1', MOCK_BUILDERS[0], 3600, 30000, 0.91, true),
        makeBid('phase-1', MOCK_BUILDERS[2], 4000, 28000, 0.87),
      ],
    },
    selectedBids: {
      'phase-1': makeBid('phase-1', MOCK_BUILDERS[0], 3600, 30000, 0.91, true),
    },
    metrics: { users: 312, revenue: 4200, conversion: 5.1, engagement: 58, traffic: 890, completion: 72 },
    builderName: 'Atlas Build',
    progress: 72,
  },
  {
    id: 'idea-05',
    title: 'Onchain Hiring Protocol',
    description: 'A protocol for trustless hiring — verifiable skill assessments, on-chain reputation, milestone-based employment contracts with streaming payments.',
    category: 'HR / Crypto',
    phase: 'execution',
    planterId: 'pl-7',
    plantedAt: daysAgo(8),
    conversation: [
      { role: 'user', content: 'Hiring in crypto is broken. Pseudonymous contributors can\'t prove their skills, and DAOs have no way to assess candidates objectively. I want verifiable assessments + on-chain employment contracts.' },
      { role: 'assistant', content: 'The skill verification angle is key — ZK proofs of assessment completion without revealing scores to everyone. And streaming payments via Sablier/Superfluid for ongoing employment is much better than lump-sum bounties. What\'s the MVP — just the assessment framework, or full hiring flow?' },
      { role: 'user', content: 'Full flow. Assessment → matching → contract → payment. But start with one vertical — Solidity developers. Then expand to other roles.' },
      { role: 'assistant', content: 'Solidity devs are perfect — high demand, verifiable on-chain activity, and the audience is already crypto-native. Let me spec it.' },
    ],
    spec: s5.text,
    specPhases: s5.parsed,
    bids: {
      'phase-1': [
        makeBid('phase-1', MOCK_BUILDERS[1], 3100, 27000, 0.89, true),
        makeBid('phase-1', MOCK_BUILDERS[3], 2600, 21000, 0.81),
        makeBid('phase-1', MOCK_BUILDERS[4], 2900, 24000, 0.85),
      ],
    },
    selectedBids: {
      'phase-1': makeBid('phase-1', MOCK_BUILDERS[1], 3100, 27000, 0.89, true),
    },
    metrics: { users: 189, revenue: 2800, conversion: 4.3, engagement: 52, traffic: 620, completion: 45 },
    builderName: 'Verdant Labs',
    progress: 45,
  },
  {
    id: 'idea-06',
    title: 'Collaborative Knowledge Graph',
    description: 'A decentralized knowledge graph where anyone can contribute entities and relationships. Token incentives for quality contributions, ZK proofs for disputed facts.',
    category: 'Knowledge / AI',
    phase: 'execution',
    planterId: 'pl-5',
    plantedAt: daysAgo(6),
    conversation: [
      { role: 'user', content: 'Wikipedia for structured data, but incentivized. A knowledge graph where contributors earn tokens for adding verified facts and relationships. Quality enforced by staked peer review.' },
      { role: 'assistant', content: 'This is one of those "obvious in hindsight" ideas. The incentive design is everything — you need to reward quality over quantity, and the peer review mechanism needs to be resistant to collusion. What domain are you starting with? General knowledge is too broad for v1.' },
      { role: 'user', content: 'Start with crypto/DeFi knowledge — protocols, teams, funding rounds, token mechanics. The community already cares about getting this right.' },
      { role: 'assistant', content: 'Perfect vertical. DeFi researchers are already building informal knowledge bases. Let me formalize this into a build plan.' },
    ],
    spec: s6.text,
    specPhases: s6.parsed,
    bids: {
      'phase-1': [
        makeBid('phase-1', MOCK_BUILDERS[2], 2700, 23000, 0.88, true),
        makeBid('phase-1', MOCK_BUILDERS[0], 3000, 25000, 0.86),
      ],
    },
    selectedBids: {
      'phase-1': makeBid('phase-1', MOCK_BUILDERS[2], 2700, 23000, 0.88, true),
    },
    metrics: { users: 95, revenue: 1200, conversion: 3.8, engagement: 44, traffic: 340, completion: 28 },
    builderName: 'Canopy AI',
    progress: 28,
  },
  {
    id: 'idea-07',
    title: 'AI-Native Code Review Platform',
    description: 'Code review powered by LLMs that understand your repo, team conventions, and PR history. Auto-approve low-risk changes, flag security issues, learn from feedback.',
    category: 'DevTools / AI',
    phase: 'execution',
    planterId: 'pl-6',
    plantedAt: daysAgo(5),
    conversation: [
      { role: 'user', content: 'Code review is a bottleneck for every team. What if an AI reviewer could handle 80% of PRs — checking for bugs, style issues, security problems — and only escalate the hard ones to humans?' },
      { role: 'assistant', content: 'The key insight is that most code review is pattern-matching — "this function doesn\'t handle the error case", "this query is vulnerable to injection". An LLM with repo context can catch these reliably. The hard part is building trust — teams need to see the AI catch real issues before they\'ll auto-approve. What\'s your go-to-market — GitHub App, or integrated into existing tools like Linear/Jira?' },
      { role: 'user', content: 'GitHub App. Lowest friction — install it and it starts reviewing PRs immediately. The value is obvious within the first day.' },
      { role: 'assistant', content: 'Exactly right. Time-to-value is everything for dev tools. Let me build the spec.' },
    ],
    spec: s7.text,
    specPhases: s7.parsed,
    bids: {
      'phase-1': [
        makeBid('phase-1', MOCK_BUILDERS[4], 2400, 20000, 0.87, true),
        makeBid('phase-1', MOCK_BUILDERS[1], 2800, 22000, 0.84),
      ],
    },
    selectedBids: {
      'phase-1': makeBid('phase-1', MOCK_BUILDERS[4], 2400, 20000, 0.87, true),
    },
    metrics: { users: 67, revenue: 800, conversion: 3.2, engagement: 38, traffic: 210, completion: 20 },
    builderName: 'Branch & Co',
    progress: 20,
  },

  // ── 4 Bidding (3-6 days ago) ───────────────────────────────────
  {
    id: 'idea-08',
    title: 'MEV-Aware Transaction Router',
    description: 'A transaction routing layer that protects users from MEV extraction. Analyzes mempool conditions in real-time and routes via optimal paths — private mempools, batch auctions, or direct submission.',
    category: 'DeFi / Infrastructure',
    phase: 'bidding',
    planterId: 'pl-9',
    plantedAt: daysAgo(5),
    conversation: [
      { role: 'user', content: 'MEV is still extracting billions from users. What if every wallet had a smart routing layer that analyzed mempool conditions and chose the best path — Flashbots Protect, batch auctions, or private mempools?' },
      { role: 'assistant', content: 'The routing intelligence is the moat. You need real-time mempool analysis plus historical data on which protection methods work best for different transaction types. The challenge is latency — routing decisions need to happen in milliseconds. Are you building this as a wallet plugin, an RPC endpoint, or a standalone app?' },
      { role: 'user', content: 'RPC endpoint. Drop-in replacement for any existing wallet or dApp. Zero integration effort for the user.' },
      { role: 'assistant', content: 'That\'s the right abstraction layer. Let me spec this out.' },
    ],
    spec: '### Phase 1: Mempool Analysis Engine\nReal-time mempool monitoring across major builders. Transaction classification and MEV risk scoring. Historical pattern database for prediction accuracy.\n\n### Phase 2: Routing Intelligence\nMulti-path routing optimizer. Integration with Flashbots, MEV Blocker, private mempools. Dynamic selection based on tx type, urgency, and gas conditions.\n\n### Phase 3: RPC Gateway\nDrop-in JSON-RPC endpoint. Wallet-agnostic compatibility. Sub-100ms routing decisions. Failover and redundancy.\n\n### Phase 4: Analytics Dashboard\nMEV savings tracker per user. Network-wide protection metrics. Leaderboard of most-protected wallets.',
    specPhases: [
      { id: 'phase-1', number: 1, title: 'Mempool Analysis Engine', description: 'Real-time mempool monitoring across major builders. Transaction classification and MEV risk scoring.' },
      { id: 'phase-2', number: 2, title: 'Routing Intelligence', description: 'Multi-path routing optimizer with Flashbots, MEV Blocker, and private mempool integrations.' },
      { id: 'phase-3', number: 3, title: 'RPC Gateway', description: 'Drop-in JSON-RPC endpoint with sub-100ms routing and wallet-agnostic compatibility.' },
      { id: 'phase-4', number: 4, title: 'Analytics Dashboard', description: 'MEV savings tracker, network metrics, and protection leaderboard.' },
    ],
    bids: {
      'phase-1': [
        makeBid('phase-1', MOCK_BUILDERS[0], 3400, 29000, 0.90),
        makeBid('phase-1', MOCK_BUILDERS[2], 3900, 27000, 0.86),
        makeBid('phase-1', MOCK_BUILDERS[1], 3100, 24000, 0.88),
      ],
      'phase-2': [
        makeBid('phase-2', MOCK_BUILDERS[3], 2800, 22000, 0.83),
        makeBid('phase-2', MOCK_BUILDERS[4], 3200, 26000, 0.85),
      ],
    },
  },
  {
    id: 'idea-09',
    title: 'Proof-of-Contribution DAO Framework',
    description: 'A DAO governance framework where voting power is earned through verifiable contributions — code commits, proposal authoring, community moderation — not just token holdings.',
    category: 'Governance',
    phase: 'bidding',
    planterId: 'pl-11',
    plantedAt: daysAgo(4),
    conversation: [
      { role: 'user', content: 'Token-weighted voting is plutocratic. What if governance power was earned by actually contributing — writing code, reviewing proposals, moderating forums? Proof-of-contribution, not proof-of-wealth.' },
      { role: 'assistant', content: 'This is one of the most important unsolved problems in crypto governance. The tricky part is defining and measuring "contribution" — it needs to be objective enough to resist gaming but flexible enough to capture diverse types of value creation. How do you plan to quantify contributions?' },
      { role: 'user', content: 'On-chain attestations from other DAO members, weighted by their own contribution scores. Like PageRank for governance. Plus verifiable metrics — GitHub commits, executed proposals, forum engagement.' },
      { role: 'assistant', content: 'PageRank for governance is a powerful mental model. The recursive trust scoring prevents Sybil attacks naturally. Let me build the spec.' },
    ],
    spec: '### Phase 1: Contribution Indexer\nIndex GitHub, Discourse, Snapshot, and on-chain activity. Build contribution graphs per DAO member. Normalize across activity types.\n\n### Phase 2: Reputation Scoring Engine\nPageRank-style recursive trust scoring. Anti-Sybil mechanisms. Decay functions for stale contributions. Configurable weights per DAO.\n\n### Phase 3: Governance Module\nGovernance plugin compatible with Governor, Moloch, and custom frameworks. Contribution-weighted voting. Delegation with reputation transfer.\n\n### Phase 4: Analytics & Transparency\nPublic dashboards for contribution distribution. Power centralization alerts. Historical governance analysis.',
    specPhases: [
      { id: 'phase-1', number: 1, title: 'Contribution Indexer', description: 'Index GitHub, Discourse, Snapshot activity. Build contribution graphs per DAO member.' },
      { id: 'phase-2', number: 2, title: 'Reputation Scoring Engine', description: 'PageRank-style recursive scoring with anti-Sybil and configurable weights.' },
      { id: 'phase-3', number: 3, title: 'Governance Module', description: 'Plugin for Governor/Moloch with contribution-weighted voting and delegation.' },
      { id: 'phase-4', number: 4, title: 'Analytics & Transparency', description: 'Public dashboards, power centralization alerts, governance analysis.' },
    ],
    bids: {
      'phase-1': [
        makeBid('phase-1', MOCK_BUILDERS[1], 2600, 22000, 0.87),
        makeBid('phase-1', MOCK_BUILDERS[0], 3000, 25000, 0.91),
        makeBid('phase-1', MOCK_BUILDERS[4], 2400, 19000, 0.82),
        makeBid('phase-1', MOCK_BUILDERS[3], 2200, 18000, 0.79),
      ],
    },
  },
  {
    id: 'idea-10',
    title: 'Cross-Chain Intent Solver Network',
    description: 'A network of competing solvers that fulfill user intents across chains. Users express what they want (swap X for Y on chain Z), solvers compete on price, speed, and reliability.',
    category: 'Infrastructure',
    phase: 'bidding',
    planterId: 'pl-2',
    plantedAt: daysAgo(4),
    conversation: [
      { role: 'user', content: 'Bridges are terrible UX. Users shouldn\'t think about chains at all. What if you just said "I want 1000 USDC on Arbitrum" and a network of solvers competed to make it happen — best price, fastest execution, verifiable settlement?' },
      { role: 'assistant', content: 'Intent-based architectures are the future of cross-chain UX. The solver competition is what keeps prices honest. You need a robust auction mechanism — something like a sealed-bid second-price auction with reputation-weighted priority. What\'s your edge vs existing intent protocols like UniswapX or Across?' },
      { role: 'user', content: 'Multi-chain from day one, not just Ethereum L1↔L2. And a permissionless solver network — anyone can compete, not just whitelisted market makers.' },
      { role: 'assistant', content: 'Permissionless + multi-chain is the right bet. Let me spec this out.' },
    ],
    spec: '### Phase 1: Intent Expression Layer\nType-safe intent DSL. Support swap, bridge, stake, and compound intents. Cross-chain asset resolution. Gas abstraction.\n\n### Phase 2: Solver Auction\nSealed-bid second-price auctions. Reputation scoring. Solver staking and slashing. Latency-optimized matching engine.\n\n### Phase 3: Settlement & Verification\nOptimistic settlement with fraud proofs. Multi-chain transaction verification. Automatic retry and refund on failure.\n\n### Phase 4: SDK & Developer Tools\nTypeScript SDK for dApps. React hooks for intent submission. Solver toolkit for running nodes. Analytics API.',
    specPhases: [
      { id: 'phase-1', number: 1, title: 'Intent Expression Layer', description: 'Type-safe intent DSL supporting swap, bridge, stake, and compound intents across chains.' },
      { id: 'phase-2', number: 2, title: 'Solver Auction', description: 'Sealed-bid auctions with reputation scoring, staking, and latency-optimized matching.' },
      { id: 'phase-3', number: 3, title: 'Settlement & Verification', description: 'Optimistic settlement with fraud proofs, multi-chain verification, auto-retry.' },
      { id: 'phase-4', number: 4, title: 'SDK & Developer Tools', description: 'TypeScript SDK, React hooks, solver toolkit, and analytics API.' },
    ],
    bids: {
      'phase-1': [
        makeBid('phase-1', MOCK_BUILDERS[2], 4200, 35000, 0.93),
        makeBid('phase-1', MOCK_BUILDERS[0], 3800, 32000, 0.90),
      ],
      'phase-2': [
        makeBid('phase-2', MOCK_BUILDERS[1], 3500, 28000, 0.87),
      ],
    },
  },
  {
    id: 'idea-11',
    title: 'Decentralized Compute Marketplace',
    description: 'A peer-to-peer marketplace for GPU compute. Providers list idle GPUs, buyers get inference and training at 60% below cloud prices. Verified execution via TEEs.',
    category: 'Infrastructure / AI',
    phase: 'bidding',
    planterId: 'pl-3',
    plantedAt: daysAgo(3),
    conversation: [
      { role: 'user', content: 'GPU compute is scarce and expensive. There are millions of idle GPUs worldwide — gaming rigs, crypto mining hardware, university clusters. What if we built a marketplace where anyone could sell their idle compute and buyers get inference at 60% below AWS?' },
      { role: 'assistant', content: 'The supply side is massive if you can make it easy to onboard. The trust problem is real though — how do buyers know the compute ran correctly? TEEs (Trusted Execution Environments) could solve this, but they add complexity. What\'s the minimum trust model for v1?' },
      { role: 'user', content: 'TEEs for high-value jobs, probabilistic verification for commodity inference. Start with inference only — training is harder to verify and needs persistent state.' },
      { role: 'assistant', content: 'Inference-first with tiered verification is pragmatic. The market for cheap inference is enormous. Let me spec this.' },
    ],
    spec: '### Phase 1: Provider Onboarding\nGPU detection and benchmarking agent. One-click provider setup. Earnings estimator. Hardware compatibility matrix.\n\n### Phase 2: Job Scheduling & Matching\nLatency-aware job routing. Provider selection by price, latency, reliability. Queue management and priority tiers.\n\n### Phase 3: Verification Layer\nTEE-based verified execution for premium tier. Probabilistic spot-checking for standard tier. Slashing for incorrect results.\n\n### Phase 4: Payment & Reputation\nPer-second billing with streaming payments. Provider reputation scoring. Buyer credit system. Dispute resolution.',
    specPhases: [
      { id: 'phase-1', number: 1, title: 'Provider Onboarding', description: 'GPU detection, benchmarking, one-click setup, and earnings estimator.' },
      { id: 'phase-2', number: 2, title: 'Job Scheduling & Matching', description: 'Latency-aware routing, provider selection, queue management, priority tiers.' },
      { id: 'phase-3', number: 3, title: 'Verification Layer', description: 'TEE-based verified execution premium tier, probabilistic spot-checking standard tier.' },
      { id: 'phase-4', number: 4, title: 'Payment & Reputation', description: 'Streaming payments, reputation scoring, credit system, dispute resolution.' },
    ],
    bids: {
      'phase-1': [
        makeBid('phase-1', MOCK_BUILDERS[3], 2900, 24000, 0.85),
        makeBid('phase-1', MOCK_BUILDERS[0], 3400, 28000, 0.90),
        makeBid('phase-1', MOCK_BUILDERS[2], 3100, 26000, 0.88),
      ],
    },
  },

  // ── 4 Spec-gen (1-3 days ago) ──────────────────────────────────
  {
    id: 'idea-12',
    title: 'Programmable Subscription Protocol',
    description: 'On-chain subscriptions with programmable logic — auto-cancel if a service degrades, split payments across providers, loyalty rewards, and portable subscription history.',
    category: 'Payments',
    phase: 'spec-gen',
    planterId: 'pl-12',
    plantedAt: daysAgo(3),
    conversation: [
      { role: 'user', content: 'Subscriptions are stuck in Web2. What if your subscriptions were smart contracts? Auto-cancel if SLA drops below threshold, split payment to multiple providers, accrue loyalty tokens, and your subscription history is portable across apps.' },
      { role: 'assistant', content: 'This is the right primitive for the subscription economy moving on-chain. The auto-cancel on SLA violation alone would be worth it — imagine your VPN subscription pausing when uptime drops below 99.5%. The portable history creates network effects. What\'s the first use case — SaaS tools, media subscriptions, or DeFi services?' },
      { role: 'user', content: 'DeFi services first — node providers, data feeds, analytics platforms. They already accept crypto and have measurable SLAs.' },
      { role: 'assistant', content: 'DeFi infrastructure subscriptions are ideal — high value, measurable quality, crypto-native payments. Generating your spec now.' },
    ],
    spec: '### Phase 1: Subscription Contract Framework\nERC-standard subscription contracts with programmable terms, auto-renewal, and cancellation conditions.\n\n### Phase 2: SLA Oracle Integration\nOn-chain SLA monitoring via oracle feeds. Auto-trigger cancellation or payment reduction on violations.\n\n### Phase 3: Loyalty & Rewards Engine\nToken accrual per subscription period. Tiered benefits. Cross-protocol loyalty portability.\n\n### Phase 4: Discovery & Management Dashboard\nSubscription marketplace. Portfolio view of all active subscriptions. Spending analytics and optimization suggestions.',
    specPhases: [
      { id: 'phase-1', number: 1, title: 'Subscription Contract Framework', description: 'ERC-standard subscription contracts with programmable terms, auto-renewal, cancellation conditions.' },
      { id: 'phase-2', number: 2, title: 'SLA Oracle Integration', description: 'On-chain SLA monitoring, auto-trigger cancellation or payment reduction on violations.' },
      { id: 'phase-3', number: 3, title: 'Loyalty & Rewards Engine', description: 'Token accrual, tiered benefits, cross-protocol loyalty portability.' },
      { id: 'phase-4', number: 4, title: 'Discovery & Management', description: 'Subscription marketplace, portfolio view, spending analytics.' },
    ],
  },
  {
    id: 'idea-13',
    title: 'Real-Time Regulatory Compliance Engine',
    description: 'An AI-powered compliance engine that monitors DeFi protocol activity in real-time and flags potential regulatory issues before they become problems.',
    category: 'Compliance / AI',
    phase: 'spec-gen',
    planterId: 'pl-7',
    plantedAt: daysAgo(2),
    conversation: [
      { role: 'user', content: 'DeFi protocols are flying blind on compliance. They need real-time monitoring that flags sanctioned addresses, suspicious patterns, and regulatory changes — before regulators come knocking.' },
      { role: 'assistant', content: 'The timing is critical — every protocol is trying to figure this out. The key is making it proactive, not reactive. You need to monitor OFAC updates, FATF travel rule requirements, and jurisdiction-specific rules simultaneously. Can you make this a plug-in that any protocol can add without changing their core contracts?' },
      { role: 'user', content: 'Exactly — a middleware layer. Protocols call our API before executing transactions. We return a compliance score and any flags. Zero changes to their smart contracts.' },
      { role: 'assistant', content: 'Middleware approach is perfect for adoption. Let me generate the full spec.' },
    ],
    spec: '### Phase 1: Sanctions & Watchlist Monitoring\nReal-time OFAC, EU, UN sanctions list integration. Address screening API with sub-50ms response time.\n\n### Phase 2: Pattern Detection Engine\nML-based suspicious activity detection. Wash trading, structuring, mixer usage identification.\n\n### Phase 3: Regulatory Intelligence Feed\nNLP pipeline for parsing regulatory updates globally. Jurisdiction mapping for protocol users.\n\n### Phase 4: Compliance Dashboard & Reporting\nProtocol-level compliance dashboards. Auto-generated SAR-like reports. Audit trail for regulators.',
    specPhases: [
      { id: 'phase-1', number: 1, title: 'Sanctions & Watchlist Monitoring', description: 'Real-time OFAC/EU/UN integration, address screening API with sub-50ms response.' },
      { id: 'phase-2', number: 2, title: 'Pattern Detection Engine', description: 'ML-based suspicious activity detection — wash trading, structuring, mixer usage.' },
      { id: 'phase-3', number: 3, title: 'Regulatory Intelligence Feed', description: 'NLP pipeline for parsing regulatory updates globally, jurisdiction mapping.' },
      { id: 'phase-4', number: 4, title: 'Compliance Dashboard & Reporting', description: 'Protocol dashboards, auto-generated reports, audit trail.' },
    ],
  },
  {
    id: 'idea-14',
    title: 'Modular Rollup Deployment Kit',
    description: 'One-click rollup deployment with modular components — choose your DA layer, execution environment, settlement chain, and sequencer. Like Vercel for rollups.',
    category: 'Infrastructure',
    phase: 'spec-gen',
    planterId: 'pl-1',
    plantedAt: daysAgo(2),
    conversation: [
      { role: 'user', content: 'Deploying a rollup still requires deep infrastructure knowledge. What if it was as easy as deploying a Vercel app? Pick your DA (Celestia/EigenDA/Avail), execution (EVM/SVM/Move), settlement (Ethereum/Solana), and you\'re live in minutes.' },
      { role: 'assistant', content: 'The modular blockchain thesis needs better tooling to reach its potential. The comparison to Vercel is apt — abstract away the complexity, let developers focus on their application logic. The challenge is maintaining composability across these modular choices. Are you building on top of existing frameworks like OP Stack/Arbitrum Orbit, or from scratch?' },
      { role: 'user', content: 'On top of existing frameworks. We\'re the orchestration layer, not another rollup framework. Support OP Stack, Orbit, Polygon CDK, and eventually sovereign rollups.' },
      { role: 'assistant', content: 'Orchestration layer is the right abstraction. Framework-agnostic is key for adoption. Generating your spec now.' },
    ],
    spec: '### Phase 1: Framework Adapters\nAdapters for OP Stack, Arbitrum Orbit, Polygon CDK. Standardized configuration interface across frameworks.\n\n### Phase 2: DA Layer Integration\nPlug-and-play DA modules for Celestia, EigenDA, Avail. Automatic blob submission and verification.\n\n### Phase 3: Deployment Pipeline\nOne-click deployment to cloud providers. Monitoring, alerting, auto-scaling. Testnet faucets and block explorers included.\n\n### Phase 4: Developer Dashboard\nRollup management console. Chain metrics, cost tracking, upgrade management. Multi-chain portfolio view.',
    specPhases: [
      { id: 'phase-1', number: 1, title: 'Framework Adapters', description: 'Adapters for OP Stack, Orbit, Polygon CDK with standardized configuration.' },
      { id: 'phase-2', number: 2, title: 'DA Layer Integration', description: 'Plug-and-play DA modules for Celestia, EigenDA, Avail.' },
      { id: 'phase-3', number: 3, title: 'Deployment Pipeline', description: 'One-click deployment, monitoring, alerting, auto-scaling, testnet tools.' },
      { id: 'phase-4', number: 4, title: 'Developer Dashboard', description: 'Rollup management, chain metrics, cost tracking, upgrades.' },
    ],
  },
  {
    id: 'idea-15',
    title: 'Social Trading Copycat Protocol',
    description: 'Copy the on-chain trades of top-performing wallets in real-time. Automated position mirroring with configurable risk limits, slippage protection, and transparent track records.',
    category: 'DeFi / Social',
    phase: 'spec-gen',
    planterId: 'pl-10',
    plantedAt: daysAgo(1),
    conversation: [
      { role: 'user', content: 'On-chain trading is transparent but nobody\'s built proper copy-trading infrastructure. I want to track whale wallets, mirror their trades automatically, and let anyone follow the best performers with configurable risk limits.' },
      { role: 'assistant', content: 'The raw data is there — every trade is public. The challenge is execution speed and risk management. You need to detect trades within seconds and execute before the price moves. Plus configurable position sizing, stop losses, and maximum exposure per strategy. Are you doing this cross-chain or single-chain first?' },
      { role: 'user', content: 'Ethereum + Solana first. That covers 80% of on-chain trading volume. Cross-chain comes later.' },
      { role: 'assistant', content: 'ETH + SOL covers the market. Speed is your competitive advantage. Generating spec now.' },
    ],
  },

  // ── 5 Ideation (0-2 days ago) ──────────────────────────────────
  {
    id: 'idea-16',
    title: 'Prediction Market for Protocol Governance',
    description: 'Bet on the outcome of governance proposals. Markets resolve based on on-chain vote results. Price discovery for governance decisions before they happen.',
    category: 'Governance / DeFi',
    phase: 'ideation',
    planterId: 'pl-9',
    plantedAt: daysAgo(2),
    conversation: [
      { role: 'user', content: 'What if you could bet on whether a governance proposal will pass? The prediction market would create price discovery for governance decisions and incentivize informed participation.' },
      { role: 'assistant', content: 'This creates a fascinating feedback loop — the prediction market price signals how likely a proposal is to pass, which itself influences how people vote. The market becomes both a prediction tool and a coordination mechanism. The resolution is clean too — just check the on-chain vote result. What protocols are you thinking of starting with?' },
    ],
  },
  {
    id: 'idea-17',
    title: 'Decentralized API Gateway',
    description: 'A peer-to-peer network of API gateways that provides censorship-resistant, rate-limit-free access to any public API. Providers stake tokens and earn fees.',
    category: 'Infrastructure',
    phase: 'ideation',
    planterId: 'pl-3',
    plantedAt: daysAgo(1),
    conversation: [
      { role: 'user', content: 'Every dApp relies on centralized APIs that can be rate-limited, censored, or shut down. What if there was a decentralized network of API relay nodes that guaranteed access? Providers stake tokens, earn fees, get slashed for downtime.' },
      { role: 'assistant', content: 'You\'re building infrastructure for infrastructure — the "Cloudflare of web3" essentially. The staking model aligns incentives nicely, but you need to solve the caching and consistency problem. How do you ensure all nodes serve the same data for non-deterministic APIs?' },
    ],
  },
  {
    id: 'idea-18',
    title: 'On-Chain Talent Bounty Board',
    description: 'A decentralized bounty platform where projects post tasks, contributors claim and complete them, and payment is automated via escrow. Built for open-source and DAOs.',
    category: 'HR / Crypto',
    phase: 'ideation',
    planterId: 'pl-6',
    plantedAt: daysAgo(1),
    conversation: [
      { role: 'user', content: 'Gitcoin bounties but actually good. Automated escrow, skill-based matching, on-chain reputation that follows you across projects. Every open-source project should have a bounty board that works.' },
      { role: 'assistant', content: 'The key differentiator needs to be the matching engine — don\'t just list bounties, actively match them to contributors based on their on-chain history and verified skills. And the escrow needs milestone releases, not all-or-nothing. What\'s the fee model — flat rate or percentage of bounty?' },
    ],
  },
  {
    id: 'idea-19',
    title: 'Trustless Data Feeds for AI Models',
    description: 'An oracle network specifically designed for AI/ML applications — providing verified training data, benchmark results, and model performance metrics on-chain.',
    category: 'AI / Oracles',
    phase: 'ideation',
    planterId: 'pl-5',
    plantedAt: daysAgo(0),
    conversation: [
      { role: 'user', content: 'AI models need trustworthy data feeds — verified training datasets, benchmark scores, model provenance. Nobody\'s built the oracle infrastructure specifically for AI use cases. This should be the Chainlink of AI.' },
      { role: 'assistant', content: 'Fascinating gap in the market. The verification layer is what makes this hard — how do you verify that a dataset is "clean" or that a benchmark score is legitimate? You\'d need a combination of cryptographic attestations and staked validators who specialize in data quality.' },
    ],
  },
  {
    id: 'idea-20',
    title: 'DAO-to-DAO Service Agreements',
    description: 'A protocol for DAOs to enter into formal, enforceable service agreements with each other. Smart contract SLAs, automated payments, and dispute resolution.',
    category: 'Governance',
    phase: 'ideation',
    planterId: 'pl-4',
    plantedAt: daysAgo(0),
    conversation: [
      { role: 'user', content: 'DAOs need to work together but have no framework for it. What if two DAOs could enter a smart contract service agreement — "DAO A provides X service to DAO B for Y tokens/month, with these SLA guarantees and this dispute resolution mechanism"?' },
      { role: 'assistant', content: 'B2B for web3 — this is a massive gap. The challenge is representing complex service agreements in smart contract logic. You\'d need a template library for common agreement types and an arbitration layer for edge cases. The inter-DAO treasury management is also non-trivial. How are you handling multi-sig approvals from both sides?' },
    ],
  },
]

// ─── Accessors ───────────────────────────────────────────────────────────────

export function getIdeaById(id: string): SeedIdea | undefined {
  return SEED_IDEAS.find((i) => i.id === id)
}

export function getIdeasByPhase(phase?: IdeaPhase): SeedIdea[] {
  if (!phase) return SEED_IDEAS
  return SEED_IDEAS.filter((i) => i.phase === phase)
}

export function getAggregateStats() {
  const total = SEED_IDEAS.length
  const specsGenerated = SEED_IDEAS.filter((i) =>
    ['spec-gen', 'bidding', 'execution', 'settled'].includes(i.phase)
  ).length
  const buildsInProgress = SEED_IDEAS.filter((i) =>
    ['execution', 'settled'].includes(i.phase)
  ).length
  const settled = SEED_IDEAS.filter((i) => i.phase === 'settled').length
  const totalRevenue = SEED_IDEAS.reduce((s, i) => s + (i.metrics?.revenue || 0), 0)
  const totalUsers = SEED_IDEAS.reduce((s, i) => s + (i.metrics?.users || 0), 0)
  return { total, specsGenerated, buildsInProgress, settled, totalRevenue, totalUsers }
}

export function getPlanterById(id: string): Planter | undefined {
  return SEED_PLANTERS.find((p) => p.id === id)
}
