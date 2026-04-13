export const SAGE_TOKEN = {
  name: '$EIGEN',
  fullName: 'Grove',
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
    title: 'social-accountability-system',
    scope: 'Design and implement habit-sharing between friends: mutual visibility into streaks, shared goals, and nudge notifications. Privacy controls for which habits are visible. Push notification integration for streak reminders and friend activity.',
    expectedOutcome: 'Users can add friends, share selected habits, view each other\'s streaks, and send/receive nudges. D7 retention improves from 23% to 35%+ in test cohort.',
    constraints: [
      'Privacy-first — all sharing is opt-in per habit, never default-public',
      'Must work with existing auth and user model without migration',
      'Push notifications must respect user quiet hours and frequency caps',
      'Friend graph stored efficiently — no N+1 queries on feed load',
      'Nudge copy must be encouraging, never shaming',
    ],
    startingBid: 1800,
    sageReward: 45000,
  },
  {
    epochNumber: 2,
    workItemId: 'p2-w1',
    title: 'retention-analytics-pipeline',
    scope: 'Instrument the full user journey: signup → onboarding → first habit → first streak → subscription. Cohort analysis by acquisition source. Funnel drop-off identification. Automated weekly retention reports delivered to founder.',
    expectedOutcome: 'Founder has a live dashboard showing D1/D7/D30 retention by cohort, conversion funnel with drop-off rates, and weekly email digest with actionable insights.',
    constraints: [
      'Analytics must be privacy-compliant — no PII in event payloads',
      'Event schema must be extensible for future features without migration',
      'Dashboard must load in under 2 seconds on mobile',
      'Weekly digest must highlight the single highest-impact insight, not just raw numbers',
      'Must integrate with existing Supabase backend without additional infrastructure',
    ],
    startingBid: 1200,
    sageReward: 30000,
  },
  {
    epochNumber: 3,
    workItemId: 'p3-w1',
    title: 'onboarding-optimization',
    scope: 'Redesign first-run experience to reduce time-to-first-habit from 4 minutes to under 90 seconds. Template library of popular habits. Smart defaults based on user goals selected during signup. Progress celebration moments.',
    expectedOutcome: 'New users create their first habit within 90 seconds of signup. Onboarding completion rate improves from 61% to 80%+. Templates cover the top 20 habits by category.',
    constraints: [
      'Must not break existing user flows — changes are additive, not destructive',
      'Template library must be easy for founder to update without code changes',
      'Celebration animations must be lightweight — no heavy Lottie files',
      'A/B test framework must be in place to measure improvement',
      'Onboarding must work offline-first with sync on reconnection',
    ],
    startingBid: 1400,
    sageReward: 35000,
  },
  {
    epochNumber: 4,
    workItemId: 'p4-w1',
    title: 'subscription-paywall-upgrade',
    scope: 'Upgrade the basic paywall to a value-gated model: free tier gets 3 habits, premium unlocks unlimited habits + social features + analytics. Implement trial flow, upgrade prompts at natural friction points, and Stripe subscription management.',
    expectedOutcome: 'Free-to-paid conversion rate reaches 4%+ within 60 days. Trial-to-paid conversion at 25%+. Subscription management (upgrade, downgrade, cancel) fully self-service.',
    constraints: [
      'Free tier must remain genuinely useful — not a crippled experience',
      'Upgrade prompts must appear at value moments, not arbitrary walls',
      'Stripe integration must handle edge cases: failed payments, proration, plan changes',
      'Must support both monthly and annual billing from day one',
      'Cancellation flow must include retention offers before confirming',
    ],
    startingBid: 1600,
    sageReward: 40000,
  },
]

export const DEMO_IDEA = `StreakUp — a B2C habit-tracking app built on Lovable. ~200 users, working onboarding flow, basic subscription paywall. Wants to add social accountability features, improve D7 retention (currently 23%), and grow to 1,000 users in 90 days. Solo founder, self-funded, open to alternative capital models.`

export const DEMO_TWEET = {
  name: 'Sahil Lavingia',
  handle: 'shl',
  content: `The best solopreneur tools don't replace the founder.\n\nThey give the founder a team.\n\nNot employees — agents. Specialized, on-demand, pay-for-output.\n\nThe next Gumroad will be built by one person with an agentic CEO.`,
  date: '11:42 AM · Mar 12, 2026',
  likes: 3241,
  retweets: 847,
}

export const DEMO_ATTRIBUTION = {
  name: 'Maya Chen',
  title: 'Solo founder, StreakUp',
  avatar: '🌱',
  note: 'Maya built StreakUp on Lovable and brought it to Grove to scale.',
}

export const DEMO_CONVERSATION = [
  {
    role: 'user' as const,
    content: `I built a habit-tracking app on Lovable — it's called StreakUp. About 200 users so far, basic subscription paywall is working. But I'm stuck. I want to add social features so friends can hold each other accountable, and my retention numbers need work. D7 is only 23%. I'm one person and the roadmap feels impossible.`,
  },
  {
    role: 'assistant' as const,
    content: `Got it — StreakUp, habit tracker, Lovable stack, 200 users, subscription paywall live. 23% D7 retention is actually not bad for a solo v1 — most apps at this stage are lower. The fact that you have paying users means the core loop works. You don't need to rebuild — you need to grow.

Two things jump out: social accountability is your highest-leverage feature for retention, and your onboarding-to-first-streak flow is probably where most users drop off. Let me ask — what does success look like for you in 90 days? User count, revenue, or something else?`,
  },
  {
    role: 'user' as const,
    content: `90-day goal: 1,000 users, D7 retention above 35%, and enough MRR to cover my infrastructure costs — probably around $500/mo. I'm self-funded right now but open to alternative models if the numbers are there. I just need help figuring out what to build next and in what order.`,
  },
  {
    role: 'assistant' as const,
    content: `Clear targets. 1K users, 35% D7, $500 MRR — all achievable from where you are if the work is sequenced right. Here's what I'm seeing:

**The growth path:** Social accountability first (biggest retention lever), then onboarding optimization (widens the funnel), then paywall upgrade (captures the value). Analytics pipeline runs in parallel so you can measure everything.

**Capital note:** At $500 MRR you're pre-revenue for most funding, but Grove's agent network can price the work in small packages — you don't need a $500K round, you need $6K of targeted execution over 90 days.

I'm ready to generate your full growth plan — project audit, gap analysis, 90-day roadmap, and work packages that agents can bid on. Hit **Launch It** and let's go.`,
  },
] as Array<{ role: 'user' | 'assistant'; content: string; text?: string }>

export const DEMO_SPEC_PHASES = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Project Audit & Retention Foundation',
    description: 'Assess current state → instrument analytics → identify retention bottlenecks → establish baselines',
    workItems: [
      {
        id: 'p1-w1',
        title: 'social-accountability-system',
        tech: 'Friend graph with opt-in habit sharing. Streak visibility, shared goals, nudge notifications. Privacy controls per habit. Push notification integration with quiet hours and frequency caps.',
        epochs: 3,
        status: 'queued' as const,
      },
      {
        id: 'p1-w2',
        title: 'retention-analytics-pipeline',
        tech: 'Full-journey instrumentation: signup → onboarding → first habit → first streak → subscription. Cohort analysis by source. Automated weekly retention digest with actionable insights.',
        epochs: 2,
        status: 'queued' as const,
      },
      {
        id: 'p1-w3',
        title: 'streak-notification-engine',
        tech: 'Smart reminder system: context-aware timing based on user habit schedule. Streak-at-risk alerts. Celebration moments for milestones (7-day, 30-day, 100-day). Notification fatigue prevention.',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p1-w1'],
      },
    ],
  },
  {
    id: 'phase-2',
    number: 2,
    title: 'Onboarding & Activation',
    description: 'Reduce time-to-first-habit → template library → smart defaults → progress celebrations',
    workItems: [
      {
        id: 'p2-w1',
        title: 'onboarding-redesign',
        tech: 'First-run experience overhaul: goal selection → template suggestions → first habit created in under 90 seconds. Smart defaults based on user-selected category. Skip-friendly but guided.',
        epochs: 2,
        status: 'queued' as const,
      },
      {
        id: 'p2-w2',
        title: 'habit-template-library',
        tech: 'Curated library of 50+ habit templates across categories (fitness, mindfulness, learning, productivity). Each template includes suggested frequency, reminder time, and streak milestones.',
        epochs: 2,
        status: 'queued' as const,
      },
      {
        id: 'p2-w3',
        title: 'ab-test-framework',
        tech: 'Lightweight A/B testing for onboarding variants. Feature flags with percentage rollout. Event tracking for conversion metrics. Statistical significance calculator.',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p2-w1'],
      },
    ],
  },
  {
    id: 'phase-3',
    number: 3,
    title: 'Growth & Distribution',
    description: 'Organic growth loops → referral system → SEO landing pages → social sharing',
    workItems: [
      {
        id: 'p3-w1',
        title: 'referral-system',
        tech: 'Friend invite flow with reward mechanics: inviter gets premium trial extension, invitee gets onboarding boost. Shareable invite links with attribution tracking. Viral coefficient measurement.',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p1-w1'],
      },
      {
        id: 'p3-w2',
        title: 'seo-landing-pages',
        tech: 'Programmatic landing pages for top habit categories: "best habit tracker for fitness", "daily meditation tracker", etc. SEO-optimized content, structured data, and fast Core Web Vitals.',
        epochs: 2,
        status: 'queued' as const,
      },
      {
        id: 'p3-w3',
        title: 'social-sharing-cards',
        tech: 'Auto-generated streak milestone cards for Twitter/Instagram. Custom OG images per habit and streak length. One-tap share from achievement screen. Deep link back to app.',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p1-w1', 'p3-w1'],
      },
    ],
  },
  {
    id: 'phase-4',
    number: 4,
    title: 'Monetization & Capital',
    description: 'Paywall optimization → subscription tiers → capital needs analysis → funding readiness',
    workItems: [
      {
        id: 'p4-w1',
        title: 'subscription-paywall-upgrade',
        tech: 'Value-gated model: free tier (3 habits), premium (unlimited + social + analytics). Trial flow with natural upgrade prompts at value moments. Stripe subscription management with proration.',
        epochs: 3,
        status: 'queued' as const,
      },
      {
        id: 'p4-w2',
        title: 'revenue-analytics',
        tech: 'MRR tracking, churn analysis, LTV calculation by cohort. Revenue forecasting based on current growth rate. Automated alerts for churn spikes or conversion drops.',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p4-w1', 'p1-w2'],
      },
      {
        id: 'p4-w3',
        title: 'capital-needs-assessment',
        tech: 'Automated capital gap analysis: current burn rate vs. growth targets. Identifies funding needs by month. Surfaces options: revenue-based financing, micro-grants, angel-friendly metrics deck.',
        epochs: 2,
        status: 'queued' as const,
        deps: ['p4-w2'],
      },
    ],
  },
]

export const DEMO_SPEC_TEXT = `### Phase 1: Project Audit & Retention Foundation
StreakUp has a working core loop — 200 users, functional onboarding, and a basic paywall. The foundation is real. Phase 1 focuses on understanding what's working and building the retention infrastructure to keep users coming back.

Social accountability is the highest-leverage feature: habit-tracking apps with friend visibility see 2-3x higher D7 retention than solo-use apps. We'll build a friend graph with opt-in habit sharing, streak visibility, and nudge notifications — all privacy-first, never default-public. In parallel, we'll instrument the full user journey so every optimization from here forward is measurable.

### Phase 2: Onboarding & Activation
The current onboarding takes ~4 minutes to first habit creation. That's too long — every extra step loses users. Phase 2 redesigns the first-run experience: goal selection → template suggestion → first habit created in under 90 seconds. A curated template library (50+ habits across fitness, mindfulness, learning, productivity) gives new users a fast path to value. An A/B test framework ensures we can measure every change and iterate with confidence.

### Phase 3: Growth & Distribution
With retention improved and onboarding tightened, it's time to widen the funnel. A referral system turns existing users into growth engines: invite a friend, both get a premium trial extension. Programmatic SEO landing pages capture high-intent search traffic for specific habit categories. Social sharing cards let users broadcast streak milestones with one tap — each share is a free acquisition channel back to the app.

### Phase 4: Monetization & Capital
The current paywall is basic. Phase 4 upgrades it to a value-gated model: free tier (3 habits) is genuinely useful, premium (unlimited + social + analytics) unlocks the features power users want. Upgrade prompts appear at natural value moments, not arbitrary walls. Revenue analytics track MRR, churn, and LTV by cohort. A capital needs assessment identifies the gap between current revenue and growth targets — and surfaces funding options that fit a solopreneur (revenue-based financing, micro-grants, angel-friendly metrics) rather than forcing a traditional raise.

## Why This Will Work
StreakUp has the hardest thing to get: real users who pay. 200 users with a working paywall is a validated core loop. The growth path isn't about reinventing the product — it's about adding the social layer that drives retention, tightening the onboarding funnel, and building growth loops that compound. At $500 MRR target, this isn't a VC-scale play — it's a solopreneur scaling smart with an agentic team. The 90-day roadmap is scoped for exactly that: targeted execution, measurable outcomes, minimal capital requirement.`
