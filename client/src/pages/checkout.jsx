import { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import bgimg from "../assets/beansbg.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/bills`, {
        customerName,
        email: customerEmail,
        cartItems: cartItems.map(item => ({
          itemId: item._id,
          name: item.name,
          price: item.price,
          qty: item.quantity,
        })),
        totalAmount,
      });

      const { billNumber } = response.data;

      const templateParams = {
        to_name: customerName,
        to_email: customerEmail,
        message: `Thank you for your order at Cafe Cup! ☕\n\nBill Number: ${billNumber}\nAmount: ₹${totalAmount}\n\nWe appreciate your visit.`,
      };

      await emailjs.send(
      `${import.meta.env.VITE_EMAILJS_SERVICE_ID}`,
      `${import.meta.env.VITE_EMAILJS_TEMPLATE_ID}`,
        templateParams,
      `${import.meta.env.VITE_EMAILJS_USER_ID}`
      );

      alert("Bill created and sent via email!");
      setCustomerName("");
      setCustomerEmail("");
      navigate("/menu");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create or send bill. Please try again.");
    }

    setIsSending(false);
  };

  return (
    <div
      className="w-full h-[100vh] bg-cover bg-center flex justify-center items-center patrick p-6"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="w-full max-w-md cartoon-box p-6">
        <h2 className="text-4xl amatic font-medium text-center mb-4 bg-brown  text-white p-2">Cafe Cup Checkout</h2>

        <div className="mb-6 space-y-2 text-lg">
          <h3 className="amatic text-2xl underline">Items in Cart:</h3>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-brown text-white px-3 py-1 rounded"
            >
              <span>{item.name}</span>
              <span>Qty: {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="mt-3 text-xl font-bold text-right">Total: ₹{totalAmount}</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xl">
          <input
            type="text"
            placeholder="Your name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="w-full cartoon-input"
          />
          <input
            type="email"
            placeholder="Your email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
            className="w-full cartoon-input"
          />

          <div className="flex justify-around">
            <button
              type="button"
              onClick={() => {
                setCustomerName("");
                setCustomerEmail("");
                navigate("/menu");
              }}
              className="amatic cartoon-black-button text-2xl"

            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="amatic cartoon-black-button text-2xl"
            >
              {isSending ? "Sending Bill..." : "Generate Bill"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
