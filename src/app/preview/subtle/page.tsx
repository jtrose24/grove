'use client'
import { motion } from 'framer-motion'

// ─── Stats (inlined to keep self-contained) ──────────────────────────────────
const stats = { total: 142, specsGenerated: 89, buildsInProgress: 23, settled: 14 }

// ─── Geometric Wireframe Portal SVG ──────────────────────────────────────────
// A diamond/rhombus portal shape with inner wireframe geometry, subtle glow,
// and cosmic landscape glimpsed through the opening.

function PortalMark() {
  // Outer diamond vertices
  const cx = 200, cy = 200
  const outerR = 150
  const top    = { x: cx, y: cy - outerR }
  const right  = { x: cx + outerR, y: cy }
  const bottom = { x: cx, y: cy + outerR }
  const left   = { x: cx - outerR, y: cy }

  // Inner diamond (portal opening)
  const innerR = 90
  const iTop    = { x: cx, y: cy - innerR }
  const iRight  = { x: cx + innerR, y: cy }
  const iBottom = { x: cx, y: cy + innerR }
  const iLeft   = { x: cx - innerR, y: cy }

  // Wireframe subdivision lines (art-deco facets)
  const wireLines = [
    // Outer-to-inner connecting struts
    { x1: top.x, y1: top.y, x2: iTop.x, y2: iTop.y },
    { x1: right.x, y1: right.y, x2: iRight.x, y2: iRight.y },
    { x1: bottom.x, y1: bottom.y, x2: iBottom.x, y2: iBottom.y },
    { x1: left.x, y1: left.y, x2: iLeft.x, y2: iLeft.y },
    // Diagonal facets — top-left quadrant
    { x1: top.x, y1: top.y, x2: iLeft.x, y2: iLeft.y },
    { x1: left.x, y1: left.y, x2: iTop.x, y2: iTop.y },
    // Top-right quadrant
    { x1: top.x, y1: top.y, x2: iRight.x, y2: iRight.y },
    { x1: right.x, y1: right.y, x2: iTop.x, y2: iTop.y },
    // Bottom-right quadrant
    { x1: bottom.x, y1: bottom.y, x2: iRight.x, y2: iRight.y },
    { x1: right.x, y1: right.y, x2: iBottom.x, y2: iBottom.y },
    // Bottom-left quadrant
    { x1: bottom.x, y1: bottom.y, x2: iLeft.x, y2: iLeft.y },
    { x1: left.x, y1: left.y, x2: iBottom.x, y2: iBottom.y },
  ]

  // Mid-diamond (halfway between outer and inner) for extra wireframe depth
  const midR = 120
  const mTop    = { x: cx, y: cy - midR }
  const mRight  = { x: cx + midR, y: cy }
  const mBottom = { x: cx, y: cy + midR }
  const mLeft   = { x: cx - midR, y: cy }

  // Small gold accent nodes at interesting intersections
  const goldNodes = [
    { x: cx, y: cy - innerR + 14 },
    { x: cx + innerR - 14, y: cy },
    { x: cx, y: cy + innerR - 14 },
    { x: cx - innerR - 0 + 14, y: cy },
    { x: cx, y: cy },
  ]

  // Stars visible "through" the portal
  const portalStars = [
    { x: 168, y: 158, r: 1.0, delay: 0 },
    { x: 222, y: 172, r: 0.7, delay: 0.3 },
    { x: 190, y: 210, r: 0.9, delay: 0.6 },
    { x: 215, y: 230, r: 0.6, delay: 0.2 },
    { x: 178, y: 240, r: 0.8, delay: 0.5 },
    { x: 200, y: 185, r: 1.1, delay: 0.1 },
    { x: 230, y: 200, r: 0.5, delay: 0.7 },
    { x: 170, y: 195, r: 0.6, delay: 0.4 },
    { x: 205, y: 150, r: 0.5, delay: 0.8 },
    { x: 195, y: 250, r: 0.7, delay: 0.35 },
    { x: 210, y: 160, r: 0.4, delay: 0.55 },
    { x: 185, y: 225, r: 0.5, delay: 0.65 },
  ]

  // Horizon line "landscape" visible through the portal (canyon silhouette)
  const horizonPath = 'M 135 220 Q 150 212 165 218 Q 178 210 190 215 Q 200 205 210 212 Q 222 208 235 215 Q 248 210 260 218 L 260 270 Q 230 260 200 265 Q 170 260 140 270 Z'

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
      <defs>
        {/* Portal interior gradient — warm sunset seen through the window */}
        <radialGradient id="portal-interior" cx="50%" cy="45%" r="40%">
          <stop offset="0%" stopColor="#d4884a" stopOpacity="0.12" />
          <stop offset="40%" stopColor="#8b4d7a" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#2a3a5c" stopOpacity="0.06" />
        </radialGradient>

        {/* Outer glow around the entire shape */}
        <radialGradient id="portal-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c4a862" stopOpacity="0.06" />
          <stop offset="50%" stopColor="#c4a862" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#c4a862" stopOpacity="0" />
        </radialGradient>

        {/* Gold line gradient for the inner diamond edge */}
        <linearGradient id="gold-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c4a862" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#d4b872" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#c4a862" stopOpacity="0.5" />
        </linearGradient>

        {/* Warm horizon gradient for the canyon landscape */}
        <linearGradient id="horizon-grad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#8b4d3a" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3a2a1a" stopOpacity="0.15" />
        </linearGradient>

        {/* Clip path: inner diamond for portal content */}
        <clipPath id="inner-diamond-clip">
          <polygon points={`${iTop.x},${iTop.y} ${iRight.x},${iRight.y} ${iBottom.x},${iBottom.y} ${iLeft.x},${iLeft.y}`} />
        </clipPath>
      </defs>

      {/* Background glow */}
      <rect x="0" y="0" width="400" height="400" fill="url(#portal-glow)" />

      {/* === PORTAL INTERIOR (clipped to inner diamond) === */}
      <g clipPath="url(#inner-diamond-clip)">
        {/* Cosmic background fill */}
        <rect x="100" y="100" width="200" height="200" fill="url(#portal-interior)" />

        {/* Very faint deep sky */}
        <motion.rect x="100" y="100" width="200" height="120" fill="#1a1a3a"
          initial={{ opacity: 0 }} animate={{ opacity: 0.08 }}
          transition={{ duration: 2, delay: 1 }} />

        {/* Canyon / desert horizon silhouette */}
        <motion.path d={horizonPath} fill="url(#horizon-grad)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }} />

        {/* Subtle warm glow at horizon line */}
        <motion.ellipse cx="200" cy="215" rx="60" ry="8" fill="#d4884a"
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.12, 0.08, 0.12] }}
          transition={{ duration: 6, delay: 2, repeat: Infinity, repeatType: 'reverse' }} />

        {/* Stars through portal */}
        {portalStars.map((star, i) => (
          <motion.circle key={`star-${i}`} cx={star.x} cy={star.y} r={star.r} fill="#e8e6e3"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.15, 0.4] }}
            transition={{ duration: 3 + star.delay, delay: 1.8 + star.delay, repeat: Infinity, repeatType: 'reverse' }} />
        ))}
      </g>

      {/* === OUTER DIAMOND (wireframe border) === */}
      <motion.polygon
        points={`${top.x},${top.y} ${right.x},${right.y} ${bottom.x},${bottom.y} ${left.x},${left.y}`}
        stroke="#7b8a6e" strokeWidth="1" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.25 }}
        transition={{ duration: 1.8, ease: 'easeOut' }} />

      {/* Mid diamond */}
      <motion.polygon
        points={`${mTop.x},${mTop.y} ${mRight.x},${mRight.y} ${mBottom.x},${mBottom.y} ${mLeft.x},${mLeft.y}`}
        stroke="#7b8a6e" strokeWidth="0.5" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.12 }}
        transition={{ duration: 1.6, delay: 0.3, ease: 'easeOut' }} />

      {/* Inner diamond — the portal frame — gold accent */}
      <motion.polygon
        points={`${iTop.x},${iTop.y} ${iRight.x},${iRight.y} ${iBottom.x},${iBottom.y} ${iLeft.x},${iLeft.y}`}
        stroke="url(#gold-line-grad)" strokeWidth="1.5" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.2, ease: 'easeOut' }} />

      {/* === WIREFRAME STRUTS (faceted geometry between outer and inner) === */}
      {wireLines.map((line, i) => (
        <motion.line key={`wire-${i}`}
          x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
          stroke="#7b8a6e" strokeWidth="0.4"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.15, pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.5 + i * 0.06, ease: 'easeOut' }} />
      ))}

      {/* === Small tick marks at diamond vertices (art-deco detail) === */}
      {[top, right, bottom, left].map((pt, i) => {
        const angle = [Math.PI / 2, 0, -Math.PI / 2, Math.PI][i]
        const tickLen = 8
        const dx = Math.cos(angle) * tickLen
        const dy = -Math.sin(angle) * tickLen
        return (
          <motion.line key={`tick-${i}`}
            x1={pt.x - dx} y1={pt.y - dy} x2={pt.x + dx} y2={pt.y + dy}
            stroke="#c4a862" strokeWidth="0.6"
            initial={{ opacity: 0 }} animate={{ opacity: 0.3 }}
            transition={{ duration: 0.6, delay: 1.8 + i * 0.1 }} />
        )
      })}

      {/* === GOLD ACCENT NODES at key positions === */}
      {goldNodes.map((n, i) => (
        <g key={`gn-${i}`}>
          {/* Outer ring */}
          <motion.circle cx={n.x} cy={n.y} r={i === 4 ? 8 : 5} fill="none"
            stroke="#c4a862" strokeWidth="0.5"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.2, 0.1, 0.2], scale: 1 }}
            transition={{
              opacity: { duration: 4, delay: 2.2 + i * 0.15, repeat: Infinity, repeatType: 'reverse' },
              scale: { duration: 0.5, delay: 2 + i * 0.12 }
            }} />
          {/* Inner dot */}
          <motion.circle cx={n.x} cy={n.y} r={i === 4 ? 3 : 2} fill="#c4a862"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.6, 0.35, 0.6], scale: 1 }}
            transition={{
              opacity: { duration: 4, delay: 2.2 + i * 0.15, repeat: Infinity, repeatType: 'reverse' },
              scale: { duration: 0.5, delay: 2 + i * 0.12 }
            }} />
        </g>
      ))}

      {/* === Gentle breathing / rotation animation on the whole portal === */}
      <motion.g
        animate={{ rotate: [0, 0.5, 0, -0.5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '200px 200px' }}>
        {/* Very faint secondary outer ring — circular, for contrast with the diamonds */}
        <motion.circle cx="200" cy="200" r="170" stroke="#c4a862" strokeWidth="0.3"
          strokeDasharray="3 8"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.08, 0.04, 0.08] }}
          transition={{ duration: 8, delay: 2.5, repeat: Infinity, repeatType: 'reverse' }} />
      </motion.g>

      {/* Corner deco — small triangular accents at the four corners of the viewBox */}
      {/* Top-left */}
      <motion.path d="M 20 40 L 30 20 L 40 40" stroke="#c4a862" strokeWidth="0.4" fill="none"
        initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ delay: 2.5, duration: 1 }} />
      {/* Top-right */}
      <motion.path d="M 360 40 L 370 20 L 380 40" stroke="#c4a862" strokeWidth="0.4" fill="none"
        initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ delay: 2.6, duration: 1 }} />
      {/* Bottom-left */}
      <motion.path d="M 20 360 L 30 380 L 40 360" stroke="#c4a862" strokeWidth="0.4" fill="none"
        initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ delay: 2.7, duration: 1 }} />
      {/* Bottom-right */}
      <motion.path d="M 360 360 L 370 380 L 380 360" stroke="#c4a862" strokeWidth="0.4" fill="none"
        initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ delay: 2.8, duration: 1 }} />
    </svg>
  )
}

// ─── Steps data ──────────────────────────────────────────────────────────────

const STEPS = [
  { label: 'Plant', desc: 'Speak your idea into existence. Start with a tweet, a napkin sketch, or a conversation.' },
  { label: 'Cultivate', desc: 'The Arborist shapes it into a structured growth plan with phases and milestones.' },
  { label: 'Grow', desc: 'Builders compete in auctions to bring each phase to life. Best bid wins.' },
  { label: 'Harvest', desc: 'Watch real metrics emerge as your idea becomes a living product.' },
]

// ─── Subtle Retro-Futurist Treatment ─────────────────────────────────────────

export default function SubtleTreatment() {
  return (
    <div className="min-h-screen bg-[#111110] text-[#e8e6e3] overflow-hidden relative" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── Warm gradient wash behind hero (3-5% opacity sunset orange/purple) ── */}
      <div className="absolute top-0 left-0 w-full h-[80vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(180, 100, 50, 0.04) 0%, rgba(100, 50, 120, 0.025) 40%, transparent 80%)',
        }} />

      {/* Existing ambient glows, tuned slightly warmer */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(50, 35, 15, 0.25) 0%, transparent 70%)' }} />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(30, 42, 28, 0.3) 0%, transparent 70%)' }} />

      {/* ── Nav ───────────────────────────────────────────────────────────── */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          {/* Logo — subtle geometric diamond instead of circles */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#c4a862]">
            <polygon points="12,2 22,12 12,22 2,12" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" />
            <polygon points="12,6 18,12 12,18 6,12" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.5" />
            <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.9" />
          </svg>
          <span className="text-[#e8e6e3] font-medium text-lg" style={{ letterSpacing: '0.06em' }}>GROVE</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm px-5 py-2.5 rounded-lg border border-[#c4a862]/20 text-[#c4a862]/80 hover:bg-[#c4a862]/10 hover:border-[#c4a862]/30 transition-all"
            style={{ letterSpacing: '0.04em' }}>
            Join Waitlist
          </button>
          <button className="text-sm px-4 py-2 rounded-lg bg-[#e8e6e3]/[0.06] text-[#e8e6e3]/60 hover:bg-[#e8e6e3]/[0.1] hover:text-[#e8e6e3]/80 transition-all"
            style={{ letterSpacing: '0.02em' }}>
            Launch App
          </button>
        </div>
      </nav>

      {/* ── Main ──────────────────────────────────────────────────────────── */}
      <main className="relative z-10 max-w-6xl mx-auto px-8">

        {/* ── Hero ── */}
        <div className="flex items-center min-h-[70vh] gap-8">
          <div className="flex-1 max-w-xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

              {/* Subhead — wider letter-spacing, art-deco feel */}
              <p className="text-[#7b8a6e] text-xs font-mono uppercase mb-8"
                style={{ letterSpacing: '0.2em' }}>
                A new model of company formation
              </p>

              {/* Headline — wider tracking, gold text gets a subtle warm gradient */}
              <h1 className="text-5xl sm:text-6xl font-semibold leading-[1.08] mb-7"
                style={{ letterSpacing: '-0.02em' }}>
                Plant an idea.{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #c4a862 0%, #d4b872 40%, #e8c878 60%, #c4a862 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Grow a company.
                </span>
              </h1>

              <p className="text-[#e8e6e3]/40 text-lg max-w-md leading-relaxed mb-10">
                Grove turns raw ideas into living companies — coordinated by intelligent agents and grown by a global network of builders.
              </p>

              <div className="flex items-center gap-3">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="px-7 py-3.5 rounded-xl bg-[#c4a862] text-[#111110] font-medium text-sm hover:bg-[#d4b872] transition-colors"
                  style={{ letterSpacing: '0.03em' }}>
                  Start Planting
                </motion.button>
                <button className="px-7 py-3.5 rounded-xl text-[#e8e6e3]/40 hover:text-[#e8e6e3]/70 transition-colors text-sm">
                  Watch Demo
                </button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="px-7 py-3.5 rounded-xl border border-[#c4a862]/25 text-[#c4a862] hover:bg-[#c4a862]/10 hover:border-[#c4a862]/40 transition-all text-sm font-medium"
                  style={{ letterSpacing: '0.03em' }}>
                  Vote &amp; Earn
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Portal illustration */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="flex-1 max-w-md">
            <PortalMark />
          </motion.div>
        </div>

        {/* ── Stats bar ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-10 py-8 border-t border-[#e8e6e3]/[0.05]"
          style={{ borderImage: 'linear-gradient(to right, transparent, rgba(196,168,98,0.08), rgba(123,138,110,0.08), transparent) 1' }}>
          {[
            { value: stats.total, label: 'ideas planted' },
            { value: stats.specsGenerated, label: 'specs generated' },
            { value: stats.buildsInProgress, label: 'builds active' },
            { value: stats.settled, label: 'settled' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-10">
              <div>
                <p className="text-2xl font-semibold text-[#e8e6e3]/80" style={{ letterSpacing: '-0.02em' }}>{s.value}</p>
                <p className="text-[11px] font-mono text-[#e8e6e3]/25 mt-1" style={{ letterSpacing: '0.08em' }}>{s.label}</p>
              </div>
              <div className="w-px h-8 bg-[#e8e6e3]/[0.05]" />
            </div>
          ))}
          <button className="text-[#7b8a6e] hover:text-[#8a9a7b] text-sm font-medium transition-colors whitespace-nowrap"
            style={{ letterSpacing: '0.03em' }}>
            Explore all &rarr;
          </button>
        </motion.div>

        {/* ── How it works (with geometric line decorations) ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
          className="py-20 border-t border-[#e8e6e3]/[0.05] relative">

          {/* Decorative thin horizon lines */}
          <div className="absolute top-12 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: '1px' }}>
            <div style={{
              width: '100%', height: '1px',
              background: 'linear-gradient(to right, transparent 5%, rgba(196,168,98,0.06) 20%, rgba(196,168,98,0.04) 50%, rgba(196,168,98,0.06) 80%, transparent 95%)',
            }} />
          </div>

          {/* Subtle triangular accent — left side */}
          <motion.svg className="absolute top-8 left-0 w-8 h-8 pointer-events-none" viewBox="0 0 30 30" fill="none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}>
            <path d="M 4 26 L 15 4 L 26 26" stroke="#c4a862" strokeWidth="0.5" opacity="0.12" />
            <path d="M 8 26 L 15 10 L 22 26" stroke="#c4a862" strokeWidth="0.3" opacity="0.08" />
          </motion.svg>

          {/* Subtle triangular accent — right side */}
          <motion.svg className="absolute top-8 right-0 w-8 h-8 pointer-events-none" viewBox="0 0 30 30" fill="none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 1 }}>
            <path d="M 4 26 L 15 4 L 26 26" stroke="#7b8a6e" strokeWidth="0.5" opacity="0.12" />
            <path d="M 8 26 L 15 10 L 22 26" stroke="#7b8a6e" strokeWidth="0.3" opacity="0.08" />
          </motion.svg>

          <p className="text-[11px] font-mono uppercase mb-14"
            style={{ letterSpacing: '0.2em', color: 'rgba(123,138,110,0.5)' }}>
            How it works
          </p>

          <div className="relative">
            {/* Connecting line between steps — warm gradient accent */}
            <div className="absolute top-10 left-[calc(12.5%+14px)] right-[calc(12.5%+14px)] h-px z-0"
              style={{
                background: 'linear-gradient(to right, rgba(196,168,98,0) 0%, rgba(196,168,98,0.12) 25%, rgba(123,138,110,0.15) 50%, rgba(196,168,98,0.12) 75%, rgba(196,168,98,0) 100%)',
              }} />

            {/* Small diamond markers on the connecting line */}
            {[1, 2, 3].map((i) => (
              <motion.div key={`line-diamond-${i}`}
                className="absolute top-[36px] z-[1]"
                style={{ left: `${25 * i}%`, transform: 'translateX(-50%)' }}
                initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ delay: 1.5 + i * 0.1 }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <polygon points="4,0 8,4 4,8 0,4" stroke="#c4a862" strokeWidth="0.6" fill="none" />
                </svg>
              </motion.div>
            ))}

            <div className="relative z-10 grid grid-cols-4 gap-5">
              {STEPS.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.1 }} className="group">
                  <div className="flex justify-center mb-5">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        i === 0
                          ? 'bg-[#c4a862]/10 border border-[#c4a862]/20'
                          : 'bg-[#7b8a6e]/[0.08] border border-[#7b8a6e]/15'
                      }`}>
                        {/* Step icons — redesigned with more geometric/art-deco character */}
                        {i === 0 && (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            {/* Seed diamond */}
                            <polygon points="9,3 13,9 9,15 5,9" stroke="#c4a862" strokeWidth="0.8" fill="none" opacity="0.5" />
                            <polygon points="9,6 11,9 9,12 7,9" fill="#c4a862" opacity="0.5" />
                          </svg>
                        )}
                        {i === 1 && (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            {/* Structured layers — deco bars */}
                            <rect x="3" y="4" width="12" height="2" rx="0.5" fill="#7b8a6e" opacity="0.5" />
                            <rect x="3" y="8" width="9" height="2" rx="0.5" fill="#7b8a6e" opacity="0.35" />
                            <rect x="3" y="12" width="6" height="2" rx="0.5" fill="#7b8a6e" opacity="0.2" />
                          </svg>
                        )}
                        {i === 2 && (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            {/* Wireframe triangle — building */}
                            <path d="M3 14L9 4L15 14Z" stroke="#7b8a6e" strokeWidth="0.8" fill="none" opacity="0.4" />
                            <path d="M6 14L9 7L12 14" stroke="#7b8a6e" strokeWidth="0.6" fill="none" opacity="0.25" />
                            <line x1="3" y1="14" x2="15" y2="14" stroke="#7b8a6e" strokeWidth="0.6" opacity="0.3" />
                          </svg>
                        )}
                        {i === 3 && (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            {/* Concentric target — harvest */}
                            <polygon points="9,3 15,9 9,15 3,9" stroke="#7b8a6e" strokeWidth="0.6" fill="none" opacity="0.3" />
                            <polygon points="9,5.5 12.5,9 9,12.5 5.5,9" stroke="#7b8a6e" strokeWidth="0.6" fill="none" opacity="0.4" />
                            <circle cx="9" cy="9" r="1.5" fill="#c4a862" opacity="0.6" />
                          </svg>
                        )}
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#111110] border border-[#e8e6e3]/[0.08] flex items-center justify-center text-[8px] font-mono text-[#e8e6e3]/30">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                  <div className="bg-[#e8e6e3]/[0.02] border border-[#e8e6e3]/[0.05] rounded-xl p-5 min-h-[120px] flex flex-col justify-center group-hover:border-[#7b8a6e]/20 group-hover:bg-[#e8e6e3]/[0.03] transition-all text-center relative overflow-hidden">
                    {/* Faint decorative corner triangles in each card */}
                    <svg className="absolute top-0 left-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                      <path d="M 0 0 L 16 0 L 0 16" stroke="#c4a862" strokeWidth="0.3" fill="none" opacity="0.08" />
                    </svg>
                    <svg className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none" viewBox="0 0 16 16" fill="none">
                      <path d="M 16 16 L 0 16 L 16 0" stroke="#c4a862" strokeWidth="0.3" fill="none" opacity="0.08" />
                    </svg>

                    <p className="text-[#e8e6e3]/80 font-medium text-sm mb-2" style={{ letterSpacing: '0.04em' }}>
                      {item.label}
                    </p>
                    <p className="text-[#e8e6e3]/30 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom horizon line decoration */}
          <div className="mt-16 pointer-events-none" style={{ height: '1px' }}>
            <div style={{
              width: '100%', height: '1px',
              background: 'linear-gradient(to right, transparent 10%, rgba(123,138,110,0.06) 30%, rgba(196,168,98,0.04) 50%, rgba(123,138,110,0.06) 70%, transparent 90%)',
            }} />
          </div>
        </motion.div>

        {/* ── CTA Footer ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }}
          className="py-16 border-t border-[#e8e6e3]/[0.05] flex items-center justify-between relative">

          {/* Faint warm gradient wash behind CTA */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 80% at 70% 50%, rgba(196,168,98,0.015) 0%, transparent 70%)',
            }} />

          <div className="relative">
            <p className="text-[#e8e6e3]/60 text-lg font-medium" style={{ letterSpacing: '0.01em' }}>
              Ready to grow something?
            </p>
            <p className="text-[#e8e6e3]/25 text-sm mt-1">
              Join {stats.total} ideas already in the grove.
            </p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="relative px-7 py-3.5 rounded-xl bg-[#c4a862] text-[#111110] font-medium text-sm hover:bg-[#d4b872] transition-colors"
            style={{ letterSpacing: '0.03em' }}>
            Start Planting
          </motion.button>
        </motion.div>

        <div className="h-12" />
      </main>
    </div>
  )
}
