'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { VoteProposal } from '@/lib/voteData'
import ConfettiEffect from './ConfettiEffect'

interface Props {
  proposal: VoteProposal
  voted: boolean
  isSelected: boolean
  isDimmed: boolean
  onVote: () => void
}

function ReputationDots({ score }: { score: number }) {
  const filled = Math.round((score / 100) * 5)
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i < filled ? 'bg-[#c4a862]' : 'bg-[#e8e6e3]/10'
          }`}
        />
      ))}
    </div>
  )
}

export default function ProposalCard({ proposal, voted, isSelected, isDimmed, onVote }: Props) {
  const [showConfetti, setShowConfetti] = useState(false)

  function handleVote() {
    onVote()
    if (proposal.isWinner) {
      setShowConfetti(true)
    }
  }

  return (
    <motion.div
      animate={
        voted && isSelected && !proposal.isWinner
          ? { x: [0, -8, 8, -6, 6, -3, 3, 0] }
          : voted && isSelected
          ? { borderColor: 'rgba(196,168,98,0.5)' }
          : {}
      }
      transition={
        voted && isSelected && !proposal.isWinner
          ? { duration: 0.5 }
          : { duration: 0.3 }
      }
      className={`relative flex flex-col rounded-2xl border p-5 transition-all duration-300 ${
        isDimmed
          ? 'opacity-40 border-[#e8e6e3]/5 bg-[#e8e6e3]/[0.02]'
          : isSelected && proposal.isWinner
          ? 'border-[#c4a862]/40 bg-[#c4a862]/[0.06]'
          : isSelected && !proposal.isWinner
          ? 'border-red-500/30 bg-red-500/[0.04]'
          : 'border-[#e8e6e3]/10 bg-[#e8e6e3]/[0.03] hover:border-[#c4a862]/30 hover:bg-[#e8e6e3]/[0.05]'
      }`}
    >
      {showConfetti && <ConfettiEffect />}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#7b8a6e]/15 flex items-center justify-center text-[10px] font-mono text-[#7b8a6e] font-bold">
            {proposal.builderName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-[#e8e6e3]/80 text-sm font-semibold">{proposal.builderName}</p>
            <div className="flex items-center gap-2">
              <ReputationDots score={proposal.reputation} />
              <span className="text-[#e8e6e3]/20 text-[10px] font-mono">{proposal.reputation}/100</span>
            </div>
          </div>
        </div>
        <span className="text-[#c4a862]/40 text-2xl font-bold font-mono">{proposal.label}</span>
      </div>

      {/* Approach */}
      <p className="text-[#e8e6e3]/55 text-sm leading-relaxed mb-4 flex-1">{proposal.approach}</p>

      {/* Tech + Timeline */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="px-2 py-0.5 rounded-full bg-[#e8e6e3]/[0.05] text-[#e8e6e3]/30 text-[10px] font-mono">{proposal.techStack}</span>
      </div>
      <div className="flex items-center gap-4 text-[10px] font-mono text-[#e8e6e3]/25 mb-5">
        <span>{proposal.timeline}</span>
      </div>

      {/* Vote button */}
      {!voted ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleVote}
          className="w-full py-3 rounded-xl bg-[#c4a862]/10 border border-[#c4a862]/20 text-[#c4a862] font-bold text-sm hover:bg-[#c4a862]/20 hover:border-[#c4a862]/40 transition-all"
        >
          Vote for {proposal.label}
        </motion.button>
      ) : isSelected ? (
        <div className={`w-full py-3 rounded-xl text-center font-bold text-sm ${
          proposal.isWinner
            ? 'bg-[#7b8a6e]/15 text-[#8a9a7b] border border-[#7b8a6e]/20'
            : 'bg-red-500/10 text-red-400/60 border border-red-500/15'
        }`}>
          {proposal.isWinner ? 'You voted correctly!' : 'Not the winner'}
        </div>
      ) : (
        <div className="w-full py-3 rounded-xl text-center text-[#e8e6e3]/15 text-sm font-mono">
          —
        </div>
      )}

      {/* Winner badge */}
      {voted && proposal.isWinner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[#c4a862] text-[#111110] text-[10px] font-mono font-bold"
        >
          WINNER
        </motion.div>
      )}
    </motion.div>
  )
}
