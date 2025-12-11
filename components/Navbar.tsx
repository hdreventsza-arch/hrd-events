import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#FAF8F3]/95 backdrop-blur-md border-[rgba(205,163,73,0.45)] shadow-sm py-5' : 'bg-[#FAF8F3] border-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/hdr-logo-v2.png" alt="HDR Events" className="h-20 md:h-24 w-auto rounded-md" loading="eager" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs uppercase tracking-widest font-semibold transition-all duration-300 relative group ${location.pathname === link.path ? 'text-gold' : 'text-navy/80 hover:text-navy'
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-gold transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${location.pathname === link.path ? 'scale-x-100' : ''}`}></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-navy hover:text-gold focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FAF8F3] border-t border-[rgba(205,163,73,0.45)] shadow-xl">
          <div className="flex flex-col px-8 py-8 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block text-sm uppercase tracking-widest font-semibold ${location.pathname === link.path ? 'text-gold' : 'text-navy'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
