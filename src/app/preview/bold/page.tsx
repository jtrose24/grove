'use client'
import { motion } from 'framer-motion'

// ─── Color palette ──────────────────────────────────────────────────────────
const GOLD = '#d4a84e'
const ORANGE = '#e07040'
const PURPLE = '#7b4fa0'
const BLUE = '#3a4f8a'
const BG = '#13110f'

// ─── Retro-futurist viewport SVG ────────────────────────────────────────────

function RetroViewport() {
  // Canyon mesa layers (bottom to top in terms of depth)
  const canyonLayers = [
    // Distant far mesa - very dark purple silhouette
    { d: 'M 0 340 L 30 295 L 60 310 L 100 270 L 130 285 L 160 250 L 200 230 L 240 245 L 270 225 L 310 260 L 350 240 L 380 270 L 420 255 L 460 280 L 500 300 L 500 340 Z', fill: '#2a1a3a', delay: 0.6 },
    // Mid-distance mesa range - deep warm purple
    { d: 'M 0 340 L 20 310 L 50 320 L 80 290 L 110 305 L 140 275 L 165 295 L 195 265 L 220 280 L 260 260 L 290 275 L 320 255 L 355 270 L 385 285 L 420 270 L 450 290 L 480 280 L 500 295 L 500 340 Z', fill: '#3d2244', delay: 0.8 },
    // Nearer canyon walls - warm brown-purple
    { d: 'M 0 340 L 0 310 L 25 318 L 40 300 L 55 310 L 80 325 L 100 310 L 115 320 L 130 305 L 145 315 L 155 340 Z', fill: '#4a2a35', delay: 1.0 },
    { d: 'M 345 340 L 355 315 L 370 305 L 385 318 L 400 300 L 420 310 L 440 295 L 460 310 L 475 305 L 490 315 L 500 310 L 500 340 Z', fill: '#4a2a35', delay: 1.0 },
    // Closest foreground buttes - darkest, warmest
    { d: 'M 0 340 L 0 325 L 15 315 L 30 325 L 50 315 L 65 328 L 80 340 Z', fill: '#3a1f28', delay: 1.2 },
    { d: 'M 420 340 L 435 328 L 450 315 L 465 325 L 480 318 L 495 325 L 500 330 L 500 340 Z', fill: '#3a1f28', delay: 1.2 },
  ]

  // Canyon floor / river
  const canyonFloor = 'M 80 340 L 155 340 L 160 335 L 180 340 L 320 340 L 340 335 L 345 340 L 420 340 L 420 360 L 80 360 Z'

  // Wireframe geometric shapes floating in sky
  const wireframes = [
    // Large floating octahedron (diamond shape) - left of center
    {
      paths: [
        'M 130 130 L 155 100 L 180 130 L 155 160 Z', // front diamond face
        'M 155 100 L 165 115 L 155 160', // internal edge right
        'M 155 100 L 145 115 L 155 160', // internal edge left
        'M 130 130 L 145 115', // left to center
        'M 180 130 L 165 115', // right to center
      ],
      stroke: ORANGE,
      opacity: 0.6,
      delay: 1.8,
    },
    // Small triangle cluster - far right sky
    {
      paths: [
        'M 380 95 L 400 70 L 420 95 Z',
        'M 385 92 L 400 78 L 415 92',
      ],
      stroke: PURPLE,
      opacity: 0.45,
      delay: 2.2,
    },
    // Floating cube wireframe - right side
    {
      paths: [
        'M 340 150 L 365 150 L 365 175 L 340 175 Z', // front face
        'M 340 150 L 352 138 L 377 138 L 365 150', // top face
        'M 365 150 L 377 138 L 377 163 L 365 175', // right face
      ],
      stroke: BLUE,
      opacity: 0.35,
      delay: 2.5,
    },
    // Tiny floating triangle - upper left
    {
      paths: [
        'M 80 80 L 95 60 L 110 80 Z',
      ],
      stroke: GOLD,
      opacity: 0.3,
      delay: 2.8,
    },
    // Icosahedron fragment - lower right sky
    {
      paths: [
        'M 400 170 L 415 155 L 430 170 Z',
        'M 415 155 L 425 165 L 415 175',
        'M 415 155 L 405 165 L 415 175',
        'M 400 170 L 415 175 L 430 170',
      ],
      stroke: ORANGE,
      opacity: 0.25,
      delay: 3.0,
    },
    // Large faint polyhedron outline - center sky behind sun
    {
      paths: [
        'M 220 60 L 250 30 L 280 60 L 265 95 L 235 95 Z',
        'M 250 30 L 250 65',
        'M 220 60 L 250 65 L 280 60',
        'M 235 95 L 250 65 L 265 95',
      ],
      stroke: GOLD,
      opacity: 0.12,
      delay: 2.0,
    },
  ]

  // Stars
  const stars = [
    { x: 50, y: 40, r: 1, opacity: 0.4 },
    { x: 95, y: 25, r: 0.7, opacity: 0.3 },
    { x: 140, y: 15, r: 0.8, opacity: 0.35 },
    { x: 200, y: 10, r: 1.2, opacity: 0.25 },
    { x: 300, y: 20, r: 0.9, opacity: 0.3 },
    { x: 350, y: 35, r: 0.6, opacity: 0.35 },
    { x: 420, y: 18, r: 1, opacity: 0.3 },
    { x: 460, y: 50, r: 0.7, opacity: 0.25 },
    { x: 30, y: 70, r: 0.6, opacity: 0.2 },
    { x: 470, y: 80, r: 0.8, opacity: 0.2 },
    { x: 160, y: 50, r: 0.5, opacity: 0.3 },
    { x: 330, y: 55, r: 0.7, opacity: 0.25 },
    { x: 75, y: 105, r: 0.5, opacity: 0.15 },
    { x: 440, y: 110, r: 0.6, opacity: 0.15 },
    { x: 250, y: 45, r: 0.5, opacity: 0.2 },
    { x: 380, y: 42, r: 0.4, opacity: 0.25 },
    { x: 120, y: 70, r: 0.6, opacity: 0.22 },
  ]

  return (
    <svg viewBox="0 0 500 400" className="w-full h-full" fill="none">
      <defs>
        {/* Sky gradient - deep space to horizon warmth */}
        <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d0a18" />
          <stop offset="30%" stopColor="#1a1030" />
          <stop offset="55%" stopColor="#2d1a3a" />
          <stop offset="75%" stopColor="#4a2040" />
          <stop offset="90%" stopColor="#7a3530" />
          <stop offset="100%" stopColor="#c45a28" />
        </linearGradient>

        {/* Sun gradient */}
        <radialGradient id="sun-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd080" />
          <stop offset="40%" stopColor="#e8903a" />
          <stop offset="70%" stopColor="#d06030" />
          <stop offset="100%" stopColor="#a03820" />
        </radialGradient>

        {/* Sun glow */}
        <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e08040" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#c04020" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#801020" stopOpacity="0" />
        </radialGradient>

        {/* Horizon glow */}
        <radialGradient id="horizon-glow" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="#e07040" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#e07040" stopOpacity="0" />
        </radialGradient>

        {/* Viewport frame gradient */}
        <linearGradient id="frame-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4a3a2a" />
          <stop offset="50%" stopColor="#2a2220" />
          <stop offset="100%" stopColor="#3a2a20" />
        </linearGradient>

        {/* Frame inner edge highlight */}
        <linearGradient id="frame-highlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a7050" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#4a3020" stopOpacity="0.1" />
        </linearGradient>

        {/* Canyon floor glow */}
        <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1520" />
          <stop offset="100%" stopColor="#1a0e15" />
        </linearGradient>

        {/* Subtle light rays from sun */}
        <radialGradient id="sun-rays" cx="50%" cy="65%" r="60%">
          <stop offset="0%" stopColor="#ffa050" stopOpacity="0.08" />
          <stop offset="40%" stopColor="#d06030" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#a02010" stopOpacity="0" />
        </radialGradient>

        {/* Clip path for viewport window - rounded arch shape */}
        <clipPath id="viewport-clip">
          <path d="M 60 370 L 60 80 Q 60 30 110 30 L 390 30 Q 440 30 440 80 L 440 370 Z" />
        </clipPath>

        {/* Art deco corner accents for frame */}
        <pattern id="scanlines" patternUnits="userSpaceOnUse" width="500" height="4">
          <line x1="0" y1="0" x2="500" y2="0" stroke="#ffa050" strokeWidth="0.3" opacity="0.03" />
        </pattern>
      </defs>

      {/* ── Outer frame background ── */}
      <rect x="0" y="0" width="500" height="400" fill={BG} />

      {/* ── Frame border - art deco style ── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
        {/* Main frame border */}
        <path d="M 50 375 L 50 75 Q 50 25 100 25 L 400 25 Q 450 25 450 75 L 450 375 Z"
          fill="none" stroke="url(#frame-highlight)" strokeWidth="2" />

        {/* Outer decorative border */}
        <path d="M 42 380 L 42 72 Q 42 18 96 18 L 404 18 Q 458 18 458 72 L 458 380 Z"
          fill="none" stroke="#4a3520" strokeWidth="0.5" opacity="0.5" />

        {/* Art deco corner accents - top left */}
        <path d="M 42 60 L 42 18 L 84 18" fill="none" stroke={GOLD} strokeWidth="1.5" opacity="0.4" />
        <path d="M 36 65 L 36 14 L 88 14" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.2" />
        <line x1="42" y1="40" x2="56" y2="18" stroke={GOLD} strokeWidth="0.5" opacity="0.25" />

        {/* Art deco corner accents - top right */}
        <path d="M 458 60 L 458 18 L 416 18" fill="none" stroke={GOLD} strokeWidth="1.5" opacity="0.4" />
        <path d="M 464 65 L 464 14 L 412 14" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.2" />
        <line x1="458" y1="40" x2="444" y2="18" stroke={GOLD} strokeWidth="0.5" opacity="0.25" />

        {/* Art deco corner accents - bottom left */}
        <path d="M 42 345 L 42 380 L 84 380" fill="none" stroke={GOLD} strokeWidth="1.5" opacity="0.3" />
        <path d="M 36 340 L 36 386 L 88 386" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.15" />

        {/* Art deco corner accents - bottom right */}
        <path d="M 458 345 L 458 380 L 416 380" fill="none" stroke={GOLD} strokeWidth="1.5" opacity="0.3" />
        <path d="M 464 340 L 464 386 L 412 386" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.15" />

        {/* Top center deco element - small triangle / chevron */}
        <path d="M 240 14 L 250 6 L 260 14" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.35" />
        <path d="M 235 18 L 250 8 L 265 18" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.2" />
        <circle cx="250" cy="6" r="1.5" fill={GOLD} opacity="0.3" />
      </motion.g>

      {/* ── Viewport contents (clipped) ── */}
      <g clipPath="url(#viewport-clip)">
        {/* Sky */}
        <motion.rect x="60" y="30" width="380" height="340" fill="url(#sky-grad)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }} />

        {/* Stars */}
        {stars.map((star, i) => (
          <motion.circle key={`star-${i}`} cx={star.x} cy={star.y} r={star.r} fill="#fff"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, star.opacity, star.opacity * 0.5, star.opacity] }}
            transition={{ duration: 4 + (i % 3), delay: 1.5 + i * 0.08, repeat: Infinity, repeatType: 'reverse' }}
          />
        ))}

        {/* Scanline texture overlay */}
        <rect x="60" y="30" width="380" height="340" fill="url(#scanlines)" opacity="0.5" />

        {/* Sun glow (large) */}
        <motion.circle cx="250" cy="210" r="140" fill="url(#sun-glow)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        {/* Sun rays */}
        <motion.rect x="60" y="30" width="380" height="340" fill="url(#sun-rays)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />

        {/* Light rays - subtle radiating lines from sun */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 1.0 }}>
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180)
            const x1 = 250 + Math.cos(angle) * 45
            const y1 = 210 + Math.sin(angle) * 45
            const x2 = 250 + Math.cos(angle) * 200
            const y2 = 210 + Math.sin(angle) * 200
            return (
              <line key={`ray-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#ffa050" strokeWidth="0.5" opacity={0.03 + (i % 3) * 0.01} />
            )
          })}
        </motion.g>

        {/* The Sun */}
        <motion.circle cx="250" cy="210" r="40" fill="url(#sun-grad)"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
        />
        {/* Sun rim */}
        <motion.circle cx="250" cy="210" r="41" fill="none" stroke="#ffc060" strokeWidth="1" opacity="0.3"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
        />
        {/* Sun inner ring */}
        <motion.circle cx="250" cy="210" r="50" fill="none" stroke="#e08040" strokeWidth="0.5" opacity="0.15"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2, delay: 0.8 }}
        />

        {/* Horizon glow at canyon floor level */}
        <motion.ellipse cx="250" cy="310" rx="200" ry="60" fill="url(#horizon-glow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />

        {/* Wireframe geometric shapes */}
        {wireframes.map((shape, shapeIdx) => (
          <motion.g key={`shape-${shapeIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: shape.delay }}
          >
            {/* Animated floating motion */}
            <motion.g
              animate={{
                y: [0, -3, 0, 3, 0],
                x: [0, 1, 0, -1, 0],
                rotate: [0, 0.5, 0, -0.5, 0],
              }}
              transition={{
                duration: 8 + shapeIdx * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {shape.paths.map((path, pathIdx) => (
                <motion.path key={`path-${shapeIdx}-${pathIdx}`} d={path}
                  stroke={shape.stroke} strokeWidth="1" fill="none" opacity={shape.opacity}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: shape.delay + pathIdx * 0.15, ease: 'easeOut' }}
                />
              ))}
            </motion.g>
          </motion.g>
        ))}

        {/* Canyon landscape layers */}
        {canyonLayers.map((layer, i) => (
          <motion.path key={`canyon-${i}`} d={layer.d} fill={layer.fill}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: layer.delay, ease: 'easeOut' }}
          />
        ))}

        {/* Canyon floor */}
        <motion.path d={canyonFloor} fill="url(#floor-grad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        />

        {/* Geometric formations on canyon walls - small triangular crystals */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}>
          {/* Left wall crystal formation */}
          <path d="M 95 305 L 102 285 L 109 305 Z" fill="none" stroke={PURPLE} strokeWidth="0.8" opacity="0.3" />
          <path d="M 100 310 L 105 295 L 110 310 Z" fill="none" stroke={ORANGE} strokeWidth="0.6" opacity="0.2" />
          <path d="M 85 315 L 90 300 L 95 315 Z" fill="none" stroke={BLUE} strokeWidth="0.6" opacity="0.2" />

          {/* Right wall crystal formation */}
          <path d="M 395 305 L 402 288 L 409 305 Z" fill="none" stroke={PURPLE} strokeWidth="0.8" opacity="0.3" />
          <path d="M 405 312 L 410 298 L 415 312 Z" fill="none" stroke={ORANGE} strokeWidth="0.6" opacity="0.2" />
          <path d="M 415 308 L 420 294 L 425 308 Z" fill="none" stroke={BLUE} strokeWidth="0.6" opacity="0.2" />
        </motion.g>

        {/* Thin horizontal atmosphere bands */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 1.2 }}>
          <line x1="60" y1="250" x2="440" y2="250" stroke="#e07040" strokeWidth="0.3" opacity="0.08" />
          <line x1="60" y1="260" x2="440" y2="260" stroke="#d06030" strokeWidth="0.4" opacity="0.06" />
          <line x1="60" y1="270" x2="440" y2="270" stroke="#c05020" strokeWidth="0.3" opacity="0.05" />
        </motion.g>

        {/* Foreground dust / atmosphere */}
        <motion.rect x="60" y="300" width="380" height="70" fill="url(#floor-grad)" opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 1.4 }}
        />
      </g>

      {/* ── Frame inner border (on top of clipped content) ── */}
      <motion.path d="M 60 370 L 60 80 Q 60 30 110 30 L 390 30 Q 440 30 440 80 L 440 370 Z"
        fill="none" stroke="#3a2a20" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}
        transition={{ duration: 1 }}
      />

      {/* Frame bolts / rivets - small circles at corners */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.5 }}>
        <circle cx="68" cy="48" r="2" fill="#3a2a18" stroke="#5a4a30" strokeWidth="0.5" />
        <circle cx="432" cy="48" r="2" fill="#3a2a18" stroke="#5a4a30" strokeWidth="0.5" />
        <circle cx="68" cy="365" r="2" fill="#3a2a18" stroke="#5a4a30" strokeWidth="0.5" />
        <circle cx="432" cy="365" r="2" fill="#3a2a18" stroke="#5a4a30" strokeWidth="0.5" />
      </motion.g>
    </svg>
  )
}

// ─── Art Deco section divider ─────────────────────────────────────────────────

function ArtDecoDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center py-1 ${className}`}>
      <svg viewBox="0 0 600 12" className="w-full max-w-2xl h-3" fill="none">
        <defs>
          <linearGradient id="deco-line-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={ORANGE} stopOpacity="0" />
            <stop offset="20%" stopColor={ORANGE} stopOpacity="0.5" />
            <stop offset="50%" stopColor={PURPLE} stopOpacity="0.6" />
            <stop offset="80%" stopColor={BLUE} stopOpacity="0.5" />
            <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Main line */}
        <line x1="50" y1="6" x2="550" y2="6" stroke="url(#deco-line-grad)" strokeWidth="1" />
        {/* Center diamond */}
        <path d="M 296 6 L 300 2 L 304 6 L 300 10 Z" fill={GOLD} opacity="0.4" />
        {/* Small side triangles */}
        <path d="M 260 6 L 264 3 L 268 6" fill="none" stroke={ORANGE} strokeWidth="0.7" opacity="0.3" />
        <path d="M 332 6 L 336 3 L 340 6" fill="none" stroke={PURPLE} strokeWidth="0.7" opacity="0.3" />
      </svg>
    </div>
  )
}

// ─── Gradient line for How it works ───────────────────────────────────────────

function GradientRule() {
  return (
    <div className="h-px w-full" style={{
      background: `linear-gradient(to right, transparent, ${ORANGE}, ${PURPLE}, ${BLUE}, transparent)`,
      opacity: 0.35,
    }} />
  )
}

// ─── Step card corner accents ─────────────────────────────────────────────────

function CardCornerAccents() {
  return (
    <>
      {/* Top-left triangle */}
      <svg className="absolute top-0 left-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 16 16" fill="none">
        <path d="M 0 0 L 16 0 L 0 16 Z" fill={GOLD} opacity="0.15" />
        <path d="M 0 0 L 12 0 L 0 12" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.4" />
      </svg>
      {/* Top-right triangle */}
      <svg className="absolute top-0 right-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 16 16" fill="none">
        <path d="M 16 0 L 16 16 L 0 0 Z" fill={GOLD} opacity="0.15" />
        <path d="M 16 0 L 16 12 L 4 0" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.4" />
      </svg>
      {/* Bottom-left triangle */}
      <svg className="absolute bottom-0 left-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 16 16" fill="none">
        <path d="M 0 16 L 0 0 L 16 16 Z" fill={ORANGE} opacity="0.1" />
        <path d="M 0 16 L 0 4 L 12 16" fill="none" stroke={ORANGE} strokeWidth="0.5" opacity="0.3" />
      </svg>
      {/* Bottom-right triangle */}
      <svg className="absolute bottom-0 right-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 16 16" fill="none">
        <path d="M 16 16 L 0 16 L 16 0 Z" fill={ORANGE} opacity="0.1" />
        <path d="M 16 16 L 4 16 L 16 4" fill="none" stroke={ORANGE} strokeWidth="0.5" opacity="0.3" />
      </svg>
    </>
  )
}

// ─── Steps ──────────────────────────────────────────────────────────────────

const STEPS = [
  { label: 'Plant', desc: 'Speak your idea into existence. Start with a tweet, a napkin sketch, or a conversation.' },
  { label: 'Cultivate', desc: 'The Arborist shapes it into a structured growth plan with phases and milestones.' },
  { label: 'Grow', desc: 'Builders compete in auctions to bring each phase to life. Best bid wins.' },
  { label: 'Harvest', desc: 'Watch real metrics emerge as your idea becomes a living product.' },
]

// ─── Inline stats (no external imports) ─────────────────────────────────────

const STATS = {
  total: 42,
  specsGenerated: 38,
  buildsInProgress: 12,
  settled: 7,
}

// ─── Main page ──────────────────────────────────────────────────────────────

export default function BoldTreatmentPage() {
  return (
    <div className="min-h-screen text-[#e8e6e3] overflow-hidden relative" style={{ backgroundColor: BG }}>

      {/* ── Atmospheric background gradients ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% 25%, rgba(123,79,160,0.08) 0%, transparent 100%),
          radial-gradient(ellipse 70% 40% at 50% 75%, rgba(224,112,64,0.06) 0%, transparent 100%),
          linear-gradient(to bottom, #13110f 0%, #1a1018 30%, #1f1520 50%, #201815 70%, #1a1510 100%)
        `,
      }} />
      {/* Large atmospheric gradient: deep purple fading to dark orange near bottom */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(123,79,160,0.05) 0%, rgba(123,79,160,0.08) 30%, rgba(160,70,80,0.06) 60%, rgba(224,112,64,0.07) 85%, rgba(180,80,40,0.04) 100%)',
      }} />

      {/* ── Nav ── */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#d4a84e]">
            <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.9" />
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <circle cx="12" cy="12" r="11.5" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
          </svg>
          <span className="text-[#e8e6e3] font-medium text-lg tracking-[-0.02em]">Grove</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm px-5 py-2 rounded-lg font-medium transition-all"
            style={{
              background: `linear-gradient(135deg, ${ORANGE}22, ${GOLD}33, ${ORANGE}22)`,
              color: GOLD,
              border: `1px solid ${GOLD}40`,
            }}>
            Join Waitlist
          </button>
          <button className="text-sm px-4 py-2 rounded-lg bg-[#e8e6e3]/[0.06] text-[#e8e6e3]/60 hover:bg-[#e8e6e3]/[0.1] hover:text-[#e8e6e3]/80 transition-all">
            Launch App
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <main className="relative z-10 max-w-6xl mx-auto px-8">
        <div className="flex items-center min-h-[70vh] gap-8">
          <div className="flex-1 max-w-xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-xs font-mono tracking-[0.15em] uppercase mb-8" style={{ color: ORANGE }}>
                A new model of company formation
              </p>
              <h1 className="text-5xl sm:text-6xl font-semibold leading-[1.08] tracking-[-0.035em] mb-7">
                <span style={{
                  background: `linear-gradient(135deg, ${GOLD} 0%, ${ORANGE} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Plant an idea.
                </span>{' '}
                <span style={{
                  background: `linear-gradient(135deg, ${GOLD} 30%, ${ORANGE} 70%, #c04030 100%)`,
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
                  className="px-7 py-3.5 rounded-xl font-medium text-sm transition-colors text-[#111110]"
                  style={{
                    background: `linear-gradient(135deg, ${ORANGE}cc, ${GOLD}, ${ORANGE}cc)`,
                  }}>
                  Start Planting
                </motion.button>
                <button className="px-7 py-3.5 rounded-xl text-[#e8e6e3]/40 hover:text-[#e8e6e3]/70 transition-colors text-sm">
                  Watch Demo
                </button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="px-7 py-3.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    border: `1px solid ${GOLD}40`,
                    color: GOLD,
                  }}>
                  Vote &amp; Earn
                </motion.button>
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 max-w-md">
            <RetroViewport />
          </motion.div>
        </div>

        {/* ── Art deco divider ── */}
        <ArtDecoDivider />

        {/* ── Stats ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-10 py-8">
          {[
            { value: STATS.total, label: 'ideas planted' },
            { value: STATS.specsGenerated, label: 'specs generated' },
            { value: STATS.buildsInProgress, label: 'builds active' },
            { value: STATS.settled, label: 'settled' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-10">
              <div>
                <p className="text-2xl font-semibold tracking-[-0.02em]" style={{ color: GOLD }}>{s.value}</p>
                <p className="text-[11px] font-mono text-[#e8e6e3]/25 mt-1">{s.label}</p>
              </div>
              <div className="w-px h-8" style={{
                background: `linear-gradient(to bottom, transparent, ${PURPLE}30, transparent)`,
              }} />
            </div>
          ))}
          <button className="text-sm font-medium transition-colors whitespace-nowrap hover:brightness-125" style={{ color: ORANGE }}>
            Explore all &rarr;
          </button>
        </motion.div>

        {/* ── Art deco divider ── */}
        <ArtDecoDivider />

        {/* ── How it works ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
          className="py-20">

          <div className="flex items-center gap-4 mb-4">
            <p className="text-[11px] font-mono uppercase tracking-[0.15em]" style={{ color: `${PURPLE}88` }}>How it works</p>
          </div>
          <GradientRule />

          <div className="mt-14 relative">
            {/* Connecting line across step icons */}
            <div className="absolute top-10 left-[calc(12.5%+14px)] right-[calc(12.5%+14px)] h-px z-0"
              style={{
                background: `linear-gradient(to right, ${ORANGE}00, ${ORANGE}40, ${PURPLE}40, ${BLUE}40, ${BLUE}00)`,
              }} />

            <div className="relative z-10 grid grid-cols-4 gap-5">
              {STEPS.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }} className="group">
                  <div className="flex justify-center mb-5">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: i === 0 ? `${GOLD}18` : `${PURPLE}12`,
                          border: `1px solid ${i === 0 ? GOLD + '35' : PURPLE + '25'}`,
                        }}>
                        {i === 0 && (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle cx="9" cy="13" r="2" fill={GOLD} opacity="0.7" />
                            <path d="M9 11V5" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
                            <path d="M9 5L6.5 2.5" stroke={GOLD} strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
                            <path d="M9 5L11.5 2.5" stroke={GOLD} strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
                          </svg>
                        )}
                        {i === 1 && (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <rect x="3" y="4" width="12" height="2" rx="0.5" fill={ORANGE} opacity="0.5" />
                            <rect x="3" y="8" width="9" height="2" rx="0.5" fill={ORANGE} opacity="0.35" />
                            <rect x="3" y="12" width="6" height="2" rx="0.5" fill={ORANGE} opacity="0.2" />
                          </svg>
                        )}
                        {i === 2 && (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M3 14L9 4L15 14" stroke={PURPLE} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                            <path d="M5.5 14L9 7L12.5 14" stroke={PURPLE} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
                            <circle cx="9" cy="6" r="1.5" fill={PURPLE} opacity="0.3" />
                          </svg>
                        )}
                        {i === 3 && (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle cx="9" cy="9" r="5" stroke={BLUE} strokeWidth="1" opacity="0.3" />
                            <circle cx="9" cy="9" r="2.5" stroke={BLUE} strokeWidth="1" opacity="0.4" />
                            <circle cx="9" cy="9" r="1" fill={GOLD} opacity="0.6" />
                          </svg>
                        )}
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-mono text-[#e8e6e3]/30"
                        style={{ backgroundColor: BG, border: `1px solid ${PURPLE}30` }}>
                        {i + 1}
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl p-5 min-h-[120px] flex flex-col justify-center text-center transition-all duration-300"
                    style={{
                      background: 'rgba(232,230,227,0.02)',
                      border: '1px solid rgba(232,230,227,0.05)',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.border = `1px solid ${GOLD}30`
                      el.style.background = `rgba(212,168,78,0.04)`
                      el.style.boxShadow = `0 0 30px rgba(212,168,78,0.06), inset 0 0 30px rgba(212,168,78,0.02)`
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.border = '1px solid rgba(232,230,227,0.05)'
                      el.style.background = 'rgba(232,230,227,0.02)'
                      el.style.boxShadow = 'none'
                    }}>
                    <CardCornerAccents />
                    <p className="text-[#e8e6e3]/80 font-medium text-sm tracking-[-0.01em] mb-2">{item.label}</p>
                    <p className="text-[#e8e6e3]/30 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Art deco divider ── */}
        <ArtDecoDivider />

        {/* ── CTA footer ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }}
          className="py-16 flex items-center justify-between">
          <div>
            <p className="text-[#e8e6e3]/60 text-lg font-medium tracking-[-0.01em]">Ready to grow something?</p>
            <p className="text-[#e8e6e3]/25 text-sm mt-1">Join {STATS.total} ideas already in the grove.</p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="px-7 py-3.5 rounded-xl font-medium text-sm text-[#111110] transition-colors"
            style={{
              background: `linear-gradient(135deg, ${ORANGE}cc, ${GOLD}, ${ORANGE}cc)`,
            }}>
            Start Planting
          </motion.button>
        </motion.div>
        <div className="h-12" />
      </main>
    </div>
  )
}
