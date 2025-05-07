// src/components/BookCard.jsx
import React, { useContext } from 'react';
import { BiBook } from 'react-icons/bi';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';

const BookCard = ({
  title = 'Unknown Title',
  authors = ['Unknown Author'],
  description = 'No description available.',
  thumbnail = '/default-cover.png',
  price = (Math.random() * 50 + 5).toFixed(2), // random $5–$55
  quantity = Math.floor(Math.random() * 20) + 1, // random stock 1–20
  category = 'General', // new category prop
  isAvailable = quantity > 0 // check if book is available
}) => {
  const navigate = useNavigate();
  const { backendUrl, userData } = useContext(AppContent);

  const handleAddToCart = async () => {
    if (!userData) {
      toast.error('You must log in to add items to your cart.');
      navigate('/login');
      return;
    }

    // always add quantity = 1
    const book = {
      title,
      authors,
      description,
      thumbnail,
      price: parseFloat(price),
      quantity: 1
    };

    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/add`,
        { book },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success('Book added to cart!');
        navigate('/cart');
      } else {
        toast.error(res.data.message || 'Failed to add book to cart.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error adding book to cart.');
    }
  };

  return (
    <div className="flex flex-col bg-secondary-darkgray rounded-xl shadow-md overflow-hidden border-2  border-e-8 border-secondary-lightgray p-4 w-full max-w-xs hover:shadow-lg transition h-[600px]">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-60 object-cover mb-4 rounded-md"
      />
      <h2 className="text-lg font-semibold text-primary-white mb-2 line-clamp-2">
        {title}
      </h2>
      <p className="text-sm text-secondary-lightblue mb-2">
        {authors.join(', ')}
      </p>
      <p className="text-sm text-secondary-lightgray mb-4 line-clamp-3">
        {description}
      </p>

      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-secondary-lightblue font-medium">
          Price: ${parseFloat(price).toFixed(2)}
        </p>
        <p className="text-sm text-secondary-lightgray">
          Stock: <span className="font-semibold">{quantity}</span>
        </p>
      </div>

      {/* New Filters */}
      <div className="flex justify-between mb-2">
        <p className="text-sm text-secondary-lightblue font-medium">
          Category: {category}
        </p>
        <p className={`text-sm ${isAvailable ? 'text-green-500' : 'text-red-500'}`}>
          {isAvailable ? 'In Stock' : 'Out of Stock'}
        </p>
      </div>

      <button
        onClick={()=> {navigate(`/books/${book.id}`)}}
        className={`bg-secondary-blue flex items-center justify-center text-primary-white text-base px-4 py-2 rounded-md hover:bg-secondary-regulargray transition-colors mt-auto ${isAvailable ? '' : 'opacity-50 cursor-not-allowed'}`}
        disabled={!isAvailable} // disable the button if the book is out of stock
      >
        <BiBook className="mr-2" size={20} />
        View Book
      </button>
    </div>
  );
};

export default BookCard;
