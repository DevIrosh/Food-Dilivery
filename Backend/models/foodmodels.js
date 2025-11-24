import mongoose from "mongoose";

const foodscehema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    
    /*calories: {
        type: Number, required: true        
    },  */
    description: {
        type: String, required: true
    },  
    price: {
        type: Number, required: true
    },
    image: { 
        type: String, required: false, default: ""
    },
    category: {
        type: String, required: true
    }       
});

// Check if the model already exists to avoid OverwriteModelError
const Food = mongoose.models.Food || mongoose.model('Food', foodscehema);

export default Food;