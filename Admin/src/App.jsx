import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Orders from './pages/Orders/Orders.jsx'
import Add from './pages/Additems/add.jsx'
import List from './pages/Listeditems/List.jsx' 

const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/orders" element={<Orders />} />
            <Route path="/add-items" element={<Add />} />
            <Route path="/list-items" element={<List />} /> 
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App   