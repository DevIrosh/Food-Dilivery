import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Orders from './pages/Orders/Orders.jsx'
import Add from './pages/Additems/add.jsx'
import List from './pages/Listeditems/List.jsx' 
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

// Define the backend URL
  const url="http://localhost:40000";

  
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/orders" element={<Orders url={url} />} />
            <Route path="/add-items" element={<Add url={url} />} />
            <Route path="/list-items" element={<List url={url} />} /> 
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App   