import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllItems = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all items from backend
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/items`);
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching items", err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="w-full max-w-4xl p-6 shadow-lg backdrop-blur-sm border-4 border-white">
      <h2 className="text-5xl amatic text-center mb-2 text-white">All Items</h2>
      
      <div className="flex justify-between mb-4">
      <button 
          className="cartoon-white-button amatic text-2xl px-4 py-2"
          onClick={() => navigate("/menu")}
        >
          Menu
        </button>
        <button 
          className="cartoon-white-button amatic text-2xl px-4 py-2"
          onClick={() => navigate("/manageitems/add")}
        >
          Add New Item
        </button>
        
      </div>
      
      <div className="flex flex-col gap-4">
        {items.map(item => (
          <div key={item._id} className="cartoon-box p-4 flex flex-col md:flex-row items-center gap-4">
            {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />}
            
            <div className="flex-1 flex justify-around items-center gap-3 text-xl">
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <p>Available: {item.availableQty}</p>
            </div>

            <div className="flex gap-2">
              <button 
                className="cartoon-black-button"
                onClick={() => navigate(`/manageitems/update/${item._id}`)} // Pass item id to update route
              >
                Edit
              </button>
              <button 
                className="cartoon-black-button"
                onClick={() => navigate(`/manageitems/delete/${item._id}`)} // Pass item id to delete route
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllItems;
