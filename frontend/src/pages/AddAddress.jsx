import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast'



//Input feild component

const InputField = ({ type, placeholder, name, handleChange, address }) => (
    <input className="w-full px-4 py-3.5 border-2 border-gray-100 rounded-xl outline-none text-gray-700 focus:border-primary focus:bg-green-50/30 transition-all duration-300 placeholder:text-gray-400" type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={address[name]}
        required
    />
)

const AddAddress = () => {
    const { axios, user, navigate } = useAppContext();
    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        email: "",
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
        console.log(address);
    }

    const { setDeliveryAddress, fetchAddresses } = useAppContext();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/address/add", { address });
            if (data.success) {
                toast.success(data.message);
                await fetchAddresses();
                setDeliveryAddress(address);
                navigate("/cart");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (!user) {
            navigate("/cart");
        }
    }, [user]);



    return (
        <div className="mt-16 pb-16">
            <p className="text-2xl md:text-3xl text-gray-500">Add Shipping <span
                className='font-semibold text-primary'>Address</span></p>
            <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
                <div className='flex-1 max-w-md'>
                    <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>

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
                            placeholder="Email address" />


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
                                type="number"
                                placeholder="Zip Code" />
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

                        <button className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase" >
                            Save Address
                        </button>




                    </form>
                </div>
                <img className='w-full sm:w-[450px] md:w-[600px] object-cover mt-10 md:mt-0' src={assets.add_address_iamge} alt="" />
            </div>

        </div>
    )
}

export default AddAddress