import { tmdb } from '../constants/tmdb';
import { Movie } from '../types/movie';

// Define interfaces for TMDB API responses
export interface TmdbMovie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  runtime?: number;
  genre_ids: number[];
  poster_path: string;
  backdrop_path: string;
  overview: string;
  popularity: number;
  adult: boolean;
  video: boolean;
}

export interface TmdbResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbGenresResponse {
  genres: TmdbGenre[];
}
    
// Map TMDB genre IDs to names
const genreMap: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

export const getGenreName = (genreId: number): string => {
  return genreMap[genreId] || 'Unknown';
};

export const getGenreNames = (genreIds: number[]): string[] => {
  return genreIds.map(id => getGenreName(id));
};


export const mapTmdbMovieToMovie = (tmdbMovie: TmdbMovie): Movie => {
  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    year: tmdbMovie.release_date ? parseInt(tmdbMovie.release_date.split('-')[0]) : new Date().getFullYear(),
    rating: tmdbMovie.vote_average,
    runtime: tmdbMovie.runtime || 120, // Default to 120 if not available
    genre: getGenreNames(tmdbMovie.genre_ids)[0] || 'Unknown', // Take first genre
    poster: tmdb.imageUrl(tmdbMovie.poster_path),
    description: tmdbMovie.overview || 'No description available',
    trending: tmdbMovie.popularity > 10 // Consider movies with popularity > 10 as trending
  };
};

// Service functions for TMDB API
export const tmdbService = {
  // Get popular movies using "/movie/popular" as an endpoint
  getPopularMovies: async (): Promise<TmdbMovie[]> => {
    try {
      const response: TmdbResponse = await tmdb.fetchFromEndpoint('/movie/popular');
      return response.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  // Get trending movies (today) using "/trending/movie/day" as an endpoint
  getTrendingMovies: async (): Promise<TmdbMovie[]> => {
    try {
      const response: TmdbResponse = await tmdb.fetchFromEndpoint('/trending/movie/day');
      return response.results;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },

  // Get top rated movies
  getTopRatedMovies: async (): Promise<TmdbMovie[]> => {
    try {
      const response: TmdbResponse = await tmdb.fetchFromEndpoint('/movie/top_rated');
      return response.results;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  },

  // Get upcoming movies
  getUpcomingMovies: async (): Promise<TmdbMovie[]> => {
    try {
      const response: TmdbResponse = await tmdb.fetchFromEndpoint('/movie/upcoming');
      return response.results;
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      throw error;
    }
  },

  // Get movie by ID
  getMovieById: async (id: number): Promise<TmdbMovie> => {
    try {
      const response: TmdbMovie = await tmdb.fetchFromEndpoint(`/movie/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching movie with ID ${id}:`, error);
      throw error;
    }
  },

  // Get detailed movie by ID (includes additional info like budget, revenue, etc.)
  getDetailedMovieById: async (id: number): Promise<any> => {
    try {
      const response: any = await tmdb.fetchFromEndpoint(`/movie/${id}?append_to_response=credits,videos,images,recommendations,similar`);
      return response;
    } catch (error) {
      console.error(`Error fetching detailed movie with ID ${id}:`, error);
      throw error;
    }
  },

  // Search movies
  searchMovies: async (query: string): Promise<TmdbMovie[]> => {
    try {
      const response: TmdbResponse = await tmdb.fetchFromEndpoint(`/search/movie?query=${encodeURIComponent(query)}`);
      return response.results;
    } catch (error) {
      console.error(`Error searching for movies with query "${query}":`, error);
      throw error;
    }
  },

  // Get similar movies by ID
  getSimilarMovies: async (id: number): Promise<TmdbMovie[]> => {
    try {
      const response: TmdbResponse = await tmdb.fetchFromEndpoint(`/movie/${id}/recommendations`);
      return response.results;
    } catch (error) {
      console.error(`Error fetching similar movies for ID ${id}:`, error);
      throw error;
    }
  }
};