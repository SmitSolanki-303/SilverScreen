import React from 'react';
import { getGenreName } from '@/lib/services/tmdbService';
import { getMovieById } from '@/lib/data-fetching';
import Link from 'next/link';
import { tmdbService } from '@/lib/services/tmdbService';

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface SimilarMovie {
  id: number;
  title: string;
  year: number;
  rating: number;
  runtime: number;
  genre: string;
  poster: string;
  description: string;
  trending: boolean;
}

// Function to fetch movie details from TMDB API
const fetchMovieDetails = async (id: string): Promise<MovieDetails | null> => {
  // Validate the ID before making the API call
  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    console.error(`Invalid movie ID: ${id}`);
    return null;
  }

  try {
    console.log(`[MovieDetailPage] Fetching movie details for ID: ${numericId}`);
    const movie = await getMovieById(numericId);

    if (!movie || !movie.id) {
      console.error(`[MovieDetailPage] No movie data returned for ID ${numericId}`);
      return null;
    }

    console.log(`[MovieDetailPage] Successfully fetched movie: ${movie.title}`);

    // Map the detailed movie response to our MovieDetails interface
    return {
      adult: movie.adult || false,
      backdrop_path: movie.backdrop_path || '',
      belongs_to_collection: movie.belongs_to_collection || null,
      budget: movie.budget || 0,
      genres: movie.genres || [],
      homepage: movie.homepage || '',
      id: movie.id,
      imdb_id: movie.imdb_id || '',
      original_language: movie.original_language || '',
      original_title: movie.original_title || movie.title,
      overview: movie.overview || 'No description available',
      popularity: movie.popularity || 0,
      poster_path: movie.poster_path || '',
      production_companies: movie.production_companies || [],
      production_countries: movie.production_countries || [],
      release_date: movie.release_date || '',
      revenue: movie.revenue || 0,
      runtime: movie.runtime || 0,
      spoken_languages: movie.spoken_languages || [],
      status: movie.status || '',
      tagline: movie.tagline || '',
      title: movie.title || 'Unknown Title',
      video: movie.video || false,
      vote_average: movie.vote_average || 0,
      vote_count: movie.vote_count || 0
    };
  } catch (error) {
    console.error(`[MovieDetailPage] Error fetching movie details for ID ${id}:`, error);
    return null;
  }
};

const MovieDetailPage = async ({ params }: { params: { id: string } }) => {
  // Await the params if it's a Promise (Next.js edge case)
  const resolvedParams = await Promise.resolve(params);
  const movieId = resolvedParams.id;

  // Validate the ID parameter
  if (!movieId || isNaN(Number(movieId))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Invalid Movie ID</h1>
          <p className="text-xl">The movie ID provided is not valid.</p>
          <Link href="/" className="text-blue-400 hover:underline mt-4 inline-block">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const movie = await fetchMovieDetails(movieId);

  // Handle case where movie data couldn't be fetched
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
          <p className="text-xl mb-4">Unable to load movie details. The movie may not exist or there was an error fetching the data.</p>
          <Link href="/" className="text-blue-400 hover:underline mt-4 inline-block">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  // Fetch similar movies
  let similarMovies: SimilarMovie[] = [];
  try {
    const rawSimilarMovies = await tmdbService.getSimilarMovies(parseInt(movieId));
    similarMovies = rawSimilarMovies.map(rawMovie => ({
      id: rawMovie.id,
      title: rawMovie.title,
      year: rawMovie.release_date ? parseInt(rawMovie.release_date.split('-')[0]) : new Date().getFullYear(),
      rating: rawMovie.vote_average,
      runtime: rawMovie.runtime || 120,
      genre: rawMovie.genre_ids && rawMovie.genre_ids.length > 0 ? getGenreName(rawMovie.genre_ids[0]) : 'Unknown',
      poster: rawMovie.poster_path ? `https://image.tmdb.org/t/p/w500${rawMovie.poster_path}` : '/placeholder.svg',
      description: rawMovie.overview || 'No description available',
      trending: rawMovie.popularity > 10
    }));
  } catch (error) {
    console.error(`Error fetching similar movies for ID ${movieId}:`, error);
    similarMovies = [];
  }

  // Format release date
  const releaseDate = new Date(movie.release_date);
  const releaseYear = releaseDate.getFullYear();

  // Format genres as a string
  const genreString = movie.genres.map(genre => genre.name).join(', ');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[500px]">
        {movie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-gray-800 w-full h-full flex items-center justify-center">
            <span className="text-gray-500">Backdrop Image Unavailable</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
            <div className="flex-shrink-0">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-64 h-96 object-cover rounded-lg shadow-xl"
                />
              ) : (
                <div className="bg-gray-800 w-64 h-96 flex items-center justify-center rounded-lg shadow-xl">
                  <span className="text-gray-500">Poster Unavailable</span>
                </div>
              )}
            </div>

            <div className="grow">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title} ({releaseYear})</h1>

              {movie.tagline && (
                <p className="italic text-gray-300 mb-4">"{movie.tagline}"</p>
              )}

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="bg-yellow-600 text-black px-2 py-1 rounded font-semibold">
                  ⭐ {movie.vote_average.toFixed(1)}/10
                </span>
                <span>{movie.runtime} min</span>
                <span>{genreString}</span>
              </div>

              <p className="text-lg mb-6 max-w-3xl">{movie.overview}</p>

              <div className="flex gap-4">
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  ▶️ Watch Trailer
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  + Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Movie Facts Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Movie Facts</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-400 mb-1">Status</h3>
              <p>{movie.status}</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-400 mb-1">Release Date</h3>
              <p>{releaseDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-400 mb-1">Runtime</h3>
              <p>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-400 mb-1">Budget</h3>
              <p>${movie.budget.toLocaleString()}</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-400 mb-1">Revenue</h3>
              <p>${movie.revenue.toLocaleString()}</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-400 mb-1">Original Language</h3>
              <p>{movie.spoken_languages.find(lang => lang.iso_639_1 === movie.original_language)?.name || movie.original_language}</p>
            </div>
          </div>
        </section>

        {/* Production Companies */}
        {movie.production_companies && movie.production_companies.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Production Companies</h2>

            <div className="flex flex-wrap gap-4">
              {movie.production_companies.map((company) => (
                <div key={company.id} className="bg-gray-800 p-4 rounded-lg flex items-center">
                  {company.logo_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      className="h-12 mr-3"
                    />
                  )}
                  <span>{company.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Trailer Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Trailer</h2>
          <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block bg-red-600 p-4 rounded-full cursor-pointer hover:bg-red-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="mt-4 text-gray-400">Trailer video would appear here</p>
            </div>
          </div>
        </section>

        {/* More Like This */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">More Like This</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {similarMovies.length > 0 ? (
              similarMovies.map((similarMovie) => (
                <Link key={similarMovie.id} href={`/movie/${similarMovie.id}`}>
                  <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="w-full aspect-[2/3] bg-gray-700 flex items-center justify-center">
                      {similarMovie.poster ? (
                        <img 
                          src={similarMovie.poster} 
                          alt={similarMovie.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold truncate">{similarMovie.title}</h3>
                      <p className="text-sm text-gray-400">{similarMovie.year}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-500 mr-1">⭐</span>
                        <span className="text-sm">{similarMovie.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="col-span-full text-center py-8 text-gray-400">No similar movies found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MovieDetailPage