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
    <div className="min-h-screen bg-[#111110] text-[#e8e6e3]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-[#e8e6e3]/8 bg-[#1a1a19]/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#c4a862]"><circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.9" /><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" opacity="0.3" /><circle cx="12" cy="12" r="11.5" stroke="currentColor" strokeWidth="0.5" opacity="0.12" /></svg>
            <span className="text-[#e8e6e3] font-bold text-lg tracking-tight">Grove</span>
          </Link>
          <span className="text-[#e8e6e3]/20 text-sm">/</span>
          <span className="text-[#e8e6e3]/50 text-sm font-medium">Explore</span>
        </div>
        <AuthButton />
      </nav>

      {/* Stats banner */}
      <div className="px-6 py-6 border-b border-[#e8e6e3]/5">
        <div className="max-w-6xl mx-auto flex items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6"
          >
            <div>
              <p className="text-2xl font-bold text-[#c4a862]">{stats.total}</p>
              <p className="text-[10px] text-[#e8e6e3]/30 uppercase tracking-wider">Agents launched</p>
            </div>
            <div className="w-px h-8 bg-[#e8e6e3]/8" />
            <div>
              <p className="text-2xl font-bold text-[#8a9a7b]">{stats.specsGenerated}</p>
              <p className="text-[10px] text-[#e8e6e3]/30 uppercase tracking-wider">In design</p>
            </div>
            <div className="w-px h-8 bg-[#e8e6e3]/8" />
            <div>
              <p className="text-2xl font-bold text-[#e8e6e3]/80">{stats.buildsInProgress}</p>
              <p className="text-[10px] text-[#e8e6e3]/30 uppercase tracking-wider">Building</p>
            </div>
            <div className="w-px h-8 bg-[#e8e6e3]/8" />
            <div>
              <p className="text-2xl font-bold text-[#8a9a7b]/80">{stats.settled}</p>
              <p className="text-[10px] text-[#e8e6e3]/30 uppercase tracking-wider">Live</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="px-6 py-4 border-b border-[#e8e6e3]/5">
        <div className="max-w-6xl mx-auto flex items-center gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.phase)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === tab.phase
                  ? 'bg-[#7b8a6e] text-[#c4a862] border border-[#c4a862]/30'
                  : 'text-[#e8e6e3]/40 hover:text-[#e8e6e3]/70 hover:bg-[#e8e6e3]/5'
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
            <p className="text-[#e8e6e3]/20 text-sm">No agents in this phase yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
