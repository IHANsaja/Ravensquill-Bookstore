import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { AppContent } from '../context/AppContext';
import { FiCreditCard, FiTruck, FiPackage } from 'react-icons/fi';
import { FaMoneyBillAlt, FaPaypal } from 'react-icons/fa';
import { jsPDF } from 'jspdf'; // Import jsPDF for PDF generation

const Checkout = () => {
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();
  const location = useLocation(); // Get location data
  const book = location.state?.book; // Access the book information passed via state

  const [cartItems, setCartItems] = useState(null);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CashOnDelivery');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/cart`, { withCredentials: true });
        setCartItems(res.data.books || []);
      } catch (err) {
        toast.error('Failed to fetch cart items');
        setCartItems([]);
      }
    };
    fetchCart();
  }, [backendUrl]);

  const clearCart = async () => {
    try {
      await axios.delete(`${backendUrl}/api/cart/clear`, { withCredentials: true });
      setCartItems([]);
    } catch {
      toast.error('Error clearing cart');
    }
  };

  const itemsPrice = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.1 * itemsPrice).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!address || !city || !postalCode || !country) {
      setError('Please fill in all shipping fields.');
      setLoading(false);
      return;
    }

    // ✅ Transform cart items to match backend expectations
    const transformedItems = cartItems.map(item => ({
      product: item._id,
      name: item.title,
      quantity: item.quantity,
      price: item.price,
      image: item.thumbnail
    }));

    try {
      await axios.post(
        `${backendUrl}/api/orders/createorder`,
        {
          orderItems: transformedItems,
          shippingAddress: { address, city, postalCode, country },
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        },
        { withCredentials: true }
      );

      await clearCart();
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to generate the invoice PDF
  const generateInvoice = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Invoice', 105, 10, null, null, 'center');
    doc.setFontSize(12);

    // Add order details
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 20);
    doc.text(`Address: ${address}, ${city}, ${postalCode}, ${country}`, 10, 30);
    doc.text(`Payment Method: ${paymentMethod}`, 10, 40);

    doc.text('Order Summary:', 10, 50);

    let yPosition = 60;
    cartItems.forEach(item => {
      doc.text(`${item.title} - $${item.price} x ${item.quantity}`, 10, yPosition);
      yPosition += 10;
    });

    doc.text(`Items Total: $${itemsPrice.toFixed(2)}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Shipping: $${shippingPrice.toFixed(2)}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Tax: $${taxPrice.toFixed(2)}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Total: $${totalPrice.toFixed(2)}`, 10, yPosition);

    // Save the document as a PDF
    doc.save('invoice.pdf');
  };

  if (cartItems === null) {
    return <p className="text-center text-secondary-lightblue mt-16 font-poppins">Loading your cart…</p>;
  }

  return (
    <div className="min-h-full bg-primary-black text-primary-white font-poppins pt-30 pb-30 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form Section */}
        <form onSubmit={placeOrderHandler} className="md:col-span-2 bg-secondary-darkgray p-6 rounded-xl shadow-lg border border-secondary-lightgray">
          <h2 className="text-2xl font-bold text-secondary-lightblue mb-6 flex items-center">
            <FiTruck className="mr-2" /> Shipping Address
          </h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
            className="w-full mb-4 px-4 py-2 bg-primary-black border border-secondary-lightgray rounded-md text-primary-white placeholder-secondary-lightgray"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
              required
              className="w-full px-4 py-2 bg-primary-black border border-secondary-lightgray rounded-md text-primary-white placeholder-secondary-lightgray"
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={e => setPostalCode(e.target.value)}
              required
              className="w-full px-4 py-2 bg-primary-black border border-secondary-lightgray rounded-md text-primary-white placeholder-secondary-lightgray"
            />
          </div>

          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={e => setCountry(e.target.value)}
            required
            className="w-full mb-6 px-4 py-2 bg-primary-black border border-secondary-lightgray rounded-md text-primary-white placeholder-secondary-lightgray"
          />

          <h2 className="text-2xl font-bold text-secondary-lightblue mb-4 flex items-center">
            <FiCreditCard className="mr-2" /> Payment Method
          </h2>

          {/* Custom Payment Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <label
              className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer border ${
                paymentMethod === 'CashOnDelivery'
                  ? 'border-secondary-blue bg-primary-black'
                  : 'border-secondary-lightgray bg-primary-black/40'
              } transition hover:border-secondary-blue`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="CashOnDelivery"
                checked={paymentMethod === 'CashOnDelivery'}
                onChange={e => setPaymentMethod(e.target.value)}
                className="hidden"
              />
              <FaMoneyBillAlt className="text-xl text-secondary-lightblue" />
              <span className="text-white">Cash on Delivery</span>
            </label>

            <label
              className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer border ${
                paymentMethod === 'PayPal'
                  ? 'border-secondary-blue bg-primary-black'
                  : 'border-secondary-lightgray bg-primary-black/40'
              } transition hover:border-secondary-blue`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={e => setPaymentMethod(e.target.value)}
                className="hidden"
              />
              <FaPaypal className="text-xl text-secondary-lightblue" />
              <span className="text-white">PayPal</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary-blue hover:bg-secondary-lightblue text-white py-3 rounded-md font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Placing Order…' : 'Place Order'}
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-secondary-darkgray p-6 rounded-xl shadow-lg border border-secondary-lightgray">
          <h2 className="text-2xl font-bold text-secondary-lightblue mb-6">Order Summary</h2>

          <div className="space-y-4">
            <div>
              <p className="text-lg text-white">Book: {book ? book.title : 'Unknown'}</p>
              <p className="text-sm text-secondary-lightblue">{book ? book.author : 'Unknown Author'}</p>
            </div>

            <div className="flex justify-between text-white">
              <span>Items Total</span>
              <span>${itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Shipping</span>
              <span>${shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Tax</span>
              <span>${taxPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-secondary-lightblue">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Generate Invoice Button */}
          <button
            onClick={generateInvoice}
            className="w-full bg-secondary-blue text-primary-white py-2 mt-4 rounded-md hover:bg-primary-blue transition duration-300"
          >
            Generate Invoice PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
