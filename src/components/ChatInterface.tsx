'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGroveStore, Message } from '@/lib/store'
import { DEMO_CONVERSATION, DEMO_ATTRIBUTION, DEMO_TWEET, DEMO_IDEA } from '@/lib/demoData'
import TweetEmbed from './TweetEmbed'

interface Props {
  isDemo?: boolean
}

export default function ChatInterface({ isDemo }: Props) {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [typingId, setTypingId] = useState<string | null>(null)
  const [showTweet, setShowTweet] = useState<string | null>(null)
  const { messages, addMessage, setPhase, setIdea } = useGroveStore()
  const bottomRef = useRef<HTMLDivElement>(null)
  const demoStarted = useRef(false)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, showTweet])

  // Demo auto-play
  useEffect(() => {
    if (!isDemo || demoStarted.current) return
    demoStarted.current = true

    async function runDemo() {
      for (let i = 0; i < DEMO_CONVERSATION.length; i++) {
        const turn = DEMO_CONVERSATION[i]
        const delay = i === 0 ? 800 : 1200

        await new Promise((r) => setTimeout(r, delay))

        if (turn.role === 'user') {
          const msgId = `demo-user-${i}`
          const displayText = turn.text || turn.content
          const hasTweet = turn.content === '__TWEET_EMBED__'

          useGroveStore.setState((s) => ({
            messages: [...s.messages, { id: msgId, role: 'user', content: '' }],
          }))
          setTypingId(msgId)

          // Type the display text
          for (let ci = 0; ci <= displayText.length; ci++) {
            await new Promise((r) => setTimeout(r, 14))
            useGroveStore.setState((s) => ({
              messages: s.messages.map((m) =>
                m.id === msgId ? { ...m, content: displayText.slice(0, ci) } : m
              ),
            }))
          }
          setTypingId(null)

          // Show tweet embed after typing
          if (hasTweet) {
            await new Promise((r) => setTimeout(r, 400))
            setShowTweet(msgId)
            useGroveStore.getState().setIdea(DEMO_IDEA)
            await new Promise((r) => setTimeout(r, 2000))
          }

          if (i === 0 && !hasTweet) {
            useGroveStore.getState().setIdea(displayText)
          }
        } else {
          const msgId = `demo-assistant-${i}`
          useGroveStore.setState((s) => ({
            messages: [...s.messages, { id: msgId, role: 'assistant', content: '' }],
          }))
          setTypingId(msgId)

          for (let ci = 0; ci <= turn.content.length; ci++) {
            await new Promise((r) => setTimeout(r, 14))
            useGroveStore.setState((s) => ({
              messages: s.messages.map((m) =>
                m.id === msgId ? { ...m, content: turn.content.slice(0, ci) } : m
              ),
            }))
          }
          setTypingId(null)
        }
      }

      // Auto-trigger Grow It
      await new Promise((r) => setTimeout(r, 1800))
      useGroveStore.getState().setPhase('spec-gen')
    }

    runDemo()
  }, [isDemo])

  async function send(text?: string) {
    const content = text || input.trim()
    if (!content || isLoading) return

    setInput('')
    useGroveStore.getState().setIdea(content)

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content }
    addMessage(userMsg)
    setIsLoading(true)

    const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }))
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    })

    const assistantId = (Date.now() + 1).toString()
    addMessage({ id: assistantId, role: 'assistant', content: '' })

    const reader = res.body!.getReader()
    const decoder = new TextDecoder()
    let full = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      full += decoder.decode(value)
      useGroveStore.setState((s) => ({
        messages: s.messages.map((m) => (m.id === assistantId ? { ...m, content: full } : m)),
      }))
    }

    setIsLoading(false)
  }

  function handleGrowIt() {
    const lastIdea = messages.find((m) => m.role === 'user')?.content || ''
    useGroveStore.getState().setIdea(lastIdea)
    setPhase('spec-gen')
  }

  const showGrowIt = messages.length >= 2 && !isDemo

  return (
    <div className="flex flex-col h-full">

      {/* Demo attribution banner */}
      <AnimatePresence>
        {isDemo && messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mt-4 px-4 py-3 rounded-xl bg-[#7b8a6e]/20 border border-[#c4a862]/20 flex items-center gap-3"
          >
            <span className="text-2xl">{DEMO_ATTRIBUTION.avatar}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[#e8e6e3]/80 text-xs font-semibold">{DEMO_ATTRIBUTION.name}
                <span className="text-[#e8e6e3]/40 font-normal ml-1">· {DEMO_ATTRIBUTION.title}</span>
              </p>
              <p className="text-[#c4a862]/80 text-xs italic">{DEMO_ATTRIBUTION.note}</p>
            </div>
            <span className="text-[#e8e6e3]/20 text-xs flex-shrink-0">live demo</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && !isDemo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <p className="text-[#c4a862] text-lg font-medium">What would you like to grow?</p>
            <p className="text-[#e8e6e3]/40 text-sm mt-2">Share an idea — any idea. We'll shape it together.</p>
          </motion.div>
        )}

        {messages.length === 0 && isDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-16"
          >
            <p className="text-[#e8e6e3]/20 text-sm">Loading demo...</p>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-[#7b8a6e]/15 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill="#7b8a6e" opacity="0.7" /><circle cx="12" cy="12" r="8" stroke="#7b8a6e" strokeWidth="1" opacity="0.25" /></svg>
                </div>
              )}
              <div className={`flex flex-col ${typingId === msg.id ? 'w-[80%]' : 'max-w-[80%]'}`}>
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed transition-none ${
                    msg.role === 'user'
                      ? 'bg-[#c4a862] text-[#111110] font-medium rounded-br-sm'
                      : 'bg-[#e8e6e3]/8 text-[#e8e6e3]/90 rounded-bl-sm border border-[#e8e6e3]/10'
                  }`}
                >
                  {msg.content || (
                    <span className="flex gap-1 py-1">
                      <span className="w-1.5 h-1.5 bg-[#e8e6e3]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#e8e6e3]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#e8e6e3]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  )}
                  {typingId === msg.id && (
                    <span className="inline-block w-1.5 h-3.5 bg-current ml-0.5 align-middle opacity-70 animate-pulse" />
                  )}
                </div>

                {/* Tweet embed appears below the user's message */}
                {showTweet === msg.id && (
                  <div className="mt-2">
                    <TweetEmbed
                      name={DEMO_TWEET.name}
                      handle={DEMO_TWEET.handle}
                      content={DEMO_TWEET.content}
                      date={DEMO_TWEET.date}
                      likes={DEMO_TWEET.likes}
                      retweets={DEMO_TWEET.retweets}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Grow It CTA (non-demo only) */}
      <AnimatePresence>
        {showGrowIt && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-2"
          >
            <button
              onClick={handleGrowIt}
              className="w-full py-3 rounded-xl bg-[#7b8a6e]/10 border border-[#c4a862]/40 text-[#c4a862] font-semibold text-sm hover:border-[#c4a862] hover:shadow-lg hover:shadow-[#c4a862]/10 transition-all duration-200 flex items-center justify-center gap-2"
            >
              🌱 Grow It
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input (non-demo only) */}
      {!isDemo && (
        <div className="px-4 pb-4 pt-2">
          <div className="flex gap-2 bg-[#e8e6e3]/6 border border-[#e8e6e3]/10 rounded-2xl px-4 py-3 focus-within:border-[#7b8a6e] transition-colors">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Describe your idea..."
              className="flex-1 bg-transparent text-[#e8e6e3] placeholder-[#e8e6e3]/30 text-sm outline-none"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || isLoading}
              className="text-[#c4a862] disabled:opacity-30 hover:opacity-80 transition-opacity text-lg"
            >
              ↑
            </button>
          </div>

          {messages.length === 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {[
                'A marketplace for local farmers',
                'AI tutoring for kids',
                'Carbon credits for SMBs',
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-[#e8e6e3]/10 text-[#e8e6e3]/50 hover:text-[#e8e6e3]/80 hover:border-[#e8e6e3]/20 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
