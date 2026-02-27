import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'

const SellerLogin = () => {

  const { isSeller, setIsSeller, navigate, axios } = useAppContext()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
React.useEffect(() => {
  if (isSeller) {
    navigate("/seller");
  }
}, [isSeller, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      const { data } = await axios.post("/seller/login", { email, password });

      if (data.success) {
        setIsSeller(true)
        navigate("/seller")
      } else {
        toast.error(data.message)
      }

    } catch {
      toast.error("Login failed")
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-6 animate-fadeIn"
    >
      <div className="flex flex-col gap-8 w-full max-w-md p-10 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white border border-green-50 animate-slideUp relative overflow-hidden">

        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>

        {/* Logo Section */}
        <div className="flex flex-col items-center gap-3">
          <div className="bg-primary p-4 rounded-2xl shadow-lg shadow-green-100 transform hover:rotate-6 transition-transform">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tight text-gray-800">
              Drop<span className="text-primary">Basket</span>
            </h1>
            <p className="text-gray-500 font-medium text-sm mt-1 uppercase tracking-widest">Seller Portal</p>
          </div>
        </div>

        <div className="space-y-6 w-full">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative group">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="seller@dropbasket.com"
                className="w-full px-6 py-4 border-2 border-gray-100 rounded-2xl outline-none focus:border-primary focus:bg-green-50/20 transition-all duration-300 placeholder:text-gray-300 text-gray-800"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
            <div className="relative group">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="••••••••"
                className="w-full px-6 py-4 border-2 border-gray-100 rounded-2xl outline-none focus:border-primary focus:bg-green-50/20 transition-all duration-300 placeholder:text-gray-300 text-gray-800"
                required
              />
            </div>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-primary to-green-600 text-white font-bold py-5 rounded-2xl hover:from-green-700 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-[0_15px_30px_-10px_rgba(34,197,94,0.5)]">
          Login to Dashboard
        </button>

        <p className="text-center text-xs text-gray-400 mt-2">
          By logging in, you agree to DropBasket's <span className="text-primary cursor-pointer hover:underline">Seller Terms</span>
        </p>

      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
      `}</style>
    </form>
  )
}

export default SellerLogin
