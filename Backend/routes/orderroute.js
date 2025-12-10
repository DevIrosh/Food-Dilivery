import express from 'express';
import authmiddleware from '../middleware/auth.js';
import { placeorder, userorders, listorders, updatestatus, verifyorder,listallorders } from '../controllers/ordercontroller.js';

const orderroute = express.Router();

console.log('REGISTERING ORDER ROUTES...');

// Order routes with authentication middleware
orderroute.post('/placeorder', authmiddleware, placeorder);
orderroute.post('/userorders', authmiddleware, userorders);
orderroute.get('/listorders', listorders);
orderroute.get('/list', listorders); // Add /list route for convenience
orderroute.post('/updatestatus', updatestatus);
orderroute.post('/verify', (req, res, next) => {
    console.log('VERIFY ENDPOINT CALLED');
    next();
}, verifyorder);

orderroute.get("/listallorders", listallorders);

console.log('ORDER ROUTES REGISTERED: /placeorder, /userorders, /listorders, /updatestatus, /verify, /listallorders');

export default orderroute;