'use client'
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGroveStore } from '@/lib/store'
import { getExecutionMessage } from '@/lib/mockData'
import GrowthTree from './GrowthTree'

const LOG_ICON: Record<string, string> = {
  info: '→',
  success: '✓',
  deploy: '🚀',
}

const LOG_COLOR: Record<string, string> = {
  info: 'text-[#e8e6e3]/50',
  success: 'text-[#8a9a7b]',
  deploy: 'text-[#c4a862]',
}

const METRIC_CONFIG = [
  { key: 'users' as const, label: 'Users', format: (v: number) => v.toLocaleString(), suffix: '', color: 'from-blue-500 to-blue-400' },
  { key: 'revenue' as const, label: 'Revenue', format: (v: number) => `$${v.toLocaleString()}`, suffix: '', color: 'from-[#c4a862] to-[#d4b872]' },
  { key: 'conversion' as const, label: 'Conversion', format: (v: number) => `${v}%`, suffix: '', color: 'from-purple-500 to-purple-400' },
  { key: 'engagement' as const, label: 'Engagement', format: (v: number) => `${v}%`, suffix: '', color: 'from-[#7b8a6e] to-[#8a9a7b]' },
  { key: 'traffic' as const, label: 'Traffic', format: (v: number) => v.toLocaleString(), suffix: '/day', color: 'from-sky-500 to-sky-400' },
  { key: 'completion' as const, label: 'Build Progress', format: (v: number) => `${v}%`, suffix: '', color: 'from-[#7b8a6e] to-[#8a9a7b]' },
]

export default function ExecutionView() {
  const { executionLogs, metrics, updateMetrics, addExecutionLog, selectedBids, specPhases } = useGroveStore()
  const logsRef = useRef<HTMLDivElement>(null)
  const logIndexRef = useRef(0)
  const metricsRef = useRef(metrics)
  metricsRef.current = metrics

  const winnerName = Object.values(selectedBids)[0]?.builderName || 'Atlas Build'

  // Drip execution logs
  useEffect(() => {
    const interval = setInterval(() => {
      const log = getExecutionMessage(logIndexRef.current++, winnerName)
      addExecutionLog(log)
      logsRef.current?.scrollTo({ top: logsRef.current.scrollHeight, behavior: 'smooth' })
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  // Metrics growth
  useEffect(() => {
    const interval = setInterval(() => {
      updateMetrics({
        users: metricsRef.current.users + Math.floor(Math.random() * 12 + 3),
        revenue: metricsRef.current.revenue + Math.floor(Math.random() * 80 + 20),
        conversion: parseFloat(Math.min(15, metricsRef.current.conversion + Math.random() * 0.3).toFixed(1)),
        engagement: parseFloat(Math.min(98, metricsRef.current.engagement + Math.random() * 0.8).toFixed(1)),
        traffic: metricsRef.current.traffic + Math.floor(Math.random() * 25 + 8),
        completion: Math.min(100, metricsRef.current.completion + Math.floor(Math.random() * 4 + 1)),
      })
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-full gap-4 p-4">
      {/* Left: Activity feed */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 bg-[#8a9a7b] rounded-full animate-pulse" />
          <span className="text-[#c4a862] text-sm font-semibold uppercase tracking-wider">Live Build</span>
          <span className="text-[#e8e6e3]/30 text-xs">— {winnerName} executing</span>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {METRIC_CONFIG.map(({ key, label, format, color }) => (
            <motion.div
              key={key}
              className="bg-[#e8e6e3]/5 border border-[#e8e6e3]/8 rounded-xl p-3"
            >
              <p className="text-[#e8e6e3]/40 text-xs mb-1">{label}</p>
              <motion.p
                key={metrics[key]}
                initial={{ opacity: 0.5, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-lg font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
              >
                {format(metrics[key])}
              </motion.p>
              <div className="mt-1.5 h-0.5 bg-[#e8e6e3]/8 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${color} rounded-full`}
                  animate={{ width: `${Math.min(100, (metrics[key] / (key === 'revenue' ? 5000 : key === 'users' ? 500 : key === 'traffic' ? 2000 : 100)) * 100)}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Log stream */}
        <div
          ref={logsRef}
          className="flex-1 overflow-y-auto bg-black/30 border border-[#e8e6e3]/8 rounded-2xl p-4 font-mono text-xs space-y-1.5"
        >
          <AnimatePresence>
            {executionLogs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-start gap-2 ${LOG_COLOR[log.type]}`}
              >
                <span className="flex-shrink-0 mt-0.5">{LOG_ICON[log.type]}</span>
                <span>{log.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {executionLogs.length === 0 && (
            <p className="text-[#e8e6e3]/20">Initializing build environment...</p>
          )}
        </div>
      </div>

      {/* Right: Growth tree */}
      <div className="w-64 flex-shrink-0 flex flex-col">
        <p className="text-[#c4a862] text-sm font-semibold uppercase tracking-wider mb-3">Growth</p>
        <div className="flex-1 bg-[#e8e6e3]/3 border border-[#e8e6e3]/8 rounded-2xl overflow-hidden">
          <GrowthTree metrics={metrics} />
        </div>

        {/* Winner summary */}
        {Object.entries(selectedBids).length > 0 && (
          <div className="mt-3 space-y-2">
            {Object.entries(selectedBids).map(([phaseId, bid]) => {
              const phase = specPhases.find((p) => p.id === phaseId)
              return (
                <div key={phaseId} className="bg-[#e8e6e3]/4 border border-[#e8e6e3]/8 rounded-xl p-3">
                  <p className="text-[#e8e6e3]/30 text-xs mb-1">{phase?.title || phaseId}</p>
                  <div className="flex items-center gap-2">
                    <span>{bid.builderAvatar}</span>
                    <span className="text-[#e8e6e3]/70 text-xs font-medium">{bid.builderName}</span>
                    <span className="ml-auto text-[#c4a862] text-xs">{bid.cost.toLocaleString()} USDC</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
