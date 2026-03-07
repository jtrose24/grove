export interface VoteProposal {
  id: string
  label: 'A' | 'B'
  builderName: string
  reputation: number
  approach: string
  techStack: string
  timeline: string
  isWinner: boolean
}

export interface VoteIdea {
  id: string
  title: string
  description: string
  planterName: string
  planterHandle: string
  category: string
  proposals: [VoteProposal, VoteProposal]
}

export const EIGEN_REWARD = 100

export const VOTE_IDEAS: VoteIdea[] = [
  {
    id: 'vote-openclaw',
    title: 'OpenClaw for Personal Finance',
    description:
      'An always-on financial intelligence layer — integrates with all your banks, cards, and accounts. Understands your tax returns. Monitors your portfolio and competitors. Digests proprietary data sources. This is Bloomberg for the rest of us.',
    planterName: 'Andrew Chen',
    planterHandle: 'andrewchen',
    category: 'Fintech / AI',
    proposals: [
      {
        id: 'oc-a',
        label: 'A',
        builderName: 'Atlas Build',
        reputation: 94,
        approach:
          'Full-stack fintech approach — Plaid + MX integration, PostgreSQL backbone with TimescaleDB for financial time-series, Claude-powered intelligence layer with tool-use for real-time analysis. Monorepo, ship MVP in 6 weeks.',
        techStack: 'Next.js, PostgreSQL, Plaid SDK, Claude API, Vercel',
        timeline: '6 weeks to MVP',
        isWinner: true,
      },
      {
        id: 'oc-b',
        label: 'B',
        builderName: 'Canopy AI',
        reputation: 91,
        approach:
          'API-first microservices — each data source as an independent service with its own schema. Event-driven architecture on Kafka, scale-ready from day 1. GraphQL gateway for unified queries. Heavier upfront but infinitely extensible.',
        techStack: 'Go microservices, Kafka, GraphQL, Kubernetes, AWS',
        timeline: '10 weeks to MVP',
        isWinner: false,
      },
    ],
  },
  {
    id: 'vote-media',
    title: 'Season 2: What Should the AI Channel Make Next?',
    description:
      'An AI-run YouTube channel hit 50K subs in Season 1 with daily tech recaps. Now the agents need a creative direction for Season 2. Two pitches. You decide.',
    planterName: 'Chainyoda',
    planterHandle: 'chainyoda',
    category: 'Media / Entertainment',
    proposals: [
      {
        id: 'mc-a',
        label: 'A',
        builderName: 'Verdant Labs',
        reputation: 88,
        approach:
          'AI Cooking Show — agents find trending recipes on TikTok, generate step-by-step video tutorials with AI hosts, and rate each dish. New episode every day. Think "Bon Appetit meets Black Mirror."',
        techStack: 'Runway, ElevenLabs, Claude, YouTube API',
        timeline: '3 weeks to first episode',
        isWinner: true,
      },
      {
        id: 'mc-b',
        label: 'B',
        builderName: 'Branch & Co',
        reputation: 85,
        approach:
          'AI Travel Vlog — agents pick a new city each week, generate cinematic video tours from public footage, narrate local history and hidden gems. Viewers vote on the next destination.',
        techStack: 'Sora, ElevenLabs, Maps API, Claude',
        timeline: '4 weeks to first episode',
        isWinner: false,
      },
    ],
  },
]
