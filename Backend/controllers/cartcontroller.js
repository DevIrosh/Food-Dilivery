import usermodels from '../models/usermodels.js'; 

const addtocart = async (req, res) => {    
    try {
        const { itemId } = req.body;
        const userId = req.body.userId; // This comes from auth middleware
        
        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "User ID and Item ID are required" });
        }

        let userdata = await usermodels.findById(userId);
        if (!userdata) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartdata = userdata.cartdata || {};
        
        if (!cartdata[itemId]) {
            cartdata[itemId] = 1;
        } else {
            cartdata[itemId] += 1;
        }
        
        userdata.cartdata = cartdata;
        userdata.markModified('cartdata'); // Important: Mark nested object as modified
        await userdata.save();
        
        res.status(200).json({ 
            success: true, 
            message: "Item added to cart successfully", 
            data: userdata.cartdata 
        });
    } catch (error) {
        console.log('Error adding to cart:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}





const removefromcart = async (req, res) => {    
    try {
        const { itemId } = req.body;
        const userId = req.body.userId; // This comes from auth middleware
        
        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "User ID and Item ID are required" });
        }

        let userdata = await usermodels.findById(userId);
        if (!userdata) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartdata = userdata.cartdata || {};
        
        if (cartdata[itemId] && cartdata[itemId] > 0) {
            cartdata[itemId] -= 1;
            if (cartdata[itemId] === 0) {
                delete cartdata[itemId];
            }
        }
        
        userdata.cartdata = cartdata;
        userdata.markModified('cartdata'); // Important: Mark nested object as modified
        await userdata.save();
        
        res.status(200).json({ 
            success: true, 
            message: "Item removed from cart successfully", 
            data: userdata.cartdata 
        });
    } catch (error) {
        console.log('Error removing from cart:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}




const getcartitems = async (req, res) => {    
    try {
        // userId is set by auth middleware
        const userId = req.body.userId;
        
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        let userdata = await usermodels.findById(userId);
        if (!userdata) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartdata = userdata.cartdata || {};
        
        res.status(200).json({ 
            success: true, 
            message: "Cart items retrieved successfully", 
            data: cartdata 
        });
    } catch (error) {
        console.log('Error getting cart items:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { addtocart, removefromcart, getcartitems };