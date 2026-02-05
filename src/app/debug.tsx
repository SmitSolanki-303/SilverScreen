import { getPopularMovies, getTrendingMovies } from "@/lib/data-fetching";
import { Movie } from "@/lib/types/movie";

export default async function DebugPage() {
  try {
    const popularMovies = await getPopularMovies();
    const trendingMovies = await getTrendingMovies();

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Debug Page - TMDB Data</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Popular Movies Count: {popularMovies.length}</h2>
          {popularMovies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularMovies.slice(0, 5).map((movie) => (
                <div key={movie.id} className="border p-4 rounded">
                  <h3 className="font-bold">{movie.title}</h3>
                  <p>Year: {movie.year}</p>
                  <p>Rating: {movie.rating}</p>
                  <p>Genre: {movie.genre}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No popular movies found</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Trending Movies Count: {trendingMovies.length}</h2>
          {trendingMovies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trendingMovies.slice(0, 5).map((movie) => (
                <div key={movie.id} className="border p-4 rounded">
                  <h3 className="font-bold">{movie.title}</h3>
                  <p>Year: {movie.year}</p>
                  <p>Rating: {movie.rating}</p>
                  <p>Genre: {movie.genre}</p>
                  <p>Trending: {movie.trending ? 'Yes' : 'No'}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No trending movies found</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in debug page:", error);
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Debug Page - Error</h1>
        <p>Error occurred: {(error as Error).message}</p>
      </div>
    );
  }
}