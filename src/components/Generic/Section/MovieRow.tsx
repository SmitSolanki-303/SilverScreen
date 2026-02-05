'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { MovieCard } from '../Card/MovieCard';
import { tmdb } from '@/lib/constants/tmdb';

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

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

const MovieRow = ({ title, movies, onMovieClick }: MovieRowProps) => {

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4 ml-4">{title}</h2>
      <Swiper
        className="movie-row-swiper"
        modules={[Navigation]}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
        grabCursor={true}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
              <MovieCard movie={movie}  />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieRow;