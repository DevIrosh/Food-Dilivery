import React from 'react'
import { useNavigate } from 'react-router-dom'
import './OrderCancel.css'

const OrderCancel = () => {
  const navigate = useNavigate()

  return (
    <div className="order-cancel">
      <div className="order-cancel-container">
        <div className="cancel-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#f44336" strokeWidth="2" fill="#f44336" fillOpacity="0.1"/>
            <path d="m15 9-6 6" stroke="#f44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="m9 9 6 6" stroke="#f44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1>Payment Cancelled</h1>
        <p>Your payment was cancelled. No charges have been made to your account.</p>
        <p>You can try placing your order again or continue shopping.</p>
        <button onClick={() => navigate('/cart')} className="retry-btn">
          Try Again
        </button>
        <button onClick={() => navigate('/')} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default OrderCancel