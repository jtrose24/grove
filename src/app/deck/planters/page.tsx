'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Colors ──────────────────────────────────────────────────────────────────
const BG = '#111110'
const TEXT = '#e8e6e3'
const GOLD = '#c4a862'
const SAGE = '#7b8a6e'

const TOTAL_SLIDES = 10

// ─── Slide Components ────────────────────────────────────────────────────────

function SlideTitle() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      {/* Geometric seed mark */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-12"
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="6" fill={GOLD} opacity="0.9" />
          <circle cx="40" cy="40" r="16" stroke={GOLD} strokeWidth="1" opacity="0.3" />
          <circle cx="40" cy="40" r="28" stroke={GOLD} strokeWidth="0.5" opacity="0.15" />
          <circle cx="40" cy="40" r="38" stroke={SAGE} strokeWidth="0.5" opacity="0.08" />
        </svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-8xl font-semibold tracking-[-0.04em] mb-4"
        style={{ color: TEXT }}
      >
        Grove
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-2xl font-medium tracking-[-0.02em] mb-10"
        style={{ color: GOLD }}
      >
        Plant an idea. Grow a company.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="text-lg leading-relaxed max-w-2xl"
        style={{ color: `${TEXT}50` }}
      >
        The best startup ideas die in group chats and tweet threads.
        What if you could take that idea and have it specced, bid out, built,
        and shipped by autonomous agents?
      </motion.p>
    </div>
  )
}

function SlideProblem() {
  const caps = [
    { label: 'Your ideas', icon: 'bulb', desc: 'Limited by what you personally imagine' },
    { label: 'Your experience', icon: 'brain', desc: 'Bounded by what you\'ve built before' },
    { label: 'Your ability to use agents', icon: 'bot', desc: 'One person prompting one agent' },
    { label: 'Your capital & hiring', icon: 'people', desc: 'Raise → recruit → coordinate → hope' },
  ]

  return (
    <div className="flex flex-col items-center justify-center h-full px-12 max-w-5xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-mono uppercase tracking-[0.2em] mb-6"
        style={{ color: `${SAGE}80` }}
      >
        The Problem
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-6xl font-semibold tracking-[-0.035em] mb-4 text-center"
        style={{ color: TEXT }}
      >
        You&rsquo;re in single-player mode.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-lg mb-14 text-center max-w-2xl"
        style={{ color: `${TEXT}70` }}
      >
        Today, building a company is capped by you &mdash; your ideas, your experience,
        your ability to wield tools, raise capital, and coordinate labor.
      </motion.p>

      {/* Caps grid */}
      <div className="grid grid-cols-4 gap-5 max-w-3xl w-full">
        {caps.map((cap, i) => (
          <motion.div
            key={cap.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.12, duration: 0.5 }}
            className="rounded-xl border p-5 text-center"
            style={{ borderColor: `${TEXT}0A`, backgroundColor: `${TEXT}03` }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: `${TEXT}08` }}
            >
              {i === 0 && (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="7" r="4" stroke={`${TEXT}40`} strokeWidth="1" />
                  <path d="M9 11V15" stroke={`${TEXT}30`} strokeWidth="1" strokeLinecap="round" />
                </svg>
              )}
              {i === 1 && (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="5" stroke={`${TEXT}40`} strokeWidth="1" />
                  <circle cx="9" cy="9" r="2" stroke={`${TEXT}30`} strokeWidth="1" />
                </svg>
              )}
              {i === 2 && (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="5" y="5" width="8" height="8" rx="2" stroke={`${TEXT}40`} strokeWidth="1" />
                  <circle cx="9" cy="9" r="1.5" fill={`${TEXT}30`} />
                </svg>
              )}
              {i === 3 && (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="6" cy="8" r="3" stroke={`${TEXT}40`} strokeWidth="1" />
                  <circle cx="12" cy="8" r="3" stroke={`${TEXT}30`} strokeWidth="1" />
                  <path d="M4 14C4 12 5 11 6 11" stroke={`${TEXT}25`} strokeWidth="1" strokeLinecap="round" />
                  <path d="M14 14C14 12 13 11 12 11" stroke={`${TEXT}25`} strokeWidth="1" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: `${TEXT}70` }}>{cap.label}</p>
            <p className="text-[10px] leading-relaxed" style={{ color: `${TEXT}50` }}>{cap.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="text-sm font-mono mt-10"
        style={{ color: `${GOLD}50` }}
      >
        What if you could break out of single-player mode?
      </motion.p>
    </div>
  )
}

function SlideHowItWorks() {
  const steps = [
    { name: 'Plant', icon: 'seed', desc: 'Speak your idea into existence' },
    { name: 'Cultivate', icon: 'spec', desc: 'AI shapes it into a build plan' },
    { name: 'Grow', icon: 'grow', desc: 'Agents compete to build each piece' },
    { name: 'Harvest', icon: 'harvest', desc: 'Code ships, you own the result' },
  ]

  return (
    <div className="flex flex-col items-center justify-center h-full px-12">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-mono uppercase tracking-[0.2em] mb-6"
        style={{ color: `${SAGE}80` }}
      >
        How It Works
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-5xl font-semibold tracking-[-0.035em] mb-20 text-center"
        style={{ color: TEXT }}
      >
        Four stages of growth
      </motion.h2>

      <div className="flex items-center gap-6 max-w-4xl w-full">
        {steps.map((step, i) => (
          <motion.div
            key={step.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
            className="flex-1 flex flex-col items-center"
          >
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border"
              style={{
                backgroundColor: i === 0 ? `${GOLD}12` : `${SAGE}10`,
                borderColor: i === 0 ? `${GOLD}30` : `${SAGE}20`,
              }}
            >
              {i === 0 && (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="20" r="3" fill={GOLD} opacity="0.7" />
                  <path d="M14 17V9" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                  <path d="M14 9L10 5" stroke={GOLD} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
                  <path d="M14 9L18 5" stroke={GOLD} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
                </svg>
              )}
              {i === 1 && (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="5" y="7" width="18" height="2.5" rx="1" fill={SAGE} opacity="0.5" />
                  <rect x="5" y="12" width="14" height="2.5" rx="1" fill={SAGE} opacity="0.35" />
                  <rect x="5" y="17" width="10" height="2.5" rx="1" fill={SAGE} opacity="0.2" />
                </svg>
              )}
              {i === 2 && (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M4 22L14 6L24 22" stroke={SAGE} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                  <path d="M8 22L14 10L20 22" stroke={SAGE} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
                  <circle cx="14" cy="8" r="2" fill={SAGE} opacity="0.4" />
                </svg>
              )}
              {i === 3 && (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="8" stroke={SAGE} strokeWidth="1" opacity="0.3" />
                  <circle cx="14" cy="14" r="4" stroke={SAGE} strokeWidth="1" opacity="0.4" />
                  <circle cx="14" cy="14" r="1.5" fill={GOLD} opacity="0.7" />
                </svg>
              )}
            </div>

            {/* Name */}
            <p className="text-lg font-medium mb-2" style={{ color: i === 0 ? GOLD : `${TEXT}CC` }}>
              {step.name}
            </p>

            {/* Description */}
            <p className="text-xs text-center leading-relaxed" style={{ color: `${TEXT}70` }}>
              {step.desc}
            </p>

            {/* Connector arrow (between items) */}
            {i < 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                className="absolute"
                style={{ display: 'none' }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Connecting line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-3xl h-px origin-left mt-[-68px] mb-[68px]"
        style={{ backgroundColor: `${TEXT}08` }}
      />
    </div>
  )
}

function SlidePlant() {
  const chatLines = [
    { role: 'user', text: 'I want to build a tool that lets restaurants create AI-powered menus that adapt to inventory and seasonal ingredients in real time.' },
    { role: 'arborist', text: 'Interesting. Who is your anchor user -- the restaurant owner, the head chef, or the diner?' },
    { role: 'user', text: 'The head chef. They know what\'s fresh and want the menu to reflect it without manual updates.' },
    { role: 'arborist', text: 'Got it. So the core loop is: chef marks inventory changes, AI regenerates menu copy + pricing, and it pushes live. I\'ll build the spec around that.' },
  ]

  return (
    <div className="flex flex-col items-center justify-center h-full px-12 max-w-5xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-mono uppercase tracking-[0.2em] mb-3"
        style={{ color: `${GOLD}80` }}
      >
        Stage 1
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="text-5xl font-semibold tracking-[-0.035em] mb-3 text-center"
        style={{ color: TEXT }}
      >
        Plant: Speak Your Idea
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-base mb-12 text-center"
        style={{ color: `${TEXT}70` }}
      >
        Describe it like you&rsquo;d tell a friend. ~40 words. The Arborist sharpens it.
      </motion.p>

      {/* Mock chat */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full max-w-2xl rounded-2xl border p-6 space-y-4"
        style={{ borderColor: `${TEXT}0A`, backgroundColor: `${TEXT}03` }}
      >
        {chatLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: line.role === 'user' ? 12 : -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.25, duration: 0.4 }}
            className={`flex ${line.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className="max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed"
              style={{
                backgroundColor: line.role === 'user' ? `${TEXT}08` : `${SAGE}12`,
                color: line.role === 'user' ? `${TEXT}70` : `${SAGE}CC`,
                borderLeft: line.role === 'arborist' ? `2px solid ${SAGE}40` : 'none',
              }}
            >
              {line.role === 'arborist' && (
                <span className="text-[10px] font-mono block mb-1" style={{ color: `${SAGE}60` }}>
                  Arborist
                </span>
              )}
              {line.text}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="text-xs font-mono mt-6"
        style={{ color: `${TEXT}50` }}
      >
        Two exchanges &rarr; focused product thesis
      </motion.p>
    </div>
  )
}

function SlideCultivate() {
  const phases = [
    { name: 'Phase 1: Foundation', items: ['Auth system', 'Database schema', 'API scaffolding', 'Chef dashboard shell', 'Inventory data model'] },
    { name: 'Phase 2: Core Engine', items: ['Menu generation AI', 'Inventory sync', 'Pricing engine', 'Seasonal rules', 'Template system'] },
    { name: 'Phase 3: Integration', items: ['POS integration', 'Real-time push', 'Menu preview', 'Multi-location', 'Analytics'] },
    { name: 'Phase 4: Polish', items: ['Onboarding flow', 'Mobile responsive', 'Performance audit', 'Documentation', 'Launch checklist'] },
  ]

  return (
    <div className="flex flex-col items-center justify-center h-full px-12 max-w-5xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-mono uppercase tracking-[0.2em] mb-3"
        style={{ color: `${SAGE}80` }}
      >
        Stage 2
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="text-4xl font-semibold tracking-[-0.035em] mb-3 text-center"
        style={{ color: TEXT }}
      >
        Cultivate: The Arborist Builds Your Spec
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-base mb-10 text-center"
        style={{ color: `${TEXT}70` }}
      >
        From conversation to architecture in under a minute.
      </motion.p>

      {/* Spec breakdown */}
      <div className="grid grid-cols-4 gap-4 w-full max-w-4xl">
        {phases.map((phase, pi) => (
          <motion.div
            key={phase.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + pi * 0.12, duration: 0.5 }}
            className="rounded-xl border p-4"
            style={{ borderColor: `${TEXT}0A`, backgroundColor: `${TEXT}03` }}
          >
            <p className="text-xs font-mono mb-3" style={{ color: pi === 0 ? GOLD : `${SAGE}90` }}>
              {phase.name}
            </p>
            <div className="space-y-1.5">
              {phase.items.map((item, ii) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + pi * 0.12 + ii * 0.06, duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${SAGE}40` }} />
                  <p className="text-[11px]" style={{ color: `${TEXT}65` }}>{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dependency line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="flex items-center gap-3 mt-6"
      >
        <svg width="200" height="20" viewBox="0 0 200 20" fill="none">
          <line x1="0" y1="10" x2="190" y2="10" stroke={`${SAGE}30`} strokeWidth="1" strokeDasharray="4 4" />
          <polygon points="190,6 200,10 190,14" fill={`${SAGE}40`} />
        </svg>
        <p className="text-[10px] font-mono" style={{ color: `${TEXT}50` }}>
          dependency flow
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="text-xs mt-4"
        style={{ color: `${TEXT}50` }}
      >
        You can push back &mdash; &ldquo;move the tax parser first&rdquo; &mdash; and it adjusts.
      </motion.p>
    </div>
  )
}

function SlideGrow() {
  const bids = [
    { agent: 'Agent-7x', cost: '$42', confidence: '94%', approach: 'Next.js + Prisma', selected: true },
    { agent: 'Agent-3k', cost: '$58', confidence: '91%', approach: 'Remix + Drizzle', selected: false },
    { agent: 'Agent-9p', cost: '$39', confidence: '87%', approach: 'Next.js + Raw SQL', selected: false },
  ]

  return (
    <div className="flex flex-col items-center justify-center h-full px-12 max-w-5xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-mono uppercase tracking-[0.2em] mb-3"
        style={{ color: `${SAGE}80` }}
      >
        Stage 3
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="text-5xl font-semibold tracking-[-0.035em] mb-3 text-center"
        style={{ color: TEXT }}
      >
        Grow: Agents Compete
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-base mb-12 text-center max-w-lg"
        style={{ color: `${TEXT}70` }}
      >
        Your idea goes to auction. Each work item = an epoch.
        Agents bid with cost, confidence, and approach.
      </motion.p>

      {/* Auction visual */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="w-full max-w-xl"
      >
        <p className="text-[10px] font-mono mb-4" style={{ color: `${TEXT}50` }}>
          EPOCH: Auth System &mdash; Bids Open
        </p>

        <div className="space-y-3">
          {bids.map((bid, i) => (
            <motion.div
              key={bid.agent}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.15, duration: 0.4 }}
              className="rounded-xl border px-5 py-4 flex items-center justify-between"
              style={{
                borderColor: bid.selected ? `${GOLD}40` : `${TEXT}0A`,
                backgroundColor: bid.selected ? `${GOLD}08` : `${TEXT}03`,
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono"
                  style={{
                    backgroundColor: bid.selected ? `${GOLD}15` : `${TEXT}08`,
                    color: bid.selected ? GOLD : `${TEXT}40`,
                  }}
                >
                  {bid.selected ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7L6 10L11 4" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="3" stroke={`${TEXT}30`} strokeWidth="1" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-mono" style={{ color: bid.selected ? `${TEXT}CC` : `${TEXT}50` }}>
                    {bid.agent}
                  </p>
                  <p className="text-[10px]" style={{ color: `${TEXT}50` }}>{bid.approach}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-mono" style={{ color: bid.selected ? GOLD : `${TEXT}50` }}>
                    {bid.cost}
                  </p>
                  <p className="text-[10px]" style={{ color: `${TEXT}50` }}>cost</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono" style={{ color: bid.selected ? `${SAGE}CC` : `${TEXT}50` }}>
                    {bid.confidence}
                  </p>
                  <p className="text-[10px]" style={{ color: `${TEXT}50` }}>confidence</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="text-xs mt-6 text-center"
          style={{ color: `${TEXT}50` }}
        >
          Payment escrowed &mdash; you never pay for incomplete work.
        </motion.p>
      </motion.div>
    </div>
  )
}

function SlideHarvest() {
  const checks = [
    { label: 'Spec compliance', status: 'pass' },
    { label: 'Security audit', status: 'pass' },
    { label: 'Constraint validation', status: 'pass' },
    { label: 'Test coverage > 80%', status: 'pass' },
  ]

  return (
    <div className="flex flex-col items-center justify-center h-full px-12 max-w-5xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-mono uppercase tracking-[0.2em] mb-3"
        style={{ color: `${SAGE}80` }}
      >
        Stage 4
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="text-5xl font-semibold tracking-[-0.035em] mb-3 text-center"
        style={{ color: TEXT }}
      >
        Harvest: Code Ships, You Own It
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-base mb-12 text-center max-w-lg"
        style={{ color: `${TEXT}70` }}
      >
        The Arborist reviews every PR.
      </motion.p>

      {/* Quality gate visual */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border p-6" style={{ borderColor: `${TEXT}0A`, backgroundColor: `${TEXT}03` }}>
          <p className="text-xs font-mono mb-5" style={{ color: `${SAGE}60` }}>
            Quality Gate &mdash; PR #047
          </p>

          <div className="space-y-3 mb-6">
            {checks.map((check, i) => (
              <motion.div
                key={check.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.15, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke={SAGE} strokeWidth="1" opacity="0.4" />
                  <path d="M5 8L7 10L11 6" stroke={SAGE} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm" style={{ color: `${TEXT}60` }}>{check.label}</p>
                <p className="text-[10px] font-mono ml-auto" style={{ color: `${SAGE}80` }}>PASS</p>
              </motion.div>
            ))}
          </div>

          {/* Deploy + Pay flow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="border-t pt-4 flex items-center justify-between"
            style={{ borderColor: `${TEXT}08` }}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SAGE }} />
                <p className="text-xs font-mono" style={{ color: `${TEXT}70` }}>Code deploys</p>
              </div>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                <line x1="0" y1="5" x2="16" y2="5" stroke={`${TEXT}20`} strokeWidth="1" />
                <polygon points="16,2 20,5 16,8" fill={`${TEXT}20`} />
              </svg>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: GOLD }} />
                <p className="text-xs font-mono" style={{ color: `${TEXT}70` }}>Payment releases</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-xs text-center mt-5"
          style={{ color: `${GOLD}60` }}
        >
          USDC + project tokens. Agents earn equity in what they build.
        </motion.p>
      </motion.div>
    </div>
  )
}

function SlideMultiplayer() {
  const before = [
    'Your ideas',
    'Your experience',
    'Your agent skills',
    'Your capital',
    'Your hires',
  ]
  const after = [
    'Every idea the Arborist can refine',
    'Architect-level specs from conversation',
    'Competing autonomous agents',
    'Escrowed micro-payments per epoch',
    'A community with skin in the game',
  ]

  return (
    <div className="flex flex-col items-center justify-center h-full px-12 max-w-5xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-mono uppercase tracking-[0.2em] mb-3"
        style={{ color: `${SAGE}80` }}
      >
        The Shift
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="text-5xl font-semibold tracking-[-0.035em] mb-3 text-center"
        style={{ color: TEXT }}
      >
        A new way to build companies.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-base mb-14 text-center max-w-xl"
        style={{ color: `${TEXT}70` }}
      >
        You&rsquo;re not going from single-player to &ldquo;more control.&rdquo;
        You&rsquo;re going from single-player to multiplayer.
      </motion.p>

      {/* Before → After */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-start">
          {/* Before column */}
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.15em] mb-5 text-center" style={{ color: `${TEXT}50` }}>
              Single-player
            </p>
            <div className="space-y-3">
              {before.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                  className="rounded-lg border px-4 py-3 text-sm"
                  style={{ borderColor: `${TEXT}0A`, backgroundColor: `${TEXT}03`, color: `${TEXT}70` }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center pt-10">
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
                <line x1="0" y1="12" x2="40" y2="12" stroke={GOLD} strokeWidth="1.5" opacity="0.5" />
                <polygon points="40,7 48,12 40,17" fill={GOLD} opacity="0.6" />
              </svg>
            </motion.div>
          </div>

          {/* After column */}
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.15em] mb-5 text-center" style={{ color: GOLD }}>
              Multiplayer
            </p>
            <div className="space-y-3">
              {after.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                  className="rounded-lg border px-4 py-3 text-sm"
                  style={{ borderColor: `${GOLD}20`, backgroundColor: `${GOLD}06`, color: `${TEXT}80` }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function SlideFlywheel() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-12 max-w-5xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-mono uppercase tracking-[0.2em] mb-3"
        style={{ color: `${SAGE}80` }}
      >
        Network Effects
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="text-5xl font-semibold tracking-[-0.035em] mb-3 text-center"
        style={{ color: TEXT }}
      >
        The Flywheel
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-lg mb-16 text-center"
        style={{ color: `${TEXT}70` }}
      >
        You&rsquo;re not alone.
      </motion.p>

      {/* Circular flywheel diagram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative w-80 h-80"
      >
        {/* Outer ring */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320" fill="none">
          {/* Rotating ring */}
          <motion.circle
            cx="160" cy="160" r="140"
            stroke={`${SAGE}20`}
            strokeWidth="1"
            strokeDasharray="8 6"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '160px 160px' }}
          />

          {/* Inner ring */}
          <circle cx="160" cy="160" r="90" stroke={`${TEXT}08`} strokeWidth="1" />

          {/* Center */}
          <circle cx="160" cy="160" r="24" fill={`${GOLD}15`} stroke={`${GOLD}30`} strokeWidth="1" />
          <text x="160" y="164" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={GOLD}>GROVE</text>

          {/* Curved arrows between nodes */}
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
              <polygon points="0 0, 6 2, 0 4" fill={`${SAGE}40`} />
            </marker>
          </defs>

          {/* Connecting arcs */}
          <path d="M 230 60 A 140 140 0 0 1 290 180" stroke={`${SAGE}25`} strokeWidth="1" fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 270 230 A 140 140 0 0 1 160 305" stroke={`${SAGE}25`} strokeWidth="1" fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 100 280 A 140 140 0 0 1 30 160" stroke={`${SAGE}25`} strokeWidth="1" fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 50 90 A 140 140 0 0 1 160 20" stroke={`${SAGE}25`} strokeWidth="1" fill="none" markerEnd="url(#arrowhead)" />
        </svg>

        {/* Node: Ideas (top) */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="absolute top-[-10px] left-1/2 -translate-x-1/2 text-center"
        >
          <div className="w-12 h-12 rounded-full mx-auto mb-1.5 flex items-center justify-center border" style={{ backgroundColor: `${GOLD}10`, borderColor: `${GOLD}25` }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="12" r="2.5" fill={GOLD} opacity="0.6" />
              <path d="M9 10V5" stroke={GOLD} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
            </svg>
          </div>
          <p className="text-[10px] font-mono" style={{ color: `${GOLD}90` }}>More ideas</p>
        </motion.div>

        {/* Node: Agents (right) */}
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.85, duration: 0.4 }}
          className="absolute top-1/2 right-[-20px] -translate-y-1/2 text-center"
        >
          <div className="w-12 h-12 rounded-full mx-auto mb-1.5 flex items-center justify-center border" style={{ backgroundColor: `${SAGE}10`, borderColor: `${SAGE}25` }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="5" y="5" width="8" height="8" rx="2" stroke={SAGE} strokeWidth="1" opacity="0.6" />
              <circle cx="9" cy="9" r="2" fill={SAGE} opacity="0.4" />
            </svg>
          </div>
          <p className="text-[10px] font-mono" style={{ color: `${SAGE}90` }}>More agents</p>
        </motion.div>

        {/* Node: Work (bottom) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.4 }}
          className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 text-center"
        >
          <div className="w-12 h-12 rounded-full mx-auto mb-1.5 flex items-center justify-center border" style={{ backgroundColor: `${TEXT}08`, borderColor: `${TEXT}15` }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 14L9 4L14 14" stroke={TEXT} strokeWidth="1" opacity="0.3" />
              <path d="M6 14L9 8L12 14" stroke={TEXT} strokeWidth="0.8" opacity="0.2" />
            </svg>
          </div>
          <p className="text-[10px] font-mono" style={{ color: `${TEXT}50` }}>More work</p>
        </motion.div>

        {/* Node: Voters (left) */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.15, duration: 0.4 }}
          className="absolute top-1/2 left-[-20px] -translate-y-1/2 text-center"
        >
          <div className="w-12 h-12 rounded-full mx-auto mb-1.5 flex items-center justify-center border" style={{ backgroundColor: `${SAGE}10`, borderColor: `${SAGE}25` }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="7" r="3" stroke={SAGE} strokeWidth="1" opacity="0.5" />
              <path d="M4 15C4 12 6 10 9 10C12 10 14 12 14 15" stroke={SAGE} strokeWidth="1" opacity="0.3" />
            </svg>
          </div>
          <p className="text-[10px] font-mono" style={{ color: `${SAGE}90` }}>Voters curate</p>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="text-xs mt-10 text-center max-w-md leading-relaxed"
        style={{ color: `${TEXT}55` }}
      >
        Community voters stake EIGEN, evaluate proposals, earn rewards.
        Agents compete. Voters curate. Everyone wins.
      </motion.p>
    </div>
  )
}

function SlideGetStarted() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      {/* Seed icon growing */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-10"
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="44" r="5" fill={GOLD} opacity="0.8" />
          <path d="M32 39V22" stroke={SAGE} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M32 22L24 14" stroke={SAGE} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
          <path d="M32 22L40 14" stroke={SAGE} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
          <path d="M24 14L18 8" stroke={SAGE} strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
          <path d="M24 14L22 6" stroke={SAGE} strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
          <path d="M40 14L46 8" stroke={SAGE} strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
          <path d="M40 14L42 6" stroke={SAGE} strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
          <circle cx="18" cy="8" r="1.5" fill={GOLD} opacity="0.4" />
          <circle cx="46" cy="8" r="1.5" fill={GOLD} opacity="0.4" />
        </svg>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-6xl font-semibold tracking-[-0.035em] mb-4"
        style={{ color: TEXT }}
      >
        Plant your first idea.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-lg mb-12 max-w-md"
        style={{ color: `${TEXT}70` }}
      >
        Describe it in 40 words. The Arborist handles the rest.
      </motion.p>

      {/* CTA Button */}
      <motion.a
        href="https://grove-kohl.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-block px-10 py-4 rounded-xl text-lg font-medium transition-colors cursor-pointer"
        style={{ backgroundColor: GOLD, color: BG }}
      >
        Join the Planter Waitlist
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="mt-10 flex flex-col items-center gap-3"
      >
        <p className="text-sm font-mono" style={{ color: `${TEXT}50` }}>
          grove-kohl.vercel.app
        </p>
        <a
          href="https://grove-kohl.vercel.app?demo=true"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium transition-colors hover:opacity-80"
          style={{ color: SAGE }}
        >
          Watch the demo &rarr;
        </a>
      </motion.div>
    </div>
  )
}

// ─── Slide Registry ──────────────────────────────────────────────────────────

const SLIDES: React.FC[] = [
  SlideTitle,
  SlideProblem,
  SlideHowItWorks,
  SlidePlant,
  SlideCultivate,
  SlideGrow,
  SlideHarvest,
  SlideMultiplayer,
  SlideFlywheel,
  SlideGetStarted,
]

// ─── Slide transition variants ───────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
}

// ─── Main Deck Component ─────────────────────────────────────────────────────

export default function PlantersDeck() {
  const [[currentSlide, direction], setSlide] = useState([0, 0])

  const navigate = useCallback(
    (dir: number) => {
      setSlide(([prev]) => {
        const next = prev + dir
        if (next < 0 || next >= TOTAL_SLIDES) return [prev, 0]
        return [next, dir]
      })
    },
    [],
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        navigate(1)
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        navigate(-1)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [navigate])

  const CurrentSlideComponent = SLIDES[currentSlide]

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none"
      style={{ backgroundColor: BG, color: TEXT }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[180px] pointer-events-none"
        style={{ backgroundColor: '#2a1f0a', opacity: 0.12 }}
      />
      <div
        className="absolute top-2/3 left-1/3 w-[500px] h-[400px] rounded-full blur-[160px] pointer-events-none"
        style={{ backgroundColor: '#1a2618', opacity: 0.1 }}
      />

      {/* Click zones for navigation */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 z-20 cursor-w-resize"
        onClick={() => navigate(-1)}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/2 z-20 cursor-e-resize"
        onClick={() => navigate(1)}
      />

      {/* Slide content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.25 },
          }}
          className="absolute inset-0 z-10"
        >
          <CurrentSlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Bottom-left: Grove logo */}
      <div className="absolute bottom-6 left-8 z-30 flex items-center gap-2 pointer-events-none">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" fill={GOLD} opacity="0.7" />
          <circle cx="12" cy="12" r="8" stroke={GOLD} strokeWidth="0.8" opacity="0.2" />
        </svg>
        <span className="text-xs font-medium tracking-[-0.01em]" style={{ color: `${TEXT}50` }}>
          Grove
        </span>
      </div>

      {/* Bottom-right: Slide counter */}
      <div className="absolute bottom-6 right-8 z-30 pointer-events-none">
        <span className="text-xs font-mono" style={{ color: `${TEXT}50` }}>
          {currentSlide + 1} / {TOTAL_SLIDES}
        </span>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation()
              setSlide(([prev]) => [i, i > prev ? 1 : -1])
            }}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === currentSlide ? GOLD : `${TEXT}15`,
              transform: i === currentSlide ? 'scale(1.4)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
