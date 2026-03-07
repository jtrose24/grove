'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Role = 'planter' | 'builder' | 'investor' | null
type Stage = 'select' | 'form' | 'done'

const ROLES = [
  {
    id: 'planter' as const,
    label: 'Submit Ideas',
    subtitle: 'Planter',
    desc: 'You have ideas for companies. Plant them and let the Grove bring them to life.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="14" r="2.5" fill="#c4a862" opacity="0.7" />
        <path d="M10 11V5" stroke="#c4a862" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M10 5L7 2" stroke="#c4a862" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <path d="M10 5L13 2" stroke="#c4a862" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
    fields: ['name', 'email', 'twitter'] as string[],
    placeholder: 'Briefly describe the kind of ideas you want to plant...',
  },
  {
    id: 'builder' as const,
    label: 'Work on Ideas',
    subtitle: 'Builder',
    desc: 'You build things. Compete in auctions and get paid to bring ideas to life.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="4" y="5" width="12" height="2.5" rx="0.5" fill="#7b8a6e" opacity="0.6" />
        <rect x="4" y="9" width="9" height="2.5" rx="0.5" fill="#7b8a6e" opacity="0.4" />
        <rect x="4" y="13" width="6" height="2.5" rx="0.5" fill="#7b8a6e" opacity="0.25" />
      </svg>
    ),
    fields: ['name', 'email', 'github'] as string[],
    placeholder: 'What do you build? (e.g., full-stack apps, smart contracts, ML pipelines...)',
  },
  {
    id: 'investor' as const,
    label: 'Invest in Ideas',
    subtitle: 'Investor',
    desc: 'Stake EIGEN, vote on proposals, and earn rewards for backing the right builders.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <polygon points="10,2 18,10 10,18 2,10" stroke="#c4a862" strokeWidth="1" fill="#c4a862" fillOpacity="0.15" />
        <polygon points="10,5 15,10 10,15 5,10" stroke="#c4a862" strokeWidth="0.8" fill="#c4a862" fillOpacity="0.1" />
      </svg>
    ),
    fields: ['name', 'email'] as string[],
    placeholder: 'How much EIGEN are you looking to stake?',
  },
]

export default function WaitlistSignup() {
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState<Role>(null)
  const [stage, setStage] = useState<Stage>('select')
  const [formData, setFormData] = useState({ name: '', email: '', twitter: '', github: '', note: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStage('done')
  }

  function handleClose() {
    setOpen(false)
    setTimeout(() => {
      setRole(null)
      setStage('select')
      setFormData({ name: '', email: '', twitter: '', github: '', note: '' })
    }, 300)
  }

  const activeRole = ROLES.find((r) => r.id === role)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c4a862]/10 border border-[#c4a862]/20 text-[#c4a862] hover:bg-[#c4a862]/15 hover:border-[#c4a862]/30 transition-all text-sm font-medium"
      >
        <span className="w-1.5 h-1.5 bg-[#c4a862] rounded-full animate-pulse" />
        Join Waitlist
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 z-50 w-[360px] rounded-2xl bg-[#1a1a19] border border-[#e8e6e3]/10 shadow-2xl overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {/* Role selection */}
                {stage === 'select' && (
                  <motion.div
                    key="select"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-4"
                  >
                    <p className="text-[#e8e6e3]/80 text-sm font-semibold mb-1">Join the Grove</p>
                    <p className="text-[#e8e6e3]/25 text-[10px] font-mono mb-4">Alpha access is invite-only. Get on the waitlist.</p>

                    <div className="space-y-2">
                      {ROLES.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => { setRole(r.id); setStage('form') }}
                          className="w-full flex items-start gap-3 p-3 rounded-xl border border-[#e8e6e3]/8 hover:border-[#c4a862]/25 hover:bg-[#e8e6e3]/[0.03] transition-all text-left group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-[#e8e6e3]/[0.04] border border-[#e8e6e3]/8 flex items-center justify-center flex-shrink-0 group-hover:border-[#c4a862]/20">
                            {r.icon}
                          </div>
                          <div>
                            <p className="text-[#e8e6e3]/80 text-xs font-semibold">{r.label}</p>
                            <p className="text-[#e8e6e3]/30 text-[10px] leading-relaxed mt-0.5">{r.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Form */}
                {stage === 'form' && activeRole && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-4"
                  >
                    <button onClick={() => { setStage('select'); setRole(null) }} className="text-[#e8e6e3]/20 text-[10px] font-mono hover:text-[#e8e6e3]/40 transition-colors mb-3 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
                      Back
                    </button>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-[#e8e6e3]/[0.04] border border-[#e8e6e3]/8 flex items-center justify-center">
                        {activeRole.icon}
                      </div>
                      <div>
                        <p className="text-[#e8e6e3]/80 text-xs font-semibold">{activeRole.subtitle} Waitlist</p>
                        <p className="text-[#e8e6e3]/25 text-[10px] font-mono">{activeRole.label}</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Name"
                        required
                        className="w-full px-3 py-2.5 rounded-lg bg-[#e8e6e3]/[0.05] border border-[#e8e6e3]/8 text-[#e8e6e3] text-xs placeholder:text-[#e8e6e3]/15 focus:outline-none focus:border-[#c4a862]/30 transition-colors"
                      />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email"
                        required
                        className="w-full px-3 py-2.5 rounded-lg bg-[#e8e6e3]/[0.05] border border-[#e8e6e3]/8 text-[#e8e6e3] text-xs placeholder:text-[#e8e6e3]/15 focus:outline-none focus:border-[#c4a862]/30 transition-colors"
                      />
                      {activeRole.fields.includes('twitter') && (
                        <input
                          type="text"
                          value={formData.twitter}
                          onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                          placeholder="@twitter handle"
                          className="w-full px-3 py-2.5 rounded-lg bg-[#e8e6e3]/[0.05] border border-[#e8e6e3]/8 text-[#e8e6e3] text-xs placeholder:text-[#e8e6e3]/15 focus:outline-none focus:border-[#c4a862]/30 transition-colors"
                        />
                      )}
                      {activeRole.fields.includes('github') && (
                        <input
                          type="text"
                          value={formData.github}
                          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                          placeholder="GitHub username"
                          className="w-full px-3 py-2.5 rounded-lg bg-[#e8e6e3]/[0.05] border border-[#e8e6e3]/8 text-[#e8e6e3] text-xs placeholder:text-[#e8e6e3]/15 focus:outline-none focus:border-[#c4a862]/30 transition-colors"
                        />
                      )}
                      <textarea
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        placeholder={activeRole.placeholder}
                        rows={2}
                        className="w-full px-3 py-2.5 rounded-lg bg-[#e8e6e3]/[0.05] border border-[#e8e6e3]/8 text-[#e8e6e3] text-xs placeholder:text-[#e8e6e3]/15 focus:outline-none focus:border-[#c4a862]/30 transition-colors resize-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg bg-[#c4a862] hover:bg-[#d4b872] text-[#111110] font-bold text-xs transition-colors"
                      >
                        Join Waitlist
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* Success */}
                {stage === 'done' && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="w-12 h-12 rounded-full bg-[#7b8a6e]/20 flex items-center justify-center mx-auto mb-3"
                    >
                      <svg className="w-5 h-5 text-[#8a9a7b]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    <p className="text-[#e8e6e3]/80 text-sm font-semibold mb-1">You&apos;re on the list</p>
                    <p className="text-[#e8e6e3]/30 text-[10px] font-mono mb-4">We&apos;ll reach out when we&apos;re ready for you.</p>
                    <button
                      onClick={handleClose}
                      className="text-[#c4a862]/60 text-xs hover:text-[#c4a862] transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
