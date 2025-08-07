'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth, SignOutButton, UserButton } from '@clerk/nextjs'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isSignedIn, user } = useAuth()

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Templates', href: '/templates' },
    { name: 'Prix', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">SignatureGen</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <Link
                  href="/create"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Créer une signature
                </Link>
                <Link
                  href="/my-signatures"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Mes signatures
                </Link>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: 'w-8 h-8'
                    }
                  }}
                />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-pink-600 transition-all duration-200"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {isSignedIn ? (
                <>
                  <Link
                    href="/create"
                    className="bg-blue-600 text-white block px-3 py-2 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Créer une signature
                  </Link>
                  <Link
                    href="/my-signatures"
                    className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Mes signatures
                  </Link>
                  <div className="px-3 py-2">
                    <SignOutButton>
                      <button className="text-red-600 hover:text-red-700 text-base font-medium transition-colors">
                        Déconnexion
                      </button>
                    </SignOutButton>
                  </div>
                </>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-gray-900 block w-full text-left px-3 py-2 text-base font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-gradient-to-r from-orange-500 to-pink-500 text-white block w-full px-3 py-2 rounded-lg text-base font-medium hover:from-orange-600 hover:to-pink-600 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    S'inscrire
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 