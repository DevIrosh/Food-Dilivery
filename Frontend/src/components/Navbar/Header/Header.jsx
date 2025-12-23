import React from 'react'
import './Header.css'
import { assets } from '../../../assets/assets.js'

export const Header = () => {
  return (
    <div className="header" style={{backgroundImage: `url(${assets.header_img})`}}>
        <div className="headerTitles">
            <h2>You Can Order Your Favourite Food Here</h2>
            <p>Discover a variety of cuisines and dishes at your fingertips.</p>
            <button>Get Started</button>
    </div>
    </div>
  )
}
export default Header