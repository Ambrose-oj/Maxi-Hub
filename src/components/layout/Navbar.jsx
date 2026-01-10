// // src/components/layout/Navbar.jsx
// import { useState } from 'react';
// import { Menu, ShoppingBag, Search } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="fixed w-full z-50 bg-canvas/90 backdrop-blur-md border-b border-ink/5">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
          
//           {/* Mobile Menu Button */}
//           <div className="flex items-center md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)}>
//               <Menu className="h-6 w-6 text-ink" />
//             </button>
//           </div>

//           {/* Logo */}
//           <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none">
//             <Link to="/" className="font-serif text-2xl tracking-[0.1em] italic">MAXI HUB</Link>
//           </div>

//           {/* Desktop Links (Hidden on Mobile) */}
//           <div className="hidden md:flex space-x-12">
//             <Link to="/shop" className="text-xs uppercase tracking-[0.2em] font-medium hover:text-accent transition-colors">Shop</Link>
//             <Link to="/about" className="text-xs uppercase tracking-[0.2em] font-medium hover:text-accent transition-colors">Our Story</Link>
//           </div>

//           {/* Icons */}
//           <div className="flex items-center space-x-4">
//             <Search className="h-5 w-5 cursor-pointer hover:text-accent" />
//             <div className="relative">
//               <ShoppingBag className="h-5 w-5 cursor-pointer hover:text-accent" />
//               <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {isOpen && (
//         <div className="md:hidden bg-canvas border-t border-ink/10">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <Link to="/shop" className="block px-3 py-2 text-sm uppercase tracking-[0.1em] font-small hover:text-accent transition-colors">Shop Collection</Link>
//             <Link to="/about" className="block px-3 py-2 text-sm uppercase tracking-[0.1em] font-small hover:text-accent transition-colors">Our Story</Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingBag, Search } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close menu when clicking outside (button or dropdown)
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

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <nav className="fixed w-full z-50 bg-canvas/90 backdrop-blur-md border-b border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="text-ink"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none">
            <Link
              to="/"
              className="font-serif text-2xl tracking-[0.1em] italic"
            >
              MAXI HUB
            </Link>
          </div>

          {/* Desktop Links (Hidden on Mobile) */}
          <div className="hidden md:flex space-x-12">
            <Link
              to="/shop"
              className="text-xs uppercase tracking-[0.2em] font-medium hover:text-accent transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-xs uppercase tracking-[0.2em] font-medium hover:text-accent transition-colors"
            >
              Our Story
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Search className="h-5 w-5 cursor-pointer hover:text-accent" />
            <div className="relative">
              <ShoppingBag className="h-5 w-5 cursor-pointer hover:text-accent" />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div ref={dropdownRef} className="md:hidden bg-canvas border-t border-ink/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-sm uppercase tracking-[0.1em] font-small hover:text-accent transition-colors"
            >
              Shop Collection
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-sm uppercase tracking-[0.1em] font-small hover:text-accent transition-colors"
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