import { useMemo } from 'react';
import { X, Plus, Minus, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext'; 

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const discoverySetPrice = 35000;

  // Fixed cart total - cleans prices and sums correctly
  const cartTotal = useMemo(() => {
    if (!cart || cart.length === 0) return 0;

    return cart.reduce((total, item) => {
      const cleanPriceStr = item.price ? item.price.toString().replace(/[^0-9]/g, '') : '0';
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

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-ink/20 backdrop-blur-md transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-white/60 backdrop-blur-xl border-l border-white/30 transform transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          
          {/* Header */}
          <div className="p-8 flex justify-between items-center">
            <div>
              <h2 className="font-serif text-3xl italic text-ink tracking-wide">Your Selection</h2>
              {cart.length > 0 ? (
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent mt-1 font-bold">
                  Complimentary Shipping Applied
                </p>
              ) : (
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1">Your bag is empty</p>
              )}
            </div>
            <button onClick={onClose} className="hover:rotate-90 transition-transform duration-500">
              <X className="h-5 w-5 text-ink" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-auto px-8 py-4 space-y-10 custom-scrollbar">
            {cart.length > 0 &&
              cart.map((item) => (
                <div key={item.id} className="flex gap-8 group animate-fade-in">
                  
                  {/* Product Image */}
                  <div className="w-32 h-44 bg-gray-100 rounded-sm overflow-hidden shadow-2xl shadow-ink/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col py-2">
                    <div className="flex justify-between">
                      <h3 className="font-serif text-xl text-ink leading-tight">{item.name}</h3>
                      <p className="font-medium text-ink"> N{item.price}</p>
                    </div>

                    <p className="text-[10px] uppercase tracking-widest text-ink/60 mt-1 italic">
                      Quantity: {item.quantity}
                    </p>

                    {/* Controls Wrapper */}
                    <div className="mt-auto flex justify-between items-center">
                      
                      {/* Quantity "Pill" Container */}
                      <div className="flex items-center gap-2 border border-ink/10 rounded-full px-3 py-1 bg-white/30 backdrop-blur-sm">
                        
                        {/* Decrement Button */}
                        <button 
                          onClick={() => handleDecrement(item)}
                          className="p-1 hover:scale-110 active:scale-95 transition-transform text-ink/80 hover:text-red-500"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} strokeWidth={2} />
                        </button>

                        {/* Quantity Number */}
                        <span className="text-xs font-medium w-6 text-center tabular-nums select-none">
                          {item.quantity}
                        </span>

                        {/* Increment Button */}
                        <button 
                          onClick={() => handleIncrement(item)}
                          className="p-1 hover:scale-110 active:scale-95 transition-transform text-ink/80 hover:text-green-600"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} strokeWidth={2} />
                        </button>
                      </div>

                      {/* Remove Text Button */}
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
            
            {cart.length === 0 && (
              <p className="text-center text-ink/60 italic">Waiting for your signature scent...</p>
            )}

            {/* Upsell Section */}
            <div className="p-4 pl-2 border-l border-ink/5">
               <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <p className="font-serif italic text-lg text-ink">Complete the Ritual</p>
               </div>
               <div className="bg-white/30 p-4 rounded-xl flex items-center gap-4 border border-white/50">
                  <div className="w-16 h-16 bg-ink/5 rounded-sm flex items-center justify-center">
                     <span className="text-[8px] uppercase tracking-widest opacity-60">Sample Kit</span>
                  </div>
                  <div className="flex-1">
                     <p className="text-xs font-serif italic text-ink">Discovery Set</p>
                     <p className="text-[10px] text-accent">NGN 50,000</p>
                  </div>
                  <button className="text-[10px] uppercase tracking-widest border border-ink/20 px-3 py-2 rounded-full hover:bg-ink hover:text-white transition-all">
                     Add
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
                 <span className="text-3xl font-serif text-ink tracking-tighter">
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
               {/* Liquid Fill Animation */}
               <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
               
               {/* Shine Effect */}
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1200 ease-in-out" />
               
               {/* Button Text */}
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

