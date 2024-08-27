import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {


  const { user } = useSelector((state) => state.auth)
  console.log("user", user);

  return (
    <div>
      Home
    </div>
  )
}

export default Home
