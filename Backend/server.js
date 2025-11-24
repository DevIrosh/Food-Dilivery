import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import foodroute from './routes/foodroute.js';


// Load environment variables

const app = express();
const PORT = process.env.PORT || 40000;//can change later

// Middleware configuration
app.use(cors());
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.url} - Content-Type: ${req.headers['content-type']}`);
    console.log('Request Body:', req.body);
    next();
});


//db connection
connectDB();

//api endpoints
app.use('/api/food', foodroute);
app.use("/images", express.static("uploads"));

app.get("/",(req, res) => res.send("Welcome to the Food Delivery API it's running"));// MongoDB connection 


app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});










