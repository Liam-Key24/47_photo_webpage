'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const ratios = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/3]'] as const;

export function PhotoCard({ image, index }: { image: { id: string; url: string; title: string; photographer: string; story: string }; index: number }) {
  const randomRatio = ratios[Math.floor(Math.random() * ratios.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative group perspective"
    >
      <Link href={`/photo/${image.id}`}>
        <motion.div
          className={`relative ${randomRatio} preserve-3d duration-500 group-hover:[transform:rotateY(180deg)]`}
        >
          {/* Front of card */}
          <div className="absolute inset-0 backface-hidden">
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Back of card */}
          <div className="absolute inset-0 h-full w-full [transform:rotateY(180deg)] backface-hidden bg-[#f5f2eb] dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h3 className="font-serif text-2xl mb-2">{image.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">by {image.photographer}</p>
                <p className="text-sm leading-relaxed">{image.story}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

