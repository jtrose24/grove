'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatMessage {
  id: string
  role: 'user' | 'arborist'
  content: string
}

const DEMO_SCRIPT = [
  {
    role: 'user' as const,
    content: "The TEE enclave needs to generate keys in-enclave. And make sure the agent can't publish without passing the content safety layer first — no bypass path.",
  },
  {
    role: 'arborist' as const,
    content: "Agreed. I'll add an in-enclave key generation requirement to Phase 2 and wire the content safety layer as a hard dependency for the output renderer in Phase 1. No cartoon reaches any channel without passing the full filter chain. I'll also add attestation logging so every publish decision is cryptographically signed.",
  },
]

const DEMO_RESPONSES = [
  "Done. I've added a resurrection test to Phase 2 — encrypted state snapshot, simulate enclave failure, restore on fresh infrastructure, verify same identity. The agent must pass this before going live.",
  "Noted. I'll cap the English auction at 6-hour cycles and add a minimum bid of 10 USDC to prevent spam. The escrow contract returns funds automatically if the agent rejects a request within 72 hours.",
  "Updated. The futarchy governance module in Phase 4 now requires prediction markets to hit a YES threshold before any policy change ships. Contributors get rewarded if the market was right, penalized if not.",
]

export default function SpecFeedbackChat({ isDemo }: { isDemo?: boolean }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [demoPlayed, setDemoPlayed] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const responseIndex = useRef(0)
  const demoTimers = useRef<ReturnType<typeof setTimeout>[]>([])

  // Auto-play demo conversation when chat opens for the first time
  useEffect(() => {
    if (!open || !isDemo || demoPlayed) return

    setDemoPlayed(true)
    const timers = demoTimers.current

    // Type out Andrew's message character by character
    const userText = DEMO_SCRIPT[0].content
    let charIndex = 0

    const startDelay = setTimeout(() => {
      const typeInterval = setInterval(() => {
        charIndex++
        setInput(userText.slice(0, charIndex))
        if (charIndex >= userText.length) {
          clearInterval(typeInterval)

          // "Send" the message after a brief pause
          const sendDelay = setTimeout(() => {
            setInput('')
            setMessages([{ id: 'demo-u-1', role: 'user', content: userText }])
            setTyping(true)

            // Arborist responds
            const respondDelay = setTimeout(() => {
              setMessages(m => [...m, { id: 'demo-a-1', role: 'arborist', content: DEMO_SCRIPT[1].content }])
              setTyping(false)
            }, 1800)
            timers.push(respondDelay)
          }, 400)
          timers.push(sendDelay)
        }
      }, 30)
      timers.push(typeInterval as unknown as ReturnType<typeof setTimeout>)
    }, 600)
    timers.push(startDelay)

    return () => { timers.forEach(t => clearTimeout(t)) }
  }, [open, isDemo, demoPlayed])

  useEffect(() => {
    if (open && inputRef.current && (!isDemo || demoPlayed)) inputRef.current.focus()
  }, [open, isDemo, demoPlayed])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing, input])

  function handleSend() {
    if (!input.trim()) return
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', content: input.trim() }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setTyping(true)

    // Simulate arborist response
    const delay = 1200 + Math.random() * 800
    setTimeout(() => {
      const response = isDemo
        ? DEMO_RESPONSES[responseIndex.current % DEMO_RESPONSES.length]
        : "I'll incorporate that feedback into the spec. Give me a moment to adjust the phases and work items accordingly."
      responseIndex.current++
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: 'arborist', content: response }])
      setTyping(false)
    }, delay)
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className={`fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${
          open ? 'bg-[#e8e6e3]/10 border border-[#e8e6e3]/15' : 'bg-[#c4a862] hover:bg-[#d4b872]'
        }`}
      >
        {open ? (
          <svg className="w-5 h-5 text-[#e8e6e3]/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-[#111110]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {!open && messages.length === 0 && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#7b8a6e] rounded-full animate-pulse" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-5 z-40 w-80 max-h-[420px] flex flex-col rounded-2xl bg-[#1a1a19] border border-[#e8e6e3]/10 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#e8e6e3]/8 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#7b8a6e]/20 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#7b8a6e]" />
              </div>
              <div>
                <p className="text-[#e8e6e3]/80 text-xs font-semibold">Arborist</p>
                <p className="text-[#e8e6e3]/25 text-[10px] font-mono">Spec feedback & revisions</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[200px]">
              {messages.length === 0 && !typing && (
                <div className="text-center py-8">
                  <p className="text-[#e8e6e3]/20 text-xs mb-1">Chat with the Arborist</p>
                  <p className="text-[#e8e6e3]/10 text-[10px]">Request changes to the spec, ask questions, or give feedback</p>
                </div>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#c4a862]/15 text-[#e8e6e3]/80 rounded-br-sm'
                      : 'bg-[#e8e6e3]/[0.06] text-[#e8e6e3]/60 rounded-bl-sm border border-[#e8e6e3]/5'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-[#e8e6e3]/[0.06] rounded-xl rounded-bl-sm border border-[#e8e6e3]/5 px-3 py-2 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#7b8a6e] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#7b8a6e] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#7b8a6e] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-[#e8e6e3]/8">
              <form onSubmit={(e) => { e.preventDefault(); handleSend() }} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Give feedback on the spec..."
                  disabled={typing}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#e8e6e3]/[0.05] border border-[#e8e6e3]/8 text-[#e8e6e3] text-xs placeholder:text-[#e8e6e3]/15 focus:outline-none focus:border-[#c4a862]/30 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  className="w-8 h-8 rounded-lg bg-[#c4a862]/15 flex items-center justify-center text-[#c4a862] hover:bg-[#c4a862]/25 transition-colors disabled:opacity-20"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
