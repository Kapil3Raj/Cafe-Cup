import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoAddSharp } from "react-icons/io5";



const AddItems = () => {
  const navigate = useNavigate(); // moved inside component ✅

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    availableQty: '',
    image: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/items`, formData);
      alert("Item added successfully!");

      navigate("/manageitems/allitems"); // navigate here after success ✅
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <div className="w-full max-w-md cartoon-box p-6 relative">
      <h2 className="text-4xl amatic font-medium flex justify-center mb-4">Add New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-xl">
        <input type="text" name="name" placeholder="Item name" onChange={handleChange} required className="w-full cartoon-input" />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required className="w-full cartoon-input" />
        <input type="number" name="availableQty" placeholder="Available Quantity" onChange={handleChange} required className="w-full cartoon-input" />
        <input type="text" name="image" placeholder="Image URL (optional)" onChange={handleChange} className="w-full cartoon-input" />
        <div className='flex justify-around '>
          <button className=' amatic cartoon-black-button text-2xl' onClick={() => navigate("/manageitems/allitems")}>Cancel</button>
          <button type="submit" className=" amatic cartoon-black-button text-2xl flex justify-center items-center gap-2">
            <IoAddSharp /> Add Item
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddItems;
