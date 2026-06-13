import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {

    const { products, navigate, currency, addToCart } = useAppContext();
    const { id } = useParams();


    const [relatedProducts, setRelatedProducts] = useState([])

    const [thumbnail, setThumbnail] = useState(null);

    const product = products.find((item) => item._id === id);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter(
                (item) => product.category === item.category
            );

            setRelatedProducts(productsCopy.slice(0, 5));
        }
    }, [products]);

    useEffect(() => {
        setThumbnail(product?.image[0] ? product.image[0] : null);
    }, [product]);


    return product && (
        <div className="mt-12 animate-fadeIn">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm font-medium text-gray-400">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <span className="text-gray-300">/</span>
                <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
                <span className="text-gray-300">/</span>
                <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors">{product.category}</Link>
                <span className="text-gray-300">/</span>
                <span className="text-primary font-semibold">{product.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row gap-12 lg:gap-16 mt-6">
                {/* Image Gallery */}
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className={`border-2 max-w-24 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md ${thumbnail === image ? 'border-primary shadow-sm' : 'border-gray-200 hover:border-primary/50'}`} >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border-2 border-gray-100 max-w-100 rounded-[2rem] overflow-hidden bg-gray-50/50 group">
                        <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                </div>

                {/* Product Info */}
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{product.name}</h1>

                    <div className="flex items-center gap-1 mt-3">
                        {Array(5).fill('').map((_, i) => (
                            <img key={i} src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" className="md:w-4.5 w-4" />

                        ))}
                        <span className="text-sm font-semibold text-gray-500 ml-2 bg-gray-100 px-2 py-0.5 rounded-full">(4)</span>
                    </div>

                    <div className="mt-6 bg-green-50/60 rounded-2xl p-5 border border-green-100">
                        <div className="flex items-center gap-3">
                            <p className="text-gray-400 line-through text-sm font-medium">MRP: {currency}{product.price}</p>
                            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
                            </span>
                        </div>
                        <p className="text-3xl font-extrabold text-gray-900 mt-1">
                            {currency}{product.offerPrice}
                        </p>
                        <span className="text-xs text-gray-400 font-medium">(inclusive of all taxes)</span>
                    </div>

                    <div className="mt-8">
                        <p className="text-lg font-bold text-gray-800 mb-3">About Product</p>
                        <ul className="space-y-2.5">
                            {product.description.map((desc, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-500 text-sm leading-relaxed">
                                    <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={() => { addToCart(product._id) }} className="w-full py-3.5 cursor-pointer font-semibold border-2 border-primary text-primary bg-white rounded-2xl hover:bg-primary/5 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] transition-all duration-300" >
                            Add to Cart
                        </button>
                        <button onClick={() => { addToCart(product._id); navigate('/cart') }} className="w-full py-3.5 cursor-pointer font-semibold bg-gradient-to-r from-primary to-green-600 text-white rounded-2xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all duration-300" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="flex flex-col items-center mt-20">
                <div className="flex flex-col items-start w-max mb-2 group">
                    <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter flex flex-wrap gap-x-3">
                        <span className="text-[#1a202c]">RELATED</span>
                        <span className="text-[#ff3838]">PRODUCTS</span>
                        <span className="text-2xl not-italic opacity-20 group-hover:opacity-100 transition-opacity">✨</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-[#ff3838] rounded-full mt-3 transform origin-left group-hover:scale-x-125 transition-transform duration-500"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
                    {relatedProducts
                        .filter((product) => product.inStock)
                        .map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                </div>

                <button
                    onClick={() => {
                        navigate("/products");
                        scrollTo(0, 0);
                    }}
                    className="mx-auto cursor-pointer px-12 my-16 py-3 border-2 border-primary rounded-2xl text-primary font-semibold hover:bg-primary hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all duration-300"
                >
                    See more
                </button>
            </div>

        </div>
    );
};
export default ProductDetails;