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
      <div className="min-h-screen transition-colors duration-300 bg-Alabastar dark:bg-black text-black dark:text-Alabastar">
        <header className="fixed top-0 left-0 right-0 z-50 bg-Alabastar/80 dark:bg-black/80 backdrop-blur-md border-b border-Alabastar dark:border-black">
          <div className="container mx-auto flex justify-between items-center px-6 py-4">
            <Navigation />
            <Link href="/" className="text-2xl font-serif mx-auto">474</Link>
            <div className="flex space-x-6">
              <button onClick={() => setIsSearchOpen(true)} aria-label="Open search">
                <Search className="w-5 h-5" />
              </button>
              <button onClick={() => setIsDarkMode(prev => !prev)} aria-label="Toggle dark mode">
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
              className="fixed inset-x-0 top-0 z-50 bg-Alabastar dark:bg-black shadow-lg"
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
