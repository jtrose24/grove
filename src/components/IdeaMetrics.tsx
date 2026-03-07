'use client'
import { motion } from 'framer-motion'
import { Metrics } from '@/lib/store'

const METRIC_CONFIG = [
  { key: 'users' as const, label: 'Users', format: (v: number) => v.toLocaleString(), color: 'from-blue-500 to-blue-400' },
  { key: 'revenue' as const, label: 'Revenue', format: (v: number) => `$${v.toLocaleString()}`, color: 'from-[#c4a862] to-amber-400' },
  { key: 'conversion' as const, label: 'Conversion', format: (v: number) => `${v}%`, color: 'from-purple-500 to-purple-400' },
  { key: 'engagement' as const, label: 'Engagement', format: (v: number) => `${v}%`, color: 'from-[#7b8a6e] to-[#8a9a7b]' },
  { key: 'traffic' as const, label: 'Traffic', format: (v: number) => `${v.toLocaleString()}/day`, color: 'from-sky-500 to-sky-400' },
  { key: 'completion' as const, label: 'Build Progress', format: (v: number) => `${v}%`, color: 'from-[#7b8a6e] to-[#8a9a7b]' },
]

export default function IdeaMetrics({ metrics, progress, builderName }: {
  metrics?: Metrics
  progress?: number
  builderName?: string
}) {
  if (!metrics) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-[#c4a862] text-xs font-mono font-bold uppercase tracking-wider">Metrics</span>
        {builderName && (
          <span className="text-[#e8e6e3]/25 text-[10px] font-mono">built by {builderName}</span>
        )}
      </div>

      {/* Overall progress */}
      {progress !== undefined && (
        <div className="bg-[#e8e6e3]/[0.03] border border-[#e8e6e3]/8 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#e8e6e3]/50 text-xs">Overall Progress</span>
            <span className="text-[#c4a862] text-sm font-bold font-mono">{progress}%</span>
          </div>
          <div className="h-2 bg-[#e8e6e3]/8 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-[#7b8a6e] to-[#8a9a7b] rounded-full"
            />
          </div>
        </div>
      )}

      {/* Metric grid */}
      <div className="grid grid-cols-3 gap-2">
        {METRIC_CONFIG.map(({ key, label, format, color }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="bg-[#e8e6e3]/5 border border-[#e8e6e3]/8 rounded-xl p-3"
          >
            <p className="text-[#e8e6e3]/40 text-xs mb-1">{label}</p>
            <p className={`text-lg font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
              {format(metrics[key])}
            </p>
            <div className="mt-1.5 h-0.5 bg-[#e8e6e3]/8 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${color} rounded-full`}
                style={{
                  width: `${Math.min(100, (metrics[key] / (key === 'revenue' ? 20000 : key === 'users' ? 1500 : key === 'traffic' ? 4000 : 100)) * 100)}%`
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
