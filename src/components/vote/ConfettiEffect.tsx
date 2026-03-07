'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#c4a862', '#7b8a6e', '#8a9a7b', '#e8e6e3', '#d4b872']

interface Particle {
  x: number
  y: number
  rotation: number
  scale: number
  color: string
  shape: 'circle' | 'square' | 'diamond'
}

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    x: (Math.random() - 0.5) * 350,
    y: -(Math.random() * 250 + 80),
    rotation: Math.random() * 720 - 360,
    scale: Math.random() * 0.6 + 0.4,
    color: COLORS[i % COLORS.length],
    shape: (['circle', 'square', 'diamond'] as const)[i % 3],
  }))
}

export default function ConfettiEffect() {
  const [particles] = useState(() => makeParticles(28))
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1500)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{
            x: '50%',
            y: '50%',
            scale: 0,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            x: `calc(50% + ${p.x}px)`,
            y: `calc(50% + ${p.y}px)`,
            scale: p.scale,
            rotate: p.rotation,
            opacity: 0,
          }}
          transition={{
            duration: 1.2 + Math.random() * 0.4,
            ease: 'easeOut',
          }}
          style={{ backgroundColor: p.color }}
          className={`absolute ${
            p.shape === 'circle' ? 'rounded-full w-2 h-2' :
            p.shape === 'diamond' ? 'w-2 h-2 rotate-45' :
            'w-2 h-2 rounded-sm'
          }`}
        />
      ))}
    </div>
  )
}
