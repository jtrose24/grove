export const SAGE_TOKEN = {
  name: '$SAGE',
  fullName: 'Sage',
  tagline: 'The native token of OpenClaw',
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
    workItemId: 'p1-w3',
    title: 'unified-financial-schema',
    scope: 'Design and deploy the normalized data model — accounts, transactions, positions, holdings, tax_lots. PostgreSQL + TimescaleDB. Partitioned by user_id. JSONB for institution metadata.',
    expectedOutcome: 'Deployed schema with migrations, seed data, and passing integration tests. All downstream services can read/write via typed ORM layer.',
    constraints: [
      'Must support multi-institution dedup without data loss',
      'No vendor lock-in — schema must be portable across Postgres-compatible DBs',
      'All PII fields encrypted at rest (AES-256)',
      'Migration must be reversible (up/down)',
      'Response time < 50ms for single-user queries at 10k txn scale',
    ],
    startingBid: 1200,
    sageReward: 50000,
  },
  {
    epochNumber: 2,
    workItemId: 'p1-w1',
    title: 'plaid-link-integration',
    scope: 'Plaid Link SDK v2 client + server-side sync endpoints. /transactions/sync, /investments/holdings, /liabilities/get. OAuth2 flows for Chase/Amex. Webhook registration.',
    expectedOutcome: 'End-to-end Plaid connection flow working in sandbox. User can link a bank, see transactions populate within 30s. Webhooks triggering on transaction updates.',
    constraints: [
      'Must handle Plaid rate limits gracefully (exponential backoff)',
      'OAuth tokens stored encrypted, never logged',
      'Sandbox + production environment parity',
      'Error states surfaced to user with actionable copy',
      'No polling — webhook-driven only for real-time updates',
    ],
    startingBid: 1800,
    sageReward: 75000,
  },
  {
    epochNumber: 3,
    workItemId: 'p1-w4',
    title: 'webhook-event-processor',
    scope: 'Plaid/MX webhooks → Redis Streams → async workers. Handle TRANSACTIONS_REMOVED, DEFAULT_UPDATE, HOLDINGS_UPDATE event types. Idempotent processing.',
    expectedOutcome: 'Webhook endpoint accepting + validating Plaid signatures. Events queued in Redis Streams. Workers consuming and updating unified schema. Zero message loss under load.',
    constraints: [
      'Idempotent — replaying the same webhook must be safe',
      'Must validate Plaid webhook signatures (reject unsigned)',
      'Processing latency < 2s from webhook receipt to DB write',
      'Dead letter queue for failed events with alerting',
      'Horizontally scalable — no single-worker bottleneck',
    ],
    startingBid: 1400,
    sageReward: 60000,
  },
  {
    epochNumber: 4,
    workItemId: 'p2-w1',
    title: 'financial-llm-pipeline',
    scope: 'Claude streaming pipeline with financial context window. User summary + 90d transactions + portfolio snapshot injected per request. Tool-use for live calculations.',
    expectedOutcome: 'Streaming chat interface answering financial questions with real user data context. Accurate calculations via tool-use. Rate-limited per user tier.',
    constraints: [
      'No financial data sent to any model without user consent flag',
      'Tool-use must sandbox calculations — no arbitrary code execution',
      'Streaming responses < 500ms to first token',
      'Context window must not exceed model limits — summarize if needed',
      'All model outputs must carry disclaimer: not financial advice',
    ],
    startingBid: 2200,
    sageReward: 100000,
  },
]

export const DEMO_IDEA = `Openclaw for personal finance — integrates with all your banks, cards, and accounts. Understands your tax returns and filings. Monitors your portfolio and competitors. Digests proprietary data sources like credit card panels and app rankings. Reads company news and social feeds. This is an always-on financial intelligence layer for anyone serious about building wealth or running a company.`

export const DEMO_TWEET = {
  name: 'Andrew Chen',
  handle: 'andrewchen',
  content: `Who's working on this idea:\n\nOpenclaw for personal finance\n\n- integrates w all your banks/cards/etc\n- understands tax returns and filings\n- monitors portfolio and competitors\n- digests proprietary data sources (credit card panels, app rankings, and etc)\n- reads company news and X\n\nEtc etc`,
  date: '11:42 AM · Feb 20, 2025',
  likes: 842,
  retweets: 127,
}

export const DEMO_ATTRIBUTION = {
  name: 'Andrew Chen',
  title: 'General Partner, a16z',
  avatar: '🌱',
  note: 'Instead of tweeting this idea — he planted it in Grove.',
}

export const DEMO_CONVERSATION = [
  {
    role: 'user' as const,
    content: `__TWEET_EMBED__`,
    text: `I had this idea last night and I want to try building it out —`,
  },
  {
    role: 'assistant' as const,
    content: `This is a sharp wedge. The real unlock here isn't just aggregation — it's *interpretation*. Anyone can pull bank data. Very few can tell you why your net worth moved, what it means for your taxes, and what your smartest competitors are doing differently.\n\nWho's the primary user you're anchoring on first — the serious individual building personal wealth, or the operator tracking their company's financial position versus the market?`,
  },
  {
    role: 'user' as const,
    content: `Start with the serious individual. The person who reads every 10-K but doesn't have a Bloomberg terminal. Eventually the product becomes infrastructure for both.`,
  },
  {
    role: 'assistant' as const,
    content: `"Bloomberg for the rest of us" — that's a real gap, and the 10-K reader is an excellent first customer. High intent, high willingness to pay, and they'll stress-test everything.\n\nYou've got something here. Ready to grow it? I can spec this out into a full build plan and open it up to builders right now. 🌱`,
  },
] as Array<{ role: 'user' | 'assistant'; content: string; text?: string }>

export const DEMO_SPEC_PHASES = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Financial Data Unification Layer',
    description: 'Plaid/MX aggregation → normalized schema → real-time sync pipeline',
    workItems: [
      {
        id: 'p1-w1',
        title: 'plaid-link-integration',
        tech: 'Plaid Link SDK v2 + server-side /transactions/sync, /investments/holdings, /liabilities/get. OAuth2 for Chase/Amex. Webhook registration for real-time updates.',
        epochs: 3,
        status: 'queued' as const,
      },
      {
        id: 'p1-w2',
        title: 'mx-fallback-connector',
        tech: 'MX Platform API for institutions not on Plaid (~2,400 additional FIs). Credential-based + OAuth flows. Maps to shared schema via adapter pattern.',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p1-w3'],
      },
      {
        id: 'p1-w3',
        title: 'unified-financial-schema',
        tech: 'PostgreSQL + TimescaleDB. Normalized tables: accounts, transactions, positions, holdings, tax_lots. JSONB for institution-specific metadata. Partitioned by user_id.',
        epochs: 2,
        status: 'queued' as const,
      },
      {
        id: 'p1-w4',
        title: 'webhook-event-processor',
        tech: 'Plaid/MX webhooks → Redis Streams → async workers. Handles TRANSACTIONS_REMOVED, DEFAULT_UPDATE, HOLDINGS_UPDATE. Idempotent processing with dedup keys.',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p1-w1', 'p1-w3'],
      },
      {
        id: 'p1-w5',
        title: 'reconciliation-engine',
        tech: 'Cross-institution dedup (merchant normalization via embeddings). FX conversion (ECB rates, daily). Account linking heuristics. Runs as daily batch + on-demand.',
        epochs: 3,
        status: 'queued' as const,
        deps: ['p1-w3', 'p1-w4'],
      },
    ],
  },
  {
    id: 'phase-2',
    number: 2,
    title: 'Intelligence & Interpretation Engine',
    description: 'LLM pipeline → tax parsing → portfolio attribution → NL query interface',
    workItems: [
      {
        id: 'p2-w1',
        title: 'financial-llm-pipeline',
        tech: 'Claude 3.5 Sonnet streaming via Anthropic SDK. Context window: user financial summary + last 90d transactions + portfolio snapshot. Tool-use for calculations. Rate-limited per user tier.',
        epochs: 3,
        status: 'queued' as const,
      },
      {
        id: 'p2-w2',
        title: 'tax-document-parser',
        tech: 'PDF/image → structured data. 1040, Schedule D, K-1, W-2, 1099-DIV/INT/B. OCR via Textract, extraction via fine-tuned model. Outputs to tax_filings table.',
        epochs: 4,
        status: 'queued' as const,
      },
      {
        id: 'p2-w3',
        title: 'portfolio-attribution',
        tech: 'Brinson-style factor attribution (sector, geo, asset class). Daily return decomposition. Benchmarks: SPY, AGG, user-defined. Time-weighted vs money-weighted returns.',
        epochs: 3,
        status: 'queued' as const,
        deps: ['p1-w3'],
      },
      {
        id: 'p2-w4',
        title: 'anomaly-detection',
        tech: 'Z-score + isolation forest on spending/income patterns. Detects: unusual charges, income drops, fee spikes, dividend changes. Feeds insight-generator.',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p1-w5'],
      },
      {
        id: 'p2-w5',
        title: 'nl-query-engine',
        tech: 'Natural language → SQL via text-to-SQL (Claude tool-use). Sandboxed read-only Postgres connection. Pre-built query templates for common questions. Results → NL explanation.',
        epochs: 3,
        status: 'queued' as const,
        deps: ['p2-w1', 'p1-w3'],
      },
    ],
  },
  {
    id: 'phase-3',
    number: 3,
    title: 'Proprietary Signal Ingestion',
    description: 'SEC EDGAR + social feeds + alt-data connectors → signal scoring pipeline',
    workItems: [
      {
        id: 'p3-w1',
        title: 'sec-edgar-crawler',
        tech: 'EDGAR XBRL/full-text-search API. Parse 10-K, 10-Q, 8-K, 13-F, DEF 14A. Extract: revenue, margins, insider transactions, institutional holdings. Cron: 15min for 8-K, daily for rest.',
        epochs: 3,
        status: 'queued' as const,
      },
      {
        id: 'p3-w2',
        title: 'social-sentiment-listener',
        tech: 'X/Twitter API v2 filtered stream + Reddit (pushshift). FinBERT sentiment scoring. Entity extraction (tickers, companies). Aggregate sentiment timeseries per ticker.',
        epochs: 3,
        status: 'queued' as const,
      },
      {
        id: 'p3-w3',
        title: 'alt-data-connectors',
        tech: 'Adapters for: credit card panels (Earnest/Second Measure), app rankings (Sensor Tower API), web traffic (SimilarWeb). Normalized to signal_observations table.',
        epochs: 4,
        status: 'queued' as const,
      },
      {
        id: 'p3-w4',
        title: 'signal-fusion-scorer',
        tech: 'Multi-signal weighted scoring. Bayesian confidence intervals. Tracks signal decay curves. Backtested against 3yr price data. Outputs: signal_id, direction, confidence, ttl.',
        epochs: 3,
        status: 'queued' as const,
        deps: ['p3-w1', 'p3-w2', 'p3-w3'],
      },
      {
        id: 'p3-w5',
        title: 'alert-engine',
        tech: 'User-defined thresholds + ML anomaly triggers. Channels: in-app, push (FCM/APNs), email (SendGrid). Dedup + rate limiting. Priority: P0 (immediate) → P3 (weekly digest).',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p3-w4'],
      },
    ],
  },
  {
    id: 'phase-4',
    number: 4,
    title: 'Personalized Growth Advisor',
    description: 'Weekly briefings → tax optimization → goal tracking → notification routing',
    workItems: [
      {
        id: 'p4-w1',
        title: 'weekly-briefing-generator',
        tech: 'Cron (Sunday 6am UTC). Aggregates: portfolio delta, top movers, tax events, signal alerts, competitor moves. Claude summary → HTML email + in-app card. A/B test subject lines.',
        epochs: 3,
        status: 'queued' as const,
        deps: ['p2-w1', 'p3-w4'],
      },
      {
        id: 'p4-w2',
        title: 'tax-loss-harvester',
        tech: 'Daily scan for harvesting candidates (>$100 loss, no wash-sale risk). Suggests replacement securities (correlated ETFs). Estimates tax savings. Integrates with brokerage APIs for 1-click execution.',
        epochs: 4,
        status: 'queued' as const,
        deps: ['p2-w2', 'p2-w3'],
      },
      {
        id: 'p4-w3',
        title: 'competitor-tracker',
        tech: 'User defines peer set (public tickers or private companies via Crunchbase). Tracks: fundraising, hiring velocity (LinkedIn API), product launches, App Store rank delta. Weekly comparison report.',
        epochs: 3,
        status: 'queued' as const,
        deps: ['p3-w1', 'p3-w3'],
      },
      {
        id: 'p4-w4',
        title: 'goal-engine',
        tech: 'FIRE calculator, milestone tracking (house, education, retirement). Monte Carlo simulations (10k runs, variable return assumptions). Scenario modeling: "what if I increase savings by $500/mo".',
        epochs: 3,
        status: 'queued' as const,
      },
      {
        id: 'p4-w5',
        title: 'notification-router',
        tech: 'Priority-based delivery pipeline. P0: push immediate. P1: daily digest. P2: weekly briefing. P3: monthly review. User preference matrix. Unsubscribe granularity per signal type.',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p3-w5'],
      },
    ],
  },
]

export const DEMO_SPEC_TEXT = `### Phase 1: Financial Data Unification Layer
Connect all major bank, brokerage, and card APIs via Plaid, MX, and direct integrations. Build a unified financial data model that normalizes across institutions, handles real-time webhooks, and maintains a clean ledger of every transaction, position, and filing.

### Phase 2: Intelligence & Interpretation Engine
Deploy an LLM-powered analysis layer that reads your entire financial picture — not just numbers, but meaning. Understands your tax returns, flags optimization opportunities, surfaces "why did my net worth drop 4% this month" answers in plain English.

### Phase 3: Proprietary Signal Ingestion
Ingest credit card panels, app store rankings, company news, SEC filings, and X/social feeds. Build a signal library that gives serious users the kind of edge previously reserved for hedge funds and Bloomberg terminal subscribers.

### Phase 4: Personalized Growth Advisor
Weekly briefings, tax optimization suggestions, and competitor move alerts delivered as a concierge experience. This is the moat — context that compounds over time as the system learns your goals, risk tolerance, and competitive landscape.

## Why This Will Work
The serious individual investor has been chronically underserved by consumer fintech. Mint told you what you spent. This tells you what to do next. The data unification layer becomes infrastructure; the intelligence layer becomes the product; the proprietary signals become the moat. First 1,000 users will be power users who evangelize hard.`
