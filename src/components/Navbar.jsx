import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/final.svg';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to handle smooth scrolling to home sections from any page
  const handleSectionLink = (sectionId) => {
    setIsMobileMenuOpen(false);

    const scrollToSection = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (location.pathname !== '/') {
      navigate(sectionId === 'home' ? '/' : `/#${sectionId}`);
      setTimeout(scrollToSection, 150);
    } else {
      scrollToSection();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-pink border-b border-brand-divider shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo / Brand Name */}
          <Link to="/" className="flex items-center space-x-3">
            {/* <img
              src={logo}
              alt="Noelle Cakes Logo"
              className="h-20 w-20 object-contain"
            /> */}
            <span className="font-accent text-3xl sm:text-4xl text-brand-maroon tracking-wide">
              Noelle Cakes & Pastries
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 font-body font-medium text-brand-body text-sm tracking-wide">
            <button 
              onClick={() => handleSectionLink('home')} 
              className="hover:text-brand-maroon transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => handleSectionLink('story')} 
              className="hover:text-brand-maroon transition-colors cursor-pointer"
            >
              Our Story
            </button>
            <button 
              onClick={() => handleSectionLink('specials')} 
              className="hover:text-brand-maroon transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
              Today's Specials
            </button>
            <button 
              onClick={() => handleSectionLink('categories')} 
              className="hover:text-brand-maroon transition-colors cursor-pointer"
            >
              Menu Categories
            </button>
            <button 
              onClick={() => handleSectionLink('find-us')} 
              className="hover:text-brand-maroon transition-colors cursor-pointer"
            >
              Find Us
            </button>
            <button 
              onClick={() => handleSectionLink('contact')} 
              className="hover:text-brand-maroon transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-maroon p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                /* Close (X) Icon */
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                /* Hamburger Icon */
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-pink border-t border-brand-divider px-4 pt-2 pb-6 space-y-3 font-body text-brand-body text-base">
          <button 
            onClick={() => handleSectionLink('home')} 
            className="block w-full text-left py-2 hover:text-brand-maroon font-medium"
          >
            Home
          </button>
          <button 
            onClick={() => handleSectionLink('story')} 
            className="block w-full text-left py-2 hover:text-brand-maroon font-medium"
          >
            Our Story
          </button>
          <button 
            onClick={() => handleSectionLink('specials')} 
            className="block w-full text-left py-2 hover:text-brand-maroon font-medium items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
            Today's Specials
          </button>
          <button 
            onClick={() => handleSectionLink('categories')} 
            className="block w-full text-left py-2 hover:text-brand-maroon font-medium"
          >
            Menu Categories
          </button>
          <button 
            onClick={() => handleSectionLink('find-us')} 
            className="block w-full text-left py-2 hover:text-brand-maroon font-medium"
          >
            Find Us
          </button>
          <button 
            onClick={() => handleSectionLink('contact')} 
            className="block w-full text-left py-2 hover:text-brand-maroon font-medium"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
}