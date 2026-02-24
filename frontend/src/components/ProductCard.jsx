import React from 'react'
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {

    const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

    if (!product || !product._id) return null;

    const discountPercent = product.price && product.offerPrice 
        ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
        : 0;

    return (
        <div 
            onClick={() => {
                navigate(`/products/${product.category?.toLowerCase()}/${product._id}`);
                scrollTo(0, 0);
            }} 
            className="group rounded-xl overflow-hidden bg-white border-2 border-green-100 hover:border-primary shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col"
        >
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white p-2 md:p-4 flex items-center justify-center h-40 md:h-48">
                <img 
                    className="group-hover:scale-110 transition-transform duration-300 max-w-[90%] max-h-[90%] object-contain" 
                    src={product?.image?.[0] || assets.placeholder} 
                    alt={product?.name} 
                />
                
                {/* Discount Badge */}
                {discountPercent > 0 && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-1 rounded-full text-xs md:text-sm font-bold">
                        {discountPercent}% OFF
                    </div>
                )}

                {/* New Badge */}
                {product?.isNew && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-primary to-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                        🆕 NEW
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="flex-1 px-3 md:px-4 py-3 md:py-4 flex flex-col">
                
                {/* Category */}
                <p className="text-xs md:text-sm text-primary font-semibold uppercase tracking-wider mb-1">
                    {product?.category}
                </p>

                {/* Product Name */}
                <p className="text-gray-800 font-bold text-sm md:text-base line-clamp-2 mb-2 group-hover:text-primary transition">
                    {product?.name}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    <div className="flex gap-0.5">
                        {Array(5).fill('').map((_, i) => (
                            <svg 
                                key={i} 
                                className={`w-3.5 h-3.5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(4)</span>
                </div>

                {/* Weight/Size */}
                {product?.weight && (
                    <p className="text-xs text-gray-500 mb-3">
                        📦 Weight: <span className="text-gray-700 font-medium">{product.weight}</span>
                    </p>
                )}

                {/* Price Section */}
                <div className="flex items-baseline gap-2 mb-3 mt-auto">
                    <p className="text-lg md:text-2xl font-bold text-primary">
                        {currency}{product?.offerPrice || 0}
                    </p>
                    {product.price > product.offerPrice && (
                        <p className="text-xs md:text-sm text-gray-400 line-through">
                            {currency}{product?.price || 0}
                        </p>
                    )}
                </div>

                {/* Add to Cart Button */}
                <div onClick={(e) => e.stopPropagation()} className="">
                    {!cartItems?.[product._id] ? (
                        <button 
                            className="w-full flex items-center justify-center gap-2 
                            bg-gradient-to-r from-primary to-green-600 hover:from-green-700 hover:to-green-700
                            text-white font-semibold py-2 md:py-2.5 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-md"
                            onClick={() => addToCart(product._id)}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                            </svg>
                            Add to Cart
                        </button>
                    ) : (
                        <div className="w-full flex items-center justify-between bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-1 md:p-1.5 border-2 border-primary">
                            
                            <button 
                                onClick={() => removeFromCart(product._id)} 
                                className="flex-1 text-primary font-bold text-lg hover:bg-white transition rounded h-8 md:h-9 flex items-center justify-center"
                            >
                                −
                            </button>

                            <span className="flex-1 text-center font-bold text-primary text-lg">
                                {cartItems?.[product._id] || 0}
                            </span>

                            <button 
                                onClick={() => addToCart(product._id)} 
                                className="flex-1 text-primary font-bold text-lg hover:bg-white transition rounded h-8 md:h-9 flex items-center justify-center"
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
