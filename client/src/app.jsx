import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Landing from "./pages/landingPage.jsx";
import ManageItems from "./pages/manageItems.jsx"; // Correct spelling!
import Menu from "./pages/menu.jsx";
import Cart from "./pages/cart.jsx";
import Checkout from "./pages/checkout.jsx";
import Bills from "./pages/bills.jsx";
import ManageAccess from "./pages/manageAccess";


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/manageitems/:action/:id?" element={<ManageItems />} />
        <Route path="/manageaccess" element={<ManageAccess />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/bills" element={<Bills></Bills>}/>     

      </Routes>
    </BrowserRouter>
  );
}
