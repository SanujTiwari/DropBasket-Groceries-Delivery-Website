import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
const AllProducts = () => {
    const { products, searchQuery } = useAppContext()
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredProducts(products.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
        }
        else {
            setFilteredProducts(products)
        }
    }, [products, searchQuery])
    return (
        <div className="mt-16 flex flex-col">
            <div className="flex flex-col items-start w-max mb-10 group">
                <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter flex flex-wrap gap-x-3">
                    <span className="text-[#1a202c]">ALL</span>
                    <span className="text-[#ff3838]">PRODUCTS</span>
                    <span className="text-[#1a202c] flex items-center gap-3">
                        COLLECTION
                        <span className="text-2xl not-italic opacity-20 group-hover:opacity-100 transition-opacity">🛍️</span>
                    </span>
                </h1>
                <div className="w-20 h-1.5 bg-[#ff3838] rounded-full mt-3 transform origin-left group-hover:scale-x-125 transition-transform duration-500"></div>
                <p className="text-gray-400 mt-4 font-bold text-base tracking-tight italic">Explore our wide range of fresh groceries and household essentials.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
                {filteredProducts.filter((product) => product.inStock).map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>


        </div>
    )
}

export default AllProducts