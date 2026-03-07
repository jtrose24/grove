'use client'
import { motion } from 'framer-motion'
import { Bid } from '@/lib/store'

function StarRating({ score }: { score: number }) {
  const stars = Math.round((score / 100) * 5)
  return (
    <span className="text-[10px]">
      {'★'.repeat(stars)}
      {'☆'.repeat(5 - stars)}
    </span>
  )
}

function BidCard({ bid, isWinner }: { bid: Bid; isWinner: boolean }) {
  return (
    <div
      className={`bg-[#e8e6e3]/[0.03] rounded-xl p-4 border transition-all ${
        isWinner
          ? 'border-[#c4a862]/40 bg-[#c4a862]/5'
          : 'border-[#e8e6e3]/8'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-6 rounded-full bg-[#7b8a6e]/15 flex items-center justify-center text-[9px] font-mono text-[#7b8a6e] font-bold">{bid.builderName.split(' ').map(n => n[0]).join('')}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[#e8e6e3]/80 text-xs font-semibold">{bid.builderName}</span>
            {isWinner && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#c4a862]/20 text-[#c4a862] font-mono font-bold">
                SELECTED
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-[#c4a862]/60">
            <StarRating score={bid.reputation} />
            <span className="text-[#e8e6e3]/20 text-[10px] font-mono ml-1">{bid.reputation}/100</span>
          </div>
        </div>
      </div>

      {/* Approach */}
      <p className="text-[#e8e6e3]/50 text-xs leading-relaxed mb-3">{bid.approach}</p>

      {/* Stats */}
      <div className="flex items-center gap-4 text-[10px] font-mono">
        <div>
          <span className="text-[#e8e6e3]/25">Cost </span>
          <span className="text-[#e8e6e3]/70">${bid.cost.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-[#e8e6e3]/25">Value </span>
          <span className="text-[#8a9a7b]/70">${bid.predictedValue.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-[#e8e6e3]/25">Conf </span>
          <span className="text-[#c4a862]/70">{Math.round(bid.confidence * 100)}%</span>
        </div>
      </div>

      {/* Confidence bar */}
      <div className="mt-2 h-1 bg-[#e8e6e3]/8 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${isWinner ? 'bg-[#c4a862]' : 'bg-[#7b8a6e]/50'}`}
          style={{ width: `${bid.confidence * 100}%` }}
        />
      </div>

      {/* Votes */}
      <div className="mt-2 flex items-center gap-3 text-[10px] text-[#e8e6e3]/25 font-mono">
        <span>+{bid.upvotes}</span>
        <span>-{bid.downvotes}</span>
      </div>
    </div>
  )
}

export default function IdeaBidList({
  bids,
  selectedBids,
}: {
  bids?: Record<string, Bid[]>
  selectedBids?: Record<string, Bid>
}) {
  if (!bids || Object.keys(bids).length === 0) return null

  const allBids = Object.entries(bids)
  const winnerIds = new Set(
    selectedBids ? Object.values(selectedBids).map((b) => b.id) : []
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-[#c4a862] text-xs font-mono font-bold uppercase tracking-wider">Bids</span>
        <span className="text-[#e8e6e3]/20 text-[10px] font-mono">
          {allBids.reduce((s, [, b]) => s + b.length, 0)} total
        </span>
      </div>

      {allBids.map(([phaseId, phaseBids]) => (
        <div key={phaseId}>
          <p className="text-[#e8e6e3]/25 text-[10px] font-mono uppercase tracking-wider mb-2">{phaseId}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {phaseBids.map((bid, i) => (
              <motion.div
                key={bid.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <BidCard bid={bid} isWinner={winnerIds.has(bid.id)} />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
