import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { NavLink, Outlet, Link } from "react-router-dom";

const SellerLayout = () => {
    const { logout } = useAppContext();

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    return (
        <>
            {/* Navbar */}
            <div className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur-xl shadow-sm">
                <div className="flex items-center justify-between px-8 md:px-12 py-5">
                    <Link to="/" className="flex items-center gap-4 group">
                        <div className="bg-primary p-2.5 rounded-2xl shadow-xl group-hover:bg-primary-dark transition-all duration-300 border-2 border-green-600/10 group-hover:scale-110">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-2xl tracking-tighter text-gray-900 uppercase">
                                Drop<span className="text-primary italic">Basket</span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">
                                Seller Hub
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={logout}
                            className="px-6 py-3 rounded-2xl bg-slate-50 text-slate-600 border border-slate-200 font-black hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-300 active:scale-95 flex items-center gap-2"
                        >
                            <span className="hidden sm:inline">Sign Out</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex min-h-[calc(100vh-73px)] bg-gradient-green">
                {/* Sidebar */}
                <aside className="hidden md:flex w-[290px] p-6">
                    <div className="w-full rounded-[2.5rem] bg-white/85 backdrop-blur-xl border border-gray-100 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.25)] p-4">
                        <div className="px-4 py-4">
                            <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">Navigation</p>
                            <p className="text-lg font-black text-gray-800 mt-1 tracking-tight">Manage Store</p>
                        </div>

                        <nav className="mt-2 space-y-2">
                            {sidebarLinks.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    end={item.path === "/seller"}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-black ${isActive
                                            ? "bg-gradient-to-r from-primary to-green-600 text-white shadow-lg shadow-green-100/60"
                                            : "text-gray-700 hover:bg-primary/5"
                                        }`
                                    }
                                >
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${item.path === "/seller" ? "" : ""} ${""}`}>
                                        <img src={item.icon} className="w-5 h-5" alt="" />
                                    </div>
                                    <span className="tracking-tight">{item.name}</span>
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Content */}
                <main className="flex-1 px-4 md:px-0">
                    <div className="md:pr-12 md:pl-0 md:py-10 py-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
};

export default SellerLayout;