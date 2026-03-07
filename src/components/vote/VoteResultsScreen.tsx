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

  // Fake vote distribution
  const winnerPct = 58 + Math.floor(Math.random() * 15)
  const loserPct = 100 - winnerPct
  const totalVoters = 847 + Math.floor(Math.random() * 200)

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-lg mx-auto w-full"
    >
      {/* Result header */}
      <div className="text-center mb-8">
        {isCorrect ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="w-16 h-16 rounded-full bg-[#c4a862]/15 flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-2xl font-bold text-[#c4a862]">+{EIGEN_REWARD}</span>
            </motion.div>
            <h2 className="text-xl font-bold text-[#e8e6e3]/90 mb-1">Nice call!</h2>
            <p className="text-[#c4a862] text-sm font-mono">+{EIGEN_REWARD} EIGEN earned</p>
            {streakCount >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[#c4a862]/60 text-xs font-mono mt-1"
              >
                {streakCount} correct in a row!
              </motion.p>
            )}
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-[#e8e6e3]/[0.05] flex items-center justify-center mx-auto mb-4">
              <span className="text-[#e8e6e3]/30 text-xl">~</span>
            </div>
            <h2 className="text-xl font-bold text-[#e8e6e3]/90 mb-1">Good try!</h2>
            <p className="text-[#e8e6e3]/30 text-sm font-mono">No penalty — keep going</p>
          </>
        )}
      </div>

      {/* Winner reveal */}
      <div className="bg-[#e8e6e3]/[0.03] rounded-2xl border border-[#e8e6e3]/8 p-5 mb-6">
        <p className="text-[#e8e6e3]/25 text-[10px] font-mono uppercase tracking-wider mb-3">Selected builder</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#c4a862]/15 flex items-center justify-center text-[10px] font-mono text-[#c4a862] font-bold">
            {winner.builderName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-[#e8e6e3]/80 text-sm font-semibold">{winner.builderName}</p>
            <p className="text-[#e8e6e3]/25 text-[10px] font-mono">Proposal {winner.label}</p>
          </div>
        </div>

        {/* Vote distribution */}
        <div className="space-y-2">
          {idea.proposals.map((p) => {
            const pct = p.isWinner ? winnerPct : loserPct
            return (
              <div key={p.id}>
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="text-[#e8e6e3]/40">
                    {p.builderName}
                    {votes[idea.id] === p.label && (
                      <span className="text-[#c4a862]/50 ml-1">your vote</span>
                    )}
                  </span>
                  <span className="text-[#e8e6e3]/50">{pct}%</span>
                </div>
                <div className="h-1.5 bg-[#e8e6e3]/8 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
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
      </div>

      {/* Next button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full py-3 rounded-xl bg-[#c4a862] hover:bg-[#d4b872] text-[#111110] font-bold text-sm transition-colors"
      >
        {isLast ? 'See Your Results' : 'Next Idea'}
      </motion.button>
    </motion.div>
  )
}
