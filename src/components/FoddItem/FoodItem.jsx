import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContextValue'


const FoodItem = ({ name, description, price, image, id }) => {
  const { cart, addItem, removeItem } = useContext(StoreContext)
  const itemCount = cart[id] || 0

  return (
    <div className='foodItem'>
      <div className='foodItemImage'>
         <img className='foodItemPic' src={image || assets.logo} alt={name || ''} />
         {!itemCount ? (
           <button
             className='foodItemAddBtn'
             aria-label={`Add ${name}`}
             onClick={() => addItem(id)}
           >
             +
           </button>
         ) : (
           <div className='food-items-counter'>
             <button onClick={() => removeItem(id)}>-</button>
             <span>{itemCount}</span>
             <button onClick={() => addItem(id)}>+</button>
           </div>
         )}
      </div>
      <div className='foodItemDetails'>
        <div className='foodItemRating'>
          <p className='foodItemName'>{name}</p>
          <img src={assets.rating_starts} alt='rating' />
        </div>
        <p className='foodItemDescription'>{description}</p>
        <h4 className='foodItemPrice'>${price}</h4>
      </div>
    </div>
  )
}

export default FoodItem
