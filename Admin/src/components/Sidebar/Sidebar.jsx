import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <NavLink to="/add-items" className='sidebar-options'>
            <img src={assets.add_icon} alt="Add" />
            <p>Add Items</p>
        </NavLink>

        <NavLink to="/list-items" className='sidebar-options'>
            <img src={assets.order_icon} alt="List" />
            <p>List Items</p>
        </NavLink>

        <NavLink to="/orders" className='sidebar-options'>
            <img src={assets.order_icon} alt="Orders" />
            <p>View Orders</p>
        </NavLink>
    </div>
  )
}

export default Sidebar  