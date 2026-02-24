import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { NavLink, Outlet, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const SellerLayout = () => {
    const { axios, navigate } = useAppContext();

    const sidebarLinks = [
        { name: "Add Product", path: "/seller/dashboard", icon: assets.add_icon },
        {
            name: "Product List",
            path: "/seller/dashboard/product-list",
            icon: assets.product_list_icon,
        },
        {
            name: "Orders",
            path: "/seller/dashboard/orders",
            icon: assets.order_icon,
        },
    ];

    // seller logout
    const logout = async () => {
        try {
            const { data } = await axios.post("/api/seller/logout")
            if (data.success) {
                toast.success(data.message)
                navigate("/")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Logout failed")
        }
    };

    return (
        <>
            {/* Navbar */}
            <div className="flex items-center justify-between px-6 md:px-12 border-b border-gray-100 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-30 shadow-sm">
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="bg-primary p-2 rounded-xl shadow-lg shadow-green-100 group-hover:rotate-6 transition-all duration-300">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <span className="font-black text-xl md:text-2xl tracking-tight text-gray-800">Drop<span className="text-primary">Basket</span></span>
                </Link>

                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full border border-green-100">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <p className="text-sm font-bold text-gray-600">Hi, Seller</p>
                    </div>
                    <button
                        onClick={logout}
                        className="group flex items-center gap-2 px-6 py-2 border-2 border-red-100 text-red-500 font-bold rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 shadow-sm active:scale-95"
                    >
                        <span>Logout</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Sidebar + Outlet */}
            <div className="flex min-h-[calc(100vh-73px)]">
                <div className="md:w-64 w-20 border-r border-gray-100 bg-white/50 backdrop-blur-sm pt-8 flex flex-col gap-2 px-3">
                    {sidebarLinks.map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.name}
                            end={item.path === "/seller/dashboard"}
                            className={({ isActive }) =>
                                `flex items-center py-3.5 px-4 gap-4 rounded-2xl transition-all duration-300 ${isActive
                                    ? "bg-primary text-white shadow-lg shadow-green-100 translate-x-1"
                                    : "text-gray-500 hover:bg-green-50 hover:text-primary"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <img
                                        src={item.icon}
                                        alt=""
                                        className={`w-6 h-6 ${isActive ? 'brightness-0 invert' : ''}`}
                                    />
                                    <p className="md:block hidden font-bold tracking-wide">{item.name}</p>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                <Outlet />
            </div>
        </>
    );
};

export default SellerLayout;
