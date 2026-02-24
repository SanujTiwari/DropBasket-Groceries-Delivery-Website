import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { toast } from 'react-hot-toast'

const Orders = () => {

    const { currency, axios } = useAppContext()
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('/api/order/seller')

            if (data.success) {
                setOrders(data.orders)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll ">
            <div className="md:p-10 p-4 space-y-4">
                <h2 className="text-lg font-medium">Orders List</h2>

                {orders.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[2rem] border border-dashed border-gray-200">
                        <svg className="w-16 h-16 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <p className="text-gray-400 font-bold">No orders found yet</p>
                    </div>
                )}

                <div className="grid gap-6">
                    {orders.map((order, index) => (
                        <div key={index} className="flex flex-col md:items-center md:flex-row gap-8 justify-between p-8 bg-white max-w-5xl rounded-[2.5rem] border border-green-50 shadow-sm hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300 group">

                            {/* PRODUCTS */}
                            <div className="flex gap-5 max-w-80">
                                <img className="w-12 h-12 object-cover" src={assets.box_icon} alt="boxIcon" />

                                <div>
                                    {order.items.map((item, i) => (
                                        <div key={i}>
                                            <p className="font-medium">
                                                {item.product?.name}{" "}
                                                <span className="text-primary">x {item.quantity}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ADDRESS */}
                            <div className="text-sm md:text-base text-black/60">
                                <p className='text-black/80'>
                                    {order.address?.firstName} {order.address?.lastName}
                                </p>
                                <p>{order.address?.street}, {order.address?.city}</p>
                                <p>{order.address?.state}, {order.address?.zipcode}, {order.address?.country}</p>
                            </div>

                            {/* AMOUNT */}
                            <p className="font-medium text-lg my-auto">
                                {currency}{order.amount}
                            </p>

                            {/* DETAILS */}
                            <div className="flex flex-col text-sm md:text-base text-black/60">
                                <p>Method: {order.paymentType}</p>
                                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Orders