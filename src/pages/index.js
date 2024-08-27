import ProductCard from '@/components/productCard';
import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {


  const { user } = useSelector((state) => state.auth)
  console.log("user", user);

  return (
    <div className='p-10'>
      <ProductCard />
    </div>
  )
}

export default Home
