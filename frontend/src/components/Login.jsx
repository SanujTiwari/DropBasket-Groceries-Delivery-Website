import React, { useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { assets } from "../assets/assets";

const Login = () => {
  const {
    navigate,
    axios,
    setShowUserLogin,
    setUser,
    setIsSeller,
    setIsSellerLoading,
  } = useAppContext();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isAdminFlow = useMemo(() => role === "admin", [role]);

 const onSubmitHandler = async (event) => {
  event.preventDefault();
  setLoading(true);

  try {
    const url = isSignup
      ? "/auth/register"
      : isAdminFlow
        ? "/seller/login"
        : "/auth/login";

    const payload = isSignup
      ? { name, email, password, role }
      : { email, password };

    const { data } = await axios.post(url, payload);

    if (data.success) {
      setUser(data.user);
      setShowUserLogin(false);

      const shouldGoSeller = isAdminFlow || data.user.role === "admin";

      setIsSeller(shouldGoSeller);
      setIsSellerLoading(false);
      navigate(shouldGoSeller ? "/seller" : "/");

      toast.success(
        isSignup ? "Account created successfully" : "Login successful"
      );
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error(
      error.response?.data?.message || "Authentication failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/60 backdrop-blur-md p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-5xl h-[90vh] md:h-[760px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-gray-100"
      >
        {/* Close Button */}
        <button
          onClick={() => setShowUserLogin(false)}
          className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/90 hover:bg-white border border-gray-100 shadow-sm flex items-center justify-center text-xl font-black text-gray-700 transition hover:scale-110 active:scale-95 z-20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Branding Side */}
        <div className="hidden md:flex w-1/2 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 to-primary/90 z-10"></div>
          <img
            src={assets.organic_vegitable_image}
            className="absolute w-full h-full object-cover scale-110 animate-pulse-slow opacity-40"
            alt="Organic Vegetables"
          />
          <div className="p-12 text-white relative z-20 flex flex-col h-full">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] self-start">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              Freshness Delivered Fast
            </div>

            <div className="mt-auto">
              <h2 className="text-6xl font-black leading-[0.9] tracking-tighter">
                Eat Fresh, <br />
                <span className="text-green-200">Live Better.</span>
              </h2>
              <p className="mt-6 text-white/80 font-medium leading-relaxed max-w-sm text-lg">
                Join thousands of happy customers getting farm-fresh groceries delivered to their doorstep in minutes.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-4">
                {[
                  { icon: "⚡", text: "15-Min Delivery" },
                  { icon: "🥬", text: "Organic Sourced" },
                  { icon: "🔒", text: "Secure Checkout" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/10 p-3 rounded-2xl">
                    <span className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">{item.icon}</span>
                    <span className="font-bold tracking-tight">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-slate-50/30">
          <div className="mb-8">
            <div className="w-12 h-1.5 bg-primary rounded-full mb-6"></div>
            <h3 className="text-4xl font-black tracking-tight text-gray-900">
              {isSignup ? (isAdminFlow ? "Admin Signup" : "Create Account") : (isAdminFlow ? "Admin Login" : "Welcome Back")}
            </h3>
            <p className="text-gray-500 font-medium mt-3 text-lg leading-snug">
              {isAdminFlow
                ? "Manage your store inventory and orders with ease."
                : "Your favorite groceries are just a login away."}
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            {/* Role Switcher */}
            <div className="flex gap-2 bg-gray-100 p-1.5 rounded-[1.25rem] border border-gray-200/60 shadow-inner">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`flex-1 py-3.5 rounded-xl font-black flex items-center justify-center gap-2 transition-all duration-300 ${role === "user"
                    ? "bg-white shadow-lg text-gray-900 scale-[1.02]"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                  }`}
              >
                <svg className="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM5 21a7 7 0 0114 0" />
                </svg>
                <span>Customer</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex-1 py-3.5 rounded-xl font-black flex items-center justify-center gap-2 transition-all duration-300 ${role === "admin"
                    ? "bg-white shadow-lg text-gray-900 scale-[1.02]"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                  }`}
              >
                <svg className="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Store Admin</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Name Input */}
              {isSignup && (
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl outline-none focus:border-primary focus:bg-white transition-all font-bold text-gray-800 placeholder:text-gray-400 shadow-sm group-hover:border-slate-300"
                    required
                  />
                </div>
              )}

              {/* Email Input */}
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl outline-none focus:border-primary focus:bg-white transition-all font-bold text-gray-800 placeholder:text-gray-400 shadow-sm group-hover:border-slate-300"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl outline-none focus:border-primary focus:bg-white transition-all font-bold text-gray-800 placeholder:text-gray-400 pr-20 shadow-sm group-hover:border-slate-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 font-black text-xs hover:text-primary hover:border-primary transition-all uppercase tracking-wider"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-green-600 text-white py-4.5 rounded-2xl font-black text-lg shadow-[0_20px_40px_-15px_rgba(34,197,94,0.5)] hover:shadow-[0_25px_50px_-12px_rgba(34,197,94,0.6)] hover:-translate-y-1 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : isSignup ? "Create My Account" : "Sign In to Basket"}
            </button>
          </form>

          {/* Footer Toggle */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-px bg-slate-200 flex-1"></div>
            <p className="text-gray-500 font-medium text-sm px-4 whitespace-nowrap">
              {isSignup ? "Already a member?" : "New to DropBasket?"}
            </p>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <button
            onClick={() => setIsSignup(!isSignup)}
            className="mt-4 w-full py-4 rounded-2xl bg-white border-2 border-slate-100 text-gray-900 font-black hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-2 group"
          >
            <span>{isSignup ? "Log In Instead" : "Create New Account"}</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;