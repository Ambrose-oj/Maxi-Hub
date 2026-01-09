import ProductCard from '../components/ui/ProductCard';

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Sunday Morning",
    price: "85",
    mood: "Fresh & Airy",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    name: "Midnight Tokyo",
    price: "95",
    mood: "Bold & Woody",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    name: "Velvet Hour",
    price: "88",
    mood: "Soft & Floral",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 4,
    name: "Apricot Sky",
    price: "82",
    mood: "Energetic & Sweet",
    image: "https://images.unsplash.com/photo-1563170351-be82bc888bb4?auto=format&fit=crop&q=80&w=1000"
  }
];

const Home = () => {
  return (
    <div className="pt-16">
      {/* Hero Section (Keep your existing Hero here) */}
      
      {/* Featured Collection Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-4xl mb-2 text-ink">The Collection</h2>
            <p className="text-gray-500">Find the scent that speaks your language.</p>
          </div>
          <button className="text-ink border-b border-ink pb-1 hover:text-accent hover:border-accent transition-all">
            View All
          </button>
        </div>

        {/* The Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id}
              name={product.name}
              price={product.price}
              mood={product.mood}
              image={product.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductCard;