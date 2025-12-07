import express from 'express';
import { registeruser, loginuser } from '../controllers/usercontroller.js';


const userroute = express.Router();

// User registration route
console.log('🔗 Setting up /register route');
userroute.post('/register', registeruser);
// User login route  
console.log('🔗 Setting up /login route');
userroute.post('/login', loginuser);

// Test route
userroute.get('/test', (req, res) => {
    res.json({ success: true, message: 'User routes are working!' });
});

console.log('✅ User routes defined successfully');


export default userroute;