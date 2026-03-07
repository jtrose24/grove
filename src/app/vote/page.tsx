'use client'
import { useEffect, useState } from 'react'
import { Suspense } from 'react'
import { useVoteStore } from '@/lib/voteStore'
import OnboardingFlow from '@/components/vote/OnboardingFlow'
import VotingExperience from '@/components/vote/VotingExperience'

function VotePageInner() {
  const onboardingCompleted = useVoteStore((s) => s.onboardingCompleted)
  const fullReset = useVoteStore((s) => s.fullReset)
  const [ready, setReady] = useState(false)

  // Always reset on mount so the demo always starts fresh
  useEffect(() => {
    fullReset()
    setReady(true)
  }, [fullReset])

  if (!ready) return null

  if (!onboardingCompleted) {
    return <OnboardingFlow />
  }

  return <VotingExperience />
}

export default function VotePage() {
  return (
    <Suspense>
      <VotePageInner />
    </Suspense>
  )
}
