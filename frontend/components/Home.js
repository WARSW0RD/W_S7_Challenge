import React from 'react'
import pizza from './images/pizza.jpg'
import { useNavigate } from 'react-router-dom'
import Form from './Form'


function Home() {
  const navigate = useNavigate()
  const order = () => {
    navigate('/order')
    
  }
  return (
    <div>
      <h2>
        Welcome to Bloom Pizza!
      </h2>
      {/* clicking on the img should navigate to "/order" */}
      <img onClick={order} alt="order-pizza" style={{ cursor: 'pointer' }} src={pizza} />
    </div>
  )
}

export default Home
