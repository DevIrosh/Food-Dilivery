import React from 'react'           
import './Navbar.css'
import {assets}
    from '../../assets/assets'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Navbar = ({ setShowLogin }) => {

    const [linking, setLinking] = useState('Home');

  return (
    <div className="navbar">
        <Link to='/'><img src={assets.logo} alt="logo" className="logo" /></Link>
        <ul className="nav-links">
            <Link to='/' onClick={() => setLinking('Home')} className={linking === 'Home' ? 'active' : ''} >Home</Link>
            <a href='#footer' onClick={() => setLinking('About')} className={linking === 'About' ? 'active' : ''} >About</a>
            <a href='#exploreMenu' onClick={() => setLinking('Menu')} className={linking === 'Menu' ? 'active' : ''} >Menu</a>
            <a href='#footer' onClick={() => setLinking('Contact')} className={linking === 'Contact' ? 'active' : ''} >Contact</a>
        </ul>   

        <div className="navbar-right">
            <Link to='/search'><img src={assets.search_icon} alt="" /></Link>
            <div className="navbar-search">
                <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className="dot"></div>
                
            </div>
        </div>      
        {/*set show login */}
        <button onClick={() => setShowLogin(true)} className="login-button">Login</button> 

    </div>
  )
}

export default Navbar