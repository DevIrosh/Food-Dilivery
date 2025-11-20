import React, { useState, useContext } from 'react'
import './CardPayments.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContextValue'

const CardPayments = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const orderData = location.state?.form || {}
  
  // Get cart context to calculate subtotal
  const { cart = {}, food_list = [] } = useContext(StoreContext) || {}
  
  // Calculate subtotal from cart
  const subtotal = (food_list || []).reduce((sum, item) => {
    const id = item._id ?? item.id ?? String(item.name)
    const qty = cart[id] || 0
    const price = Number(item.price) || 0
    return sum + (price * qty)
  }, 0)

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvcCode: '',
    phoneNumber: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
      if (formattedValue.replace(/\s/g, '').length <= 16) {
        setCardDetails(prev => ({ ...prev, [name]: formattedValue }))
      }
    }
    // Format CVC to max 4 digits
    else if (name === 'cvcCode') {
      if (value.length <= 4 && /^\d*$/.test(value)) {
        setCardDetails(prev => ({ ...prev, [name]: value }))
      }
    }
    // Format phone number
    else if (name === 'phoneNumber') {
      if (/^\+?[\d\s()-]*$/.test(value) && value.length <= 20) {
        setCardDetails(prev => ({ ...prev, [name]: value }))
      }
    }
    else {
      setCardDetails(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Card number validation (must be 16 digits)
    const cardNumberDigits = cardDetails.cardNumber.replace(/\s/g, '')
    if (!cardNumberDigits) {
      newErrors.cardNumber = 'Card number is required'
    } else if (cardNumberDigits.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits'
    } else if (!/^\d+$/.test(cardNumberDigits)) {
      newErrors.cardNumber = 'Card number must contain only digits'
    }

    // Card name validation
    if (!cardDetails.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required'
    } else if (cardDetails.cardName.trim().length < 2) {
      newErrors.cardName = 'Name must be at least 2 characters'
    }

    // Expiry month validation
    if (!cardDetails.expiryMonth) {
      newErrors.expiryMonth = 'Expiry month is required'
    }

    // Expiry year validation
    if (!cardDetails.expiryYear) {
      newErrors.expiryYear = 'Expiry year is required'
    } else {
      const currentYear = new Date().getFullYear()
      const selectedYear = parseInt(cardDetails.expiryYear)
      if (selectedYear < currentYear) {
        newErrors.expiryYear = 'Card has expired'
      }
    }

    // CVC validation
    if (!cardDetails.cvcCode) {
      newErrors.cvcCode = 'CVC code is required'
    } else if (cardDetails.cvcCode.length < 3) {
      newErrors.cvcCode = 'CVC must be at least 3 digits'
    }

    // Phone number validation
    if (!cardDetails.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (cardDetails.phoneNumber.trim().length < 10) {
      newErrors.phoneNumber = 'Phone number must be at least 10 digits'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    // Simulate payment processing
    alert(`Payment successful! Transaction completed for ${orderData.firstName} ${orderData.lastName}`)
    
    // Navigate back to home or to a success page
    navigate('/')
  }

  const generateYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = 0; i < 20; i++) {
      years.push(currentYear + i)
    }
    return years
  }

  const generateMonths = () => {
    return [
      '01', '02', '03', '04', '05', '06',
      '07', '08', '09', '10', '11', '12'
    ]
  }

  return (
    <div className="cardPayments">
      <div className="paymentContainer">
        <h2>Complete Your Payment</h2>
        
        {orderData.firstName && (
          <div className="orderSummary">
            <h3>Order Details</h3>
            <p><strong>Name:</strong> {orderData.firstName} {orderData.lastName}</p>
            <p><strong>Email:</strong> {orderData.email}</p>
            <p><strong>Address:</strong> {orderData.address}</p>
            <div className="subtotalRow">
              <p><strong>Subtotal: ${subtotal.toFixed(2)}</strong></p>
            </div>
          </div>
        )}

        <form className="cardForm" onSubmit={handleSubmit}>
          <h3>Card Information</h3>
          
          <div className="formGroup">
            <label>Card Number *</label>
            <input
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              className={errors.cardNumber ? 'error' : ''}
            />
            {errors.cardNumber && <span className="errorText">{errors.cardNumber}</span>}
          </div>

          <div className="formGroup">
            <label>Cardholder Name *</label>
            <input
              type="text"
              name="cardName"
              value={cardDetails.cardName}
              onChange={handleChange}
              placeholder="Name as it appears on card"
              className={errors.cardName ? 'error' : ''}
            />
            {errors.cardName && <span className="errorText">{errors.cardName}</span>}
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>Expiry Month *</label>
              <select
                name="expiryMonth"
                value={cardDetails.expiryMonth}
                onChange={handleChange}
                className={errors.expiryMonth ? 'error' : ''}
              >
                <option value="">Month</option>
                {generateMonths().map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              {errors.expiryMonth && <span className="errorText">{errors.expiryMonth}</span>}
            </div>

            <div className="formGroup">
              <label>Expiry Year *</label>
              <select
                name="expiryYear"
                value={cardDetails.expiryYear}
                onChange={handleChange}
                className={errors.expiryYear ? 'error' : ''}
              >
                <option value="">Year</option>
                {generateYears().map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              {errors.expiryYear && <span className="errorText">{errors.expiryYear}</span>}
            </div>

            <div className="formGroup">
              <label>CVC Code *</label>
              <input
                type="text"
                name="cvcCode"
                value={cardDetails.cvcCode}
                onChange={handleChange}
                placeholder="123"
                className={errors.cvcCode ? 'error' : ''}
              />
              {errors.cvcCode && <span className="errorText">{errors.cvcCode}</span>}
            </div>
          </div>

          <div className="formGroup">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phoneNumber"
              value={cardDetails.phoneNumber}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className={errors.phoneNumber ? 'error' : ''}
            />
            {errors.phoneNumber && <span className="errorText">{errors.phoneNumber}</span>}
          </div>

          <button type="submit" className="completeTransactionBtn">
            Complete This Transaction
          </button>
        </form>
      </div>
    </div>
  )
}

export default CardPayments     