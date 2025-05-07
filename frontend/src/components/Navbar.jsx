import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
import logo from '../assets/logo.png';
import defaultAvatar from '../assets/default-avatar.png';
import { AppContent } from '../context/AppContext';
import SearchBar from '../components/searchbar';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { backendUrl, userData } = useContext(AppContent);

  const toggleMenu = () => setMenuOpen(open => !open);
  const closeMenu  = () => setMenuOpen(false);

  const navLinkStyle =
    'relative text-primary-white font-medium transition-all duration-300 ease-in-out hover:text-secondary-lightblue group';
  const underline =
    'absolute left-1/2 -bottom-1 w-0 h-0.5 bg-secondary-blue transition-all duration-300 ease-in-out transform -translate-x-1/2 group-hover:w-full';

  // compute avatar src exactly like in User.jsx
  const avatarSrc = userData?.profileImage
    ? userData.profileImage.startsWith('/uploads')
      ? `${backendUrl}${userData.profileImage}`
      : userData.profileImage
    : defaultAvatar;

  return (
    <header className="sticky top-0 w-full bg-primary-black shadow-2xl font-poppins z-50">
      <nav className="flex items-center justify-between w-full px-6">
        {/* Logo */}
        <div className="flex items-center mx-4 md:mx-10 w-1/2">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" width={144} height={40} />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-around w-1/2 space-x-6">
          <Link to="/" className={navLinkStyle}>
            About<span className={underline}></span>
          </Link>
          <Link to="/books" className={navLinkStyle}>
            Books<span className={underline}></span>
          </Link>
          <Link to="/contact" className={navLinkStyle}>
            Contact<span className={underline}></span>
          </Link>

          {userData ? (
            <div className="flex items-center space-x-4">
              <Link to="/orders" className={navLinkStyle}>
                Orders<span className={underline}></span>
              </Link>
              <Link
                to="/cart"
                className="flex items-center space-x-2 bg-secondary-darkgray ml-8 px-4 py-2 rounded-md hover:bg-secondary-regulargray transition duration-300"
              >
                <FiShoppingCart className="text-primary-white" size={24} />
                <p className="text-primary-white font-medium">Cart</p>
              </Link>

              <Link
                to="/profile"
                className="flex items-center space-x-2 hover:text-secondary-blue transition duration-300 ml-8 bg-primary-blue px-4 py-2 rounded-md"
              >
                <span className="text-primary-white font-semibold">{userData.username}</span>
                <img
                  src={avatarSrc}
                  onError={e => { e.currentTarget.src = defaultAvatar; }}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover border-2 border-secondary-blue"
                />
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-secondary-blue text-primary-white px-4 py-2 rounded-md hover:bg-secondary-regulargray transition duration-300">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden z-50">
          <button onClick={toggleMenu} className="text-primary-white text-2xl focus:outline-none">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Panel */}
      {menuOpen && (
        <div className="md:hidden absolute top-full right-0 w-full bg-primary-black px-6 py-6 space-y-4 shadow-lg z-40 text-center">
          <SearchBar query={''} setQuery={null} onSubmit={null} />

          <Link to="/" onClick={closeMenu} className={`${navLinkStyle} block`}>
            About<span className={underline}></span>
          </Link>
          <Link to="/books" onClick={closeMenu} className={`${navLinkStyle} block`}>
            Books<span className={underline}></span>
          </Link>
          <Link to="/contact" onClick={closeMenu} className={`${navLinkStyle} block`}>
            Contact<span className={underline}></span>
          </Link>

          {userData ? (
            <div className="flex items-center space-x-3 mt-4 border-t border-secondary-darkgray pt-4">
              <img
                src={avatarSrc}
                onError={e => { e.currentTarget.src = defaultAvatar; }}
                alt="User"
                className="w-9 h-9 rounded-full object-cover border-2 border-secondary-darkgray"
              />
              <div className="text-primary-white font-medium">{userData.username}</div>
              <Link
                to="/profile"
                onClick={closeMenu}
                className="ml-auto text-secondary-blue underline text-sm"
              >
                Profile
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <button
                onClick={closeMenu}
                className="w-full bg-secondary-blue text-primary-white px-4 py-2 rounded-md hover:bg-secondary-regulargray transition duration-300"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
