import Food from "../models/foodmodels.js";
import fs from 'fs';


// Controller to add a new food item
export const addFoodItem = async (req, res) => {
    try {
        console.log('=== ADD FOOD ITEM REQUEST ===');
        console.log('Request Body:', req.body);
        console.log('Request File:', req.file);
        console.log('Content-Type:', req.headers['content-type']);
       
        // Extract fields from request body
        const { name, description, price, category } = req.body;
        
        // Validate required fields
        if (!name || !description || !price || !category) {
            return res.status(400).json({ 
                success: false,
                message: "Missing required fields",
                required: ["name", "description", "price", "category"],
                received: { name, description, price, category }
            });
        }
        
        // Handle image path
        let image_path = "";
        if (req.file) {
            image_path = req.file.filename; // Store only filename, not full path
            console.log('Image Path:', image_path);
        } else {
            console.log('No image file provided');
            image_path = ""; // Default empty image path for optional image
        }
        // Create new food item
        console.log('Creating food item with:', { name, description, price, category, image: image_path });

        const newFoodItem = new Food({
            name: name.trim(),
            image: image_path,
            description: description.trim(),
            price: parseFloat(price),
            category: category.trim()
        });

        const savedFoodItem = await newFoodItem.save();
        console.log('Food Item Saved Successfully:', savedFoodItem._id);
        
        res.status(201).json({
            success: true,
            message: "Food item added successfully",
            data: savedFoodItem
        });
        
    } catch (error) {
        console.log('Error saving food item:', error);
        res.status(500).json({ 
            success: false,
            message: "Failed to add food item", 
            error: error.message 
        });
    }
}
// Controller to list all food items
export const listFoodItems = async (req, res) => {
    try {
        const foods = await Food.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log('Error fetching foods:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Controller to remove a food item
export const removeFoodItem = async (req, res) => {
    try {
        const { id } = req.body;
        
        if (!id) {
            return res.status(400).json({ 
                success: false, 
                message: "Food item ID is required" 
            });
        }

        const food = await Food.findById(id);
        if (!food) {
            return res.status(404).json({ 
                success: false, 
                message: "Food item not found" 
            });
        }

        // Remove image file if it exists
        if (food.image) {
            try {
                fs.unlinkSync(food.image);
            } catch (err) {
                console.log('Warning: Could not delete image file:', err.message);
            }
        }

        await Food.findByIdAndDelete(id);
        
        res.json({ 
            success: true, 
            message: "Food item removed successfully" 
        });
        
    } catch (error) {
        console.log('Error removing food item:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
}







