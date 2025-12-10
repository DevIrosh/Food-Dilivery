import ordermodels from "../models/ordermodels.js";
import usermodels from "../models/usermodels.js";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const placeorder = async (req, res) => {    
    // **********Frontend URL for redirect after payment***************
    const frontend_url = process.env.FRONTEND_URL || 'http://localhost:5173';   

    try {
        console.log('Order request data:', {
            userId: req.userId,
            bodyUserId: req.body.userId,
            orderdata: req.body.orderdata,
            amount: req.body.amount,
            paymentMethod: req.body.paymentMethod
        });

        // CRITICAL CHECK: Stop ALL database saves for card payments
        console.log('Payment Method Check:', req.body.paymentMethod);
        console.log('Payment Method Type:', typeof req.body.paymentMethod);
        console.log('Is Card Payment?:', req.body.paymentMethod === 'card');
        
        // ABSOLUTE SAFETY CHECK - NO DATABASE SAVES FOR CARD PAYMENTS
        if (req.body.paymentMethod === 'card' || req.body.paymentMethod === 'creditCard') {
            console.log('CARD PAYMENT DETECTED - ABSOLUTELY NO DATABASE SAVE!');
            const line_items = req.body.orderdata.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                    },   
                    unit_amount: item.price * 100, // amount in cents
                },
                quantity: item.quantity,
            }));

            // Create Stripe checkout session with order data in metadata
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: line_items, 
                mode: 'payment',
                success_url: `${frontend_url}/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${frontend_url}/ordercancel`,
                metadata: {
                    userId: req.userId || req.body.userId,
                    orderData: JSON.stringify(req.body.orderdata),
                    amount: req.body.amount.toString(),
                    address: req.body.address,
                    paymentMethod: req.body.paymentMethod
                }
            });

            res.status(200).json({ 
                success: true, 
                message: "Redirecting to payment", 
                sessionUrl: session.url 
            }); 
        } else {
            // For cash on delivery or other payment methods - save order immediately
            console.log('CASH PAYMENT - SAVING ORDER TO DB IMMEDIATELY');
            const neworderdata = new ordermodels({
                userid: req.userId || req.body.userId,
                orderdata: req.body.orderdata,
                amount: req.body.amount,
                address: req.body.address,
                paymentMethod: req.body.paymentMethod,
                payment: true // Cash orders are considered paid
            });
            await neworderdata.save();
            await usermodels.findByIdAndUpdate(req.userId || req.body.userId, { $set: { cartdata: {} } });

            res.status(200).json({ 
                success: true, 
                message: "Order placed successfully", 
                data: neworderdata
            }); 
        }
    } catch (error) {
        console.log('Error placing order:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get user orders
const userorders = async (req, res) => {
    try {
        const orders = await ordermodels.find({ userid: req.userId });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.log('Error fetching user orders:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get all orders (for admin)
const listorders = async (req, res) => {
    try {
        const orders = await ordermodels.find({});
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.log('Error fetching orders:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Update order status
const updatestatus = async (req, res) => {
    try {
        await ordermodels.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.status(200).json({ success: true, message: "Status updated" });
    } catch (error) {
        console.log('Error updating order status:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const verifyorder = async (req, res) => {
    console.log('VERIFY ORDER FUNCTION CALLED');
    console.log('Request body:', req.body);
    const { success, session_id } = req.body;

    try { 
        if (success === "true" && session_id) {
            // Retrieve the checkout session from Stripe
            const session = await stripe.checkout.sessions.retrieve(session_id);
            
            if (session.payment_status === 'paid') {
                // Extract order data from metadata
                const orderData = JSON.parse(session.metadata.orderData);
                
                // Now create the order in database after successful payment
                const neworderdata = new ordermodels({
                    userid: session.metadata.userId,
                    orderdata: orderData,
                    amount: parseInt(session.metadata.amount),
                    address: session.metadata.address,
                    paymentMethod: session.metadata.paymentMethod,
                    payment: true,
                    stripeSessionId: session_id
                });
                
                await neworderdata.save();
                
                // Clear user's cart after successful payment
                await usermodels.findByIdAndUpdate(session.metadata.userId, { $set: { cartdata: {} } });
                
                res.status(200).json({ 
                    success: true, 
                    message: "Payment verified and order created successfully",
                    orderId: neworderdata._id
                });
            } else {
                res.status(400).json({ success: false, message: "Payment not completed" });
            }
        } else {
            res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.log('Error verifying order payment:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}


//listing orders for admin
const listallorders = async (req, res) => {
    try {
        const orders = await ordermodels.find({});
        res.status(200).json({ success: true, data: orders });
    }
    catch (error) {
        console.log('Error fetching all orders:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { placeorder, userorders, listorders, updatestatus, verifyorder,listallorders };