'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { VoteOption } from '@/lib/voteData'
import ConfettiEffect from './ConfettiEffect'

interface Props {
  proposal: VoteOption
  voted: boolean
  isSelected: boolean
  isDimmed: boolean
  onVote: () => void
}

export default function ProposalCard({ proposal, voted, isSelected, isDimmed, onVote }: Props) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [pressed, setPressed] = useState(false)

  function handleVote() {
    setPressed(true)
    onVote()
    if (proposal.isWinner) {
      setShowConfetti(true)
    }
  }

  return (
    <motion.button
      disabled={voted}
      onClick={handleVote}
      whileHover={!voted ? { scale: 1.03, y: -4 } : {}}
      whileTap={!voted ? { scale: 0.97 } : {}}
      animate={
        voted && isSelected && !proposal.isWinner
          ? { x: [0, -12, 12, -8, 8, -4, 4, 0] }
          : voted && isSelected && proposal.isWinner
          ? { scale: [1, 1.05, 1] }
          : {}
      }
      transition={
        voted && isSelected && !proposal.isWinner
          ? { duration: 0.5 }
          : voted && isSelected && proposal.isWinner
          ? { duration: 0.4, delay: 0.1 }
          : { type: 'spring', stiffness: 400, damping: 25 }
      }
      className={`relative flex flex-col items-center rounded-3xl border-2 p-8 transition-all duration-300 cursor-pointer group ${
        isDimmed
          ? 'opacity-30 border-[#e8e6e3]/5 bg-[#e8e6e3]/[0.02] cursor-default'
          : isSelected && proposal.isWinner
          ? 'border-[#c4a862] bg-[#c4a862]/[0.08] shadow-lg shadow-[#c4a862]/20'
          : isSelected && !proposal.isWinner
          ? 'border-red-500/40 bg-red-500/[0.05]'
          : 'border-[#e8e6e3]/10 bg-[#e8e6e3]/[0.03] hover:border-[#c4a862]/50 hover:bg-[#c4a862]/[0.04] hover:shadow-xl hover:shadow-[#c4a862]/10'
      }`}
    >
      {showConfetti && <ConfettiEffect />}

      {/* Giant emoji / visual */}
      <motion.div
        animate={!voted ? {
          y: [0, -6, 0],
          rotate: [0, -3, 3, 0],
        } : {}}
        transition={!voted ? {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        } : {}}
        className="text-8xl mb-6 select-none"
      >
        {proposal.image}
      </motion.div>

      {/* Title */}
      <h3 className={`text-2xl font-bold mb-3 transition-colors ${
        isSelected && proposal.isWinner ? 'text-[#c4a862]' :
        isSelected && !proposal.isWinner ? 'text-red-400/70' :
        'text-[#e8e6e3]/90 group-hover:text-[#c4a862]'
      }`}>
        {proposal.title}
      </h3>

      {/* Tagline */}
      <p className={`text-sm leading-relaxed text-center max-w-xs mb-6 ${
        isDimmed ? 'text-[#e8e6e3]/20' : 'text-[#e8e6e3]/50'
      }`}>
        {proposal.tagline}
      </p>

      {/* Vote area */}
      {!voted ? (
        <div className={`w-full py-4 rounded-2xl text-center font-bold text-lg transition-all ${
          pressed
            ? 'bg-[#c4a862] text-[#111110] scale-95'
            : 'bg-[#c4a862]/10 border border-[#c4a862]/25 text-[#c4a862] group-hover:bg-[#c4a862]/20 group-hover:border-[#c4a862]/50'
        }`}>
          Pick this one
        </div>
      ) : isSelected ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`w-full py-4 rounded-2xl text-center font-bold text-lg ${
            proposal.isWinner
              ? 'bg-[#c4a862]/20 text-[#c4a862]'
              : 'bg-red-500/10 text-red-400/60'
          }`}
        >
          {proposal.isWinner ? 'Nailed it!' : 'Not this time'}
        </motion.div>
      ) : null}

      {/* Winner badge */}
      {voted && proposal.isWinner && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          className="absolute -top-3 -right-3 px-4 py-1.5 rounded-full bg-[#c4a862] text-[#111110] text-xs font-mono font-bold shadow-lg shadow-[#c4a862]/30"
        >
          WINNER
        </motion.div>
      )}
    </motion.button>
  )
}
