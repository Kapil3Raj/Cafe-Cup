import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bgimg from "../assets/beansbg.png";
import AddItems from '../components/addItems.jsx';
import DeleteItem from '../components/deleteItem.jsx';
import UpdateItem from '../components/updateItem.jsx';
import AllItems from '../components/allItems.jsx';
import NotFound from '../components/notFound.jsx';
import { IoIosArrowBack } from "react-icons/io";

const ManageItems = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const { action, id } = useParams(); // Extract both 'action' and 'id' from URL

  // Check if `id` is required for the action, if not, pass a fake id or skip the `id`
  const actionComponents = {
    allitems: <AllItems />, // No id needed for AllItems
    add: <AddItems />, // No id needed for AddItems
    update: id ? <UpdateItem id={id} /> : <NotFound />, // Only need id for UpdateItem
    delete: id ? <DeleteItem id={id} /> : <NotFound />, // Only need id for DeleteItem
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white text-black patrick p-2 relative" style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover' }}>
      <button className="absolute top-5 left-5 md:top-7 md:left-7 p-2 text-2xl text-white bg-black rounded-full border-2 border-white hover:bg-transparent hover:text-white transition duration-300"
        onClick={() => navigate("/")}>
        <IoIosArrowBack />
      </button>

      {actionComponents[action] || <NotFound />} {/* Render the correct component */}
    </div>
  );
};

export default ManageItems;
