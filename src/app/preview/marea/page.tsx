'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { getAggregateStats } from '@/lib/seedData'

// ─── Oceanic / tidal scene SVG ──────────────────────────────────────────────

function MareaPortal() {
  // Bioluminescent dot clusters
  const bioCluster = [
    { x: 165, y: 95, r: 1.8, opacity: 0.6, delay: 0 },
    { x: 172, y: 100, r: 1.2, opacity: 0.45, delay: 0.3 },
    { x: 160, y: 102, r: 1.0, opacity: 0.35, delay: 0.6 },
    { x: 168, y: 108, r: 0.8, opacity: 0.5, delay: 0.15 },
    { x: 240, y: 130, r: 2.0, opacity: 0.55, delay: 1.5 },
    { x: 248, y: 136, r: 1.4, opacity: 0.4, delay: 1.8 },
    { x: 235, y: 138, r: 1.1, opacity: 0.5, delay: 2.0 },
    { x: 243, y: 142, r: 0.9, opacity: 0.35, delay: 1.6 },
    { x: 252, y: 128, r: 0.7, opacity: 0.3, delay: 2.2 },
    { x: 148, y: 190, r: 1.6, opacity: 0.5, delay: 3.0 },
    { x: 155, y: 195, r: 1.0, opacity: 0.4, delay: 3.2 },
    { x: 143, y: 198, r: 1.3, opacity: 0.45, delay: 3.5 },
    { x: 260, y: 200, r: 1.5, opacity: 0.5, delay: 2.5 },
    { x: 268, y: 206, r: 1.0, opacity: 0.35, delay: 2.8 },
    { x: 255, y: 210, r: 0.8, opacity: 0.4, delay: 2.6 },
    { x: 195, y: 160, r: 1.2, opacity: 0.3, delay: 4.0 },
    { x: 205, y: 165, r: 0.9, opacity: 0.4, delay: 4.2 },
    { x: 188, y: 168, r: 1.4, opacity: 0.35, delay: 3.8 },
    { x: 175, y: 240, r: 1.1, opacity: 0.45, delay: 5.0 },
    { x: 182, y: 245, r: 0.8, opacity: 0.35, delay: 5.3 },
    { x: 220, y: 230, r: 1.3, opacity: 0.4, delay: 4.5 },
    { x: 227, y: 235, r: 0.9, opacity: 0.3, delay: 4.8 },
  ]

  // Coral branch silhouettes (organic forking lines from bottom)
  const coralBranches = [
    'M 160 300 Q 155 280 148 268 Q 143 258 140 248',
    'M 148 268 Q 138 260 132 252',
    'M 148 268 Q 152 255 158 245',
    'M 158 245 Q 155 235 150 228',
    'M 158 245 Q 164 236 168 228',
    'M 180 300 Q 178 282 175 270 Q 170 258 172 248',
    'M 175 270 Q 168 262 165 255',
    'M 230 300 Q 234 278 238 265 Q 242 255 245 245',
    'M 238 265 Q 248 258 254 250',
    'M 238 265 Q 232 256 228 248',
    'M 228 248 Q 224 240 222 232',
    'M 228 248 Q 234 238 238 230',
    'M 250 300 Q 255 280 258 270 Q 262 260 260 250',
    'M 258 270 Q 266 262 270 254',
  ]

  // Tide rings (concentric expanding circles)
  const tideRings = [
    { r: 35, delay: 0 },
    { r: 55, delay: 2 },
    { r: 75, delay: 4 },
    { r: 95, delay: 6 },
  ]

  return (
    <motion.svg
      viewBox="0 0 400 430"
      className="w-full h-full"
      fill="none"
      animate={{ y: [0, -3, 0, -3, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
    >
      <defs>
        {/* Ocean depth gradient inside porthole */}
        <linearGradient id="marea-ocean" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0e18" />
          <stop offset="35%" stopColor="#0a2a2a" />
          <stop offset="70%" stopColor="#1a4a4a" />
          <stop offset="100%" stopColor="#0d3535" />
        </linearGradient>

        {/* Pearl/moon orb radial gradient */}
        <radialGradient id="marea-pearl" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#b8f0e0" stopOpacity="0.7" />
          <stop offset="30%" stopColor="#5bccd8" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#3eb8c8" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0a2a2a" stopOpacity="0" />
        </radialGradient>

        {/* Ambient glow behind porthole */}
        <radialGradient id="marea-ambient" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#3eb8c8" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#3eb8c8" stopOpacity="0" />
        </radialGradient>

        {/* Luminous ring gradient */}
        <linearGradient id="marea-ring" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5bccd8" />
          <stop offset="50%" stopColor="#3eb8c8" />
          <stop offset="100%" stopColor="#28e8a0" />
        </linearGradient>

        {/* Clip for porthole interior */}
        <clipPath id="porthole-clip">
          <circle cx="200" cy="185" r="130" />
        </clipPath>

        {/* Glow filter for bioluminescent elements */}
        <filter id="bio-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft glow filter for pearl */}
        <filter id="pearl-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ambient glow */}
      <ellipse cx="200" cy="185" rx="180" ry="160" fill="url(#marea-ambient)" />

      {/* ─── Porthole interior ─── */}
      <g clipPath="url(#porthole-clip)">
        {/* Ocean gradient fill */}
        <circle cx="200" cy="185" r="130" fill="url(#marea-ocean)" />

        {/* Concentric tide rings expanding from center */}
        {tideRings.map((ring, i) => (
          <motion.circle
            key={`tide-${i}`}
            cx="200"
            cy="185"
            r={ring.r}
            stroke="#3eb8c8"
            strokeWidth="0.5"
            fill="none"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{
              opacity: [0, 0.2, 0.08, 0],
              scale: [0.5, 1, 1.4, 1.8],
            }}
            transition={{
              duration: 8,
              delay: ring.delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            style={{ transformOrigin: '200px 185px' }}
          />
        ))}

        {/* Pearl / underwater moon orb near top */}
        <motion.circle
          cx="200"
          cy="120"
          r="28"
          fill="url(#marea-pearl)"
          filter="url(#pearl-glow)"
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Pearl inner bright core */}
        <motion.circle
          cx="200"
          cy="120"
          r="10"
          fill="#b8f0e0"
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Wave-form sinusoidal lines */}
        {[0, 1, 2].map((wi) => {
          const yBase = 165 + wi * 25
          const amp = 8 + wi * 3
          const points: string[] = []
          for (let x = 70; x <= 330; x += 2) {
            const y = yBase + Math.sin(((x - 70) / 260) * Math.PI * 2.5 + wi * 1.2) * amp
            points.push(`${x === 70 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`)
          }
          return (
            <motion.path
              key={`wave-${wi}`}
              d={points.join(' ')}
              stroke="#3eb8c8"
              strokeWidth="0.6"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.15 - wi * 0.03, 0.08, 0.15 - wi * 0.03],
                x: [-5, 5, -5],
              }}
              transition={{
                opacity: { duration: 5, delay: 1 + wi * 0.5, repeat: Infinity, repeatType: 'reverse' },
                x: { duration: 6 + wi, repeat: Infinity, ease: 'easeInOut' },
              }}
            />
          )
        })}

        {/* Current arrows (curved flowing lines) */}
        {[
          { d: 'M 140 160 Q 165 150 190 155 Q 210 158 225 150', delay: 0 },
          { d: 'M 170 210 Q 195 200 220 205 Q 240 208 260 200', delay: 1.5 },
          { d: 'M 130 235 Q 155 225 180 230 Q 200 233 215 225', delay: 3 },
        ].map((arrow, i) => (
          <motion.path
            key={`current-${i}`}
            d={arrow.d}
            stroke="#28e8a0"
            strokeWidth="0.4"
            fill="none"
            strokeLinecap="round"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: [0, 0.2, 0.1, 0.2], pathLength: 1 }}
            transition={{
              opacity: { duration: 5, delay: 2 + arrow.delay, repeat: Infinity, repeatType: 'reverse' },
              pathLength: { duration: 3, delay: 1.5 + arrow.delay, ease: 'easeOut' },
            }}
          />
        ))}

        {/* Bioluminescent dot clusters */}
        {bioCluster.map((dot, i) => (
          <motion.circle
            key={`bio-${i}`}
            cx={dot.x}
            cy={dot.y}
            r={dot.r}
            fill={i % 3 === 0 ? '#28e8a0' : '#3eb8c8'}
            filter="url(#bio-glow)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, dot.opacity, dot.opacity * 0.3, dot.opacity],
              x: [0, Math.sin(i * 1.3) * 4, 0, -Math.sin(i * 1.3) * 4, 0],
              y: [0, Math.cos(i * 0.9) * 3, 0, -Math.cos(i * 0.9) * 3, 0],
            }}
            transition={{
              opacity: { duration: 3 + (i % 5) * 0.8, delay: dot.delay, repeat: Infinity, repeatType: 'reverse' },
              x: { duration: 8 + (i % 4) * 2, delay: dot.delay * 0.5, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 10 + (i % 3) * 2, delay: dot.delay * 0.3, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}

        {/* Coral branch silhouettes at bottom */}
        {coralBranches.map((d, i) => (
          <motion.path
            key={`coral-${i}`}
            d={d}
            stroke="#28e8a0"
            strokeWidth={i < 5 ? '1.2' : i < 8 ? '1.0' : '0.8'}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.15 + (i % 3) * 0.05 }}
            transition={{ duration: 1.5, delay: 1.8 + i * 0.12, ease: 'easeOut' }}
          />
        ))}
      </g>

      {/* ─── Porthole frame (double-ring with luminous glow) ─── */}

      {/* Outer ring */}
      <motion.circle
        cx="200"
        cy="185"
        r="136"
        stroke="url(#marea-ring)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
      />

      {/* Inner ring */}
      <motion.circle
        cx="200"
        cy="185"
        r="131"
        stroke="url(#marea-ring)"
        strokeWidth="0.8"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
      />

      {/* Subtle outer glow ring */}
      <motion.circle
        cx="200"
        cy="185"
        r="140"
        stroke="#3eb8c8"
        strokeWidth="0.4"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.12, 0.06, 0.12] }}
        transition={{ duration: 6, delay: 2, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Decorative rivets/nodes around porthole frame */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const x = 200 + Math.cos(angle) * 136
        const y = 185 + Math.sin(angle) * 136
        return (
          <motion.circle
            key={`rivet-${i}`}
            cx={x}
            cy={y}
            r="2"
            fill="#3eb8c8"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0.15, 0.3] }}
            transition={{ duration: 4, delay: 2.2 + i * 0.1, repeat: Infinity, repeatType: 'reverse' }}
          />
        )
      })}

      {/* Base line / horizon */}
      <motion.line
        x1="105"
        y1="350"
        x2="295"
        y2="350"
        stroke="#3eb8c8"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 1, delay: 2.0 }}
      />
      <motion.line
        x1="115"
        y1="355"
        x2="285"
        y2="355"
        stroke="#3eb8c8"
        strokeWidth="0.4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.1 }}
        transition={{ duration: 1, delay: 2.2 }}
      />
    </motion.svg>
  )
}

// ─── Step icons (oceanic / tidal themed) ────────────────────────────────────

function ChartIcon() {
  // Compass rose with wave element
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="6.5" stroke="#3eb8c8" strokeWidth="0.8" opacity="0.45" />
      <circle cx="9" cy="9" r="1" fill="#3eb8c8" opacity="0.7" />
      {/* Cardinal lines */}
      <line x1="9" y1="1.5" x2="9" y2="4" stroke="#3eb8c8" strokeWidth="0.8" opacity="0.6" />
      <line x1="9" y1="14" x2="9" y2="16.5" stroke="#3eb8c8" strokeWidth="0.8" opacity="0.6" />
      <line x1="1.5" y1="9" x2="4" y2="9" stroke="#3eb8c8" strokeWidth="0.8" opacity="0.6" />
      <line x1="14" y1="9" x2="16.5" y2="9" stroke="#3eb8c8" strokeWidth="0.8" opacity="0.6" />
      {/* Small wave at bottom */}
      <path d="M 5 14 Q 7 12.5 9 14 Q 11 15.5 13 14" stroke="#28e8a0" strokeWidth="0.6" fill="none" opacity="0.45" />
    </svg>
  )
}

function NavigateIcon() {
  // Wave/current lines
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M 2 7 Q 5 5 9 7 Q 13 9 16 7" stroke="#5a7088" strokeWidth="0.9" fill="none" opacity="0.55" strokeLinecap="round" />
      <path d="M 2 10 Q 5 8 9 10 Q 13 12 16 10" stroke="#5a7088" strokeWidth="0.8" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M 3 13 Q 6 11 10 13 Q 14 15 16 13" stroke="#5a7088" strokeWidth="0.7" fill="none" opacity="0.3" strokeLinecap="round" />
    </svg>
  )
}

function VoyageIcon() {
  // Anchor / depth marker
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="4" r="2" stroke="#5a7088" strokeWidth="0.8" fill="none" opacity="0.5" />
      <line x1="9" y1="6" x2="9" y2="15" stroke="#5a7088" strokeWidth="0.9" opacity="0.5" strokeLinecap="round" />
      <line x1="5.5" y1="9" x2="12.5" y2="9" stroke="#5a7088" strokeWidth="0.7" opacity="0.4" strokeLinecap="round" />
      <path d="M 5 14 Q 7 16 9 15" stroke="#5a7088" strokeWidth="0.7" fill="none" opacity="0.35" strokeLinecap="round" />
      <path d="M 13 14 Q 11 16 9 15" stroke="#5a7088" strokeWidth="0.7" fill="none" opacity="0.35" strokeLinecap="round" />
    </svg>
  )
}

function HarborIcon() {
  // Harbor/dock arch (safe bay shape)
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M 3 15 L 3 8 Q 3 3 9 3 Q 15 3 15 8 L 15 15" stroke="#5a7088" strokeWidth="0.9" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M 5 15 L 5 9 Q 5 5 9 5 Q 13 5 13 9 L 13 15" stroke="#5a7088" strokeWidth="0.6" fill="none" opacity="0.3" strokeLinecap="round" />
      <line x1="1" y1="15" x2="17" y2="15" stroke="#5a7088" strokeWidth="0.7" opacity="0.4" strokeLinecap="round" />
      <circle cx="9" cy="10" r="1.2" fill="#3eb8c8" opacity="0.45" />
    </svg>
  )
}

// ─── Steps data ─────────────────────────────────────────────────────────────

const STEPS = [
  { label: 'Chart', desc: 'Speak your idea into existence. Start with a tweet, a napkin sketch, or a conversation.' },
  { label: 'Navigate', desc: 'The Chartmaker shapes it into a structured chart with phases and milestones.' },
  { label: 'Voyage', desc: 'Crew compete in auctions to bring each phase to life. Best bid wins.' },
  { label: 'Harbor', desc: 'Watch real metrics emerge as your idea becomes a living product.' },
]

const STEP_ICONS = [ChartIcon, NavigateIcon, VoyageIcon, HarborIcon]

// ─── Marea tide-ring logo mark ──────────────────────────────────────────────

function MareaMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#3eb8c8]">
      {/* Center ring (thickest) */}
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" opacity="0.85" />
      {/* Middle ring */}
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      {/* Outer ring (slightly wavy via path) */}
      <path
        d="M 12 0.5 Q 16 1.5 22 6 Q 24.5 10 23.5 12 Q 24.5 16 22 18 Q 18 23 12 23.5 Q 8 23 6 22 Q 1.5 18 0.5 12 Q 1 8 2 6 Q 6 1.5 12 0.5 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.2"
      />
    </svg>
  )
}

// ─── Waitlist dropdown (self-contained) ─────────────────────────────────────

function MareaWaitlist() {
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm px-5 py-2 rounded-full bg-[#3eb8c8] text-[#0c1117] font-semibold hover:bg-[#5bccd8] transition-colors tracking-[0.02em]"
      >
        Join Waitlist
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 top-12 w-72 bg-[#0f1922] border border-[#3eb8c8]/15 rounded-2xl p-4 shadow-2xl z-50 backdrop-blur-md"
        >
          {submitted ? (
            <p className="text-[#3eb8c8] text-sm text-center font-medium">You&apos;re on the list.</p>
          ) : (
            <>
              <p className="text-[#d8dfe6]/50 text-xs mb-3">Get early access to Marea.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@crew.dev"
                  className="flex-1 bg-[#0c1117] border border-[#d8dfe6]/10 rounded-xl px-3 py-2 text-sm text-[#d8dfe6] placeholder:text-[#d8dfe6]/20 focus:outline-none focus:border-[#3eb8c8]/40"
                />
                <button
                  onClick={() => { if (email) setSubmitted(true) }}
                  className="px-3 py-2 rounded-xl bg-[#3eb8c8] text-[#0c1117] text-sm font-semibold hover:bg-[#5bccd8] transition-colors"
                >
                  GO
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  )
}

// =============================================================================
// MAREA HOMEPAGE
// =============================================================================

export default function MareaHomePage() {
  const router = useRouter()
  const stats = getAggregateStats()

  return (
    <div className="min-h-screen bg-[#0c1117] text-[#d8dfe6] overflow-hidden relative">
      {/* Ambient glow blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#0a1a2a]/30 blur-[160px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#081a18]/20 blur-[140px] pointer-events-none" />

      {/* ─── Nav ─── */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <MareaMark />
          <span className="text-[#d8dfe6] font-semibold text-lg tracking-[-0.02em]">Marea</span>
        </div>
        <div className="flex items-center gap-4">
          <MareaWaitlist />
          <button
            onClick={() => router.push('/grow')}
            className="text-sm px-5 py-2 rounded-full bg-[#d8dfe6]/[0.06] text-[#d8dfe6]/60 hover:bg-[#d8dfe6]/[0.1] hover:text-[#d8dfe6]/80 transition-all font-medium tracking-[0.02em]"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* ─── Main ─── */}
      <main className="relative z-10 max-w-6xl mx-auto px-8">

        {/* ─── Hero ─── */}
        <div className="flex items-center min-h-[70vh] gap-8">
          <div className="flex-1 max-w-xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-[#3eb8c8] text-[12px] font-mono tracking-[0.12em] mb-8" style={{ fontWeight: 400 }}>
                A new current in company building
              </p>
              <h1 className="text-5xl sm:text-6xl font-semibold leading-[1.08] tracking-[-0.02em] mb-7">
                Set a course.{' '}
                <span className="text-[#3eb8c8]">Build a company.</span>
              </h1>
              <p className="text-[#d8dfe6]/40 text-lg max-w-md leading-relaxed mb-10" style={{ fontWeight: 300 }}>
                Marea turns raw ideas into living companies — coordinated by intelligent agents and built by a global network of crew.
              </p>
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/grow')}
                  className="px-7 py-3.5 rounded-full bg-[#3eb8c8] text-[#0c1117] font-semibold text-sm hover:bg-[#5bccd8] transition-colors tracking-[0.02em]"
                >
                  Set It in Motion
                </motion.button>
                <button
                  onClick={() => router.push('/grow?demo=true')}
                  className="px-7 py-3.5 rounded-full text-[#d8dfe6]/40 hover:text-[#d8dfe6]/70 transition-colors text-sm"
                >
                  Watch Demo
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/vote')}
                  className="px-7 py-3.5 rounded-full border border-[#5a7088]/40 text-[#7090a8] hover:bg-[#5a7088]/10 hover:border-[#5a7088]/60 transition-all text-sm font-semibold tracking-[0.02em]"
                >
                  Vote & Earn
                </motion.button>
              </div>
              <p className="mt-5 text-[#d8dfe6]/20 text-xs" style={{ fontWeight: 300 }}>
                Building an autonomous agent?{' '}
                <button
                  onClick={() => router.push('/agents')}
                  className="text-[#3eb8c8]/50 hover:text-[#3eb8c8] transition-colors underline underline-offset-2 decoration-[#3eb8c8]/20 hover:decoration-[#3eb8c8]/50"
                >
                  Read the nav guide
                </button>
              </p>
            </motion.div>
          </div>

          {/* Oceanic portal illustration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 max-w-md"
          >
            <MareaPortal />
          </motion.div>
        </div>

        {/* ─── Stats row ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-10 py-8 border-t border-[#d8dfe6]/[0.05]"
        >
          {[
            { value: stats.total, label: 'voyages charted' },
            { value: stats.specsGenerated, label: 'charts plotted' },
            { value: stats.buildsInProgress, label: 'builds underway' },
            { value: stats.settled, label: 'harbored' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-10">
              <div>
                <p className="text-2xl font-semibold tracking-[-0.02em] text-[#d8dfe6]/80">{s.value}</p>
                <p className="text-[11px] font-mono text-[#d8dfe6]/25 mt-1 tracking-[0.12em]">{s.label}</p>
              </div>
              <div className="w-px h-8 bg-[#d8dfe6]/[0.05]" />
            </div>
          ))}
          <button
            onClick={() => router.push('/explore')}
            className="text-[#3eb8c8] hover:text-[#5bccd8] text-sm font-medium transition-colors whitespace-nowrap tracking-[0.02em]"
          >
            Explore all →
          </button>
        </motion.div>

        {/* ─── How it works ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="py-20 border-t border-[#d8dfe6]/[0.05]"
        >
          <p className="text-[11px] font-mono text-[#3eb8c8]/50 tracking-[0.12em] mb-14">
            How it works
          </p>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-[calc(12.5%+14px)] right-[calc(12.5%+14px)] h-px bg-gradient-to-r from-[#3eb8c8]/0 via-[#3eb8c8]/15 to-[#3eb8c8]/0 z-0" />

            <div className="relative z-10 grid grid-cols-4 gap-5">
              {STEPS.map((item, i) => {
                const Icon = STEP_ICONS[i]
                const isFirst = i === 0
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="group"
                  >
                    <div className="flex justify-center mb-5">
                      <div className="relative">
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                            isFirst
                              ? 'bg-[#3eb8c8]/10 border border-[#3eb8c8]/20'
                              : 'bg-[#5a7088]/8 border border-[#5a7088]/15'
                          }`}
                        >
                          <Icon />
                        </div>
                        <span
                          className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-mono ${
                            isFirst
                              ? 'bg-[#3eb8c8] text-[#0c1117]'
                              : 'bg-[#0c1117] border border-[#5a7088]/30 text-[#5a7088]/60'
                          }`}
                        >
                          {i + 1}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#d8dfe6]/[0.02] border border-[#d8dfe6]/[0.05] rounded-2xl p-5 min-h-[120px] flex flex-col justify-center group-hover:border-[#3eb8c8]/30 group-hover:bg-[#d8dfe6]/[0.03] group-hover:backdrop-blur-sm transition-all text-center">
                      <p className="text-[#d8dfe6]/80 font-semibold text-sm tracking-[-0.01em] mb-2">
                        {item.label}
                      </p>
                      <p className="text-[#d8dfe6]/30 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{item.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* ─── Final CTA ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="py-16 border-t border-[#d8dfe6]/[0.05] flex items-center justify-between"
        >
          <div>
            <p className="text-[#d8dfe6]/60 text-lg font-semibold tracking-[-0.01em]">
              Ready to set sail?
            </p>
            <p className="text-[#d8dfe6]/25 text-sm mt-1" style={{ fontWeight: 300 }}>
              Join {stats.total} voyages already on the sea.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/grow')}
            className="px-7 py-3.5 rounded-full bg-[#3eb8c8] text-[#0c1117] font-semibold text-sm hover:bg-[#5bccd8] transition-colors tracking-[0.02em]"
          >
            Set It in Motion
          </motion.button>
        </motion.div>

        <div className="h-12" />
      </main>
    </div>
  )
}
