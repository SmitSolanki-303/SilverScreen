'use client'

import React, { useState, useEffect } from 'react'
import { Search, Film, Sparkles, X } from "lucide-react";
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const Header = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Get initial user session
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching Movie...");
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 bg-card/70 backdrop-blur-xl border-b border-border/40">
      <div className="container mx-auto px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
          {/* Logo and Search Section */}
          <div className='flex flex-col md:flex-row items-center w-full lg:w-auto gap-4 md:gap-6'>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="relative group">
                <Film className="w-9 h-9 text-primary transition-transform duration-300 group-hover:scale-110" />
                <Sparkles className="w-4 h-4 text-accent absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-3xl lg:text-4xl tracking-tight font-bold bg-gradient-to-br from-foreground via-primary to-accent bg-clip-text text-transparent">
                SilverScreen
              </h1>
            </Link>

            {/* Search Bar */}
            <div className="w-full md:flex-1 md:max-w-2xl">
              <form onSubmit={handleSearch} className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted transition-colors duration-200 group-focus-within:text-accent" />
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, actors, genres..."
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-border bg-input-bg text-foreground text-sm placeholder:text-muted outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-200"
                />
                <button
                  type='submit'
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent/90 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Auth Buttons - Conditional Rendering */}
          <div className="flex items-center gap-3 shrink-0">
            {!loading && (
              user ? (
                // Show when user is logged in
                <>
                  <span className="px-4 py-2 text-foreground text-sm font-medium border-accent border rounded-full">
                    Hi, {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                  <Link
                    href="/profile"
                    className="px-6 py-2.5 rounded-full border border-border/60 text-foreground text-sm font-medium hover:border-primary hover:bg-secondary/50 transition-all duration-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="px-6 py-2.5 rounded-full bg-accent text-white text-sm font-semibold shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 transition-all duration-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                // Show when user is NOT logged in
                <>
                  <Link
                    href="/signin"
                    className="px-6 py-2.5 rounded-full border border-border/60 text-foreground text-sm font-medium hover:border-primary hover:bg-secondary/50 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-6 py-2.5 rounded-full bg-accent text-white text-sm font-semibold shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header