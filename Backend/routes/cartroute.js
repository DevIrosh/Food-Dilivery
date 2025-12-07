import express from 'express';
import { addtocart,removefromcart,getcartitems } from '../controllers/cartcontroller.js';
import authmiddleware from '../middleware/auth.js';

//api endpoints
const cartroute = express.Router();

console.log('🔗 Setting up cart/add route');
cartroute.post('/add', authmiddleware, addtocart);

console.log('🔗 Setting up cart/remove route');
cartroute.post('/remove', authmiddleware, removefromcart);

console.log('🔗 Setting up cart/get route');
cartroute.post('/get', authmiddleware, getcartitems);

console.log('✅ All cart routes defined');
export default cartroute;