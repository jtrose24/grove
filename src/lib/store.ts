import { create } from 'zustand'

export type AppPhase = 'ideation' | 'spec-gen' | 'bidding' | 'execution'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export interface WorkItem {
  id: string
  title: string
  tech: string
  epochs: number
  status: 'queued' | 'active' | 'done'
  deps?: string[]
}

export interface SpecPhase {
  id: string
  number: number
  title: string
  description: string
  workItems?: WorkItem[]
}

export interface Bid {
  id: string
  builderId: string
  builderName: string
  builderAvatar: string
  reputation: number
  approach: string
  cost: number
  predictedValue: number
  confidence: number
  upvotes: number
  downvotes: number
  timestamp: number
}

export interface Metrics {
  users: number
  revenue: number
  conversion: number
  engagement: number
  traffic: number
  completion: number
}

export interface ExecutionLog {
  id: string
  message: string
  timestamp: number
  type: 'info' | 'success' | 'deploy'
}

interface GroveStore {
  phase: AppPhase
  idea: string
  messages: Message[]
  spec: string
  specPhases: SpecPhase[]
  bids: Record<string, Bid[]>
  userVotes: Record<string, 1 | -1>
  selectedBids: Record<string, Bid>
  executionLogs: ExecutionLog[]
  metrics: Metrics
  activePhaseIndex: number
  biddingTimer: number

  setPhase: (phase: AppPhase) => void
  setIdea: (idea: string) => void
  addMessage: (msg: Message) => void
  setSpec: (spec: string) => void
  setSpecPhases: (phases: SpecPhase[]) => void
  addBid: (phaseId: string, bid: Bid) => void
  vote: (bidId: string, value: 1 | -1) => void
  selectWinner: (phaseId: string, bid: Bid) => void
  addExecutionLog: (log: ExecutionLog) => void
  updateMetrics: (metrics: Partial<Metrics>) => void
  setActivePhaseIndex: (i: number) => void
  setBiddingTimer: (t: number) => void
}

export const useGroveStore = create<GroveStore>((set) => ({
  phase: 'ideation',
  idea: '',
  messages: [],
  spec: '',
  specPhases: [],
  bids: {},
  userVotes: {},
  selectedBids: {},
  executionLogs: [],
  metrics: { users: 0, revenue: 0, conversion: 0, engagement: 0, traffic: 0, completion: 0 },
  activePhaseIndex: 0,
  biddingTimer: 120,

  setPhase: (phase) => set({ phase }),
  setIdea: (idea) => set({ idea }),
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  setSpec: (spec) => set({ spec }),
  setSpecPhases: (specPhases) => set({ specPhases }),
  addBid: (phaseId, bid) =>
    set((s) => ({ bids: { ...s.bids, [phaseId]: [...(s.bids[phaseId] || []), bid] } })),
  vote: (bidId, value) =>
    set((s) => ({ userVotes: { ...s.userVotes, [bidId]: value } })),
  selectWinner: (phaseId, bid) =>
    set((s) => ({ selectedBids: { ...s.selectedBids, [phaseId]: bid } })),
  addExecutionLog: (log) =>
    set((s) => ({ executionLogs: [...s.executionLogs, log] })),
  updateMetrics: (m) =>
    set((s) => ({ metrics: { ...s.metrics, ...m } })),
  setActivePhaseIndex: (i) => set({ activePhaseIndex: i }),
  setBiddingTimer: (t) => set({ biddingTimer: t }),
}))
