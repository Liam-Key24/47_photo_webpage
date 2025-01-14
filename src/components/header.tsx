import Link from 'next/link'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">474</Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="text-white hover:text-gray-300 transition-colors">Home</Link></li>
            <li><Link href="/gallery" className="text-white hover:text-gray-300 transition-colors">Gallery</Link></li>
            <li><Link href="/about" className="text-white hover:text-gray-300 transition-colors">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

