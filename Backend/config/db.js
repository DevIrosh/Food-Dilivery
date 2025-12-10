import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// MongoDB connection function
export const connectDB = async () => {
    try {
        // Use Atlas connection string format
        const mongoURI = process.env.MONGODB_URI || "mongodb+srv://fdelivery_db_user:UMiTJwbdprzYvwAV7@cluster0.z5ltf3a.mongodb.net/FOOD-DELIVERY?retryWrites=true&w=majority&appName=Cluster0";
        
        console.log("Attempting to connect to MongoDB Atlas...");
        
        await mongoose.connect(mongoURI);
        
        console.log("MongoDB Atlas connected successfully to FOOD-DELIVERY database");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        // Don't exit in development, just log the error
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
}