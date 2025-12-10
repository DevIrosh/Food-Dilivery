import mongoose from "mongoose";


const orderscehema = new mongoose.Schema({
    userid: { type: String, required: true },
    orderdata: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, default: false },
    stripeSessionId: { type: String }
}, { timestamps: true });

const Order = mongoose.model.order || mongoose.model("Order", orderscehema);
export default Order;