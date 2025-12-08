import React, { useState } from 'react'
import { food_list } from '../assets/assets'
import { StoreContext } from './StoreContextValue'


const StoreContextProvider = (props) => {
    // cart is a map of itemId -> quantity
    const [cart, setCart] = useState({})

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
// Add item to cart
    const addItem = async (id) => {
        if (!id) return
        setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
        // Sync with backend if token is available
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
        // Sync with backend if token is available
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

<<<<<<< Updated upstream
=======



    



    // Fetch food list from backend
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error('Error fetching food list:', error);
        }
    }

    // Load cart data from backend
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${url}/api/cart/get`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(response.data.data); // Fix: use response.data.data not cartData
        } catch (error) {
            console.error('Error loading cart data:', error);
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

>>>>>>> Stashed changes
    const contextValue = {
        food_list,
        cart,
        setItemCount,
        addItem,
        removeItem,
<<<<<<< Updated upstream
=======
        getTotalCartAmount,
        url,
        token,
        setToken
>>>>>>> Stashed changes
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export { StoreContextProvider }

export default StoreContextProvider

       