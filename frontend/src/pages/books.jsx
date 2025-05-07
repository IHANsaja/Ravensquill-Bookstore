import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/searchbar';
import BookCard from '../components/bookcard';
import Spinner from '../components/spinner';
import { useNavigate } from 'react-router-dom';

const RESULTS_PER_PAGE = 30;

const Books = () => {
  const [query, setQuery] = useState('harry potter');
  const [category, setCategory] = useState('');
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOption, setSortOption] = useState('default');
  const [filterPrice, setFilterPrice] = useState(100);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    if (!query) return;
    setLoading(true);
    const startIndex = (page - 1) * RESULTS_PER_PAGE;
    let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query
    )}&maxResults=${RESULTS_PER_PAGE}&startIndex=${startIndex}`;

    if (category) url += `&filter=category:${category}`;

    try {
      const response = await axios.get(url);
      const items = response.data.items || [];
      const withPrices = items.map(b => ({ ...b, price: +(Math.random() * 100).toFixed(2) }));
      setBooks(withPrices);
      setTotalPages(Math.ceil((response.data.totalItems || 0) / RESULTS_PER_PAGE));
    } catch (err) {
      console.error('Error fetching books:', err);
      setBooks([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, query, category]);

  const handleSubmit = e => {
    e.preventDefault();
    setPage(1);
    fetchBooks();
  };

  const sorted = [...books].sort((a, b) => {
    switch (sortOption) {
      case 'priceLowToHigh': return a.price - b.price;
      case 'priceHighToLow': return b.price - a.price;
      case 'titleAtoZ': return a.volumeInfo.title.localeCompare(b.volumeInfo.title);
      case 'titleZtoA': return b.volumeInfo.title.localeCompare(a.volumeInfo.title);
      case 'authorAtoZ':
        return (a.volumeInfo.authors?.[0]||'').localeCompare(b.volumeInfo.authors?.[0]||'');
      case 'authorZtoA':
        return (b.volumeInfo.authors?.[0]||'').localeCompare(a.volumeInfo.authors?.[0]||'');
      default: return 0;
    }
  });

  const filtered = sorted.filter(b => b.price <= filterPrice);

  return (
    <main className="bg-primary-black min-h-screen w-screen pt-10 px-4 sm:px-8">
      <div className="flex justify-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Ocean of <span className="text-secondary-lightblue">Knowledge</span>
        </h1>
      </div>

      <div className="hidden sm:block fixed top-30 right-8 z-50">
        <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 px-4 py-6 bg-secondary-darkgray rounded-lg shadow-lg space-y-4 sm:space-y-0">
        {/* Sort */}
        <div className="flex items-center space-x-4">
          <label className="text-secondary-lightgray text-sm">Sort by:</label>
          <select
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
            className="bg-primary-black text-white px-3 py-2 rounded-md"
          >
            <option value="default">Default</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="titleAtoZ">Title: A to Z</option>
            <option value="titleZtoA">Title: Z to A</option>
            <option value="authorAtoZ">Author: A to Z</option>
            <option value="authorZtoA">Author: Z to A</option>
          </select>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <label className="text-secondary-lightgray text-sm">Max Price:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={filterPrice}
            onChange={e => setFilterPrice(+e.target.value)}
            className="w-48"
          />
          <span className="text-white">${filterPrice}</span>
        </div>

        {/* Category */}
        <div className="flex items-center space-x-4">
          <label className="text-secondary-lightgray text-sm">Category:</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="bg-primary-black text-white px-3 py-2 rounded-md"
          >
            <option value="">All</option>
            <option value="fiction">Fiction</option>
            <option value="science">Science</option>
            <option value="technology">Technology</option>
            <option value="history">History</option>
            <option value="biography">Biography</option>
          </select>
        </div>
      </div>

      {/* Books */}
      {loading ? (
        <div className="flex justify-center items-center h-64"><Spinner/></div>
      ) : filtered.length === 0 ? (
        <p className="text-white text-center">No books found.</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center px-8">
          {filtered.map(book => (
            <div
              key={book.id}
              className="basis-full sm:basis-[300px] cursor-pointer"
              onClick={() => navigate(`/books/${book.id}`, { state: { book } })}
            >
              <BookCard
                thumbnail={book.volumeInfo.imageLinks?.thumbnail}
                title={book.volumeInfo.title}
                authors={book.volumeInfo.authors}
                description={book.volumeInfo.description}
                price={book.price}
              />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center space-x-4 py-8">
        <button
          disabled={page <= 1}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 bg-secondary-lightblue text-white rounded disabled:opacity-50"
        >Prev</button>
        <span className="text-white self-center">Page {page} of {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 bg-secondary-lightblue text-white rounded disabled:opacity-50"
        >Next</button>
      </div>
    </main>
  );
};

export default Books;
