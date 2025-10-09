import React, { useState } from 'react'
import './PlaceOrder.css'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'

export const PlaceOrder = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    paymentMethod: 'creditCard'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.firstName.trim()) return alert('Please enter your first name')
    if (!form.lastName.trim()) return alert('Please enter your last name')
    if (!validateEmail(form.email)) return alert('Please enter a valid email address')
    if (!form.address.trim()) return alert('Please enter your address')
    // If user chose Credit/Debit Card, go to payment page
    if (form.paymentMethod === 'creditCard') {
      navigate('/payment', { state: { form } })
      return
    }

    // Otherwise confirm order (placeholder)
    alert(`Order submitted for ${form.firstName} ${form.lastName} (${form.email}). Total will be calculated on next page.`)
  }

  return (
    <form className='placeOrderForm' onSubmit={handleSubmit}>
      <h2>Place Your Order</h2>

      <label>
        First name:
        <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required />
      </label>

      <label>
        Last name:
        <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required />
      </label>

      <label>
        Email address:
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </label>

      <label>
        Address:
        <input type="text" name="address" value={form.address} onChange={handleChange} required />
      </label>

      <div>
        <label>Payment Method:</label>
        <div className="paymentOptions">
          <label className={`paymentOption ${form.paymentMethod === 'cash' ? 'selected' : ''}`}>
            <input type="radio" name="paymentMethod" value="cash" checked={form.paymentMethod === 'cash'} onChange={handleChange} />
            <img src={assets.cash} alt="Cash" />
            <span>Cash (On delivery)</span>
          </label>
          <label className={`paymentOption ${form.paymentMethod === 'creditCard' ? 'selected' : ''}`}>
            <input type="radio" name="paymentMethod" value="creditCard" checked={form.paymentMethod === 'creditCard'} onChange={handleChange} />
            <img src={assets.card} alt="Card" />
            <span>Credit/Debit Card</span>
          </label>
          <label className={`paymentOption ${form.paymentMethod === 'paypal' ? 'selected' : ''}`}>
            <input type="radio" name="paymentMethod" value="paypal" checked={form.paymentMethod === 'paypal'} onChange={handleChange} />
            <img src={assets.paypal} alt="PayPal" />
            <span>PayPal</span>
          </label>
          <label className={`paymentOption ${form.paymentMethod === 'googlePay' ? 'selected' : ''}`}>
            <input type="radio" name="paymentMethod" value="googlePay" checked={form.paymentMethod === 'googlePay'} onChange={handleChange} />
            <img src={assets.google_pay} alt="Google Pay" />
            <span>G Pay</span>
          </label>
        </div>
      </div>
      <button type="submit">Submit Order</button>
    </form>
  )
}

export default PlaceOrder