import React, { useState } from "react";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Subscribed successfully! Welcome to DropBasket 🌿");
    setEmail("");
  };

  return (
    <section className="relative mt-24 px-4 md:px-8 lg:px-16 xl:px-24">
      {/* Background container with gradient and glowing elements */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-tr from-emerald-950 via-emerald-900 to-teal-900 py-16 px-6 md:py-20 md:px-16 text-center shadow-2xl border border-emerald-800">
        
        {/* Floating gradient circles */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-teal-500/10 blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>

        {/* Central Glassmorphic Card */}
        <div className="relative max-w-3xl mx-auto glass-dark p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-xl">
          
          {/* Header */}
          <div className="flex flex-col items-center">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/25 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-6">
              Weekly Newsletter ✉️
            </span>
            
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight italic">
              Subscribe For <span className="text-gradient bg-gradient-to-r from-emerald-300 via-teal-200 to-green-300">Offers & Updates</span>
            </h2>

            <p className="text-emerald-100/70 max-w-lg mt-4 text-sm md:text-base font-bold opacity-80 leading-relaxed">
              Join the DropBasket family today. Get updates on exclusive organic arrivals, special deals, and healthy lifestyle tips sent directly to your inbox.
            </p>
          </div>

          {/* Form / Input Box */}
          <form 
            onSubmit={handleSubscribe} 
            className="flex flex-col sm:flex-row items-center justify-between mt-10 gap-3 max-w-lg mx-auto w-full"
          >
            <div className="relative flex-1 w-full">
              <input
                className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 outline-none px-6 py-4 rounded-2xl text-white placeholder:text-emerald-200/50 text-sm md:text-base border border-white/15 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 shadow-inner"
                placeholder="Enter your email address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black rounded-2xl py-4 px-8 active:scale-95 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Subscribe</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          {/* Spam promise */}
          <p className="text-[10px] text-emerald-200/40 uppercase tracking-widest font-black mt-6">
            🔒 No spam. Unsubscribe at any time.
          </p>

        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
