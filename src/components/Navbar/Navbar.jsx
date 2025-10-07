import React from 'react'           
import './Navbar.css'
import {assets}
    from '../../assets/assets'
import { useState } from 'react'

export const Navbar = () => {

    const [linking, setLinking] = useState('Home');

  return (
    <div className="navbar">
        <img src={assets.logo} alt="logo" className="logo" />
        <ul className="nav-links">
            <li onClick={() => setLinking('Home')} className={linking === 'Home' ? 'active' : ''} >Home</li>
            <li onClick={() => setLinking('About')} className={linking === 'About' ? 'active' : ''} >About</li>
            <li onClick={() => setLinking('Menu')} className={linking === 'Menu' ? 'active' : ''} >Menu</li>
            <li onClick={() => setLinking('Contact')} className={linking === 'Contact' ? 'active' : ''} >Contact</li>
        </ul>   

        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search">
                <img src={assets.basket_icon} alt="" />
                <div className="dot"></div>
                
            </div>
        </div>      

        <button className="login-button">Login</button> 

    </div>
  )
}

export default Navbar