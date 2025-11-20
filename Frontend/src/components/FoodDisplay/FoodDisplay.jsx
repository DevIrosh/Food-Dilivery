import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContextValue'
import './FoodDisplay.css'
import FoodItem from '../FoddItem/FoodItem';


  const FoodDisplay = ({category}) => { 

    const { food_list } = useContext(StoreContext)

    // if a category is provided (not 'All'), filter the list for display
    const visibleFoods = category && category !== 'All'
      ? food_list.filter(f => f.category === category)
      : food_list


    return (
      <div className='foodDisplay' id='foodDisplay'>
        <h2>Our Popular Dishes</h2>   
        <div className='foodDisplayList'>
          {visibleFoods.map((item) => {
            return (
              <FoodItem key={item._id} name={item.name} id={item._id} image={item.image} description={item.description} price={item.price} />
            );
          })}
        </div>
      </div>
    );
  };

export default FoodDisplay;
