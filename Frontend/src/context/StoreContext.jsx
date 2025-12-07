import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { StoreContext } from './StoreContextValue'


const StoreContextProvider = (props) => {
    // cart is a map of itemId -> quantity
    const [cart, setCart] = useState({})
      // backend URL
    const url="http://localhost:40000";
    const [token, setToken] = useState("");   
    const [food_list, setFoodList] = useState([])

    const setItemCount = (id, count) => {
        setCart(prev => {
            if (!id) return prev
            if (count <= 0) {
                const { [id]: _, ...rest } = prev
                return rest
            }
            return { ...prev, [id]: count }
        })
    }

    const addItem = (id) => {
        if (!id) return
        setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
    }

    const removeItem = (id) => {
        if (!id) return
        setCart(prev => {
            const current = prev[id] || 0
            if (current <= 1) {
                const { [id]: _, ...rest } = prev
                return rest
            }
            return { ...prev, [id]: current - 1 }
        })
    }




    



    // Fetch food list from backend
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error('Error fetching food list:', error);
        }
    }

    // Load token from localStorage on mount solve the logout while refreshing
    useEffect(() => {
        const storedToken = localStorage.getItem('token')   
        if (storedToken) {
            setToken(storedToken);
        }
        fetchFoodList();
    }, []);


    const contextValue = {
        food_list,
        cart,
        setItemCount,
        addItem,
        removeItem,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export { StoreContextProvider }

export default StoreContextProvider

       