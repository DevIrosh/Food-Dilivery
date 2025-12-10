import React from 'react'
import './List.css' 
import axios from 'axios'
import { toast } from 'react-toastify'


const List = ({url}) => {



const [items,setItems]=React.useState([]);
const [loading,setLoading]=React.useState(true);

const deleteItem = async (itemId, itemName) => {
  if (!window.confirm(`Are you sure you want to delete "${itemName}"?`)) {
    return;
  }
  
  try {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: itemId
    });
    
    if (response.data.success) {
      toast.success('Item deleted successfully!');
      // Remove item from local state
      setItems(items.filter(item => item._id !== itemId));
    } else {
      toast.error('Failed to delete item: ' + response.data.message);
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    if (error.response) {
      toast.error('Error: ' + error.response.data.message);
    } else {
      toast.error('Network error. Please try again.');
    }
  }
};

const fetchItems=async()=>{
try {
  setLoading(true);
  const response=await axios.get(`${url}/api/food/list`);
  console.log('API Response:', response.data);
  if(response.data.success){      
    // Clean up image paths to remove uploads/ or uploads\ prefix
    const cleanedItems = response.data.data.map(item => ({
      ...item,
      image: item.image ? item.image.replace(/^uploads[\\/]/, '') : item.image
    }));
    setItems(cleanedItems);
    console.log('Items with cleaned image paths:', cleanedItems.map(item => ({ name: item.name, image: item.image })));
    
    // Test image URLs
    response.data.data.forEach(item => {
      if (item.image) {
        const imageUrl = `${url}/images/${item.image}`;
        console.log('Testing image URL:', imageUrl);
        
        // Test if URL is accessible
        fetch(imageUrl)
          .then(res => {
            if (res.ok) {
              console.log('✅ Image accessible:', imageUrl);
            } else {
              console.log('Image not accessible:', imageUrl, 'Status:', res.status);
            }
          })
          .catch(err => {
            console.log('Image fetch error:', imageUrl, err.message);
          });
      }
    });
  } else {
    toast.error('Failed to fetch items');
  }
} catch (error) {
  console.error('Error fetching items:', error);
  toast.error('Network error. Please try again.');
} finally {
  setLoading(false);
}
}
// Fetch items on component mount
React.useEffect(()=>{
fetchItems();
},[]);  

  return (
    <div className="list">
      <p className="list-title">Listed Food Items</p>
      {loading ? (
        <div className="loading">Loading items...</div>
      ) : (
      <div className="items-container">
      <div className="items-header">
      <b>Image</b>
      <b>Name</b>
      <b>Description</b>
      <b>Category</b>   
      <b>Price</b>
      </div>
      {items.length > 0 ? items.map((item,index)=>(
          <div key={index} className="item-row">
            <img 
              src={item.image ? `${url}/images/${item.image}` : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiNDQ0MiLz4KPC9zdmc+'} 
              alt={item.name} 
              className="item-image"
              onError={(e) => {
                console.log('Image failed to load:', `${url}/images/${item.image}`);
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkZFQkVCIi8+CjxwYXRoIGQ9Ik0yNSAyNUgzNVYzNUgyNVYyNVoiIGZpbGw9IiNGRjAwMDAiLz4KPHRleHQgeD0iMzAiIHk9IjQ1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjgiIGZpbGw9IiNGRjAwMDAiPkVSUk9SPC90ZXh0Pgo8L3N2Zz4=';
                e.target.onerror = null; // Prevent infinite loop
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', `${url}/images/${item.image}`);
              }}
            />
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{item.category}</p>
            <p>${item.price.toFixed(2)}</p>
            <button 
              className="delete-btn" 
              onClick={() => deleteItem(item._id, item.name)}
              title={`Delete ${item.name}`}
            >
              ×
            </button>
          </div>
      )) : (
        <div className="no-items">
          <p>No food items found. Add some items first!</p>
        </div>
      )}
      </div>
      )}
    </div>
  )
}


export default List 