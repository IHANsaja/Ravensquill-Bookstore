import React from 'react';
import { MdSearch, MdClear } from 'react-icons/md';

const SearchBar = ({ query, setQuery, onSubmit }) => {
  const clearQuery = () => setQuery('');

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center mx-auto w-full max-w-md sm:max-w-xs bg-primary-black rounded-md ring-1 ring-gray-700"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books…"
        className="flex-grow bg-transparent text-white placeholder-gray-500 p-2 pl-3 outline-none text-sm sm:text-base"
      />
      {query && (
        <button
          type="button"
          onClick={clearQuery}
          className="p-2 text-gray-400 hover:text-gray-200"
        >
          <MdClear size={20} />
        </button>
      )}
      <button
        type="submit"
        className="flex items-center bg-secondary-lightblue hover:bg-secondary-lightblue/90 text-white px-4 py-2 rounded-r-md text-sm sm:text-base"
      >
        <MdSearch size={20} className="mr-1" />
        Search
      </button>
    </form>
  );
};

export default SearchBar;
