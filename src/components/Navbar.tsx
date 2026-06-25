import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        isScrolled && setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Culture', path: '/culture' },
    { name: 'Careers', path: '/careers' },
    { name: 'Investors', path: '/investors' },
    { name: 'Impact', path: '/impact' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#f4f4f4]/95 backdrop-blur-md border-b border-black/10 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-1.5 focus:outline-none">
          <span className="text-xl font-bold tracking-tight text-black flex items-center">
            Local<span className="text-yellow-500">SM</span>
          </span>
          <span className="h-2 w-2 rounded-full bg-[#0055ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative text-sm font-medium text-black/70 hover:text-black transition-colors duration-300 py-1 focus:outline-none"
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#0055ff] transition-all duration-300" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-black hover:text-[#0055ff] transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`fixed inset-0 top-[60px] bg-[#f4f4f4] z-40 md:hidden transition-all duration-500 ease-in-out border-t border-black/5 ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-8 py-12 space-y-8 h-full bg-[#f4f4f4]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-light text-black flex items-center justify-between group border-b border-black/5 pb-4 focus:outline-none"
            >
              <span className="group-hover:text-[#0055ff] transition-colors duration-300">
                {link.name}
              </span>
              {isActive(link.path) ? (
                <span className="h-1.5 w-1.5 rounded-full bg-[#0055ff]"></span>
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-[#0055ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
