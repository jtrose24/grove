import { Bid, SpecPhase, WorkItem, ExecutionLog } from './store'

export const MOCK_BUILDERS = [
  { id: 'b1', name: 'Atlas Build', avatar: '🌲', reputation: 94 },
  { id: 'b2', name: 'Verdant Labs', avatar: '🌿', reputation: 88 },
  { id: 'b3', name: 'Canopy AI', avatar: '🍃', reputation: 91 },
  { id: 'b4', name: 'Root Systems', avatar: '🌱', reputation: 79 },
  { id: 'b5', name: 'Branch & Co', avatar: '🌳', reputation: 85 },
]

const APPROACHES = [
  'Ship a lean MVP with React + Supabase, focus on core loop first.',
  'Go headless — API-first backend with multiple frontend clients.',
  'Full-stack Next.js monorepo, deploy on Vercel edge network.',
  'Microservices from day one, each phase independently deployable.',
  'JAMstack approach — static frontend, serverless functions, CDN-first.',
]

export function generateBid(phaseId: string): Bid {
  const builder = MOCK_BUILDERS[Math.floor(Math.random() * MOCK_BUILDERS.length)]
  const confidence = 0.6 + Math.random() * 0.35
  return {
    id: `bid-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    builderId: builder.id,
    builderName: builder.name,
    builderAvatar: builder.avatar,
    reputation: builder.reputation,
    approach: APPROACHES[Math.floor(Math.random() * APPROACHES.length)],
    cost: Math.floor(800 + Math.random() * 4200),
    predictedValue: Math.floor(5000 + Math.random() * 45000),
    confidence: parseFloat(confidence.toFixed(2)),
    upvotes: Math.floor(Math.random() * 12),
    downvotes: Math.floor(Math.random() * 4),
    timestamp: Date.now(),
  }
}

export function scoreBid(bid: Bid): number {
  return (
    bid.predictedValue * bid.confidence +
    (bid.upvotes - bid.downvotes) * 100 +
    bid.reputation * 10
  )
}

export function parseSpecPhases(spec: string): SpecPhase[] {
  const phases: SpecPhase[] = []
  const lines = spec.split('\n')
  let currentPhase: Partial<SpecPhase> & { workItems?: WorkItem[] } | null = null
  let desc: string[] = []
  let phaseNum = 0
  let workItemCounter = 0

  function pushPhase() {
    if (currentPhase && currentPhase.title) {
      phases.push({
        id: `phase-${phaseNum}`,
        number: phaseNum,
        title: currentPhase.title,
        description: desc.join(' ').trim(),
        workItems: currentPhase.workItems && currentPhase.workItems.length > 0
          ? currentPhase.workItems
          : undefined,
      })
      desc = []
    }
  }

  for (const line of lines) {
    const phaseMatch = line.match(/^#{1,3}\s*(Phase\s*\d+[:\s]*.+)/i)
    if (phaseMatch) {
      pushPhase()
      phaseNum++
      currentPhase = {
        title: phaseMatch[1].replace(/^Phase\s*\d+[:\s]*/i, '').trim(),
        workItems: [],
      }
      continue
    }

    if (!currentPhase) continue

    // Parse work item lines: - [module-name] | Tech: description | Epochs: N
    const workMatch = line.match(/^-\s*\[([^\]]+)\]\s*\|\s*Tech:\s*(.+?)\s*\|\s*Epochs:\s*(\d+)/i)
    if (workMatch) {
      workItemCounter++
      currentPhase.workItems = currentPhase.workItems || []
      currentPhase.workItems.push({
        id: `p${phaseNum}-w${currentPhase.workItems.length + 1}`,
        title: workMatch[1].trim(),
        tech: workMatch[2].trim(),
        epochs: parseInt(workMatch[3], 10) || 2,
        status: 'queued' as const,
      })
      continue
    }

    // Regular description line (skip empty lines and "Why This Will Work" section)
    if (line.trim() && !line.match(/^#{1,3}\s/)) {
      desc.push(line.trim())
    }
  }

  pushPhase()

  // Fallback phases if parsing yields nothing
  if (phases.length === 0) {
    return [
      { id: 'phase-1', number: 1, title: 'Core Product Definition', description: 'Define the core value proposition, user personas, and key differentiators.' },
      { id: 'phase-2', number: 2, title: 'MVP Build', description: 'Ship the minimum viable product with core loop functional end-to-end.' },
      { id: 'phase-3', number: 3, title: 'Distribution Strategy', description: 'Identify growth channels, launch strategy, and early adopter pipeline.' },
      { id: 'phase-4', number: 4, title: 'Monetization Layer', description: 'Implement pricing, billing, and revenue capture mechanisms.' },
    ]
  }

  return phases
}

const EXECUTION_MESSAGES = [
  (builder: string) => `${builder} is analyzing the spec...`,
  (builder: string) => `${builder} scaffolding project structure...`,
  () => `Initializing repository and CI/CD pipeline...`,
  () => `Database schema deployed to production...`,
  () => `API routes configured and tested...`,
  () => `Frontend components rendering successfully...`,
  () => `Authentication layer integrated...`,
  () => `Landing page A/B test launched...`,
  () => `Analytics pipeline connected...`,
  () => `First 10 beta users onboarded...`,
  () => `Revenue tracking active...`,
  () => `Core loop validated with real users...`,
]

export function getExecutionMessage(index: number, builderName: string): ExecutionLog {
  const fn = EXECUTION_MESSAGES[index % EXECUTION_MESSAGES.length]
  const types: ExecutionLog['type'][] = ['info', 'info', 'success', 'deploy', 'info', 'success']
  return {
    id: `log-${Date.now()}-${index}`,
    message: fn(builderName),
    timestamp: Date.now(),
    type: types[index % types.length],
  }
}
