import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingBag, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar = ({ onCartClick }) => {
  // --- Mobile Menu Logic (Kept from your original code) ---
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const { cartCount } = useCart();

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isOpen]);

  return (
    <nav className="fixed w-full z-50 bg-canvas/90 backdrop-blur-md border-b border-ink/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 1. Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="text-ink hover:text-accent transition-colors p-1"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* 2. Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none">
            <Link 
              to="/" 
              className="font-serif text-2xl tracking-[0.1em] italic text-ink hover:opacity-80 transition-opacity"
            >
              MAXI HUB
            </Link>
          </div>

          {/* 3. Desktop Links */}
          <div className="hidden md:flex space-x-12">
            <Link 
              to="/shop" 
              className="text-xs uppercase tracking-[0.2em] font-medium text-ink hover:text-accent transition-colors"
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className="text-xs uppercase tracking-[0.2em] font-medium text-ink hover:text-accent transition-colors"
            >
              Our Story 
            </Link>
          </div>

          {/* 4. Icons (Updated for Cart Drawer) */}
          <div className="flex items-center space-x-6">
            <Search className="h-5 w-5 cursor-pointer text-ink hover:text-accent transition-colors" />
            
            {/* THIS IS THE NEW CART BUTTON */}
            <button 
              onClick={onCartClick} 
              className="relative group p-1"
              aria-label="Open Cart"
            >
              
              <ShoppingBag className="h-5 w-5 cursor-pointer text-ink group-hover:text-accent transition-colors" />
              
              {/* Notification Badge */}
              {/* Only show the badge if there are items in the cart */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent text-white text-[10px] font-bold 
               flex items-center justify-center rounded-full border-1 border-canvas 
               animate-in zoom-in duration-300 leading-none pt-[1px]">
                  {cartCount}
                </span>
              )}

              {/*  OLD CART BUTTON CODE FOR REFERENCE
//             
//               <ShoppingBag className="h-5 w-5 cursor-pointer hover:text-accent" />
//               <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
//                 0
//               </span>
//              */}

            </button>
          </div>
        </div>
      </div>

      {/*  Mobile Menu Dropdown */}
      {isOpen && (
        <div 
          ref={dropdownRef} 
          className="md:hidden bg-canvas border-b border-ink/10 animate-fade-in absolute w-full left-0 top-16"
        >
          <div className="px-4 py-6 space-y-4 flex flex-col items-center">
            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-sm uppercase tracking-[0.2em] font-medium text-ink hover:text-accent transition-colors"
            >
              Shop Collection
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-sm uppercase tracking-[0.2em] font-medium text-ink hover:text-accent transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
