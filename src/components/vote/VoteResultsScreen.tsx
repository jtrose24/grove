'use client'
import { motion } from 'framer-motion'
import { VoteIdea, EIGEN_REWARD } from '@/lib/voteData'
import { useVoteStore } from '@/lib/voteStore'

interface Props {
  idea: VoteIdea
  onNext: () => void
  isLast: boolean
}

export default function VoteResultsScreen({ idea, onNext, isLast }: Props) {
  const votes = useVoteStore((s) => s.votes)
  const streakCount = useVoteStore((s) => s.streakCount)
  const userChoice = votes[idea.id]
  const winner = idea.proposals.find((p) => p.isWinner)!
  const isCorrect = userChoice === winner.label

  const winnerPct = 58 + Math.floor(Math.random() * 15)
  const loserPct = 100 - winnerPct
  const totalVoters = 847 + Math.floor(Math.random() * 200)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-md mx-auto w-full"
    >
      {/* Result header */}
      <div className="text-center mb-8">
        {isCorrect ? (
          <>
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="text-7xl mb-4"
            >
              {winner.image}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-[#e8e6e3]/90 mb-2"
            >
              You called it!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[#c4a862] text-lg font-mono font-bold"
            >
              +{EIGEN_REWARD} EIGEN
            </motion.p>
            {streakCount >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-[#c4a862]/50 text-sm font-mono mt-1"
              >
                {streakCount} correct in a row
              </motion.p>
            )}
          </>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="text-6xl mb-4 opacity-40"
            >
              {winner.image}
            </motion.div>
            <h2 className="text-2xl font-bold text-[#e8e6e3]/90 mb-2">Close one!</h2>
            <p className="text-[#e8e6e3]/30 text-sm font-mono">No penalty — keep going</p>
          </>
        )}
      </div>

      {/* Winner reveal */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#e8e6e3]/[0.03] rounded-2xl border border-[#e8e6e3]/8 p-5 mb-6"
      >
        <p className="text-[#e8e6e3]/25 text-[10px] font-mono uppercase tracking-wider mb-3">Community chose</p>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{winner.image}</span>
          <div>
            <p className="text-[#e8e6e3]/80 text-lg font-bold">{winner.title}</p>
            <p className="text-[#e8e6e3]/30 text-xs">{idea.agentName}</p>
          </div>
        </div>

        {/* Vote distribution */}
        <div className="space-y-2">
          {idea.proposals.map((p) => {
            const pct = p.isWinner ? winnerPct : loserPct
            return (
              <div key={p.id}>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-[#e8e6e3]/40 flex items-center gap-2">
                    <span className="text-lg">{p.image}</span>
                    {p.title}
                    {votes[idea.id] === p.label && (
                      <span className="text-[#c4a862]/50 text-[10px]">your pick</span>
                    )}
                  </span>
                  <span className="text-[#e8e6e3]/60 font-bold">{pct}%</span>
                </div>
                <div className="h-2 bg-[#e8e6e3]/8 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className={`h-full rounded-full ${
                      p.isWinner ? 'bg-[#c4a862]' : 'bg-[#e8e6e3]/20'
                    }`}
                  />
                </div>
              </div>
            )
          })}
          <p className="text-[#e8e6e3]/15 text-[10px] font-mono text-right mt-1">{totalVoters.toLocaleString()} voters</p>
        </div>
      </motion.div>

      {/* Next button */}
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full py-4 rounded-2xl bg-[#c4a862] hover:bg-[#d4b872] text-[#111110] font-bold text-base transition-colors"
      >
        {isLast ? 'See Your Results' : 'Next Agent'}
      </motion.button>
    </motion.div>
  )
}
