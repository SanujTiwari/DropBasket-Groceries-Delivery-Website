import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Login = () => {

  const { navigate, axios, setShowUserLogin, setUser } = useAppContext();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const url = isSignup ? "/api/user/register" : "/api/user/login";

      const payload = isSignup
        ? { name, email, password }
        : { email, password };

      const { data } = await axios.post(url, payload);

      if (data.success) {
        toast.success(isSignup ? "Account created" : "Logged in");
        setUser(data.user);
        setShowUserLogin(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-6 p-8 sm:p-10 w-11/12 max-w-md rounded-[2rem] shadow-2xl bg-white border border-green-100 animate-slideUp relative"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setShowUserLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl transition"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="inline-block p-3 bg-green-100 rounded-full mb-3">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1 leading-tight">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 text-sm">
            {isSignup ? "Join DropBasket today" : "Login to your account"}
          </p>
        </div>

        {/* Name Field */}
        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-primary focus:bg-green-50/30 transition-all duration-300 placeholder:text-gray-400"
            required
          />
        )}

        {/* Email Field */}
        <input
          type="email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-primary focus:bg-green-50/30 transition-all duration-300 placeholder:text-gray-400"
          required
        />

        {/* Password Field */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-primary focus:bg-green-50/30 transition-all duration-300 placeholder:text-gray-400"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-green-600 text-white font-bold py-4 rounded-2xl hover:from-green-700 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-[0_10px_20px_-10px_rgba(34,197,94,0.5)]"
        >
          {isSignup ? "Get Started" : "Sign In"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-gray-400 text-xs">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Toggle Sign Up / Login */}
        <p className="text-center text-sm text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="text-primary font-semibold cursor-pointer ml-1 hover:text-green-700 transition"
            onClick={() => {
              setIsSignup(!isSignup);
              setName("");
              setEmail("");
              setPassword("");
            }}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>

      </form>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
      `}</style>
    </div>
  );
};

export default Login;
