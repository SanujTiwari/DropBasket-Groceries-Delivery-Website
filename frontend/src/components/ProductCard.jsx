import React from 'react';
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
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative rounded-[2rem] overflow-hidden bg-white border border-slate-100 hover:border-emerald-500/30 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(5,150,105,0.08)] transition-all duration-500 cursor-pointer h-full flex flex-col"
        >
            {/* Image Container with subtle background tint */}
            <div className="relative overflow-hidden bg-slate-50/50 p-6 flex items-center justify-center h-48 md:h-56 transition-colors duration-500 group-hover:bg-emerald-50/10">
                <img
                    className="group-hover:scale-108 group-hover:-translate-y-1 transition-all duration-700 max-w-[85%] max-h-[85%] object-contain"
                    src={product?.image?.[0] || assets.placeholder}
                    alt={product?.name}
                />

                {/* Modern curating color badges */}
                {discountPercent > 0 && (
                    <div className="absolute top-4 left-4 bg-rose-50 text-rose-600 border border-rose-100 px-3 py-1 rounded-full text-[9px] font-black tracking-wider uppercase shadow-sm">
                        {discountPercent}% Off
                    </div>
                )}

                {product?.isNew && (
                    <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-[9px] font-black tracking-wider uppercase shadow-sm">
                        New
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="flex-1 px-6 py-6 flex flex-col gap-3">
                {/* Category with emerald text */}
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em]">
                    {product?.category}
                </span>

                {/* Product Name */}
                <h3 className="text-slate-900 font-extrabold text-base line-clamp-1 group-hover:text-emerald-600 transition-colors tracking-tight">
                    {product?.name}
                </h3>

                {/* Rating with modern styled stars */}
                <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-400 text-[11px] tracking-tighter">
                        {"★★★★★".split("").map((s, i) => (
                            <span key={i} className="drop-shadow-sm">{s}</span>
                        ))}
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-400/80">(128)</span>
                </div>

                {/* Weight/Size Badge */}
                {product?.weight && (
                    <div className="inline-flex items-center gap-1.5 self-start bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">
                        <span>📦</span>
                        <span>{product.weight}</span>
                    </div>
                )}

                {/* Price Section */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                    <div className="flex flex-col">
                        {product.price > product.offerPrice && (
                            <span className="text-[10px] font-bold text-slate-300 line-through tracking-tight mb-0.5">
                                {currency}{product?.price || 0}
                            </span>
                        )}
                        <span className="text-xl font-black text-slate-900 tracking-tight leading-none">
                            {currency}{product?.offerPrice || 0}
                        </span>
                    </div>

                    {/* Add to Cart Button with glow & transitions */}
                    <div onClick={(e) => e.stopPropagation()} className="relative z-10">
                        {!cartItems?.[product._id] ? (
                            <button
                                className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md shadow-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20 cursor-pointer"
                                onClick={() => addToCart(product._id)}
                                aria-label="Add to cart"
                            >
                                <svg className="w-4 h-4 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        ) : (
                            <div className="flex items-center bg-slate-900 rounded-2xl p-1 shadow-md border border-slate-800">
                                <button
                                    onClick={() => removeFromCart(product._id)}
                                    className="w-7 h-7 flex items-center justify-center text-slate-400 font-extrabold hover:text-white rounded-xl hover:bg-slate-800 transition"
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>
                                <span className="w-6 text-center text-white font-black text-xs">
                                    {cartItems?.[product._id]}
                                </span>
                                <button
                                    onClick={() => addToCart(product._id)}
                                    className="w-7 h-7 flex items-center justify-center text-slate-400 font-extrabold hover:text-white rounded-xl hover:bg-slate-800 transition"
                                    aria-label="Increase quantity"
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
