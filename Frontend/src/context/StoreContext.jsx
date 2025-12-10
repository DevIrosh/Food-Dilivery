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

    // Load cart data from backend
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${url}/api/cart/get`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(response.data.data);
        } catch (error) {
            console.error('Error loading cart data:', error);
        }
    }


// Function to add item to cart
    const addItem = async (id) => {
        if (!id) return
        setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId: id }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error('Error adding item to cart:', error);
            }
        }
    }
// Function to remove item from cart
    const removeItem = async (id) => {
        if (!id) return
        setCart(prev => {
            const current = prev[id] || 0
            if (current <= 1) {
                const { [id]: _, ...rest } = prev
                return rest
            }
            return { ...prev, [id]: current - 1 }
        })
        if (token) {
            try {
                await axios.post(`${url}/api/cart/remove`, { itemId: id }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error('Error removing item from cart:', error);
            }
        }
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
            loadCartData(storedToken);
        }
        fetchFoodList();
    }, []);


    // Calculate total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cart) {
            if (cart[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cart[item];
                }
            }
        }
        return totalAmount;
    }

    const contextValue = {
        food_list,
        cart,
        setItemCount,
        addItem,
        removeItem,
        getTotalCartAmount,
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

       