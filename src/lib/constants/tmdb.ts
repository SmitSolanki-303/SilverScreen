// base URL, image URL helper

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
const BASE_URL = `https://api.themoviedb.org/3`;
const IMG_URL = `https://image.tmdb.org/t/p`;

export const tmdb = {
  // Get API base URL
  baseUrl: BASE_URL,

  // Helper function that constructs image URLS
  imageUrl: (path: string, size: 'w300' | 'w500' | 'original' = 'w500') => {
    if (!path) return '/placeholder.svg'; // Return a placeholder if no path is provided
    return `${IMG_URL}/${size}${path}`;
  },

  // Expose API key
  apiKey: API_KEY,

  // Reusable fetch function for making the API calls
  fetchFromEndpoint: async (endpoint: string) => {
    // Re-read the API key for each request to ensure it's available at runtime
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    if (!apiKey || apiKey.trim() === '') {
      console.error('[tmdb] TMDB API key is not configured or is empty');
      throw new Error('TMDB API key is not configured or is empty');
    }

    // Generate the URL with the dynamic endpoint and API key
    const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${apiKey}`;
    
    console.log(`[tmdb] Fetching from endpoint: ${endpoint}`);

    try {
      // Using a timeout and retry mechanism to handle network issues
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Add user-agent header to avoid potential blocking by TMDB
          'User-Agent': 'Silver-Screen-App/1.0'
        },
        signal: controller.signal,
        // Reduce cache time and use force-cache for better reliability
        cache: 'force-cache',
        next: { revalidate: 300 } // Cache for 5 minutes (300 seconds) for fresher data
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        console.error(`[tmdb] Failed to fetch from ${endpoint}: ${res.status} ${res.statusText}`);
        throw new Error(`Failed to fetch from ${endpoint}: ${res.status} ${res.statusText}`);
      }

      // Return the JSON format
      const data = await res.json();
      console.log(`[tmdb] Successfully fetched data from ${endpoint}`);
      return data;
    } catch (error: any) {
      console.error(`[tmdb] Network error when fetching from ${endpoint}:`, error);

      // Check if it's a timeout or network error
      if (error.name === 'AbortError') {
        console.error('[tmdb] Request timed out');
        throw new Error('Request timed out while connecting to TMDB API');
      } else if (error.code === 'ECONNRESET' || error.message.includes('ECONNRESET')) {
        console.error('[tmdb] Connection was reset. This might be due to network restrictions or TMDB API being temporarily unavailable.');
        throw new Error('Connection to TMDB API was reset. Please check your network connection or try again later.');
      } else if (error.message?.includes('fetch failed')) {
        console.error('[tmdb] Fetch failed - this could be due to network issues or an invalid API endpoint');
        throw new Error('Failed to connect to TMDB API. Please verify your API key and network connection.');
      }

      if (!apiKey) {
        console.error('[tmdb] API Key is not set!');
      }

      throw error;
    }
  }
};