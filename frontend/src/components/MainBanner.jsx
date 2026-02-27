import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className="flex flex-col gap-10 mb-20 animate-fadeIn pt-2">
      {/* Hero Container */}
      <div className="relative w-full min-h-[400px] lg:min-h-[500px] bg-slate-50/30 rounded-[3rem] flex flex-col md:flex-row items-start justify-between px-6 md:px-12 lg:px-20 pt-8 md:pt-12 lg:pt-14 pb-10 overflow-hidden border border-slate-100/50">

        {/* Background Decorative Blobs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50"></div>

        {/* Left Text Content */}
        <div className="w-full md:w-[60%] flex flex-col items-start gap-4 md:gap-5 z-10 pt-2">
          <div className="flex items-center gap-3">
            <div className="flex text-primary text-lg">
              {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
            </div>
            <span className="text-xs font-black text-gray-800 tracking-tight">4.9 (1.2k Reviews)</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#1a202c] leading-[0.95] tracking-tighter">
            Fresh <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent italic">Groceries</span><br />
            Delivered to Your<br />
            Doorstep
          </h1>

          <p className="text-gray-500 text-sm md:text-base max-w-lg leading-relaxed font-bold opacity-80">
            Get farm-fresh fruits, daily essentials, and premium quality groceries delivered fast and hassle-free. Your satisfaction is our priority.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/products"
              className="px-8 py-3.5 md:px-10 md:py-4 bg-primary hover:bg-primary-dark text-white font-black rounded-full transition-all duration-300 transform hover-premium hover-glow active:scale-95 shadow-2xl shadow-green-200 text-base md:text-lg text-center"
            >
              Shop Now
            </Link>
            <Link
              to="/products"
              className="px-8 py-3.5 md:px-10 md:py-4 bg-white border-2 border-slate-200 text-gray-700 font-black rounded-full transition-all duration-300 hover:border-primary hover:text-primary active:scale-95 text-base md:text-lg text-center shadow-sm"
            >
              Explore Categories
            </Link>
          </div>
        </div>

        {/* Right Hero Image (Scooter Rider) - Cleaned up to hide background/extra text */}
        <div className="relative w-full md:w-[40%] flex justify-center items-center mt-10 md:mt-4 h-[300px] md:h-[450px]">
          <div className="relative z-10 w-full h-full flex justify-center items-center">
            <div className="w-full h-full relative group perspective-1000">
              {/* Masked Image Container to crop unwanted left text from the asset */}
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-4 border-white transform transition-transform duration-700 hover:rotate-1 hover:scale-[1.02] bg-white">
                <img
                  src={assets.scooter_rider_user}
                  alt="Fresh Delivery"
                  className="w-full h-full object-cover object-[70%_50%] scale-110"
                />
                {/* Soft Vignette to blend edges */}
                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(255,255,255,0.2)] pointer-events-none"></div>
              </div>

              {/* Decorative Bottom Shadow */}
              <div className="absolute -bottom-6 left-1/2 -track-x-1/2 w-[80%] h-8 bg-black/5 rounded-[100%] blur-xl -z-10"></div>
            </div>
          </div>

          {/* Floating UI Badges - Re-positioned to interact with the new image card */}
          <div className="absolute -top-4 -right-4 bg-[#1a202c] backdrop-blur-md p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/10 flex flex-col items-center gap-1 animate-slideUp z-20">
            <div className="bg-[#ff3838]/20 p-2 rounded-xl md:rounded-2xl text-[#ff3838] font-black text-lg md:text-xl font-black">30</div>
            <div className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-white/60 text-center leading-tight">Minimum<br />Delivery</div>
          </div>

          <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md px-4 md:px-5 py-2.5 md:py-3.5 rounded-[1.25rem] md:rounded-[1.75rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/50 flex items-center gap-3 animate-slideInLeft delay-300 z-20">
            <div className="w-9 h-9 md:w-11 md:h-11 bg-orange-400 rounded-lg md:rounded-xl flex items-center justify-center text-lg md:text-xl shadow-lg shadow-orange-100">🛵</div>
            <div className="flex flex-col">
              <span className="text-[8px] md:text-[9px] font-black uppercase text-gray-400 tracking-widest">Fast Track</span>
              <span className="text-[11px] md:text-xs font-black text-gray-800">Track Order</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-8">
        <FeatureCard
          icon="🌿"
          title="100% Fresh"
          desc="Farm-picked daily for you"
        />
        <FeatureCard
          icon="🚚"
          title="Same-Day"
          desc="Delivery in your city"
        />
        <FeatureCard
          icon="💵"
          title="Secure Pay"
          desc="Cash on delivery option"
        />
        <FeatureCard
          icon="🛡️"
          title="Safe Choice"
          desc="Quality you can trust"
        />
      </div>
    </div>
  )
}

const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex items-center gap-4 group cursor-pointer p-4 rounded-2xl bg-white/80 border border-gray-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300">
    <div className="w-12 h-12 md:w-14 md:h-14 rounded-[1.15rem] bg-gray-50/80 flex items-center justify-center text-xl md:text-2xl group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm border border-gray-100/80">
      {icon}
    </div>
    <div className="flex flex-col">
      <h4 className="font-black text-gray-800 text-xs md:text-sm tracking-tight">{title}</h4>
      <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{desc}</p>
    </div>
  </div>
)

export default MainBanner
