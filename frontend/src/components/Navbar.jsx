import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const {
    user,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    logout
  } = useAppContext();

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);

  return (
    <div className="flex flex-col w-full bg-white z-40 sticky top-0 border-b border-gray-100 shadow-sm transition-all duration-300">

      {/* Top Main Bar - Slimmer py-2 md:py-3 */}
      <nav className="flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24 py-2 md:py-2.5 gap-6 md:gap-10">

        {/* Logo Section (navigates to seller dashboard for admins) */}
        <div
          onClick={() => {
            setOpen(false);
            if (user?.role === 'admin') navigate('/seller');
            else navigate('/');
          }}
          className="flex items-center gap-2 group transition-all duration-300 flex-shrink-0 cursor-pointer"
        >
          <div className="bg-primary p-1.5 md:p-2 rounded-xl shadow-lg group-hover:bg-primary-dark transition-colors border border-green-600/20">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="font-black text-lg md:text-xl tracking-tighter text-gray-800 uppercase">
            Drop<span className="text-primary italic">Basket</span>
          </span>
        </div>

        {/* Global Search Bar - Centered */}
        <div className="hidden lg:flex items-center gap-2 border-2 border-slate-100 px-5 py-2 rounded-full 
          hover:border-slate-300 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/5 transition-all duration-500 bg-slate-50 relative">
          <svg
            className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            placeholder="Search for fresh groceries..."
            className="w-full bg-transparent outline-none text-sm font-bold placeholder:text-gray-400 text-gray-700"
            type="text"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">

          {/* Account Icon */}
          <div className="hidden sm:block">
            {!user ? (
              <button
                onClick={() => setShowUserLogin(true)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            ) : (
              <div className="group relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-green-700 flex items-center justify-center text-white font-bold text-base cursor-pointer shadow-md transform transition active:scale-95 group-hover:ring-2 group-hover:ring-primary/20 group-hover:ring-offset-2">
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>
                {/* Dropdown Menu */}
                <div className="hidden group-hover:block absolute top-[115%] right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-64 z-50 animate-slideUp">
                  <div className="p-6 border-b border-gray-50 bg-gradient-to-br from-gray-50 to-white">
                    <p className="font-black text-gray-800 text-base truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 font-bold tracking-wider truncate uppercase mt-0.5">{user.email}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    {user.role === 'admin' && (
                      <button onClick={() => navigate("/seller")} className="w-full text-left py-3 px-4 hover:bg-primary/5 rounded-xl text-primary text-sm transition-all duration-200 flex items-center gap-3 group/btn font-bold">
                        <span className="text-xl opacity-60 group-hover/btn:opacity-100 transition group-hover/btn:scale-110">📊</span>
                        <div className="flex flex-col">
                          <span>Seller Dashboard</span>
                          <span className="text-[10px] text-gray-400 font-medium">Manage products & orders</span>
                        </div>
                      </button>
                    )}
                    <button onClick={() => navigate("/my-orders")} className="w-full text-left py-3 px-4 hover:bg-primary/5 rounded-xl text-gray-700 text-sm transition-all duration-200 flex items-center gap-3 group/btn font-bold">
                      <span className="text-xl opacity-60 group-hover/btn:opacity-100 transition group-hover/btn:scale-110">📦</span>
                      <div className="flex flex-col">
                        <span>My Orders</span>
                        <span className="text-[10px] text-gray-400 font-medium">Track your groceries</span>
                      </div>
                    </button>
                    <button onClick={() => navigate("/settings")} className="w-full text-left py-3 px-4 hover:bg-primary/5 rounded-xl text-gray-700 text-sm transition-all duration-200 flex items-center gap-3 group/btn font-bold">
                      <span className="text-xl opacity-60 group-hover/btn:opacity-100 transition group-hover/btn:scale-110">⚙️</span>
                      <div className="flex flex-col">
                        <span>Settings</span>
                        <span className="text-[10px] text-gray-400 font-medium">Manage your account</span>
                      </div>
                    </button>
                    <button onClick={() => navigate("/faq")} className="w-full text-left py-3 px-4 hover:bg-primary/5 rounded-xl text-gray-700 text-sm transition-all duration-200 flex items-center gap-3 group/btn font-bold">
                      <span className="text-xl opacity-60 group-hover/btn:opacity-100 transition group-hover/btn:scale-110">❓</span>
                      <div className="flex flex-col">
                        <span>Help Center</span>
                        <span className="text-[10px] text-gray-400 font-medium">Get support 24/7</span>
                      </div>
                    </button>
                  </div>
                  <div className="p-2 bg-gray-50/50">
                    <button onClick={logout} className="w-full text-left py-3.5 px-4 hover:bg-red-50 rounded-xl text-red-600 font-black text-sm transition-all duration-200 flex items-center gap-3 group/logout">
                      <span className="text-xl group-hover/logout:scale-110 transition-transform">🚪</span>
                      <span>Logout Account</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon Only */}
          <button
            onClick={() => {
              if (!user) {
                setShowUserLogin(true);
              } else {
                navigate("/cart");
              }
            }}
            className="relative w-10 h-10 rounded-full bg-gradient-to-r from-primary to-green-600 text-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 group"
            aria-label="Open cart"
          >
            <svg className="w-5 h-5 transform group-hover:-rotate-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-white text-primary w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary font-black shadow-md">
                {getCartCount()}
              </span>
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
          >
            {open ? <span className="text-xl font-bold">✕</span> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>}
          </button>

        </div>
      </nav>

      {/* Sub Navbar - Centered with premium hover effects - Slimmer */}
      <div className="hidden lg:flex items-center justify-between px-16 xl:px-24 py-2 bg-slate-50/50 border-t border-gray-100 shadow-sm sticky top-[64px] md:top-[68px] z-40">
        {/* Left Utility Space */}
        <div className="w-[200px]"></div>

        <div className="flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {/* Main Navigation Links */}
          {user?.role !== 'admin' && (
            <NavLink to="/" className={({ isActive }) => `text-[17px] font-black tracking-tight transition-all relative py-2 px-1 hover:text-primary group ${isActive ? 'text-primary' : 'text-gray-800'}`}>
              Home
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          )}

          {user?.role !== "admin" && (
            <button
              onClick={() => {
                if (window.location.pathname === "/") {
                  document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
                } else {
                  navigate("/");
                  setTimeout(() => {
                    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }
              }}
              className="text-[17px] font-black tracking-tight text-gray-800 flex items-center gap-2 hover:text-primary transition-all group relative py-2 px-1"
            >
              Categories
              <svg className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
            </button>
          )}

          {user?.role !== "admin" && (
            <>
              <NavLink to="/products" className={({ isActive }) => `text-[17px] font-black tracking-tight transition-all relative py-2 px-1 hover:text-primary group ${isActive ? 'text-primary' : 'text-gray-800'}`}>
                Products
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
              </NavLink>

              <NavLink to="/deals" className={({ isActive }) => `text-[17px] font-black tracking-tight transition-all relative py-2 px-1 hover:text-primary group ${isActive ? 'text-primary' : 'text-gray-800'}`}>
                Deals & Offers
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </>
          )}
        </div>

        {/* Quick Help Utility */}
        <div className="flex items-center gap-6 w-[200px] justify-end">
          <NavLink to="/faq" className="text-xs font-black text-gray-400 hover:text-primary transition uppercase tracking-[0.2em] px-2 py-1 hover:scale-110 active:scale-95">FAQs</NavLink>
          <NavLink to="/contact" className="flex items-center gap-2 text-[14px] font-black text-white bg-slate-900 px-6 py-2.5 rounded-xl border border-gray-900 hover:bg-white hover:text-slate-900 transition-all duration-300 group cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.05)] active:scale-95">
            <span className="text-lg group-hover:animate-bounce">✉</span>
            <span className="tracking-tight">Support</span>
          </NavLink>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-white z-50 flex flex-col p-6 gap-2 overflow-y-auto animate-fadeIn">
          <div className="flex items-center gap-3 border border-gray-200 px-5 py-4 rounded-2xl bg-gray-50 mb-4 focus-within:border-primary transition">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} placeholder="Search our store..." className="bg-transparent outline-none w-full text-base font-bold" />
          </div>
          {user?.role !== "admin" && (
            <>
              <NavLink to="/" onClick={() => setOpen(false)} className="px-8 py-5 hover:bg-primary/5 rounded-2xl text-gray-800 font-black text-2xl transition flex items-center justify-between group">
                <span className="group-hover:translate-x-2 transition-transform">Home</span>
                <span className="text-gray-300 group-hover:text-primary transition-colors">→</span>
              </NavLink>
              <button
                onClick={() => {
                  setOpen(false);
                  if (window.location.pathname === "/") {
                    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate("/");
                    setTimeout(() => {
                      document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }
                }}
                className="px-8 py-5 hover:bg-primary/5 rounded-2xl text-gray-800 font-black text-2xl transition flex items-center justify-between group"
              >
                <span className="group-hover:translate-x-2 transition-transform">Categories</span>
                <span className="text-gray-300 group-hover:text-primary transition-colors">→</span>
              </button>
              <NavLink to="/products" onClick={() => setOpen(false)} className="px-8 py-5 hover:bg-primary/5 rounded-2xl text-gray-800 font-black text-2xl transition flex items-center justify-between group">
                <span className="group-hover:translate-x-2 transition-transform">Products</span>
                <span className="text-gray-300 group-hover:text-primary transition-colors">→</span>
              </NavLink>
              <NavLink to="/deals" onClick={() => setOpen(false)} className="px-8 py-5 hover:bg-primary/10 rounded-2xl text-gray-800 font-black text-2xl transition flex items-center justify-between group">
                <span className="group-hover:translate-x-2 transition-transform">Deals & Offers</span>
                <span className="text-gray-300 group-hover:text-primary transition-colors">→</span>
              </NavLink>
            </>
          )}
          <NavLink to="/faq" onClick={() => setOpen(false)} className="px-8 py-5 hover:bg-primary/5 rounded-2xl text-gray-800 font-black text-2xl transition flex items-center justify-between group">
            <span className="group-hover:translate-x-2 transition-transform">FAQs</span>
            <span className="text-gray-300 group-hover:text-primary transition-colors">→</span>
          </NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)} className="mx-6 mt-8 px-8 py-6 bg-[#1a202c] rounded-[2rem] text-white font-black text-2xl transition-all flex items-center justify-center gap-4 active:scale-95 shadow-2xl">
            <span>✉</span>
            <span>Support</span>
          </NavLink>

          <div className="mt-8 flex flex-col gap-4">
            {user?.role === 'admin' && (
              <button onClick={() => { navigate("/seller"); setOpen(false); }} className="w-full bg-[#1a202c] text-white font-black py-5 rounded-3xl shadow-xl flex items-center justify-center gap-3 text-lg">
                <span>📊</span>
                <span>Seller Dashboard</span>
              </button>
            )}
            {!user ? (
              <button onClick={() => { setShowUserLogin(true); setOpen(false); }} className="w-full bg-primary text-white font-black py-5 rounded-3xl shadow-2xl shadow-green-200 text-lg">Login / Sign Up</button>
            ) : (
              <button onClick={logout} className="w-full bg-red-50 text-red-600 font-black py-5 rounded-3xl border border-red-100 text-lg">Sign Out</button>
            )}
            <button onClick={() => { navigate("/cart"); setOpen(false); }} className="w-full border-2 border-primary text-primary font-black py-5 rounded-3xl transition active:scale-95 text-lg">Open Shopping Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
