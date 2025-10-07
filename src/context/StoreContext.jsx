import { food_list } from '../assets/assets'
import { StoreContext } from './StoreContextValue'


const StoreContextProvider = (props) => {
    const contextValue = {
        food_list,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export { StoreContextProvider }

export default StoreContextProvider

       