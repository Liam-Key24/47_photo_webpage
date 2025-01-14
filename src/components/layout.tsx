'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Sun, Moon, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { images } from '../data/images'
import { Navigation } from './Navigation'

export function Layout({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredImages = images.filter(img => 
    img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    img.photographer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-[#f5f2eb] dark:bg-zinc-900 min-h-screen text-zinc-900 dark:text-[#f5f2eb] transition-colors duration-300">
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f2eb]/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Navigation />
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-2xl font-serif">474</Link>
            <div className="flex items-center space-x-6">
              <button onClick={() => setIsSearchOpen(true)}>
                <Search className="w-5 h-5" />
              </button>
              <button onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-x-0 top-0 z-50 bg-[#f5f2eb] dark:bg-zinc-900 shadow-lg"
            >
              <div className="container mx-auto px-6 py-4">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search photos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow p-2 bg-transparent border-b border-zinc-300 dark:border-zinc-700 focus:outline-none"
                  />
                  <button onClick={() => setIsSearchOpen(false)} className="ml-4">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {searchQuery && (
                  <ul className="mt-4 space-y-2">
                    {filteredImages.map((img) => (
                      <li key={img.id}>
                        <Link href={`/photo/${img.id}`} className="hover:text-zinc-600 dark:hover:text-zinc-300">
                          {img.title} by {img.photographer}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="pt-20">
          {children}
        </main>
      </div>
    </div>
  )
}

