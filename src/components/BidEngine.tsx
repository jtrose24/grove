'use client'
import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGroveStore, Bid } from '@/lib/store'
import { generateBid, scoreBid, MOCK_BUILDERS } from '@/lib/mockData'
import { DEMO_EPOCH_BRIEFS, SAGE_TOKEN, EpochBrief } from '@/lib/demoData'

type EpochStage = 'brief' | 'bidding' | 'building' | 'review' | 'settled'

const STAGE_STEPS: { stage: EpochStage; label: string }[] = [
  { stage: 'brief', label: 'Brief' },
  { stage: 'bidding', label: 'Bidding' },
  { stage: 'building', label: 'Building' },
  { stage: 'review', label: 'QA Review' },
  { stage: 'settled', label: 'Settled' },
]

const AGENT_STATUSES = [
  'analyzing spec constraints...',
  'estimating compute costs...',
  'preparing bid proposal...',
  'reviewing schema requirements...',
  'calculating confidence score...',
  'evaluating dependencies...',
  'benchmarking approach...',
  'finalizing bid terms...',
  'running cost simulation...',
  'checking availability...',
]

const DEMO_BID_TIME = 15

/* ── Stage indicator ── */
function StageIndicator({ currentStage }: { currentStage: EpochStage }) {
  const currentIdx = STAGE_STEPS.findIndex((s) => s.stage === currentStage)

  return (
    <div className="flex items-center gap-0.5">
      {STAGE_STEPS.map((step, i) => {
        const isActive = i === currentIdx
        const isDone = i < currentIdx
        return (
          <div key={step.stage} className="flex items-center">
            <div
              className={`flex items-center gap-2 px-2.5 py-1 rounded-full font-mono transition-all duration-300 ${
                isActive
                  ? 'bg-[#C6A85E]/15 text-[#C6A85E] border border-[#C6A85E]/30 text-sm font-bold'
                  : isDone
                  ? 'text-emerald-400/60 text-[10px]'
                  : 'text-white/15 text-[10px]'
              }`}
            >
              <span
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2 h-2 bg-[#C6A85E] animate-pulse'
                    : isDone
                    ? 'w-1.5 h-1.5 bg-emerald-400/60'
                    : 'w-1.5 h-1.5 bg-white/10'
                }`}
              />
              <span>{step.label}</span>
            </div>
            {i < STAGE_STEPS.length - 1 && (
              <div
                className={`w-4 h-px mx-0.5 transition-all duration-500 ${isDone ? 'bg-emerald-400/30' : 'bg-white/8'}`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Treasury balance ── */
function TreasuryBalance({ spent }: { spent: number }) {
  const [hovered, setHovered] = useState(false)
  const balance = 10000 - spent

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/6 cursor-default">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
        <span className="text-white/50 text-[11px] font-mono">
          {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
        <span className="text-white/25 text-[10px] font-mono">USDC</span>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 z-50 px-3 py-2.5 rounded-xl bg-[#0a1510] border border-white/10 shadow-xl shadow-black/40 whitespace-nowrap"
          >
            <p className="text-white/70 text-[10px] font-mono mb-1.5">seed funding</p>
            <p className="text-white/30 text-[10px] font-mono mb-0.5">
              0x7a2E...c4F8 <span className="text-white/15">(Eigen Foundation)</span>
            </p>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/6">
              <span className="text-white/25 text-[10px] font-mono">funded</span>
              <span className="text-emerald-400/60 text-[10px] font-mono">10,000.00 USDC</span>
            </div>
            {spent > 0 && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-white/25 text-[10px] font-mono">allocated</span>
                <span className="text-[#C6A85E]/60 text-[10px] font-mono">
                  -{spent.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDC
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Agent activity sidebar ── */
function AgentActivitySidebar({ bidCount }: { bidCount: number }) {
  const [agents, setAgents] = useState(
    MOCK_BUILDERS.map((b) => ({
      id: b.id,
      name: b.name,
      avatar: b.avatar,
      status: AGENT_STATUSES[Math.floor(Math.random() * AGENT_STATUSES.length)],
      active: true,
    }))
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents((prev) =>
        prev.map((a) => ({
          ...a,
          status: AGENT_STATUSES[Math.floor(Math.random() * AGENT_STATUSES.length)],
          active: Math.random() > 0.15,
        }))
      )
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const activeCount = agents.filter((a) => a.active).length

  return (
    <div className="w-44 flex-shrink-0 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-white/25 text-[10px] font-mono uppercase tracking-wider">agents</span>
        <span className="text-[#C6A85E]/40 text-[10px] font-mono">{activeCount} active</span>
      </div>

      <div className="flex-1 space-y-1.5 overflow-y-auto">
        {agents.map((agent) => (
          <motion.div
            key={agent.id}
            animate={{ opacity: agent.active ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
            className="px-2.5 py-2 rounded-lg bg-white/[0.02] border border-white/5"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">{agent.avatar}</span>
              <span className="text-white/60 text-[11px] font-medium truncate">{agent.name}</span>
              <span
                className={`w-1.5 h-1.5 rounded-full ml-auto flex-shrink-0 ${
                  agent.active ? 'bg-emerald-400/70 animate-pulse' : 'bg-white/10'
                }`}
              />
            </div>
            {agent.active && (
              <motion.p
                key={agent.status}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/20 text-[10px] font-mono leading-relaxed truncate"
              >
                {agent.status}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>

      {bidCount > 0 && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-white/20">bids placed</span>
            <span className="text-white/40">{bidCount}</span>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Bid card ── */
function BidCard({ bid, phaseId }: { bid: Bid; phaseId: string }) {
  const { userVotes, vote } = useGroveStore()
  const userVote = userVotes[bid.id]
  const totalVotes = bid.upvotes + bid.downvotes
  const sentimentPct = totalVotes > 0 ? Math.round((bid.upvotes / totalVotes) * 100) : 50

  function handleVote(val: 1 | -1) {
    if (userVote) return
    vote(bid.id, val)
    useGroveStore.setState((s) => ({
      bids: {
        ...s.bids,
        [phaseId]: s.bids[phaseId].map((b) =>
          b.id === bid.id
            ? { ...b, upvotes: b.upvotes + (val === 1 ? 1 : 0), downvotes: b.downvotes + (val === -1 ? 1 : 0) }
            : b
        ),
      },
    }))
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="relative rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 p-4 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{bid.builderAvatar}</span>
          <div>
            <p className="text-white/90 text-sm font-semibold">{bid.builderName}</p>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${i < Math.round(bid.reputation / 20) ? 'bg-[#C6A85E]' : 'bg-white/15'}`}
                  />
                ))}
              </div>
              <span className="text-white/40 text-xs">{bid.reputation}/100</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[#C6A85E] text-sm font-bold">{bid.cost.toLocaleString()} USDC</p>
          <p className="text-white/40 text-xs">{bid.predictedValue.toLocaleString()} est. value</p>
        </div>
      </div>

      <p className="text-white/60 text-xs leading-relaxed mb-3">{bid.approach}</p>

      <div className="mb-3">
        <div className="flex justify-between text-xs text-white/40 mb-1">
          <span>{sentimentPct}% confidence</span>
          <span>{(bid.confidence * 100).toFixed(0)}% match</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden flex">
          <div className="bg-emerald-500/70 h-full transition-all duration-500" style={{ width: `${sentimentPct}%` }} />
          <div className="bg-red-500/50 h-full flex-1" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => handleVote(1)}
          disabled={!!userVote}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
            userVote === 1
              ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
              : 'border-white/15 text-white/50 hover:border-emerald-500/50 hover:text-emerald-400 disabled:opacity-40'
          }`}
        >
          👍 {bid.upvotes}
        </button>
        <button
          onClick={() => handleVote(-1)}
          disabled={!!userVote}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
            userVote === -1
              ? 'border-red-500 bg-red-500/20 text-red-400'
              : 'border-white/15 text-white/50 hover:border-red-500/50 hover:text-red-400 disabled:opacity-40'
          }`}
        >
          👎 {bid.downvotes}
        </button>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   MAIN BID ENGINE — staged epoch progression
   brief → bidding → building → review → settled
   Payment only releases AFTER Arborist QA + security audit
   ═══════════════════════════════════════════════════════ */
export default function BidEngine({ isDemo }: { isDemo?: boolean }) {
  const { specPhases, bids, addBid, selectWinner, selectedBids, setPhase, setActivePhaseIndex, activePhaseIndex } =
    useGroveStore()

  const TOTAL_EPOCHS = 50
  const [timer, setTimer] = useState(isDemo ? DEMO_BID_TIME : 120)
  const [epochNumber, setEpochNumber] = useState(1)
  const [epochStage, setEpochStage] = useState<EpochStage>(isDemo ? 'brief' : 'bidding')
  const [briefProgress, setBriefProgress] = useState(0)

  const currentPhase = specPhases[activePhaseIndex]
  const currentBrief = isDemo
    ? DEMO_EPOCH_BRIEFS.find((b) => b.epochNumber === epochNumber) || DEMO_EPOCH_BRIEFS[0]
    : null

  /* ── Brief stage: progress bar + auto-advance ── */
  useEffect(() => {
    if (epochStage !== 'brief') return
    setBriefProgress(0)
    const duration = 3500
    const step = 50
    let elapsed = 0
    const interval = setInterval(() => {
      elapsed += step
      setBriefProgress(Math.min(1, elapsed / duration))
      if (elapsed >= duration) {
        clearInterval(interval)
        setEpochStage('bidding')
      }
    }, step)
    return () => clearInterval(interval)
  }, [epochStage, epochNumber])

  /* ── Bidding stage: seed initial bids ── */
  useEffect(() => {
    if (epochStage !== 'bidding' || !currentPhase) return
    const t1 = setTimeout(() => addBid(currentPhase.id, generateBid(currentPhase.id)), 600)
    const t2 = setTimeout(() => addBid(currentPhase.id, generateBid(currentPhase.id)), 1800)
    const t3 = setTimeout(() => addBid(currentPhase.id, generateBid(currentPhase.id)), 3600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [epochStage, currentPhase?.id])

  /* ── Timer countdown (bidding only) ── */
  useEffect(() => {
    if (epochStage !== 'bidding') return
    if (timer <= 0) {
      handleSelectWinner()
      return
    }
    const t = setTimeout(() => setTimer((v) => v - 1), 1000)
    return () => clearTimeout(t)
  }, [timer, epochStage])

  /* ── Periodic new bids during bidding ── */
  const addRandomBid = useCallback(() => {
    if (!currentPhase) return
    addBid(currentPhase.id, generateBid(currentPhase.id))
  }, [currentPhase, addBid])

  useEffect(() => {
    if (epochStage !== 'bidding') return
    const interval = setInterval(() => {
      if (Math.random() > 0.3) addRandomBid()
    }, 3500)
    return () => clearInterval(interval)
  }, [epochStage, addRandomBid])

  /* ── Building stage → review ── */
  useEffect(() => {
    if (epochStage !== 'building') return
    const t = setTimeout(() => setEpochStage('review'), isDemo ? 5000 : 5000)
    return () => clearTimeout(t)
  }, [epochStage, epochNumber])

  /* ── Review stage → settled ── */
  useEffect(() => {
    if (epochStage !== 'review') return
    const t = setTimeout(() => setEpochStage('settled'), isDemo ? 4500 : 4500)
    return () => clearTimeout(t)
  }, [epochStage, epochNumber])

  /* ── Settled stage → next epoch ── */
  useEffect(() => {
    if (epochStage !== 'settled') return
    const t = setTimeout(() => advanceToNextEpoch(), isDemo ? 3500 : 3500)
    return () => clearTimeout(t)
  }, [epochStage, epochNumber])

  function advanceToNextEpoch() {
    const nextIdx = activePhaseIndex + 1
    if (nextIdx < specPhases.length) {
      setActivePhaseIndex(nextIdx)
      setEpochNumber((e) => e + 1)
      setTimer(isDemo ? DEMO_BID_TIME : 120)
      setEpochStage(isDemo ? 'brief' : 'bidding')
    } else {
      setPhase('execution')
    }
  }

  function handleSelectWinner() {
    if (!currentPhase) return
    const phaseBids = bids[currentPhase.id] || []
    if (!phaseBids.length) return
    const winner = phaseBids.reduce((best, b) => (scoreBid(b) > scoreBid(best) ? b : best))
    selectWinner(currentPhase.id, winner)
    setEpochStage('building')
  }

  if (!currentPhase) return null

  const phaseBids = bids[currentPhase.id] || []
  const winner = selectedBids[currentPhase.id]
  const sortedBids = [...phaseBids].sort((a, b) => scoreBid(b) - scoreBid(a))
  const totalSpent = Object.values(selectedBids).reduce((sum, b) => sum + b.cost, 0)
  const mins = Math.floor(timer / 60)
  const secs = timer % 60

  // Generate a fake PR number from epoch
  const prNumber = 100 + epochNumber * 7

  return (
    <div className="flex h-full gap-4 p-4">
      {/* ── Left: Epoch timeline ── */}
      <div className="w-48 flex-shrink-0 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[#C6A85E] text-xs font-mono font-bold uppercase tracking-wider">Epochs</p>
        </div>
        <TreasuryBalance spent={totalSpent} />

        <div className="flex-1 overflow-y-auto space-y-0.5 pr-1 mt-3">
          {DEMO_EPOCH_BRIEFS.map((brief) => {
            const isDone = brief.epochNumber < epochNumber
            const isCurrent = brief.epochNumber === epochNumber
            const winnerForEpoch = isDone ? Object.values(selectedBids)[brief.epochNumber - 1] : null

            return (
              <div key={brief.epochNumber} className="relative flex gap-2">
                <div className="flex flex-col items-center w-5 flex-shrink-0">
                  <div
                    className={`w-2.5 h-2.5 rounded-full mt-2.5 flex-shrink-0 ${
                      isDone
                        ? 'bg-emerald-400/70'
                        : isCurrent
                        ? 'bg-[#C6A85E] animate-pulse shadow-sm shadow-[#C6A85E]/30'
                        : 'bg-white/10'
                    }`}
                  />
                  {brief.epochNumber < DEMO_EPOCH_BRIEFS.length && (
                    <div className={`w-px flex-1 my-1 ${isDone ? 'bg-emerald-400/20' : 'bg-white/6'}`} />
                  )}
                </div>

                <div
                  className={`flex-1 rounded-lg px-2.5 py-2 mb-1 border transition-all ${
                    isCurrent
                      ? 'border-[#C6A85E]/40 bg-[#1F5A45]/15'
                      : isDone
                      ? 'border-emerald-500/20 bg-white/[0.01]'
                      : 'border-white/5 bg-white/[0.01]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className={`text-[10px] font-mono font-bold ${
                        isCurrent ? 'text-[#C6A85E]' : isDone ? 'text-emerald-400/60' : 'text-white/15'
                      }`}
                    >
                      E{brief.epochNumber}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full border text-[#C6A85E] bg-[#C6A85E]/10 border-[#C6A85E]/30">
                        {epochStage}
                      </span>
                    )}
                    {isDone && <span className="text-emerald-400/50 text-[9px] font-mono">settled</span>}
                  </div>
                  <p
                    className={`text-[11px] font-mono leading-snug ${
                      isCurrent ? 'text-white/70' : isDone ? 'text-white/30' : 'text-white/15'
                    }`}
                  >
                    {brief.title}
                  </p>
                  {isDone && winnerForEpoch && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[10px]">{winnerForEpoch.builderAvatar}</span>
                      <span className="text-white/20 text-[10px] font-mono truncate">{winnerForEpoch.builderName}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          <div className="flex gap-2 pl-0.5">
            <div className="flex flex-col items-center w-5 flex-shrink-0">
              <div className="w-1 h-1 rounded-full bg-white/8 mt-2" />
              <div className="w-1 h-1 rounded-full bg-white/6 mt-1" />
              <div className="w-1 h-1 rounded-full bg-white/4 mt-1" />
            </div>
            <p className="text-white/10 text-[10px] font-mono py-1">+{TOTAL_EPOCHS - DEMO_EPOCH_BRIEFS.length} more epochs</p>
          </div>
        </div>
      </div>

      {/* ── Center: Stage-based content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1F5A45]/20 border border-[#1F5A45]/40">
              <span className="text-[#C6A85E] text-xs font-bold font-mono">E{epochNumber}</span>
              <span className="text-white/20 text-[10px] font-mono">of {TOTAL_EPOCHS}</span>
            </div>
            <StageIndicator currentStage={epochStage} />
          </div>

          {epochStage === 'bidding' && (
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                  timer < 10 ? 'border-red-500/60 bg-red-500/10' : 'border-white/20 bg-white/5'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${timer < 10 ? 'bg-red-400 animate-pulse' : 'bg-[#C6A85E]'}`} />
                <span className={`text-sm font-mono font-bold ${timer < 10 ? 'text-red-400' : 'text-white/80'}`}>
                  {mins}:{secs.toString().padStart(2, '0')}
                </span>
              </div>
              <button
                onClick={handleSelectWinner}
                className="text-[10px] px-2.5 py-1.5 rounded-full border border-[#C6A85E]/30 text-[#C6A85E]/60 hover:bg-[#C6A85E]/10 transition-all font-mono"
              >
                Select Now
              </button>
            </div>
          )}
        </div>

        {/* Stage content */}
        <div className="flex-1 overflow-y-auto relative">
          <AnimatePresence mode="wait">
            {/* ─── BRIEF STAGE ─── */}
            {epochStage === 'brief' && currentBrief && (
              <motion.div
                key={`brief-${epochNumber}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="min-h-full flex items-center justify-center py-6"
              >
                <div className="w-full max-w-2xl">
                  <div className="text-center mb-6">
                    <p className="text-white/20 text-[10px] font-mono uppercase tracking-widest mb-2">
                      Epoch {currentBrief.epochNumber} Brief
                    </p>
                    <h2 className="text-white/90 text-xl font-bold font-mono">{currentBrief.title}</h2>
                  </div>

                  <div className="rounded-xl border border-[#1F5A45]/40 bg-[#0a1a14] p-6 space-y-4">
                    <div>
                      <p className="text-white/25 text-[10px] font-mono uppercase tracking-wider mb-1.5">scope</p>
                      <p className="text-white/60 text-sm font-mono leading-relaxed">{currentBrief.scope}</p>
                    </div>

                    <div>
                      <p className="text-white/25 text-[10px] font-mono uppercase tracking-wider mb-1.5">expected outcome</p>
                      <p className="text-emerald-400/70 text-sm font-mono leading-relaxed">{currentBrief.expectedOutcome}</p>
                    </div>

                    <div>
                      <p className="text-white/25 text-[10px] font-mono uppercase tracking-wider mb-2">constraints</p>
                      <div className="space-y-1.5">
                        {currentBrief.constraints.map((c, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.15 }}
                            className="flex items-start gap-2"
                          >
                            <span className="text-red-400/50 text-xs font-mono mt-0.5 flex-shrink-0">!</span>
                            <p className="text-white/40 text-xs font-mono leading-relaxed">{c}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                      <div className="flex-1 bg-white/[0.03] rounded-lg px-4 py-3 border border-white/5">
                        <p className="text-white/20 text-[10px] font-mono mb-0.5">starting bid</p>
                        <p className="text-white/70 text-lg font-mono font-bold">
                          {currentBrief.startingBid.toLocaleString()}{' '}
                          <span className="text-white/30 text-xs">USDC</span>
                        </p>
                      </div>
                      <div className="flex-1 bg-[#1F5A45]/10 rounded-lg px-4 py-3 border border-[#1F5A45]/20">
                        <p className="text-white/20 text-[10px] font-mono mb-0.5">completion reward</p>
                        <p className="text-[#C6A85E] text-lg font-mono font-bold">
                          {currentBrief.sageReward.toLocaleString()}{' '}
                          <span className="text-[#C6A85E]/50 text-xs">{SAGE_TOKEN.name}</span>
                        </p>
                      </div>
                    </div>

                    {/* Payment note */}
                    <p className="text-white/15 text-[10px] font-mono text-center pt-1">
                      payment held in escrow — released after Arborist QA + security audit
                    </p>
                  </div>

                  <div className="mt-5">
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#C6A85E]/40 to-[#C6A85E] rounded-full"
                        style={{ width: `${briefProgress * 100}%` }}
                      />
                    </div>
                    <p className="text-white/15 text-[10px] font-mono mt-2 text-center">
                      Opening bidding in {Math.max(1, Math.ceil((1 - briefProgress) * 3.5))}s...
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── BIDDING STAGE ─── */}
            {epochStage === 'bidding' && (
              <motion.div
                key={`bidding-${epochNumber}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {currentBrief && (
                  <div className="mb-4 px-4 py-2.5 rounded-lg bg-[#0a1a14] border border-[#1F5A45]/20 flex items-center gap-4">
                    <code className="text-[#C6A85E] text-xs font-mono font-bold flex-shrink-0">{currentBrief.title}</code>
                    <span className="text-white/10">|</span>
                    <span className="text-white/30 text-[10px] font-mono truncate flex-1">
                      {currentBrief.scope.slice(0, 90)}...
                    </span>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-white/40 text-[10px] font-mono">{currentBrief.startingBid} USDC</span>
                      <span className="text-[#C6A85E]/40 text-[10px] font-mono">
                        {currentBrief.sageReward.toLocaleString()} {SAGE_TOKEN.name}
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white/25 text-[10px] font-mono uppercase tracking-wider">bids</span>
                    <span className="text-white/15 text-[10px] font-mono">{phaseBids.length} submitted</span>
                  </div>

                  <AnimatePresence>
                    {sortedBids.map((bid) => (
                      <BidCard key={bid.id} bid={bid} phaseId={currentPhase.id} />
                    ))}
                  </AnimatePresence>

                  {phaseBids.length === 0 && (
                    <div className="text-center text-white/20 text-sm mt-12 font-mono">
                      Waiting for builders to submit bids...
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ─── BUILDING STAGE ─── */}
            {epochStage === 'building' && winner && (
              <motion.div
                key={`building-${epochNumber}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="min-h-full flex items-center justify-center"
              >
                <div className="w-full max-w-lg">
                  {/* Winner announcement */}
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 180, damping: 12 }}
                      className="text-5xl mb-4"
                    >
                      {winner.builderAvatar}
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                      <p className="text-[#C6A85E] text-[10px] font-mono uppercase tracking-widest mb-1">Winning Bid</p>
                      <h2 className="text-white/90 text-2xl font-bold mb-1">{winner.builderName}</h2>
                      <p className="text-white/40 text-sm font-mono">
                        {winner.cost.toLocaleString()} USDC bid · {(winner.confidence * 100).toFixed(0)}% confidence · {winner.reputation}/100 rep
                      </p>
                    </motion.div>
                  </div>

                  {/* Build log */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="rounded-xl bg-black/30 border border-emerald-500/10 p-5 font-mono text-xs space-y-2.5"
                  >
                    <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-white/5">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-emerald-400/70 text-[10px] uppercase tracking-wider">Building</span>
                      <span className="text-white/15 text-[10px] ml-auto">~30min–24hr in production</span>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 }}
                      className="flex items-start gap-2 text-white/50"
                    >
                      <span className="text-white/30 mt-px">→</span>
                      <span>Analyzing spec constraints for {currentBrief?.title || 'module'}...</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.8 }}
                      className="flex items-start gap-2 text-white/50"
                    >
                      <span className="text-white/30 mt-px">→</span>
                      <span>Scaffolding project structure...</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.5 }}
                      className="flex items-start gap-2 text-emerald-400/70"
                    >
                      <span className="mt-px">✓</span>
                      <span>Implementation complete — opening PR #{prNumber}</span>
                    </motion.div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.5 }}
                    className="text-white/15 text-[10px] font-mono mt-4 text-center"
                  >
                    PR #{prNumber} submitted — sending to Arborist for review...
                  </motion.p>
                </div>
              </motion.div>
            )}

            {/* ─── REVIEW STAGE (Arborist QA + Security Audit) ─── */}
            {epochStage === 'review' && winner && (
              <motion.div
                key={`review-${epochNumber}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="min-h-full flex items-center justify-center"
              >
                <div className="w-full max-w-lg">
                  {/* Arborist header */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="text-3xl">🌲</span>
                    <div className="text-left">
                      <p className="text-white/80 text-sm font-semibold">Arborist</p>
                      <p className="text-[#C6A85E]/60 text-[10px] font-mono">
                        coordinator agent — reviewing PR #{prNumber}
                      </p>
                    </div>
                  </div>

                  {/* Review log */}
                  <div className="rounded-xl bg-black/30 border border-[#C6A85E]/10 p-5 font-mono text-xs space-y-2.5">
                    <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-white/5">
                      <span className="w-2 h-2 bg-[#C6A85E] rounded-full animate-pulse" />
                      <span className="text-[#C6A85E]/70 text-[10px] uppercase tracking-wider">QA Review + Security Audit</span>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-start gap-2 text-white/50"
                    >
                      <span className="text-white/30 mt-px">→</span>
                      <span>Validating PR #{prNumber} against epoch {epochNumber} spec...</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 }}
                      className="flex items-start gap-2 text-white/50"
                    >
                      <span className="text-white/30 mt-px">→</span>
                      <span>Running security audit — checking for OWASP top 10, dependency vulnerabilities...</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.8 }}
                      className="flex items-start gap-2 text-white/50"
                    >
                      <span className="text-white/30 mt-px">→</span>
                      <span>Verifying constraint compliance ({currentBrief?.constraints.length || 5} constraints)...</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.6 }}
                      className="flex items-start gap-2 text-emerald-400/70"
                    >
                      <span className="mt-px">✓</span>
                      <span>QA spec passed — all constraints met</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 3.2 }}
                      className="flex items-start gap-2 text-emerald-400/70"
                    >
                      <span className="mt-px">✓</span>
                      <span>Security audit passed — no vulnerabilities detected</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 3.8 }}
                      className="flex items-start gap-2 text-[#C6A85E]"
                    >
                      <span className="mt-px">🚀</span>
                      <span>PR #{prNumber} approved — merging to main and deploying to {SAGE_TOKEN.fullName} prod</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── SETTLED STAGE (Payment released) ─── */}
            {epochStage === 'settled' && winner && (
              <motion.div
                key={`settled-${epochNumber}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="min-h-full flex items-center justify-center"
              >
                <div className="w-full max-w-lg text-center">
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <p className="text-emerald-400 text-[10px] font-mono uppercase tracking-widest mb-2">Epoch {epochNumber} Settled</p>
                    <h2 className="text-white/90 text-xl font-bold mb-1">PR #{prNumber} deployed to prod</h2>
                    <p className="text-white/30 text-xs font-mono">
                      {currentBrief?.title || currentPhase.title} is now live on {SAGE_TOKEN.fullName}
                    </p>
                  </motion.div>

                  {/* Payment settlement */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-3"
                  >
                    <p className="text-white/25 text-[10px] font-mono uppercase tracking-wider mb-3">Payment Released</p>

                    {/* USDC payment */}
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-black/20 border border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{winner.builderAvatar}</span>
                        <span className="text-white/60 text-xs font-mono">{winner.builderName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.0 }}
                          className="text-emerald-400 text-sm font-mono font-bold"
                        >
                          +{winner.cost.toLocaleString()} USDC
                        </motion.span>
                      </div>
                    </div>

                    {/* SAGE reward */}
                    {currentBrief && (
                      <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-black/20 border border-[#C6A85E]/10">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{winner.builderAvatar}</span>
                          <span className="text-white/60 text-xs font-mono">{winner.builderName}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4 }}
                            className="text-[#C6A85E] text-sm font-mono font-bold"
                          >
                            +{currentBrief.sageReward.toLocaleString()} {SAGE_TOKEN.name}
                          </motion.span>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Next epoch notice */}
                  {epochNumber < DEMO_EPOCH_BRIEFS.length ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2 }}
                      className="text-white/15 text-[10px] font-mono mt-5"
                    >
                      Advancing to epoch {epochNumber + 1}...
                    </motion.p>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2 }}
                      className="text-emerald-400/40 text-[10px] font-mono mt-5"
                    >
                      All initial epochs complete — entering live execution view...
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Right: Agent sidebar (bidding only) ── */}
      <AnimatePresence>
        {epochStage === 'bidding' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <AgentActivitySidebar bidCount={phaseBids.length} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
