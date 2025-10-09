import React, { useState, useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContextValue'

export const Navbar = ({ setShowLogin }) => {

    const [linking, setLinking] = useState('Home');
    // get cart from value
    const { cart = {} } = useContext(StoreContext) || {}
    const totalItems = Object.values(cart).reduce((sum, v) => sum + (Number(v) || 0), 0)

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
                <div className={totalItems > 0 ? 'dot' : ''}>{totalItems > 0 ? totalItems : ''}</div>
                
            </div>
        </div>      
        {/*set show login */}
        <button onClick={() => setShowLogin(true)} className="login-button">Login</button> 

    </div>
  )
}

export default Navbar