'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SeedIdea, IdeaPhase, getPlanterById } from '@/lib/seedData'

const PHASE_DOT_COLOR: Record<IdeaPhase, string> = {
  ideation: 'bg-[#e8e6e3]/15',
  'spec-gen': 'bg-[#c4a862]',
  bidding: 'bg-[#c4a862]',
  execution: 'bg-[#c4a862]',
  settled: 'bg-[#7b8a6e]',
}

const PHASE_LABEL: Record<IdeaPhase, string> = {
  ideation: 'Ideation',
  'spec-gen': 'Spec Gen',
  bidding: 'Bidding',
  execution: 'Execution',
  settled: 'Settled',
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return '1d ago'
  return `${days}d ago`
}

export default function IdeaCard({ idea, index }: { idea: SeedIdea; index: number }) {
  const planter = getPlanterById(idea.planterId)
  const bidCount = idea.bids
    ? Object.values(idea.bids).reduce((s, b) => s + b.length, 0)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
    >
      <Link
        href={`/idea/${idea.id}`}
        className="block bg-[#e8e6e3]/[0.03] border border-[#e8e6e3]/8 rounded-2xl p-5 hover:border-[#7b8a6e]/40 hover:bg-[#e8e6e3]/[0.05] transition-all group"
      >
        {/* Top row: category + phase */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono text-[#e8e6e3]/30 uppercase tracking-wider">{idea.category}</span>
          <span className="flex items-center gap-1 text-[10px] font-mono text-[#e8e6e3]/40">
            <span className={`w-1.5 h-1.5 rounded-full ${PHASE_DOT_COLOR[idea.phase]}`} />
            <span>{PHASE_LABEL[idea.phase]}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[#e8e6e3]/90 font-semibold text-sm leading-snug mb-2 group-hover:text-[#c4a862] transition-colors">
          {idea.title}
        </h3>

        {/* Description (2-line truncate) */}
        <p className="text-[#e8e6e3]/40 text-xs leading-relaxed line-clamp-2 mb-4">
          {idea.description}
        </p>

        {/* Planter + time */}
        <div className="flex items-center gap-2 mb-3">
          {planter && (
            <>
              <span className="w-6 h-6 rounded-full bg-[#7b8a6e]/15 flex items-center justify-center text-[9px] font-mono text-[#7b8a6e] font-bold">{planter.name.split(' ').map(n => n[0]).join('')}</span>
              <span className="text-[#e8e6e3]/50 text-xs">{planter.name}</span>
            </>
          )}
          <span className="text-[#e8e6e3]/20 text-[10px] ml-auto">{timeAgo(idea.plantedAt)}</span>
        </div>

        {/* Conditional footer */}
        <div className="pt-3 border-t border-[#e8e6e3]/5">
          {idea.phase === 'settled' && (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#8a9a7b] rounded-full" />
              <span className="text-[#8a9a7b]/80 text-[10px] font-mono">Completed</span>
              {idea.builderName && (
                <span className="text-[#e8e6e3]/25 text-[10px] font-mono ml-auto">by {idea.builderName}</span>
              )}
            </div>
          )}
          {idea.phase === 'execution' && idea.progress !== undefined && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[#e8e6e3]/30 text-[10px] font-mono">Building</span>
                <span className="text-[#c4a862]/70 text-[10px] font-mono">{idea.progress}%</span>
              </div>
              <div className="h-1 bg-[#e8e6e3]/8 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#7b8a6e] to-[#8a9a7b] rounded-full transition-all"
                  style={{ width: `${idea.progress}%` }}
                />
              </div>
            </div>
          )}
          {idea.phase === 'bidding' && (
            <div className="flex items-center gap-1.5">
              <span className="text-[#c4a862]/60 text-[10px] font-mono">{bidCount} bids</span>
              <span className="text-[#e8e6e3]/15 text-[10px]">·</span>
              <span className="text-[#e8e6e3]/25 text-[10px] font-mono">auction open</span>
            </div>
          )}
          {idea.phase === 'spec-gen' && (
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#c4a862] rounded-full animate-pulse" />
              <span className="text-[#e8e6e3]/30 text-[10px] font-mono">Spec generating...</span>
            </div>
          )}
          {idea.phase === 'ideation' && (
            <div className="flex items-center gap-1.5">
              <span className="text-[#e8e6e3]/25 text-[10px] font-mono">{idea.conversation.length} messages</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
