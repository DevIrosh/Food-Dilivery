import React from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import { PlaceOrder } from './pages/PlaceOrder/PlaceOrder'
import OrderSuccess from './pages/OrderSuccess/OrderSuccess'
import OrderCancel from './pages/OrderCancel/OrderCancel'
import Verify from './pages/Verify/Verify'
import './App.css'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import CardPayments from './components/CardPayments/CardPayments'
import Myorders from './pages/Myorders/Myorders'

export const App = () => {

  const [showlogin, setShowLogin] = React.useState(false);

  return (
    <>

    {showlogin?<Login setShowLogin={setShowLogin} />:null}

   <div className='app'>

    <Navbar setShowLogin={setShowLogin} />

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/order' element={<PlaceOrder />} />
      <Route path='/payment' element={<CardPayments />} />
      <Route path='/ordersuccess' element={<OrderSuccess />} />
      <Route path='/ordercancel' element={<OrderCancel />} />
      <Route path='/verify' element={<Verify />} />
      <Route path='/myorders' element={<Myorders />} />
    </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
