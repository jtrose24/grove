'use client'
import { useEffect, useRef } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useVoteStore } from '@/lib/voteStore'

export default function EigenTicker() {
  const eigenBalance = useVoteStore((s) => s.eigenBalance)
  const streakCount = useVoteStore((s) => s.streakCount)
  const prevBalance = useRef(eigenBalance)
  const spring = useSpring(eigenBalance, { stiffness: 60, damping: 18 })
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString())
  const justEarned = eigenBalance > prevBalance.current

  useEffect(() => {
    spring.set(eigenBalance)
    prevBalance.current = eigenBalance
  }, [eigenBalance, spring])

  return (
    <div className="flex items-center gap-3">
      {/* Streak */}
      {streakCount > 0 && (
        <motion.div
          key={streakCount}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          className={`px-2 py-1 rounded-full text-[10px] font-mono font-bold ${
            streakCount >= 3 ? 'bg-[#c4a862]/20 text-[#c4a862]' :
            streakCount >= 2 ? 'bg-[#c4a862]/15 text-[#c4a862]/80' :
            'bg-[#7b8a6e]/15 text-[#8a9a7b]'
          }`}
        >
          {streakCount} in a row
        </motion.div>
      )}

      {/* EIGEN balance */}
      <motion.div
        animate={justEarned ? {
          boxShadow: ['0 0 0px rgba(196,168,98,0)', '0 0 20px rgba(196,168,98,0.3)', '0 0 0px rgba(196,168,98,0)'],
        } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c4a862]/10 border border-[#c4a862]/20"
      >
        <svg className="w-4 h-4 text-[#c4a862]" viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 22,12 12,22 2,12" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
          <polygon points="12,6 18,12 12,18 6,12" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.2" />
        </svg>
        <motion.span className="text-[#c4a862] text-sm font-bold font-mono">
          {display}
        </motion.span>
        <span className="text-[#c4a862]/50 text-[10px] font-mono">EIGEN</span>
      </motion.div>
    </div>
  )
}
