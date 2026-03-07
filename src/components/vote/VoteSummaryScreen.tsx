'use client'
import { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useVoteStore } from '@/lib/voteStore'
import ConfettiEffect from './ConfettiEffect'

// Lifetime stats layered on top of session
const LIFETIME_VOTES = 272
const LIFETIME_ACCURACY = 76

export default function VoteSummaryScreen() {
  const { eigenBalance } = useVoteStore()
  const [showConfetti, setShowConfetti] = useState(false)

  const spring = useSpring(0, { stiffness: 40, damping: 15 })
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString())

  useEffect(() => {
    const t = setTimeout(() => {
      spring.set(eigenBalance)
      setShowConfetti(true)
    }, 400)
    return () => clearTimeout(t)
  }, [eigenBalance, spring])

  const shareText = `I've cast ${LIFETIME_VOTES} votes on Grove with ${LIFETIME_ACCURACY}% accuracy. Staking EIGEN and shaping which builders win. Think you can spot the winners?`
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto w-full text-center relative"
    >
      {showConfetti && <ConfettiEffect />}

      {/* Big EIGEN number */}
      <div className="mb-8">
        <p className="text-[#e8e6e3]/30 text-xs font-mono uppercase tracking-wider mb-3">Total EIGEN Balance</p>
        <motion.p className="text-5xl font-bold text-[#c4a862] font-mono mb-1">
          {display}
        </motion.p>
        <p className="text-[#c4a862]/40 text-sm font-mono">EIGEN</p>
      </div>

      {/* Lifetime scorecard */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-[#e8e6e3]/[0.03] rounded-2xl border border-[#e8e6e3]/8 p-5 mb-6"
      >
        <p className="text-[#e8e6e3]/25 text-[10px] font-mono uppercase tracking-wider mb-4">Lifetime Scorecard</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-2xl font-bold text-[#e8e6e3]/80 font-mono">{LIFETIME_VOTES}</p>
            <p className="text-[#e8e6e3]/25 text-[10px] font-mono mt-1">Total Votes</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#c4a862] font-mono">{LIFETIME_ACCURACY}%</p>
            <p className="text-[#e8e6e3]/25 text-[10px] font-mono mt-1">Accuracy</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#8a9a7b] font-mono">12</p>
            <p className="text-[#e8e6e3]/25 text-[10px] font-mono mt-1">Best Streak</p>
          </div>
        </div>
      </motion.div>

      {/* Top contributor banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="bg-[#c4a862]/[0.08] rounded-2xl border border-[#c4a862]/20 p-5 mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg className="w-4 h-4 text-[#c4a862]" viewBox="0 0 24 24" fill="none">
            <polygon points="12,2 22,12 12,22 2,12" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
          </svg>
          <p className="text-[#c4a862] text-sm font-bold">Top Echelon Contributor</p>
        </div>
        <p className="text-[#e8e6e3]/50 text-sm leading-relaxed mb-1">
          {LIFETIME_ACCURACY}% lifetime accuracy across {LIFETIME_VOTES} votes puts you in the <span className="text-[#c4a862] font-semibold">top 3%</span> of all Grove voters.
        </p>
        <p className="text-[#e8e6e3]/30 text-xs mt-2">
          You&apos;ve got great instincts — the builders are paying attention.
        </p>
      </motion.div>

      {/* Actions */}
      <div className="space-y-3">
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#c4a862] hover:bg-[#d4b872] text-[#111110] font-bold text-sm transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share & Challenge Friends
        </motion.a>

        <Link
          href="/"
          className="block text-[#e8e6e3]/20 text-xs hover:text-[#e8e6e3]/40 transition-colors mt-4"
        >
          Back to Grove
        </Link>
      </div>
    </motion.div>
  )
}
