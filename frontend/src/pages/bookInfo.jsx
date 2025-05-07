import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultAvatar from '../assets/default-avatar.png';
import { BiCart } from 'react-icons/bi';
import { BiCreditCard } from 'react-icons/bi'; // Added for "Go to Checkout"
import { FiStar } from 'react-icons/fi';
import { AppContent } from '../context/AppContext';
import { toast } from 'sonner';
import axios from 'axios'; // Make sure axios is imported

export default function BookInfo() {
  const { backendUrl, userData } = useContext(AppContent);
  const { state } = useLocation();
  const navigate = useNavigate();
  const book = state?.book;
  if (!book) return <div className="text-white text-center mt-20">Book not found.</div>;

  const { volumeInfo, price } = book;
  const thumbnail = volumeInfo.imageLinks?.thumbnail || defaultAvatar;

  // Build initial "Google Users" review if averageRating exists
  const googleRating = volumeInfo.averageRating;
  const googleCount = volumeInfo.ratingsCount;
  const defaultReviews = [];
  if (googleRating != null && googleCount != null) {
    defaultReviews.push({
      id: 'google',
      username: 'Google Users',
      rating: Math.round(googleRating),
      comment: `${googleCount} user rating${googleCount !== 1 ? 's' : ''} aggregated`,
      createdAt: ''
    });
  }

  // UI-only reviews state, seeded with defaultReviews
  const [reviews, setReviews] = useState(defaultReviews);
  const [rating, setRating] = useState(googleRating ? Math.round(googleRating) : 5);
  const [comment, setComment] = useState('');

  const handleAddToCart = async () => {
    if (!userData) {
      toast.error('You must log in to add items to your cart.');
      navigate('/login');
      return;
    }

    // always add quantity = 1
    const book = {
      title: volumeInfo.title,
      authors: volumeInfo.authors,
      description: volumeInfo.description,
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

  const handleReviewSubmit = e => {
    e.preventDefault();
    if (!userData) {
      toast.error('You must log in to leave a review.');
      return navigate('/login');
    }
    const newReview = {
      id: Date.now(),
      username: userData.username,
      rating,
      comment,
      createdAt: new Date().toLocaleDateString()
    };
    setReviews([newReview, ...reviews]);
    setComment('');
    toast.success('Review added');
  };

  return (
    <div className="min-h-screen bg-primary-black text-primary-white px-4 pt-10 sm:px-12">
      {/* Book details */}
      <div className="flex flex-col sm:flex-row items-center gap-8 max-w-5xl mx-auto">
        <img src={thumbnail} alt={volumeInfo.title} className="w-48 sm:w-60 rounded shadow-lg" />
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-lightblue">
            {volumeInfo.title}
          </h2>
          <p className="text-secondary-lightblue"><strong>Author(s):</strong> {volumeInfo.authors?.join(', ')}</p>
          <p className="text-secondary-lightblue">
            <strong>Published Year:</strong> {volumeInfo.publishedDate?.substring(0, 4) || 'Unknown'}
          </p>
          <p className="text-secondary-lightgray text-sm sm:text-base">
            {volumeInfo.description || 'No description available.'}
          </p>
          <p className="text-lg font-semibold">
            Price: <span className="text-secondary-lightblue">${price.toFixed(2)}</span>
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-6 py-2 bg-secondary-blue rounded-lg hover:bg-primary-blue transition font-semibold"
            >
              <BiCart className="text-xl" /> Add to Cart
            </button>
            <button
              onClick={() => {
                if (!userData) {
                  toast.error('You must log in to proceed to checkout.');
                  navigate('/login');
                } else {
                  navigate('/checkout', {
                    state: { book } // Passing the book object as part of state
                  });
                }
              }}
              className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition font-semibold"
            >
              <BiCreditCard className="text-xl" /> Go to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-12 max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold text-secondary-lightblue mb-4">
          Reviews {googleRating != null && <span className="text-sm text-secondary-lightgray">({googleRating.toFixed(1)}/5)</span>}
        </h3>

        {/* Review Form */}
        <form onSubmit={handleReviewSubmit} className="mb-6 space-y-4">
          <div className="flex items-center space-x-2">
            {[1,2,3,4,5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={star <= rating ? 'text-yellow-400' : 'text-gray-600'}
              >
                <FiStar size={24} />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="w-full bg-secondary-darkgray text-white p-2 rounded-md"
            rows={3}
            placeholder="Write your review..."
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-secondary-blue rounded-md hover:bg-primary-blue transition"
          >
            Submit Review
          </button>
        </form>

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <p className="text-center text-secondary-lightgray">No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map(r => (
              <li key={r.id} className="bg-secondary-darkgray p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{r.username}</span>
                  <span className="flex">
                    {[1,2,3,4,5].map(s => (
                      <FiStar key={s} className={s <= r.rating ? 'text-yellow-400' : 'text-gray-600'} />
                    ))}
                  </span>
                </div>
                <p className="text-sm text-secondary-lightgray mb-2">{r.comment}</p>
                {r.createdAt && <div className="text-xs text-gray-500">{r.createdAt}</div>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
