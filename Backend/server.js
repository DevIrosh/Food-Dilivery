import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import foodroute from './routes/foodroute.js';
import userroute from './routes/userroute.js';
import cartroute from './routes/cartroute.js';
import orderroute from './routes/orderroute.js';
import 'dotenv/config';


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
    console.log('Request Headers:', req.headers);
    
    // Special logging for cart routes
    if (req.url.includes('/api/cart')) {
        console.log('🛒 CART REQUEST DETECTED:', req.method, req.url);
    }
    
    next();
});


//db connection
connectDB();

//api endpoints
app.use('/api/food', foodroute);
app.use("/images", express.static("uploads"));
//user route api
console.log('Setting up user routes...');
app.use('/api/user', userroute);
console.log('User routes configured');

console.log('Setting up cart routes...');
app.use('/api/cart', cartroute);
console.log('Cart routes configured');

console.log('Setting up order routes...');
app.use('/api/order', orderroute);
console.log('Order routes configured');

// Test endpoint for verification
app.post('/api/order/verify-test', (req, res) => {
    console.log('🧪 TEST VERIFY ENDPOINT HIT');
    res.json({ success: true, message: 'Test endpoint working' });
});

// Catch-all middleware to log unmatched routes
app.use((req, res, next) => {
    console.log(`UNMATCHED ROUTE: ${req.method} ${req.url}`);
    next();
});

// Root endpoint
app.get("/",(req, res) => res.send("Welcome to the Food Delivery API it's running"));// MongoDB connection 


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});










