'use client'
import { useAuthStore } from '@/lib/authStore'

export default function AuthButton() {
  const { user, signIn, signOut } = useAuthStore()

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 border border-white/8">
          <span className="text-sm">{user.avatar}</span>
          <span className="text-xs text-white/70 font-medium max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
        </div>
        <button
          onClick={signOut}
          className="text-[10px] text-white/30 hover:text-white/60 transition-colors"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={signIn}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all text-xs"
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      Sign in with X
    </button>
  )
}
