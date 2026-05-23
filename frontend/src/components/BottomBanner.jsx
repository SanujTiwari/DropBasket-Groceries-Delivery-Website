import React from "react";
import { features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-24 px-4 md:px-8 lg:px-16 xl:px-24">
      {/* CSS-driven Background with Ambient Glows */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-green-950 px-8 py-16 md:px-16 md:py-20 shadow-2xl border border-slate-800">
        
        {/* Floating background glowing blobs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-emerald-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Brand Stat */}
          <div className="lg:col-span-5 flex flex-col items-start text-left gap-6">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4.5 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-sm">
              Our Promise 🌿
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              Why We are the <span className="text-gradient bg-gradient-to-r from-emerald-400 to-teal-300 font-serif italic">Best in Town</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
              We started DropBasket with a simple goal: to make grocery shopping seamless, fast, and fresh. Here is how we ensure you get the absolute best experience every time.
            </p>
            
            {/* Simple stats showcase */}
            <div className="flex gap-8 mt-4 pt-6 border-t border-slate-800 w-full">
              <div>
                <p className="text-3xl font-black text-white tracking-tight">30 Min</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Average Delivery</p>
              </div>
              <div className="border-l border-slate-800"></div>
              <div>
                <p className="text-3xl font-black text-white tracking-tight">10k+</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Right Column: Features Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group flex flex-col gap-4 p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900 transition-all duration-300 shadow-lg hover:shadow-emerald-950/20"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-400 transition-all duration-300 group-hover:scale-115">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-6 h-6 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
                  />
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
