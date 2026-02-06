'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { MovieCard } from '@/components/Generic/Card/MovieCard'
import { searchMovies } from '@/lib/data-fetching'
import { Movie } from '@/lib/types/movie'

const SearchContent = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setMovies([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const results = await searchMovies(query)
        setMovies(results)
      } catch (err) {
        console.error('Search error:', err)
        setError('Failed to search movies. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted">
          {loading
            ? 'Searching...'
            : movies.length > 0
              ? `Found ${movies.length} movies for "${query}"`
              : query
                ? `No movies found for "${query}"`
                : 'Enter a search term'}
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {[...Array(12)].map((_, idx) => (
            <div key={idx} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl w-full aspect-[2/3]" style={{ height: '24rem' }}></div>
              <div className="mt-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            !loading && query && (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-muted">No movies found for "{query}".</p>
                <p className="text-muted">Try searching for different keywords.</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}

export default SearchContent