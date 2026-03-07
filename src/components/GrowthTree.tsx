'use client'
import { motion } from 'framer-motion'
import { Metrics } from '@/lib/store'

interface Props {
  metrics: Metrics
}

export default function GrowthTree({ metrics }: Props) {
  const branchScale = Math.min(1, metrics.completion / 60)
  const canopyOpacity = Math.min(1, metrics.users / 100)
  const fruitCount = Math.floor(metrics.revenue / 500)
  const leafDensity = Math.min(1, metrics.engagement / 80)

  const fruits = Array.from({ length: Math.min(fruitCount, 8) }, (_, i) => i)

  return (
    <svg
      viewBox="0 0 200 280"
      className="w-full h-full"
      style={{ background: 'transparent' }}
    >
      {/* Ground */}
      <motion.ellipse
        cx="100" cy="265" rx="60" ry="8"
        fill="#0E2F24"
        opacity={0.6}
        initial={{ rx: 10 }}
        animate={{ rx: 60 }}
        transition={{ duration: 2 }}
      />

      {/* Roots */}
      <motion.path
        d="M85 250 Q70 260 55 268 M100 252 Q100 265 100 272 M115 250 Q130 262 145 268"
        stroke="#1F5A45"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Trunk */}
      <motion.path
        d="M90 250 Q88 220 92 190 Q95 160 93 130 Q95 110 100 95"
        stroke="#2d6e50"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
      />
      <motion.path
        d="M110 250 Q112 220 108 190 Q105 160 107 130 Q105 110 100 95"
        stroke="#1F5A45"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
      />

      {/* Main branches */}
      <motion.path
        d="M97 160 Q75 145 55 135 M100 140 Q80 120 65 105 M103 155 Q120 138 140 128 M100 135 Q118 115 132 100"
        stroke="#1F5A45"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: branchScale, opacity: branchScale }}
        transition={{ duration: 2, delay: 0.5 }}
      />

      {/* Secondary branches */}
      <motion.path
        d="M70 140 Q55 128 45 118 M75 130 Q62 115 55 100 M130 133 Q145 120 155 110 M125 128 Q138 112 145 98"
        stroke="#2d6e50"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: branchScale, opacity: branchScale * 0.8 }}
        transition={{ duration: 2, delay: 1 }}
      />

      {/* Canopy clusters */}
      {[
        { cx: 55, cy: 118, r: 30 },
        { cx: 100, cy: 80, r: 35 },
        { cx: 148, cy: 112, r: 28 },
        { cx: 75, cy: 90, r: 22 },
        { cx: 125, cy: 88, r: 24 },
      ].map((circle, i) => (
        <motion.circle
          key={i}
          cx={circle.cx}
          cy={circle.cy}
          r={circle.r}
          fill={i === 1 ? '#1F5A45' : '#166840'}
          opacity={0}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{
            opacity: canopyOpacity * leafDensity * (0.6 + i * 0.05),
            scale: 0.5 + canopyOpacity * 0.5,
          }}
          style={{ transformOrigin: `${circle.cx}px ${circle.cy}px` }}
          transition={{ duration: 1.5, delay: 0.8 + i * 0.2 }}
        />
      ))}

      {/* Leaf shimmer */}
      {[
        { cx: 48, cy: 108 }, { cx: 88, cy: 68 }, { cx: 112, cy: 72 },
        { cx: 143, cy: 104 }, { cx: 66, cy: 84 },
      ].map((pos, i) => (
        <motion.circle
          key={`leaf-${i}`}
          cx={pos.cx}
          cy={pos.cy}
          r={8}
          fill="#22c55e"
          opacity={0}
          animate={{
            opacity: [0, leafDensity * 0.5, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.7,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}

      {/* Fruits (revenue) */}
      {fruits.map((i) => {
        const positions = [
          { cx: 52, cy: 125 }, { cx: 148, cy: 118 }, { cx: 98, cy: 88 },
          { cx: 74, cy: 97 }, { cx: 126, cy: 95 }, { cx: 45, cy: 112 },
          { cx: 155, cy: 108 }, { cx: 100, cy: 65 },
        ]
        const pos = positions[i % positions.length]
        return (
          <motion.circle
            key={`fruit-${i}`}
            cx={pos.cx}
            cy={pos.cy}
            r={5}
            fill="#C6A85E"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.3 }}
          />
        )
      })}

      {/* Floating spores */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.circle
          key={`spore-${i}`}
          cx={30 + i * 35}
          cy={200}
          r={1.5}
          fill="#C6A85E"
          animate={{
            cy: [200, 100 + i * 10, 50],
            opacity: [0, 0.6, 0],
            cx: [30 + i * 35, 25 + i * 35 + Math.sin(i) * 15, 20 + i * 35],
          }}
          transition={{
            duration: 4 + i,
            delay: i * 1.2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      ))}
    </svg>
  )
}
