'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { categories } from '../data/images'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsMenuOpen(true)} className="z-50">
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-y-0 left-0 z-50 w-full sm:w-64 bg-[#f5f2eb] dark:bg-zinc-900 shadow-lg"
          >
            <div className="p-6">
              <button onClick={() => setIsMenuOpen(false)} className="mb-6">
                <X className="w-6 h-6" />
              </button>
              <ul className="space-y-4">
                {categories.map((category) => (
                  <li key={category}>
                    <Link 
                      href={`/category/${category.toLowerCase()}`} 
                      className="text-lg hover:text-zinc-600 dark:hover:text-zinc-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

