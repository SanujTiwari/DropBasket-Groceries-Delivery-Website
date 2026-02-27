import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  const { user, isSellerLoading } = useAppContext();
  const navigate = useNavigate();

  // redirect admins away from customer pages
  useEffect(() => {
    if (!isSellerLoading && user && user.role === 'admin') {
      navigate('/seller');
    }
  }, [user, isSellerLoading, navigate]);

  // show nothing while determining role or redirecting
  if (isSellerLoading || (user && user.role === 'admin')) {
    return null;
  }

  return (
    <div className='mt-10'>
      <MainBanner />
      <Categories />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />

    </div>
  )
}

export default Home