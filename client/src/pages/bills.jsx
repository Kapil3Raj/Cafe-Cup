import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import bgimg from "../assets/beansbg.png";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/bills`);
        setBills(response.data);
        setFilteredBills(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchBills();
  }, []);

  useEffect(() => {
    const lowercasedSearch = search.toLowerCase();
    const filtered = bills.filter((bill) =>
      (bill.customerName?.toLowerCase().includes(lowercasedSearch) ?? false) ||
      (bill.billNumber?.toLowerCase().includes(lowercasedSearch) ?? false) ||
      (bill.email?.toLowerCase().includes(lowercasedSearch) ?? false)
    );
    setFilteredBills(filtered);
  }, [search, bills]);

  return (
    <div
      className="min-h-screen p-5 w-full h-[100vh] relative bg-cover bg-center bg-no-repeat overflow-x-hidden overflow-y-auto"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <button className="absolute top-5 left-5 md:top-7 md:left-7 p-2 text-2xl text-white bg-black rounded-full border-2 border-white hover:bg-transparent hover:text-white transition duration-300"
        onClick={() => navigate("/")}>
        <IoIosArrowBack />
      </button>

      <h1 className="amatic w-full text-5xl font-bold text-center mb-8 text-white px-6 py-2 inline-block rounded-2xl">
        Bills
      </h1>

      <div className="max-w-5xl mx-auto">
        <input
          type="text"
          placeholder="🔍  by name, bill number, or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 mb-6 text-black rounded-xl border-4 border-black bg-white placeholder-gray-500 patrick shadow-lg"
        />

        {loading ? (
           <div className="flex flex-col items-center justify-center py-10">
           <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white mb-4"></div>
           <p className="text-white text-3xl amatic">Loading...</p>
         </div>
        ) : filteredBills.length === 0 ? (
          <p className="text-white text-center text-xl">No bills found.</p>
        ) : (
          filteredBills.map((bill) => (
            <div key={bill._id} className="mb-8 bg-white p-5 cartoon-box border-4 border-black">
              <div className="mb-4 text-black patrick text-base md:text-lg leading-relaxed flex justify-around flex-wrap">
                <div className='flex flex-col items-start justify-center'>
                  <p><strong>Customer:</strong> {bill.customerName}</p>
                  <p><strong>Email:</strong> {bill.email}</p>
                  <p><strong>Bill Number:</strong> {bill.billNumber}</p>
                </div>
                <div className='flex flex-col items-center justify-start'>
                  <p><strong>Date:</strong> {new Date(bill.createdAt).toLocaleString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}</p>
                  <p><strong>Total Amount:</strong> ₹{bill.totalAmount}</p>
                </div>
              </div>

              <h2 className="w-full text-center text-2xl font-semibold mb-3 border-b-2 border-black pb-1 patrick">Ordered Items:</h2>
              <div className="overflow-x-auto rounded-xl shadow-md">
                <table className="w-full table-auto border-collapse text-sm md:text-base text-black patrick bg-[#F5E1C0] rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-[#EAD2A0] text-sm md:text-base">
                      <th className="px-4 py-2 border border-black">Item Name</th>
                      <th className="px-4 py-2 border border-black">Quantity</th>
                      <th className="px-4 py-2 border border-black">Price</th>
                      <th className="px-4 py-2 border border-black">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bill.cartItems.map((item, index) => (
                      <tr key={index} className="hover:bg-[#f0d8b8]">
                        <td className="px-4 py-2 border border-black">{item.name}</td>
                        <td className="px-4 py-2 border border-black">{item.qty}</td>
                        <td className="px-4 py-2 border border-black">₹{item.price}</td>
                        <td className="px-4 py-2 border border-black">₹{item.qty * item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bills;
