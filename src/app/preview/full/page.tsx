'use client'
import { motion } from 'framer-motion'

// ─── Color palette ───────────────────────────────────────────────────────────
const GOLD    = '#daa520'
const GOLD_LT = '#e8c255'
const ORANGE  = '#cc6633'
const PURPLE  = '#7b52a0'
const BLUE    = '#3d5a99'
const BG      = '#151210'
const TEXT    = '#ede8e0'

// ─── Retro-futurist hero SVG ─────────────────────────────────────────────────

function RetroPortalArt() {
  // Stars — thin crosses and dots scattered in the sky
  const stars = [
    { x: 80, y: 45, s: 1.2 }, { x: 155, y: 30, s: 0.8 }, { x: 230, y: 55, s: 1.0 },
    { x: 310, y: 25, s: 0.7 }, { x: 370, y: 50, s: 1.1 }, { x: 420, y: 35, s: 0.6 },
    { x: 60, y: 80, s: 0.5 }, { x: 190, y: 70, s: 0.9 }, { x: 340, y: 72, s: 0.7 },
    { x: 440, y: 65, s: 0.8 }, { x: 120, y: 95, s: 0.6 }, { x: 270, y: 42, s: 1.0 },
    { x: 400, y: 90, s: 0.5 }, { x: 50, y: 55, s: 0.4 }, { x: 480, y: 48, s: 0.7 },
    { x: 140, y: 110, s: 0.5 }, { x: 360, y: 100, s: 0.6 }, { x: 250, y: 20, s: 0.9 },
  ]

  // Wireframe polyhedrons — icosahedron-like shapes
  const polyhedrons = [
    { cx: 140, cy: 100, size: 22, rot: 15, delay: 0 },
    { cx: 380, cy: 85, size: 18, rot: -20, delay: 0.3 },
    { cx: 260, cy: 60, size: 14, rot: 30, delay: 0.6 },
    { cx: 90, cy: 140, size: 11, rot: -10, delay: 0.9 },
    { cx: 430, cy: 120, size: 13, rot: 25, delay: 1.2 },
  ]

  function Polyhedron({ cx, cy, size, rot, delay }: { cx: number; cy: number; size: number; rot: number; delay: number }) {
    // Generate an icosahedron-like wireframe shape
    const s = size
    const pts = [
      { x: 0, y: -s },                    // top
      { x: s * 0.95, y: -s * 0.31 },      // upper right
      { x: s * 0.59, y: s * 0.81 },       // lower right
      { x: -s * 0.59, y: s * 0.81 },      // lower left
      { x: -s * 0.95, y: -s * 0.31 },     // upper left
      { x: 0, y: s * 0.2 },               // inner center
    ]
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],  // outer pentagon
      [0, 5], [1, 5], [2, 5], [3, 5], [4, 5],  // inner connections
      [0, 2], [0, 3], [1, 3], [1, 4], [2, 4],  // cross edges
    ]

    return (
      <motion.g
        initial={{ opacity: 0, rotate: rot }}
        animate={{ opacity: [0, 0.5, 0.35, 0.5], rotate: rot + 360 }}
        transition={{
          opacity: { duration: 8, delay: 2.5 + delay, repeat: Infinity, repeatType: 'reverse' },
          rotate: { duration: 60 + delay * 10, repeat: Infinity, ease: 'linear' },
        }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {edges.map((e, i) => (
          <line
            key={i}
            x1={cx + pts[e[0]].x} y1={cy + pts[e[0]].y}
            x2={cx + pts[e[1]].x} y2={cy + pts[e[1]].y}
            stroke={GOLD_LT} strokeWidth={0.5} opacity={0.4}
          />
        ))}
        {pts.map((p, i) => (
          <circle key={`p-${i}`} cx={cx + p.x} cy={cy + p.y} r={0.6} fill={GOLD_LT} opacity={0.5} />
        ))}
      </motion.g>
    )
  }

  return (
    <svg viewBox="0 0 520 580" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Sky gradient — deep cosmic purple to warm horizon */}
        <linearGradient id="sky-grad" x1="260" y1="0" x2="260" y2="420" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1a0e2e" />
          <stop offset="25%" stopColor="#2a1540" />
          <stop offset="50%" stopColor="#4a2050" />
          <stop offset="72%" stopColor="#8b3a2a" />
          <stop offset="88%" stopColor="#cc6633" />
          <stop offset="100%" stopColor="#daa520" />
        </linearGradient>

        {/* Sun gradient — golden center with warm rings */}
        <radialGradient id="sun-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe088" />
          <stop offset="30%" stopColor="#daa520" />
          <stop offset="60%" stopColor="#cc6633" />
          <stop offset="100%" stopColor="#cc6633" stopOpacity="0" />
        </radialGradient>

        {/* Sun glow */}
        <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#daa520" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#cc6633" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#cc6633" stopOpacity="0" />
        </radialGradient>

        {/* Canyon gradients */}
        <linearGradient id="canyon-far" x1="260" y1="280" x2="260" y2="420" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5a2848" />
          <stop offset="100%" stopColor="#3d1a35" />
        </linearGradient>
        <linearGradient id="canyon-mid" x1="260" y1="320" x2="260" y2="420" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6b2d4a" />
          <stop offset="100%" stopColor="#4a1e38" />
        </linearGradient>
        <linearGradient id="canyon-near" x1="260" y1="360" x2="260" y2="440" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3d1830" />
          <stop offset="100%" stopColor="#1a0e1a" />
        </linearGradient>
        <linearGradient id="canyon-front" x1="260" y1="380" x2="260" y2="460" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2a1020" />
          <stop offset="100%" stopColor="#151210" />
        </linearGradient>

        {/* Ground/floor gradient */}
        <linearGradient id="floor-grad" x1="260" y1="420" x2="260" y2="560" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e1615" />
          <stop offset="100%" stopColor="#151210" />
        </linearGradient>

        {/* Arch frame gradient — art deco warm metal */}
        <linearGradient id="arch-frame" x1="260" y1="0" x2="260" y2="560" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#daa520" />
          <stop offset="30%" stopColor="#c4922a" />
          <stop offset="70%" stopColor="#8a6518" />
          <stop offset="100%" stopColor="#5a4210" />
        </linearGradient>

        {/* Horizon glow */}
        <radialGradient id="horizon-glow" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="#cc6633" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#cc6633" stopOpacity="0" />
        </radialGradient>

        {/* Clipping mask for the arch portal interior */}
        <clipPath id="portal-clip">
          <path d="M 90 520 L 90 200 Q 90 50 260 50 Q 430 50 430 200 L 430 520 Z" />
        </clipPath>

        {/* Art deco detail pattern */}
        <linearGradient id="deco-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#daa520" />
          <stop offset="50%" stopColor="#e8c255" />
          <stop offset="100%" stopColor="#daa520" />
        </linearGradient>
      </defs>

      {/* === OUTER FRAME BACKGROUND (dark surround) === */}
      <rect x="0" y="0" width="520" height="580" fill={BG} />

      {/* === PORTAL INTERIOR — clipped to arch shape === */}
      <g clipPath="url(#portal-clip)">
        {/* Sky */}
        <motion.rect
          x="60" y="40" width="400" height="490"
          fill="url(#sky-grad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />

        {/* Horizon glow wash */}
        <motion.ellipse
          cx="260" cy="370" rx="250" ry="120"
          fill="url(#horizon-glow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Stars */}
        {stars.map((star, i) => (
          <motion.g key={`star-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.4, 0.7] }}
            transition={{ duration: 3 + i * 0.3, delay: 2 + i * 0.15, repeat: Infinity, repeatType: 'reverse' }}
          >
            {/* Cross star */}
            <line x1={star.x - star.s * 3} y1={star.y} x2={star.x + star.s * 3} y2={star.y} stroke="#ede8e0" strokeWidth={star.s * 0.4} opacity={0.8} />
            <line x1={star.x} y1={star.y - star.s * 3} x2={star.x} y2={star.y + star.s * 3} stroke="#ede8e0" strokeWidth={star.s * 0.4} opacity={0.8} />
            <circle cx={star.x} cy={star.y} r={star.s * 0.5} fill="#ede8e0" opacity={0.9} />
          </motion.g>
        ))}

        {/* === THE SUN — geometric with concentric rings === */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          style={{ transformOrigin: '260px 330px' }}
        >
          {/* Large outer glow */}
          <motion.circle
            cx="260" cy="330" r="140"
            fill="url(#sun-glow)"
            animate={{ r: [140, 150, 140] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Concentric rings */}
          {[110, 90, 72, 56].map((r, i) => (
            <motion.circle
              key={`ring-${i}`}
              cx="260" cy="330" r={r}
              fill="none"
              stroke={GOLD}
              strokeWidth={i === 0 ? 0.5 : i === 1 ? 0.8 : 0.6}
              opacity={0.15 + i * 0.05}
              animate={{ r: [r, r + 2, r] }}
              transition={{ duration: 4 + i, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          {/* Sun disc — with horizontal slice lines (retro 70s style) */}
          <circle cx="260" cy="330" r="44" fill="url(#sun-grad)" />
          {/* Horizontal bands across the sun for that retro sliced look */}
          {[310, 316, 322, 328, 334, 340, 346, 352].map((y, i) => {
            if (y <= 286 || y >= 374) return null
            // Calculate chord width at this y
            const dy = Math.abs(y - 330)
            const r = 44
            if (dy >= r) return null
            const halfChord = Math.sqrt(r * r - dy * dy)
            return (
              <rect
                key={`slice-${i}`}
                x={260 - halfChord}
                y={y}
                width={halfChord * 2}
                height={2.5}
                fill={BG}
                opacity={0.25 + i * 0.06}
              />
            )
          })}

          {/* Radial rays from sun — thin golden lines */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2
            const innerR = 48
            const outerR = 70 + (i % 3 === 0 ? 20 : 0)
            return (
              <motion.line
                key={`ray-${i}`}
                x1={260 + Math.cos(angle) * innerR}
                y1={330 + Math.sin(angle) * innerR}
                x2={260 + Math.cos(angle) * outerR}
                y2={330 + Math.sin(angle) * outerR}
                stroke={GOLD_LT}
                strokeWidth={i % 3 === 0 ? 0.8 : 0.4}
                opacity={i % 3 === 0 ? 0.25 : 0.12}
                animate={{ opacity: i % 3 === 0 ? [0.25, 0.35, 0.25] : [0.12, 0.18, 0.12] }}
                transition={{ duration: 3, delay: i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
              />
            )
          })}
        </motion.g>

        {/* === FLOATING WIREFRAME POLYHEDRONS === */}
        {polyhedrons.map((p, i) => (
          <Polyhedron key={`poly-${i}`} {...p} />
        ))}

        {/* === CANYON/MOUNTAIN LAYERS — from back to front === */}

        {/* Far mountains — purple silhouette */}
        <motion.path
          d="M 60 370 Q 100 320 140 340 Q 170 310 200 325 Q 230 290 260 310 Q 290 280 320 300 Q 350 290 380 320 Q 410 300 440 340 Q 460 320 470 370 Z"
          fill="url(#canyon-far)"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        />

        {/* Mid canyon layer */}
        <motion.path
          d="M 60 390 Q 90 355 120 370 Q 150 340 190 360 Q 210 345 240 355 Q 270 335 300 350 Q 330 340 360 365 Q 390 345 420 360 Q 450 350 470 390 L 470 430 L 60 430 Z"
          fill="url(#canyon-mid)"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5 }}
        />

        {/* Near canyon walls */}
        <motion.path
          d="M 60 410 Q 80 385 110 395 Q 130 380 160 390 Q 200 370 230 385 Q 260 375 290 385 Q 330 370 360 390 Q 390 380 420 395 Q 450 385 470 410 L 470 460 L 60 460 Z"
          fill="url(#canyon-near)"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.8 }}
        />

        {/* Foreground canyon — darkest, frames the bottom */}
        <motion.path
          d="M 60 430 Q 100 410 150 420 Q 200 405 250 415 Q 300 408 350 420 Q 400 410 460 430 L 460 550 L 60 550 Z"
          fill="url(#canyon-front)"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.0 }}
        />

        {/* Ground floor fading to bg */}
        <rect x="60" y="440" width="410" height="100" fill="url(#floor-grad)" />
      </g>

      {/* === ARCH PORTAL FRAME — art deco metallic border === */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      >
        {/* Main arch frame — outer */}
        <path
          d="M 78 540 L 78 200 Q 78 38 260 38 Q 442 38 442 200 L 442 540"
          fill="none" stroke="url(#arch-frame)" strokeWidth="3"
        />

        {/* Inner arch line */}
        <path
          d="M 92 535 L 92 202 Q 92 58 260 58 Q 428 58 428 202 L 428 535"
          fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.3"
        />

        {/* Outer decorative arch line */}
        <path
          d="M 68 545 L 68 198 Q 68 28 260 28 Q 452 28 452 198 L 452 545"
          fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.15"
        />

        {/* Art deco keystone at top of arch */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          style={{ transformOrigin: '260px 30px' }}
        >
          <path d="M 252 18 L 260 8 L 268 18 Z" fill={GOLD} opacity="0.6" />
          <path d="M 248 24 L 260 12 L 272 24 Z" fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.35" />
          <line x1="260" y1="24" x2="260" y2="38" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
        </motion.g>

        {/* Deco corner details — top left of arch */}
        <g opacity="0.5">
          {/* Left pilaster top */}
          <rect x="72" y="195" width="14" height="2" fill={GOLD} opacity="0.35" />
          <rect x="72" y="200" width="14" height="1" fill={GOLD} opacity="0.25" />
          <rect x="72" y="205" width="14" height="2" fill={GOLD} opacity="0.35" />

          {/* Right pilaster top */}
          <rect x="434" y="195" width="14" height="2" fill={GOLD} opacity="0.35" />
          <rect x="434" y="200" width="14" height="1" fill={GOLD} opacity="0.25" />
          <rect x="434" y="205" width="14" height="2" fill={GOLD} opacity="0.35" />

          {/* Left base deco */}
          <rect x="72" y="520" width="14" height="2" fill={GOLD} opacity="0.3" />
          <rect x="72" y="525" width="14" height="1" fill={GOLD} opacity="0.2" />
          <rect x="72" y="530" width="14" height="2" fill={GOLD} opacity="0.3" />
          <path d="M 74 535 L 78 540 L 82 535" fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.3" />

          {/* Right base deco */}
          <rect x="434" y="520" width="14" height="2" fill={GOLD} opacity="0.3" />
          <rect x="434" y="525" width="14" height="1" fill={GOLD} opacity="0.2" />
          <rect x="434" y="530" width="14" height="2" fill={GOLD} opacity="0.3" />
          <path d="M 438 535 L 442 540 L 446 535" fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.3" />
        </g>

        {/* Deco side columns — vertical lines with periodic diamonds */}
        <g opacity="0.2">
          {/* Left column details */}
          {[240, 280, 320, 360, 400, 440, 480].map((y, i) => (
            <g key={`ldeco-${i}`}>
              <line x1="85" y1={y - 6} x2="85" y2={y + 6} stroke={GOLD} strokeWidth="0.5" />
              <path d={`M 85 ${y - 3} L 87 ${y} L 85 ${y + 3} L 83 ${y} Z`} fill={GOLD} opacity="0.5" />
            </g>
          ))}
          {/* Right column details */}
          {[240, 280, 320, 360, 400, 440, 480].map((y, i) => (
            <g key={`rdeco-${i}`}>
              <line x1="435" y1={y - 6} x2="435" y2={y + 6} stroke={GOLD} strokeWidth="0.5" />
              <path d={`M 435 ${y - 3} L 437 ${y} L 435 ${y + 3} L 433 ${y} Z`} fill={GOLD} opacity="0.5" />
            </g>
          ))}
        </g>

        {/* Art deco sunburst/fan at arch apex (inside the arch, above the vista) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 2.5 }}
        >
          {Array.from({ length: 11 }).map((_, i) => {
            const angle = Math.PI + (i / 10) * Math.PI
            const x1 = 260 + Math.cos(angle) * 20
            const y1 = 85 + Math.sin(angle) * 20
            const x2 = 260 + Math.cos(angle) * 55
            const y2 = 85 + Math.sin(angle) * 55
            return (
              <line key={`fan-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={GOLD} strokeWidth="0.6" />
            )
          })}
          <path d="M 205 85 Q 260 55 315 85" fill="none" stroke={GOLD} strokeWidth="0.5" />
        </motion.g>

        {/* Small deco triangles along arch curve */}
        {[
          { x: 120, y: 105, r: -35 }, { x: 155, y: 75, r: -20 },
          { x: 200, y: 55, r: -8 }, { x: 320, y: 55, r: 8 },
          { x: 365, y: 75, r: 20 }, { x: 400, y: 105, r: 35 },
        ].map((t, i) => (
          <motion.path
            key={`tri-${i}`}
            d={`M ${t.x} ${t.y - 4} L ${t.x + 3} ${t.y + 2} L ${t.x - 3} ${t.y + 2} Z`}
            fill={GOLD} opacity="0.2"
            style={{ transformOrigin: `${t.x}px ${t.y}px`, rotate: `${t.r}deg` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 0.5, delay: 1.8 + i * 0.1 }}
          />
        ))}
      </motion.g>

      {/* === RETRO SPACECRAFT silhouette — tiny, ascending from canyon === */}
      <motion.g
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: [0, 0.6, 0.6, 0], y: [30, -180] }}
        transition={{ duration: 18, delay: 4, repeat: Infinity, repeatDelay: 8 }}
      >
        {/* Simple retro rocket silhouette */}
        <g transform="translate(310, 350) scale(0.5)">
          <path d="M 0 -20 Q -4 -15 -4 0 L -6 8 L -2 6 L -2 10 L 2 10 L 2 6 L 6 8 L 4 0 Q 4 -15 0 -20 Z"
            fill={GOLD_LT} opacity="0.7" />
          {/* Exhaust trail */}
          <line x1="0" y1="10" x2="0" y2="22" stroke={ORANGE} strokeWidth="1" opacity="0.4" />
          <line x1="0" y1="16" x2="0" y2="30" stroke={ORANGE} strokeWidth="0.5" opacity="0.2" />
        </g>
      </motion.g>

      {/* === Bottom base of the portal frame === */}
      <rect x="68" y="540" width="384" height="4" fill={GOLD} opacity="0.15" />
      <rect x="78" y="538" width="364" height="2" fill="url(#arch-frame)" opacity="0.5" />

      {/* Bottom deco — art deco geometric base ornament */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <path d="M 220 555 L 260 548 L 300 555" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.3" />
        <path d="M 254 548 L 260 542 L 266 548" fill={GOLD} opacity="0.25" />
        <line x1="160" y1="555" x2="240" y2="555" stroke={GOLD} strokeWidth="0.4" opacity="0.2" />
        <line x1="280" y1="555" x2="360" y2="555" stroke={GOLD} strokeWidth="0.4" opacity="0.2" />
      </motion.g>

      {/* === Tiny "GROVE" text at bottom of portal, like a vintage poster label === */}
      <motion.text
        x="260" y="570"
        textAnchor="middle"
        fill={GOLD}
        fontSize="7"
        letterSpacing="4"
        fontFamily="monospace"
        opacity="0.3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 3 }}
      >
        THE NEW FRONTIER
      </motion.text>
    </svg>
  )
}


// ─── Art Deco geometric border card ─────────────────────────────────────────

function DecoCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Card body */}
      <div className="relative border border-[#daa520]/15 bg-[#daa520]/[0.03] rounded-none p-6 min-h-[140px] flex flex-col justify-center text-center
        hover:border-[#daa520]/30 hover:bg-[#daa520]/[0.05] transition-all duration-300"
        style={{ clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)' }}
      >
        {children}
      </div>
      {/* Corner decorations — rendered outside the clip */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        {/* Top-left corner */}
        <line x1="0" y1="8" x2="8" y2="0" stroke={GOLD} strokeWidth="1" opacity="0.3" />
        <line x1="0" y1="12" x2="12" y2="0" stroke={GOLD} strokeWidth="0.5" opacity="0.15" />
        {/* Top-right corner */}
        <line x1="100%" y1="8" x2="calc(100% - 8px)" y2="0" stroke={GOLD} strokeWidth="1" opacity="0.3" style={{ transform: 'translateX(-0.5px)' }} />
        {/* Bottom-left corner */}
        <line x1="0" y1="calc(100% - 8px)" x2="8" y2="100%" stroke={GOLD} strokeWidth="1" opacity="0.3" />
        {/* Bottom-right corner */}
        <line x1="100%" y1="calc(100% - 8px)" x2="calc(100% - 8px)" y2="100%" stroke={GOLD} strokeWidth="1" opacity="0.3" style={{ transform: 'translateX(-0.5px)' }} />
      </svg>
    </div>
  )
}


// ─── Art Deco section divider ────────────────────────────────────────────────

function DecoDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-1">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#daa520]/20 to-[#daa520]/10" />
      <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
        <path d="M 10 0 L 14 5 L 10 10 L 6 5 Z" fill={GOLD} opacity="0.25" />
        <path d="M 10 2 L 12 5 L 10 8 L 8 5 Z" fill={GOLD} opacity="0.15" />
      </svg>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#daa520]/20 to-[#daa520]/10" />
    </div>
  )
}


// ─── Nav deco line ───────────────────────────────────────────────────────────

function NavDecoLine() {
  return (
    <div className="relative max-w-6xl mx-auto px-8">
      <div className="flex items-center">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#daa520]/20" />
        <svg width="32" height="12" viewBox="0 0 32 12" fill="none" className="mx-3">
          <path d="M 0 6 L 8 6" stroke={GOLD} strokeWidth="0.5" opacity="0.3" />
          <path d="M 24 6 L 32 6" stroke={GOLD} strokeWidth="0.5" opacity="0.3" />
          <path d="M 12 1 L 16 6 L 20 1" fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.4" />
          <path d="M 12 11 L 16 6 L 20 11" fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.4" />
          <circle cx="16" cy="6" r="1.5" fill={GOLD} opacity="0.35" />
        </svg>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#daa520]/20" />
      </div>
    </div>
  )
}


// ─── Step data ───────────────────────────────────────────────────────────────

const STEPS = [
  { label: 'Plant', desc: 'Speak your idea into existence. Start with a tweet, a napkin sketch, or a conversation.' },
  { label: 'Cultivate', desc: 'The Arborist shapes it into a structured growth plan with phases and milestones.' },
  { label: 'Grow', desc: 'Builders compete in auctions to bring each phase to life. Best bid wins.' },
  { label: 'Harvest', desc: 'Watch real metrics emerge as your idea becomes a living product.' },
]

// ─── Inline stats (no external import) ──────────────────────────────────────

const STATS = {
  total: 42,
  specsGenerated: 18,
  buildsInProgress: 7,
  settled: 3,
}


// ─── Page Component ─────────────────────────────────────────────────────────

export default function FullTreatmentPage() {
  return (
    <div className="min-h-screen text-[#ede8e0] overflow-hidden relative" style={{ background: BG, fontFamily: 'var(--font-sans), system-ui, sans-serif' }}>

      {/* === ATMOSPHERIC GRADIENT LAYERS === */}
      {/* Purple nebula glow behind hero */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/4 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(123,82,160,0.12) 0%, rgba(123,82,160,0.04) 40%, transparent 70%)', filter: 'blur(80px)' }} />
      {/* Warm orange horizon glow */}
      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(204,102,51,0.1) 0%, rgba(204,102,51,0.03) 50%, transparent 75%)', filter: 'blur(100px)' }} />
      {/* Subtle gold nebula */}
      <div className="absolute top-[30%] left-[20%] w-[400px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(218,165,32,0.06) 0%, transparent 60%)', filter: 'blur(80px)' }} />


      {/* === NAVIGATION === */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          {/* Logo — art deco sun/ring mark */}
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="4" fill={GOLD} opacity="0.9" />
            <circle cx="13" cy="13" r="8" stroke={GOLD} strokeWidth="1" opacity="0.4" />
            <circle cx="13" cy="13" r="12" stroke={GOLD} strokeWidth="0.5" opacity="0.15" />
            {/* Tiny radiating lines */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180
              return (
                <line key={deg}
                  x1={13 + Math.cos(rad) * 9} y1={13 + Math.sin(rad) * 9}
                  x2={13 + Math.cos(rad) * 11.5} y2={13 + Math.sin(rad) * 11.5}
                  stroke={GOLD} strokeWidth="0.5" opacity="0.25"
                />
              )
            })}
          </svg>
          <span className="text-[#ede8e0] font-semibold text-lg" style={{ letterSpacing: '0.08em' }}>GROVE</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm px-5 py-2.5 text-[#daa520]/80 hover:text-[#daa520] transition-colors font-medium"
            style={{ letterSpacing: '0.05em' }}>
            Join Waitlist
          </button>
          <button className="text-sm px-5 py-2.5 text-[#ede8e0]/50 hover:text-[#ede8e0]/80 transition-all border border-[#daa520]/15 hover:border-[#daa520]/30"
            style={{ clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)' }}>
            Launch App
          </button>
        </div>
      </nav>

      {/* Art deco line under nav */}
      <NavDecoLine />


      {/* === MAIN CONTENT === */}
      <main className="relative z-10 max-w-6xl mx-auto px-8">

        {/* === HERO SECTION === */}
        <div className="flex items-center min-h-[72vh] gap-10">

          {/* Left: text content */}
          <div className="flex-1 max-w-xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

              {/* Subtitle — wide letter-spacing, art deco feel */}
              <p className="text-xs font-mono uppercase mb-8"
                style={{ color: ORANGE, letterSpacing: '0.25em' }}>
                A New Model of Company Formation
              </p>

              {/* H1 with multi-stop text gradient */}
              <h1 className="text-5xl sm:text-6xl font-bold leading-[1.08] mb-7"
                style={{
                  letterSpacing: '-0.03em',
                  background: `linear-gradient(135deg, ${GOLD} 0%, ${ORANGE} 35%, ${GOLD_LT} 65%, ${GOLD} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                Plant an idea.{'\n'}Grow a company.
              </h1>

              <p className="text-[#ede8e0]/40 text-lg max-w-md leading-relaxed mb-10">
                Grove turns raw ideas into living companies — coordinated by intelligent agents and grown by a global network of builders.
              </p>

              {/* CTA buttons */}
              <div className="flex items-center gap-3">
                {/* Primary — warm gradient with inner glow */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-7 py-3.5 font-semibold text-sm transition-all relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD} 0%, ${ORANGE} 100%)`,
                    color: BG,
                    letterSpacing: '0.04em',
                    boxShadow: `inset 0 1px 2px rgba(255,255,255,0.2), 0 0 20px rgba(218,165,32,0.15)`,
                    clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                  }}
                >
                  Start Planting
                </motion.button>

                {/* Secondary — watch demo */}
                <button className="px-7 py-3.5 text-[#ede8e0]/40 hover:text-[#ede8e0]/70 transition-colors text-sm"
                  style={{ letterSpacing: '0.03em' }}>
                  Watch Demo
                </button>

                {/* Tertiary — geometric border */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-7 py-3.5 text-sm font-medium transition-all"
                  style={{
                    color: GOLD,
                    border: `1px solid ${GOLD}33`,
                    letterSpacing: '0.04em',
                    clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
                  }}
                >
                  Vote &amp; Earn
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right: retro-futurist portal art */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="flex-1 max-w-lg"
          >
            <RetroPortalArt />
          </motion.div>
        </div>


        {/* === STATS BAR === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <DecoDivider />
          <div className="flex items-center gap-10 py-6">
            {[
              { value: STATS.total, label: 'ideas planted' },
              { value: STATS.specsGenerated, label: 'specs generated' },
              { value: STATS.buildsInProgress, label: 'builds active' },
              { value: STATS.settled, label: 'settled' },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-10">
                <div>
                  <p className="text-2xl font-bold"
                    style={{
                      letterSpacing: '-0.02em',
                      background: `linear-gradient(135deg, ${GOLD_LT}, ${GOLD})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                    {s.value}
                  </p>
                  <p className="text-[11px] font-mono mt-1" style={{ color: `${TEXT}40`, letterSpacing: '0.1em' }}>{s.label}</p>
                </div>
                {/* Diamond separator instead of plain line */}
                {i < 3 && (
                  <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                    <path d="M 5 0 L 9 8 L 5 16 L 1 8 Z" fill={GOLD} opacity="0.15" />
                    <path d="M 5 3 L 7.5 8 L 5 13 L 2.5 8 Z" fill={GOLD} opacity="0.1" />
                  </svg>
                )}
              </div>
            ))}
            <button className="hover:text-[#e8c255] text-sm font-medium transition-colors whitespace-nowrap"
              style={{ color: ORANGE, letterSpacing: '0.04em' }}>
              Explore all &rarr;
            </button>
          </div>
        </motion.div>


        {/* === HOW IT WORKS SECTION === */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="py-20"
        >
          <DecoDivider />
          <div className="mt-14">
            <p className="text-[11px] font-mono uppercase mb-14"
              style={{ color: `${ORANGE}88`, letterSpacing: '0.25em' }}>
              How It Works
            </p>

            <div className="relative">
              {/* Connecting gradient line between cards */}
              <div className="absolute top-10 left-[calc(12.5%+14px)] right-[calc(12.5%+14px)] h-[2px] z-0"
                style={{ background: `linear-gradient(to right, transparent, ${GOLD}33, ${ORANGE}44, ${GOLD}33, transparent)` }} />

              <div className="relative z-10 grid grid-cols-4 gap-5">
                {STEPS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.12 }}
                    className="group"
                  >
                    {/* Art deco step number circle */}
                    <div className="flex justify-center mb-5">
                      <div className="relative">
                        {/* Outer decorative ring */}
                        <svg width="44" height="44" viewBox="0 0 44 44" className="absolute -left-[2px] -top-[2px]">
                          <circle cx="22" cy="22" r="20" fill="none"
                            stroke={i === 0 ? GOLD : PURPLE} strokeWidth="0.5" opacity="0.3" />
                          {/* Small deco ticks at cardinal points */}
                          {[0, 90, 180, 270].map((deg) => {
                            const rad = (deg * Math.PI) / 180
                            return (
                              <line key={deg}
                                x1={22 + Math.cos(rad) * 17} y1={22 + Math.sin(rad) * 17}
                                x2={22 + Math.cos(rad) * 20} y2={22 + Math.sin(rad) * 20}
                                stroke={i === 0 ? GOLD : PURPLE} strokeWidth="0.8" opacity="0.4"
                              />
                            )
                          })}
                        </svg>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                          i === 0
                            ? 'border-[#daa520]/40 bg-[#daa520]/10'
                            : 'border-[#7b52a0]/30 bg-[#7b52a0]/8'
                        }`}>
                          <span className="text-xs font-bold" style={{
                            fontFamily: 'var(--font-mono), monospace',
                            color: i === 0 ? GOLD : PURPLE,
                            letterSpacing: '0.05em',
                          }}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Art deco card */}
                    <DecoCard>
                      <p className="font-semibold text-sm mb-2"
                        style={{ color: `${TEXT}cc`, letterSpacing: '0.06em' }}>
                        {item.label}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: `${TEXT}4d` }}>
                        {item.desc}
                      </p>
                    </DecoCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>


        {/* === BOTTOM CTA SECTION === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <DecoDivider />
          <div className="my-8 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${PURPLE}15 0%, ${ORANGE}10 50%, ${GOLD}08 100%)`,
              border: `1px solid ${GOLD}1a`,
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
            }}
          >
            {/* Inner deco corners */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <line x1="0" y1="12" x2="12" y2="0" stroke={GOLD} strokeWidth="1" opacity="0.2" />
              <line x1="100%" y1="12" x2="calc(100% - 12px)" y2="0" stroke={GOLD} strokeWidth="1" opacity="0.2" />
              <line x1="0" y1="calc(100% - 12px)" x2="12" y2="100%" stroke={GOLD} strokeWidth="1" opacity="0.2" />
              <line x1="100%" y1="calc(100% - 12px)" x2="calc(100% - 12px)" y2="100%" stroke={GOLD} strokeWidth="1" opacity="0.2" />
            </svg>

            <div className="relative z-10 py-12 px-10 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold" style={{ color: `${TEXT}99`, letterSpacing: '0.02em' }}>
                  Ready to grow something?
                </p>
                <p className="text-sm mt-1" style={{ color: `${TEXT}40` }}>
                  Join {STATS.total} ideas already in the grove.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 font-semibold text-sm transition-all"
                style={{
                  background: `linear-gradient(135deg, ${GOLD} 0%, ${ORANGE} 100%)`,
                  color: BG,
                  letterSpacing: '0.05em',
                  boxShadow: `inset 0 1px 2px rgba(255,255,255,0.2), 0 0 30px rgba(218,165,32,0.12)`,
                  clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                }}
              >
                Start Planting
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Final spacer */}
        <div className="h-16" />
      </main>
    </div>
  )
}
