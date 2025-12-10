import React, { useState, useContext } from 'react'
import './PlaceOrder.css'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContextValue'

export const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cart, url } = useContext(StoreContext)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    totalAmount: getTotalCartAmount(),
    foodlist: food_list,
    cartitems: cart,
    paymentMethod: 'creditCard'
  })

  

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const validatePhone = (phone) => {
    return /^[+]?[1-9]\d{0,15}$/.test(phone.replace(/[\s-()]/g, ''))
  }

  const navigate = useNavigate()

  const placeOrder = async (orderData) => {
    try {
      console.log('Sending order data:', orderData);
      console.log('🎫 Using token:', token ? 'Token exists' : 'No token');
      
      const response = await fetch(`${url}/api/order/placeorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (data.sessionUrl) {
          window.location.href = data.sessionUrl; // Redirect to Stripe payment
        } else {
          alert('Order placed successfully!');
          navigate('/orders');
        }
      } else {
        alert('Error placing order: ' + data.message);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.firstName.trim()) return alert('Please enter your first name')
    if (!form.lastName.trim()) return alert('Please enter your last name')
    if (!validateEmail(form.email)) return alert('Please enter a valid email address')
    if (!validatePhone(form.phone)) return alert('Please enter a valid phone number')
    if (!form.address.trim()) return alert('Please enter your address')
    
    if (!token) {
      alert('Please login to place an order');
      navigate('/login');
      return;
    }

    // Prepare order data for API
    const orderItems = [];
    for (const itemId in cart) {
      if (cart[itemId] > 0) {
        const itemInfo = food_list.find(product => product._id === itemId);
        if (itemInfo) {
          orderItems.push({
            name: itemInfo.name,
            price: itemInfo.price,
            quantity: cart[itemId]
          });
        }
      }
    }

    const orderData = {
      orderdata: orderItems,
      amount: getTotalCartAmount(),
      address: `${form.firstName} ${form.lastName}, ${form.phone}, ${form.address}`,
      paymentMethod: form.paymentMethod === 'creditCard' ? 'card' : 'cash'
    };

    placeOrder(orderData);
  }

  return (
    <div className="place-order">
      <div className="place-order-left">
        <div className="delivery-info-header">
          <h2 className="delivery-title">🚚 Delivery Information</h2>
          <p className="delivery-subtitle">Please provide your details for delivery</p>
        </div>
        <form className='placeOrderForm' onSubmit={handleSubmit}>

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
        Phone number:
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+94 7273411" required />
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
          <button type="submit">Place Order</button>
        </form>
      </div>
      
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal: <span>${getTotalCartAmount()}</span></p>
            <p>Delivery Fee: <span>$2</span></p>
            <hr />
            <p>Total: <span>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder