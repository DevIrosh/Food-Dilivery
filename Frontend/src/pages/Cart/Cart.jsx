
import React from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContextValue'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const { cart = {}, food_list = [], addItem, removeItem } = React.useContext(StoreContext)

  // Get navigation function to route to order page on checkout
  const navigate = useNavigate()

  // Fallback if _id not present try id or index-based behavior
  const resolvedItems = (food_list || []).filter(item => {
    const id = item._id ?? item.id ?? String(item.name)
    return (cart[id] || 0) > 0
  })

  const list = resolvedItems

  const subtotal = list.reduce((sum, item) => {
    const id = item._id ?? item.id ?? String(item.name)
    const qty = cart[id] || 0
    const price = Number(item.price) || 0
    return sum + price * qty
  }, 0)

  const handleCheckout = () => {
    if (subtotal <= 0) {
      alert('Your cart is empty.')
      return
    }
    // navigate to order/checkout page and pass subtotal in location state
    navigate('/order', { state: { subtotal } })
  }

  return (
    <div className='cart'>
      <div className='cartContainer'>
        <h2>Your Cart items</h2>

        {list.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className='cartList'>
            <div className='cartRow cartHeader'>
              <div>Title</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
              <div>Actions</div>
            </div>

            {list.map((item) => {
              const id = item._id ?? item.id ?? String(item.name)
              const qty = cart[id] || 0
              const price = Number(item.price) || 0
              return (
                <div className='cartRow' key={id}>
                  <div className='cartTitle'>
                    {item.image ? <img src={item.image} alt={item.name} /> : null}
                    <span>{item.name}</span>
                  </div>
                  <div>${price.toFixed(2)}</div>
                  <div>{qty}</div>
                  <div>${(price * qty).toFixed(2)}</div>
                  <div>
                    <button onClick={() => addItem && addItem(id)} aria-label={`Add one ${item.name}`}>
                      +
                    </button>
                    <button onClick={() => removeItem && removeItem(id)} aria-label={`Remove one ${item.name}`}>
                      -
                    </button>
                  </div>
                </div>
              )
            })}

            <div className='cartFooter'>
              <div className='subtotalRow'>
                <strong>Subtotal:</strong>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className='checkoutRow'>
                <button onClick={handleCheckout} className='checkoutButton'>Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}



