import { useCart } from '../context/CartContext';

function Shop() {
  const { addToCart } = useCart();
  const products = [
    { id: 1, name: "Velvet Oud", price: "250,000", mood: "Woody", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1000" },
    { id: 2, name: "Morning Dew", price: "115,000", mood: "Floral", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000" },
    { id: 3, name: "Midnight Musk", price: "340,000", mood: "Musk", image: "https://images.unsplash.com/photo-1598634222670-87c5f558119c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb" },
    { id: 4, name: "Sunday Morning", price: "95,000", mood: "Fresh", image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=1000" },
    { id: 5, name: "Midnight Tokyo", price: "190,000", mood: "Vanilla", image: "https://static.vecteezy.com/system/resources/previews/068/200/641/non_2x/mysterious-black-perfume-bottle-purple-smoke-scented-productgraphy-free-photo.jpg" },
    // { id: 8, name: "Apricot Sky", price: "120,000", mood: "Energetic & Sweet", image: "https://static.vecteezy.com/system/resources/previews/068/200/641/non_2x/mysterious-black-perfume-bottle-purple-smoke-scented-productgraphy-free-photo.jpg" },
    { id: 6, name: "Desert Rose", price: "160,000", mood: "Fresh", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000" },
    { id: 7, name: "Wild Muse", price: "135,000", mood: "Timber", image: "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg?referrer=grok.com" },
    { id: 8, name: "Apricot Sky", price: "120,000", mood: "Energetic & Sweet", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=1000" },
    // { id: 8, name: "Apricot Sky", price: "120,000", mood: "Energetic & Sweet", image: "https://images.unsplash.com/photo-1725182524928-bc1de6a87d82?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&referrer=grok.com" },
    { id: 9, name: "Choco Musk et Franc Vile", price: "75,000", mood: "Discovery Set", image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=1000" },
  ];
  
const handleAdd = (product) => {
    addToCart(product);
    onCartClick(); 
  };
  return (
    <div className="pt-32 px-6 min-h-screen bg-canvas">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="font-serif text-5xl md:text-6xl mb-20 text-ink italic text-center tracking-wide">
          The Collection
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {products.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-xl group-hover:shadow-2xl group-hover:scale-105 transition-all duration-500 ease-out">
                {/* Replace with real image later: <img src={product.image} alt="" className="w-full h-full object-cover" /> */}
                 <img src={product.image} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Text Content */}
              <div className="mt-10 text-center">
                <h3 className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-ink mb-6">
                  {product.name}
                </h3>

                <p className="text-3xl md:text-4xl font-medium text-accent tracking-wider mb-4"> 
                 NGN {product.price}
                </p>

                <p className="text-sm uppercase tracking-[0.4em] text-ink/60">
                  {product.mood}
                </p>
              </div>
              <button 
                  onClick={() => handleAdd(product)}
                  className="mt-4 text-[10px] uppercase tracking-[0.2em] border border-ink/20 px-6 py-2 hover:bg-ink hover:text-white transition-all"
            >
                  Add to Bag
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;


