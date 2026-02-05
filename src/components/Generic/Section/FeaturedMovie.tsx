'use client'

import React from 'react'
import { Play, Info, Star } from "lucide-react";
import Image from 'next/image';


interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  runtime: number;
  genre: string;
  poster: string;
  description: string;
}

interface FeaturedMovieProps {
  movieData: Movie;
  // onPlayClick: () => void;
  // onInfoClick: () => void;
}


const FeaturedMovie = ({movieData: movie} : FeaturedMovieProps) => {
  return (
   <div className="relative w-full h-[70vh] min-h-125 overflow-hidden rounded-3xl mb-8">
      {/* Background Image */}
      <Image
        src={movie.poster}
        alt={movie.title}
        fill
        loading='lazy'
        className="absolute inset-0 w-full h-full object-cover"
      />


      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-end">
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-2xl">
            {/* Label */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
              <span className="text-sm uppercase tracking-wider text-primary">Featured Today</span>
            </div>

            {/* Title */}
            <h2 className="text-6xl mb-4 gradient-text leading-tight">
              {movie.title}
            </h2>

            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-lg">{movie.rating.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground">{movie.year}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{movie.runtime} min</span>
              <span className="text-muted-foreground">•</span>
              <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm border border-accent/30">
                {movie.genre}
              </span>
            </div>

            {/* Description */}
            <p className="text-lg text-foreground/80 mb-8 line-clamp-3 max-w-xl">
              {movie.description}
            </p>

            {/* Action Buttons */}
            {/* <div className="flex gap-4">
              <button
                onClick={onPlayClick}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-accent to-primary text-white shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/50 transition-all hover:scale-105"
              >
                <Play className="w-6 h-6" fill="white" />
                <span className="text-lg">Watch Trailer</span>
              </button>
              <button
                onClick={onInfoClick}
                className="flex items-center gap-3 px-8 py-4 rounded-full glass-effect border border-border/50 hover:bg-muted/50 transition-all"
              >
                <Info className="w-6 h-6" />
                <span className="text-lg">More Info</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl" />
    </div>
  )
}

export default FeaturedMovie