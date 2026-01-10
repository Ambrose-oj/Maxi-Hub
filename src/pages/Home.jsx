import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false); // if needed here
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const scentParticles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: `${Math.random() * 20 + 20}s`,
    delay: `${Math.random() * 10}s`,
    size: `${Math.random() * 100 + 50}px`,
  }));

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Textual Aesthetic with Parallax */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
          <h1
            className="text-[20vw] font-serif uppercase leading-none"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            MAXI
          </h1>
        </div>

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {scentParticles.map((p) => (
            <div
              key={p.id}
              className="scent-particle"
              style={{
                left: p.left,
                '--duration': p.duration,
                '--delay': p.delay,
                '--size': p.size,
              }}
            />
          ))}
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 text-center px-6 animate-fade-in">
          <span className="text-accent tracking-[0.3em] uppercase text-sm font-bold block mb-4">
            The Art of Scent
          </span>
          <h1 className="font-serif text-5xl md:text-8xl mb-8 text-ink leading-tight">
            Wear your <span className="italic">mood.</span>
          </h1>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center mt-10">
        {/* Primary Button - Links to Shop */}
            <Link
              to="/shop"
              className="bg-ink text-white px-12 py-4 rounded-full border border-ink hover:bg-accent hover:border-accent transition-all duration-500 text-xs font-semibold tracking-[0.2em] uppercase inline-flex items-center justify-center"
        >
                Shop The Collection
            </Link>

        {/* Secondary Button - Now Links to Quiz */}
            <Link
              to="/quiz"
              className="backdrop-blur-md bg-white/10 border border-ink/20 text-ink px-12 py-4 rounded-full hover:bg-accent hover:text-white hover:border-accent transition-all duration-500 shadow-sm text-xs font-semibold tracking-[0.2em] uppercase inline-flex items-center justify-center"
        >
                Find Your Scent
            </Link>
          </div>
        </div>
      </section>

      {/* Any other home sections below */}
    </>
  );
}





















// const Home = () => {
//   return (
//     <div className="pt-16"> {/* Padding for fixed navbar */}
      
//       {/* Hero Section */}
//       <section className="relative h-[80vh] flex items-center justify-center bg-gray-100">
//         <img src="/hero-bg.jpg" className="absolute inset-0 w-full h-full object-cover" />
//         <div className="relative z-10 text-center px-4">
//           <h1 className="font-serif text-4xl md:text-6xl mb-4 text-white drop-shadow-md">
//             Wear your mood.
//           </h1>
//           <button className="bg-accent text-white px-8 py-3 rounded-full hover:bg-white hover:text-accent transition-all duration-300">
//             Shop The Collection
//           </button>
//         </div>
//       </section>

//       {/* Featured Grid */}
//       <section className="max-w-7xl mx-auto px-4 py-16">
//         <h2 className="font-serif text-3xl mb-8 text-center">Trending Now</h2>
        
//         {/* GRID STRATEGY:
//            grid-cols-1 = 1 column on Mobile
//            md:grid-cols-2 = 2 columns on Tablet
//            lg:grid-cols-4 = 4 columns on Desktop
//         */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//            <ProductCard name="Sunday Morning" price="85" mood="Fresh" image="/p1.jpg" />
//            <ProductCard name="Midnight Tokyo" price="95" mood="Woody" image="/p2.jpg" />
//            {/* ... more cards */}
//         </div>
//       </section>

//       {/* Scent Education Section */}
//       <section className="bg-white py-16">
//         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
//            <div className="w-full md:w-1/2">
//               <h2 className="font-serif text-3xl mb-4">Decode the Notes</h2>
//               <p className="text-gray-600 mb-6">Understanding perfume shouldn't require a chemistry degree.</p>
//               {/* Simple Accordion or Text here */}
//            </div>
//            <div className="w-full md:w-1/2 bg-canvas p-8 rounded-2xl">
//               {/* This would be the interactive diagram/image */}
//               <div className="text-center font-serif text-accent">Top • Heart • Base</div>
//            </div>
//         </div>
//       </section>
//     </div>
//   );
// };

