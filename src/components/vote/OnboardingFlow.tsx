'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useVoteStore } from '@/lib/voteStore'

function generateWalletAddress(): string {
  const chars = '0123456789abcdef'
  let addr = '0x'
  for (let i = 0; i < 40; i++) addr += chars[Math.floor(Math.random() * 16)]
  return addr
}

function EmailStep({ onNext }: { onNext: (email: string) => void }) {
  const [email, setEmail] = useState('')

  return (
    <motion.div
      key="email"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-sm mx-auto"
    >
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-full bg-[#c4a862]/15 flex items-center justify-center mx-auto mb-4">
          <svg className="w-5 h-5 text-[#c4a862]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[#e8e6e3]/90 mb-2">Create your account</h2>
        <p className="text-[#e8e6e3]/40 text-sm">Sign up to start voting on builder proposals and earn EIGEN</p>
      </div>

      <div className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-xl bg-[#e8e6e3]/[0.05] border border-[#e8e6e3]/10 text-[#e8e6e3] text-sm placeholder:text-[#e8e6e3]/20 focus:outline-none focus:border-[#c4a862]/40 transition-colors"
          autoFocus
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => email.includes('@') && onNext(email)}
          disabled={!email.includes('@')}
          className="w-full py-3 rounded-xl bg-[#c4a862] hover:bg-[#d4b872] text-[#111110] font-bold text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Create Account
        </motion.button>
      </div>

      <p className="text-[#e8e6e3]/15 text-[10px] text-center mt-4 font-mono">
        Powered by Privy — no seed phrases, no extensions
      </p>
    </motion.div>
  )
}

function WalletStep({ address, onNext }: { address: string; onNext: () => void }) {
  return (
    <motion.div
      key="wallet"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-sm mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
          className="w-12 h-12 rounded-full bg-[#7b8a6e]/20 flex items-center justify-center mx-auto mb-4"
        >
          <svg className="w-5 h-5 text-[#8a9a7b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <h2 className="text-xl font-bold text-[#e8e6e3]/90 mb-2">Wallet created</h2>
        <p className="text-[#e8e6e3]/40 text-sm">Your self-custodial wallet is ready</p>
      </div>

      <div className="bg-black/30 rounded-xl border border-[#e8e6e3]/8 p-4 mb-6">
        <p className="text-[#e8e6e3]/25 text-[10px] font-mono uppercase tracking-wider mb-2">Your wallet address</p>
        <p className="text-[#c4a862] text-xs font-mono break-all leading-relaxed">{address}</p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full py-3 rounded-xl bg-[#c4a862] hover:bg-[#d4b872] text-[#111110] font-bold text-sm transition-colors"
      >
        Continue
      </motion.button>
    </motion.div>
  )
}

function StakeStep({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<'form' | 'processing' | 'done'>('form')

  function handleBuy() {
    setStage('processing')
    setTimeout(() => setStage('done'), 1800)
  }

  return (
    <motion.div
      key="stake"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-sm mx-auto"
    >
      <AnimatePresence mode="wait">
        {stage === 'form' && (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-full bg-[#c4a862]/15 flex items-center justify-center mx-auto mb-4">
                <svg className="w-5 h-5 text-[#c4a862]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#e8e6e3]/90 mb-2">Buy & Stake EIGEN</h2>
              <p className="text-[#e8e6e3]/40 text-sm">Purchase 1,000 EIGEN to start voting on proposals</p>
            </div>

            <div className="space-y-3 mb-6">
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                className="w-full px-4 py-3 rounded-xl bg-[#e8e6e3]/[0.05] border border-[#e8e6e3]/10 text-[#e8e6e3] text-sm placeholder:text-[#e8e6e3]/20 focus:outline-none focus:border-[#c4a862]/40 transition-colors font-mono"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#e8e6e3]/[0.05] border border-[#e8e6e3]/10 text-[#e8e6e3] text-sm placeholder:text-[#e8e6e3]/20 focus:outline-none focus:border-[#c4a862]/40 transition-colors font-mono"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="w-24 px-4 py-3 rounded-xl bg-[#e8e6e3]/[0.05] border border-[#e8e6e3]/10 text-[#e8e6e3] text-sm placeholder:text-[#e8e6e3]/20 focus:outline-none focus:border-[#c4a862]/40 transition-colors font-mono"
                />
              </div>
            </div>

            <div className="bg-[#e8e6e3]/[0.03] rounded-xl border border-[#e8e6e3]/8 p-3 mb-6 flex items-center justify-between">
              <span className="text-[#e8e6e3]/40 text-xs">1,000 EIGEN</span>
              <span className="text-[#e8e6e3]/70 text-sm font-bold font-mono">$3.20</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBuy}
              className="w-full py-3 rounded-xl bg-[#c4a862] hover:bg-[#d4b872] text-[#111110] font-bold text-sm transition-colors"
            >
              Buy & Stake EIGEN
            </motion.button>
          </motion.div>
        )}

        {stage === 'processing' && (
          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-12">
            <div className="w-12 h-12 rounded-full border-2 border-[#c4a862]/30 border-t-[#c4a862] animate-spin mx-auto mb-4" />
            <p className="text-[#e8e6e3]/50 text-sm">Processing purchase...</p>
          </motion.div>
        )}

        {stage === 'done' && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-16 h-16 rounded-full bg-[#7b8a6e]/20 flex items-center justify-center mx-auto mb-4"
              >
                <svg className="w-7 h-7 text-[#8a9a7b]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
              <h2 className="text-xl font-bold text-[#e8e6e3]/90 mb-2">1,000 EIGEN Staked</h2>
              <p className="text-[#e8e6e3]/40 text-sm">You&apos;re ready to vote on builder proposals and earn rewards</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onComplete}
              className="w-full py-3 rounded-xl bg-[#c4a862] hover:bg-[#d4b872] text-[#111110] font-bold text-sm transition-colors"
            >
              Start Voting
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function OnboardingFlow() {
  const { completeOnboarding } = useVoteStore()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [walletAddress] = useState(generateWalletAddress)

  function handleEmailDone(e: string) {
    setEmail(e)
    setStep(2)
  }

  function handleStakeComplete() {
    completeOnboarding(email, walletAddress)
  }

  return (
    <div className="min-h-screen bg-[#111110] flex flex-col">
      {/* Progress */}
      <div className="px-6 pt-8 pb-4">
        <div className="max-w-sm mx-auto flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                s <= step ? 'bg-[#c4a862]' : 'bg-[#e8e6e3]/10'
              }`} />
            </div>
          ))}
        </div>
        <div className="max-w-sm mx-auto flex justify-between mt-2">
          <span className={`text-[10px] font-mono ${step >= 1 ? 'text-[#c4a862]/60' : 'text-[#e8e6e3]/15'}`}>Account</span>
          <span className={`text-[10px] font-mono ${step >= 2 ? 'text-[#c4a862]/60' : 'text-[#e8e6e3]/15'}`}>Wallet</span>
          <span className={`text-[10px] font-mono ${step >= 3 ? 'text-[#c4a862]/60' : 'text-[#e8e6e3]/15'}`}>Stake</span>
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 flex items-center px-6">
        <AnimatePresence mode="wait">
          {step === 1 && <EmailStep onNext={handleEmailDone} />}
          {step === 2 && <WalletStep address={walletAddress} onNext={() => setStep(3)} />}
          {step === 3 && <StakeStep onComplete={handleStakeComplete} />}
        </AnimatePresence>
      </div>
    </div>
  )
}
