import React from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import { PlaceOrder } from './pages/PlaceOrder/PlaceOrder'
import './App.css'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import CardPayments from './components/CardPayments/CardPayments'

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
    </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
