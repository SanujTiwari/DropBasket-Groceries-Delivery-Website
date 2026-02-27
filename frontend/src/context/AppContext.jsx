import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [addresses, setAddresses] = useState([]);
    const [deliveryAddress, setDeliveryAddress] = useState(null);

    // USER FETCH
    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/user/is-auth");

            if (data.success) {
                setUser(data.user);
                setCartItems(data.cartItems || {});

                if (data.user.role === "admin") {
                    setIsSeller(true);
                } else {
                    setIsSeller(false);
                }

            } else {
                setUser(null);
                setCartItems({});
                setIsSeller(false);
            }

        } catch {
            setUser(null);
            setCartItems({});
            setIsSeller(false);
        } finally {
            setIsSellerLoading(false);
        }
    };
    // SELLER FETCH
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get("/api/seller/is-auth");
            setIsSeller(data.success);
        } catch {
            setIsSeller(false);
        } finally {
            setIsSellerLoading(false);
        }
    };

    // LOGOUT
    const logout = async () => {
        // Optimistic Logout: Clear UI state first for immediate response
        setUser(null);
        setIsSeller(false);
        setCartItems({});
        toast.success("Logged out successfully");
        navigate("/");

        try {
            await axios.get("/api/user/logout");
        } catch (error) {
            console.error("Backend logout failed", error);
            // We don't revert the UI state here because the user intended to logout
            // and the frontend session is already cleared.
        }
    };

    // PRODUCTS
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("/api/product/list");
            if (data.success) setProducts(data.products);
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchAddresses = async () => {
        try {
            const { data } = await axios.post("/api/address/get");
            if (data.success) {
                setAddresses(data.addresses);
                return data.addresses;
            }
            return [];
        } catch (error) {
            console.log(error.message);
            return [];
        }
    }

    // ADD
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);
        toast.success("Item added to cart");
    };

    // UPDATE
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;

        setCartItems(cartData);
        toast.success("Cart updated");
    };

    // REMOVE
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] -= 1;

            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }

        setCartItems(cartData);
        toast.success("Item removed");
    };

    // COUNT
    const getCartCount = () => {
        let total = 0;
        for (const item in cartItems) {
            total += cartItems[item];
        }
        return total;
    };

    // AMOUNT
    const getCartAmount = () => {
        let total = 0;

        for (const item in cartItems) {
            const product = products.find(p => p._id === item);

            if (product) {
                total += product.offerPrice * cartItems[item];
            }
        }

        return Math.floor(total * 100) / 100;
    };

    // INITIAL LOAD
    useEffect(() => {
        fetchUser();
        fetchProducts();
    }, []);

    // update database cart items
    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', { cartItems })
                if (!data.success) {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }

        if (user) {
            updateCart()
        }
    }, [cartItems, user])

    const value = {
        navigate, user, setUser, isSeller, setIsSeller, products, cartItems, setCartItems,
        showUserLogin, setShowUserLogin, searchQuery, setSearchQuery, currency, getCartCount, getCartAmount,
        addToCart, updateCartItem, removeFromCart, addresses, setAddresses, deliveryAddress,
        setDeliveryAddress, fetchAddresses, axios, isSellerLoading, setIsSellerLoading, logout
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);