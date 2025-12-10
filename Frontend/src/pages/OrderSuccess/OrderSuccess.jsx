import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './OrderSuccess.css'

const OrderSuccess = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Clear cart data from localStorage
    localStorage.removeItem('cartItems')
    
    // Redirect to orders page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/orders')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="order-success">
      <div className="order-success-container">
        <div className="success-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#4CAF50" strokeWidth="2" fill="#4CAF50" fillOpacity="0.1"/>
            <path d="m9 12 2 2 4-4" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1>Payment Successful!</h1>
        <p>Thank you for your order. Your payment has been processed successfully.</p>
        <p className="redirect-text">Redirecting to your orders in 3 seconds...</p>
        <button onClick={() => navigate('/orders')} className="view-orders-btn">
          View My Orders
        </button>
        <button onClick={() => navigate('/')} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default OrderSuccess