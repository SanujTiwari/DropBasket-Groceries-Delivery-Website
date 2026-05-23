import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const words = ["Fresh", "Organic", "Premium", "Healthy"];

const MainBanner = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-12 mb-16 animate-fadeIn pt-2">
      {/* Hero Container */}
      <div className="relative w-full min-h-[420px] lg:min-h-[520px] bg-gradient-hero rounded-[2.5rem] flex flex-col md:flex-row items-start justify-between px-6 md:px-12 lg:px-20 pt-10 md:pt-14 pb-12 overflow-hidden border border-emerald-100/60">

        {/* Background Decorative Blobs */}
        <div className="hero-blob-1 -top-32 -right-32 opacity-60"></div>
        <div className="hero-blob-2 -bottom-24 -left-24 opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-50/30 rounded-full blur-3xl"></div>

        {/* Left Text Content */}
        <div className="w-full md:w-[55%] flex flex-col items-start gap-5 z-10 pt-2">
          
          {/* Trust Badges Row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-full px-4 py-2 shadow-sm">
              <div className="flex text-amber-400 text-sm">
                {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <span className="text-[11px] font-bold text-gray-600">4.9 (2.4k Reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">10K+ Active Users</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-[4.25rem] font-black text-gray-900 leading-[1] tracking-tight">
            <span className="inline-block overflow-hidden h-[1.1em] align-bottom">
              <span 
                className={`inline-block text-gradient-warm transition-all duration-400 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
              >
                {words[wordIndex]}
              </span>
            </span>
            {" "}Groceries{" "}
            <br className="hidden sm:block" />
            <span className="text-gray-900">Delivered to</span>
            <br />
            <span className="text-gradient-primary">Your Doorstep</span>
          </h1>

          {/* Description */}
          <p className="text-gray-500 text-sm md:text-base max-w-lg leading-relaxed font-medium">
            Get farm-fresh fruits, daily essentials, and premium quality groceries delivered fast and hassle-free. Your satisfaction, our promise.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Link
              to="/products"
              className="group px-8 py-3.5 md:px-10 md:py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-emerald-200/60 text-sm md:text-base flex items-center gap-2"
            >
              Shop Now
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
            <Link
              to="/deals"
              className="px-8 py-3.5 md:px-10 md:py-4 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-2xl transition-all duration-300 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/30 active:scale-95 text-sm md:text-base shadow-sm"
            >
              View Deals
            </Link>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="relative w-full md:w-[45%] flex justify-center items-center mt-8 md:mt-0 h-[280px] md:h-[440px]">
          <div className="relative z-10 w-full h-full flex justify-center items-center">
            <div className="w-full h-full relative group">
              {/* Main Image Container */}
              <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-900/10 border-4 border-white transform transition-transform duration-700 hover:rotate-1 hover:scale-[1.02] bg-white">
                <img
                  src={assets.scooter_rider_user}
                  alt="Fresh Delivery"
                  className="w-full h-full object-cover object-[70%_50%] scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
              </div>

              {/* Decorative Shadow */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[75%] h-6 bg-black/5 rounded-[100%] blur-xl -z-10"></div>
            </div>
          </div>

          {/* Floating Badge - Delivery Time */}
          <div className="absolute -top-2 -right-2 md:top-2 md:-right-4 glass-dark p-3 md:p-4 rounded-2xl shadow-xl flex flex-col items-center gap-1 animate-fadeInUp z-20">
            <div className="bg-coral/20 p-2 rounded-xl text-[#FF6B6B] font-black text-lg md:text-xl" style={{backgroundColor: 'rgba(255,107,107,0.15)', color: '#FF6B6B'}}>30</div>
            <div className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.15em] text-white/70 text-center leading-tight">Min<br />Delivery</div>
          </div>

          {/* Floating Badge - Track Order */}
          <div className="absolute -bottom-2 -left-2 md:bottom-4 md:-left-4 glass px-4 md:px-5 py-2.5 md:py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-fadeInUp delay-200 z-20">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl flex items-center justify-center text-lg shadow-md">🛵</div>
            <div className="flex flex-col">
              <span className="text-[8px] md:text-[9px] font-bold uppercase text-gray-400 tracking-widest">Live</span>
              <span className="text-[11px] md:text-xs font-bold text-gray-800">Track Order</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <FeatureCard icon="🌿" title="100% Fresh" desc="Farm-picked daily" delay="delay-100" />
        <FeatureCard icon="⚡" title="30-Min Delivery" desc="Lightning fast" delay="delay-200" />
        <FeatureCard icon="💳" title="Secure Pay" desc="COD & online" delay="delay-300" />
        <FeatureCard icon="🛡️" title="Quality Promise" desc="Trusted by 10K+" delay="delay-400" />
      </div>
    </div>
  )
}

const FeatureCard = ({ icon, title, desc, delay }) => (
  <div className={`flex items-center gap-3 md:gap-4 group cursor-pointer p-4 md:p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-400 animate-fadeInUp ${delay}`}>
    <div className="w-11 h-11 md:w-13 md:h-13 rounded-xl bg-emerald-50 flex items-center justify-center text-xl md:text-2xl group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-400 shadow-sm border border-emerald-100 group-hover:border-emerald-600 flex-shrink-0">
      {icon}
    </div>
    <div className="flex flex-col min-w-0">
      <h4 className="font-bold text-gray-800 text-sm tracking-tight">{title}</h4>
      <p className="text-[10px] md:text-[11px] text-gray-400 font-medium mt-0.5">{desc}</p>
    </div>
  </div>
)

export default MainBanner
