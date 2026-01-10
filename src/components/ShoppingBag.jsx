const ShoppingBag = ({ isOpen, onClose }) => {
  // Sample data - later we will connect this to a real Cart Context
  const cartItems = [
    { id: 1, name: "Midnight Tokyo", price: 95, size: "50ml", image: "/p2.jpg" }
  ];

  return (
    <>
      {/* 1. The Dimmer Overlay: Fades in the background */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 z-40 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* 2. The Drawer: Slides from the right */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white/40 backdrop-blur-2xl border-l border-white/20 z-50 transform transition-transform duration-700 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex flex-col h-full p-8 md:p-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-3xl italic tracking-tight text-ink">Your Selection</h2>
            <button onClick={onClose} className="text-[10px] uppercase tracking-[0.3em] hover:text-accent transition-colors">
              Close
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-6 items-center group">
                <div className="w-24 h-32 bg-ink/5 overflow-hidden rounded-sm">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-ink">{item.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-accent mb-2">{item.size}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-ink">${item.price}</span>
                    <button className="text-[10px] uppercase tracking-tighter border-b border-ink/20 opacity-40 hover:opacity-100 transition-opacity">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer & Checkout */}
          <div className="mt-auto pt-8 border-t border-ink/10">
            <div className="flex justify-between items-end mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-60">Subtotal</span>
              <span className="font-serif text-2xl text-ink">$95.00</span>
            </div>
            <button className="w-full bg-ink text-white py-5 rounded-full uppercase text-[11px] tracking-[0.3em] font-bold hover:bg-accent transition-all duration-500 shadow-xl shadow-ink/10">
              Proceed to Checkout
            </button>
            <p className="text-center text-[9px] uppercase tracking-widest opacity-40 mt-6">
              Complimentary shipping on all orders.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingBag;