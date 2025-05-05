import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { MdBrowserUpdated } from "react-icons/md"; // Assuming you want the icon here too

const UpdateItem = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();

  // Local state for item details
  const [item, setItem] = useState({
    name: '',
    price: '',
    availableQty: '',
    image: ''
  });

  // Local state for loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch item data when component mounts
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/items/${id}`);
        setItem(res.data); // Set the item data to state
      } catch (err) {
        console.error('Error fetching item:', err);
        setError('Failed to fetch item');
      }
    };

    fetchItem();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  // Handle form submission to update item
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the update starts

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_BASEURL}/api/items/${id}`, item); // Update item in the backend
      setLoading(false); // Set loading to false after the update is done
      navigate('/manageitems/allitems'); // Navigate to the all items page
    } catch (err) {
      setLoading(false); // Stop loading in case of error
      setError('Failed to update item'); // Set error state
    }
  };

  return (
    <div className="w-full max-w-md cartoon-box p-6 relative">
      <h2 className="text-4xl amatic font-medium flex justify-center mb-4">Update Item</h2>

      {loading && (
        <div className="text-center">
          <p>Updating item...</p>
          {/* You can add a spinner here or just a loading text */}
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && (
        <form onSubmit={handleSubmit} className="space-y-4 text-xl">
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            placeholder="Item Name"
            className="w-full cartoon-input"
            required
          />
          <input
            type="number"
            name="price"
            value={item.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full cartoon-input"
            required
          />
          <input
            type="number"
            name="availableQty"
            value={item.availableQty}
            onChange={handleChange}
            placeholder="Available Quantity"
            className="w-full cartoon-input"
            required
          />
          <input
            type="text"
            name="image"
            value={item.image}
            onChange={handleChange}
            placeholder="Image URL (optional)"
            className="w-full cartoon-input"
          />
          <div className='flex justify-around'>
          <button className=' amatic cartoon-black-button text-2xl' onClick={()=>navigate("/manageitems/allitems")}>Cancel</button>
          <button type="submit" className=" amatic cartoon-black-button text-2xl flex justify-center items-center gap-3">
            <MdBrowserUpdated /> Update Item
          </button>
          </div>
       
        </form>
      )}
    </div>
  );
};

export default UpdateItem;
