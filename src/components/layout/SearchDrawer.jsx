import { useState, useMemo } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const SearchDrawer = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  // Filter products in real-time
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return [];
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.mood.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Backdrop (Darken the background) */}
      <div 
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      />

      {/* Search Container (Slides down from top) */}
      <div className="relative w-full bg-canvas border-b border-ink/10 shadow-2xl animate-slide-down">
        
        {/* Header / Input Area */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif italic text-ink/40 text-sm tracking-widest uppercase">Search Collection</h2>
            <button onClick={onClose} className="hover:rotate-90 active:rotate-90 transition-transform duration-500">
              <X className="w-6 h-6 text-ink" />
            </button>
          </div>

          <div className="relative border-b-2 border-ink">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-ink/40 w-6 h-6" />
            <input
              autoFocus
              type="text"
              placeholder="Type to search (e.g. 'Musk', 'Floral')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent py-4 pl-10 pr-4 text-3xl font-serif text-ink placeholder:text-ink/20 focus:outline-none"
            />
          </div>
        </div>

        {/* Results Area */}
        {searchTerm && (
          <div className="max-w-4xl mx-auto px-6 pb-12 overflow-y-auto max-h-[60vh] custom-scrollbar">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="flex items-center gap-4 p-4 bg-white/40 hover:bg-white active:bg-white rounded-xl transition-colors group cursor-pointer border border-transparent hover:border-ink/5 active:border-ink/5"
                    onClick={() => {
                        addToCart(product);
                        // Optional: onClose(); // Close search after adding?
                    }}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-16 h-20 object-cover rounded-md shadow-sm"
                    />
                    <div className="flex-1">
                      <h4 className="font-serif text-lg text-ink group-hover:text-accent group-active:text-accent transition-colors">{product.name}</h4>
                      <p className="text-xs uppercase tracking-widest opacity-50">{product.mood}</p>
                      <p className="text-sm font-medium mt-1">NGN {product.price}</p>
                    </div>
                    
                    {/* Quick Add Button */}
                    <button className="w-8 h-8 rounded-full border border-ink/10 flex items-center justify-center hover:bg-ink active:bg-ink hover:text-white active:text-white transition-all">
                        <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 opacity-40">
                <p className="font-serif italic text-xl">No scents found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDrawer;