import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios
  } = useAppContext();

  const suggestionPool = [
    "Milk", "Bread", "Rice", "Sugar", "Tea", "Coffee", "Fruits", "Vegetables",
    "Cold Drinks", "Snacks", "Butter", "Cheese", "Face Wash", "Moisturizer",
    "Sunscreen", "Body Lotion", "Shampoo", "Hair Oil", "Detergent", "Dish Soap",
    "Toilet Cleaner", "Hand Wash", "Tissues", "Floor Cleaner", "Diapers",
    "Baby Powder", "Toothpaste", "Perfume", "Deodorant"
  ];

  const generateSuggestions = () => {
    let shuffled = [...suggestionPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8).map((item) => `Search '${item}'...`);
  };

  const [placeholders, setPlaceholders] = useState(generateSuggestions());
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => {
        if (prev === placeholders.length - 1) {
          setPlaceholders(generateSuggestions());
          return 0;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [placeholders]);

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success("Logged out successfully");
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24 py-3 md:py-4 border-b border-green-200 bg-gradient-to-r from-white to-green-50 sticky top-0 z-40 shadow-sm">
      {/* Logo */}
      <NavLink
        to="/"
        onClick={() => setOpen(false)}
        className="flex items-center gap-2 group transition-all duration-300"
      >
        <div className="bg-primary p-2 rounded-xl shadow-md group-hover:bg-green-600 transition-colors">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <span className="font-black text-xl md:text-2xl tracking-tight text-gray-800">
          Drop<span className="text-primary">Basket</span>
        </span>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8 flex-1 mx-8">
        <NavLink
          to="/"
          className="text-gray-700 hover:text-primary transition font-medium text-sm lg:text-base whitespace-nowrap"
        >
          🏠 Home
        </NavLink>
        <NavLink
          to="/products"
          className="text-gray-700 hover:text-primary transition font-medium text-sm lg:text-base whitespace-nowrap"
        >
          🛍️ Grocery
        </NavLink>



        <NavLink
          to="/products/Fresh"
          className="text-gray-700 hover:text-primary transition font-medium text-sm lg:text-base whitespace-nowrap"
        >
          🍎 Fresh Fruit
        </NavLink>
        <NavLink
          to="/products"
          className="text-gray-700 hover:text-primary transition font-medium text-sm lg:text-base whitespace-nowrap"
        >
          🏷️ Offers
        </NavLink>
        <NavLink
          to="/contact"
          className="text-gray-700 hover:text-primary transition font-medium text-sm lg:text-base whitespace-nowrap"
        >
          📞 Contact
        </NavLink>

        {/* Enhanced Search Bar */}
        <div
          className="hidden lg:flex items-center gap-2 border-2 border-green-300 px-4 py-2.5 rounded-full 
          hover:border-primary hover:bg-green-50 transition-all duration-300 bg-white group relative overflow-hidden flex-1 max-w-xs"
        >
          <svg
            className="w-4 h-4 text-primary opacity-70 group-hover:opacity-100 transition flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="w-full bg-transparent outline-none text-sm relative z-10"
            type="text"
          />

          {searchQuery.length === 0 && (
            <div className="absolute left-12 overflow-hidden h-5 text-gray-400">
              <div
                className="transition-all duration-500"
                style={{
                  transform: `translateY(-${placeholderIndex * 20}px)`,
                }}
              >
                {placeholders.map((text, index) => (
                  <p key={index} className="text-xs h-5 leading-5 whitespace-nowrap">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Cart Icon - Always Visible */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer group transition hover:scale-110"
        >
          <svg
            className="w-6 h-6 text-gray-700 group-hover:text-primary transition"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {getCartCount() > 0 && (
            <button className="absolute -top-3 -right-2 text-xs font-bold text-white bg-gradient-to-r from-primary to-green-600 w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
              {getCartCount()}
            </button>
          )}
        </div>

        {/* Login/Profile - Desktop */}
        <div className="hidden sm:block">
          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="px-4 md:px-6 py-2 bg-gradient-to-r from-primary to-green-600 hover:from-green-700 hover:to-green-700 text-white rounded-full font-semibold text-sm transition transform hover:scale-105 active:scale-95"
            >
              Login
            </button>
          ) : (
            <div className="group relative">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-primary to-green-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div className="hidden group-hover:block absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-green-100 overflow-hidden w-40 z-50">
                <div className="p-3 border-b border-green-100">
                  <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <button
                  onClick={() => navigate("/my-orders")}
                  className="w-full text-left py-2 px-3 hover:bg-green-50 text-gray-700 text-sm transition"
                >
                  📦 My Orders
                </button>
                <button
                  onClick={logout}
                  className="w-full text-left py-2 px-3 hover:bg-red-50 text-red-600 font-medium text-sm transition border-t border-green-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="md:hidden p-2 hover:bg-green-100 rounded-lg transition"
        >
          {open ? (
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-b border-green-200 py-4 flex flex-col gap-2 px-4 md:hidden z-50">
          {/* Mobile Search */}
          <div className="flex items-center gap-2 border-2 border-green-300 px-3 py-2 rounded-lg bg-green-50 mb-3">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder="Search products..."
              className="w-full bg-transparent outline-none text-sm"
              type="text"
            />
          </div>

          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="py-2 px-3 hover:bg-green-50 rounded text-gray-700 font-medium"
          >
            🏠 Home
          </NavLink>

          <NavLink
            to="/products"
            onClick={() => setOpen(false)}
            className="py-2 px-3 hover:bg-green-50 rounded text-gray-700 font-medium"
          >
            🛍️ Grocery
          </NavLink>



          <NavLink
            to="/products/fresh"
            onClick={() => setOpen(false)}
            className="py-2 px-3 hover:bg-green-50 rounded text-gray-700 font-medium"
          >
            🍎 Fresh Fruit
          </NavLink>

          <NavLink
            to="/products"
            onClick={() => setOpen(false)}
            className="py-2 px-3 hover:bg-green-50 rounded text-gray-700 font-medium"
          >
            🏷️ Offers
          </NavLink>

          {user && (
            <NavLink
              to="/my-orders"
              onClick={() => setOpen(false)}
              className="py-2 px-3 hover:bg-green-50 rounded text-gray-700 font-medium"
            >
              📦 My Orders
            </NavLink>
          )}

          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="py-2 px-3 hover:bg-green-50 rounded text-gray-700 font-medium"
          >
            📞 Contact
          </NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="py-2 px-3 mt-2 bg-gradient-to-r from-primary to-green-600 text-white rounded-lg font-semibold text-sm transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="py-2 px-3 mt-2 bg-red-500 text-white rounded-lg font-semibold text-sm transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
