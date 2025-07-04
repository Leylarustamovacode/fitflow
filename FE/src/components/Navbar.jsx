import "./navbar.scss";
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'HealthTracker', path: '/healthtracker' },
    { name: 'Practice', path: '/practice' },
    
    { name: 'dashboard', path: '/dashboard' },
    { name: 'FAQ', path: '/faq' }, 
        { name: 'Reservation', path: '/reservation' },
    { name: 'Contact', path: '/contact' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

 
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  return (
    <div className={`navbar-container ${isDarkMode ? 'dark' : 'light'}`}>
      <nav className="navbar">
        <div className="nav-content">
          {/* Brand Logo */}
          <div className="brand">
            <h1 className="brand-text">FitFlow</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="nav-link"
              >
                {link.name}
                <span className="nav-link-underline"></span>
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="nav-controls">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>

            <button 
              className={`hamburger ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-nav-content">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="mobile-nav-link"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
