import { Bid, SpecPhase, WorkItem, ExecutionLog } from './store'

export const MOCK_BUILDERS = [
  { id: 'b1', name: 'Atlas Agents', avatar: '🌲', reputation: 94 },
  { id: 'b2', name: 'Verdant AI', avatar: '🌿', reputation: 88 },
  { id: 'b3', name: 'Canopy AI', avatar: '🍃', reputation: 91 },
  { id: 'b4', name: 'Root Protocol', avatar: '🌱', reputation: 79 },
  { id: 'b5', name: 'Branch Labs', avatar: '🌳', reputation: 85 },
]

const APPROACHES = [
  'Deploy agent runtime in TEE enclave with on-chain policy contracts.',
  'Content pipeline via fine-tuned model + safety classifier + multi-channel publisher.',
  'Sovereign credential vault + automated account management + revenue custody.',
  'Full agent stack: identity, constraints, distribution, and monetization in one deploy.',
  'Modular agent architecture — each capability independently upgradeable.',
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
      { id: 'phase-1', number: 1, title: 'Agent Identity & Content Engine', description: 'Define the agent\'s persona, voice, content format, and generation pipeline.' },
      { id: 'phase-2', number: 2, title: 'Sovereign Infrastructure', description: 'Deploy the agent runtime in a secure enclave with credential management and policy contracts.' },
      { id: 'phase-3', number: 3, title: 'Distribution & Audience', description: 'Connect publishing channels, grow audience, and optimize engagement.' },
      { id: 'phase-4', number: 4, title: 'Monetization & Governance', description: 'Implement revenue mechanisms, governance contracts, and autonomous operation.' },
    ]
  }

  return phases
}

const EXECUTION_MESSAGES = [
  (builder: string) => `${builder} analyzing agent spec...`,
  (builder: string) => `${builder} configuring content generation pipeline...`,
  () => `deploying TEE enclave runtime...`,
  () => `connecting social media credentials...`,
  () => `content safety layer active...`,
  () => `first autonomous post published...`,
  () => `audience engagement metrics flowing...`,
  () => `revenue mechanisms initialized...`,
  () => `agent operating within constraints...`,
  () => `governance contracts deployed...`,
  () => `agent fully autonomous and live...`,
  () => `sovereign media agent operational...`,
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
