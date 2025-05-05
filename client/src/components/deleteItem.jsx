import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteItem = ({ id }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const deleteItem = async () => {
      try {
        // Send a request to the backend to delete the item using the ID
        await axios.delete(`${import.meta.env.VITE_BACKEND_BASEURL}/api/items/${id}`);
        
        // Content after successful deletion
        navigate("/manageitems/allitems"); // Redirect after successful deletion
      } catch (err) {
        console.error("Error deleting item", err);
        // Handle error message
      }
    };

    if (id) {
      deleteItem();
    }
  }, [id, navigate]);

  return (
    <div className="text-center">
      <h2>Deleting item...</h2>
      <p>Please wait while we process your request.</p>
    </div>
  );
};

export default DeleteItem;
