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

    const contextValue = {
        food_list,
        cart,
        setItemCount,
        addItem,
        removeItem,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export { StoreContextProvider }

export default StoreContextProvider

       