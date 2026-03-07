'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useVoteStore } from '@/lib/voteStore'
import OnboardingFlow from '@/components/vote/OnboardingFlow'
import VotingExperience from '@/components/vote/VotingExperience'

function VotePageInner() {
  const searchParams = useSearchParams()
  const onboardingCompleted = useVoteStore((s) => s.onboardingCompleted)
  const fullReset = useVoteStore((s) => s.fullReset)

  useEffect(() => {
    if (searchParams.get('reset') === 'true') {
      fullReset()
      window.history.replaceState({}, '', '/vote')
    }
  }, [searchParams, fullReset])

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
