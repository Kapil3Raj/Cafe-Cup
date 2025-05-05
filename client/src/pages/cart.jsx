import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import bgimg from "../assets/beansbg.png";
import { CiShoppingCart } from "react-icons/ci";


const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div
        className="min-h-screen flex justify-center items-center"
        style={{ backgroundImage: `url(${bgimg})`, backgroundSize: "cover" }}
      >
        <div className="text-center bg-white p-8 rounded-xl shadow-xl flex justify-center items-center flex-col">
          <h2 className="amatic text-4xl sm:text-3xl md:text-4xl mb-4 flex gap-2">
            <CiShoppingCart /> Your Cart is Empty!
          </h2>
          <button
            onClick={() => navigate("/menu")}
            className="cartoon-black-button text-2xl sm:text-lg px-6 py-2 patrick"
          >
            Go to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center patrick p-3"
      style={{ backgroundImage: `url(${bgimg})`, backgroundSize: "cover" }}
    >
      <h1 className="amatic mt-5 text-5xl sm:text-4xl md:text-5xl font-bold mb-6 text-center text-brown bg-white px-6 py-2 rounded-lg flex gap-2">
        <CiShoppingCart /> Cart
      </h1>

      {/* Items Section */}
      <div className="flex flex-col w-full md:w-9/12 lg:w-8/12 items-center gap-6 ">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex w-full justify-around items-center gap-2 bg-white p-2 rounded-lg shadow-lg"
          >
            <div className="flex flex-col justify-around items-center w-full gap-2 md:flex-row">
              <h2 className="text-base sm:text-lg font-bold">{item.name}</h2>
              <p className="text-base sm:text-lg">{`Price: ₹${item.price}`}</p>
              <p className="text-base sm:text-lg">{`Quantity: ${item.quantity}`}</p>
            </div>

            <div className="flex flex-col text-lg items-center">
              <p className="">Total: ₹{item.price * item.quantity}</p>
            </div>
          </div>
        ))}

        {/* Checkout Section */}
        <div className="bg-white p-6 w-full lg:w-1/3 flex flex-col items-center mt-6 rounded-lg shadow-xl">
          <h2 className="amatic text-4xl sm:text-3xl md:text-4xl mb-4">
            Total: ₹{totalAmount}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 w-full mb-4">
            <button
              onClick={() => {
                dispatch(clearCart());
                navigate("/menu");
              }}
              className="cartoon-black-button w-full text-2xl sm:text-lg "
            >
              Go Back
            </button>

            <button
              onClick={handleCheckout}
              className="cartoon-black-button w-full text-2xl sm:text-lg "
            >
              Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
