import { useMemo } from 'react';
import { X, Plus, Minus, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext'; 
import { products } from "../../../data/Products";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  const discoverySet = products.find(p => p.mood === "Discovery Set") 
    || products[products.length - 1];

  const isDiscoveryInCart = cart.some(item => item.id === discoverySet.id);

  // Custom total calculation (handles comma in prices)
  const cartTotal = useMemo(() => {
    if (!cart || cart.length === 0) return 0;

    return cart.reduce((total, item) => {
      const cleanPriceStr = item.price.toString().replace(/[^0-9]/g, '');
      const price = parseInt(cleanPriceStr) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return total + (price * quantity);
    }, 0);
  }, [cart]);

  const handleIncrement = (item) => {
    const currentQty = parseInt(item.quantity) || 1;
    updateQuantity(item.id, currentQty + 1);
  };

  const handleDecrement = (item) => {
    const currentQty = parseInt(item.quantity) || 1;
    if (currentQty > 1) {
      updateQuantity(item.id, currentQty - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleAddDiscovery = () => {
    if (!isDiscoveryInCart) {
      addToCart({ ...discoverySet, quantity: 1 });
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-ink/20 backdrop-blur-md transition-opacity duration-300 z-40 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-white/60 backdrop-blur-xl border-l border-white/30 transform transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="py-8 px-5 flex justify-between items-center">
            <div>
              <h2 className="font-serif text-3xl italic text-ink tracking-wide">Your Selection</h2>
              {cart.length > 0 ? (
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent mt-1 font-bold">Complimentary Shipping Applied</p>
              ) : (
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1">Your bag is empty</p>
              )}
            </div>
            <button onClick={onClose} className="hover:rotate-90 transition-transform duration-500">
              <X className="h-5 w-5 text-ink" />
            </button>
          </div>

          {/* Cart Items + Upsell (scrollable) */}
          <div className="flex-1 overflow-auto px-5 py-4 space-y-10 custom-scrollbar">
            {/* Empty message (only when truly empty) */}
            {cart.length === 0 && (
              <p className="text-center text-ink/60 italic">Waiting for your signature scent...</p>
            )}

            {/* Actual cart items */}
            {cart.map((item) => (
              <div key={item.id} className="flex gap-7 group animate-fade-in">

                {/* Product Image */}
                <div className="w-44 h-54 bg-gray-100 rounded-sm overflow-hidden shadow-2xl shadow-ink/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col py-2">
                  <div className="flex justify-between">
                    <h3 className="font-serif text-lg pb-1 text-ink leading-tight tracking-wider">{item.name}</h3>
                  </div>
                  <p className="font-medium text-sm text-accent pb-3 tracking-widest">₦{item.price}</p>

                  <p className="text-[10px] uppercase tracking-widest text-ink/60 mt-1 italic">
                    Quantity: {item.quantity}
                  </p>

                  {/* Controls */}
                  <div className="mt-auto flex justify-between items-center">
                    <div className="flex items-center gap-2 border border-ink/10 rounded-full px-3 py-1 bg-white/30 backdrop-blur-sm">
                      <button
                        onClick={() => handleDecrement(item)}
                        className="p-1 hover:scale-110 active:scale-95 transition-transform text-ink/80 hover:text-red-500"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={10} strokeWidth={2} />
                      </button>
                      <span className="text-xs font-medium w-6 text-center tabular-nums select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrement(item)}
                        className="p-1 hover:scale-110 active:scale-95 transition-transform text-ink/80 hover:text-green-600"
                        aria-label="Increase quantity"
                      >
                        <Plus size={10} strokeWidth={2} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Discovery Set Upsell - ALWAYS visible */}
            <div className="mt-8 p-4 pl-2 border-l border-ink/5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-accent" />
                <p className="font-serif italic text-lg text-ink">Complete the Ritual</p>
              </div>
              <div className="bg-white/30 p-4 rounded-xl flex items-center gap-4 border border-white/50">
                <div className="w-16 h-16 bg-ink/5 rounded-sm flex items-center justify-center">
                  <img 
                    src={discoverySet.image} 
                    alt="Sample Kit" 
                    className="w-14 h-14 object-cover rounded" 
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-serif italic tracking-widest text-ink">Discovery Set</p>
                  <p className="text-[13px] font-medium tracking-widest text-accent">NGN {discoverySet.price}</p>
                </div>
                <button
                  onClick={handleAddDiscovery}
                  disabled={isDiscoveryInCart}
                  className={`text-[10px] uppercase tracking-widest border border-ink/20 px-3 py-2 rounded-full transition-all ${
                    isDiscoveryInCart 
                      ? 'bg-ink/10 text-ink/50 cursor-not-allowed' 
                      : 'hover:bg-ink hover:text-white'
                  }`}
                >
                  {isDiscoveryInCart ? 'Added' : 'Add'}
                </button>
              </div>
            </div>
          </div>

          {/* Footer & Fixed Total */}
          <div className="p-8 bg-white/50 backdrop-blur-md border-t border-white/20">
            <div className="mb-8 space-y-2">
              <div className="flex justify-between text-[11px] uppercase tracking-widest opacity-60">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-md font-serif italic uppercase">Total</span>
                <span className="text-3xl font-serif text-accent tracking-tighter">
                  NGN {cartTotal.toLocaleString('en-NG')}
                </span>
              </div>
            </div>

            <button
              disabled={cart.length === 0}
              className={`relative w-full py-6 rounded-full overflow-hidden group transition-all duration-700 ease-out shadow-2xl ${
                cart.length === 0
                  ? 'bg-ink/20 cursor-not-allowed'
                  : 'bg-ink text-white cursor-pointer hover:scale-[1.02] hover:shadow-ink/50'
              }`}
            >
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1200 ease-in-out" />
              <span className="relative z-10 uppercase tracking-[0.4em] text-[11px] font-bold transition-colors duration-400 group-hover:text-ink">
                Proceed to Checkout
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;