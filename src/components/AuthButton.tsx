'use client'
import { useAuthStore } from '@/lib/authStore'

export default function AuthButton() {
  const { user, signIn, signOut } = useAuthStore()

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#e8e6e3]/[0.04] border border-[#e8e6e3]/[0.06]">
          <span className="w-5 h-5 rounded-full bg-[#7b8a6e]/20 flex items-center justify-center text-[8px] font-mono text-[#7b8a6e] font-bold">
            {user.name.slice(0, 2).toUpperCase()}
          </span>
          <span className="text-xs text-[#e8e6e3]/50 font-medium max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
        </div>
        <button
          onClick={signOut}
          className="text-[10px] text-[#e8e6e3]/20 hover:text-[#e8e6e3]/50 transition-colors"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={signIn}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e8e6e3]/[0.08] text-[#e8e6e3]/40 hover:text-[#e8e6e3]/70 hover:border-[#e8e6e3]/15 transition-all text-xs"
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      Sign in with X
    </button>
  )
}
