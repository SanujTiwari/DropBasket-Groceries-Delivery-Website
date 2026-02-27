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
            className="group hover-premium rounded-[1.75rem] overflow-hidden bg-white border border-slate-100 hover:border-primary shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 cursor-pointer h-full flex flex-col"
        >
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-50/50 p-4 md:p-6 flex items-center justify-center h-48 md:h-56">
                <img
                    className="group-hover:scale-110 transition-transform duration-700 max-w-[90%] max-h-[90%] object-contain"
                    src={product?.image?.[0] || assets.placeholder}
                    alt={product?.name}
                />

                {/* Discount Badge */}
                {discountPercent > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg">
                        {discountPercent}% Off
                    </div>
                )}

                {/* New Badge */}
                {product?.isNew && (
                    <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg">
                        Latest
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="flex-1 px-5 py-6 flex flex-col gap-3">

                {/* Category */}
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                    {product?.category}
                </span>

                {/* Product Name */}
                <h3 className="text-gray-900 font-black text-base line-clamp-1 group-hover:text-primary transition-colors tracking-tight">
                    {product?.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1.5 opacity-80">
                    <div className="flex text-orange-400 text-[10px]">
                        {"★★★★★".split("").map((s, i) => (
                            <span key={i}>{s}</span>
                        ))}
                    </div>
                    <span className="text-[10px] font-black text-gray-400">(128)</span>
                </div>

                {/* Weight/Size */}
                {product?.weight && (
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <span>📦</span>
                        <span>{product.weight}</span>
                    </div>
                )}

                {/* Price Section */}
                <div className="flex items-center justify-between mt-auto pt-4">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-gray-900 tracking-tighter">
                            {currency}{product?.offerPrice || 0}
                        </span>
                        {product.price > product.offerPrice && (
                            <span className="text-xs font-bold text-gray-300 line-through">
                                {currency}{product?.price || 0}
                            </span>
                        )}
                    </div>

                    {/* Add to Cart Button - Small and Snappy */}
                    <div onClick={(e) => e.stopPropagation()}>
                        {!cartItems?.[product._id] ? (
                            <button
                                className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg shadow-green-100"
                                onClick={() => addToCart(product._id)}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        ) : (
                            <div className="flex items-center bg-primary rounded-xl p-1 shadow-lg shadow-green-100">
                                <button
                                    onClick={() => removeFromCart(product._id)}
                                    className="w-7 h-7 flex items-center justify-center text-white font-black hover:bg-white/20 rounded-lg transition"
                                >
                                    −
                                </button>
                                <span className="w-6 text-center text-white font-black text-xs">
                                    {cartItems?.[product._id]}
                                </span>
                                <button
                                    onClick={() => addToCart(product._id)}
                                    className="w-7 h-7 flex items-center justify-center text-white font-black hover:bg-white/20 rounded-lg transition"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
