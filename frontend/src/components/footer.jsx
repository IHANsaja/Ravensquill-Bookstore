import React from "react";
import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub
} from "react-icons/fa";
import footerImage from "../assets/footer.png"; // Adjust the path as necessary

export default function Footer() {
  const navLinkStyle =
    "relative text-primary-white font-medium transition-all duration-300 ease-in-out group";
  const underline =
    "absolute left-1/2 -bottom-1 w-0 h-0.5 bg-primary-white transition-all duration-300 ease-in-out transform -translate-x-1/2 group-hover:w-full";

  return (
    <footer className="w-full relative bg-primary-blue text-primary-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8 gap-20 pt-10">
        {/* NAVIGATE */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <h2 className="text-xl font-semibold uppercase tracking-wide">Navigate</h2>
          <nav className="flex flex-col space-y-2 text-center md:text-left">
            <Link to="/" className={navLinkStyle}>
              About
              <span className={underline} />
            </Link>
            <Link to="/books" className={navLinkStyle}>
              Books
              <span className={underline} />
            </Link>
            <Link to="/profile" className={navLinkStyle}>
              Profile
              <span className={underline} />
            </Link>
            <Link to="/contact" className={navLinkStyle}>
              Contact
              <span className={underline} />
            </Link>
          </nav>
        </div>

        {/* CONNECT (mobile) */}
        <div className="flex flex-col md:hidden items-center space-y-3">
          <h2 className="text-xl font-semibold uppercase tracking-wide">Connect</h2>
          <div className="flex space-x-4 text-2xl">
            <a href="https://twitter.com" aria-label="Twitter" className="hover:animate-pulse transition">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="hover:animate-bounce transition">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:animate-ping transition">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:animate-wiggle transition">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com" aria-label="GitHub" className="hover:animate-spin transition">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* CENTER IMAGE */}
        <div className="z-50">
          <img
            src={footerImage}
            alt="hogwarts background"
            width={300}
            height={300}
            className="object-cover"
          />
        </div>

        {/* CONNECT (desktop) */}
        <div className="hidden md:flex flex-col items-center md:items-end space-y-3">
          <h2 className="text-xl font-semibold uppercase tracking-wide">Connect</h2>
          <div className="flex space-x-4 text-2xl">
            <a href="https://twitter.com" aria-label="Twitter" className="hover:animate-pulse transition">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="hover:animate-bounce transition">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:animate-ping transition">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:animate-wiggle transition">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com" aria-label="GitHub" className="hover:animate-spin transition">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full bg-blue-800">
        <div className="max-w-7xl mx-auto text-center py-4">
          <p className="text-sm font-light opacity-75">
            © {new Date().getFullYear()} Ihan Hansaja. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
