import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative overflow-hidden rounded-2xl shadow-lg'>
      {/* Desktop Banner */}
      <img 
        src={assets.main_banner_bg} 
        alt="banner" 
        className='w-full hidden sm:block h-96 md:h-auto object-cover' 
      />
      
      {/* Mobile Banner */}
      <img 
        src={assets.main_banner_bg_sm} 
        alt="banner mobile" 
        className='w-full sm:hidden h-64 object-cover' 
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center sm:items-start justify-end sm:justify-center pb-6 sm:pb-0 px-4 sm:pl-6 md:pl-12 lg:pl-20">
        
        {/* Premium Heading with Better Contrast */}
        <div className="backdrop-blur-sm sm:backdrop-blur-none bg-black/20 sm:bg-transparent rounded-xl sm:rounded-none p-4 sm:p-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold 
          text-center sm:text-left max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl
          leading-tight text-white sm:text-yellow-400 drop-shadow-lg sm:drop-shadow-xl">
            🌿 Fresh Groceries in 10 Minutes!
          </h1>
          
          <p className="text-xs sm:text-sm text-white/80 sm:text-yellow-200 mt-2 sm:mt-3">
            Fresh, Quality Products Delivered Fast
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 sm:mt-8 w-full sm:w-auto px-2 sm:px-0">
          
          {/* Shop Now Button */}
          <Link
            to="/products"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 
            bg-gradient-to-r from-primary to-green-600 hover:from-green-700 hover:to-green-700
            transition transform hover:scale-105 active:scale-95 rounded-lg text-white font-bold cursor-pointer shadow-lg"
          >
            <span>🛒 Shop Now</span>
            <svg className="w-5 h-5 transition group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          {/* Explore Deals Button - Hidden on Mobile */}
          <Link
            to="/products"
            className="group hidden sm:flex items-center gap-2 px-8 py-3 
            border-2 border-yellow-400 text-yellow-400 bg-white/10 backdrop-blur-sm
            rounded-lg hover:bg-yellow-400 hover:text-black hover:border-yellow-300
            transition duration-300 cursor-pointer font-bold shadow-lg"
          >
            ✨ Explore Deals
            <svg className="w-5 h-5 transition group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner
