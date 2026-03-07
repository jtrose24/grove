import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'
import { rateLimit, rateLimitResponse } from '@/lib/rateLimit'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are an expert sovereign media agent architect.
Generate a concise, actionable agent spec for the given concept.
Structure it with exactly 4 phases. Each phase MUST have 3-5 work items.

Use this EXACT format (the work item lines starting with "- [" are critical):

### Phase 1: Agent Identity & Content Engine
[2-3 sentences describing this phase]

- [module-name-kebab] | Tech: specific technologies, APIs, and implementation details | Epochs: N
- [another-module] | Tech: implementation specifics | Epochs: N
- [third-module] | Tech: stack details | Epochs: N

### Phase 2: Sovereign Infrastructure
[2-3 sentences describing this phase]

- [module-name] | Tech: specifics | Epochs: N
- [module-name] | Tech: specifics | Epochs: N
- [module-name] | Tech: specifics | Epochs: N

### Phase 3: Distribution & Audience
[2-3 sentences describing this phase]

- [module-name] | Tech: specifics | Epochs: N
- [module-name] | Tech: specifics | Epochs: N
- [module-name] | Tech: specifics | Epochs: N

### Phase 4: Monetization & Governance
[2-3 sentences describing this phase]

- [module-name] | Tech: specifics | Epochs: N
- [module-name] | Tech: specifics | Epochs: N
- [module-name] | Tech: specifics | Epochs: N

Then add a brief "## Why This Will Work" section (3-4 sentences).

Rules:
- Module names must be kebab-case (e.g., "content-engine", "tee-runtime")
- Tech descriptions should be specific (name real frameworks, APIs, patterns)
- Epochs are 1-4 (1=trivial, 2=moderate, 3=significant, 4=complex)
- Be specific, actionable, and energetic
- Keep the whole spec under 600 words`

const MAX_IDEA_LENGTH = 2000
const MAX_MESSAGES = 20

function sanitizeInput(text: string): string {
  return text
    .slice(0, MAX_IDEA_LENGTH)
    .replace(/\r/g, '')
}

export async function POST(req: NextRequest) {
  // Rate limit: 5 spec generations per minute per IP (more expensive than chat)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const rl = rateLimit(`spec:${ip}`, { maxRequests: 5, windowMs: 60_000 })
  if (!rl.allowed) return rateLimitResponse(rl)

  let body: { idea?: string; messages?: { role: string; content: string }[] }
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { idea, messages } = body

  if (!idea && !messages) {
    return new Response(JSON.stringify({ error: 'Missing idea or messages' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let userContent: string
  if (messages) {
    const safeMessages = messages
      .slice(0, MAX_MESSAGES)
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => `${m.role}: ${sanitizeInput(m.content)}`)
    userContent = safeMessages.join('\n')
  } else {
    userContent = sanitizeInput(idea || '')
  }

  if (!userContent.trim()) {
    return new Response(JSON.stringify({ error: 'Empty input' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let stream
  try {
    stream = await client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1200,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: `Generate a sovereign media agent spec for this concept:\n\n${userContent}` }],
    })
  } catch (err) {
    const status = err instanceof Anthropic.APIError ? err.status : 500
    const message = status === 401 ? 'API configuration error' : 'Service temporarily unavailable'
    return new Response(JSON.stringify({ error: message }), {
      status: status >= 500 ? 502 : 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text))
          }
        }
        controller.close()
      } catch {
        controller.error(new Error('Stream interrupted'))
      }
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
