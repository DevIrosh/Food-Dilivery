import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'


const FoodItem = ({ name, description, price, image }) => {
  return (
    <div className='foodItem'>
      <div className='foodItemImage'>
         <img className='foodItemPic' src={image || assets.logo} alt={name || ''} />
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
