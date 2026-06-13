import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const Deals = () => {
    const { products, searchQuery } = useAppContext()
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        // Filter products that have an active offer (offerPrice < price)
        const deals = products.filter(product => product.offerPrice < product.price);

        if (searchQuery.length > 0) {
            setFilteredProducts(deals.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
        }
        else {
            setFilteredProducts(deals)
        }
    }, [products, searchQuery])

    return (
        <div className="mt-16 flex flex-col">
            <div className="flex flex-col items-start w-max mb-12 group">
                <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter flex flex-wrap gap-x-3">
                    <span className="text-[#1a202c]">HOT</span>
                    <span className="text-[#ff3838]">DEALS</span>
                    <span className="text-[#1a202c] flex items-center gap-3">
                        & OFFERS
                        <span className="text-2xl not-italic opacity-20 group-hover:opacity-100 transition-opacity">🏷️</span>
                    </span>
                </h1>
                <div className="w-20 h-1.5 bg-[#ff3838] rounded-full mt-3 transform origin-left group-hover:scale-x-125 transition-transform duration-500"></div>
                <p className="text-gray-400 mt-4 font-bold text-base tracking-tight">Supercharge your savings with our freshest discounts!</p>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5">
                    {filteredProducts.filter((product) => product.inStock).map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                    <div className="text-6xl mb-4">💨</div>
                    <h3 className="text-2xl font-black text-gray-400">No active deals right now</h3>
                    <p className="text-gray-400 mt-2">Check back soon for fresh offers!</p>
                </div>
            )}
        </div>
    )
}

export default Deals
