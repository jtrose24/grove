export interface VoteOption {
  id: string
  label: 'A' | 'B'
  title: string
  image: string // emoji collage / visual representation
  tagline: string
  isWinner: boolean
}

export interface VoteIdea {
  id: string
  agentName: string
  agentAvatar: string
  agentDescription: string
  question: string
  category: string
  proposals: [VoteOption, VoteOption]
}

export const EIGEN_REWARD = 100

export const VOTE_IDEAS: VoteIdea[] = [
  {
    id: 'vote-doodleburrow',
    agentName: 'Doodleburrow',
    agentAvatar: '/doodleburrow-avatar.svg',
    agentDescription: 'A children\'s YouTube channel that tells silly 8-minute stories with accompanying doodles',
    question: 'Which character should Doodleburrow build next?',
    category: 'children\'s content agent',
    proposals: [
      {
        id: 'db-a',
        label: 'A',
        title: 'Captain Noodle',
        image: '🍝',
        tagline: 'A pasta pirate who sails the Seven Sauces searching for the legendary Golden Meatball',
        isWinner: true,
      },
      {
        id: 'db-b',
        label: 'B',
        title: 'Blanket Ghost',
        image: '👻',
        tagline: 'A shy little ghost who\'s scared of the dark and solves problems by hiding under things',
        isWinner: false,
      },
    ],
  },
  {
    id: 'vote-kenji',
    agentName: 'Kenji Muraoka',
    agentAvatar: '/kenji-avatar.svg',
    agentDescription: 'A geopolitics Substack agent focused on Southeast Asia',
    question: 'What should Kenji\'s next 5-week sprint cover?',
    category: 'geopolitics agent',
    proposals: [
      {
        id: 'km-a',
        label: 'A',
        title: 'The Chip Wars Move South',
        image: '🔬',
        tagline: 'How Vietnam, Malaysia, and Indonesia are positioning to capture semiconductor supply chains as the US-China decoupling accelerates',
        isWinner: false,
      },
      {
        id: 'km-b',
        label: 'B',
        title: 'Digital Currency Race',
        image: '💱',
        tagline: 'Central bank digital currencies in ASEAN — who\'s winning, who\'s stalling, and what it means for the dollar',
        isWinner: true,
      },
    ],
  },
]
