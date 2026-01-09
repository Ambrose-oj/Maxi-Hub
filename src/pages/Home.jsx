// src/pages/Home.jsx
const Home = () => {
  return (
    <div className="pt-16"> {/* Padding for fixed navbar */}
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gray-100">
        <img src="/hero-bg.jpg" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif text-4xl md:text-6xl mb-4 text-white drop-shadow-md">
            Wear your mood.
          </h1>
          <button className="bg-accent text-white px-8 py-3 rounded-full hover:bg-white hover:text-accent transition-all duration-300">
            Shop The Collection
          </button>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-serif text-3xl mb-8 text-center">Trending Now</h2>
        
        {/* GRID STRATEGY:
           grid-cols-1 = 1 column on Mobile
           md:grid-cols-2 = 2 columns on Tablet
           lg:grid-cols-4 = 4 columns on Desktop
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <ProductCard name="Sunday Morning" price="85" mood="Fresh" image="/p1.jpg" />
           <ProductCard name="Midnight Tokyo" price="95" mood="Woody" image="/p2.jpg" />
           {/* ... more cards */}
        </div>
      </section>

      {/* Scent Education Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
           <div className="w-full md:w-1/2">
              <h2 className="font-serif text-3xl mb-4">Decode the Notes</h2>
              <p className="text-gray-600 mb-6">Understanding perfume shouldn't require a chemistry degree.</p>
              {/* Simple Accordion or Text here */}
           </div>
           <div className="w-full md:w-1/2 bg-canvas p-8 rounded-2xl">
              {/* This would be the interactive diagram/image */}
              <div className="text-center font-serif text-accent">Top • Heart • Base</div>
           </div>
        </div>
      </section>
    </div>
  );
};