import React, { useState, useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContextValue'

export const Navbar = ({ setShowLogin }) => {

    const [linking, setLinking] = useState('Home');
    const [showDropdown, setShowDropdown] = useState(false);

    const {token, setToken}=useContext(StoreContext);
    // logout function
    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setShowDropdown(false);
    }

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
            
            {/*show profile icon when logged in, sign in button when not logged in */}
            {!token ? (
                <button onClick={() => setShowLogin(true)} className="login-button">sign in</button>
            ) : (
                <div className='navbar-profile'>
                    <img 
                        src={assets.profile_icon} 
                        alt="Profile" 
                        onClick={() => setShowDropdown(!showDropdown)}
                    />
                    {showDropdown && (
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => setShowDropdown(false)}>
                                <img src={assets.bag_icon} alt="" />
                                <p>Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    )}
                </div>
            )}
        </div>
        

    </div>
  )
}

export default Navbar