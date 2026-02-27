import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast'

//Input field component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
    <input
        className="w-full px-5 py-4 bg-white border-2 border-slate-300 rounded-2xl outline-none text-gray-800 shadow-sm focus:border-primary focus:bg-white transition-all duration-300 placeholder:text-gray-400"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={address[name]}
        required
    />
)

const AddAddress = () => {
    const { axios, user, navigate, setDeliveryAddress } = useAppContext();
    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        email: user?.email || "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress, [name]: value
        }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/address/add", { address });
            if (data.success) {
                toast.success(data.message);

                // If the backend returns the new address with its ID, use it for automatic selection
                if (data.newAddress) {
                    setDeliveryAddress(data.newAddress);
                }

                navigate("/cart");
            } else {
                toast.error(data.message || "Failed to save address");
            }
        } catch (error) {
            console.error("Save Address Error:", error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (!user) {
            navigate("/cart");
        }
    }, [user, navigate]);

    return (
        <div className="mt-16 pb-20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">Checkout</p>
                    <p className="text-3xl md:text-4xl font-black text-[#1a202c] mt-1">
                        Add Shipping <span className="text-primary">Address</span>
                    </p>
                    <p className="text-sm md:text-base text-gray-500 font-bold mt-3">
                        Save a default address so your groceries reach the right door every time.
                    </p>
                </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-between mt-10 gap-10">
                <div className="flex-1 max-w-xl">
                    <form onSubmit={onSubmitHandler} className="space-y-4 text-sm bg-white rounded-[2.5rem] p-6 md:p-8 shadow-xl border border-gray-100">

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='firstName'
                                type="text"
                                placeholder="First Name"
                            />

                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='lastName'
                                type="text"
                                placeholder="Last Name"
                            />
                        </div>

                        <InputField
                            handleChange={handleChange}
                            address={address}
                            name='email'
                            type="email"
                            placeholder="Email address"
                        />

                        <InputField
                            handleChange={handleChange}
                            address={address}
                            name='street'
                            type="text"
                            placeholder="Street"
                        />

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='city'
                                type="text"
                                placeholder="City"
                            />

                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='state'
                                type="text"
                                placeholder="State"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='zipcode'
                                type="text"
                                placeholder="Zip Code"
                            />
                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name='country'
                                type="text"
                                placeholder="Country"
                            />
                        </div>

                        <InputField
                            handleChange={handleChange}
                            address={address}
                            name='phone'
                            type="text"
                            placeholder="Phone"
                        />

                        <button className="w-full mt-4 bg-gradient-to-r from-primary to-green-600 text-white py-4 rounded-2xl font-black hover:from-green-700 hover:to-green-700 transition cursor-pointer uppercase tracking-wide shadow-[0_10px_25px_-10px_rgba(34,197,94,0.6)]" >
                            Save Address
                        </button>
                    </form>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <img className="w-full sm:w-[420px] md:w-[520px] object-contain mt-6 md:mt-0" src={assets.add_address_iamge} alt="Add address illustration" />
                </div>
            </div>
        </div>
    )
}

export default AddAddress