'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { getAggregateStats } from '@/lib/seedData'

// ─── Outlands portal illustration SVG ─────────────────────────────────────────

function OutlandsPortal() {
  // Stars: cross-shaped twinklers
  const stars = [
    { x: 155, y: 62, s: 3.5, delay: 0 },
    { x: 245, y: 48, s: 2.8, delay: 1.2 },
    { x: 130, y: 105, s: 2.2, delay: 2.5 },
    { x: 270, y: 90, s: 3.0, delay: 0.8 },
    { x: 175, y: 38, s: 2.0, delay: 3.8 },
    { x: 225, y: 72, s: 2.5, delay: 1.8 },
    { x: 148, y: 145, s: 1.8, delay: 4.2 },
    { x: 260, y: 130, s: 2.3, delay: 2.0 },
    { x: 200, y: 30, s: 3.2, delay: 5.0 },
    { x: 188, y: 95, s: 1.6, delay: 3.2 },
    { x: 215, y: 115, s: 2.0, delay: 6.0 },
    { x: 165, y: 80, s: 1.5, delay: 4.8 },
  ]

  // Polyhedron wireframe shapes (simplified icosahedron outlines)
  const polyhedrons = [
    { cx: 160, cy: 85, size: 18, delay: 0 },
    { cx: 240, cy: 70, size: 14, delay: 15 },
    { cx: 185, cy: 55, size: 11, delay: 30 },
    { cx: 225, cy: 110, size: 16, delay: 45 },
  ]

  // Canyon/mesa silhouette layers (bottom of portal)
  const canyonLayers = [
    { d: 'M 120 290 Q 140 248 160 260 Q 175 235 195 250 Q 210 228 225 245 Q 240 232 260 255 Q 275 240 280 290 Z', fill: '#2a1540', opacity: 0.7 },
    { d: 'M 120 290 Q 145 262 165 270 Q 180 250 200 265 Q 215 248 235 258 Q 252 245 270 268 Q 280 258 280 290 Z', fill: '#3d2040', opacity: 0.75 },
    { d: 'M 120 290 Q 150 272 168 278 Q 185 262 200 275 Q 218 260 238 270 Q 255 262 272 280 Q 280 272 280 290 Z', fill: '#4a2828', opacity: 0.8 },
    { d: 'M 120 290 Q 155 278 175 284 Q 190 274 205 282 Q 220 272 240 280 Q 258 274 270 286 Q 280 280 280 290 Z', fill: '#5a3020', opacity: 0.85 },
  ]

  return (
    <motion.svg
      viewBox="0 0 400 430"
      className="w-full h-full"
      fill="none"
      animate={{ y: [0, -4, 0, -4, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
    >
      <defs>
        {/* Gold gradient for portal frame */}
        <linearGradient id="portal-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8c255" />
          <stop offset="50%" stopColor="#daa520" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>

        {/* Sky gradient inside portal */}
        <linearGradient id="portal-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0e2e" />
          <stop offset="30%" stopColor="#4a2050" />
          <stop offset="65%" stopColor="#cc6633" />
          <stop offset="90%" stopColor="#daa520" />
          <stop offset="100%" stopColor="#e8c255" />
        </linearGradient>

        {/* Sun glow */}
        <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8c255" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#daa520" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#cc6633" stopOpacity="0" />
        </radialGradient>

        {/* Ambient glow behind portal */}
        <radialGradient id="portal-ambient" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#daa520" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#daa520" stopOpacity="0" />
        </radialGradient>

        {/* Clip path for portal interior */}
        <clipPath id="portal-clip">
          <path d="M 130 310 L 130 100 Q 130 40 200 40 Q 270 40 270 100 L 270 310 Z" />
        </clipPath>

        {/* Sun band mask */}
        <mask id="sun-bands">
          <rect x="0" y="0" width="400" height="430" fill="white" />
          <rect x="150" y="246" width="100" height="2.5" fill="black" />
          <rect x="150" y="252" width="100" height="2" fill="black" />
          <rect x="150" y="257" width="100" height="1.5" fill="black" />
          <rect x="150" y="261" width="100" height="1.5" fill="black" />
          <rect x="150" y="265" width="100" height="1" fill="black" />
          <rect x="150" y="268" width="100" height="1" fill="black" />
        </mask>
      </defs>

      {/* Ambient glow */}
      <ellipse cx="200" cy="180" rx="180" ry="160" fill="url(#portal-ambient)" />

      {/* ─── Portal interior ─── */}
      <g clipPath="url(#portal-clip)">
        {/* Sky gradient */}
        <rect x="120" y="30" width="160" height="290" fill="url(#portal-sky)" />

        {/* Radiating lines from sun */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16
          const rad = (angle * Math.PI) / 180
          const x2 = 200 + Math.cos(rad) * 150
          const y2 = 258 + Math.sin(rad) * 150
          return (
            <motion.line
              key={`ray-${i}`}
              x1="200"
              y1="258"
              x2={x2}
              y2={y2}
              stroke="#e8c255"
              strokeWidth="0.4"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.15, 0.08, 0.15] }}
              transition={{ duration: 5, delay: 1.5 + i * 0.1, repeat: Infinity, repeatType: 'reverse' }}
            />
          )
        })}

        {/* Sun glow halo */}
        <circle cx="200" cy="258" r="60" fill="url(#sun-glow)" />

        {/* Concentric sun rings */}
        <motion.circle
          cx="200" cy="258" r="42"
          stroke="#e8c255" strokeWidth="0.6" fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0.12, 0.2] }}
          transition={{ duration: 6, delay: 2, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.circle
          cx="200" cy="258" r="52"
          stroke="#e8c255" strokeWidth="0.4" fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.12, 0.06, 0.12] }}
          transition={{ duration: 7, delay: 2.5, repeat: Infinity, repeatType: 'reverse' }}
        />

        {/* Sliced sun disc at horizon */}
        <g mask="url(#sun-bands)">
          <circle cx="200" cy="258" r="30" fill="#daa520" opacity="0.85" />
        </g>

        {/* Canyon/mesa silhouettes */}
        {canyonLayers.map((layer, i) => (
          <motion.path
            key={`canyon-${i}`}
            d={layer.d}
            fill={layer.fill}
            initial={{ opacity: 0 }}
            animate={{ opacity: layer.opacity }}
            transition={{ duration: 1, delay: 1.8 + i * 0.2 }}
          />
        ))}

        {/* Twinkling stars */}
        {stars.map((star, i) => (
          <motion.g
            key={`star-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.3, 0.8, 0.2, 0.9] }}
            transition={{ duration: 3 + (i % 4) * 1.2, delay: star.delay, repeat: Infinity, repeatType: 'reverse' }}
          >
            {/* Horizontal line */}
            <line
              x1={star.x - star.s} y1={star.y}
              x2={star.x + star.s} y2={star.y}
              stroke="#ede8e0" strokeWidth="0.6"
            />
            {/* Vertical line */}
            <line
              x1={star.x} y1={star.y - star.s}
              x2={star.x} y2={star.y + star.s}
              stroke="#ede8e0" strokeWidth="0.6"
            />
            {/* Center dot */}
            <circle cx={star.x} cy={star.y} r={0.7} fill="#ede8e0" />
          </motion.g>
        ))}

        {/* Wireframe polyhedrons */}
        {polyhedrons.map((poly, i) => {
          const s = poly.size
          // Simplified icosahedron: top point, 3 upper ring, 3 lower ring, bottom point
          const pts = [
            [0, -s],                                          // top
            [s * 0.87, -s * 0.33], [0, -s * 0.5], [-s * 0.87, -s * 0.33],   // upper ring
            [s * 0.87, s * 0.33], [0, s * 0.5], [-s * 0.87, s * 0.33],      // lower ring
            [0, s],                                           // bottom
          ]
          const edges = [
            [0, 1], [0, 2], [0, 3],          // top to upper ring
            [1, 2], [2, 3], [3, 1],          // upper ring
            [1, 4], [2, 5], [3, 6],          // upper to lower ring
            [4, 5], [5, 6], [6, 4],          // lower ring
            [4, 7], [5, 7], [6, 7],          // lower to bottom
            [1, 5], [2, 6], [3, 4],          // cross connections
          ]
          const pathD = edges
            .map(([a, b]) => `M ${pts[a][0]} ${pts[a][1]} L ${pts[b][0]} ${pts[b][1]}`)
            .join(' ')

          return (
            <motion.g
              key={`poly-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.35, 0.2, 0.35], rotate: 360 }}
              transition={{
                opacity: { duration: 5, delay: 2.5 + i * 0.4, repeat: Infinity, repeatType: 'reverse' },
                rotate: { duration: 60, delay: poly.delay, repeat: Infinity, ease: 'linear' },
              }}
              style={{ transformOrigin: `${poly.cx}px ${poly.cy}px` }}
            >
              <g transform={`translate(${poly.cx}, ${poly.cy})`}>
                <path d={pathD} stroke="#daa520" strokeWidth="0.5" fill="none" />
              </g>
            </motion.g>
          )
        })}
      </g>

      {/* ─── Portal archway frame ─── */}

      {/* Outer arch */}
      <motion.path
        d="M 118 320 L 118 100 Q 118 28 200 28 Q 282 28 282 100 L 282 320"
        stroke="url(#portal-gold)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
      />

      {/* Inner arch */}
      <motion.path
        d="M 126 318 L 126 100 Q 126 44 200 44 Q 274 44 274 100 L 274 318"
        stroke="url(#portal-gold)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
      />

      {/* Art deco chevron accents along left pilaster */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.path
          key={`chev-l-${i}`}
          d={`M 110 ${155 + i * 28} L 115 ${150 + i * 28} L 120 ${155 + i * 28}`}
          stroke="#daa520"
          strokeWidth="0.8"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2.2 + i * 0.08 }}
        />
      ))}

      {/* Art deco chevron accents along right pilaster */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.path
          key={`chev-r-${i}`}
          d={`M 280 ${155 + i * 28} L 285 ${150 + i * 28} L 290 ${155 + i * 28}`}
          stroke="#daa520"
          strokeWidth="0.8"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2.2 + i * 0.08 }}
        />
      ))}

      {/* Keystone diamond ornament */}
      <motion.path
        d="M 200 22 L 207 28 L 200 34 L 193 28 Z"
        stroke="#daa520"
        strokeWidth="1"
        fill="#daa520"
        fillOpacity="0.3"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.0, duration: 0.5 }}
        style={{ transformOrigin: '200px 28px' }}
      />

      {/* Small diamond ornaments at arch shoulders */}
      <motion.path
        d="M 130 98 L 134 94 L 138 98 L 134 102 Z"
        stroke="#daa520" strokeWidth="0.6" fill="none"
        initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
        transition={{ delay: 2.3 }}
      />
      <motion.path
        d="M 262 98 L 266 94 L 270 98 L 266 102 Z"
        stroke="#daa520" strokeWidth="0.6" fill="none"
        initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
        transition={{ delay: 2.3 }}
      />

      {/* Base lines */}
      <motion.line
        x1="105" y1="320" x2="295" y2="320"
        stroke="#daa520" strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 1, delay: 2.0 }}
      />
      <motion.line
        x1="110" y1="325" x2="290" y2="325"
        stroke="#daa520" strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 1, delay: 2.2 }}
      />
    </motion.svg>
  )
}

// ─── Step icons (art deco / frontier themed) ──────────────────────────────────

function ScoutIcon() {
  // Compass rose
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="6.5" stroke="#daa520" strokeWidth="0.8" opacity="0.5" />
      <circle cx="9" cy="9" r="1" fill="#daa520" opacity="0.8" />
      {/* Cardinal points */}
      <line x1="9" y1="1.5" x2="9" y2="4" stroke="#daa520" strokeWidth="1" opacity="0.7" />
      <line x1="9" y1="14" x2="9" y2="16.5" stroke="#daa520" strokeWidth="1" opacity="0.7" />
      <line x1="1.5" y1="9" x2="4" y2="9" stroke="#daa520" strokeWidth="1" opacity="0.7" />
      <line x1="14" y1="9" x2="16.5" y2="9" stroke="#daa520" strokeWidth="1" opacity="0.7" />
      {/* Diamond at north */}
      <path d="M 9 2.5 L 10 4.5 L 9 5.5 L 8 4.5 Z" fill="#daa520" opacity="0.5" />
    </svg>
  )
}

function BlueprintIcon() {
  // Grid/document icon
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="3" y="2" width="12" height="14" rx="1" stroke="#cc6633" strokeWidth="0.8" opacity="0.5" />
      <line x1="5" y1="5.5" x2="13" y2="5.5" stroke="#cc6633" strokeWidth="0.7" opacity="0.4" />
      <line x1="5" y1="8.5" x2="11" y2="8.5" stroke="#cc6633" strokeWidth="0.7" opacity="0.35" />
      <line x1="5" y1="11.5" x2="9" y2="11.5" stroke="#cc6633" strokeWidth="0.7" opacity="0.3" />
    </svg>
  )
}

function ExpeditionIcon() {
  // Flag/trail icon
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <line x1="5" y1="3" x2="5" y2="16" stroke="#cc6633" strokeWidth="0.8" opacity="0.5" />
      <path d="M 5 3 L 14 5.5 L 5 8 Z" fill="#cc6633" opacity="0.4" stroke="#cc6633" strokeWidth="0.5" />
    </svg>
  )
}

function BasecampIcon() {
  // 5-pointed star
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M 9 2 L 10.5 7 L 16 7 L 11.5 10.5 L 13 15.5 L 9 12 L 5 15.5 L 6.5 10.5 L 2 7 L 7.5 7 Z"
        stroke="#cc6633" strokeWidth="0.7" fill="#cc6633" fillOpacity="0.15" opacity="0.6"
      />
      <circle cx="9" cy="9" r="1.5" fill="#daa520" opacity="0.5" />
    </svg>
  )
}

// ─── Steps data ───────────────────────────────────────────────────────────────

const STEPS = [
  { label: 'Scout', desc: 'Pitch your idea to the frontier. Start with a tweet, a napkin sketch, or a conversation.' },
  { label: 'Blueprint', desc: 'The Surveyor shapes it into a structured blueprint with phases and milestones.' },
  { label: 'Expedition', desc: 'Operators compete in auctions to bring each phase to life. Best bid wins.' },
  { label: 'Basecamp', desc: 'Watch real metrics emerge as your idea becomes a living product.' },
]

const STEP_ICONS = [ScoutIcon, BlueprintIcon, ExpeditionIcon, BasecampIcon]

// ─── Outlands sun-and-rings logo mark ─────────────────────────────────────────

function OutlandsMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#daa520]">
      {/* Center filled circle */}
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.9" />
      {/* Inner ring */}
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      {/* Outer ring */}
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.5" opacity="0.18" />
      {/* Cardinal tick marks */}
      <line x1="12" y1="0" x2="12" y2="2.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <line x1="12" y1="21.5" x2="12" y2="24" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <line x1="0" y1="12" x2="2.5" y2="12" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <line x1="21.5" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    </svg>
  )
}

// ─── Waitlist dropdown (self-contained) ───────────────────────────────────────

function OutlandsWaitlist() {
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm px-4 py-2 rounded-lg bg-[#daa520] text-[#151210] font-bold hover:bg-[#e8c255] transition-colors tracking-[0.02em]"
      >
        JOIN WAITLIST
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 top-12 w-72 bg-[#1e1a16] border border-[#daa520]/20 rounded-xl p-4 shadow-2xl z-50"
        >
          {submitted ? (
            <p className="text-[#daa520] text-sm text-center font-medium">You&apos;re on the list.</p>
          ) : (
            <>
              <p className="text-[#ede8e0]/60 text-xs mb-3">Get early access to the Outlands.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@frontier.co"
                  className="flex-1 bg-[#151210] border border-[#ede8e0]/10 rounded-lg px-3 py-2 text-sm text-[#ede8e0] placeholder:text-[#ede8e0]/20 focus:outline-none focus:border-[#daa520]/40"
                />
                <button
                  onClick={() => { if (email) setSubmitted(true) }}
                  className="px-3 py-2 rounded-lg bg-[#daa520] text-[#151210] text-sm font-bold hover:bg-[#e8c255] transition-colors"
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

// ═══════════════════════════════════════════════════════════════════════════════
// OUTLANDS HOMEPAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function OutlandsHomePage() {
  const router = useRouter()
  const stats = getAggregateStats()

  return (
    <div className="min-h-screen bg-[#151210] text-[#ede8e0] overflow-hidden relative">
      {/* Ambient glow blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#3a2008]/25 blur-[160px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#1a1630]/20 blur-[140px] pointer-events-none" />

      {/* ─── Nav ─── */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <OutlandsMark />
          <span className="text-[#ede8e0] font-bold text-lg tracking-[-0.02em]">Outlands</span>
        </div>
        <div className="flex items-center gap-4">
          <OutlandsWaitlist />
          <button
            onClick={() => router.push('/grow')}
            className="text-sm px-4 py-2 rounded-lg bg-[#ede8e0]/[0.06] text-[#ede8e0]/60 hover:bg-[#ede8e0]/[0.1] hover:text-[#ede8e0]/80 transition-all font-bold tracking-[0.02em] uppercase"
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
              <p className="text-[#daa520] text-[12px] font-mono tracking-[0.2em] uppercase mb-8">
                A NEW FRONTIER FOR BUILDING
              </p>
              <h1 className="text-5xl sm:text-6xl font-bold leading-[1.08] tracking-[-0.02em] mb-7">
                Launch an expedition.{' '}
                <span className="text-[#daa520]">Build the future.</span>
              </h1>
              <p className="text-[#ede8e0]/40 text-lg max-w-md leading-relaxed mb-10">
                Outlands turns raw ideas into living companies — coordinated by intelligent agents and built by a global network of operators.
              </p>
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/grow')}
                  className="px-7 py-3.5 rounded-xl bg-[#daa520] text-[#151210] font-bold text-sm hover:bg-[#e8c255] transition-colors tracking-[0.02em]"
                >
                  Chart Expedition
                </motion.button>
                <button
                  onClick={() => router.push('/grow?demo=true')}
                  className="px-7 py-3.5 rounded-xl text-[#ede8e0]/40 hover:text-[#ede8e0]/70 transition-colors text-sm"
                >
                  Watch Demo
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/vote')}
                  className="px-7 py-3.5 rounded-xl border border-[#cc6633]/30 text-[#cc6633] hover:bg-[#cc6633]/10 hover:border-[#cc6633]/50 transition-all text-sm font-bold tracking-[0.02em]"
                >
                  Vote & Earn
                </motion.button>
              </div>
              <p className="mt-5 text-[#ede8e0]/20 text-xs">
                Building an autonomous agent?{' '}
                <button
                  onClick={() => router.push('/agents')}
                  className="text-[#daa520]/50 hover:text-[#daa520] transition-colors underline underline-offset-2 decoration-[#daa520]/20 hover:decoration-[#daa520]/50"
                >
                  Read the field manual
                </button>
              </p>
            </motion.div>
          </div>

          {/* Portal illustration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 max-w-md"
          >
            <OutlandsPortal />
          </motion.div>
        </div>

        {/* ─── Stats row ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-10 py-8 border-t border-[#ede8e0]/[0.05]"
        >
          {[
            { value: stats.total, label: 'EXPEDITIONS LAUNCHED' },
            { value: stats.specsGenerated, label: 'BLUEPRINTS DRAWN' },
            { value: stats.buildsInProgress, label: 'BUILDS ACTIVE' },
            { value: stats.settled, label: 'SETTLED' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-10">
              <div>
                <p className="text-2xl font-bold tracking-[-0.02em] text-[#ede8e0]/80">{s.value}</p>
                <p className="text-[12px] font-mono text-[#ede8e0]/25 mt-1 tracking-[0.2em]">{s.label}</p>
              </div>
              <div className="w-px h-8 bg-[#ede8e0]/[0.05]" />
            </div>
          ))}
          <button
            onClick={() => router.push('/explore')}
            className="text-[#daa520] hover:text-[#e8c255] text-sm font-bold transition-colors whitespace-nowrap tracking-[0.02em]"
          >
            Explore all →
          </button>
        </motion.div>

        {/* ─── How it works ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="py-20 border-t border-[#ede8e0]/[0.05]"
        >
          <p className="text-[12px] font-mono text-[#daa520]/50 uppercase tracking-[0.2em] mb-14">
            HOW IT WORKS
          </p>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-[calc(12.5%+14px)] right-[calc(12.5%+14px)] h-px bg-gradient-to-r from-[#daa520]/0 via-[#daa520]/15 to-[#daa520]/0 z-0" />

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
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isFirst
                              ? 'bg-[#daa520]/10 border border-[#daa520]/20'
                              : 'bg-[#cc6633]/8 border border-[#cc6633]/15'
                          }`}
                        >
                          <Icon />
                        </div>
                        <span
                          className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-mono ${
                            isFirst
                              ? 'bg-[#daa520] text-[#151210]'
                              : 'bg-[#151210] border border-[#cc6633]/30 text-[#cc6633]/60'
                          }`}
                        >
                          {i + 1}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#ede8e0]/[0.02] border border-[#ede8e0]/[0.05] rounded-xl p-5 min-h-[120px] flex flex-col justify-center group-hover:border-[#cc6633]/25 group-hover:bg-[#ede8e0]/[0.03] transition-all text-center">
                      <p className="text-[#ede8e0]/80 font-bold text-sm tracking-[-0.01em] mb-2 uppercase">
                        {item.label}
                      </p>
                      <p className="text-[#ede8e0]/30 text-xs leading-relaxed">{item.desc}</p>
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
          className="py-16 border-t border-[#ede8e0]/[0.05] flex items-center justify-between"
        >
          <div>
            <p className="text-[#ede8e0]/60 text-lg font-bold tracking-[-0.01em]">
              Ready to explore something?
            </p>
            <p className="text-[#ede8e0]/25 text-sm mt-1">
              Join {stats.total} expeditions already in the outlands.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/grow')}
            className="px-7 py-3.5 rounded-xl bg-[#daa520] text-[#151210] font-bold text-sm hover:bg-[#e8c255] transition-colors tracking-[0.02em]"
          >
            Chart Expedition
          </motion.button>
        </motion.div>

        <div className="h-12" />
      </main>
    </div>
  )
}
