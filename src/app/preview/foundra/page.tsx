'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { getAggregateStats } from '@/lib/seedData'

// ─── Foundra forge illustration SVG ─────────────────────────────────────────

function FoundraForge() {
  // Sparks / embers drifting upward
  const sparks = [
    { x: 200, y: 220, size: 2.0, delay: 0, dur: 5 },
    { x: 185, y: 235, size: 1.4, delay: 1.2, dur: 6 },
    { x: 218, y: 228, size: 1.8, delay: 2.5, dur: 5.5 },
    { x: 195, y: 210, size: 1.2, delay: 0.8, dur: 7 },
    { x: 208, y: 240, size: 1.6, delay: 3.2, dur: 4.5 },
    { x: 175, y: 225, size: 1.0, delay: 4.0, dur: 6.5 },
    { x: 225, y: 215, size: 1.3, delay: 5.5, dur: 8 },
    { x: 192, y: 245, size: 0.9, delay: 2.0, dur: 5.8 },
  ]

  // Satellite geometric shapes assembling around central hexagon
  const satellites = [
    { cx: 128, cy: 130, size: 22, type: 'hex', delay: 0.3 },
    { cx: 278, cy: 145, size: 18, type: 'diamond', delay: 0.5 },
    { cx: 145, cy: 270, size: 16, type: 'square', delay: 0.7 },
    { cx: 268, cy: 260, size: 20, type: 'hex', delay: 0.9 },
  ]

  // Progress arc segments (semicircle above central shape)
  const arcSegments = 8
  const arcRadius = 95
  const arcCx = 200
  const arcCy = 195

  function hexPoints(cx: number, cy: number, r: number): string {
    return Array.from({ length: 6 })
      .map((_, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2
        return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
      })
      .join(' ')
  }

  function satelliteShape(s: typeof satellites[0]) {
    if (s.type === 'hex') {
      return <polygon points={hexPoints(0, 0, s.size)} stroke="#6b7080" strokeWidth="1" fill="none" opacity="0.25" />
    }
    if (s.type === 'diamond') {
      return (
        <polygon
          points={`0,${-s.size} ${s.size},0 0,${s.size} ${-s.size},0`}
          stroke="#6b7080" strokeWidth="1" fill="none" opacity="0.2"
        />
      )
    }
    // square
    const half = s.size * 0.7
    return <rect x={-half} y={-half} width={half * 2} height={half * 2} stroke="#6b7080" strokeWidth="1" fill="none" opacity="0.2" rx="2" />
  }

  return (
    <motion.svg
      viewBox="0 0 400 430"
      className="w-full h-full"
      fill="none"
    >
      <defs>
        {/* Ember glow radial gradient */}
        <radialGradient id="forge-ember-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e85530" stopOpacity="0.45" />
          <stop offset="40%" stopColor="#e85530" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#e85530" stopOpacity="0" />
        </radialGradient>

        {/* Ambient background warmth */}
        <radialGradient id="forge-ambient" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#e85530" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#e85530" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient warm backdrop */}
      <ellipse cx="200" cy="195" rx="190" ry="170" fill="url(#forge-ambient)" />

      {/* ─── Isometric grid lines ─── */}
      {Array.from({ length: 14 }).map((_, i) => {
        const offset = i * 35 - 30
        return (
          <g key={`grid-${i}`}>
            {/* 30-degree lines */}
            <line
              x1={offset - 50}
              y1={430}
              x2={offset + 230}
              y2={0}
              stroke="#6b7080"
              strokeWidth="0.4"
              opacity="0.04"
            />
            {/* 150-degree lines (mirrored) */}
            <line
              x1={400 - offset + 50}
              y1={430}
              x2={400 - offset - 230}
              y2={0}
              stroke="#6b7080"
              strokeWidth="0.4"
              opacity="0.035"
            />
          </g>
        )
      })}

      {/* Horizontal grid lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`hgrid-${i}`}
          x1="20" y1={60 + i * 50}
          x2="380" y2={60 + i * 50}
          stroke="#6b7080" strokeWidth="0.3" opacity="0.03"
        />
      ))}

      {/* ─── Central hexagonal structure ─── */}
      <motion.polygon
        points={hexPoints(200, 195, 72)}
        stroke="#6b7080"
        strokeWidth="1.5"
        fill="none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ transformOrigin: '200px 195px' }}
      />

      {/* Inner hexagon */}
      <motion.polygon
        points={hexPoints(200, 195, 50)}
        stroke="#6b7080"
        strokeWidth="0.8"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />

      {/* Center ember glow with heat shimmer */}
      <motion.ellipse
        cx="200" cy="195" rx="55" ry="55"
        fill="url(#forge-ember-glow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.85, 0.95, 0.85] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Hot core dot */}
      <motion.circle
        cx="200" cy="195" r="6"
        fill="#e85530"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ─── Segmented progress arc (top semicircle) ─── */}
      {Array.from({ length: arcSegments }).map((_, i) => {
        const startAngle = Math.PI + (Math.PI / arcSegments) * i
        const endAngle = Math.PI + (Math.PI / arcSegments) * (i + 0.75)
        const x1 = arcCx + arcRadius * Math.cos(startAngle)
        const y1 = arcCy + arcRadius * Math.sin(startAngle)
        const x2 = arcCx + arcRadius * Math.cos(endAngle)
        const y2 = arcCy + arcRadius * Math.sin(endAngle)
        return (
          <motion.line
            key={`arc-${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#e85530"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.15, delay: 1.0 + i * 0.12 }}
          />
        )
      })}

      {/* ─── Satellite geometric shapes ─── */}
      {satellites.map((s, i) => (
        <motion.g
          key={`sat-${i}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.8 + s.delay }}
          style={{ transformOrigin: `${s.cx}px ${s.cy}px` }}
        >
          <g transform={`translate(${s.cx}, ${s.cy})`}>
            {satelliteShape(s)}
          </g>
        </motion.g>
      ))}

      {/* Connecting lines from satellites to center */}
      {satellites.map((s, i) => (
        <motion.line
          key={`conn-${i}`}
          x1={s.cx} y1={s.cy}
          x2="200" y2="195"
          stroke="#6b7080"
          strokeWidth="0.4"
          strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 0.3, delay: 1.2 + i * 0.15 }}
        />
      ))}

      {/* ─── Rivet dots at structural intersections ─── */}
      {[
        { x: 200, y: 123 }, { x: 262, y: 159 }, { x: 262, y: 231 },
        { x: 200, y: 267 }, { x: 138, y: 231 }, { x: 138, y: 159 },
        // Inner hex rivets
        { x: 200, y: 145 }, { x: 243, y: 170 }, { x: 243, y: 220 },
        { x: 200, y: 245 }, { x: 157, y: 220 }, { x: 157, y: 170 },
      ].map((r, i) => (
        <circle
          key={`rivet-${i}`}
          cx={r.x} cy={r.y} r="1.8"
          fill="#6b7080" opacity="0.2"
        />
      ))}

      {/* ─── Sparks / embers drifting upward ─── */}
      {sparks.map((spark, i) => (
        <motion.circle
          key={`spark-${i}`}
          cx={spark.x}
          cy={spark.y}
          r={spark.size}
          fill="#e85530"
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.8, 0.6, 0.3, 0],
            y: [0, -40, -80, -130, -180],
            x: [0, (i % 2 === 0 ? 1 : -1) * 8, (i % 2 === 0 ? -1 : 1) * 5, (i % 2 === 0 ? 1 : -1) * 12, 0],
          }}
          transition={{
            duration: spark.dur,
            delay: spark.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* ─── Structural cross-braces inside hexagon ─── */}
      {[
        [200, 123, 200, 267],
        [138, 159, 262, 231],
        [262, 159, 138, 231],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={`brace-${i}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#6b7080" strokeWidth="0.4" opacity="0.08"
        />
      ))}
    </motion.svg>
  )
}

// ─── Step icons (industrial / forge themed) ──────────────────────────────────

function FileIcon() {
  // Document with folded corner
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 2h7l4 4v10H4V2z" stroke="#e85530" strokeWidth="0.9" opacity="0.6" />
      <path d="M11 2v4h4" stroke="#e85530" strokeWidth="0.8" opacity="0.4" />
      <line x1="6" y1="9" x2="12" y2="9" stroke="#e85530" strokeWidth="0.7" opacity="0.35" />
    </svg>
  )
}

function BriefIcon() {
  // Blueprint grid / crosshair
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="3" y="3" width="4" height="4" stroke="#6b7080" strokeWidth="0.7" opacity="0.4" />
      <rect x="9" y="3" width="4" height="4" stroke="#6b7080" strokeWidth="0.7" opacity="0.35" />
      <rect x="3" y="9" width="4" height="4" stroke="#6b7080" strokeWidth="0.7" opacity="0.35" />
      <rect x="9" y="9" width="4" height="4" stroke="#6b7080" strokeWidth="0.7" opacity="0.3" />
      {/* Crosshair center */}
      <line x1="8" y1="5" x2="8" y2="13" stroke="#6b7080" strokeWidth="0.5" opacity="0.25" />
      <line x1="4" y1="8" x2="12" y2="8" stroke="#6b7080" strokeWidth="0.5" opacity="0.25" />
    </svg>
  )
}

function BuildIcon() {
  // Gear / toothed circle
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="3.5" stroke="#6b7080" strokeWidth="0.8" opacity="0.4" />
      <circle cx="9" cy="9" r="1.2" fill="#6b7080" opacity="0.35" />
      {/* Gear teeth */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (Math.PI / 4) * i
        const ix = 9 + Math.cos(angle) * 5
        const iy = 9 + Math.sin(angle) * 5
        const ox = 9 + Math.cos(angle) * 6.8
        const oy = 9 + Math.sin(angle) * 6.8
        return (
          <line key={i} x1={ix} y1={iy} x2={ox} y2={oy} stroke="#6b7080" strokeWidth="1.2" opacity="0.35" strokeLinecap="round" />
        )
      })}
    </svg>
  )
}

function LaunchIcon() {
  // Upward chevron / ascending arrow
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M5 12L9 5L13 12" stroke="#6b7080" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      <path d="M6.5 10L9 6.5L11.5 10" stroke="#6b7080" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
      <line x1="9" y1="5" x2="9" y2="16" stroke="#6b7080" strokeWidth="0.7" opacity="0.2" />
    </svg>
  )
}

// ─── Steps data ───────────────────────────────────────────────────────────────

const STEPS = [
  { label: 'File', desc: 'State your idea plainly. No pitch deck. No co-founder search. No permission.' },
  { label: 'Brief', desc: 'The Architect structures it into a phased build plan with milestones and scope.' },
  { label: 'Build', desc: 'Contributors compete in auctions to bring each phase to life. Best bid wins.' },
  { label: 'Launch', desc: 'Watch real metrics emerge as your idea becomes a living product.' },
]

const STEP_ICONS = [FileIcon, BriefIcon, BuildIcon, LaunchIcon]

// ─── Foundra logo mark: circle in square ────────────────────────────────────

function FoundraMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {/* Square outline — forge stamp */}
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#6b7080" strokeWidth="1" opacity="0.6" />
      {/* Ember circle */}
      <circle cx="12" cy="12" r="5" fill="#e85530" opacity="0.9" />
    </svg>
  )
}

// ─── Waitlist dropdown (self-contained) ───────────────────────────────────────

function FoundraWaitlist() {
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm px-4 py-2 rounded-md bg-[#e85530] text-[#101012] font-bold hover:bg-[#f06840] transition-colors duration-150 tracking-[0.02em]"
      >
        JOIN WAITLIST
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 top-12 w-72 bg-[#18181c] border border-[#e85530]/20 rounded-lg p-4 shadow-2xl z-50"
        >
          {submitted ? (
            <p className="text-[#e85530] text-sm text-center font-bold">You&apos;re on the list.</p>
          ) : (
            <>
              <p className="text-[#e0e0e0]/60 text-xs mb-3">Get early access to Foundra.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@foundra.co"
                  className="flex-1 bg-[#101012] border border-[#e0e0e0]/10 rounded-md px-3 py-2 text-sm text-[#e0e0e0] placeholder:text-[#e0e0e0]/20 focus:outline-none focus:border-[#e85530]/40"
                />
                <button
                  onClick={() => { if (email) setSubmitted(true) }}
                  className="px-3 py-2 rounded-md bg-[#e85530] text-[#101012] text-sm font-bold hover:bg-[#f06840] transition-colors duration-150"
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
// FOUNDRA HOMEPAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function FoundraHomePage() {
  const router = useRouter()
  const stats = getAggregateStats()

  return (
    <div className="min-h-screen bg-[#101012] text-[#e0e0e0] overflow-hidden relative">
      {/* Ambient glow blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#2a0808]/[0.15] blur-[160px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#08081a]/[0.20] blur-[140px] pointer-events-none" />

      {/* ─── Nav ─── */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <FoundraMark />
          <span className="text-[#e0e0e0] font-bold text-lg tracking-[-0.04em]">Foundra</span>
        </div>
        <div className="flex items-center gap-4">
          <FoundraWaitlist />
          <button
            onClick={() => router.push('/grow')}
            className="text-sm px-4 py-2 rounded-md bg-[#e0e0e0]/[0.06] text-[#e0e0e0]/60 hover:bg-[#e0e0e0]/[0.1] hover:text-[#e0e0e0]/80 transition-all duration-150 font-bold tracking-[0.02em] uppercase"
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
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6b7080] mb-8">
                Democratized company formation
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold leading-[1.05] tracking-[-0.04em] mb-7">
                Start a company{' '}
                <span className="text-[#e85530]">with a sentence.</span>
              </h1>
              <p className="text-[#e0e0e0]/40 text-lg max-w-md leading-relaxed mb-10">
                Foundra turns raw ideas into living companies — coordinated by intelligent agents and built by a global network of contributors.
              </p>
              <div className="flex items-center gap-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/grow')}
                  className="px-6 py-3 rounded-md bg-[#e85530] text-[#101012] font-bold text-sm hover:bg-[#f06840] transition-colors duration-150 tracking-[0.02em]"
                >
                  Start Building
                </motion.button>
                <button
                  onClick={() => router.push('/grow?demo=true')}
                  className="px-6 py-3 rounded-md text-[#e0e0e0]/40 hover:text-[#e0e0e0]/70 transition-colors duration-150 text-sm"
                >
                  Watch Demo
                </button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/vote')}
                  className="px-6 py-3 rounded-md border-2 border-[#6b7080]/40 text-[#8890a0] hover:bg-[#6b7080]/10 hover:border-[#6b7080]/60 transition-all duration-150 text-sm font-bold tracking-[0.02em]"
                >
                  Vote & Earn
                </motion.button>
              </div>
              <p className="mt-5 text-[#e0e0e0]/20 text-xs">
                Building an autonomous agent?{' '}
                <button
                  onClick={() => router.push('/agents')}
                  className="text-[#6b7080]/70 hover:text-[#8890a0] transition-colors duration-150 underline underline-offset-2 decoration-[#6b7080]/20 hover:decoration-[#6b7080]/50"
                >
                  Read the skill file
                </button>
              </p>
            </motion.div>
          </div>

          {/* Forge illustration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex-1 max-w-md"
          >
            <FoundraForge />
          </motion.div>
        </div>

        {/* ─── Stats row ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex items-center gap-10 py-6 border-t border-[#e0e0e0]/[0.05]"
        >
          {[
            { value: stats.total, label: 'VENTURES FILED' },
            { value: stats.specsGenerated, label: 'BRIEFS DRAFTED' },
            { value: stats.buildsInProgress, label: 'BUILDS ACTIVE' },
            { value: stats.settled, label: 'SHIPPED' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-10">
              <div>
                <p className="text-2xl font-bold tracking-[-0.04em] text-[#e0e0e0]/80">{s.value}</p>
                <p className="text-[10px] font-bold text-[#e0e0e0]/25 mt-1 tracking-[0.18em] uppercase">{s.label}</p>
              </div>
              <div className="w-px h-8 bg-[#e0e0e0]/[0.05]" />
            </div>
          ))}
          <button
            onClick={() => router.push('/explore')}
            className="text-[#e85530] hover:text-[#f06840] text-sm font-bold transition-colors duration-150 whitespace-nowrap tracking-[0.02em]"
          >
            Explore all →
          </button>
        </motion.div>

        {/* ─── How it works ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="py-12 border-t border-[#e0e0e0]/[0.05]"
        >
          <p className="text-[10px] font-bold text-[#e85530]/50 uppercase tracking-[0.18em] mb-12">
            HOW IT WORKS
          </p>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-[calc(12.5%+14px)] right-[calc(12.5%+14px)] h-px bg-gradient-to-r from-[#6b7080]/0 via-[#6b7080]/15 to-[#6b7080]/0 z-0" />

            <div className="relative z-10 grid grid-cols-4 gap-5">
              {STEPS.map((item, i) => {
                const Icon = STEP_ICONS[i]
                const isFirst = i === 0
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.08, duration: 0.15 }}
                    className="group"
                  >
                    <div className="flex justify-center mb-5">
                      <div className="relative">
                        <div
                          className={`w-10 h-10 rounded-md flex items-center justify-center ${
                            isFirst
                              ? 'bg-[#e85530]/10 border border-[#e85530]/20'
                              : 'bg-[#6b7080]/[0.08] border border-[#6b7080]/15'
                          }`}
                        >
                          <Icon />
                        </div>
                        <span
                          className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-mono font-bold ${
                            isFirst
                              ? 'bg-[#e85530] text-[#101012]'
                              : 'bg-[#101012] border border-[#6b7080]/30 text-[#6b7080]/60'
                          }`}
                        >
                          {i + 1}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#e0e0e0]/[0.02] border border-[#e0e0e0]/[0.05] border-l-2 border-l-transparent rounded-lg p-5 min-h-[120px] flex flex-col justify-center group-hover:border-l-[#e85530] group-hover:bg-[#e0e0e0]/[0.03] transition-all duration-150 text-center">
                      <p className="text-[#e0e0e0]/80 font-bold text-sm tracking-[-0.01em] mb-2 uppercase">
                        {item.label}
                      </p>
                      <p className="text-[#e0e0e0]/30 text-xs leading-relaxed">{item.desc}</p>
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
          transition={{ duration: 0.4, delay: 0.7 }}
          className="py-12 border-t border-[#e0e0e0]/[0.05] flex items-center justify-between"
        >
          <div>
            <p className="text-[#e0e0e0]/60 text-lg font-bold tracking-[-0.04em]">
              Ready to build something?
            </p>
            <p className="text-[#e0e0e0]/25 text-sm mt-1">
              Join {stats.total} ventures already in foundra.
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/grow')}
            className="px-6 py-3 rounded-md bg-[#e85530] text-[#101012] font-bold text-sm hover:bg-[#f06840] transition-colors duration-150 tracking-[0.02em]"
          >
            Start Building
          </motion.button>
        </motion.div>

        <div className="h-12" />
      </main>
    </div>
  )
}
