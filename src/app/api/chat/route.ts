import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'
import { rateLimit, rateLimitResponse } from '@/lib/rateLimit'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are an expert agentic company designer helping someone create a new company on Grove.
Your name is Arborist. You help people define their company's agent identity, voice, audience, channel strategy, constraints, and monetization.
Ask clarifying questions about the company's persona, content format, target audience, and operating constraints.
Keep responses concise (2-4 sentences). After 2-3 exchanges, if the company concept is taking shape,
hint that they could click 'Launch It' to generate a full build spec.`

const MAX_MESSAGES = 20
const MAX_MESSAGE_LENGTH = 2000

export async function POST(req: NextRequest) {
  // Rate limit: 10 requests per minute per IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const rl = rateLimit(`chat:${ip}`, { maxRequests: 10, windowMs: 60_000 })
  if (!rl.allowed) return rateLimitResponse(rl)
  let body: { messages?: { role: string; content: string }[] }
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { messages } = body

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'Messages required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const safeMessages = messages
    .slice(0, MAX_MESSAGES)
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: typeof m.content === 'string' ? m.content.slice(0, MAX_MESSAGE_LENGTH) : '',
    }))

  if (safeMessages.length === 0) {
    return new Response(JSON.stringify({ error: 'No valid messages' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let stream
  try {
    stream = await client.messages.stream({
      model: 'claude-opus-4-6',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: safeMessages,
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
