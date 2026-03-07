'use client'
import { motion } from 'framer-motion'

interface TweetProps {
  name: string
  handle: string
  avatar?: string
  verified?: boolean
  content: string
  date: string
  likes?: number
  retweets?: number
}

export default function TweetEmbed({ name, handle, verified = true, content, date, likes = 842, retweets = 127 }: TweetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-[#1a1a19] border border-[#e8e6e3]/10 rounded-xl p-4 my-2 max-w-full"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7b8a6e] to-[#c4a862] flex items-center justify-center text-sm font-bold text-[#e8e6e3] flex-shrink-0">
          AC
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-[#e8e6e3]/90 text-sm font-bold">{name}</span>
            {verified && (
              <svg className="w-4 h-4 text-blue-400 flex-shrink-0" viewBox="0 0 22 22" fill="currentColor">
                <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.143.271.586.702 1.084 1.24 1.438.54.354 1.167.551 1.813.568.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.225 1.261.272 1.893.143.636-.131 1.22-.437 1.69-.883.445-.47.749-1.054.88-1.69.131-.633.08-1.29-.139-1.896.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
              </svg>
            )}
          </div>
          <span className="text-[#e8e6e3]/40 text-xs">@{handle}</span>
        </div>
        <svg className="w-5 h-5 text-[#e8e6e3]/30 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* Content */}
      <div className="text-[#e8e6e3]/80 text-sm leading-relaxed whitespace-pre-line mb-3">
        {content}
      </div>

      {/* Date */}
      <div className="text-[#e8e6e3]/30 text-xs mb-3 pb-3 border-b border-[#e8e6e3]/8">
        {date}
      </div>

      {/* Engagement */}
      <div className="flex items-center gap-5 text-[#e8e6e3]/30 text-xs">
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {likes.toLocaleString()}
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
          {retweets.toLocaleString()}
        </span>
      </div>
    </motion.div>
  )
}
