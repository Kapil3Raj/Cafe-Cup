import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemsToCart } from '../redux/cartSlice.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgimg from "../assets/beansbg.png";
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline, IoIosArrowBack } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true); // <-- New loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/items`)
      .then(res => {
        setItems(res.data);
        setLoading(false); // <-- Set to false after loading
      })
      .catch(err => {
        console.error(err);
        setLoading(false); // <-- Even on error, stop loading
      });
  }, []);

  const handleAdd = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleRemove = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0)
    }));
  };

  const handleCartClick = () => {
    const selectedItems = items
      .filter(item => quantities[item._id] > 0)
      .map(item => ({
        id: item._id,
        name: item.name,
        price: item.price,
        quantity: quantities[item._id],
      }));

    if (selectedItems.length === 0) {
      alert("Please select some items before proceeding to cart!");
      return;
    }

    dispatch(addItemsToCart(selectedItems));
    navigate("/cart");
  };

  return (
    <div className="p-5 flex flex-col items-center min-h-screen relative" style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover' }}>
      <h1 className="amatic text-5xl font-bold mb-5 text-center text-brown bg-white px-6 py-1 round">Menu</h1>

      <button className="absolute top-5 left-5 md:top-7 md:left-7 p-2 text-2xl text-white bg-black rounded-full border-2 border-white hover:bg-transparent hover:text-white transition duration-300"
        onClick={() => navigate("/")}>
        <IoIosArrowBack />
      </button>

      <button
        onClick={handleCartClick}
        className="absolute top-5 right-5 md:top-7 md:right-7 p-2 bg-black text-white rounded-full shadow-lg text-3xl hover:bg-transparent hover:text-white hover:scale-103 ease-in-out border-2 border-white "
      >
        <CiShoppingCart />
      </button>

      {/* Loading Indicator */}
      {loading ? (
         <div className="flex flex-col items-center justify-center py-10">
         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white mb-4"></div>
         <p className="text-white text-3xl amatic">Loading...</p>
       </div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 backdrop-blur-sm border-4 border-white rounded-2xl">
          {items.map(item => (
            <div key={item._id} className="w-full h-auto flex justify-center items-center bg-brown relative rounded-lg shadow-lg hover:scale-105 duration-250">
              <div className='w-full h-full patrick'>
                <img src={item.image} alt={item.name} className="w-full h-[200px] object-cover rounded-lg" />
                <h2 className="amatic text-3xl font-bold mb-1 absolute top-2 left-2 text-brown bg-white border-2 border-brown px-2 rounded-br-lg">{item.name}</h2>
                <p className="text-white text-sm sm:text-base bg-brown font-semibold p-2 absolute top-2 right-2 rounded-bl-lg">₹{item.price}</p>
                <div className='flex absolute bottom-2 right-2 bg-brown text-white p-2 text-2xl justify-center items-center gap-3 rounded-tl-lg'>
                  <button onClick={() => handleRemove(item._id)}>
                    <IoIosRemoveCircleOutline />
                  </button>
                  <h3>{quantities[item._id] || 0}</h3>
                  <button onClick={() => handleAdd(item._id)}>
                    <IoIosAddCircleOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
