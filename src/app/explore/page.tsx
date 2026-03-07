'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SEED_IDEAS, getIdeasByPhase, getAggregateStats, IdeaPhase } from '@/lib/seedData'
import IdeaCard from '@/components/IdeaCard'
import AuthButton from '@/components/AuthButton'

const TABS: { label: string; phase?: IdeaPhase }[] = [
  { label: 'All' },
  { label: 'Ideation', phase: 'ideation' },
  { label: 'Spec', phase: 'spec-gen' },
  { label: 'Bidding', phase: 'bidding' },
  { label: 'Execution', phase: 'execution' },
  { label: 'Settled', phase: 'settled' },
]

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<IdeaPhase | undefined>(undefined)
  const stats = getAggregateStats()
  const ideas = activeTab ? getIdeasByPhase(activeTab) : SEED_IDEAS

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
          <span className="text-white/50 text-sm font-medium">Explore</span>
        </div>
        <AuthButton />
      </nav>

      {/* Stats banner */}
      <div className="px-6 py-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6"
          >
            <div>
              <p className="text-2xl font-bold text-[#C6A85E]">{stats.total}</p>
              <p className="text-[10px] text-white/30 uppercase tracking-wider">Ideas planted</p>
            </div>
            <div className="w-px h-8 bg-white/8" />
            <div>
              <p className="text-2xl font-bold text-emerald-400">{stats.specsGenerated}</p>
              <p className="text-[10px] text-white/30 uppercase tracking-wider">Specs generated</p>
            </div>
            <div className="w-px h-8 bg-white/8" />
            <div>
              <p className="text-2xl font-bold text-white/80">{stats.buildsInProgress}</p>
              <p className="text-[10px] text-white/30 uppercase tracking-wider">Builds active</p>
            </div>
            <div className="w-px h-8 bg-white/8" />
            <div>
              <p className="text-2xl font-bold text-emerald-400/80">{stats.settled}</p>
              <p className="text-[10px] text-white/30 uppercase tracking-wider">Settled</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="px-6 py-4 border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.phase)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === tab.phase
                  ? 'bg-[#1F5A45] text-[#C6A85E] border border-[#C6A85E]/30'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}
            >
              {tab.label}
              {tab.phase && (
                <span className="ml-1 text-[10px] opacity-50">
                  {getIdeasByPhase(tab.phase).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ideas.map((idea, i) => (
            <IdeaCard key={idea.id} idea={idea} index={i} />
          ))}
        </div>

        {ideas.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/20 text-sm">No ideas in this phase yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
