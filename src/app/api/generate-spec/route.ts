import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are an expert startup architect and product strategist.
Generate a concise, actionable build spec for the given idea.
Structure it with exactly 4 phases using this format:

### Phase 1: Core Product Definition
[2-3 sentences describing this phase]

### Phase 2: MVP Build
[2-3 sentences describing this phase]

### Phase 3: Distribution Strategy
[2-3 sentences describing this phase]

### Phase 4: Monetization Layer
[2-3 sentences describing this phase]

Then add a brief "## Why This Will Work" section (3-4 sentences).
Be specific, actionable, and energetic. Keep the whole spec under 400 words.`

export async function POST(req: NextRequest) {
  const { idea, messages } = await req.json()

  const context = messages
    ? messages.map((m: { role: string; content: string }) => `${m.role}: ${m.content}`).join('\n')
    : idea

  const stream = await client.messages.stream({
    model: 'claude-opus-4-6',
    max_tokens: 600,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: `Generate a build spec for this idea:\n\n${context}` }],
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === 'content_block_delta' &&
          chunk.delta.type === 'text_delta'
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text))
        }
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
