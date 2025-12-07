import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'



const Add = ({url}) => {

  const [Image, setImage] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState(false);
  const[data,setData]=React.useState({
    itemName:"",
    itemDescription:"",
    itemPrice:"",
    itemCategory:""
  });


// Input change handler
  const onChangeHandler=(e)=>{
    const {name,value}=e.target;
    setData((prevData)=>({
      ...prevData,
      [name]:value
    }));
  }

// Form submission handler
const onsubmitHandler= async (e)=>{
  e.preventDefault();
  
  // Validation with if-else
  if (!data.itemName || !data.itemDescription || !data.itemPrice || !data.itemCategory) {
    toast.error('Please fill in all required fields');
    return;
  }
  
  if (!Image) {
    toast.error('Please select an image for the food item');
    return;
  }
  
  if (Number(data.itemPrice) <= 0) {
    toast.error('Please enter a valid price greater than 0');
    return;
  }

  try {
    // Handle form submission logic here
    const formData = new FormData();
    formData.append('name', data.itemName);
    formData.append('description', data.itemDescription);
    formData.append('price', Number(data.itemPrice));
    formData.append('category', data.itemCategory);
    formData.append('image', Image);
    
    const response = await axios.post(`${url}/api/food/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (response.data.success) {
      console.log('Food item added successfully:', response.data);
      toast.success('Food item added successfully!');
      // Reset form after successful submission
      setData({
        itemName:"",
        itemDescription:"",
        itemPrice:"",
        itemCategory:""
      });
      setImage(false);
      setImagePreview(false);

    } else {
      console.error('Failed to add food item:', response.data.message);
      toast.error('Failed to add food item: ' + response.data.message);
    }
  } catch (error) {
    console.error('Error adding food item:', error);
    if (error.response) {
      toast.error('Error: ' + error.response.data.message);
    } else {
      toast.error('Network error. Please check your connection and try again.');
    }
  }
}



  return (
    <div className="page-content">
      <div className="add">
        <form className="add-form" onSubmit={onsubmitHandler}>
          <div className="add-img add-form">
        <h2>Add New Food Item Image</h2>
        <p>This is the Add Items image page. image will be properly positioned here.</p>
        <label htmlFor="item-image">
          <img src={imagePreview || assets.upload_area} alt="Item" className="item-image-preview" />
        </label>

        <input onChange={(e) => {
          setImage(e.target.files[0]);
          setImagePreview(URL.createObjectURL(e.target.files[0]));
        }} type="file" id="item-image" hidden required />
      </div>


      <div className="add-details add-form">
        <h2>Add New Food Item Details</h2>
        <p>This is the Add Items details page. details will be properly positioned here.</p>
        <input onChange={onChangeHandler} value={data.itemName} name="itemName" type="text" placeholder="Item Name" required />
        <textarea onChange={onChangeHandler} value={data.itemDescription} name="itemDescription" rows="4" placeholder="Item Description" required></textarea>
        <input onChange={onChangeHandler} value={data.itemPrice} name="itemPrice" type="number" placeholder="Item Price" required />
       
        <select onChange={onChangeHandler} value={data.itemCategory} name="itemCategory" required>
          <option value="">Select Item Category</option>
          <option value="Salad">Salad</option>
          <option value="Rolls">Rolls</option>
          <option value="Deserts">Deserts</option>
          <option value="Sandwich">Sandwich</option>
          <option value="Cake">Cake</option>
          <option value="Pure Veg">Pure Veg</option>
          <option value="Pasta">Pasta</option>
          <option value="Noodles">Noodles</option>
          <option value="Pizza">Pizza</option>
          <option value="Burgers">Burgers</option>
        </select>
        <button type="submit" className="add-button">Add Item</button>
      </div>

        </form>
      </div>
      
    </div>
  )
}

export default Add