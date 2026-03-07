import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getIdeaById, SEED_IDEAS } from '@/lib/seedData'
import IdeaPageClient from './IdeaPageClient'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return SEED_IDEAS.map((idea) => ({ id: idea.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const idea = getIdeaById(id)
  if (!idea) return { title: 'Idea not found — Grove' }

  return {
    title: `${idea.title} — Grove`,
    description: idea.description,
    openGraph: {
      title: `${idea.title} — Grove`,
      description: idea.description,
      images: ['/og-grove.png'],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${idea.title} — Grove`,
      description: idea.description,
      images: ['/og-grove.png'],
    },
  }
}

export default async function IdeaPage({ params }: Props) {
  const { id } = await params
  const idea = getIdeaById(id)
  if (!idea) notFound()

  return <IdeaPageClient idea={idea} />
}
