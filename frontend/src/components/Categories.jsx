import React from 'react'
import { categories } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const navigate = useNavigate();
    return (
        <div id="categories" className="mt-20">
            {/* Section Header */}
            <div className="flex items-end justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">🛒</span>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em] bg-emerald-50 px-3 py-1 rounded-full">Browse</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                        Shop by Category
                    </h2>
                </div>
                <button 
                    onClick={() => { navigate('/products'); scrollTo(0,0); }}
                    className="hidden sm:flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition group"
                >
                    View All
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </button>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 md:gap-5">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`group cursor-pointer p-3 md:p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-400 hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-2 border border-transparent hover:border-emerald-200/60 animate-fadeInUp`}
                        style={{ 
                            backgroundColor: category.bgColor, 
                            animationDelay: `${index * 60}ms` 
                        }}
                        onClick={() => {
                            navigate(`/products/${category.path.toLowerCase()}`);
                            scrollTo(0, 0);
                        }}
                    >
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center p-1.5 mb-2.5 shadow-sm group-hover:bg-white group-hover:shadow-md transition-all duration-400">
                            <img
                                src={category.image}
                                alt={category.text}
                                className={`transition-all duration-500 w-full h-full object-contain group-hover:scale-110 ${category.path === 'Sweets' ? 'scale-90' : 'scale-100'}`}
                            />
                        </div>
                        <p className="text-[10px] md:text-xs font-bold text-gray-700 leading-tight max-w-[90px]">{category.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories