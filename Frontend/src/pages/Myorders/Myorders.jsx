import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContextValue'
import { assets } from '../../assets/assets'
import './Myorders.css'

const Myorders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    // Debug: Log context values
    console.log('Myorders Debug:', {
        url: url,
        token: token ? `Token exists (length: ${token.length})` : 'No token',
        hasToken: !!token
    });

    useEffect(() => {
        // Fetch user's orders from backend
        const fetchOrders = async () => {
            try {
                console.log('Fetching orders with token:', token ? 'Token exists' : 'No token');
                const response = await axios.post(`${url}/api/order/userorders`, {}, {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Orders response:', response.data);
                if (response.data.success) {
                    setData(response.data.data);
                    console.log('Orders loaded:', response.data.data.length, 'orders');
                    // Debug: Log first order structure
                    if (response.data.data.length > 0) {
                        console.log('First order structure:', response.data.data[0]);
                    }
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                console.error("Error response:", error.response?.data);
            }
        }

        if (token) {
            fetchOrders();
        }
    }, [token, url]);

    // If no token, show login message
    if (!token) {
        return (
            <div className="my-orders">
                <h2>My Orders</h2>
                <p>Please log in to view your orders.</p>
            </div>
        );
    }

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0' }}>
                <p><strong>Debug Info:</strong></p>
                <p>URL: {url}</p>
                <p>Token: {token ? 'Available' : 'Not available'}</p>
                <p>Orders count: {data.length}</p>
            </div>
            
            {data.length === 0 ? (
                <p>No orders found</p>
            ) : (
                <div>
                    {data.map((order) => (
                        <div key={order._id} className="order-row">
                            <img src={assets.parcel_icon} alt="" />
                            <div>
                                <p>
                                    {order.orderdata && order.orderdata.length > 0 ? (
                                        order.orderdata.map((item, index) => {
                                            if (index === order.orderdata.length - 1) {
                                                return item.name + " x " + item.quantity
                                            } else {
                                                return item.name + " x " + item.quantity + ", "
                                            }
                                        })
                                    ) : (
                                        "No items found"
                                    )}
                                </p>
                            </div>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.orderdata ? order.orderdata.length : 0}</p>
                            <p><b>{order.status || 'Unknown'}</b></p>
                            <button>Track Order</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Myorders         