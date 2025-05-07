// src/pages/Cart.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import { FiTrash2, FiShoppingCart, FiXCircle } from 'react-icons/fi';

const Cart = () => {
  const { backendUrl, userData } = useContext(AppContent);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!userData) {
        toast.error('Please log in to view your cart.');
        navigate('/login');
        return;
      }
      try {
        const res = await axios.get(`${backendUrl}/api/cart`, { withCredentials: true });
        if (res.data.success) {
          setCartItems(res.data.books);
        } else {
          toast.error('Failed to load cart.');
        }
      } catch (err) {
        console.error(err);
        toast.error('Error fetching cart data.');
      }
    };
    fetchCart();
  }, [backendUrl, userData, navigate]);

  const removeItem = async (bookId) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/cart/remove/${bookId}`, { withCredentials: true });
      if (res.data.success) setCartItems(res.data.books);
      else toast.error(res.data.message);
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      const res = await axios.delete(`${backendUrl}/api/cart/clear`, { withCredentials: true });
      if (res.data.success) setCartItems([]);
      else toast.error('Failed to clear cart');
    } catch {
      toast.error('Error clearing cart');
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }

    try {
      await Promise.all(
        cartItems.map(item =>
          axios.put(
            `${backendUrl}/api/cart/update-quantity`,
            { bookId: item._id, quantity: item.quantity },
            { withCredentials: true }
          )
        )
      );
      navigate('/checkout');
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error(err.response?.data?.message || 'Error during checkout.');
    }
  };

  return (
    <section className="min-h-screen bg-primary-black text-primary-white font-poppins pt-28 px-6">
      <div className="max-w-4xl mx-auto bg-secondary-darkgray p-8 rounded-xl shadow-2xl border border-secondary-regulargray">
        <h1 className="text-3xl font-bold text-secondary-lightblue mb-6 text-center flex items-center justify-center">
          <FiShoppingCart size={30} className="mr-2" />
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-secondary-lightblue">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center bg-primary-black p-4 rounded-lg border border-secondary-lightgray">
                  <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                  <div className="flex-1 ml-4">
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p className="text-sm text-secondary-lightblue">{item.authors.join(', ')}</p>
                    <p className="text-sm text-secondary-lightgray">${item.price.toFixed(2)}</p>
                    <div className="mt-2">
                      <p className="text-sm text-secondary-lightgray">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item._id)} className="ml-4 text-red-500 hover:text-red-400" title="Remove">
                    <FiTrash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-primary-black border border-secondary-lightgray p-6 rounded-lg text-center shadow-lg">
              <h2 className="text-2xl font-bold text-secondary-blue mb-4">Order Summary</h2>
              <p className="text-lg mb-2">
                Total Items: <span className="font-semibold">{cartItems.reduce((t, i) => t + i.quantity, 0)}</span>
              </p>
              <p className="text-xl font-semibold text-secondary-lightblue mb-4">
                Total Price: ${cartItems.reduce((t, i) => t + i.price * i.quantity, 0).toFixed(2)}
              </p>

              <button onClick={clearCart} className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-400 transition mb-4 me-5">
                <FiXCircle size={20} className="inline mr-2" />
                Clear Cart
              </button>

              <button onClick={handleCheckout} className="bg-secondary-blue text-white px-6 py-3 rounded-md hover:bg-secondary-lightblue transition">
                <FiShoppingCart size={20} className="inline mr-2" />
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
