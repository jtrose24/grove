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

    // Delay before showing results
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
              className="w-full max-w-4xl relative"
            >
              {/* Floating reward */}
              <AnimatePresence>
                {floatingReward && (
                  <motion.div
                    initial={{ opacity: 1, y: 0, x: '-50%' }}
                    animate={{ opacity: 0, y: -80 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute top-0 left-1/2 z-50 text-[#c4a862] text-2xl font-bold font-mono pointer-events-none"
                  >
                    +{EIGEN_REWARD} EIGEN
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Idea header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-[#e8e6e3]/[0.05] text-[#e8e6e3]/30 text-[10px] font-mono">
                    {idea.category}
                  </span>
                  <span className="text-[#e8e6e3]/10 text-[10px]">|</span>
                  <span className="text-[#e8e6e3]/25 text-[10px] font-mono">
                    planted by {idea.planterName}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-[#e8e6e3]/90 mb-3">{idea.title}</h1>
                <p className="text-[#e8e6e3]/40 text-sm max-w-2xl mx-auto leading-relaxed">{idea.description}</p>
              </div>

              {/* Which builder should win? */}
              <p className="text-center text-[#c4a862] text-xs font-mono font-bold uppercase tracking-wider mb-6">
                Which approach should win?
              </p>

              {/* Proposals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {idea.proposals.map((proposal) => (
                  <ProposalCard
                    key={proposal.id}
                    proposal={proposal}
                    voted={hasVoted}
                    isSelected={votes[idea.id] === proposal.label}
                    isDimmed={hasVoted && votes[idea.id] !== proposal.label}
                    onVote={() => handleVote(proposal.label)}
                  />
                ))}
              </div>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {VOTE_IDEAS.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={i === currentIdeaIndex ? {
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6],
                    } : {}}
                    transition={i === currentIdeaIndex ? {
                      duration: 2,
                      repeat: Infinity,
                    } : {}}
                    className={`w-2 h-2 rounded-full ${
                      i < currentIdeaIndex ? 'bg-[#c4a862]' :
                      i === currentIdeaIndex ? 'bg-[#c4a862]/60' :
                      'bg-[#e8e6e3]/10'
                    }`}
                  />
                ))}
                <span className="text-[#e8e6e3]/15 text-[10px] font-mono ml-2">
                  {currentIdeaIndex + 1} of {VOTE_IDEAS.length}
                </span>
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
