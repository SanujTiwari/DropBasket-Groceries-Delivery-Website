import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login'
import { useAppContext } from './context/AppContext'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/MyOrders'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'
import SellerProtectedRoute from "./components/seller/SellerProtectedRoute";
import UserProtectedRoute from './components/UserProtectedRoute'
import Loading from './components/Loading'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Deals from './pages/Deals'
import Settings from './pages/Settings'

const App = () => {

  const issellerpath = useLocation().pathname.includes("seller");
  const { showUserLogin } = useAppContext()

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      
      {!issellerpath && <Navbar />}
      {showUserLogin && <Login />}

      <Toaster />

      <div className={`flex-1 ${issellerpath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<UserProtectedRoute><Cart /></UserProtectedRoute>} />
          <Route path='/add-address' element={<UserProtectedRoute><AddAddress /></UserProtectedRoute>} />
          <Route path='/my-orders' element={<UserProtectedRoute><MyOrders /></UserProtectedRoute>} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/deals' element={<Deals />} />
          <Route path='/settings' element={<UserProtectedRoute><Settings /></UserProtectedRoute>} />
          <Route path='/loader' element={<Loading />} />

          {/* ✅ SINGLE SELLER ROUTE */}
          <Route path='/seller' element={
            <SellerProtectedRoute>
              <SellerLayout />
            </SellerProtectedRoute>
          }>
            <Route index element={<AddProduct />} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
          </Route>

        </Routes>
      </div>

      {!issellerpath && <Footer />}
    </div>
  )
}

export default App