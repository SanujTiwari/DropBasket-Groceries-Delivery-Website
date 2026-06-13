import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const ProductCategory = () => {
    const { products } = useAppContext();
    const { category } = useParams();

    const searchCategory = categories.find((item) => item.path.toLowerCase() === category);

    const filteredProducts = products.filter((product) => product.category.toLowerCase() === category);
    return (
        <div className="mt-16 animate-fadeIn">
            {searchCategory && (
                <div className="flex flex-col items-start w-max mb-10 group">
                    <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter flex flex-wrap gap-x-3">
                        <span className="text-[#1a202c]">SHOP</span>
                        <span className="text-primary">{searchCategory.text.toUpperCase()}</span>
                        <span className="text-2xl not-italic opacity-20 group-hover:opacity-100 transition-opacity">🛒</span>
                    </h1>
                    <div className="w-20 h-1.5 bg-primary rounded-full mt-3 transform origin-left group-hover:scale-x-125 transition-transform duration-500"></div>
                    <p className="text-gray-400 mt-4 font-bold text-base tracking-tight italic">Browse our fresh selection of {searchCategory.text.toLowerCase()} products.</p>
                </div>
            )}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                    <div className="text-6xl mb-4">🫙</div>
                    <h3 className="text-2xl font-black text-gray-400">No products found</h3>
                    <p className="text-gray-400 mt-2">No products found in this category yet.</p>
                </div>
            )}

        </div>
    )
}
export default ProductCategory;
