'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SeedIdea, IdeaPhase, getPlanterById } from '@/lib/seedData'
import AuthButton from '@/components/AuthButton'
import ShareButton from '@/components/ShareButton'
import IdeaSpecView from '@/components/IdeaSpecView'
import IdeaBidList from '@/components/IdeaBidList'
import IdeaMetrics from '@/components/IdeaMetrics'

const PHASE_EMOJI: Record<IdeaPhase, string> = {
  ideation: '🌱',
  'spec-gen': '🌿',
  bidding: '🌳',
  execution: '🍂',
  settled: '✅',
}

const PHASE_LABEL: Record<IdeaPhase, string> = {
  ideation: 'Ideation',
  'spec-gen': 'Spec Generation',
  bidding: 'Bidding',
  execution: 'Execution',
  settled: 'Settled',
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}

export default function IdeaPageClient({ idea }: { idea: SeedIdea }) {
  const planter = getPlanterById(idea.planterId)

  return (
    <div className="min-h-screen bg-[#060f0b] text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-white/8 bg-[#0E2F24]/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-xl">🌲</span>
            <span className="text-white font-bold text-lg tracking-tight">Grove</span>
          </Link>
          <span className="text-white/20 text-sm">/</span>
          <Link href="/explore" className="text-white/50 text-sm font-medium hover:text-white/80 transition-colors">
            Explore
          </Link>
          <span className="text-white/20 text-sm">/</span>
          <span className="text-white/30 text-sm truncate max-w-[200px]">{idea.title}</span>
        </div>
        <AuthButton />
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
        {/* Planter attribution banner */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-3 rounded-xl bg-[#1F5A45]/20 border border-[#C6A85E]/20 flex items-center gap-3"
        >
          {planter && <span className="text-2xl">{planter.avatar}</span>}
          <div className="flex-1 min-w-0">
            {planter && (
              <p className="text-white/80 text-xs font-semibold">
                {planter.name}
                <span className="text-white/40 font-normal ml-1">@{planter.handle}</span>
              </p>
            )}
            <p className="text-white/30 text-[10px] font-mono">
              Planted {timeAgo(idea.plantedAt)}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span>{PHASE_EMOJI[idea.phase]}</span>
            <span className="text-white/40">{PHASE_LABEL[idea.phase]}</span>
          </div>
        </motion.div>

        {/* Title + Description */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">{idea.category}</span>
          <h1 className="text-2xl font-bold text-white/95 mt-1 mb-3">{idea.title}</h1>
          <p className="text-white/50 text-sm leading-relaxed">{idea.description}</p>
        </motion.div>

        {/* Conversation */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <span className="text-[#C6A85E] text-xs font-mono font-bold uppercase tracking-wider">Conversation</span>
          <div className="space-y-3">
            {idea.conversation.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#1F5A45] flex items-center justify-center text-sm mr-2 mt-1 flex-shrink-0">
                    🌿
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#C6A85E] text-[#0E2F24] font-medium rounded-br-sm'
                    : 'bg-white/8 text-white/90 rounded-bl-sm border border-white/10'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Spec (spec-gen+) */}
        {['spec-gen', 'bidding', 'execution', 'settled'].includes(idea.phase) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <IdeaSpecView spec={idea.spec} specPhases={idea.specPhases} />
          </motion.div>
        )}

        {/* Bids (bidding+) */}
        {['bidding', 'execution', 'settled'].includes(idea.phase) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <IdeaBidList bids={idea.bids} selectedBids={idea.selectedBids} />
          </motion.div>
        )}

        {/* Metrics (execution+) */}
        {['execution', 'settled'].includes(idea.phase) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <IdeaMetrics
              metrics={idea.metrics}
              progress={idea.progress}
              builderName={idea.builderName}
            />
          </motion.div>
        )}

        {/* Share */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-4 border-t border-white/5 flex items-center justify-between"
        >
          <ShareButton title={idea.title} description={idea.description} ideaId={idea.id} />
          <Link
            href="/explore"
            className="text-white/30 text-xs hover:text-white/60 transition-colors"
          >
            ← Back to Explore
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
