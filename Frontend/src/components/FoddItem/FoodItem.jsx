import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContextValue'


const FoodItem = ({ name, description, price, image, id }) => {
  const { cart, addItem, removeItem, url } = useContext(StoreContext)
  const itemCount = cart[id] || 0
  
  // Construct proper image URL - remove uploads\ prefix if present
  const cleanImageName = image ? image.replace(/^uploads[\\]/, '').replace(/^uploads\//, '') : ''
  const imageUrl = cleanImageName ? `${url}/images/${cleanImageName}` : assets.logo

  return (
    <div className='foodItem'>
      <div className='foodItemImage'>
         <img 
           className='foodItemPic' 
           src={imageUrl} 
           alt={name || 'Food item'} 
           onError={(e) => {
             e.target.src = assets.logo;
           }}
         />
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
