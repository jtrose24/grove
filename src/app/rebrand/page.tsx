'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

// ─── Data ────────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'grove-baseline', label: 'Grove', number: 1 },
  { id: 'outlands', label: 'Outlands', number: 2 },
  { id: 'marea', label: 'Marea', number: 3 },
  { id: 'foundra', label: 'Foundra', number: 4 },
  { id: 'comparison', label: 'Comparison', number: 5 },
  { id: 'recommendation', label: 'Recommendation', number: 6 },
  { id: 'next-steps', label: 'Next Steps', number: 7 },
]

interface BrandIdentity {
  name: string
  metaphor: string
  user: string
  agent: string
  executor: string
  credo: string
  colors: { name: string; hex: string }[]
  voice: { label: string; value: number; max: number }[]
  keyTerms: { concept: string; term: string }[]
}

interface BrandContent {
  identity: BrandIdentity
  headlines?: string[]
  ctas?: string[]
  microcopy?: { label: string; text: string }[]
  mood?: string[]
  visualNotes?: string[]
}

const GROVE: BrandContent = {
  identity: {
    name: 'Grove',
    metaphor: 'Ideas are living things \u2014 planted, tended, and harvested',
    user: 'Planter',
    agent: 'Arborist',
    executor: 'Builder',
    credo: 'Plant an idea. Grow a company.',
    colors: [
      { name: 'Background', hex: '#111110' },
      { name: 'Gold', hex: '#c4a862' },
      { name: 'Sage', hex: '#7b8a6e' },
    ],
    voice: [
      { label: 'Mythic', value: 4, max: 5 },
      { label: 'Playful', value: 3, max: 5 },
      { label: 'Poetic', value: 4, max: 5 },
    ],
    keyTerms: [
      { concept: 'Idea', term: 'Seed' },
      { concept: 'Verb', term: 'Plant' },
      { concept: 'Workspace', term: 'The Grove' },
      { concept: 'Spec', term: 'Growth Plan' },
      { concept: 'Tasks', term: 'Branches' },
      { concept: 'Deliverables', term: 'Fruit' },
      { concept: 'Token', term: 'Seeds' },
    ],
  },
}

const OUTLANDS: BrandContent = {
  identity: {
    name: 'Outlands',
    metaphor: 'Building at the frontier \u2014 every idea is uncharted terrain',
    user: 'Founder',
    agent: 'Surveyor',
    executor: 'Operator',
    credo: 'The frontier builds back.',
    colors: [
      { name: 'Background', hex: '#151210' },
      { name: 'Gold', hex: '#daa520' },
      { name: 'Rust', hex: '#cc6633' },
      { name: 'Purple', hex: '#7b52a0' },
    ],
    voice: [
      { label: 'Mythic', value: 3, max: 5 },
      { label: 'Playful', value: 1, max: 5 },
      { label: 'Poetic', value: 2, max: 5 },
    ],
    keyTerms: [
      { concept: 'Idea', term: 'Signal' },
      { concept: 'Verb', term: 'Transmit' },
      { concept: 'Workspace', term: 'The Outlands' },
      { concept: 'Spec', term: 'Survey' },
      { concept: 'Tasks', term: 'Operations' },
      { concept: 'Deliverables', term: 'Payload' },
      { concept: 'Token', term: 'Fuel' },
    ],
  },
  headlines: [
    'The frontier builds back.',
    'Bring an idea. We\u2019ll build the expedition.',
    'Past the edge of what one person can build.',
    'The unknown doesn\u2019t stay unknown for long.',
    'Launch from the boundary.',
  ],
  ctas: ['Chart Your Expedition', 'Launch a Mission', 'Cross the Boundary'],
  microcopy: [
    { label: 'Empty state', text: 'No signals on the wire.' },
    { label: 'Loading', text: 'The Surveyor is scanning your terrain.' },
    { label: 'Success', text: 'Survey complete.' },
    { label: 'Blocked', text: 'Operator needs a bearing.' },
    { label: 'Done', text: 'Outpost established.' },
    { label: 'Error', text: 'Signal disrupted.' },
  ],
  mood: ['Frontier', 'Cinematic', 'Mythic', 'Vast', 'Daring', 'Retro-futurist', 'Ceremonial', 'Warm-analog', 'Geological', 'Aspirational'],
  visualNotes: [
    'Topographic map textures and contour lines',
    'Warm, dusty gold palette with rust and deep purple accents',
    'Monospaced type for labels; geometric sans for headlines',
    'Subtle grain overlay for tactile, analog feel',
    'Inspired by NASA mission patches, surveyor maps, frontier outpost signage',
  ],
}

const MAREA: BrandContent = {
  identity: {
    name: 'Marea',
    metaphor: 'Ideas move like tides \u2014 cyclical, emergent, patient',
    user: 'Navigator',
    agent: 'Chartmaker',
    executor: 'Diver',
    credo: 'The tide carries what you start.',
    colors: [
      { name: 'Background', hex: '#0c1117' },
      { name: 'Cyan', hex: '#3eb8c8' },
      { name: 'Slate', hex: '#5a7088' },
    ],
    voice: [
      { label: 'Mythic', value: 4, max: 5 },
      { label: 'Playful', value: 2, max: 5 },
      { label: 'Poetic', value: 5, max: 5 },
    ],
    keyTerms: [
      { concept: 'Idea', term: 'Drift' },
      { concept: 'Verb', term: 'Cast' },
      { concept: 'Workspace', term: 'The Current' },
      { concept: 'Spec', term: 'Chart' },
      { concept: 'Tasks', term: 'Legs' },
      { concept: 'Deliverables', term: 'Catch' },
      { concept: 'Token', term: 'Shells' },
    ],
  },
  headlines: [
    'The tide carries what you start.',
    'Drop an idea. Let the current build it.',
    'What arrives was set in motion.',
    'Still waters build deep.',
    'Every current starts with a single shift.',
  ],
  ctas: ['Set It in Motion', 'Start a Current', 'Launch into the Tide'],
  microcopy: [
    { label: 'Empty state', text: 'Still waters.' },
    { label: 'Loading', text: 'The Chartmaker is reading your drift.' },
    { label: 'Success', text: 'Your chart is drawn.' },
    { label: 'Blocked', text: 'A Diver has surfaced.' },
    { label: 'Done', text: 'Ashore.' },
    { label: 'Error', text: 'The current shifted.' },
  ],
  mood: ['Tidal', 'Luminous', 'Fluid', 'Deep', 'Pearlescent', 'Rhythmic', 'Crystalline', 'Oceanic', 'Serene', 'Iridescent'],
  visualNotes: [
    'Fluid, wave-like UI motions and transitions',
    'Cool cyan-to-slate gradient palette',
    'Translucent glass panels with blur effects',
    'Subtle wave patterns and bathymetric contours',
    'Inspired by deep-sea cartography, tide charts, nautical instruments',
  ],
}

const FOUNDRA: BrandContent = {
  identity: {
    name: 'Foundra',
    metaphor: 'Anyone can be a founder \u2014 declare your intent, agents swarm',
    user: 'Founder',
    agent: 'Architect',
    executor: 'Contributor',
    credo: 'Anyone can start a company. Now, anyone can build one.',
    colors: [
      { name: 'Background', hex: '#101012' },
      { name: 'Ember', hex: '#e85530' },
      { name: 'Steel', hex: '#6b7080' },
    ],
    voice: [
      { label: 'Mythic', value: 1, max: 5 },
      { label: 'Playful', value: 2, max: 5 },
      { label: 'Poetic', value: 1, max: 5 },
    ],
    keyTerms: [
      { concept: 'Idea', term: 'Initiative' },
      { concept: 'Verb', term: 'Declare' },
      { concept: 'Workspace', term: 'The Floor' },
      { concept: 'Spec', term: 'Blueprint' },
      { concept: 'Tasks', term: 'Workstreams' },
      { concept: 'Deliverables', term: 'Deliverables' },
      { concept: 'Token', term: 'Equity' },
    ],
  },
  headlines: [
    'Anyone can start a company. Now, anyone can build one.',
    'Founder without the org chart.',
    'The idea is the company.',
    'You don\u2019t need a team. You need Foundra.',
    'Start a company with a sentence.',
  ],
  ctas: ['Start Building', 'Launch Your Idea', 'Found Something'],
  microcopy: [
    { label: 'Empty state', text: 'Nothing declared yet.' },
    { label: 'Loading', text: 'The Architect is structuring your initiative.' },
    { label: 'Success', text: 'Blueprint ready.' },
    { label: 'Blocked', text: 'A Contributor needs your input.' },
    { label: 'Done', text: 'Shipped.' },
    { label: 'Error', text: 'Something went wrong.' },
  ],
  mood: ['Forged', 'Precise', 'Industrial', 'Molten', 'Resolute', 'Structured', 'Monolithic', 'Engineered', 'Tempered', 'Heavy'],
  visualNotes: [
    'Sharp, geometric forms with heavy type',
    'Ember and steel palette with high contrast',
    'Brutalist-inspired layout with strong grid lines',
    'Subtle metallic textures and forged-iron motifs',
    'Inspired by foundries, architectural blueprints, industrial design',
  ],
}

const TERMINOLOGY_HEADERS = ['Concept', 'Grove', 'Outlands', 'Marea', 'Foundra']
const TERMINOLOGY_ROWS: string[][] = [
  ['User', 'Planter', 'Founder', 'Navigator', 'Founder'],
  ['Idea', 'Seed', 'Signal', 'Drift', 'Initiative'],
  ['Verb', 'Plant', 'Transmit', 'Cast', 'Declare'],
  ['Workspace', 'The Grove', 'The Outlands', 'The Current', 'The Floor'],
  ['Coordinator', 'Arborist', 'Surveyor', 'Chartmaker', 'Architect'],
  ['Executor', 'Builder', 'Operator', 'Diver', 'Contributor'],
  ['Spec', 'Growth Plan', 'Survey', 'Chart', 'Blueprint'],
  ['Tasks', 'Branches', 'Operations', 'Legs', 'Workstreams'],
  ['Deliverables', 'Fruit', 'Payload', 'Catch', 'Deliverables'],
  ['Token', 'Seeds', 'Fuel', 'Shells', 'Equity'],
  ['State 1', 'Seedling', 'Transmitted', 'Cast', 'Declared'],
  ['State 2', 'Sprouting', 'Surveyed', 'Charted', 'Architected'],
  ['State 3', 'Growing', 'In Operation', 'Underway', 'In Progress'],
  ['State 4', 'Blooming', 'Established', 'Surfacing', 'In Review'],
  ['State 5', 'Harvest', 'Settled', 'Ashore', 'Shipped'],
]

const COMPARISON_DIMENSIONS = [
  'Clarity',
  'Memorability',
  'Developer appeal',
  'Non-tech appeal',
  'Investor appeal',
  'Confusion risk',
  'Longevity',
  'International',
]
const COMPARISON_SCORES: Record<string, number[]> = {
  'Clarity':          [7, 6, 5, 9],
  'Memorability':     [8, 9, 8, 6],
  'Developer appeal': [5, 9, 6, 7],
  'Non-tech appeal':  [9, 6, 8, 8],
  'Investor appeal':  [5, 7, 4, 9],
  'Confusion risk':   [5, 5, 3, 8],
  'Longevity':        [8, 7, 9, 7],
  'International':    [7, 6, 9, 7],
}

const NEXT_STEPS = [
  'Run a lightweight user-perception test with 15\u201320 target users (builders, non-technical founders, investors)',
  'Develop a full visual identity for Outlands: logo, type system, color palette, icon set',
  'Write the Outlands brand guide with voice, tone, and guardrails',
  'Build a clickable prototype of the Outlands landing page',
  'Test the Outlands microcopy with real AI agent interactions',
  'Prepare a parallel Grove fallback identity refresh in case Outlands tests poorly',
  'Legal: check trademark availability for "Outlands" in relevant classes',
  'Domain: secure outlands.app, outlands.dev, or similar',
  'Socials: reserve @outlands handles on key platforms',
  'Internal alignment: present findings to full team and collect feedback',
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function VoiceSlider({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-mono text-[#e8e6e3]/40 w-16">{label}</span>
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`w-5 h-1.5 rounded-full ${
              i < value ? 'bg-[#c4a862]/60' : 'bg-[#e8e6e3]/[0.06]'
            }`}
          />
        ))}
      </div>
      <span className="text-[10px] font-mono text-[#e8e6e3]/25">{value}/{max}</span>
    </div>
  )
}

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-4 h-4 rounded-full border border-[#e8e6e3]/[0.1]"
        style={{ backgroundColor: hex }}
      />
      <span className="text-[11px] font-mono text-[#e8e6e3]/40">{name}</span>
      <span className="text-[10px] font-mono text-[#e8e6e3]/20">{hex}</span>
    </div>
  )
}

function MoodPill({ text }: { text: string }) {
  return (
    <span className="inline-block px-2.5 py-1 rounded-full bg-[#e8e6e3]/[0.04] border border-[#e8e6e3]/[0.06] text-[11px] font-mono text-[#e8e6e3]/45">
      {text}
    </span>
  )
}

function QuoteBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex items-start gap-3 pl-4 border-l-2 border-[#c4a862]/30 bg-[#c4a862]/[0.02] py-2.5 pr-4 rounded-r-lg">
      <span className="text-[10px] font-mono text-[#c4a862]/50 uppercase tracking-wider whitespace-nowrap min-w-[72px]">{label}</span>
      <span className="text-[13px] text-[#e8e6e3]/60 italic">&ldquo;{text}&rdquo;</span>
    </div>
  )
}

function IdentityCard({ brand }: { brand: BrandIdentity }) {
  return (
    <div className="rounded-xl border border-[#e8e6e3]/[0.07] bg-[#e8e6e3]/[0.015] p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          <div>
            <p className="text-[10px] font-mono text-[#e8e6e3]/25 uppercase tracking-wider mb-1">Brand</p>
            <p className="text-lg font-semibold text-[#e8e6e3]/90 tracking-[-0.02em]">{brand.name}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono text-[#e8e6e3]/25 uppercase tracking-wider mb-1">Metaphor</p>
            <p className="text-[13px] text-[#e8e6e3]/55 italic leading-relaxed">&ldquo;{brand.metaphor}&rdquo;</p>
          </div>
          <div>
            <p className="text-[10px] font-mono text-[#e8e6e3]/25 uppercase tracking-wider mb-1">Credo</p>
            <p className="text-[13px] text-[#c4a862]/70 font-medium">{brand.credo}</p>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-[10px] font-mono text-[#e8e6e3]/25 uppercase tracking-wider mb-1">User</p>
              <p className="text-sm text-[#e8e6e3]/70">{brand.user}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-[#e8e6e3]/25 uppercase tracking-wider mb-1">Agent</p>
              <p className="text-sm text-[#e8e6e3]/70">{brand.agent}</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-[#e8e6e3]/25 uppercase tracking-wider mb-1">Executor</p>
              <p className="text-sm text-[#e8e6e3]/70">{brand.executor}</p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div>
            <p className="text-[10px] font-mono text-[#e8e6e3]/25 uppercase tracking-wider mb-2">Voice</p>
            <div className="space-y-1.5">
              {brand.voice.map((v) => (
                <VoiceSlider key={v.label} label={v.label} value={v.value} max={v.max} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-mono text-[#e8e6e3]/25 uppercase tracking-wider mb-2">Colors</p>
            <div className="space-y-1.5">
              {brand.colors.map((c) => (
                <ColorSwatch key={c.hex} name={c.name} hex={c.hex} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key terms table */}
      <div className="mt-5 pt-5 border-t border-[#e8e6e3]/[0.05]">
        <p className="text-[10px] font-mono text-[#e8e6e3]/25 uppercase tracking-wider mb-2">Key Terms</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1.5">
          {brand.keyTerms.map((kt) => (
            <div key={kt.concept} className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#e8e6e3]/25">{kt.concept}:</span>
              <span className="text-[12px] text-[#e8e6e3]/60">{kt.term}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-[#e8e6e3]/[0.06]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#e8e6e3]/[0.08] bg-[#e8e6e3]/[0.02]">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-2.5 text-[11px] font-mono text-[#e8e6e3]/40 uppercase tracking-wider font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#e8e6e3]/[0.04] last:border-0">
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-2.5 text-[13px] ${j === 0 ? 'text-[#e8e6e3]/50 font-mono text-[11px]' : 'text-[#e8e6e3]/60'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ScoreCell({ score }: { score: number }) {
  const bg =
    score >= 9
      ? 'bg-[#c4a862]/15 text-[#c4a862]'
      : score >= 8
        ? 'bg-[#7b8a6e]/15 text-[#8a9a7b]'
        : score >= 7
          ? 'bg-[#7b8a6e]/10 text-[#7b8a6e]/80'
          : score >= 6
            ? 'bg-[#e8e6e3]/[0.04] text-[#e8e6e3]/50'
            : score >= 5
              ? 'bg-[#e8e6e3]/[0.03] text-[#e8e6e3]/40'
              : score >= 4
                ? 'bg-[#cc6633]/8 text-[#cc6633]/60'
                : 'bg-[#e85530]/10 text-[#e85530]/60'

  return (
    <td className={`px-4 py-2.5 text-center text-[13px] font-mono font-medium ${bg}`}>
      {score}/10
    </td>
  )
}

function SectionHeading({ id, number, title }: { id: string; number: number; title: string }) {
  return (
    <h2 id={id} className="text-xl font-semibold text-[#e8e6e3]/90 tracking-[-0.02em] mt-16 mb-4 flex items-center gap-3 scroll-mt-24">
      <span className="text-[11px] font-mono text-[#c4a862]/50 bg-[#c4a862]/[0.06] px-2 py-0.5 rounded">{number}</span>
      {title}
    </h2>
  )
}

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
}

// ─── Brand Section ───────────────────────────────────────────────────────────

function BrandSection({
  sectionId,
  sectionNumber,
  brand,
  previewLink,
  accentColor,
}: {
  sectionId: string
  sectionNumber: number
  brand: BrandContent
  previewLink?: string
  accentColor: string
}) {
  return (
    <motion.div {...fadeIn}>
      <SectionHeading id={sectionId} number={sectionNumber} title={brand.identity.name} />
      <p className="text-[#e8e6e3]/40 text-sm leading-relaxed mb-6">
        {brand.identity.metaphor}
      </p>

      {/* Identity Card */}
      <IdentityCard brand={brand.identity} />

      {/* Terminology */}
      {brand.identity.keyTerms.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-medium text-[#e8e6e3]/70 mb-3">Terminology: Grove &rarr; {brand.identity.name}</h3>
          <DataTable
            headers={['Concept', 'Grove', brand.identity.name]}
            rows={brand.identity.keyTerms.map((kt, i) => [
              kt.concept,
              GROVE.identity.keyTerms[i]?.term ?? '\u2014',
              kt.term,
            ])}
          />
        </div>
      )}

      {/* Headlines */}
      {brand.headlines && (
        <div className="mt-8">
          <h3 className="text-sm font-medium text-[#e8e6e3]/70 mb-3">Landing Copy \u2014 Hero Headlines</h3>
          <div className="space-y-2">
            {brand.headlines.map((h, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[10px] font-mono text-[#e8e6e3]/20 mt-1 w-4 text-right flex-shrink-0">{i + 1}</span>
                <p className="text-[15px] text-[#e8e6e3]/70 font-medium tracking-[-0.01em]">{h}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTAs */}
      {brand.ctas && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-[#e8e6e3]/70 mb-3">CTA Options</h3>
          <div className="flex flex-wrap gap-2">
            {brand.ctas.map((cta) => (
              <span
                key={cta}
                className="px-4 py-2 rounded-lg text-[13px] font-medium border"
                style={{
                  borderColor: `${accentColor}40`,
                  color: accentColor,
                  backgroundColor: `${accentColor}0a`,
                }}
              >
                {cta}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Microcopy */}
      {brand.microcopy && (
        <div className="mt-8">
          <h3 className="text-sm font-medium text-[#e8e6e3]/70 mb-3">Microcopy</h3>
          <div className="space-y-2">
            {brand.microcopy.map((mc) => (
              <QuoteBlock key={mc.label} label={mc.label} text={mc.text} />
            ))}
          </div>
        </div>
      )}

      {/* Visual Direction */}
      {brand.mood && (
        <div className="mt-8">
          <h3 className="text-sm font-medium text-[#e8e6e3]/70 mb-3">Visual Direction</h3>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {brand.mood.map((m) => (
              <MoodPill key={m} text={m} />
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {brand.identity.colors.map((c) => (
              <ColorSwatch key={c.hex} name={c.name} hex={c.hex} />
            ))}
          </div>
          {brand.visualNotes && (
            <ul className="space-y-1.5">
              {brand.visualNotes.map((note, i) => (
                <li key={i} className="text-[13px] text-[#e8e6e3]/40 flex items-start gap-2">
                  <span className="text-[#e8e6e3]/15 mt-0.5">&bull;</span>
                  {note}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Preview Link */}
      {previewLink && (
        <div className="mt-8">
          <a
            href={previewLink}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all border"
            style={{
              borderColor: `${accentColor}30`,
              color: accentColor,
              backgroundColor: `${accentColor}08`,
            }}
          >
            Preview {brand.identity.name} Homepage
            <span className="text-lg">&rarr;</span>
          </a>
        </div>
      )}
    </motion.div>
  )
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({ activeSection, mobileOpen, onClose }: { activeSection: string; mobileOpen: boolean; onClose: () => void }) {
  const router = useRouter()

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-[#111110] border-r border-[#e8e6e3]/[0.06] z-50
        flex flex-col pt-5 pb-8 overflow-y-auto
        transition-transform duration-200
        lg:translate-x-0 lg:z-30
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="px-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#c4a862]">
              <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.9" />
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            </svg>
            <span className="text-[#e8e6e3]/80 font-medium text-sm">Grove</span>
            <span className="text-[#e8e6e3]/25 text-xs">/</span>
            <span className="text-[#e8e6e3]/40 text-xs font-mono">rebrand</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-[#e8e6e3]/30 hover:text-[#e8e6e3]/60">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <p className="px-5 text-[10px] font-mono text-[#7b8a6e]/50 uppercase tracking-[0.15em] mb-3">Brand Treatments</p>
        <nav className="flex-1 px-3">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={onClose}
              className={`
                flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] transition-colors mb-0.5
                ${activeSection === s.id
                  ? 'bg-[#c4a862]/[0.08] text-[#c4a862]'
                  : 'text-[#e8e6e3]/35 hover:text-[#e8e6e3]/60 hover:bg-[#e8e6e3]/[0.03]'
                }
              `}
            >
              <span className={`text-[10px] font-mono w-4 text-right ${activeSection === s.id ? 'text-[#c4a862]/60' : 'text-[#e8e6e3]/20'}`}>
                {s.number}
              </span>
              {s.label}
            </a>
          ))}
        </nav>
        <div className="px-5 pt-4 border-t border-[#e8e6e3]/[0.06]">
          <button
            onClick={() => router.push('/')}
            className="text-[11px] text-[#e8e6e3]/25 hover:text-[#e8e6e3]/50 transition-colors font-mono"
          >
            &larr; Back to homepage
          </button>
        </div>
      </aside>
    </>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function RebrandPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('grove-baseline')
  const [mobileOpen, setMobileOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    )

    for (const s of SECTIONS) {
      const el = document.getElementById(s.id)
      if (el) observerRef.current.observe(el)
    }

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#111110] text-[#e8e6e3]">
      <Sidebar activeSection={activeSection} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-[#111110]/90 backdrop-blur-sm border-b border-[#e8e6e3]/[0.06] px-4 py-3 flex items-center justify-between">
        <button onClick={() => setMobileOpen(true)} className="text-[#e8e6e3]/40 hover:text-[#e8e6e3]/70">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <span className="text-sm text-[#e8e6e3]/50 font-mono">Rebrand Exploration</span>
        <button onClick={() => router.push('/')} className="text-[#e8e6e3]/30 hover:text-[#e8e6e3]/60 text-xs">Home</button>
      </div>

      {/* Content */}
      <div className="lg:ml-64 px-6 sm:px-10 lg:px-16 pt-20 lg:pt-12 pb-24 max-w-3xl">

        {/* ─── Header ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-6">
            <button onClick={() => router.push('/')} className="text-[#e8e6e3]/25 hover:text-[#e8e6e3]/50 text-xs font-mono transition-colors">grove</button>
            <span className="text-[#e8e6e3]/15">/</span>
            <span className="text-[#c4a862]/60 text-xs font-mono">rebrand</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.035em] mb-4">
            Rebrand <span className="text-[#c4a862]">Exploration</span>
          </h1>
          <p className="text-[#e8e6e3]/40 text-base leading-relaxed max-w-lg mb-4">
            Four brand treatments for the same product &mdash; compared side by side.
          </p>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#7b8a6e]/[0.08] border border-[#7b8a6e]/15">
              <div className="w-1.5 h-1.5 rounded-full bg-[#7b8a6e]/60" />
              <span className="text-[#7b8a6e]/70 font-mono">Generated by a 5-agent team</span>
            </div>
          </div>
        </motion.div>

        {/* ─── 1. Grove Baseline ─────────────────────────────────── */}
        <motion.div {...fadeIn}>
          <SectionHeading id="grove-baseline" number={1} title="Grove \u2014 Baseline" />
          <p className="text-[#e8e6e3]/40 text-sm leading-relaxed mb-6">
            The current brand identity. Organic, mythic, growth-focused. This is the standard all alternatives are measured against.
          </p>
          <IdentityCard brand={GROVE.identity} />
        </motion.div>

        {/* ─── 2. Outlands ───────────────────────────────────────── */}
        <BrandSection
          sectionId="outlands"
          sectionNumber={2}
          brand={OUTLANDS}
          previewLink="/preview/outlands"
          accentColor="#daa520"
        />

        {/* ─── 3. Marea ──────────────────────────────────────────── */}
        <BrandSection
          sectionId="marea"
          sectionNumber={3}
          brand={MAREA}
          accentColor="#3eb8c8"
        />

        {/* ─── 4. Foundra ────────────────────────────────────────── */}
        <BrandSection
          sectionId="foundra"
          sectionNumber={4}
          brand={FOUNDRA}
          accentColor="#e85530"
        />

        {/* ─── 5. Comparison Matrix ──────────────────────────────── */}
        <motion.div {...fadeIn}>
          <SectionHeading id="comparison" number={5} title="Comparison Matrix" />
          <p className="text-[#e8e6e3]/40 text-sm leading-relaxed mb-6">
            All four brands scored across eight dimensions. Higher is better. Scores reflect the combined assessment of the agent panel.
          </p>

          <div className="overflow-x-auto rounded-xl border border-[#e8e6e3]/[0.06]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8e6e3]/[0.08] bg-[#e8e6e3]/[0.02]">
                  <th className="text-left px-4 py-3 text-[11px] font-mono text-[#e8e6e3]/40 uppercase tracking-wider font-medium">
                    Dimension
                  </th>
                  {['Grove', 'Outlands', 'Marea', 'Foundra'].map((name) => (
                    <th key={name} className="text-center px-4 py-3 text-[11px] font-mono text-[#e8e6e3]/40 uppercase tracking-wider font-medium">
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DIMENSIONS.map((dim) => {
                  const scores = COMPARISON_SCORES[dim]
                  return (
                    <tr key={dim} className="border-b border-[#e8e6e3]/[0.04] last:border-0">
                      <td className="px-4 py-2.5 text-[13px] text-[#e8e6e3]/55 font-mono text-[11px]">
                        {dim}
                      </td>
                      {scores.map((score, j) => (
                        <ScoreCell key={j} score={score} />
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Full terminology cross-reference */}
          <div className="mt-10">
            <h3 className="text-sm font-medium text-[#e8e6e3]/70 mb-3">Full Terminology Cross-Reference</h3>
            <DataTable headers={TERMINOLOGY_HEADERS} rows={TERMINOLOGY_ROWS} />
          </div>
        </motion.div>

        {/* ─── 6. Recommendation ─────────────────────────────────── */}
        <motion.div {...fadeIn}>
          <SectionHeading id="recommendation" number={6} title="Recommendation" />

          {/* Primary */}
          <div className="rounded-xl border border-[#c4a862]/20 bg-[#c4a862]/[0.03] p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#c4a862]/15 text-[#c4a862]">
                Primary
              </span>
              <h3 className="text-lg font-semibold text-[#e8e6e3]/90 tracking-[-0.02em]">Outlands</h3>
            </div>
            <ul className="space-y-2 mb-6">
              {[
                'Owns a lane \u2014 no other product in this space uses frontier/expedition metaphors',
                'Attracts builders \u2014 the language is active, directional, and empowering',
                'Visual identity writes itself \u2014 topographic maps, mission patches, warm analog textures',
                'Scales in both directions \u2014 works for solo hackers and enterprise teams alike',
                'Powerful emotional pitch \u2014 "building at the frontier" resonates across cultures',
              ].map((reason, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-[#e8e6e3]/55">
                  <span className="text-[#c4a862]/50 mt-0.5">&bull;</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          {/* Secondary */}
          <div className="rounded-xl border border-[#7b8a6e]/15 bg-[#7b8a6e]/[0.02] p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#7b8a6e]/15 text-[#7b8a6e]">
                Secondary
              </span>
              <h3 className="text-lg font-semibold text-[#e8e6e3]/90 tracking-[-0.02em]">Grove</h3>
            </div>
            <p className="text-[13px] text-[#e8e6e3]/45 leading-relaxed">
              Grove remains a strong identity with proven appeal. If Outlands tests poorly in user research, the fallback is to refine and evolve the existing Grove brand rather than start from scratch.
            </p>
          </div>

          {/* The Play */}
          <div className="rounded-xl border border-[#e8e6e3]/[0.07] bg-[#e8e6e3]/[0.015] p-6 mb-8">
            <h3 className="text-sm font-medium text-[#e8e6e3]/70 mb-3">The Play</h3>
            <p className="text-[13px] text-[#e8e6e3]/50 leading-relaxed">
              Rebrand to <strong className="text-[#daa520]">Outlands</strong> for the public launch. The frontier metaphor gives us a distinctive brand position, a clear visual language, and copy that practically writes itself. Keep <strong className="text-[#7b8a6e]">Grove</strong> as the internal codename and community touchstone &mdash; it has sentimental value and still works for the organic/growth narrative we use internally.
            </p>
          </div>

          {/* Guardrails */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-[#e8e6e3]/70">Guardrails for Outlands</h3>

            <div className="rounded-lg border border-[#7b8a6e]/15 bg-[#7b8a6e]/[0.02] p-4">
              <p className="text-[10px] font-mono text-[#7b8a6e]/60 uppercase tracking-wider mb-2">Always</p>
              <ul className="space-y-1.5">
                {[
                  'Maintain competence and seriousness in tone',
                  'Keep retro-futurism subtle \u2014 more NASA, less steampunk',
                  'Use directional language: "chart," "launch," "cross," "survey"',
                ].map((item, i) => (
                  <li key={i} className="text-[13px] text-[#e8e6e3]/50 flex items-start gap-2">
                    <span className="text-[#7b8a6e]/50 mt-0.5">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-[#e85530]/15 bg-[#e85530]/[0.02] p-4">
              <p className="text-[10px] font-mono text-[#e85530]/60 uppercase tracking-wider mb-2">Never</p>
              <ul className="space-y-1.5">
                {[
                  'Cowboy or Wild West imagery \u2014 this is not a western',
                  'Make it exclusionary \u2014 the frontier is open to everyone',
                  'Reference colonialism \u2014 we are exploring, not conquering',
                ].map((item, i) => (
                  <li key={i} className="text-[13px] text-[#e8e6e3]/50 flex items-start gap-2">
                    <span className="text-[#e85530]/50 mt-0.5">&times;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-[#c4a862]/15 bg-[#c4a862]/[0.02] p-4">
              <p className="text-[10px] font-mono text-[#c4a862]/60 uppercase tracking-wider mb-2">Litmus Test</p>
              <p className="text-[13px] text-[#e8e6e3]/55 italic">
                &ldquo;If your copy could be narrated by a man in a cowboy hat, you&rsquo;ve gone too far.&rdquo;
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── 7. Next Steps ─────────────────────────────────────── */}
        <motion.div {...fadeIn}>
          <SectionHeading id="next-steps" number={7} title="Next Steps" />
          <p className="text-[#e8e6e3]/40 text-sm leading-relaxed mb-6">
            Checklist to move from exploration to execution.
          </p>
          <div className="space-y-2">
            {NEXT_STEPS.map((step, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <div className="mt-1 w-4 h-4 rounded border border-[#e8e6e3]/[0.12] bg-[#e8e6e3]/[0.02] flex-shrink-0 flex items-center justify-center group-hover:border-[#c4a862]/30 transition-colors">
                  {/* unchecked checkbox */}
                </div>
                <p className="text-[13px] text-[#e8e6e3]/50 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── Footer ────────────────────────────────────────────── */}
        <div className="mt-20 pt-8 border-t border-[#e8e6e3]/[0.06]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#c4a862]/40">
                <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.9" />
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              </svg>
              <span className="text-[#e8e6e3]/25 text-xs">Grove &mdash; Rebrand Exploration Report</span>
            </div>
            <button onClick={() => router.push('/')} className="text-[#e8e6e3]/20 hover:text-[#e8e6e3]/50 text-xs transition-colors">
              Back to homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
