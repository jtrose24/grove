'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

// ─── Inline stats (no external imports) ──────────────────────────────────────
function getStats() {
  return { total: 142, specsGenerated: 89, buildsInProgress: 23, settled: 12 }
}

// ─── Retro-futurist portal SVG ───────────────────────────────────────────────
// A geometric archway framing a layered desert-cosmic landscape.
// Think vintage NASA travel poster meets art deco canyon vista.

function RetroPortal() {
  // Geometric stars scattered in the sky
  const stars: { x: number; y: number; r: number; delay: number }[] = [
    { x: 148, y: 52, r: 1.2, delay: 0 },
    { x: 252, y: 38, r: 1.0, delay: 0.3 },
    { x: 118, y: 78, r: 0.8, delay: 0.7 },
    { x: 280, y: 65, r: 0.9, delay: 0.5 },
    { x: 200, y: 30, r: 1.4, delay: 0.2 },
    { x: 170, y: 95, r: 0.7, delay: 1.0 },
    { x: 230, y: 80, r: 0.8, delay: 0.8 },
    { x: 135, y: 40, r: 0.6, delay: 1.2 },
    { x: 265, y: 48, r: 0.7, delay: 0.9 },
    { x: 195, y: 62, r: 1.0, delay: 0.4 },
    { x: 155, y: 110, r: 0.5, delay: 1.5 },
    { x: 245, y: 105, r: 0.6, delay: 1.3 },
  ]

  // Geometric diamond/star shapes (art deco accents)
  const geoStars: { x: number; y: number; size: number; delay: number }[] = [
    { x: 200, y: 45, size: 5, delay: 0.6 },
    { x: 160, y: 70, size: 3.5, delay: 1.1 },
    { x: 240, y: 58, size: 4, delay: 0.8 },
    { x: 130, y: 55, size: 3, delay: 1.4 },
    { x: 270, y: 75, size: 3, delay: 1.0 },
  ]

  return (
    <svg viewBox="0 0 400 430" className="w-full h-full" fill="none">
      <defs>
        {/* Sky gradient — deep cosmic purple to sunset orange */}
        <linearGradient id="sky-grad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#1a0e2e" />
          <stop offset="25%" stopColor="#2d1845" />
          <stop offset="50%" stopColor="#6b4c8a" />
          <stop offset="72%" stopColor="#c4623a" />
          <stop offset="88%" stopColor="#d4764e" />
          <stop offset="100%" stopColor="#e8a84c" />
        </linearGradient>

        {/* Far mountain range */}
        <linearGradient id="mtn-far" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#4a2d6b" />
          <stop offset="100%" stopColor="#5c3878" />
        </linearGradient>

        {/* Mid mountain range */}
        <linearGradient id="mtn-mid" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#3a2255" />
          <stop offset="100%" stopColor="#4a2d6b" />
        </linearGradient>

        {/* Near canyon/mesa silhouettes */}
        <linearGradient id="mesa-near" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#2a1540" />
          <stop offset="100%" stopColor="#1e0e30" />
        </linearGradient>

        {/* Desert floor */}
        <linearGradient id="desert-floor" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#1e0e30" />
          <stop offset="100%" stopColor="#13110e" />
        </linearGradient>

        {/* Sun/orb glow */}
        <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8a84c" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#d4764e" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#c4623a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#c4623a" stopOpacity="0" />
        </radialGradient>

        {/* Archway gradient — dark stone with warm edges */}
        <linearGradient id="arch-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1510" />
          <stop offset="50%" stopColor="#13110e" />
          <stop offset="100%" stopColor="#1a1510" />
        </linearGradient>

        {/* Arch inner edge glow */}
        <linearGradient id="arch-edge" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#c4a862" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#d4764e" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#6b4c8a" stopOpacity="0.15" />
        </linearGradient>

        {/* Art deco line pattern */}
        <linearGradient id="deco-line" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c4a862" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#c4a862" stopOpacity="0.05" />
        </linearGradient>

        {/* Portal opening clip path — tall arch */}
        <clipPath id="portal-clip">
          <path d="M 120 390 L 120 160 Q 120 80 200 80 Q 280 80 280 160 L 280 390 Z" />
        </clipPath>

        {/* Outer arch silhouette clip (everything OUTSIDE the portal) */}
        <clipPath id="arch-outer-clip">
          <path d="M 0 0 L 400 0 L 400 430 L 0 430 Z M 120 390 L 120 160 Q 120 80 200 80 Q 280 80 280 160 L 280 390 Z" clipRule="evenodd" />
        </clipPath>

        {/* Star glow filter */}
        <filter id="star-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>

        <filter id="sun-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* ─── Background fill ─── */}
      <rect width="400" height="430" fill="#13110e" />

      {/* ─── Scene inside the portal (clipped to archway) ─── */}
      <g clipPath="url(#portal-clip)">
        {/* Sky */}
        <rect x="100" y="60" width="200" height="340" fill="url(#sky-grad)" />

        {/* Sun / glowing orb on the horizon */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          <circle cx="200" cy="195" r="50" fill="url(#sun-glow)" filter="url(#sun-blur)" />
          <motion.circle
            cx="200" cy="195" r="18"
            fill="#e8a84c"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="200" cy="195" r="24"
            fill="none" stroke="#e8a84c" strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>

        {/* Horizontal glow band at horizon */}
        <motion.rect
          x="120" y="208" width="160" height="3"
          fill="#d4764e" opacity="0.15"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        />

        {/* Far mountains — jagged purple silhouette */}
        <motion.path
          d="M 100 230 L 125 195 L 140 210 L 158 185 L 175 200 L 190 178 L 200 190 L 210 175 L 225 195 L 242 183 L 260 205 L 275 190 L 290 210 L 300 200 L 300 280 L 100 280 Z"
          fill="url(#mtn-far)"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        />

        {/* Mid mountain range — darker, closer */}
        <motion.path
          d="M 100 260 L 118 240 L 132 252 L 150 228 L 165 245 L 180 232 L 195 248 L 210 225 L 228 242 L 245 230 L 262 250 L 278 238 L 295 255 L 300 248 L 300 300 L 100 300 Z"
          fill="url(#mtn-mid)"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        {/* Near canyon mesas — dark silhouettes */}
        <motion.path
          d="M 100 290 L 115 275 L 125 278 L 135 262 L 148 270 L 155 265 L 155 310 L 100 310 Z"
          fill="url(#mesa-near)"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ duration: 1.0, delay: 1.0 }}
        />
        <motion.path
          d="M 245 290 L 255 268 L 262 272 L 272 258 L 285 265 L 300 270 L 300 310 L 245 310 Z"
          fill="url(#mesa-near)"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ duration: 1.0, delay: 1.05 }}
        />

        {/* Desert floor */}
        <rect x="100" y="300" width="200" height="100" fill="url(#desert-floor)" />

        {/* Desert floor subtle texture lines */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <line x1="140" y1="320" x2="260" y2="320" stroke="#6b4c8a" strokeWidth="0.3" opacity="0.15" />
          <line x1="155" y1="340" x2="245" y2="340" stroke="#6b4c8a" strokeWidth="0.25" opacity="0.1" />
          <line x1="165" y1="355" x2="235" y2="355" stroke="#6b4c8a" strokeWidth="0.2" opacity="0.08" />
          <line x1="130" y1="305" x2="270" y2="305" stroke="#d4764e" strokeWidth="0.3" opacity="0.08" />
        </motion.g>

        {/* Geometric wireframe triangle — floating in the landscape */}
        <motion.g
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.8 }}
        >
          <motion.path
            d="M 200 145 L 175 185 L 225 185 Z"
            fill="none" stroke="#c4a862" strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 2.0 }}
          />
          <motion.path
            d="M 200 155 L 183 180 L 217 180 Z"
            fill="none" stroke="#c4a862" strokeWidth="0.4"
            opacity="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 2.3 }}
          />
        </motion.g>

        {/* Geometric stars (art deco diamond shapes) */}
        {geoStars.map((s, i) => (
          <motion.g key={`geo-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.4, 0.8, 0.4], scale: 1 }}
            transition={{
              opacity: { duration: 3 + i * 0.5, delay: 1.5 + s.delay, repeat: Infinity, repeatType: 'reverse' },
              scale: { duration: 0.6, delay: 1.5 + s.delay }
            }}
          >
            {/* 4-pointed diamond star */}
            <path
              d={`M ${s.x} ${s.y - s.size} L ${s.x + s.size * 0.35} ${s.y} L ${s.x} ${s.y + s.size} L ${s.x - s.size * 0.35} ${s.y} Z`}
              fill="#c4a862" opacity="0.7"
            />
            <path
              d={`M ${s.x - s.size} ${s.y} L ${s.x} ${s.y - s.size * 0.35} L ${s.x + s.size} ${s.y} L ${s.x} ${s.y + s.size * 0.35} Z`}
              fill="#c4a862" opacity="0.5"
            />
          </motion.g>
        ))}

        {/* Dot stars */}
        {stars.map((s, i) => (
          <motion.circle key={`star-${i}`}
            cx={s.x} cy={s.y} r={s.r}
            fill="#e8e6e3"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.3, 0.7, 0] }}
            transition={{ duration: 4 + i * 0.3, delay: 1.0 + s.delay, repeat: Infinity, repeatType: 'loop' }}
          />
        ))}

        {/* Faint concentric circles around sun (retro poster motif) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        >
          {[32, 42, 55].map((r, i) => (
            <motion.circle key={`ring-${i}`}
              cx="200" cy="195" r={r}
              fill="none" stroke="#e8a84c" strokeWidth="0.3"
              strokeDasharray={`${2 + i} ${4 + i * 2}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: 5, delay: 2 + i * 0.3, repeat: Infinity, repeatType: 'reverse' }}
            />
          ))}
        </motion.g>

        {/* Horizontal speed lines / poster rays emanating from sun */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.2 }}
        >
          {[
            { y: 188, w: 60, o: 0.06 },
            { y: 193, w: 80, o: 0.08 },
            { y: 198, w: 85, o: 0.08 },
            { y: 203, w: 75, o: 0.06 },
            { y: 208, w: 55, o: 0.04 },
          ].map((line, i) => (
            <rect key={`ray-${i}`}
              x={200 - line.w / 2} y={line.y}
              width={line.w} height="0.8"
              fill="#e8a84c" opacity={line.o}
            />
          ))}
        </motion.g>
      </g>

      {/* ─── Archway frame (everything outside the portal) ─── */}
      <g clipPath="url(#arch-outer-clip)">
        <rect width="400" height="430" fill="#13110e" />

        {/* Art deco decorative patterns on the arch pillars */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          {/* Left pillar deco lines */}
          <rect x="108" y="160" width="1" height="230" fill="url(#deco-line)" />
          <rect x="104" y="180" width="1" height="210" fill="url(#deco-line)" opacity="0.5" />
          {/* Left pillar chevrons */}
          {[0, 1, 2, 3, 4].map(i => (
            <path key={`lchev-${i}`}
              d={`M 90 ${200 + i * 35} L 100 ${192 + i * 35} L 110 ${200 + i * 35}`}
              fill="none" stroke="#c4a862" strokeWidth="0.4" opacity={0.15 - i * 0.02}
            />
          ))}

          {/* Right pillar deco lines */}
          <rect x="291" y="160" width="1" height="230" fill="url(#deco-line)" />
          <rect x="295" y="180" width="1" height="210" fill="url(#deco-line)" opacity="0.5" />
          {/* Right pillar chevrons */}
          {[0, 1, 2, 3, 4].map(i => (
            <path key={`rchev-${i}`}
              d={`M 290 ${200 + i * 35} L 300 ${192 + i * 35} L 310 ${200 + i * 35}`}
              fill="none" stroke="#c4a862" strokeWidth="0.4" opacity={0.15 - i * 0.02}
            />
          ))}

          {/* Keystone ornament at top of arch */}
          <path d="M 193 78 L 200 68 L 207 78" fill="none" stroke="#c4a862" strokeWidth="0.6" opacity="0.25" />
          <circle cx="200" cy="66" r="2" fill="#c4a862" opacity="0.2" />
          <path d="M 188 84 L 200 72 L 212 84" fill="none" stroke="#c4a862" strokeWidth="0.4" opacity="0.12" />
        </motion.g>
      </g>

      {/* ─── Arch inner edge highlight ─── */}
      <motion.path
        d="M 120 390 L 120 160 Q 120 80 200 80 Q 280 80 280 160 L 280 390"
        fill="none" stroke="url(#arch-edge)" strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
      />

      {/* Subtle outer edge */}
      <motion.path
        d="M 116 390 L 116 158 Q 116 76 200 76 Q 284 76 284 158 L 284 390"
        fill="none" stroke="#c4a862" strokeWidth="0.3" opacity="0.08"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, delay: 0.5, ease: 'easeOut' }}
      />

      {/* ─── Base platform / ground line ─── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.0 }}
      >
        <line x1="80" y1="390" x2="320" y2="390" stroke="#c4a862" strokeWidth="0.5" opacity="0.2" />
        <line x1="70" y1="394" x2="330" y2="394" stroke="#c4a862" strokeWidth="0.3" opacity="0.1" />
        {/* Small deco marks at base */}
        <rect x="118" y="390" width="2" height="4" fill="#c4a862" opacity="0.15" />
        <rect x="280" y="390" width="2" height="4" fill="#c4a862" opacity="0.15" />
      </motion.g>

      {/* ─── Floating wireframe polyhedron (top-right) ─── */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.2, y: [0, -4, 0] }}
        transition={{
          opacity: { duration: 1.5, delay: 2.5 },
          y: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }
        }}
      >
        {/* Small octahedron shape */}
        <path d="M 340 80 L 355 100 L 340 120 L 325 100 Z" fill="none" stroke="#d4764e" strokeWidth="0.6" />
        <path d="M 340 80 L 340 120" fill="none" stroke="#d4764e" strokeWidth="0.3" />
        <path d="M 325 100 L 355 100" fill="none" stroke="#d4764e" strokeWidth="0.3" />
      </motion.g>

      {/* ─── Floating wireframe polyhedron (top-left) ─── */}
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.15, y: [0, -3, 0] }}
        transition={{
          opacity: { duration: 1.5, delay: 2.8 },
          y: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3.0 }
        }}
      >
        {/* Small diamond */}
        <path d="M 55 110 L 68 95 L 80 110 L 68 125 Z" fill="none" stroke="#6b4c8a" strokeWidth="0.6" />
        <line x1="68" y1="95" x2="68" y2="125" stroke="#6b4c8a" strokeWidth="0.3" />
      </motion.g>

      {/* ─── Ambient floating particles ─── */}
      {[
        { cx: 50, cy: 300, r: 1, color: '#d4764e', del: 3 },
        { cx: 350, cy: 250, r: 0.8, color: '#c4a862', del: 3.5 },
        { cx: 35, cy: 180, r: 0.6, color: '#6b4c8a', del: 4 },
        { cx: 365, cy: 150, r: 0.7, color: '#d4764e', del: 4.2 },
        { cx: 45, cy: 50, r: 0.5, color: '#c4a862', del: 3.8 },
        { cx: 360, cy: 340, r: 0.6, color: '#6b4c8a', del: 4.5 },
      ].map((p, i) => (
        <motion.circle key={`particle-${i}`}
          cx={p.cx} cy={p.cy} r={p.r}
          fill={p.color}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0.15, 0.4, 0], y: [0, -8, 0] }}
          transition={{ duration: 6, delay: p.del, repeat: Infinity }}
        />
      ))}
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

// ─── Main page ───────────────────────────────────────────────────────────────
export default function WarmHomePage() {
  const router = useRouter()
  const stats = getStats()

  return (
    <div className="min-h-screen text-[#e8e6e3] overflow-hidden relative"
      style={{ background: '#13110e' }}
    >
      {/* Warm ambient radial glow behind hero */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(106,76,138,0.12) 0%, rgba(212,118,78,0.06) 45%, transparent 75%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,118,78,0.08) 0%, rgba(196,168,98,0.04) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Lower warm glow */}
      <div
        className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(42,26,10,0.3) 0%, rgba(30,14,48,0.15) 50%, transparent 80%)',
          filter: 'blur(100px)',
        }}
      />

      {/* ─── Nav ─── */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="nav-icon-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c4a862" />
                <stop offset="100%" stopColor="#d4764e" />
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="3" fill="url(#nav-icon-grad)" opacity="0.9" />
            <circle cx="12" cy="12" r="8" stroke="#c4a862" strokeWidth="1" opacity="0.3" />
            <circle cx="12" cy="12" r="11.5" stroke="#c4a862" strokeWidth="0.5" opacity="0.12" />
          </svg>
          <span className="text-[#e8e6e3] font-medium text-lg tracking-[-0.02em]">Grove</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/waitlist')}
            className="text-sm px-4 py-2 rounded-lg text-[#c4a862]/80 hover:text-[#c4a862] border border-[#c4a862]/15 hover:border-[#c4a862]/30 transition-all"
          >
            Join Waitlist
          </button>
          <button
            onClick={() => router.push('/grow')}
            className="text-sm px-4 py-2 rounded-lg bg-[#e8e6e3]/[0.06] text-[#e8e6e3]/60 hover:bg-[#e8e6e3]/[0.1] hover:text-[#e8e6e3]/80 transition-all"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <main className="relative z-10 max-w-6xl mx-auto px-8">
        <div className="flex items-center min-h-[70vh] gap-8">
          <div className="flex-1 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-xs font-mono tracking-[0.15em] uppercase mb-8"
                style={{ color: '#d4764e' }}
              >
                A new model of company formation
              </p>
              <h1
                className="text-5xl sm:text-6xl font-semibold leading-[1.08] tracking-[-0.035em] mb-7"
                style={{
                  background: 'linear-gradient(135deg, #c4a862 0%, #d4a050 50%, #d4764e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Plant an idea.{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #e0c474 0%, #c4a862 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Grow a company.
                </span>
              </h1>
              <p className="text-[#e8e6e3]/40 text-lg max-w-md leading-relaxed mb-10">
                Grove turns raw ideas into living companies — coordinated by intelligent agents and grown by a global network of builders.
              </p>
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/grow')}
                  className="px-7 py-3.5 rounded-xl font-medium text-sm transition-colors"
                  style={{
                    background: 'linear-gradient(135deg, #c4a862, #d4764e)',
                    color: '#13110e',
                  }}
                >
                  Start Planting
                </motion.button>
                <button
                  onClick={() => router.push('/grow?demo=true')}
                  className="px-7 py-3.5 rounded-xl text-[#e8e6e3]/40 hover:text-[#e8e6e3]/70 transition-colors text-sm"
                >
                  Watch Demo
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/vote')}
                  className="px-7 py-3.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    border: '1px solid rgba(212,118,78,0.25)',
                    color: '#d4764e',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(212,118,78,0.1)'
                    e.currentTarget.style.borderColor = 'rgba(212,118,78,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'rgba(212,118,78,0.25)'
                  }}
                >
                  Vote & Earn
                </motion.button>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 max-w-md"
          >
            <RetroPortal />
          </motion.div>
        </div>

        {/* ─── Stats bar ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-10 py-8"
          style={{ borderTop: '1px solid rgba(212,118,78,0.08)' }}
        >
          {[
            { value: stats.total, label: 'ideas planted' },
            { value: stats.specsGenerated, label: 'specs generated' },
            { value: stats.buildsInProgress, label: 'builds active' },
            { value: stats.settled, label: 'settled' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-10">
              <div>
                <p className="text-2xl font-semibold tracking-[-0.02em] text-[#e8e6e3]/80">{s.value}</p>
                <p className="text-[11px] font-mono text-[#e8e6e3]/25 mt-1">{s.label}</p>
              </div>
              {/* Warm-toned divider */}
              <div
                className="w-px h-8"
                style={{
                  background: 'linear-gradient(to bottom, rgba(196,168,98,0.0), rgba(212,118,78,0.2), rgba(107,76,138,0.0))',
                }}
              />
            </div>
          ))}
          <button
            onClick={() => router.push('/explore')}
            className="text-sm font-medium transition-colors whitespace-nowrap"
            style={{ color: '#d4764e' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#e08860' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#d4764e' }}
          >
            Explore all →
          </button>
        </motion.div>

        {/* ─── How it works ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="py-20"
          style={{ borderTop: '1px solid rgba(212,118,78,0.08)' }}
        >
          <p
            className="text-[11px] font-mono uppercase tracking-[0.15em] mb-14"
            style={{ color: 'rgba(212,118,78,0.5)' }}
          >
            How it works
          </p>
          <div className="relative">
            {/* Connecting line */}
            <div
              className="absolute top-10 left-[calc(12.5%+14px)] right-[calc(12.5%+14px)] h-px z-0"
              style={{
                background: 'linear-gradient(to right, rgba(196,168,98,0), rgba(212,118,78,0.2), rgba(107,76,138,0.2), rgba(196,168,98,0))',
              }}
            />
            <div className="relative z-10 grid grid-cols-4 gap-5">
              {STEPS.map((item, i) => (
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
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: i === 0 ? 'rgba(196,168,98,0.1)' : 'rgba(212,118,78,0.06)',
                          border: i === 0 ? '1px solid rgba(196,168,98,0.2)' : '1px solid rgba(212,118,78,0.12)',
                        }}
                      >
                        {i === 0 && (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle cx="9" cy="13" r="2" fill="#c4a862" opacity="0.7" />
                            <path d="M9 11V5" stroke="#c4a862" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
                            <path d="M9 5L6.5 2.5" stroke="#c4a862" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
                            <path d="M9 5L11.5 2.5" stroke="#c4a862" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
                          </svg>
                        )}
                        {i === 1 && (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <rect x="3" y="4" width="12" height="2" rx="0.5" fill="#d4764e" opacity="0.5" />
                            <rect x="3" y="8" width="9" height="2" rx="0.5" fill="#d4764e" opacity="0.35" />
                            <rect x="3" y="12" width="6" height="2" rx="0.5" fill="#d4764e" opacity="0.2" />
                          </svg>
                        )}
                        {i === 2 && (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M3 14L9 4L15 14" stroke="#d4764e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                            <path d="M5.5 14L9 7L12.5 14" stroke="#d4764e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
                            <circle cx="9" cy="6" r="1.5" fill="#d4764e" opacity="0.3" />
                          </svg>
                        )}
                        {i === 3 && (
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle cx="9" cy="9" r="5" stroke="#d4764e" strokeWidth="1" opacity="0.3" />
                            <circle cx="9" cy="9" r="2.5" stroke="#d4764e" strokeWidth="1" opacity="0.4" />
                            <circle cx="9" cy="9" r="1" fill="#c4a862" opacity="0.6" />
                          </svg>
                        )}
                      </div>
                      <span
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-mono text-[#e8e6e3]/30"
                        style={{
                          background: '#13110e',
                          border: '1px solid rgba(232,230,227,0.08)',
                        }}
                      >
                        {i + 1}
                      </span>
                    </div>
                  </div>
                  {/* Card with warm gradient border on hover */}
                  <div
                    className="rounded-xl p-5 min-h-[120px] flex flex-col justify-center text-center transition-all duration-300"
                    style={{
                      background: 'rgba(232,230,227,0.02)',
                      border: '1px solid rgba(232,230,227,0.05)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(232,230,227,0.03)'
                      e.currentTarget.style.border = '1px solid transparent'
                      e.currentTarget.style.backgroundImage = 'linear-gradient(rgba(232,230,227,0.03), rgba(232,230,227,0.03)), linear-gradient(135deg, rgba(196,168,98,0.3), rgba(212,118,78,0.2), rgba(107,76,138,0.2))'
                      e.currentTarget.style.backgroundOrigin = 'border-box'
                      e.currentTarget.style.backgroundClip = 'padding-box, border-box'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundImage = 'none'
                      e.currentTarget.style.background = 'rgba(232,230,227,0.02)'
                      e.currentTarget.style.border = '1px solid rgba(232,230,227,0.05)'
                      e.currentTarget.style.backgroundOrigin = ''
                      e.currentTarget.style.backgroundClip = ''
                    }}
                  >
                    <p className="text-[#e8e6e3]/80 font-medium text-sm tracking-[-0.01em] mb-2">{item.label}</p>
                    <p className="text-[#e8e6e3]/30 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ─── CTA footer ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="py-16 flex items-center justify-between"
          style={{ borderTop: '1px solid rgba(212,118,78,0.08)' }}
        >
          <div>
            <p className="text-[#e8e6e3]/60 text-lg font-medium tracking-[-0.01em]">Ready to grow something?</p>
            <p className="text-[#e8e6e3]/25 text-sm mt-1">Join {stats.total} ideas already in the grove.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/grow')}
            className="px-7 py-3.5 rounded-xl font-medium text-sm transition-colors"
            style={{
              background: 'linear-gradient(135deg, #c4a862, #d4764e)',
              color: '#13110e',
            }}
          >
            Start Planting
          </motion.button>
        </motion.div>
        <div className="h-12" />
      </main>
    </div>
  )
}
