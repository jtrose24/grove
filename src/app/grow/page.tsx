'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { useGroveStore } from '@/lib/store'
import { useAuthStore } from '@/lib/authStore'
import TopNav from '@/components/TopNav'
import ChatInterface from '@/components/ChatInterface'
import SpecGenerator from '@/components/SpecGenerator'
import BidEngine from '@/components/BidEngine'
import ExecutionView from '@/components/ExecutionView'

function GrowPageInner() {
  const { phase } = useGroveStore()
  const searchParams = useSearchParams()
  const isDemo = searchParams.get('demo') === 'true'
  const { user, signInAs } = useAuthStore()

  useEffect(() => {
    if (isDemo && !user) {
      signInAs('pl-ac')
    }
  }, [isDemo, user, signInAs])

  const PHASE_LABELS: Record<string, string> = {
    ideation: 'Plant your idea',
    'spec-gen': 'Arborist is building your spec',
    bidding: 'Builders are competing',
    execution: 'Building live',
  }

  return (
    <div className="h-screen flex flex-col bg-[#111110] text-[#e8e6e3] overflow-hidden">
      <TopNav />

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="px-6 py-2 border-b border-[#e8e6e3]/[0.04]">
          <p className="text-xs text-[#e8e6e3]/30 uppercase tracking-widest">{PHASE_LABELS[phase]}</p>
        </div>

        <div className="flex-1 overflow-hidden">
          {phase === 'ideation' && <ChatInterface isDemo={isDemo} />}
          {phase === 'spec-gen' && <SpecGenerator isDemo={isDemo} />}
          {phase === 'bidding' && <BidEngine isDemo={isDemo} />}
          {phase === 'execution' && <ExecutionView />}
        </div>
      </div>
    </div>
  )
}

export default function GrowPage() {
  return (
    <Suspense>
      <GrowPageInner />
    </Suspense>
  )
}
