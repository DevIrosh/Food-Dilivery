import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'

const Add = () => {
  return (
    <div className="page-content">
      <div className="add">
        <form className="add-form">
          <div className="add-img add-form">
        <h2>Add New Food Item Image</h2>
        <p>This is the Add Items image page. image will be properly positioned here.</p>
        <label htmlFor="item-image">
          <img src={assets.upload_area} alt="Item" className="item-image-preview" />
        </label>

        <input type="file" id="item-image" hidden required />
      </div>

      <div className="add-details add-form">
        <h2>Add New Food Item Details</h2>
        <p>This is the Add Items details page. details will be properly positioned here.</p>
        <input type="text" placeholder="Item Name" required />
        <textarea name="item-description" rows="4" placeholder="Item Description" required></textarea>
        <input type="number" placeholder="Item Price" required />
       
        <select name="item-category" required>
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