import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    deliveryAddress,
    addresses,
    setDeliveryAddress,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [paymentOption, setPaymentOption] = useState("COD");
  const handlingCharge = 7;

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        tempArray.push({ ...product, quantity: cartItems[key] });
      }
    }
    setCartArray(tempArray);
  };

  const placeOrder = async () => {
    try {
      if (!deliveryAddress) {
        return toast.error("Please select an address");
      }

      const payload = {
        userId: user._id,
        items: cartArray.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address: deliveryAddress._id,
      };

      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", payload);

        if (data.success) {
          toast.success("Order placed successfully");
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post("/api/order/stripe", payload);

        if (data.success) {
          window.location.replace(data.url);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col mx-auto lg:flex-row mt-8 md:mt-16 gap-6 md:gap-10 mb-16">

      {/* LEFT - CART ITEMS */}
      <div className="flex-1 w-full">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
            Shopping Cart
          </h1>
          <p className="text-primary font-semibold mb-6">
            {getCartCount()} {getCartCount() === 1 ? "item" : "items"} in your cart
          </p>

          {cartArray.length > 0 ? (
            <div className="space-y-4">
              {cartArray.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-gradient-to-r from-green-50 to-lime-50 rounded-xl hover:shadow-md transition border border-green-100"
                >
                  {/* Product Image */}
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg shadow-sm border border-green-200"
                  />

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-lg mb-1 break-words">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Weight: <span className="font-medium text-gray-700">{product.weight || "N/A"}</span>
                    </p>
                    <div className="flex items-center gap-3">
                      <label className="text-sm font-medium text-gray-700">Quantity:</label>
                      <select
                        value={cartItems[product._id]}
                        onChange={(e) =>
                          updateCartItem(product._id, Number(e.target.value))
                        }
                        className="px-3 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-primary bg-white text-gray-700 font-medium"
                      >
                        {[...Array(9)].map((_, i) => (
                          <option key={i} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex flex-col gap-3 sm:text-right w-full sm:w-auto">
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-2xl font-bold text-primary">
                        {currency}{product.offerPrice * cartItems[product._id]}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(product._id)}
                      className="px-4 py-2 bg-red-500/10 text-red-600 hover:bg-red-500/20 rounded-lg font-semibold transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <button
                onClick={() => navigate("/products")}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT - BILL & CHECKOUT */}
      {cartArray.length > 0 && (
        <div className="w-full lg:max-w-[400px] h-fit">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 sticky top-24">
            {/* Bill Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Order Summary
            </h2>

            {/* ADDRESS SECTION */}
            <div className="mb-6 pb-6 border-b-2 border-green-100">
              <p className="text-sm font-bold uppercase text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Delivery Address
              </p>

              <div className="relative">
                <button
                  onClick={() => setShowAddress(!showAddress)}
                  className="w-full border-2 border-green-100 hover:border-primary p-4 text-left rounded-2xl bg-green-50/50 hover:bg-green-50 transition-all duration-300 font-medium text-gray-700 shadow-sm flex justify-between items-center"
                >
                  <span className="truncate">
                    {deliveryAddress
                      ? `${deliveryAddress.firstName} ${deliveryAddress.lastName}, ${deliveryAddress.street}, ${deliveryAddress.city}`
                      : "Select delivery address"}
                  </span>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${showAddress ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showAddress && (
                  <div className="absolute top-full mt-2 left-0 bg-white border border-green-100 w-full rounded-2xl shadow-2xl z-20 max-h-64 overflow-y-auto animate-fadeIn custom-scrollbar">
                    {addresses.length > 0 ? (
                      <div className="p-2">
                        {addresses.map((item, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setDeliveryAddress(item);
                              setShowAddress(false);
                            }}
                            className={`p-4 rounded-xl mb-1 cursor-pointer transition-all duration-200 ${deliveryAddress?._id === item._id ? 'bg-green-50 border-2 border-primary' : 'hover:bg-gray-50 border-2 border-transparent'}`}
                          >
                            <p className="font-bold text-gray-800 flex items-center gap-2">
                              {item.firstName} {item.lastName}
                              {deliveryAddress?._id === item._id && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Selected</span>}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                              {item.street}, {item.city}, {item.zipcode}
                            </p>
                          </div>
                        ))}
                        <button
                          onClick={() => navigate("/add-address")}
                          className="w-full text-primary text-center p-4 font-bold hover:bg-green-50 rounded-xl transition-all duration-200 border-t border-gray-100 mt-2 flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Add New Address
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => navigate("/add-address")}
                        className="w-full text-primary text-center p-6 font-bold hover:bg-green-50 transition-all"
                      >
                        📍 Add Your First Address
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="mb-6 pb-6 border-b-2 border-green-100">
              <p className="text-sm font-bold uppercase text-gray-700 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h10m4 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Payment Method
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <div
                  onClick={() => setPaymentOption("COD")}
                  className={`flex-1 flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${paymentOption === "COD" ? 'border-primary bg-green-50 shadow-md' : 'border-gray-100 bg-white hover:border-green-200'}`}
                >
                  <div className={`p-3 rounded-xl ${paymentOption === "COD" ? 'bg-primary text-white' : 'bg-green-100 text-primary'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Cash On Delivery</h4>
                    <p className="text-xs text-gray-500">Pay when you receive</p>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentOption("Online")}
                  className={`flex-1 flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${paymentOption === "Online" ? 'border-primary bg-green-50 shadow-md' : 'border-gray-100 bg-white hover:border-green-200'}`}
                >
                  <div className={`p-3 rounded-xl ${paymentOption === "Online" ? 'bg-primary text-white' : 'bg-green-100 text-primary'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h10m4 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Online Payment</h4>
                    <p className="text-xs text-gray-500">Fast & Secure Checkout</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PRICE BREAKDOWN */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Items Subtotal</span>
                <span className="font-semibold text-gray-800">{currency}{getCartAmount()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Handling Charge</span>
                <span className="font-semibold text-gray-800">{currency}{handlingCharge}</span>
              </div>
              <div className="border-t-2 border-green-100 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">
                    {currency}{(getCartAmount() + handlingCharge).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* CHECKOUT BUTTON */}
            <button
              onClick={placeOrder}
              disabled={!deliveryAddress}
              className="w-full bg-gradient-to-r from-primary to-green-600 text-white font-bold py-3 rounded-lg hover:from-green-700 hover:to-green-700 transition transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              {!deliveryAddress
                ? "📍 Select Address to Continue"
                : paymentOption === "COD"
                  ? "✓ Place Order"
                  : "💳 Proceed to Checkout"}
            </button>

            <button
              onClick={() => navigate("/products")}
              className="w-full mt-3 border-2 border-green-300 text-primary font-semibold py-2 rounded-lg hover:bg-green-50 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default Cart;