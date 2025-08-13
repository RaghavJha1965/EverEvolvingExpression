'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-serif text-forest-600 font-bold">
              Ever Evolving Expression
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-forest-600 transition-colors duration-200 font-medium">
              Home
            </Link>
            <Link href="/sessions" className="text-gray-700 hover:text-forest-600 transition-colors duration-200 font-medium">
              Sessions
            </Link>
            <Link href="/retreats" className="text-gray-700 hover:text-forest-600 transition-colors duration-200 font-medium">
              Retreats
            </Link>
            <Link href="/testimonials" className="text-gray-700 hover:text-forest-600 transition-colors duration-200 font-medium">
              Testimonials
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-forest-600 transition-colors duration-200 font-medium">
              About
            </Link>
            <Link href="/book" className="text-gray-700 hover:text-forest-600 transition-colors duration-200 font-medium">
              Book
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-forest-600 focus:outline-none focus:text-forest-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-forest-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/sessions"
                className="block px-3 py-2 text-gray-700 hover:text-forest-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sessions
              </Link>
              <Link
                href="/retreats"
                className="block px-3 py-2 text-gray-700 hover:text-forest-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Retreats
              </Link>
              <Link
                href="/testimonials"
                className="block px-3 py-2 text-gray-700 hover:text-forest-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-forest-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/book"
                className="block px-3 py-2 text-gray-700 hover:text-forest-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Book
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 