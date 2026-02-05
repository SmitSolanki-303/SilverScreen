// Movie type (id, title, poster, backdrop, rating)

export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  runtime: number;
  genre: string;
  poster: string;
  description: string;
  trending?: boolean;
}
