import { tmdbService, mapTmdbMovieToMovie } from "./services/tmdbService";
import { Movie } from "./types/movie";

import { sampleMovies } from "./sample-data";

// Server-side data fetching functions

export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const tmdbMovies = await tmdbService.getPopularMovies();

    if (tmdbMovies.length === 0) {
      console.warn('No popular movies returned from TMDB, using sample data');
      return sampleMovies;
    }

    const mappedMovies = tmdbMovies.map(mapTmdbMovieToMovie);

    return mappedMovies;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    // Return fallback data during build time or when API fails
    return sampleMovies;
  }
};

export const getTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const tmdbMovies = await tmdbService.getTrendingMovies();

    if (tmdbMovies.length === 0) {
      console.warn('No trending movies returned from TMDB, using sample data');
      return sampleMovies;
    }

    const mappedMovies = tmdbMovies.map(mapTmdbMovieToMovie);

    return mappedMovies;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    // Return fallback data during build time or when API fails
    return sampleMovies;
  }
};

export const getTopRatedMovies = async (): Promise<Movie[]> => {
  try {
    const tmdbMovies = await tmdbService.getTopRatedMovies();
    return tmdbMovies.map(mapTmdbMovieToMovie);
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    // Return fallback data during build time or when API fails
    return sampleMovies;
  }
};
  
export const getUpcomingMovies = async (): Promise<Movie[]> => {
  try {
    const tmdbMovies = await tmdbService.getUpcomingMovies();
    return tmdbMovies.map(mapTmdbMovieToMovie);
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    // Return fallback data during build time or when API fails
    return sampleMovies;
  }
};

export const searchMovies = async (query: string) => {
  try {
    const tmdbMovies = await tmdbService.searchMovies(query);

    if (tmdbMovies.length === 0) {
      console.warn(`No movies found for query: ${query}`);
      return [];
    }

    const mappedMovies = tmdbMovies.map(mapTmdbMovieToMovie);

    return mappedMovies;
  } catch (error) {
    console.error("Error searching movies:", error);
    // Return empty array on error, but log for debugging
    return [];
  }
}