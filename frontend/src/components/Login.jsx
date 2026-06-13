import React, { useMemo, useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

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
  const [isVisible, setIsVisible] = useState(false);

  const isAdminFlow = useMemo(() => role === "admin", [role]);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    return () => setIsVisible(false);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShowUserLogin(false), 300);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const url = isSignup
        ? "/api/user/register"
        : isAdminFlow
          ? "/api/seller/login"
          : "/api/user/login";

      const payload = isSignup
        ? { name, email, password, role }
        : { email, password };

      const { data } = await axios.post(url, payload);

      if (data.success) {
        setUser(data.user);
        handleClose();

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
      onClick={handleClose}
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? "login-backdrop-visible" : "login-backdrop-hidden"}`}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="login-orb login-orb-1"></div>
        <div className="login-orb login-orb-2"></div>
        <div className="login-orb login-orb-3"></div>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-[460px] transition-all duration-500 ease-out ${isVisible ? "login-card-visible" : "login-card-hidden"}`}
      >
        {/* Main Card */}
        <div className="login-card relative rounded-[2.5rem] overflow-hidden">
          {/* Decorative top gradient bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-primary to-teal-500"></div>

          <div className="p-8 md:p-10">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-7 right-7 w-10 h-10 rounded-xl bg-gray-100/80 hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all duration-200 hover:rotate-90 hover:scale-110"
              aria-label="Close login"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-8">
              {/* Brand mark */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center mb-5 shadow-lg shadow-emerald-200/50">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isAdminFlow ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  )}
                </svg>
              </div>

              <h3 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {isSignup
                  ? (isAdminFlow ? "Create Admin Account" : "Create Account")
                  : (isAdminFlow ? "Admin Login" : "Welcome Back")}
              </h3>
              <p className="text-gray-500 font-medium mt-2 text-[15px] leading-relaxed">
                {isAdminFlow
                  ? "Manage your store inventory and orders."
                  : isSignup
                    ? "Join thousands getting fresh groceries delivered."
                    : "Your favorite groceries are just a login away."}
              </p>
            </div>

            <form onSubmit={onSubmitHandler} className="space-y-5">
              {/* Role Switcher */}
              <div className="flex gap-1.5 bg-gray-100/80 p-1.5 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setRole("user")}
                  className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm transition-all duration-300 ${role === "user"
                      ? "bg-white shadow-md text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM5 21a7 7 0 0114 0" />
                  </svg>
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm transition-all duration-300 ${role === "admin"
                      ? "bg-white shadow-md text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Store Admin
                </button>
              </div>

              <div className="space-y-3.5">
                {/* Name Input */}
                {isSignup && (
                  <div className="login-field-enter">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 mb-1.5 block">Full Name</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="login-input pl-12"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Email Input */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 mb-1.5 block">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="login-input pl-12"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 mb-1.5 block">Password</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="login-input pl-12 pr-14"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-emerald-50 transition-all"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Forgot Password (login only) */}
              {!isSignup && (
                <div className="flex justify-end">
                  <button type="button" className="text-sm font-medium text-primary hover:text-emerald-700 transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="login-submit-btn w-full py-4 rounded-2xl font-bold text-base text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : isSignup ? (
                  <span className="flex items-center justify-center gap-2">
                    Create Account
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-7 flex items-center gap-4">
              <div className="h-px bg-gray-200 flex-1"></div>
              <p className="text-gray-400 font-medium text-xs uppercase tracking-wider">
                {isSignup ? "Already a member?" : "New here?"}
              </p>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="mt-4 w-full py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-100 hover:border-gray-300 transition-all flex items-center justify-center gap-2 group"
            >
              <span>{isSignup ? "Sign In Instead" : "Create New Account"}</span>
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            {/* Trust footer */}
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>256-bit SSL</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>Privacy Protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;