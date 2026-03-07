import { NextRequest, NextResponse } from 'next/server'
import { generateBid } from '@/lib/mockData'

const MAX_COUNT = 20

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const phaseId = searchParams.get('phaseId') || 'phase-1'
  const rawCount = parseInt(searchParams.get('count') || '3')
  const count = Math.min(Math.max(isNaN(rawCount) ? 3 : rawCount, 1), MAX_COUNT)

  const bids = Array.from({ length: count }, () => generateBid(phaseId))
  return NextResponse.json(bids)
}
