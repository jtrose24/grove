'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SpecPhase } from '@/lib/store'

function PhaseAccordion({ phase, index }: { phase: SpecPhase; index: number }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <div className="border border-[#e8e6e3]/8 rounded-xl overflow-hidden bg-[#e8e6e3]/[0.02]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#e8e6e3]/[0.03] transition-colors"
      >
        <motion.svg
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.15 }}
          className="w-3 h-3 text-[#e8e6e3]/30 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </motion.svg>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[#e8e6e3]/25 text-[10px] font-mono font-bold">P{phase.number}</span>
            <span className="text-[#e8e6e3]/80 text-xs font-semibold truncate">{phase.title}</span>
          </div>
          <p className="text-[#e8e6e3]/30 text-[10px] font-mono mt-0.5 truncate">{phase.description}</p>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-[#e8e6e3]/5 pt-3">
              <p className="text-[#e8e6e3]/50 text-xs leading-relaxed font-mono">{phase.description}</p>
              {phase.workItems && phase.workItems.length > 0 && (
                <div className="mt-3 space-y-2">
                  {phase.workItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 py-2 px-3 rounded-lg bg-black/20 border border-[#e8e6e3]/5">
                      <div className="flex-shrink-0 mt-1.5">
                        <div className={`w-2 h-2 rounded-full ${
                          item.status === 'done' ? 'bg-[#8a9a7b]' :
                          item.status === 'active' ? 'bg-[#c4a862] animate-pulse' :
                          'bg-[#e8e6e3]/20'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-[#c4a862] text-xs font-mono font-bold">{item.title}</code>
                          <span className="text-[#e8e6e3]/20 text-[10px] font-mono">{item.epochs}ep</span>
                        </div>
                        <p className="text-[#e8e6e3]/45 text-[11px] font-mono leading-relaxed">{item.tech}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function IdeaSpecView({ spec, specPhases }: { spec?: string; specPhases?: SpecPhase[] }) {
  if (!spec && (!specPhases || specPhases.length === 0)) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-[#c4a862] text-xs font-mono font-bold uppercase tracking-wider">Growth Plan</span>
      </div>

      {/* Raw spec text */}
      {spec && (
        <div className="bg-black/30 rounded-xl border border-[#e8e6e3]/8 p-4 text-xs text-[#e8e6e3]/60 leading-relaxed font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">
          {spec}
        </div>
      )}

      {/* Phase accordions */}
      {specPhases && specPhases.length > 0 && (
        <div className="space-y-2">
          {specPhases.map((phase, i) => (
            <PhaseAccordion key={phase.id} phase={phase} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
