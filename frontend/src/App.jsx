// src/App.js
import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';  
import { Routes, Route, useLocation } from 'react-router-dom';  // no BrowserRouter here
import Navbar from './components/Navbar';
import Home from './pages/home';          // Adjusted path to Home component
import Books from './pages/books';       // Adjusted path to Books component
import Authentication from './pages/authentication';  // Adjusted path to Authentication component
import Contact from './pages/contact';   // Adjusted path to Contact component
import Profile from './pages/user';      // Adjusted path to User component
import Cart from './pages/cart'; 
import Checkout from './pages/checkout';       
import BookInfo from './pages/bookInfo';
import Orders from './pages/orders';
import UserProfile from './pages/userProfile';
import Footer from './components/footer';
import Spinner from './components/spinner';

function App() {
  const [isLoading, setIsLoading] = useState(true);  // State to track loading
  const location = useLocation();
  const hideNavbarFooter = location.pathname === '/login';

  // Simulate content loading (replace with actual loading logic if necessary)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // Simulated loading for 1 second
    return () => clearTimeout(timer);  // Clean up the timeout on component unmount
  }, []);

  return (
    <>
      {/* Toaster lives here once for your entire app */}
      <Toaster richColors position="top-center" />

      {isLoading ? (
        <Spinner /> // Show Spinner while loading
      ) : (
        <>
          {!hideNavbarFooter && <Navbar />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/login" element={<Authentication />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user" element={<Profile />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/books/:id" element={<BookInfo />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>

          {!hideNavbarFooter && <Footer />}
        </>
      )}
    </>
  );
}

export default App;
