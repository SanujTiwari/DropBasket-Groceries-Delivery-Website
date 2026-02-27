import React from 'react'
import { useAppContext } from '../context/AppContext'

const Settings = () => {
    const { user } = useAppContext()

    return (
        <div className="mt-16 pb-24 max-w-4xl mx-auto px-6 animate-fadeIn">
            <div className="flex flex-col items-start w-max mb-12">
                <h1 className="text-3xl font-black text-[#1a202c] uppercase tracking-tighter italic">
                    Account <span className="text-[#ff3838]">Settings</span>
                </h1>
                <div className="w-24 h-1.5 bg-primary rounded-full mt-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar Navigation */}
                <div className="md:col-span-1 space-y-2">
                    <button className="w-full text-left px-6 py-4 bg-primary text-white rounded-2xl font-black transition-all shadow-lg shadow-green-100">
                        Profile Information
                    </button>
                    <button className="w-full text-left px-6 py-4 hover:bg-gray-100 rounded-2xl text-gray-600 font-bold transition-all">
                        Security & Login
                    </button>
                    <button className="w-full text-left px-6 py-4 hover:bg-gray-100 rounded-2xl text-gray-600 font-bold transition-all">
                        Notifications
                    </button>
                    <button className="w-full text-left px-6 py-4 hover:bg-gray-100 rounded-2xl text-gray-600 font-bold transition-all">
                        Payment Methods
                    </button>
                    <button className="w-full text-left px-6 py-4 hover:bg-red-50 text-red-500 rounded-2xl font-bold transition-all">
                        Delete Account
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-2 bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-black text-gray-800 mb-6">Personal Details</h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        defaultValue={user?.name}
                                        className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl outline-none focus:border-primary focus:bg-white transition-all font-bold text-gray-800 shadow-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        defaultValue={user?.email}
                                        className="w-full px-6 py-4 bg-gray-100 border-2 border-gray-200 rounded-2xl outline-none focus:border-primary focus:bg-gray-100 transition-all font-bold text-gray-700 shadow-sm"
                                        disabled
                                    />
                                    <p className="text-[10px] text-gray-400 ml-1">Email cannot be changed for security reasons.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-50">
                            <button className="bg-primary text-white px-10 py-4 rounded-2xl font-black hover:scale-105 transition-transform shadow-lg shadow-green-100">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
            `}</style>
        </div>
    )
}

export default Settings
