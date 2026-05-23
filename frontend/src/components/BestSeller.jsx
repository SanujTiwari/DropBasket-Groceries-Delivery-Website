import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const BestSeller = () => {
    const { products } = useAppContext();
    const navigate = useNavigate();

    return (
        <div className="mt-20">
            {/* Section Header */}
            <div className="flex items-end justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">🔥</span>
                        <span className="text-[10px] font-bold text-red-500 uppercase tracking-[0.2em] bg-red-50 px-3 py-1 rounded-full">Trending</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                        Best Sellers
                    </h2>
                </div>
                <button 
                    onClick={() => { navigate('/products'); scrollTo(0,0); }}
                    className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition group"
                >
                    View All
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5 lg:grid-cols-5">
                {products.filter((product) => product.inStock).slice(0, 5).map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    )
}

export default BestSeller