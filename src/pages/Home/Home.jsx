import React from 'react'
import './Home.css' 
import { Header } from '../../components/Navbar/Header/Header'
import { ExploreMenu } from '../../components/ExploreMenu/ExploreMenu'

export const Home = () => {
  return (
    <div>
        <Header />
        <ExploreMenu />
    
    </div>
  )
}
export default Home
