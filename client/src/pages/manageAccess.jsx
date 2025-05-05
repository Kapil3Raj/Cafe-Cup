import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgimg from "../assets/beansbg.png";

const ManageAccess = () => {
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (inputPassword === correctPassword) {
      navigate("/manageitems/allitems");
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100 patrick p-3" style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover' }}>
      <form onSubmit={handleSubmit} className="cartoon-box p-6 space-y-4 w-full max-w-sm border-4 border-black">
        <h2 className="text-3xl amatic text-brown text-center">Admin Access</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          className="w-full cartoon-input"
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" className="cartoon-black-button w-full text-2xl amatic">
          Enter
        </button>
      </form>
    </div>
  );
};

export default ManageAccess;
