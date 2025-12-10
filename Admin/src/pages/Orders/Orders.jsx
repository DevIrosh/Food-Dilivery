import React from 'react'
import axios from 'axios'
import './Orders.css'   
import { toast } from 'react-toastify';


const Orders = ({url}) => {
  // Store data which comes from backend api
  const [orders, setOrders] = React.useState([]);

  const fetchOrders = React.useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/order/listorders`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log('Orders fetched successfully:', response.data.data);
      } else {
        toast.error('Failed to fetch orders: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    }
  }, [url]);

  React.useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Function to update order status
  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.post(`${url}/api/order/updatestatus`, {
        orderId: orderId,
        status: newStatus
      });
      
      if (response.data.success) {
        toast.success('Order status updated successfully!');
        // Refresh the orders list
        fetchOrders();
      } else {
        toast.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  // Function to extract phone number from address
  const extractPhoneFromAddress = (address) => {
    if (!address) return 'N/A';
    // Address format: "firstName lastName, phone, address"
    const parts = address.split(', ');
    if (parts.length >= 2) {
      return parts[1]; // Phone number is the second part
    }
    return 'N/A';
  };

  // Function to extract customer name from address
  const extractNameFromAddress = (address) => {
    if (!address) return 'N/A';
    const parts = address.split(', ');
    if (parts.length >= 1) {
      return parts[0]; // Name is the first part
    }
    return 'N/A';
  };

  // Function to extract delivery address from address
  const extractDeliveryAddress = (address) => {
    if (!address) return 'N/A';
    const parts = address.split(', ');
    if (parts.length >= 3) {
      return parts.slice(2).join(', '); // Address is everything after name and phone
    }
    return address;
  };

  return (
    <div className="orders">
      <h2>All Orders</h2>
      <div className="orders-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={order._id} className="order-item">
              <p><strong>Order #{index + 1}</strong></p>
              <p>Order ID: {order._id}</p>
              <p>Customer Name: {extractNameFromAddress(order.address)}</p>
              <p>Phone Number: {extractPhoneFromAddress(order.address)}</p>
              <p>Delivery Address: {extractDeliveryAddress(order.address)}</p>
              <p>Amount: ${order.amount}</p>
              <p>Date & Time: {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'} at {order.date ? new Date(order.date).toLocaleTimeString() : 'N/A'}</p>
              <div className="status-container">
                <label>Status: </label>
                <select 
                  value={order.status || 'processing'} 
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className={`status-dropdown status-${(order.status || 'processing').replace(/\s+/g, '-')}`}
                >
                  <option value="processing">Processing</option>
                  <option value="out for delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>  
                </select>
              </div>
              <p>User ID: {order.userid}</p>
              <div>
                <strong>Order Items:</strong>
                {order.orderdata && order.orderdata.length > 0 ? (
                  <ul>
                    {order.orderdata.map((item, idx) => (
                      <li key={idx}>{item.name} x {item.quantity} - ${item.price}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No items found</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  )
}

export default Orders       