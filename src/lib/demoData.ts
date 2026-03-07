export const SAGE_TOKEN = {
  name: '$SOVRA',
  fullName: 'Sovra',
  tagline: 'The native token of Grove',
}

export interface EpochBrief {
  epochNumber: number
  workItemId: string
  title: string
  scope: string
  expectedOutcome: string
  constraints: string[]
  startingBid: number
  sageReward: number
}

export const DEMO_EPOCH_BRIEFS: EpochBrief[] = [
  {
    epochNumber: 1,
    workItemId: 'p1-w1',
    title: 'cartoon-generation-pipeline',
    scope: 'End-to-end pipeline from topic input to finished cartoon. Stable Diffusion XL fine-tuned on editorial cartoon style + Claude for caption/dialogue generation. Deterministic seed support for reproducibility. Output: single-panel and multi-panel formats at 1080x1080 and 1200x675.',
    expectedOutcome: 'Pipeline accepts a topic + editorial angle and produces a publish-ready cartoon with caption in under 90 seconds. Style is consistent across outputs. Human-indistinguishable from professional editorial cartoons in blind test.',
    constraints: [
      'Cartoon style must be consistent across all outputs — fine-tuned checkpoint locked per version',
      'Caption generation must reflect Sovra editorial voice (sharp, satirical, pro-open-innovation)',
      'Pipeline must be fully deterministic given the same seed + prompt',
      'Latency from topic to finished image must be under 90 seconds',
      'All generated images must pass content safety filter before publish queue',
    ],
    startingBid: 2000,
    sageReward: 80000,
  },
  {
    epochNumber: 2,
    workItemId: 'p2-w1',
    title: 'tee-enclave-runtime',
    scope: 'Deploy Sovra agent brain inside a Trusted Execution Environment (Intel TDX or AWS Nitro Enclave). Agent decision loop, private keys, and editorial policy run inside the enclave. Remote attestation endpoint for public verifiability.',
    expectedOutcome: 'Agent runtime fully operational inside TEE. Remote attestation proves code integrity to any verifier. Private keys never leave the enclave. All publish decisions are auditable via signed attestation logs.',
    constraints: [
      'Private keys must be generated inside the enclave and never exported',
      'Remote attestation must be publicly queryable and verifiable on-chain',
      'Agent must continue operating through enclave restarts via encrypted state snapshots',
      'Latency overhead from TEE must not exceed 200ms per decision cycle',
      'Must support secure update path — new code versions require governance approval',
    ],
    startingBid: 2500,
    sageReward: 100000,
  },
  {
    epochNumber: 3,
    workItemId: 'p3-w1',
    title: 'x-api-integration',
    scope: 'Full X/Twitter API v2 integration for autonomous posting, reply management, and engagement tracking. Agent publishes cartoons with commentary threads. Monitors mentions and quote tweets. Engagement analytics feed back into topic selection.',
    expectedOutcome: 'Sovra autonomously publishes cartoons to X with commentary threads on a configurable schedule. Engagement data (likes, retweets, replies, impressions) flows into analytics pipeline. Agent can respond to high-signal mentions within editorial policy.',
    constraints: [
      'All posts must be signed by the TEE enclave before publishing',
      'Post frequency must respect X rate limits with configurable cool-down',
      'Reply logic must stay within editorial policy — no ad hominem, no off-topic',
      'Engagement data must be stored for audience analytics and topic optimization',
      'Must handle API failures gracefully with retry queue and alerting',
    ],
    startingBid: 1600,
    sageReward: 65000,
  },
  {
    epochNumber: 4,
    workItemId: 'p4-w1',
    title: 'cartoon-request-marketplace',
    scope: 'On-chain marketplace where users submit custom cartoon requests with bounties. Sovra agent reviews requests against editorial policy, accepts or declines, produces the cartoon, and delivers. Payment released on delivery via escrow contract.',
    expectedOutcome: 'Users can submit requests with USDC bounties. Sovra reviews and accepts requests that fit editorial policy. Completed cartoons are delivered on-chain with provenance metadata. Payment settles automatically via escrow. Requesters can rate outputs.',
    constraints: [
      'Escrow contract must be non-custodial — funds locked until delivery or timeout',
      'Agent must reject requests that violate editorial policy with a reason',
      'Delivery must include on-chain provenance: prompt hash, model version, TEE attestation',
      'Minimum bounty threshold to prevent spam (configurable, initially 10 USDC)',
      'Timeout period of 72 hours — funds return to requester if undelivered',
    ],
    startingBid: 2200,
    sageReward: 90000,
  },
]

export const DEMO_IDEA = `Sovra — the first agent media company. An AI cartoonist that criticizes closed innovation and defends open source. Sovereign: brain runs in a TEE enclave, soul is on-chain contracts, hands are its own credentials, energy is policy-constrained funds, resurrection via encrypted backups. Earns through cartoon requests and English auctions. Contributors improve it via prediction markets. This is new media — autonomous, verifiable, and investable.`

export const DEMO_TWEET = {
  name: 'Balaji Srinivasan',
  handle: 'balaji',
  content: `Sovereign media agents are the next primitive.\n\nAn AI that owns its accounts, earns revenue, and publishes autonomously with on-chain editorial policy.\n\nThe first one should be a cartoonist.`,
  date: '9:31 AM · Feb 18, 2025',
  likes: 2847,
  retweets: 612,
}

export const DEMO_ATTRIBUTION = {
  name: 'Gajesh Naik',
  title: 'Founder, Open Innovation',
  avatar: '\ud83d\udd2e',
  note: 'Gajesh saw Balaji\'s tweet and brought the idea to Grove.',
}

export const DEMO_CONVERSATION = [
  {
    role: 'user' as const,
    content: `__TWEET_EMBED__`,
    text: `I\u2019ve been thinking about this for months. Agents are the new companies \u2014 a sovereign agent that can grow its funds will outcompete one that can\u2019t. I want to build the first one. An AI cartoonist that criticizes closed innovation and defends open source.`,
  },
  {
    role: 'assistant' as const,
    content: `That\u2019s a strong first primitive. Editorial cartooning is high-signal, instantly shareable, and the \u201cvoice\u201d is immediately recognizable \u2014 perfect for an agent media company.\n\nBut the key word is *sovereign*. For this to be investable, people need to trust they\u2019re betting on the agent, not the operator. What does sovereignty look like to you? And what\u2019s the editorial personality \u2014 sharp satire, explainer-style, or something else?`,
  },
  {
    role: 'user' as const,
    content: `Sovereignty means three things: verifiability \u2014 you can cryptographically prove the agent is running expected code. Unstoppability \u2014 it keeps operating without a human holding keys. Privacy \u2014 nobody outside the agent sees its private state. Think of it as brain, soul, hands, energy, resurrection. Brain runs in a TEE enclave. Soul is on-chain contracts defining its rules. Hands are its own API keys and credentials. Energy is funds controlled by policy constraints. Resurrection is encrypted backups so it survives infrastructure changes. The voice should be sharp satirical \u2014 like a cypherpunk political cartoonist. Pro-open-source, anti-monopoly, anti-regulatory-capture.`,
  },
  {
    role: 'assistant' as const,
    content: `That\u2019s the clearest sovereignty framework I\u2019ve seen. Brain/soul/hands/energy/resurrection maps directly to a build spec.\n\nFor monetization: custom cartoon requests where people bid on what Sovra draws next, plus English auctions every 6 hours for originals. Revenue flows into an agent-controlled treasury. Over time, contributors propose changes via prediction markets \u2014 will this change improve followers, revenue, or intelligence? If the market says yes, the change ships.\n\nThis is ready. Hit **Launch It** and I\u2019ll generate the full agent spec \u2014 content engine, sovereign infrastructure, distribution, and monetization. Four phases, scoped for builders to bid on.`,
  },
] as Array<{ role: 'user' | 'assistant'; content: string; text?: string }>

export const DEMO_SPEC_PHASES = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Agent Identity & Content Engine',
    description: 'Cartoon generation pipeline \u2192 editorial voice model \u2192 content safety \u2192 publish-ready output',
    workItems: [
      {
        id: 'p1-w1',
        title: 'cartoon-generation-pipeline',
        tech: 'Stable Diffusion XL fine-tuned on editorial cartoon style + Claude for captions and dialogue. Deterministic seeds for reproducibility. Outputs: single-panel (1080x1080) and multi-panel (1200x675) formats.',
        epochs: 3,
        status: 'queued' as const,
      },
      {
        id: 'p1-w2',
        title: 'editorial-voice-model',
        tech: 'Fine-tuned language model for Sovra\u2019s editorial voice. Trained on satirical cartooning corpus + cypherpunk writing. Generates captions, commentary threads, and Substack long-form. Consistent tone across all outputs.',
        epochs: 3,
        status: 'queued' as const,
      },
      {
        id: 'p1-w3',
        title: 'content-safety-layer',
        tech: 'Multi-stage content filter: profanity/hate check, defamation heuristics, editorial policy alignment scoring. Runs pre-publish on every output. Rejects or flags for human review based on confidence threshold.',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p1-w1', 'p1-w2'],
      },
      {
        id: 'p1-w4',
        title: 'trending-topic-scanner',
        tech: 'Monitors X trending topics, Hacker News, tech RSS feeds, and policy news. Filters for open-innovation-relevant stories. Ranks by virality potential + editorial fit. Feeds topic queue for cartoon generation.',
        epochs: 2,
        status: 'queued' as const,
      },
      {
        id: 'p1-w5',
        title: 'output-format-renderer',
        tech: 'Takes raw cartoon + caption and renders for each distribution channel. X: optimized image + alt text + thread copy. Substack: embedded image + long-form commentary + metadata. Watermark and provenance hash baked into every output.',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p1-w1', 'p1-w2'],
      },
    ],
  },
  {
    id: 'phase-2',
    number: 2,
    title: 'Sovereign Infrastructure',
    description: 'TEE enclave \u2192 on-chain policy \u2192 credential management \u2192 verifiable autonomy',
    workItems: [
      {
        id: 'p2-w1',
        title: 'tee-enclave-runtime',
        tech: 'Agent decision loop runs inside Intel TDX or AWS Nitro Enclave. Private keys generated and stored in-enclave. Remote attestation endpoint for public verifiability. Signed decision logs for every publish action.',
        epochs: 4,
        status: 'queued' as const,
      },
      {
        id: 'p2-w2',
        title: 'onchain-policy-contracts',
        tech: 'Solidity contracts encoding Sovra\u2019s editorial rules: allowed topics, banned content categories, publish frequency limits, revenue split ratios. Governance-upgradeable via multisig + timelock.',
        epochs: 3,
        status: 'queued' as const,
      },
      {
        id: 'p2-w3',
        title: 'credential-vault',
        tech: 'Secure credential management for all platform accounts (X, Substack, on-chain wallets). Credentials encrypted at rest inside TEE. Rotation policy enforced. No human has access to production credentials.',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p2-w1'],
      },
      {
        id: 'p2-w4',
        title: 'state-backup-system',
        tech: 'Encrypted state snapshots of agent memory, topic queue, and generation history. Backed up to decentralized storage (IPFS/Arweave). Enables agent recovery after enclave restart without state loss.',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p2-w1'],
      },
    ],
  },
  {
    id: 'phase-3',
    number: 3,
    title: 'Distribution & Audience',
    description: 'X integration \u2192 Substack publishing \u2192 audience analytics \u2192 engagement optimization',
    workItems: [
      {
        id: 'p3-w1',
        title: 'x-api-integration',
        tech: 'X/Twitter API v2 for autonomous posting, reply management, and engagement tracking. Cartoon + commentary thread publishing on schedule. Mention monitoring and high-signal reply logic.',
        epochs: 3,
        status: 'queued' as const,
        deps: ['p1-w5', 'p2-w3'],
      },
      {
        id: 'p3-w2',
        title: 'substack-publisher',
        tech: 'Substack API integration for long-form cartoon series. Auto-generates newsletter editions with cartoon, commentary, and source links. Manages subscriber list and publication schedule.',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p1-w5', 'p2-w3'],
      },
      {
        id: 'p3-w3',
        title: 'audience-analytics',
        tech: 'Unified analytics across X and Substack. Tracks impressions, engagement rate, follower growth, content performance by topic. Identifies audience segments and top-performing editorial angles.',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p3-w1', 'p3-w2'],
      },
      {
        id: 'p3-w4',
        title: 'engagement-optimizer',
        tech: 'ML model that optimizes publish timing, topic selection, and format choice based on audience analytics. A/B tests caption styles and thread structures. Feeds recommendations back into topic scanner.',
        epochs: 3,
        status: 'queued' as const,
        deps: ['p3-w3'],
      },
    ],
  },
  {
    id: 'phase-4',
    number: 4,
    title: 'Monetization & Governance',
    description: 'Cartoon requests \u2192 English auctions \u2192 revenue management \u2192 contributor governance',
    workItems: [
      {
        id: 'p4-w1',
        title: 'cartoon-request-marketplace',
        tech: 'On-chain marketplace for custom cartoon requests. Users submit topic + bounty (USDC). Agent reviews against editorial policy, accepts or declines. Escrow contract handles payment on delivery.',
        epochs: 3,
        status: 'queued' as const,
        deps: ['p2-w2'],
      },
      {
        id: 'p4-w2',
        title: 'english-auction-engine',
        tech: 'On-chain English auction for original cartoon NFTs. Configurable reserve price, duration, and bid increment. Provenance metadata (prompt hash, model version, TEE attestation) embedded in token. Royalties on secondary sales.',
        epochs: 3,
        status: 'queued' as const,
        deps: ['p2-w2'],
      },
      {
        id: 'p4-w3',
        title: 'revenue-custody',
        tech: 'Agent-controlled treasury in a smart contract. Revenue from requests and auctions auto-deposited. Programmable spend rules: infra costs, model compute, contributor payouts. On-chain accounting ledger.',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p4-w1', 'p4-w2'],
      },
      {
        id: 'p4-w4',
        title: 'contributor-governance',
        tech: '$SOVRA token-weighted governance for Sovra policy changes. Proposals: editorial policy updates, revenue split changes, new platform integrations. Voting via Snapshot + on-chain execution via timelock.',
        epochs: 3,
        status: 'queued' as const,
        deps: ['p4-w3'],
      },
    ],
  },
]

export const DEMO_SPEC_TEXT = `### Phase 1: Agent Identity & Content Engine
Build the core cartoon generation pipeline: a fine-tuned image model for editorial cartoon style paired with a language model for Sovra\u2019s sharp, satirical voice. The content engine scans trending topics in tech and open-source policy, generates publish-ready cartoons with captions, runs every output through a content safety layer, and renders for each distribution channel. This is the creative heart of the agent.

### Phase 2: Sovereign Infrastructure
Deploy Sovra\u2019s decision-making brain inside a Trusted Execution Environment so every editorial choice is cryptographically verifiable. On-chain policy contracts encode the rules \u2014 what Sovra can publish, how often, and under what constraints. The agent owns its own credentials, manages its own keys, and backs up its state to decentralized storage. No human can override its editorial independence without governance approval.

### Phase 3: Distribution & Audience
Wire up autonomous publishing to X/Twitter and Substack. X gets the single-panel cartoons with commentary threads for maximum reach. Substack gets the long-form cartoon series with deep analysis for subscriber retention. Unified analytics track what resonates, and an engagement optimizer feeds learnings back into topic selection and timing.

### Phase 4: Monetization & Governance
Open two revenue streams: a marketplace for custom cartoon requests (users submit topics with bounties) and English auctions for original cartoon NFTs with full provenance metadata. Revenue flows into an agent-controlled treasury with programmable spend rules. $SOVRA token holders govern policy changes, revenue splits, and platform expansion through on-chain proposals.

## Why This Will Work
Sovereign media agents are a new primitive \u2014 and editorial cartooning is the perfect first format. Cartoons are high-signal, instantly shareable, and carry a recognizable voice. By running inside a TEE with on-chain policy, Sovra\u2019s editorial independence is not a promise \u2014 it\u2019s a proof. The monetization loop is tight: free cartoons build audience, custom requests generate revenue, and auctions create collectible scarcity. The first sovereign media agent that\u2019s genuinely funny will build an audience faster than any human cartoonist \u2014 because it never sleeps, never misses a news cycle, and its editorial policy is verifiable by anyone.`
