import React, { useState } from 'react'
import { assets, categories } from '../../assets/assets'
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
        <div className="no-scrollbar flex-1 h-[calc(100vh-73px)] overflow-y-scroll bg-gray-50/30">
            <form
                onSubmit={onSubmitHandler}
                className="md:p-12 p-6 space-y-8 max-w-2xl animate-fadeIn">

                <div className="space-y-4">
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight">Add New Product</h2>
                    <p className="text-sm text-gray-500">Fill in the details below to list a new item on DropBasket.</p>
                </div>

                {/* IMAGE UPLOAD */}
                <div className="bg-white p-6 rounded-[2rem] border border-green-50 shadow-sm space-y-4">
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
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-dashed border-gray-200 group-hover:border-primary group-hover:bg-green-50 transition-all duration-300 flex items-center justify-center overflow-hidden cursor-pointer">
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
                <div className="bg-white p-8 rounded-[2rem] border border-green-50 shadow-sm space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1" htmlFor="product-name">Product Name</label>
                        <input onChange={(e) => setName(e.target.value)} value={name}
                            id="product-name" type="text" placeholder="e.g. Organic Tomatoes"
                            className="w-full px-6 py-4 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary focus:bg-green-50/20 transition-all duration-300 placeholder:text-gray-300 text-gray-800" required />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1" htmlFor="product-description">Description</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description}
                            id="product-description" rows={4}
                            className="w-full px-6 py-4 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary focus:bg-green-50/20 transition-all duration-300 placeholder:text-gray-300 text-gray-800 resize-none"
                            placeholder="Tell customers about your product..."></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1" htmlFor="category">Category</label>
                            <select onChange={(e) => setCategory(e.target.value)} value={category}
                                id="category" className="w-full px-6 py-4 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary focus:bg-green-50/20 transition-all duration-300 text-gray-800 appearance-none bg-no-repeat bg-[right_1.5rem_center] bg-[length:1rem] cursor-pointer">
                                <option value="">Select Category</option>
                                {categories.map((item, index) => (
                                    <option key={index} value={item.path}>{item.path}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1" htmlFor="product-price">Regular Price</label>
                                <input onChange={(e) => setPrice(e.target.value)} value={price}
                                    id="product-price" type="number" placeholder="0.00"
                                    className="w-full px-6 py-4 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary focus:bg-green-50/20 transition-all duration-300 text-gray-800" required />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1" htmlFor="offer-price">Offer Price</label>
                                <input onChange={(e) => setOfferPrice(e.target.value)} value={offerPrice}
                                    id="offer-price" type="number" placeholder="0.00"
                                    className="w-full px-6 py-4 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary focus:bg-green-50/20 transition-all duration-300 text-gray-800" required />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-primary to-green-600 text-white font-black rounded-22 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-[0_15px_30px_-10px_rgba(34,197,94,0.5)] uppercase tracking-widest text-sm">
                        Publish Product
                    </button>
                </div>
            </form>
        </div>
    );
};
export default AddProduct
