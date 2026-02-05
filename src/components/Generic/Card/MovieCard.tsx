import { Star, Calendar, Clock, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Movie {
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

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div
        onClick={onClick}
        className="relative cursor-pointer movie-card-hover hover:scale-[1.03] transition-transform duration-300"
      >
        {/* Poster Container */}
        <div className="relative w-fit overflow-hidden rounded-2xl bg-card border border-border/30">
          {/* Image */}
          <div className="relative overflow-hidden">
            <Image
              src={movie.poster}
              alt={movie.title}
              loading='lazy'
              height={600}
              width={400}
              className="object-cover transition-transform duration-500 hover:scale-110"
            />

            {/* Gradient Overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" /> */}

            {/* Play Button Overlay */}
            {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-accent/50">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
            </div> */}
          </div>

          {/* Info Section */}
          <div className="p-4">
            {/* Rating Badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/80 backdrop-blur-sm">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm text-white">{movie.rating.toFixed(1)}</span>
            </div>

            {/* Title */}
            <h3 className="mb-2 line-clamp-2 min-h-[3rem]">
              {movie.title}
            </h3>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{movie.runtime}m</span>
              </div>
            </div>

            {/* Genre Tag */}
            <div className="mt-3">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs border border-accent/20">
                {movie.genre}
              </span>
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl bg-gradient-to-br from-accent/30 to-primary/20" />
      </div>
    </Link>
  );
}