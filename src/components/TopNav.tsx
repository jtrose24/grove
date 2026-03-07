'use client'
import Link from 'next/link'
import { useGroveStore, AppPhase } from '@/lib/store'
import AuthButton from './AuthButton'

const STEPS: { phase: AppPhase; label: string }[] = [
  { phase: 'ideation', label: 'Plant' },
  { phase: 'spec-gen', label: 'Cultivate' },
  { phase: 'bidding', label: 'Grow' },
  { phase: 'execution', label: 'Harvest' },
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
    <nav className="flex items-center justify-between px-6 py-3 border-b border-[#e8e6e3]/[0.06] bg-[#1a1a19]/90 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#c4a862]">
            <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.9" />
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <circle cx="12" cy="12" r="11.5" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
          </svg>
          <span className="text-[#e8e6e3] font-medium text-lg tracking-[-0.02em]">Grove</span>
        </Link>

        <div className="flex items-center gap-1 ml-3">
          <button
            onClick={goBack}
            disabled={currentIndex <= 0}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e8e6e3]/[0.06] text-[#e8e6e3]/30 hover:text-[#e8e6e3]/60 hover:bg-[#e8e6e3]/[0.04] hover:border-[#e8e6e3]/10 disabled:opacity-15 disabled:hover:bg-transparent disabled:hover:text-[#e8e6e3]/30 disabled:hover:border-[#e8e6e3]/[0.06] transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={goForward}
            disabled={currentIndex >= STEPS.length - 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e8e6e3]/[0.06] text-[#e8e6e3]/30 hover:text-[#e8e6e3]/60 hover:bg-[#e8e6e3]/[0.04] hover:border-[#e8e6e3]/10 disabled:opacity-15 disabled:hover:bg-transparent disabled:hover:text-[#e8e6e3]/30 disabled:hover:border-[#e8e6e3]/[0.06] transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Phase steps — dot + text, no emojis */}
      <div className="flex items-center gap-1">
        {STEPS.map((step, i) => {
          const isActive = i === currentIndex
          const isDone = i < currentIndex
          return (
            <div key={step.phase} className="flex items-center">
              <button
                onClick={() => setPhase(step.phase)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#c4a862]/10 text-[#c4a862] border border-[#c4a862]/20'
                    : isDone
                    ? 'text-[#7b8a6e]/70 hover:text-[#7b8a6e] hover:bg-[#e8e6e3]/[0.03] cursor-pointer'
                    : 'text-[#e8e6e3]/20 hover:text-[#e8e6e3]/40 hover:bg-[#e8e6e3]/[0.03] cursor-pointer'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? 'bg-[#c4a862]' : isDone ? 'bg-[#7b8a6e]/50' : 'bg-[#e8e6e3]/15'
                }`} />
                <span>{step.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`w-6 h-px mx-1 ${i < currentIndex ? 'bg-[#7b8a6e]/30' : 'bg-[#e8e6e3]/[0.06]'}`} />
              )}
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-[#7b8a6e]/60">
          <span className="w-1.5 h-1.5 bg-[#7b8a6e] rounded-full animate-pulse" />
          <span>Live</span>
        </div>
        <AuthButton />
      </div>
    </nav>
  )
}
