'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

function Particle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-[#C6A85E]/30"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -30, 0],
        opacity: [0, 0.6, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 5 + delay,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
      }}
    />
  )
}

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  x: (i * 17 + 5) % 100,
  y: (i * 23 + 10) % 100,
  delay: i * 0.4,
}))

const HOW_IT_WORKS = [
  { emoji: '🌱', step: 'Plant', desc: 'Speak your idea into existence.' },
  { emoji: '🌿', step: 'Cultivate', desc: 'The Arborist turns it into a structured growth plan.' },
  { emoji: '🌳', step: 'Grow', desc: 'Builders compete to bring it to life.' },
  { emoji: '🍂', step: 'Harvest', desc: 'Watch value emerge in real time.' },
]

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#060f0b] text-white overflow-hidden relative">
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => (
          <Particle key={i} {...p} />
        ))}
      </div>

      {/* Radial glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1F5A45]/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-[#C6A85E]/5 blur-[80px] pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌲</span>
          <span className="text-white font-bold text-xl tracking-tight">Grove</span>
        </div>
        <button
          onClick={() => router.push('/grow')}
          className="text-sm px-4 py-2 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all"
        >
          Launch App
        </button>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#C6A85E] text-sm font-medium uppercase tracking-[0.2em] mb-6">
            A new model of company formation
          </p>

          <h1 className="text-5xl sm:text-7xl font-bold leading-[1.05] tracking-tight mb-6 max-w-4xl">
            Plant an idea.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1F5A45] via-[#C6A85E] to-[#1F5A45]">
              Grow a company.
            </span>
          </h1>

          <p className="text-white/50 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-10">
            Grove turns raw ideas into living companies — coordinated by intelligent agents
            and grown by a global network of builders.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/grow')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#1F5A45] to-[#0E2F24] border border-[#C6A85E]/30 text-[#C6A85E] font-semibold text-lg hover:border-[#C6A85E]/60 hover:shadow-xl hover:shadow-[#C6A85E]/10 transition-all duration-200"
            >
              🌱 Start Planting
            </motion.button>
            <button
              onClick={() => router.push('/grow?demo=true')}
              className="px-8 py-4 rounded-2xl border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition-all text-lg"
            >
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Tree */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-16 text-8xl select-none"
        >
          🌳
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 w-full max-w-4xl"
        >
          <p className="text-white/30 text-sm uppercase tracking-[0.2em] mb-10">How it works</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="bg-white/4 border border-white/8 rounded-2xl p-5 text-center hover:border-[#1F5A45]/40 hover:bg-white/6 transition-all"
              >
                <span className="text-3xl mb-3 block">{item.emoji}</span>
                <p className="text-white/90 font-semibold text-sm mb-1">{item.step}</p>
                <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
