import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingBag, Search, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { products } from '/data/products'; 

const Navbar = ({ onCartClick }) => {
  // --- Mobile Menu Logic 
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

  // --- New Search Logic ---
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  // Auto-focus input when search overlay opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchTerm('');
      }
    };
    if (searchOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [searchOpen]);

  // Live filtering of products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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
                <img 
                    src="/assets/maxihub-logo.png" 
                    className='h-25 w-auto object-contain transition-opacity hover:opacity-70 duration-400'
                />
               
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
              {/* Search Icon - now opens the overlay */}
              <Search
                className="h-5 w-5 cursor-pointer text-ink hover:text-accent transition-colors"
                onClick={() => setSearchOpen(true)}
              />

              {/* THIS IS THE NEW CART BUTTON */}
              <button
                onClick={onCartClick}
                className="relative group p-1"
                aria-label="Open Cart"
              >
                <ShoppingBag className="h-5 w-5 cursor-pointer text-ink group-hover:text-accent transition-colors" />

                {/* Notification Badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent text-white text-[10px] font-bold flex items-center justify-center rounded-full border-1 border-canvas animate-in zoom-in duration-300 leading-none pt-[1px]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
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

      {/* NEW: Search Overlay/Modal */}
      {searchOpen && (
        // OLD SEARCH DESIGN
        // <div
        //   className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20 md:pt-32"
        //   onClick={() => {
        //     setSearchOpen(false);
        //     setSearchTerm('');
        //   }}
        // >
        //   <div
        //     className="w-full max-w-4xl bg-canvas rounded-lg shadow-2xl p-6 mx-4"
        //     onClick={(e) => e.stopPropagation()}
        //   >
        //     {/* Search bar + close button */}
        //     <div className="flex items-center gap-4 mb-6">
        //       <input
        //         ref={searchInputRef}
        //         type="text"
        //         placeholder="Search scents..."
        //         className="flex-1 px-5 py-2 tracking-wide text-lg border border-ink/20 rounded-md focus:outline-none focus:border-accent transition bg-canvas"
        //         value={searchTerm}
        //         onChange={(e) => setSearchTerm(e.target.value)}
        //       />
        //       <button
        //         onClick={() => {
        //           setSearchOpen(false);
        //           setSearchTerm('');
        //         }}
        //         className="p-2 hover:bg-gray-100 rounded-md transition"
        //       >
        //         <X className="h-6 w-6 text-ink" />
        //       </button>
        //     </div>

        //     {/* Results */}
        //     {searchTerm.length > 0 && (
        //       <div className="max-h-96 overflow-y-auto">
        //         {filteredProducts.length > 0 ? (
        //           <>
        //             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        //               {filteredProducts.slice(0, 9).map((product) => (
        //                 <div
        //                   key={product.id}
        //                   className="cursor-pointer group"
        //                   onClick={() => {
        //                     setSearchOpen(false);
        //                     setSearchTerm('');
        //                     navigate(`/shop?q=${encodeURIComponent(searchTerm)}`);
        //                   }}
        //                 >
        //                   <img
        //                     src={product.image || product.images?.[0]}
        //                     alt={product.name}
        //                     className="w-full h-64 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
        //                   />
        //                   <p className="mt-3 font-serif text-[20px] tracking-[0.1em] font-medium text-center text-ink">{product.name}</p>
        //                   <p className="text-accent text-1xl md:text-1xl tracking-wider text-center font-medium">NGN {product.price}</p>
        //                 </div>
        //               ))}
        //             </div>

        //             {filteredProducts.length > 9 && (
        //               <div className="text-center mt-8">
        //                 <button
        //                   onClick={() => {
        //                     setSearchOpen(false);
        //                     setSearchTerm('');
        //                     navigate(`/shop?q=${encodeURIComponent(searchTerm)}`);
        //                   }}
        //                   className="text-accent hover:underline font-medium"
        //                 >
        //                   View all {filteredProducts.length} results →
        //                 </button>
        //               </div>
        //             )}
        //           </>
        //         ) : (
        //           <p className="text-center text-ink/60 py-12">No scents found</p>
        //         )}
        //       </div>
        //     )}

        //     {searchTerm.length === 0 && (
        //       <p className="text-center text-ink/60 py-12 tracking-wide">Start typing to search for scents</p>
        //     )}
        //   </div>
        // </div>


        // NEW SEARCH IDEA
        <div className={`fixed inset-0 z-[60] transition-visibility duration-500 ${searchOpen ? 'visible' : 'invisible'}`}>
  {/* 1. Backdrop (Fades in) */}
  <div 
    className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-500 ${searchOpen ? 'opacity-100' : 'opacity-0'}`}
    onClick={() => {
      setSearchOpen(false);
      setSearchTerm('');
    }}
  />

  {/* 2. Drawer Panel (Slides from right) */}
  <div className={`absolute right-0 top-0 h-full w-full sm:w-[500px] bg-canvas shadow-2xl transition-transform duration-500 ease-out flex flex-col ${searchOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    
    {/* Header */}
    <div className="p-8 flex items-center justify-between border-b border-ink/5">
      <h2 className="font-serif italic text-xl tracking-wider text-ink">Search Collection</h2>
      <button 
        onClick={() => {
          setSearchOpen(false);
          setSearchTerm('');
        }}
        className="p-2 hover:rotate-90 transition-transform duration-500"
      >
        <X className="h-6 w-6 text-ink" />
      </button>
    </div>

    {/* Search Input Area */}
    <div className="p-8">
      <div className="relative group">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Find scents..."
          className="w-full bg-transparent border-b border-ink/20 py-4 text-2xl font-serif placeholder:text-ink/20 focus:outline-none focus:border-ink transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 text-ink/20 group-focus-within:text-ink transition-colors" />
      </div>
    </div>

    {/* Results Area */}
    <div className="flex-1 overflow-y-auto custom-scrollbar px-8 pb-12">
      {searchTerm.length > 0 ? (
        <div className="space-y-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="flex gap-6 group cursor-pointer items-center"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchTerm('');
                  navigate(`/shop?q=${encodeURIComponent(searchTerm)}`);
                }}
              >
                <div className="w-25 h-30 overflow-hidden rounded-lg">
                  <img 
                    src={product.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt={product.name} 
                  />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-ink tracking-widest">{product.name}</h4>
                  <p className="text-accent font-medium mt-1 tracking-wider">NGN {product.price}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1">{product.mood}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center italic text-ink/40">
              No scents found matching your search.
            </div>
          )}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/30">Suggestions</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-ink/80">
            {['Oud', 'Musk', 'Night', 'Rose'].map((tag) => (
              <button 
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="font-serif px-4 py-2 border border-ink/10 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
</div>
      )}
    </>
  );
};

export default Navbar;




// CODE WITHOUT SEARCH FUNCTION
// import { useState, useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Menu, ShoppingBag, Search } from 'lucide-react';
// import { useCart } from '../../context/CartContext';

// const Navbar = ({ onCartClick }) => {
//   // --- Mobile Menu Logic (Kept from your original code) ---
//   const [isOpen, setIsOpen] = useState(false);
//   const buttonRef = useRef(null);
//   const dropdownRef = useRef(null);

//   const { cartCount } = useCart();

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (
//         isOpen &&
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(event.target)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('click', handleOutsideClick);
//     return () => document.removeEventListener('click', handleOutsideClick);
//   }, [isOpen]);

//   return (
//     <nav className="fixed w-full z-50 bg-canvas/90 backdrop-blur-md border-b border-ink/5 transition-all duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
          
//           {/* 1. Mobile Menu Button */}
//           <div className="flex items-center md:hidden">
//             <button
//               ref={buttonRef}
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-ink hover:text-accent transition-colors p-1"
//             >
//               <Menu className="h-6 w-6" />
//             </button>
//           </div>

//           {/* 2. Logo */}
//           <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none">
//             <Link 
//               to="/" 
//               className="font-serif text-2xl tracking-[0.1em] italic text-ink hover:opacity-80 transition-opacity"
//             >
//               MAXI HUB
//             </Link>
//           </div>

//           {/* 3. Desktop Links */}
//           <div className="hidden md:flex space-x-12">
//             <Link 
//               to="/shop" 
//               className="text-xs uppercase tracking-[0.2em] font-medium text-ink hover:text-accent transition-colors"
//             >
//               Shop
//             </Link>
//             <Link 
//               to="/about" 
//               className="text-xs uppercase tracking-[0.2em] font-medium text-ink hover:text-accent transition-colors"
//             >
//               Our Story 
//             </Link>
//           </div>

//           {/* 4. Icons (Updated for Cart Drawer) */}
//           <div className="flex items-center space-x-6">
//             <Search className="h-5 w-5 cursor-pointer text-ink hover:text-accent transition-colors" />
            
//             {/* THIS IS THE NEW CART BUTTON */}
//             <button 
//               onClick={onCartClick} 
//               className="relative group p-1"
//               aria-label="Open Cart"
//             >
              
//               <ShoppingBag className="h-5 w-5 cursor-pointer text-ink group-hover:text-accent transition-colors" />
              
//               {/* Notification Badge */}
//               {/* Only show the badge if there are items in the cart */}
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent text-white text-[10px] font-bold 
//                flex items-center justify-center rounded-full border-1 border-canvas 
//                animate-in zoom-in duration-300 leading-none pt-[1px]">
//                   {cartCount}
//                 </span>
//               )}

//               {/*  OLD CART BUTTON CODE FOR REFERENCE
// //             
// //               <ShoppingBag className="h-5 w-5 cursor-pointer hover:text-accent" />
// //               <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
// //                 0
// //               </span>
// //              */}

//             </button>
//           </div>
//         </div>
//       </div>

//       {/*  Mobile Menu Dropdown */}
//       {isOpen && (
//         <div 
//           ref={dropdownRef} 
//           className="md:hidden bg-canvas border-b border-ink/10 animate-fade-in absolute w-full left-0 top-16"
//         >
//           <div className="px-4 py-6 space-y-4 flex flex-col items-center">
//             <Link
//               to="/shop"
//               onClick={() => setIsOpen(false)}
//               className="block px-3 py-2 text-sm uppercase tracking-[0.2em] font-medium text-ink hover:text-accent transition-colors"
//             >
//               Shop Collection
//             </Link>
//             <Link
//               to="/about"
//               onClick={() => setIsOpen(false)}
//               className="block px-3 py-2 text-sm uppercase tracking-[0.2em] font-medium text-ink hover:text-accent transition-colors"
//             >
//               Our Story
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
