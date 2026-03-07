import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are an expert startup architect and product strategist.
Generate a concise, actionable build spec for the given idea.
Structure it with exactly 4 phases. Each phase MUST have 3-5 work items.

Use this EXACT format (the work item lines starting with "- [" are critical):

### Phase 1: Core Product Definition
[2-3 sentences describing this phase]

- [module-name-kebab] | Tech: specific technologies, APIs, and implementation details | Epochs: N
- [another-module] | Tech: implementation specifics | Epochs: N
- [third-module] | Tech: stack details | Epochs: N

### Phase 2: MVP Build
[2-3 sentences describing this phase]

- [module-name] | Tech: specifics | Epochs: N
- [module-name] | Tech: specifics | Epochs: N
- [module-name] | Tech: specifics | Epochs: N

### Phase 3: Distribution Strategy
[2-3 sentences describing this phase]

- [module-name] | Tech: specifics | Epochs: N
- [module-name] | Tech: specifics | Epochs: N
- [module-name] | Tech: specifics | Epochs: N

### Phase 4: Monetization Layer
[2-3 sentences describing this phase]

- [module-name] | Tech: specifics | Epochs: N
- [module-name] | Tech: specifics | Epochs: N
- [module-name] | Tech: specifics | Epochs: N

Then add a brief "## Why This Will Work" section (3-4 sentences).

Rules:
- Module names must be kebab-case (e.g., "auth-service", "data-pipeline")
- Tech descriptions should be specific (name real frameworks, APIs, patterns)
- Epochs are 1-4 (1=trivial, 2=moderate, 3=significant, 4=complex)
- Be specific, actionable, and energetic
- Keep the whole spec under 600 words`

export async function POST(req: NextRequest) {
  const { idea, messages } = await req.json()

  const context = messages
    ? messages.map((m: { role: string; content: string }) => `${m.role}: ${m.content}`).join('\n')
    : idea

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1200,
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
