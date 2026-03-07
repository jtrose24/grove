'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useVoteStore } from '@/lib/voteStore'
import { VOTE_IDEAS, EIGEN_REWARD } from '@/lib/voteData'
import EigenTicker from './EigenTicker'
import ProposalCard from './ProposalCard'
import VoteResultsScreen from './VoteResultsScreen'
import VoteSummaryScreen from './VoteSummaryScreen'

type Phase = 'voting' | 'results' | 'summary'

export default function VotingExperience() {
  const { currentIdeaIndex, votes, castVote, advanceIdea, markVotingComplete } = useVoteStore()
  const [phase, setPhase] = useState<Phase>(
    currentIdeaIndex >= VOTE_IDEAS.length ? 'summary' : 'voting'
  )
  const [floatingReward, setFloatingReward] = useState(false)

  const idea = VOTE_IDEAS[currentIdeaIndex]
  const hasVoted = idea ? !!votes[idea.id] : false

  const handleVote = useCallback((choice: 'A' | 'B') => {
    if (!idea || hasVoted) return
    const proposal = idea.proposals.find((p) => p.label === choice)!
    castVote(idea.id, choice, proposal.isWinner)

    if (proposal.isWinner) {
      setFloatingReward(true)
      setTimeout(() => setFloatingReward(false), 1200)
    }

    setTimeout(() => setPhase('results'), 1500)
  }, [idea, hasVoted, castVote])

  function handleNextIdea() {
    advanceIdea()
    if (currentIdeaIndex + 1 >= VOTE_IDEAS.length) {
      markVotingComplete()
      setPhase('summary')
    } else {
      setPhase('voting')
    }
  }

  return (
    <div className="min-h-screen bg-[#111110] flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-[#e8e6e3]/8 bg-[#1a1a19]/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#c4a862]">
              <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.9" />
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              <circle cx="12" cy="12" r="11.5" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
            </svg>
            <span className="text-[#e8e6e3] font-bold text-lg tracking-tight">Grove</span>
          </Link>
          <span className="text-[#e8e6e3]/20 text-sm">/</span>
          <span className="text-[#e8e6e3]/50 text-sm font-medium">Vote & Earn</span>
        </div>
        <EigenTicker />
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <AnimatePresence mode="wait">
          {phase === 'voting' && idea && (
            <motion.div
              key={`idea-${currentIdeaIndex}`}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-3xl relative"
            >
              {/* Floating reward */}
              <AnimatePresence>
                {floatingReward && (
                  <motion.div
                    initial={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
                    animate={{ opacity: 0, y: -100, scale: 1.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute top-0 left-1/2 z-50 text-[#c4a862] text-3xl font-bold font-mono pointer-events-none"
                  >
                    +{EIGEN_REWARD} EIGEN
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Agent header — compact */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8e6e3]/[0.04] border border-[#e8e6e3]/8 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#c4a862] animate-pulse" />
                  <span className="text-[#e8e6e3]/40 text-xs font-mono">{idea.category}</span>
                </div>
                <h1 className="text-3xl font-bold text-[#e8e6e3]/90 mb-2">{idea.agentName}</h1>
                <p className="text-[#e8e6e3]/30 text-sm max-w-lg mx-auto">{idea.agentDescription}</p>
              </div>

              {/* Question */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-center text-[#c4a862] text-lg font-bold mb-8"
              >
                {idea.question}
              </motion.p>

              {/* Visual choice cards */}
              <div className="grid grid-cols-2 gap-6">
                {idea.proposals.map((proposal, i) => (
                  <motion.div
                    key={proposal.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <ProposalCard
                      proposal={proposal}
                      voted={hasVoted}
                      isSelected={votes[idea.id] === proposal.label}
                      isDimmed={hasVoted && votes[idea.id] !== proposal.label}
                      onVote={() => handleVote(proposal.label)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-3 mt-10">
                {VOTE_IDEAS.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={i === currentIdeaIndex ? {
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    } : {}}
                    transition={i === currentIdeaIndex ? {
                      duration: 2,
                      repeat: Infinity,
                    } : {}}
                    className={`rounded-full transition-all ${
                      i < currentIdeaIndex ? 'w-3 h-3 bg-[#c4a862]' :
                      i === currentIdeaIndex ? 'w-3 h-3 bg-[#c4a862]/60' :
                      'w-2 h-2 bg-[#e8e6e3]/10'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'results' && idea && (
            <VoteResultsScreen
              key={`results-${currentIdeaIndex}`}
              idea={idea}
              onNext={handleNextIdea}
              isLast={currentIdeaIndex + 1 >= VOTE_IDEAS.length}
            />
          )}

          {phase === 'summary' && (
            <VoteSummaryScreen key="summary" />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
