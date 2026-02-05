'use client'

import React, { useState } from 'react';
import FeaturedMovie from './FeaturedMovie';
import HeroSectionSkeleton from '../Skeleton/HeroSectionSkeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  runtime: number;
  genre: string;
  poster: string;
  description: string;
  director?: string;
  cast?: string[];
  awards?: string;
  trending?: boolean;
}

interface HeroProps {
  movies: Movie[];
}

const Hero = ({ movies }: HeroProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Filter for trending movies or use all if none are trending
  const featuredMovies = movies.filter(movie => movie.trending) || movies;

  return (
    <div className="w-full relative group">
      {isLoading ? <HeroSectionSkeleton /> : (
        <>
          <Swiper
            className='mySwiper'
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: '.hero-swiper-button-next',
              prevEl: '.hero-swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              el: '.hero-swiper-pagination'
            }}
            modules={[Navigation, Pagination, EffectFade]}
            loop={true}
            autoplay={{ delay: 2000 }}
            fadeEffect={{ crossFade: true }}
            onSlideChangeTransitionStart={() => setIsLoading(false)}
            onSwiper={(swiper) => {
              // Set loading to false after the first slide is rendered
              setTimeout(() => setIsLoading(false), 500);
            }}
          >
            {featuredMovies.map((movie) => (
              <SwiperSlide key={movie.id} lazy={false}>
                <FeaturedMovie movieData={movie} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="hero-swiper-button-prev absolute left-4 top-1/2 z-10 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-accent hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="hero-swiper-button-next absolute right-4 top-1/2 z-10 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-accent hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Custom Pagination */}
          <div className="hero-swiper-pagination absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2"></div>

        </>
      )}


    </div>
  )
}

export default Hero