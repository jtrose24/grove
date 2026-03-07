'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SEED_PLANTERS, Planter } from './seedData'

interface AuthState {
  user: Planter | null
  signIn: () => void
  signInAs: (id: string) => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      signIn: () => {
        const planter = SEED_PLANTERS[Math.floor(Math.random() * SEED_PLANTERS.length)]
        set({ user: planter })
      },
      signInAs: (id: string) => {
        const planter = SEED_PLANTERS.find((p) => p.id === id)
        if (planter) set({ user: planter })
      },
      signOut: () => set({ user: null }),
    }),
    { name: 'grove-auth' }
  )
)
