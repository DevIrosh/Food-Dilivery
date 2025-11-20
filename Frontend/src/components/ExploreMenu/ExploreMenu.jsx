import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'


export const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='exploreMenu' id='exploreMenu'>
      <h2>Explore Our Menu</h2>
      <p className='exploreMenuDescription'> Discover a variety of delicious dishes crafted with the freshest ingredients.</p>
      <div className='exploreMenulist'>

        {/* Render each menu item  using map method*/}  
        {menu_list.map((item, index) => {
          return (
            <div onClick={() => setCategory(prev=>prev === item.menu_name?"All":item.menu_name)} key={index} className='exploremenuItems'>
              <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt='' />
              <p>{item.menu_name}</p>
              
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu        