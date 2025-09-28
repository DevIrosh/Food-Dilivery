import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

export const ExploreMenu = () => {
  return (
    <div className='exploreMenu'>
      <h2>Explore Our Menu</h2>
      <p className='exploreMenuDescription'> Discover a variety of delicious dishes crafted with the freshest ingredients.</p>
      <div className='menuItems'>
        {menu_list.map(item => (
          <div className='menuItem' key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span>{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
