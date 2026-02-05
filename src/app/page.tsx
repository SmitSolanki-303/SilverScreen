import Hero from "@/components/Generic/Section/Hero";
import MovieRow from "@/components/Generic/Section/MovieRow";
import { getPopularMovies, getTrendingMovies, getUpcomingMovies } from "@/lib/data-fetching";
import { Movie } from "@/lib/types/movie";

export default async function Home() {
  // Fetched data of TMDB API from the server file "data-fetching"
  console.log('Starting to fetch data for homepage...');

  let popularMovies: Movie[] = [];
  let trendingMovies: Movie[] = [];
  let upcomingMovies: Movie[] = [];

  try {
    const [popularResult, trendingResult, upcomingResult] = await Promise.allSettled([
      getPopularMovies(),
      getTrendingMovies(),
      getUpcomingMovies()
    ]);

    // Handle the results individually
    if (popularResult.status === 'fulfilled') {
      popularMovies = popularResult.value;
    } else {
      console.error('Failed to fetch popular movies:', popularResult.reason);
      popularMovies = [];
    }

    if (trendingResult.status === 'fulfilled') {
      trendingMovies = trendingResult.value;
    } else {
      console.error('Failed to fetch trending movies:', trendingResult.reason);
      trendingMovies = [];
    }

    if (upcomingResult.status === 'fulfilled') {
      upcomingMovies = upcomingResult.value;
    } else {
      console.error('Failed to fetch upcoming movies:', upcomingResult.reason);
      upcomingMovies = [];
    }
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    // Fallback to empty arrays if there's a major error
    popularMovies = [];
    trendingMovies = [];
    upcomingMovies = [];
  }

  return (
    <>
      <div className='container mx-auto px-4 py-2'>
        <div className='flex flex-col justify-between'>
          <Hero movies={trendingMovies.slice(0, 5)} />
          <MovieRow title="Trending Now" movies={trendingMovies} />
          <MovieRow title="Popular Movies" movies={popularMovies} />
          <MovieRow title="Upcoming Movies" movies={upcomingMovies} />
        </div>
      </div>
    </>
  );
}