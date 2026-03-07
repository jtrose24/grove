import { NextRequest, NextResponse } from 'next/server'
import { generateBid } from '@/lib/mockData'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const phaseId = searchParams.get('phaseId') || 'phase-1'
  const count = parseInt(searchParams.get('count') || '3')

  const bids = Array.from({ length: count }, () => generateBid(phaseId))
  return NextResponse.json(bids)
}
