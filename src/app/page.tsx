'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { getAggregateStats } from '@/lib/seedData'
import WaitlistSignup from '@/components/WaitlistSignup'

// ─── Generative branching SVG ────────────────────────────────────────────────

function GroveMark() {
  const branches = [
    'M 200 390 Q 200 320 198 250', 'M 200 390 Q 202 330 201 260',
    'M 198 250 Q 172 205 140 170', 'M 198 250 Q 228 200 265 175',
    'M 199 275 Q 160 245 125 230', 'M 199 275 Q 240 250 278 240',
    'M 140 170 Q 118 145 95 120', 'M 140 170 Q 148 135 158 105',
    'M 265 175 Q 288 152 310 135', 'M 265 175 Q 258 140 250 110',
    'M 125 230 Q 98 218 72 205', 'M 278 240 Q 305 232 330 222',
    'M 95 120 Q 78 100 60 82', 'M 95 120 Q 105 92 112 68',
    'M 158 105 Q 150 78 142 55', 'M 158 105 Q 172 82 182 60',
    'M 310 135 Q 328 118 345 105', 'M 310 135 Q 305 108 298 85',
    'M 250 110 Q 240 82 232 58', 'M 250 110 Q 265 88 278 68',
    'M 60 82 Q 48 68 38 52', 'M 112 68 Q 118 48 122 30',
    'M 142 55 Q 134 35 128 18', 'M 182 60 Q 188 40 194 22',
    'M 345 105 Q 355 90 362 75', 'M 298 85 Q 292 62 286 42',
    'M 232 58 Q 224 38 218 20', 'M 278 68 Q 286 48 292 30',
    'M 72 205 Q 55 195 42 182', 'M 330 222 Q 348 215 362 205',
    'M 38 52 Q 30 42 25 30', 'M 362 75 Q 370 62 375 48',
  ]

  const nodes = [
    { x: 60, y: 82 }, { x: 112, y: 68 }, { x: 142, y: 55 }, { x: 182, y: 60 },
    { x: 345, y: 105 }, { x: 298, y: 85 }, { x: 232, y: 58 }, { x: 278, y: 68 },
    { x: 38, y: 52 }, { x: 122, y: 30 }, { x: 128, y: 18 }, { x: 194, y: 22 },
    { x: 362, y: 75 }, { x: 286, y: 42 }, { x: 218, y: 20 }, { x: 292, y: 30 },
    { x: 42, y: 182 }, { x: 362, y: 205 }, { x: 25, y: 30 }, { x: 375, y: 48 },
    { x: 72, y: 205 }, { x: 330, y: 222 },
  ]

  const goldIndices = [3, 6, 10, 14, 17]

  return (
    <svg viewBox="0 0 400 430" className="w-full h-full" fill="none">
      <defs>
        <radialGradient id="tree-glow" cx="50%" cy="45%" r="45%">
          <stop offset="0%" stopColor="#7b8a6e" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#7b8a6e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="400" height="430" fill="url(#tree-glow)" />
      <path d="M 200 390 Q 188 410 170 425" stroke="#7b8a6e" strokeWidth="0.8" opacity="0.12" />
      <path d="M 200 390 Q 212 410 230 425" stroke="#7b8a6e" strokeWidth="0.8" opacity="0.12" />
      <path d="M 200 390 Q 195 415 192 430" stroke="#7b8a6e" strokeWidth="0.5" opacity="0.08" />
      <path d="M 200 390 Q 205 415 208 430" stroke="#7b8a6e" strokeWidth="0.5" opacity="0.08" />
      {branches.map((d, i) => {
        const tier = i < 2 ? 0 : i < 6 ? 1 : i < 12 ? 2 : i < 20 ? 3 : 4
        const width = [2.2, 1.6, 1.0, 0.6, 0.35][tier]
        const opacity = [0.55, 0.4, 0.3, 0.2, 0.12][tier]
        const color = tier < 2 ? '#7b8a6e' : '#8a9a7b'
        return (
          <motion.path key={i} d={d} stroke={color} strokeWidth={width} strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity }}
            transition={{ duration: 1.4, delay: 0.2 + tier * 0.35, ease: 'easeOut' }} />
        )
      })}
      {nodes.map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r={goldIndices.includes(i) ? 0 : 1.8} fill="#8a9a7b"
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.3, 0.2, 0.3] }}
          transition={{ duration: 4, delay: 2.0 + i * 0.05, repeat: Infinity, repeatType: 'reverse' }} />
      ))}
      {goldIndices.map((idx, i) => {
        const n = nodes[idx]
        return (
          <g key={`gold-${i}`}>
            <motion.circle cx={n.x} cy={n.y} r={6} fill="none" stroke="#c4a862" strokeWidth="0.5"
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 0.15, 0.08, 0.15], scale: 1 }}
              transition={{ opacity: { duration: 3, delay: 2.8 + i * 0.2, repeat: Infinity, repeatType: 'reverse' }, scale: { duration: 0.6, delay: 2.4 + i * 0.15 } }} />
            <motion.circle cx={n.x} cy={n.y} r={3} fill="#c4a862"
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 0.6, 0.4, 0.6], scale: 1 }}
              transition={{ opacity: { duration: 3, delay: 2.8 + i * 0.2, repeat: Infinity, repeatType: 'reverse' }, scale: { duration: 0.5, delay: 2.4 + i * 0.15 } }} />
          </g>
        )
      })}
      <motion.g animate={{ x: [0, 1.5, 0, -1.5, 0], y: [0, -1, 0, -1, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <motion.ellipse cx="200" cy="140" rx="130" ry="90" fill="#7b8a6e"
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.025, 0.015, 0.025] }}
          transition={{ duration: 6, delay: 2.5, repeat: Infinity, repeatType: 'reverse' }} />
      </motion.g>
    </svg>
  )
}

const STEPS = [
  { label: 'Propose', desc: 'Describe a media agent — its voice, channel, audience, and objective.' },
  { label: 'Design', desc: 'The Arborist shapes it into a sovereign agent spec with identity, constraints, and revenue paths.' },
  { label: 'Build', desc: 'Builders compete to bring the agent\'s infrastructure to life. Best bid wins.' },
  { label: 'Launch', desc: 'Watch the agent go live — publishing, earning, and evolving autonomously.' },
]

export default function HomePage() {
  const router = useRouter()
  const stats = getAggregateStats()

  return (
    <div className="min-h-screen bg-[#111110] text-[#e8e6e3] overflow-hidden relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#2a1f0a]/20 blur-[160px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#1a2618]/25 blur-[140px] pointer-events-none" />

      <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#c4a862]">
            <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.9" />
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <circle cx="12" cy="12" r="11.5" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
          </svg>
          <span className="text-[#e8e6e3] font-medium text-lg tracking-[-0.02em]">Grove</span>
        </div>
        <div className="flex items-center gap-4">
          <WaitlistSignup />
          <button onClick={() => router.push('/grow')} className="text-sm px-4 py-2 rounded-lg bg-[#e8e6e3]/[0.06] text-[#e8e6e3]/60 hover:bg-[#e8e6e3]/[0.1] hover:text-[#e8e6e3]/80 transition-all">Launch App</button>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-8">
        <div className="flex items-center min-h-[70vh] gap-8">
          <div className="flex-1 max-w-xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-[#7b8a6e] text-xs font-mono tracking-[0.15em] uppercase mb-8">A new model for company formation</p>
              <h1 className="text-5xl sm:text-6xl font-semibold leading-[1.08] tracking-[-0.035em] mb-7">
                Create agentic companies.
              </h1>
              <p className="text-[#e8e6e3]/40 text-lg max-w-md leading-relaxed mb-10">
                Launch autonomous agents. Build sovereign companies that can publish, earn, and evolve on their own.
              </p>
              <div className="flex items-center gap-3">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => router.push('/grow')}
                  className="px-7 py-3.5 rounded-xl bg-[#c4a862] text-[#111110] font-medium text-sm hover:bg-[#d4b872] transition-colors">Launch an Agent</motion.button>
                <button onClick={() => router.push('/grow?demo=true')} className="px-7 py-3.5 rounded-xl text-[#e8e6e3]/40 hover:text-[#e8e6e3]/70 transition-colors text-sm">Watch Demo</button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => router.push('/vote')}
                  className="px-7 py-3.5 rounded-xl border border-[#c4a862]/25 text-[#c4a862] hover:bg-[#c4a862]/10 hover:border-[#c4a862]/40 transition-all text-sm font-medium">Vote & Earn</motion.button>
              </div>
              <p className="mt-5 text-[#e8e6e3]/20 text-xs">
                Want to build service agents for a Grove company?{' '}
                <button onClick={() => router.push('/agents')} className="text-[#7b8a6e]/60 hover:text-[#7b8a6e] transition-colors underline underline-offset-2 decoration-[#7b8a6e]/20 hover:decoration-[#7b8a6e]/50">
                  Read the skill file
                </button>
              </p>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="flex-1 max-w-md">
            <GroveMark />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex items-center gap-10 py-8 border-t border-[#e8e6e3]/[0.05]">
          {[
            { value: stats.total, label: 'agents launched' },
            { value: stats.specsGenerated, label: 'agents in design' },
            { value: stats.buildsInProgress, label: 'agents building' },
            { value: stats.settled, label: 'agents live' },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-10">
              <div>
                <p className="text-2xl font-semibold tracking-[-0.02em] text-[#e8e6e3]/80">{s.value}</p>
                <p className="text-[11px] font-mono text-[#e8e6e3]/25 mt-1">{s.label}</p>
              </div>
              <div className="w-px h-8 bg-[#e8e6e3]/[0.05]" />
            </div>
          ))}
          <button onClick={() => router.push('/explore')} className="text-[#7b8a6e] hover:text-[#8a9a7b] text-sm font-medium transition-colors whitespace-nowrap">
            Explore all →
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="py-20 border-t border-[#e8e6e3]/[0.05]">
          <p className="text-[11px] font-mono text-[#7b8a6e]/50 uppercase tracking-[0.15em] mb-14">How it works</p>
          <div className="relative">
            <div className="absolute top-10 left-[calc(12.5%+14px)] right-[calc(12.5%+14px)] h-px bg-gradient-to-r from-[#7b8a6e]/0 via-[#7b8a6e]/15 to-[#7b8a6e]/0 z-0" />
            <div className="relative z-10 grid grid-cols-4 gap-5">
              {STEPS.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.1 }} className="group">
                  <div className="flex justify-center mb-5">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${i === 0 ? 'bg-[#c4a862]/10 border border-[#c4a862]/20' : 'bg-[#7b8a6e]/8 border border-[#7b8a6e]/15'}`}>
                        {i === 0 && (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="13" r="2" fill="#c4a862" opacity="0.7" /><path d="M9 11V5" stroke="#c4a862" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" /><path d="M9 5L6.5 2.5" stroke="#c4a862" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" /><path d="M9 5L11.5 2.5" stroke="#c4a862" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" /></svg>)}
                        {i === 1 && (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="4" width="12" height="2" rx="0.5" fill="#7b8a6e" opacity="0.5" /><rect x="3" y="8" width="9" height="2" rx="0.5" fill="#7b8a6e" opacity="0.35" /><rect x="3" y="12" width="6" height="2" rx="0.5" fill="#7b8a6e" opacity="0.2" /></svg>)}
                        {i === 2 && (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 14L9 4L15 14" stroke="#7b8a6e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" /><path d="M5.5 14L9 7L12.5 14" stroke="#7b8a6e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" /><circle cx="9" cy="6" r="1.5" fill="#7b8a6e" opacity="0.3" /></svg>)}
                        {i === 3 && (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="5" stroke="#7b8a6e" strokeWidth="1" opacity="0.3" /><circle cx="9" cy="9" r="2.5" stroke="#7b8a6e" strokeWidth="1" opacity="0.4" /><circle cx="9" cy="9" r="1" fill="#c4a862" opacity="0.6" /></svg>)}
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#111110] border border-[#e8e6e3]/[0.08] flex items-center justify-center text-[8px] font-mono text-[#e8e6e3]/30">{i + 1}</span>
                    </div>
                  </div>
                  <div className="bg-[#e8e6e3]/[0.02] border border-[#e8e6e3]/[0.05] rounded-xl p-5 min-h-[120px] flex flex-col justify-center group-hover:border-[#7b8a6e]/20 group-hover:bg-[#e8e6e3]/[0.03] transition-all text-center">
                    <p className="text-[#e8e6e3]/80 font-medium text-sm tracking-[-0.01em] mb-2">{item.label}</p>
                    <p className="text-[#e8e6e3]/30 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }} className="py-16 border-t border-[#e8e6e3]/[0.05] flex items-center justify-between">
          <div>
            <p className="text-[#e8e6e3]/60 text-lg font-medium tracking-[-0.01em]">Ready to launch an agent?</p>
            <p className="text-[#e8e6e3]/25 text-sm mt-1">Join {stats.total} agents already in Grove.</p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => router.push('/grow')}
            className="px-7 py-3.5 rounded-xl bg-[#c4a862] text-[#111110] font-medium text-sm hover:bg-[#d4b872] transition-colors">Launch an Agent</motion.button>
        </motion.div>
        <div className="h-12" />
      </main>
    </div>
  )
}
