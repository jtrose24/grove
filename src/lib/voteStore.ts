'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface VoteState {
  // Onboarding
  onboardingCompleted: boolean
  email: string
  walletAddress: string

  // Voting
  eigenBalance: number
  votes: Record<string, 'A' | 'B'>
  streakCount: number
  bestStreak: number
  correctCount: number
  totalVotesCast: number
  currentIdeaIndex: number
  votingComplete: boolean

  // Actions
  completeOnboarding: (email: string, walletAddress: string) => void
  castVote: (ideaId: string, choice: 'A' | 'B', isWinner: boolean) => void
  advanceIdea: () => void
  markVotingComplete: () => void
  reset: () => void
  fullReset: () => void
}

export const useVoteStore = create<VoteState>()(
  persist(
    (set) => ({
      onboardingCompleted: false,
      email: '',
      walletAddress: '',
      eigenBalance: 0,
      votes: {},
      streakCount: 0,
      bestStreak: 0,
      correctCount: 0,
      totalVotesCast: 0,
      currentIdeaIndex: 0,
      votingComplete: false,

      completeOnboarding: (email, walletAddress) =>
        set({
          onboardingCompleted: true,
          email,
          walletAddress,
          eigenBalance: 1000,
        }),

      castVote: (ideaId, choice, isWinner) =>
        set((s) => {
          const newStreak = isWinner ? s.streakCount + 1 : 0
          return {
            votes: { ...s.votes, [ideaId]: choice },
            totalVotesCast: s.totalVotesCast + 1,
            correctCount: s.correctCount + (isWinner ? 1 : 0),
            streakCount: newStreak,
            bestStreak: Math.max(s.bestStreak, newStreak),
            eigenBalance: s.eigenBalance + (isWinner ? 100 : 0),
          }
        }),

      advanceIdea: () =>
        set((s) => ({ currentIdeaIndex: s.currentIdeaIndex + 1 })),

      markVotingComplete: () => set({ votingComplete: true }),

      reset: () =>
        set({
          eigenBalance: 1000,
          votes: {},
          streakCount: 0,
          bestStreak: 0,
          correctCount: 0,
          totalVotesCast: 0,
          currentIdeaIndex: 0,
          votingComplete: false,
        }),

      fullReset: () =>
        set({
          onboardingCompleted: false,
          email: '',
          walletAddress: '',
          eigenBalance: 0,
          votes: {},
          streakCount: 0,
          bestStreak: 0,
          correctCount: 0,
          totalVotesCast: 0,
          currentIdeaIndex: 0,
          votingComplete: false,
        }),
    }),
    {
      name: 'grove-vote',
      partialize: (state) => {
        // Exclude PII from localStorage — keep only game state
        const { email: _e, walletAddress: _w, ...rest } = state
        return rest
      },
    }
  )
)
