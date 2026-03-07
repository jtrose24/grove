'use client'

export default function ShareButton({ title, description, ideaId }: {
  title: string
  description: string
  ideaId: string
}) {
  const text = `${title} — ${description.slice(0, 120)}${description.length > 120 ? '...' : ''}`
  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/idea/${ideaId}`
    : `/idea/${ideaId}`

  const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`

  return (
    <a
      href={intentUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition-all text-xs"
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      Share on X
    </a>
  )
}
