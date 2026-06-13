import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyOrders } from "../assets/assets";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios,user} = useAppContext();

  const fetchMyOrders = async () => {
    try{
      const {data} = await axios.get("/api/order/user")
      if(data.success){
        setMyOrders(data.orders)
      }
    }catch(error){
      console.log(error)
    }
  };

  useEffect(() => {
    if(user){
      fetchMyOrders();
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'processing': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'order placed': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="mt-16 pb-16 animate-fadeIn">

      {/* Page Header */}
      <div className="flex flex-col items-start w-max mb-10 group">
        <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter flex flex-wrap gap-x-3">
          <span className="text-[#1a202c]">MY</span>
          <span className="text-[#ff3838]">ORDERS</span>
          <span className="text-2xl not-italic opacity-20 group-hover:opacity-100 transition-opacity">📦</span>
        </h1>
        <div className="w-20 h-1.5 bg-[#ff3838] rounded-full mt-3 transform origin-left group-hover:scale-x-125 transition-transform duration-500"></div>
        <p className="text-gray-400 mt-4 font-bold text-base tracking-tight italic">Track and manage your grocery orders.</p>
      </div>

      {myOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-2xl font-black text-gray-400">No orders yet</h3>
          <p className="text-gray-400 mt-2">Your order history will appear here once you place an order.</p>
        </div>
      ) : (
        <div className="space-y-6 max-w-5xl">
          {myOrders.map((order, index) => (
            <div
              key={index}
              className="bg-white border border-green-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-gray-50/80 border-b border-green-100">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-mono font-semibold text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                    #{order._id.slice(-8).toUpperCase()}
                  </span>
                  <span className="text-xs font-semibold text-gray-400 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                    📅 {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <span className="text-xs font-semibold text-gray-400 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                    💳 {order.paymentType}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="text-lg font-extrabold text-primary">
                    {currency}{order.amount}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-gray-100">
                {order.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4 hover:bg-green-50/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-green-50 p-3 rounded-2xl flex-shrink-0 border border-green-100">
                        <img
                          src={item.product.image[0]}
                          alt=""
                          className="w-16 h-16 object-contain"
                        />
                      </div>

                      <div>
                        <h2 className="text-base font-bold text-gray-800">
                          {item.product.name}
                        </h2>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">Category: {item.product.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 sm:gap-8 ml-auto">
                      <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                        Qty: {item.quantity || "1"}
                      </span>
                      <p className="text-lg font-extrabold text-primary">
                        {currency}{item.product.offerPrice * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
