import { NextResponse } from 'next/server'

export async function GET() {
  // Returns incrementally growing metrics for demo
  const base = {
    users: Math.floor(Math.random() * 50 + 10),
    revenue: Math.floor(Math.random() * 500 + 100),
    conversion: parseFloat((Math.random() * 2 + 1).toFixed(1)),
    engagement: parseFloat((Math.random() * 15 + 60).toFixed(1)),
    traffic: Math.floor(Math.random() * 200 + 50),
    completion: Math.floor(Math.random() * 8 + 2),
  }
  return NextResponse.json(base)
}
