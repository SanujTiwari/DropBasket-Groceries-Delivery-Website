import React, { useState } from 'react'
import { categories } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'

const AddProduct = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [category, setCategory] = useState("");
    const [files, setFiles] = useState([]);
    const { axios } = useAppContext();

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const productData = {
                name,
                description: description.split('\n'),
                price,
                offerPrice,
                category
            }
            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }
            const { data } = await axios.post('/api/product/add', formData);
            if (data.success) {
                toast.success(data.message);
                setName("");
                setDescription("");
                setPrice("");
                setOfferPrice("");
                setCategory("");
                setFiles([]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }






    return (
        <div className="no-scrollbar flex-1 h-[calc(100vh-73px)] overflow-y-scroll">
            <form
                onSubmit={onSubmitHandler}
                className="md:px-0 px-2 space-y-8 max-w-4xl mx-auto animate-fadeIn">

                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-gray-100 rounded-full px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        Add Inventory
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-[#1a202c] tracking-tighter">Add New Product</h2>
                    <p className="text-sm md:text-base text-gray-500 font-bold max-w-2xl">
                        Upload images, add a clear title and description, and set pricing. Your product will appear on the customer store instantly.
                    </p>
                </div>

                {/* IMAGE UPLOAD */}
                <div className="bg-white/90 backdrop-blur p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_25px_70px_-45px_rgba(0,0,0,0.25)] space-y-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-400 ml-1">Product Images</p>
                    <div className="flex flex-wrap items-center gap-4">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`} className="group relative">
                                <input onChange={(e) => {
                                    const updatedFiles = [...files]
                                    updatedFiles[index] = e.target.files[0]
                                    setFiles(updatedFiles)
                                }}
                                    type="file" id={`image${index}`} hidden />
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-dashed border-gray-300/70 bg-gray-50/60 group-hover:border-primary group-hover:bg-green-50/50 transition-all duration-300 flex items-center justify-center overflow-hidden cursor-pointer shadow-sm">
                                    {files[index] ? (
                                        <img className="w-full h-full object-cover" src={URL.createObjectURL(files[index])} alt="preview" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-1 text-gray-400 group-hover:text-primary">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            <span className="text-[10px] font-bold uppercase">Upload</span>
                                        </div>
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* BASIC INFO */}
                <div className="bg-white/90 backdrop-blur p-6 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_25px_70px_-45px_rgba(0,0,0,0.25)] space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1" htmlFor="product-name">Product Name</label>
                        <input onChange={(e) => setName(e.target.value)} value={name}
                            id="product-name" type="text" placeholder="e.g. Organic Tomatoes"
                            className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(21,128,61,0.1)] transition-all duration-300 placeholder:text-gray-400 text-gray-900 font-bold shadow-sm" required />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1" htmlFor="product-description">Description Brief</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description}
                            id="product-description" rows={4}
                            className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(21,128,61,0.1)] transition-all duration-300 placeholder:text-gray-400 text-gray-900 font-bold resize-none shadow-sm"
                            placeholder="Tell customers about your product..."></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1" htmlFor="category">Category</label>
                            <select onChange={(e) => setCategory(e.target.value)} value={category}
                                id="category" className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200/80 rounded-2xl outline-none focus:border-primary focus:bg-white transition-all duration-300 text-gray-900 font-bold appearance-none bg-no-repeat bg-[right_1.5rem_center] bg-[length:1rem] cursor-pointer shadow-sm">
                                <option value="">Select Category</option>
                                {categories.map((item, index) => (
                                    <option key={index} value={item.path}>{item.path}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1" htmlFor="product-price">Regular Price</label>
                                <input onChange={(e) => setPrice(e.target.value)} value={price}
                                    id="product-price" type="number" placeholder="0.00"
                                    className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(21,128,61,0.1)] transition-all duration-300 text-gray-900 font-bold shadow-sm" required />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1" htmlFor="offer-price">Offer Price</label>
                                <input onChange={(e) => setOfferPrice(e.target.value)} value={offerPrice}
                                    id="offer-price" type="number" placeholder="0.00"
                                    className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(21,128,61,0.1)] transition-all duration-300 text-gray-900 font-bold shadow-sm" required />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-primary to-green-600 text-white font-black rounded-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-[0_20px_45px_-20px_rgba(34,197,94,0.75)] uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                    >
                        <span>Publish Product</span>
                        <span className="text-lg">→</span>
                    </button>
                </div>
            </form>
        </div>
    );
};
export default AddProduct
