'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SeedIdea, IdeaPhase, getPlanterById } from '@/lib/seedData'

const PHASE_EMOJI: Record<IdeaPhase, string> = {
  ideation: '🌱',
  'spec-gen': '🌿',
  bidding: '🌳',
  execution: '🍂',
  settled: '✅',
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
        className="block bg-white/[0.03] border border-white/8 rounded-2xl p-5 hover:border-[#1F5A45]/40 hover:bg-white/[0.05] transition-all group"
      >
        {/* Top row: category + phase */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">{idea.category}</span>
          <span className="flex items-center gap-1 text-[10px] font-mono text-white/40">
            <span>{PHASE_EMOJI[idea.phase]}</span>
            <span>{PHASE_LABEL[idea.phase]}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white/90 font-semibold text-sm leading-snug mb-2 group-hover:text-[#C6A85E] transition-colors">
          {idea.title}
        </h3>

        {/* Description (2-line truncate) */}
        <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mb-4">
          {idea.description}
        </p>

        {/* Planter + time */}
        <div className="flex items-center gap-2 mb-3">
          {planter && (
            <>
              <span className="text-sm">{planter.avatar}</span>
              <span className="text-white/50 text-xs">{planter.name}</span>
            </>
          )}
          <span className="text-white/20 text-[10px] ml-auto">{timeAgo(idea.plantedAt)}</span>
        </div>

        {/* Conditional footer */}
        <div className="pt-3 border-t border-white/5">
          {idea.phase === 'settled' && (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <span className="text-emerald-400/80 text-[10px] font-mono">Completed</span>
              {idea.builderName && (
                <span className="text-white/25 text-[10px] font-mono ml-auto">by {idea.builderName}</span>
              )}
            </div>
          )}
          {idea.phase === 'execution' && idea.progress !== undefined && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-white/30 text-[10px] font-mono">Building</span>
                <span className="text-[#C6A85E]/70 text-[10px] font-mono">{idea.progress}%</span>
              </div>
              <div className="h-1 bg-white/8 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#1F5A45] to-emerald-500 rounded-full transition-all"
                  style={{ width: `${idea.progress}%` }}
                />
              </div>
            </div>
          )}
          {idea.phase === 'bidding' && (
            <div className="flex items-center gap-1.5">
              <span className="text-[#C6A85E]/60 text-[10px] font-mono">{bidCount} bids</span>
              <span className="text-white/15 text-[10px]">·</span>
              <span className="text-white/25 text-[10px] font-mono">auction open</span>
            </div>
          )}
          {idea.phase === 'spec-gen' && (
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#C6A85E] rounded-full animate-pulse" />
              <span className="text-white/30 text-[10px] font-mono">Spec generating...</span>
            </div>
          )}
          {idea.phase === 'ideation' && (
            <div className="flex items-center gap-1.5">
              <span className="text-white/25 text-[10px] font-mono">{idea.conversation.length} messages</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
