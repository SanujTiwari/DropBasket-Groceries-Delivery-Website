import React from 'react'
import { categories } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const navigate = useNavigate();
    return (
        <div id="categories" className="mt-16">
            <p className="text-2xl md:text-3xl font-medium">Categories</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">

                {categories.map((category, index) => (

                    <div
                        key={index}
                        className="group cursor-pointer p-4 rounded-[2.5rem] flex flex-col items-center justify-center text-center transition-all duration-500 hover:shadow-2xl hover:shadow-teal-100 hover:-translate-y-2 border border-gray-200/70 hover:border-teal-200 bg-white/70"
                        style={{ backgroundColor: category.bgColor }}
                        onClick={() => {
                            navigate(`/products/${category.path.toLowerCase()}`);
                            scrollTo(0, 0);
                        }}>
                        <div className="w-24 h-24 md:w-28 md:h-28 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center p-2 mb-3 shadow-inner group-hover:bg-white transition-colors duration-500">
                            <img
                                src={category.image}
                                alt={category.text}
                                className={`transition-all duration-500 w-full h-full object-contain group-hover:scale-110 ${category.path === 'Sweets' ? 'scale-90' : 'scale-100'}`}
                            />
                        </div>
                        <p className="text-[11px] md:text-xs font-black text-gray-800 uppercase tracking-tighter leading-tight max-w-[100px]">{category.text}</p>
                    </div>
                ))}


            </div>
        </div>
    )
}

export default Categories