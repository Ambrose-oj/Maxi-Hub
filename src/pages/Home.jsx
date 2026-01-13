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

    </>
  );
}
