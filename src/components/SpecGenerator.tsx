'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGroveStore, WorkItem, SpecPhase } from '@/lib/store'
import { parseSpecPhases } from '@/lib/mockData'
import { DEMO_SPEC_TEXT, DEMO_SPEC_PHASES } from '@/lib/demoData'
import SpecFeedbackChat from './SpecFeedbackChat'

interface Props {
  isDemo?: boolean
}

function WorkItemRow({ item }: { item: WorkItem }) {
  return (
    <div className="flex items-start gap-3 py-2 px-3 rounded-lg bg-black/20 border border-[#e8e6e3]/5 hover:border-[#e8e6e3]/10 transition-colors">
      <div className="flex-shrink-0 mt-0.5">
        <div className={`w-2 h-2 rounded-full mt-1 ${
          item.status === 'done' ? 'bg-[#8a9a7b]' :
          item.status === 'active' ? 'bg-[#c4a862] animate-pulse' :
          'bg-[#e8e6e3]/20'
        }`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <code className="text-[#c4a862] text-xs font-mono font-bold">{item.title}</code>
          <span className="text-[#e8e6e3]/20 text-[10px] font-mono">{item.epochs}ep</span>
          {item.deps && item.deps.length > 0 && (
            <span className="text-[#e8e6e3]/15 text-[10px] font-mono">
              deps: [{item.deps.join(', ')}]
            </span>
          )}
        </div>
        <p className="text-[#e8e6e3]/45 text-[11px] font-mono leading-relaxed">{item.tech}</p>
      </div>
    </div>
  )
}

function PhaseAccordion({ phase, index, specProgress }: {
  phase: SpecPhase
  index: number
  specProgress: number
}) {
  const [open, setOpen] = useState(false)
  const isVisible = specProgress > 0.2 + index * 0.2

  const totalEpochs = phase.workItems?.reduce((s, w) => s + w.epochs, 0) || 0
  const itemCount = phase.workItems?.length || 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: isVisible ? 1 : 0.15, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border border-[#e8e6e3]/8 rounded-xl overflow-hidden bg-[#e8e6e3]/[0.02]"
    >
      {/* Header */}
      <button
        onClick={() => isVisible && setOpen(!open)}
        disabled={!isVisible}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#e8e6e3]/[0.03] transition-colors"
      >
        {/* Chevron */}
        <motion.svg
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.15 }}
          className="w-3 h-3 text-[#e8e6e3]/30 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </motion.svg>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[#e8e6e3]/25 text-[10px] font-mono font-bold">P{phase.number}</span>
            <span className="text-[#e8e6e3]/80 text-xs font-semibold truncate">{phase.title}</span>
          </div>
          <p className="text-[#e8e6e3]/30 text-[10px] font-mono mt-0.5 truncate">{phase.description}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <p className="text-[#e8e6e3]/50 text-[10px] font-mono">{itemCount} items</p>
            <p className="text-[#c4a862]/60 text-[10px] font-mono">{totalEpochs} epochs</p>
          </div>
        </div>
      </button>

      {/* Expandable body */}
      <AnimatePresence>
        {open && phase.workItems && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2 border-t border-[#e8e6e3]/5 pt-3">
              {/* Column headers */}
              <div className="flex items-center gap-3 px-3 text-[10px] font-mono text-[#e8e6e3]/20 uppercase tracking-wider">
                <span className="w-2" />
                <span className="flex-1">module</span>
                <span>epochs</span>
              </div>

              {phase.workItems.map((item) => (
                <WorkItemRow key={item.id} item={item} />
              ))}

              {/* Dependency graph hint */}
              <div className="mt-2 pt-2 border-t border-[#e8e6e3]/5 flex items-center gap-2 px-3">
                <svg className="w-3 h-3 text-[#e8e6e3]/20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-[#e8e6e3]/20 text-[10px] font-mono">
                  critical path: {totalEpochs - Math.floor(totalEpochs * 0.3)} epochs (parallelizable: ~{Math.floor(totalEpochs * 0.3)}ep)
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function SpecGenerator({ isDemo }: Props) {
  const { idea, messages, setSpec, setSpecPhases, setPhase, spec, specPhases } = useGroveStore()
  const [streaming, setStreaming] = useState(false)
  const [done, setDone] = useState(false)
  const specRef = useRef('')
  const containerRef = useRef<HTMLDivElement>(null)

  const specProgress = done ? 1 : spec.length / (DEMO_SPEC_TEXT.length || 1000)

  useEffect(() => {
    if (isDemo) {
      runDemoSpec()
    } else {
      generate()
    }
  }, [])

  async function runDemoSpec() {
    setStreaming(true)
    const text = DEMO_SPEC_TEXT
    for (let i = 0; i <= text.length; i += 4) {
      await new Promise((r) => setTimeout(r, 18))
      const chunk = text.slice(0, i)
      specRef.current = chunk
      useGroveStore.setState({ spec: chunk })
      containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
    }
    useGroveStore.setState({ spec: text })
    setSpecPhases(DEMO_SPEC_PHASES)
    setStreaming(false)
    setDone(true)
  }

  async function generate() {
    setStreaming(true)
    const res = await fetch('/api/generate-spec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea, messages: messages.map((m) => ({ role: m.role, content: m.content })) }),
    })

    const reader = res.body!.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done: d, value } = await reader.read()
      if (d) break
      specRef.current += decoder.decode(value)
      useGroveStore.setState({ spec: specRef.current })
      containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
    }

    const phases = parseSpecPhases(specRef.current)
    setSpecPhases(phases)
    setStreaming(false)
    setDone(true)
  }

  const totalEpochs = (isDemo ? DEMO_SPEC_PHASES : specPhases).reduce(
    (s, p) => s + (p.workItems?.reduce((ws, w) => ws + w.epochs, 0) || 0), 0
  )
  const totalItems = (isDemo ? DEMO_SPEC_PHASES : specPhases).reduce(
    (s, p) => s + (p.workItems?.length || 0), 0
  )

  const displayPhases = done ? (isDemo ? DEMO_SPEC_PHASES : specPhases) : DEMO_SPEC_PHASES

  return (
    <div className="flex h-full gap-4 p-4 relative">
      <SpecFeedbackChat isDemo={isDemo} />
      {/* Left: Spec stream */}
      <div className="w-[45%] flex flex-col min-w-0 flex-shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#c4a862] text-xs font-mono font-bold uppercase tracking-wider">spec::output</span>
          {streaming && (
            <span className="flex gap-1 ml-1">
              <span className="w-1 h-1 bg-[#c4a862] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-1 bg-[#c4a862] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-1 bg-[#c4a862] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          )}
          {isDemo && (
            <span className="ml-auto text-[#e8e6e3]/15 text-[10px] font-mono">arborist → openclaw</span>
          )}
        </div>

        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto bg-black/30 rounded-xl border border-[#e8e6e3]/8 p-4 text-xs text-[#e8e6e3]/60 leading-relaxed font-mono whitespace-pre-wrap"
        >
          {spec || <span className="text-[#e8e6e3]/20">awaiting spec generation...</span>}
          {streaming && <span className="inline-block w-1.5 h-3.5 bg-[#c4a862] ml-0.5 animate-pulse align-middle" />}
        </div>

        <AnimatePresence>
          {done && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setPhase('bidding')}
              className="mt-3 w-full py-3 rounded-xl bg-[#c4a862] hover:bg-[#d4b872] text-[#111110] font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              Open Grove Auction — Start the Bidding
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Right: Phase breakdown with expandable work items */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#c4a862] text-xs font-mono font-bold uppercase tracking-wider">phases</span>
          {done && (
            <div className="flex items-center gap-4 text-[10px] font-mono text-[#e8e6e3]/30">
              <span>{displayPhases.length} phases</span>
              <span>{totalItems} work items</span>
              <span>{totalEpochs} total epochs</span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {displayPhases.map((phase, i) => (
            <PhaseAccordion
              key={phase.id}
              phase={phase}
              index={i}
              specProgress={specProgress}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
