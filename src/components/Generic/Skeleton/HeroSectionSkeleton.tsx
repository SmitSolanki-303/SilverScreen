import React from 'react'

const HeroSectionSkeleton = () => {
  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden rounded-3xl mb-8">
      {/* Skeleton Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse"></div>

      {/* Skeleton Content */}
      <div className="relative h-full flex items-end">
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-2xl">
            {/* Skeleton Label */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-gray-600 rounded-full animate-pulse" />
              <div className="h-3 w-24 bg-gray-600 rounded animate-pulse"></div>
            </div>

            {/* Skeleton Title */}
            <div className="h-16 bg-gray-600 rounded mb-4 animate-pulse"></div>

            {/* Skeleton Meta Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-700 animate-pulse">
                <div className="w-5 h-5 bg-gray-600 rounded-full" />
                <div className="h-5 w-10 bg-gray-600 rounded"></div>
              </div>
              <div className="h-4 w-12 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="px-3 py-1 rounded-full bg-gray-700 animate-pulse">
                <div className="h-4 w-16 bg-gray-600 rounded"></div>
              </div>
            </div>

            {/* Skeleton Description */}
            <div className="space-y-2 mb-8">
              <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded animate-pulse w-5/6"></div>
              <div className="h-4 bg-gray-700 rounded animate-pulse w-4/6"></div>
            </div>

            {/* Skeleton Action Buttons */}
            <div className="flex gap-4">
              <div className="h-14 w-48 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="h-14 w-40 bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSectionSkeleton