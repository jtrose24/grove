'use client'
import Link from 'next/link'
import { useGroveStore, AppPhase } from '@/lib/store'
import AuthButton from './AuthButton'

const STEPS: { phase: AppPhase; label: string; emoji: string }[] = [
  { phase: 'ideation', label: 'Plant', emoji: '🌱' },
  { phase: 'spec-gen', label: 'Cultivate', emoji: '🌿' },
  { phase: 'bidding', label: 'Grow', emoji: '🌳' },
  { phase: 'execution', label: 'Harvest', emoji: '🍂' },
]

export default function TopNav() {
  const { phase, setPhase } = useGroveStore()
  const currentIndex = STEPS.findIndex((s) => s.phase === phase)

  function goBack() {
    if (currentIndex > 0) setPhase(STEPS[currentIndex - 1].phase)
  }

  function goForward() {
    if (currentIndex < STEPS.length - 1) setPhase(STEPS[currentIndex + 1].phase)
  }

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-white/8 bg-[#0E2F24]/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-xl">🌲</span>
          <span className="text-white font-bold text-lg tracking-tight">Grove</span>
        </Link>

        {/* Back / Forward — larger, more visible */}
        <div className="flex items-center gap-1 ml-3">
          <button
            onClick={goBack}
            disabled={currentIndex <= 0}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-15 disabled:hover:bg-transparent disabled:hover:text-white/50 disabled:hover:border-white/10 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={goForward}
            disabled={currentIndex >= STEPS.length - 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-15 disabled:hover:bg-transparent disabled:hover:text-white/50 disabled:hover:border-white/10 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress steps — all clickable for demo navigation */}
      <div className="flex items-center gap-1">
        {STEPS.map((step, i) => {
          const isActive = i === currentIndex
          const isDone = i < currentIndex
          const isFuture = i > currentIndex
          return (
            <div key={step.phase} className="flex items-center">
              <button
                onClick={() => setPhase(step.phase)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#1F5A45] text-[#C6A85E] border border-[#C6A85E]/30'
                    : isDone
                    ? 'text-emerald-400/70 hover:text-emerald-400 hover:bg-white/5 cursor-pointer'
                    : 'text-white/30 hover:text-white/50 hover:bg-white/5 cursor-pointer'
                }`}
              >
                <span>{step.emoji}</span>
                <span>{step.label}</span>
                {isFuture && (
                  <svg className="w-3 h-3 ml-0.5 opacity-40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </button>
              {i < STEPS.length - 1 && (
                <div className={`w-6 h-px mx-1 ${i < currentIndex ? 'bg-emerald-500/40' : 'bg-white/10'}`} />
              )}
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-[#C6A85E]">
          <span className="w-1.5 h-1.5 bg-[#C6A85E] rounded-full animate-pulse" />
          <span>Live</span>
        </div>
        <AuthButton />
      </div>
    </nav>
  )
}
