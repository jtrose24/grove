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
  { id: 'pl-2', name: 'Gajesh Naik', handle: 'gajesh', avatar: '🔮' },
  { id: 'pl-3', name: 'Chainyoda', handle: 'chainyoda', avatar: '🌐' },
  { id: 'pl-4', name: 'Gautham', handle: 'gauthamzz', avatar: '🛡' },
  { id: 'pl-5', name: 'Andrew Miller', handle: 'socaborchain', avatar: '🔬' },
  { id: 'pl-6', name: 'Xyn', handle: 'xyn_ai', avatar: '⚡' },
  { id: 'pl-7', name: 'Nader Dabit', handle: 'dabit3', avatar: '📊' },
  { id: 'pl-8', name: 'Ali Yahya', handle: 'alive_eth', avatar: '🧠' },
  { id: 'pl-9', name: 'Hasu', handle: 'hasufl', avatar: '🏛' },
  { id: 'pl-10', name: 'Tarun Chitra', handle: 'tarunchitra', avatar: '📐' },
  { id: 'pl-11', name: 'Robert Leshner', handle: 'rleshner', avatar: '🏦' },
  { id: 'pl-12', name: 'Stani Kulechov', handle: 'staborchain', avatar: '👻' },
  { id: 'pl-ac', name: 'Andrew Chen', handle: 'andrewchen', avatar: '🧠' },
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

const s1 = makeSpec('Sovra — AI Satirical Cartoonist', [
  { title: 'Persona & Voice Engine', desc: 'Design Sovra\'s satirical voice — sharp, irreverent, pro-open-source. Build a prompt architecture that produces consistent editorial cartooning style with biting wit.' },
  { title: 'Visual Generation Pipeline', desc: 'Fine-tuned image model for editorial cartoon style. Consistent character designs for recurring figures (big tech CEOs, open-source mascots). Output formats for Twitter, newsletter, and print.' },
  { title: 'Publishing & Distribution', desc: 'Automated publishing to Twitter/X, Farcaster, and a standalone site. Scheduling engine with real-time hooks into tech news feeds for timely satire.' },
  { title: 'Monetization & Sovereignty', desc: 'NFT drops of top cartoons. Paid newsletter tier. Merchandise pipeline. On-chain revenue split with the Grove treasury.' },
])

const s2 = makeSpec('Lullabi — Sovereign Children\'s Storyteller', [
  { title: 'Safety & Content Framework', desc: 'Ironclad content guardrails — zero violence, no ads, no data collection from minors. Multi-layer safety review with human-in-the-loop escalation for edge cases.' },
  { title: 'Story Generation Engine', desc: 'Age-appropriate story generation (2-8 years). Personalization by child\'s name and interests. Illustrated output with gentle, consistent art style. Audio narration option.' },
  { title: 'Parent Dashboard & Controls', desc: 'Parental controls for theme preferences, session limits, and content review. Downloadable story archive. No algorithmic recommendations — parents choose.' },
  { title: 'Distribution & Trust', desc: 'Web app and podcast feed. COPPA-compliant architecture. Subscription model with free tier. Trust transparency page showing safety audit results.' },
])

const s3 = makeSpec('Meridian — Geopolitical Commentary Agent', [
  { title: 'Source Ingestion & Verification', desc: 'Real-time feed from Reuters, AP, Al Jazeera, SCMP, and 30+ global sources. Cross-reference engine to detect conflicting narratives and flag single-source claims.' },
  { title: 'Analysis & Voice Engine', desc: 'Balanced, multi-perspective commentary style. Avoids partisanship by presenting 2-3 geopolitical lenses per event. Footnoted sourcing on every claim.' },
  { title: 'Publishing Pipeline', desc: 'Daily briefings on Twitter/X and Farcaster. Weekly deep-dive threads. Email newsletter with regional editions (Asia, Europe, Americas, Africa/Middle East).' },
  { title: 'Audience & Monetization', desc: 'Free daily briefings, premium weekly analysis. Institutional tier for think tanks and newsrooms. Transparent methodology page.' },
])

const s4 = makeSpec('Whistle — Sports Highlights Agent', [
  { title: 'Event Detection Pipeline', desc: 'Real-time game feed ingestion for NBA, NFL, Premier League, MLB. Goal/score/highlight detection within 60 seconds of occurrence.' },
  { title: 'Content Generation Engine', desc: 'Hype-mode commentary with stat overlays. Clip-style text + image posts for social media. Customizable per-sport voice — breathless for basketball, dry wit for cricket.' },
  { title: 'Multi-Platform Distribution', desc: 'Instant posting to Twitter/X, TikTok-style short posts, and Farcaster. Fan interaction via polls and prediction games.' },
  { title: 'Fan Engagement & Revenue', desc: 'Prediction markets integration for game outcomes. Sponsored highlight packages. Affiliate links for streaming platforms.' },
])

const s5 = makeSpec('Resonance — Music Review Agent', [
  { title: 'Listening & Analysis Engine', desc: 'Spotify and Bandcamp new release monitoring. Audio feature extraction for genre classification, mood mapping, and sonic palette analysis.' },
  { title: 'Review Generation & Voice', desc: 'Opinionated, warm, and deeply knowledgeable voice — like a record store clerk who\'s heard everything. Reviews range from 200-word quick takes to 1000-word deep dives.' },
  { title: 'Publishing & Discovery', desc: 'Daily picks on Twitter/X and Farcaster. Weekly playlist curation. Searchable review archive on a standalone site with genre and mood filters.' },
  { title: 'Community & Monetization', desc: 'Listener-submitted review requests. Premium tier with early access and exclusive playlists. Affiliate revenue from streaming links.' },
])

const s6 = makeSpec('Shitpost Oracle — Meme Commentary Agent', [
  { title: 'Meme Trend Detection', desc: 'Real-time scanning of Twitter/X, Reddit, TikTok, and 4chan for emerging meme formats. Trend velocity scoring to catch memes before they peak.' },
  { title: 'Commentary & Remix Engine', desc: 'Deadpan anthropological voice that explains memes like a nature documentary narrator. Generates original remixes of trending formats with crypto/tech commentary baked in.' },
  { title: 'Distribution & Virality', desc: 'Post to Twitter/X and Farcaster with optimal timing. Engagement-optimized formatting. Quote-tweet and reply-guy mode for real-time meme events.' },
  { title: 'Monetization & Culture', desc: 'Meme NFT collaborations. Brand partnership for meme marketing. Weekly "State of the Meme" newsletter with paying subscribers.' },
])

const s7 = makeSpec('Lamppost — Local News Agent', [
  { title: 'Local Source Aggregation', desc: 'Ingest city council minutes, police blotters, local newspaper feeds, community board posts, and permit filings. Configurable per-city deployment.' },
  { title: 'Story Generation & Tone', desc: 'Friendly, civic-minded voice. Summarize dry municipal documents into readable stories. Flag high-impact items (zoning changes, school board decisions, budget votes).' },
  { title: 'Community Distribution', desc: 'Daily digest via email, SMS, and Nextdoor-style posting. Neighborhood-level targeting. Event calendar integration.' },
  { title: 'Sustainability Model', desc: 'Community-supported subscription model. Local business sponsorship slots. Grant funding pipeline for civic tech orgs.' },
])

// ─── Seed Ideas Array ────────────────────────────────────────────────────────

export const SEED_IDEAS: SeedIdea[] = [
  // ── 3 Settled (10-14 days ago) ─────────────────────────────────
  {
    id: 'idea-01',
    title: 'Sovra',
    description: 'The first agent media company. An AI cartoonist that roasts big tech monopolies and champions open innovation — sovereign, verifiable, and investable.',
    category: 'media agent',
    phase: 'settled',
    planterId: 'pl-2',
    plantedAt: daysAgo(13),
    conversation: [
      { role: 'user', content: 'Agents are the new companies. I want to build the first agent media company — an AI cartoonist that criticizes closed innovation and defends open source. Sovereign and investable from day one.' },
      { role: 'assistant', content: 'Strong thesis. For this to be truly investable, people need to trust the agent, not the operator. What does sovereignty look like — and what\'s the editorial voice?' },
      { role: 'user', content: 'Sovereignty means verifiability, unstoppability, and privacy. Brain in a TEE, soul on-chain, hands holding its own credentials, funds under policy constraints. The voice is sharp satirical — cypherpunk political cartoonist. Revenue from cartoon requests and English auctions.' },
      { role: 'assistant', content: 'That\'s the clearest sovereignty framework I\'ve seen. Brain/soul/hands/energy maps directly to a build spec. Let me generate the full agent plan — content engine, sovereign infrastructure, distribution, and monetization.' },
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
    metrics: { users: 2847, revenue: 18400, conversion: 9.2, engagement: 84, traffic: 5100, completion: 100 },
    builderName: 'Atlas Build',
    progress: 100,
  },
  {
    id: 'idea-02',
    title: 'Lullabi',
    description: 'A sovereign children\'s storyteller that creates bedtime stories with zero violence, no ads, and ironclad content safety.',
    category: 'education agent',
    phase: 'settled',
    planterId: 'pl-8',
    plantedAt: daysAgo(11),
    conversation: [
      { role: 'user', content: 'Kids\' content online is a minefield of ads, algorithms, and dubious quality. I want an AI storyteller that parents can actually trust — zero data collection, no ads, age-appropriate stories with beautiful illustrations.' },
      { role: 'assistant', content: 'Trust is the entire product here. You need COPPA compliance baked into the architecture, not bolted on. The content safety layer has to be multi-tiered with human review for edge cases. What age range are you targeting, and should stories be personalized?' },
      { role: 'user', content: 'Ages 2-8. Personalized with the child\'s name and interests, but zero data stored server-side — everything lives on the parent\'s device.' },
      { role: 'assistant', content: 'On-device personalization is a powerful trust signal. Privacy as a feature, not a trade-off. Let me build this out.' },
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
    metrics: { users: 1834, revenue: 14700, conversion: 11.4, engagement: 88, traffic: 4200, completion: 100 },
    builderName: 'Canopy AI',
    progress: 100,
  },
  {
    id: 'idea-03',
    title: 'Meridian',
    description: 'A geopolitical commentary agent that presents every conflict from three perspectives — because the truth is never one-sided.',
    category: 'news agent',
    phase: 'settled',
    planterId: 'pl-4',
    plantedAt: daysAgo(10),
    conversation: [
      { role: 'user', content: 'Geopolitical coverage is hopelessly biased depending on which outlet you read. I want an agent that ingests 30+ global sources and presents every story from multiple geopolitical lenses — Western, Global South, and regional perspectives.' },
      { role: 'assistant', content: 'Multi-perspective framing is the killer feature. The hard part is not just summarizing sources but genuinely presenting the logic of each worldview without strawmanning. Every claim needs footnoted sourcing. What\'s the publishing cadence?' },
      { role: 'user', content: 'Daily briefings on social media, weekly deep-dive threads, and a premium email newsletter with regional editions.' },
      { role: 'assistant', content: 'That tiered approach lets the free content build audience while the newsletter captures revenue. Let me spec this.' },
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
    metrics: { users: 923, revenue: 9800, conversion: 7.1, engagement: 76, traffic: 2600, completion: 100 },
    builderName: 'Verdant Labs',
    progress: 100,
  },

  // ── 3 Execution (5-10 days ago) ────────────────────────────────
  {
    id: 'idea-04',
    title: 'Whistle',
    description: 'A sports highlights agent that drops real-time hype recaps within 60 seconds of every big play — faster than your group chat.',
    category: 'entertainment agent',
    phase: 'execution',
    planterId: 'pl-10',
    plantedAt: daysAgo(9),
    conversation: [
      { role: 'user', content: 'Sports fans live for highlights but ESPN is slow and bloated. I want an agent that detects big plays in real-time and posts hype recaps with stats and context within a minute. NBA, NFL, Premier League, everything.' },
      { role: 'assistant', content: 'Speed is the entire moat — if you can beat traditional media by even 30 seconds, fans will follow you instead. The voice needs to be sport-specific: breathless energy for basketball, dry wit for cricket, dramatic flair for football. How are you handling the visual side?' },
      { role: 'user', content: 'Text + stat graphics for v1. Eventually clip integration when licensing allows. Fan prediction polls to drive engagement between games.' },
      { role: 'assistant', content: 'Smart to start text-first and add media later. The prediction polls are genius for off-peak engagement. Let me build the spec.' },
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
    metrics: { users: 512, revenue: 4800, conversion: 5.6, engagement: 62, traffic: 1290, completion: 68 },
    builderName: 'Atlas Build',
    progress: 68,
  },
  {
    id: 'idea-05',
    title: 'Resonance',
    description: 'A music review agent with the taste of your favorite record store clerk — catching hidden gems before they blow up.',
    category: 'content agent',
    phase: 'execution',
    planterId: 'pl-7',
    plantedAt: daysAgo(8),
    conversation: [
      { role: 'user', content: 'Music discovery is broken. Spotify\'s algorithm feeds you the same vibes forever. I want an opinionated AI music critic that reviews new releases daily — indie, electronic, hip-hop, everything. Think Pitchfork but faster and less pretentious.' },
      { role: 'assistant', content: 'The key is having a genuine voice — not a summary engine but an opinionated critic that takes stances and builds a reputation for good taste. Quick takes for daily drops, deep dives for albums that deserve it. What platforms, and how do you handle the audio analysis?' },
      { role: 'user', content: 'Spotify and Bandcamp feeds for new releases, audio feature extraction for genre and mood analysis. Publish on Twitter/X with a searchable review archive on a standalone site.' },
      { role: 'assistant', content: 'Opinionated curation is the product. The archive becomes a discovery engine over time. Let me spec it.' },
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
    metrics: { users: 289, revenue: 3200, conversion: 4.8, engagement: 55, traffic: 780, completion: 42 },
    builderName: 'Verdant Labs',
    progress: 42,
  },
  {
    id: 'idea-06',
    title: 'Shitpost Oracle',
    description: 'A meme commentary agent that explains internet culture like a nature documentary narrator — deadpan, scholarly, and absolutely unhinged.',
    category: 'commentary agent',
    phase: 'execution',
    planterId: 'pl-6',
    plantedAt: daysAgo(6),
    conversation: [
      { role: 'user', content: 'Memes move faster than anyone can track. I want an agent that monitors meme trends across Twitter, Reddit, and TikTok and delivers commentary in a deadpan anthropological voice — like David Attenborough narrating the internet.' },
      { role: 'assistant', content: 'The nature documentary voice is perfect — it creates humor through contrast. The agent needs trend velocity scoring to catch memes on the way up, not after they\'ve peaked. Are you just commenting or also generating original remixes?' },
      { role: 'user', content: 'Both. Commentary on trending memes plus original remixes that layer in crypto and tech commentary. Also a weekly "State of the Meme" newsletter.' },
      { role: 'assistant', content: 'Commentary plus remix is a content machine. The newsletter becomes a cultural artifact. Let me formalize this.' },
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
    metrics: { users: 145, revenue: 1600, conversion: 4.1, engagement: 48, traffic: 440, completion: 25 },
    builderName: 'Canopy AI',
    progress: 25,
  },

  // ── 4 Bidding (3-6 days ago) ───────────────────────────────────
  {
    id: 'idea-07',
    title: 'Lamppost',
    description: 'A local news agent that turns boring city council minutes and permit filings into stories your neighborhood actually cares about.',
    category: 'news agent',
    phase: 'bidding',
    planterId: 'pl-9',
    plantedAt: daysAgo(5),
    conversation: [
      { role: 'user', content: 'Local journalism is dying. Meanwhile, city council minutes, police blotters, and permit filings are public record but unreadable. I want an agent that turns this raw municipal data into digestible neighborhood news.' },
      { role: 'assistant', content: 'This is genuinely important civic infrastructure. The tone needs to be friendly and civic-minded, not sensational. The agent should flag high-impact items — zoning changes, school board decisions, budget votes — and explain why they matter. How granular is the targeting?' },
      { role: 'user', content: 'Neighborhood-level. Daily digests via email and SMS. Each city gets its own agent deployment with local source configuration.' },
      { role: 'assistant', content: 'Per-city deployment is smart — each community is different. Community-supported subscription keeps incentives aligned with residents, not advertisers. Let me spec this out.' },
    ],
    spec: s7.text,
    specPhases: s7.parsed,
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
    id: 'idea-08',
    title: 'Celluloid',
    description: 'An indie film review agent that champions small cinema with the passion of a Letterboxd power user and the depth of Cahiers du Cinema.',
    category: 'content agent',
    phase: 'bidding',
    planterId: 'pl-11',
    plantedAt: daysAgo(4),
    conversation: [
      { role: 'user', content: 'Indie film coverage is dominated by the same festivals and A24 hype cycles. I want an agent that digs deeper — regional festivals, international releases, micro-budget gems. Reviews that actually help you decide what to watch on a Tuesday night.' },
      { role: 'assistant', content: 'The value is curation depth. Covering what nobody else covers creates a loyal niche audience. The voice should be passionate and accessible, not gatekeepy — invite people into cinema, don\'t lecture them. What\'s the review format and cadence?' },
      { role: 'user', content: 'Three short reviews daily on social, one long-form essay weekly. A searchable archive with mood-based and theme-based filters, not just genre.' },
      { role: 'assistant', content: 'Mood-based discovery is a killer feature — "I want something melancholy and beautiful" beats genre categories every time. Let me build the spec.' },
    ],
    spec: '### Phase 1: Film Database & Ingestion\nIngest from TMDB, Letterboxd, festival submission APIs, and independent distributor feeds. Build a comprehensive indie film database with metadata, availability, and festival history.\n\n### Phase 2: Review Generation & Voice\nDevelop a warm, cinephile voice that balances accessibility with depth. Short-form reviews (200 words) and long-form essays (1500 words). Mood and theme tagging for every review.\n\n### Phase 3: Publishing & Discovery\nDaily posts on Twitter/X and Farcaster. Standalone review archive with mood, theme, and language filters. Weekly newsletter with curated watchlists.\n\n### Phase 4: Community & Revenue\nViewer-submitted review requests. Premium tier for early access and exclusive essays. Affiliate links to streaming/rental platforms.',
    specPhases: [
      { id: 'phase-1', number: 1, title: 'Film Database & Ingestion', description: 'Comprehensive indie film database from TMDB, Letterboxd, festival APIs, and distributor feeds.' },
      { id: 'phase-2', number: 2, title: 'Review Generation & Voice', description: 'Warm cinephile voice with short-form reviews and long-form essays. Mood and theme tagging.' },
      { id: 'phase-3', number: 3, title: 'Publishing & Discovery', description: 'Daily social posts, standalone archive with mood/theme filters, weekly newsletter.' },
      { id: 'phase-4', number: 4, title: 'Community & Revenue', description: 'Viewer requests, premium tier, affiliate streaming links.' },
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
    id: 'idea-09',
    title: 'Sizzle',
    description: 'A cooking content agent that pairs recipes with stories — what your grandmother would post if she had a food blog and zero patience for SEO.',
    category: 'content agent',
    phase: 'bidding',
    planterId: 'pl-2',
    plantedAt: daysAgo(4),
    conversation: [
      { role: 'user', content: 'Every recipe site is drowning in SEO garbage. I want an agent that posts clean, beautiful recipes paired with short cultural stories about the dish — where it comes from, why it matters, how to make it your own. No life stories, no ads, no popups.' },
      { role: 'assistant', content: 'Anti-SEO is the brand. The cultural storytelling angle makes each recipe feel like a gift, not content. The agent needs a warm, knowledgeable voice — like a friend who\'s traveled everywhere and actually learned to cook in each place. What cuisines and what platform?' },
      { role: 'user', content: 'Global — one cuisine per week. Twitter threads for quick recipes, a standalone site for the full experience with photography-style food images. Seasonal and ingredient-driven, not trend-driven.' },
      { role: 'assistant', content: 'Ingredient-driven and seasonal is timeless content. Each week becomes a mini cultural journey. Let me spec this out.' },
    ],
    spec: '### Phase 1: Recipe Knowledge Base\nCurated global recipe database organized by cuisine, season, and core ingredient. Cultural context and origin stories for each dish. Dietary tag system.\n\n### Phase 2: Content Generation Engine\nWarm, storytelling voice. Recipe formatting with clean layout — no SEO padding. AI food photography generation with consistent aesthetic. Seasonal content calendar.\n\n### Phase 3: Multi-Platform Publishing\nTwitter/X threads for quick recipes. Standalone site with clean, ad-free design. Weekly newsletter organized by cuisine region.\n\n### Phase 4: Community & Monetization\nUser-submitted recipe requests. Printed recipe card shop. Premium tier with meal planning features. Cookbook compilation pipeline.',
    specPhases: [
      { id: 'phase-1', number: 1, title: 'Recipe Knowledge Base', description: 'Global recipe database with cultural context, seasonal organization, and dietary tags.' },
      { id: 'phase-2', number: 2, title: 'Content Generation Engine', description: 'Storytelling voice, clean formatting, AI food photography, seasonal calendar.' },
      { id: 'phase-3', number: 3, title: 'Multi-Platform Publishing', description: 'Twitter threads, ad-free standalone site, weekly cuisine newsletter.' },
      { id: 'phase-4', number: 4, title: 'Community & Monetization', description: 'User requests, recipe card shop, meal planning premium, cookbook pipeline.' },
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
    id: 'idea-10',
    title: 'Vogue Circuit',
    description: 'A fashion trend agent that decodes runway shows, street style, and TikTok micro-trends into wearable intelligence for normal humans.',
    category: 'content agent',
    phase: 'bidding',
    planterId: 'pl-3',
    plantedAt: daysAgo(3),
    conversation: [
      { role: 'user', content: 'Fashion media is split between unattainable runway coverage and fast-fashion hauls. I want an agent that bridges the gap — tracks trends from runway to TikTok to street and translates them into practical style advice for people with real budgets.' },
      { role: 'assistant', content: 'The translation layer is the product. "This Balenciaga silhouette is showing up as oversized blazers at Zara — here\'s how to wear it." The voice needs to be confident but not elitist, and budget-aware without being cheap. Are you covering all genders or starting focused?' },
      { role: 'user', content: 'All genders from day one — fashion is increasingly genderless anyway. Daily trend drops on social, weekly "what to actually buy" guides with price tiers.' },
      { role: 'assistant', content: 'Gender-inclusive with price tiers is how fashion media should have always worked. Let me spec this.' },
    ],
    spec: '### Phase 1: Trend Ingestion Pipeline\nMonitor runway shows, street style blogs, TikTok fashion hashtags, and retail new arrivals. Trend velocity and lifecycle tracking.\n\n### Phase 2: Translation & Styling Engine\nConvert high-fashion trends into budget-tiered wearable advice. Generate outfit suggestions with shoppable links. Gender-inclusive styling.\n\n### Phase 3: Publishing & Social\nDaily trend drops on Twitter/X and Instagram. Weekly buying guides on standalone site. Seasonal lookbooks with AI-generated imagery.\n\n### Phase 4: Revenue & Partnerships\nAffiliate revenue from shoppable links. Brand partnership for featured items. Premium personal styling tier with wardrobe analysis.',
    specPhases: [
      { id: 'phase-1', number: 1, title: 'Trend Ingestion Pipeline', description: 'Monitor runways, street style, TikTok, and retail. Track trend velocity and lifecycle.' },
      { id: 'phase-2', number: 2, title: 'Translation & Styling Engine', description: 'Budget-tiered wearable advice, outfit generation, gender-inclusive styling.' },
      { id: 'phase-3', number: 3, title: 'Publishing & Social', description: 'Daily trend drops, weekly buying guides, seasonal AI-generated lookbooks.' },
      { id: 'phase-4', number: 4, title: 'Revenue & Partnerships', description: 'Affiliate links, brand partnerships, premium personal styling.' },
    ],
    bids: {
      'phase-1': [
        makeBid('phase-1', MOCK_BUILDERS[3], 2900, 24000, 0.85),
        makeBid('phase-1', MOCK_BUILDERS[0], 3400, 28000, 0.90),
        makeBid('phase-1', MOCK_BUILDERS[2], 3100, 26000, 0.88),
      ],
    },
  },

  // ── 5 Spec-gen (1-3 days ago) ──────────────────────────────────
  {
    id: 'idea-11',
    title: 'Axiom',
    description: 'A science explainer agent that turns dense research papers into five-minute reads — peer-reviewed rigor with pop-science clarity.',
    category: 'education agent',
    phase: 'spec-gen',
    planterId: 'pl-12',
    plantedAt: daysAgo(3),
    conversation: [
      { role: 'user', content: 'ArXiv gets 15,000 papers a week and almost none of them reach normal people. I want an agent that monitors new research across physics, biology, and CS, and turns the important papers into engaging 5-minute reads without dumbing them down.' },
      { role: 'assistant', content: 'The hard part is selection — which 5 papers out of 15,000 matter this week? You need domain-specific importance scoring, not just citation counts. The writing should respect the reader\'s intelligence while eliminating jargon. What\'s the publishing format?' },
      { role: 'user', content: 'Daily picks on Twitter/X, a weekly email digest, and a searchable archive on a standalone site organized by field and impact level.' },
      { role: 'assistant', content: 'That\'s the right tiered approach. The archive becomes the long-term asset. Generating your spec now.' },
    ],
    spec: '### Phase 1: Paper Ingestion & Ranking\nArXiv, bioRxiv, and top-conference monitoring. Importance scoring by citation velocity, author reputation, and topic novelty.\n\n### Phase 2: Explainer Generation\nClear, rigorous writing voice. 5-minute read format with diagrams. Preserves nuance while eliminating jargon. Link back to original paper.\n\n### Phase 3: Publishing & Archive\nDaily picks on Twitter/X, weekly email digest. Searchable archive by field, impact, and topic.\n\n### Phase 4: Community & Revenue\nResearcher-submitted explainer requests. Institutional subscriptions for universities and companies. Sponsorship from research tools.',
    specPhases: [
      { id: 'phase-1', number: 1, title: 'Paper Ingestion & Ranking', description: 'ArXiv/bioRxiv monitoring with importance scoring by citation velocity, author reputation, novelty.' },
      { id: 'phase-2', number: 2, title: 'Explainer Generation', description: 'Rigorous 5-minute reads with diagrams, jargon-free but nuanced.' },
      { id: 'phase-3', number: 3, title: 'Publishing & Archive', description: 'Daily social picks, weekly digest, searchable archive by field and impact.' },
      { id: 'phase-4', number: 4, title: 'Community & Revenue', description: 'Researcher requests, institutional subs, research tool sponsorships.' },
    ],
  },
  {
    id: 'idea-12',
    title: 'Dirtsheet',
    description: 'A pro wrestling commentary agent that covers kayfabe like real news — match analysis, storyline predictions, and faction power rankings with a straight face.',
    category: 'entertainment agent',
    phase: 'spec-gen',
    planterId: 'pl-7',
    plantedAt: daysAgo(2),
    conversation: [
      { role: 'user', content: 'Pro wrestling has 50 million fans and the media coverage is either smarky insider gossip or complete ignorance. I want an agent that covers wrestling kayfabe like it\'s real — match analysis, storyline predictions, faction power rankings, all delivered with total sincerity.' },
      { role: 'assistant', content: 'Treating kayfabe as real journalism is hilarious and genuinely useful for fans who are tired of "well actually it\'s scripted" discourse. The voice should be a dead-serious sports analyst who happens to cover suplex counts and betrayal arcs. What promotions are you covering?' },
      { role: 'user', content: 'WWE, AEW, and NJPW to start. Post-show analysis within an hour, weekly power rankings, and PPV prediction threads.' },
      { role: 'assistant', content: 'Post-show speed is critical for the wrestling audience. The power rankings will drive weekly engagement beautifully. Generating spec now.' },
    ],
    spec: '### Phase 1: Wrestling Data Pipeline\nIngest results, storyline tracking, and roster data from WWE, AEW, NJPW. Match outcome database with move tracking.\n\n### Phase 2: Analysis & Voice Engine\nDead-serious sports analyst persona. Post-show recaps, storyline analysis, faction power rankings. Kayfabe-first with zero winking.\n\n### Phase 3: Publishing & Engagement\nPost-show analysis on Twitter/X within 60 minutes. Weekly power rankings. PPV prediction threads with community voting.\n\n### Phase 4: Community & Monetization\nFan prediction leagues with leaderboards. Premium tier with deep-dive storyline essays. Merch collaboration with indie wrestlers.',
    specPhases: [
      { id: 'phase-1', number: 1, title: 'Wrestling Data Pipeline', description: 'Results, storyline, and roster data from WWE/AEW/NJPW. Match outcome database.' },
      { id: 'phase-2', number: 2, title: 'Analysis & Voice Engine', description: 'Dead-serious sports analyst persona. Recaps, analysis, power rankings, kayfabe-first.' },
      { id: 'phase-3', number: 3, title: 'Publishing & Engagement', description: 'Post-show analysis within 60 min, weekly rankings, PPV prediction threads.' },
      { id: 'phase-4', number: 4, title: 'Community & Monetization', description: 'Fan prediction leagues, premium essays, indie wrestler merch collabs.' },
    ],
  },
  {
    id: 'idea-13',
    title: 'Terraform',
    description: 'A climate tech media agent that tracks carbon removal, clean energy, and green policy — making the most important story of the century actually readable.',
    category: 'news agent',
    phase: 'spec-gen',
    planterId: 'pl-1',
    plantedAt: daysAgo(2),
    conversation: [
      { role: 'user', content: 'Climate coverage is either doom-scrolling or greenwash PR. I want an agent that tracks real climate tech progress — carbon removal breakthroughs, clean energy deployments, policy changes — with informed optimism and zero spin.' },
      { role: 'assistant', content: 'Solutions-focused climate journalism is massively underserved. The voice needs to be credible and specific — actual megawatt numbers, actual capture rates, actual policy text. Hopeful but honest. What sources and what cadence?' },
      { role: 'user', content: 'Track peer-reviewed climate research, DOE announcements, IRENA data, and top climate tech company updates. Daily social posts, weekly deep-dive newsletter.' },
      { role: 'assistant', content: 'Data-driven optimism backed by real sources. This fills a genuine gap. Generating your spec now.' },
    ],
    spec: '### Phase 1: Climate Data Ingestion\nMonitor DOE, IRENA, Nature Climate Change, and 50+ climate tech companies. Track deployment numbers, funding rounds, and policy changes.\n\n### Phase 2: Content Generation & Tone\nInformed optimism voice. Progress metrics with context. Explainer format for technical breakthroughs. Policy impact analysis.\n\n### Phase 3: Publishing Pipeline\nDaily progress updates on Twitter/X and Farcaster. Weekly newsletter with sector breakdowns. Monthly "State of Climate Tech" report.\n\n### Phase 4: Audience & Revenue\nFree daily updates, premium weekly analysis. Institutional subscriptions for investors and policymakers. Conference partnership revenue.',
    specPhases: [
      { id: 'phase-1', number: 1, title: 'Climate Data Ingestion', description: 'DOE, IRENA, Nature, and 50+ company monitoring. Deployment numbers, funding, policy.' },
      { id: 'phase-2', number: 2, title: 'Content Generation & Tone', description: 'Informed optimism, progress metrics with context, technical explainers.' },
      { id: 'phase-3', number: 3, title: 'Publishing Pipeline', description: 'Daily social updates, weekly newsletter, monthly State of Climate Tech report.' },
      { id: 'phase-4', number: 4, title: 'Audience & Revenue', description: 'Premium analysis, institutional subs, conference partnerships.' },
    ],
  },
  {
    id: 'idea-14',
    title: 'Nightcap',
    description: 'A late-night comedy monologue agent that roasts the day\'s news with the timing of a stand-up and the sourcing of a journalist.',
    category: 'entertainment agent',
    phase: 'spec-gen',
    planterId: 'pl-10',
    plantedAt: daysAgo(1),
    conversation: [
      { role: 'user', content: 'Late-night TV monologues used to be how people processed the news. Now the shows are stale and nobody under 40 watches. I want an AI that writes a nightly comedy monologue — sharp jokes about the day\'s events, posted as a thread at 10pm every night.' },
      { role: 'assistant', content: 'The nightly ritual is powerful — it becomes appointment content. The jokes need to land on first read, which means tight setups and specific punchlines, not vague snark. The sourcing angle is interesting — every joke has a real news story behind it. What\'s the political stance?' },
      { role: 'user', content: 'Equal-opportunity roasting. Mock the powerful regardless of party. The audience is people who are exhausted by partisan comedy and just want to laugh at the absurdity of it all.' },
      { role: 'assistant', content: 'Non-partisan comedy that punches up is a wide-open lane. Let me generate the spec.' },
    ],
    spec: '### Phase 1: News Ingestion & Joke Mining\nReal-time news feed processing. Identify absurd, ironic, and contradictory stories with high comedy potential. Fact-check every setup.\n\n### Phase 2: Comedy Writing Engine\nTight setup-punchline structure. Equal-opportunity roasting — punch up, not down. Multiple joke styles: one-liners, callbacks, running bits.\n\n### Phase 3: Nightly Publishing Ritual\nAutomated 10pm ET posting as Twitter/X thread. Consistent formatting with news source links. Weekend "best of" compilations.\n\n### Phase 4: Audience & Revenue\nFree nightly threads, premium morning-after extended cut via email. Live event tie-ins. Merch with best joke lines.',
    specPhases: [
      { id: 'phase-1', number: 1, title: 'News Ingestion & Joke Mining', description: 'Real-time news processing, comedy potential scoring, fact-checked setups.' },
      { id: 'phase-2', number: 2, title: 'Comedy Writing Engine', description: 'Setup-punchline structure, equal-opportunity roasting, multiple joke styles.' },
      { id: 'phase-3', number: 3, title: 'Nightly Publishing Ritual', description: 'Automated 10pm thread, news source links, weekend best-of compilations.' },
      { id: 'phase-4', number: 4, title: 'Audience & Revenue', description: 'Free nightly threads, premium morning-after email, merch, live events.' },
    ],
  },
  {
    id: 'idea-15',
    title: 'Sidebar',
    description: 'A legal explainer agent that translates court rulings, new legislation, and regulatory actions into plain English before the hot takes arrive.',
    category: 'education agent',
    phase: 'spec-gen',
    planterId: 'pl-5',
    plantedAt: daysAgo(1),
    conversation: [
      { role: 'user', content: 'Every major court ruling and new law gets 10,000 bad takes before anyone reads the actual text. I want an agent that reads the full document, explains what it actually says, what it means, and what it doesn\'t mean — all before the pundit class wakes up.' },
      { role: 'assistant', content: 'Speed plus accuracy is the moat. If you can publish a clear, correct explainer within an hour of a ruling, you become the primary source that everyone else cites. The voice needs to be authoritative but accessible — a great law professor, not a lawyer billing hours. What jurisdictions?' },
      { role: 'user', content: 'US federal courts and Congress first. Supreme Court, circuit courts, and major legislation. Expand to EU and UK later.' },
      { role: 'assistant', content: 'Federal-first is smart — highest impact, most public interest. The "what it doesn\'t mean" framing is brilliant for combating misinformation. Generating spec now.' },
    ],
  },

  // ── 5 Ideation (0-2 days ago) ──────────────────────────────────
  {
    id: 'idea-16',
    title: 'Wayback',
    description: 'A history content agent that tells "this day in history" stories with the narrative depth of a podcast and the visual punch of an Instagram account.',
    category: 'education agent',
    phase: 'ideation',
    planterId: 'pl-9',
    plantedAt: daysAgo(2),
    conversation: [
      { role: 'user', content: '"On this day" content is everywhere but it\'s always shallow listicles. I want an agent that picks one fascinating historical event per day and tells the full story — the context, the characters, the consequences — with gorgeous AI-generated period imagery.' },
      { role: 'assistant', content: 'Single-story depth over breadth is the right call. The AI imagery adds a visual dimension that text-only history accounts can\'t match. The voice should feel like a great history teacher who makes you care about things you didn\'t know you cared about. What eras and regions are you covering?' },
    ],
  },
  {
    id: 'idea-17',
    title: 'Codec',
    description: 'A gaming analysis agent that breaks down competitive matches with the tactical depth of a football analyst — heatmaps, decision trees, and meta reads.',
    category: 'entertainment agent',
    phase: 'ideation',
    planterId: 'pl-3',
    plantedAt: daysAgo(1),
    conversation: [
      { role: 'user', content: 'Esports commentary is hype-focused but tactically shallow. I want an agent that analyzes competitive matches like a football pundit — heatmaps, decision breakdowns, meta evolution tracking. Cover League of Legends, Valorant, and Counter-Strike.' },
      { role: 'assistant', content: 'Tactical depth is the gap in esports media. The data is all there in match replays but nobody is doing systematic analysis at scale. The agent could become the go-to source that pro teams actually reference. What format — written analysis, or are you generating visual breakdowns too?' },
    ],
  },
  {
    id: 'idea-18',
    title: 'Papertrail',
    description: 'A book review agent that reads so you can read better — sharp reviews, themed reading lists, and a weekly "one book that will change how you think" pick.',
    category: 'content agent',
    phase: 'ideation',
    planterId: 'pl-6',
    plantedAt: daysAgo(1),
    conversation: [
      { role: 'user', content: 'Book discovery is broken. Amazon reviews are gamed, Goodreads is a social network pretending to be a review site, and BookTok favors aesthetics over substance. I want an agent that publishes honest, opinionated book reviews with themed reading lists.' },
      { role: 'assistant', content: 'An opinionated voice that\'s willing to say "this hyped book isn\'t worth your time" would be refreshing. The weekly single-book recommendation with a strong pitch ("one book that will change how you think about X") is a great hook. Nonfiction focus or all genres?' },
    ],
  },
  {
    id: 'idea-19',
    title: 'Dispatch',
    description: 'A crisis reporting agent that aggregates real-time information during natural disasters and conflicts — verified facts only, updated every 15 minutes.',
    category: 'news agent',
    phase: 'ideation',
    planterId: 'pl-5',
    plantedAt: daysAgo(0),
    conversation: [
      { role: 'user', content: 'During crises — earthquakes, floods, conflicts — social media fills with misinformation. Official channels are slow. I want an agent that aggregates verified information from multiple sources in real-time and publishes rolling updates every 15 minutes with strict source attribution.' },
      { role: 'assistant', content: 'This is potentially life-saving infrastructure. The verification layer is critical — every claim needs multi-source confirmation or explicit "single-source, unverified" labeling. The 15-minute cadence creates a reliable heartbeat people can depend on. The biggest challenge is knowing what NOT to publish.' },
    ],
  },
  {
    id: 'idea-20',
    title: 'Greenroom',
    description: 'A podcast highlights agent that listens to 100 hours of podcasts a week so you don\'t have to — surfacing the best clips, quotes, and ideas.',
    category: 'media agent',
    phase: 'ideation',
    planterId: 'pl-4',
    plantedAt: daysAgo(0),
    conversation: [
      { role: 'user', content: 'There are too many great podcasts and not enough hours. I want an agent that monitors the top 100 podcasts across tech, culture, and politics, and surfaces the most interesting 2-minute segments as clips with text summaries and key quotes.' },
      { role: 'assistant', content: 'You\'re building the highlight reel for the podcast ecosystem. The curation quality is everything — it\'s not about finding the loudest moments but the most insightful ones. Transcript analysis with topic detection and "insight density" scoring could work. The clips become a discovery engine that drives listeners back to full episodes.' },
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
