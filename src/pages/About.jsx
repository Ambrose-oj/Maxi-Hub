// const About = () => {
//   return (
//     <div className="pt-32 pb-20 bg-canvas min-h-screen text-ink">
//       <div className="max-w-3xl mx-auto px-6 text-center">
//         <span className="text-accent uppercase tracking-[0.3em] text-sm block mb-6">Our Philosophy</span>
//         <h1 className="font-serif text-5xl md:text-7xl mb-12 italic">Scents that linger in the soul.</h1>
//         <p className="text-lg leading-relaxed mb-8 opacity-80">
//           MAXI HUB was born from a simple idea: that your fragrance should be as dynamic as your mood. 
//           We source rare botanicals to create complex, evolving scent profiles.
//         </p>
//         <div className="h-[400px] bg-gray-200 rounded-sm mb-12">
//            {/* Placeholder for a moody brand image */}
//            <img src="/about-brand.jpg" className="w-full h-full object-cover grayscale" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;



import { useState, useEffect } from 'react';

function About() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle parallax effect on background text (like home page)
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pt-32 px-6 min-h-screen bg-canvas relative overflow-hidden">
      {/* Subtle parallax background text for depth */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
        <h1
          className="text-[20vw] font-serif uppercase leading-none text-ink/40"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          MAXI
        </h1>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Brand Image - Full bleed elegance */}
        <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-20 shadow-2xl">
          <img
            src="/about-brand.jpg" // Replace with your actual image path
            alt="MAXI HUB brand aesthetic"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>

        {/* Philosophy Title */}
        {/* <h2 className="text-accent uppercase tracking-[0.3em] text-center text-lg block mb-6">Our Philosophy</h2> */}
        <h2 className="font-serif text-4xl md:text-5xl text-center tracking-[0.3em] uppercase text-ink/60 mb-16">
          Our Philosophy
        </h2>

        {/* Main Heading - Large, poetic, with generous letter spacing */}
        <h1 className="font-serif text-6xl md:text-8xl text-center tracking-[0.15em] leading-tight text-ink mb-20 italic">
          Scents that linger
          <br />
          in the soul.
        </h1>

        {/* Enhanced Story Paragraph - Refined, luxurious tone + elegant styling */}
        <div className="text-center space-y-8">
          <p className="text-lg md:text-xl leading-relaxed tracking-[0.05em] text-ink/80 max-w-3xl mx-auto">
            MAXI HUB was born from a singular, timeless conviction: that true fragrance is an extension of the self—fluid, evolving, and deeply personal.
          </p>
          <p className="text-lg md:text-xl leading-relaxed tracking-[0.05em] text-ink/80 max-w-3xl mx-auto">
            We travel the world to source the rarest botanicals—delicate florals from hidden gardens, ancient woods from remote forests, and exotic spices carried on distant winds. Each ingredient is chosen not just for its aroma, but for its ability to transform throughout the day, unfolding in layers that mirror your mood, your moments, your essence.
          </p>
          <p className="text-lg md:text-xl leading-relaxed tracking-[0.05em] text-ink/80 max-w-3xl mx-auto">
            Our creations are more than perfumes—they are quiet companions, evoking confidence in the morning light, mystery under moonlight, and joy in fleeting instants. Designed to linger not only on the skin, but in memory.
          </p>
          <p className="text-lg md:text-xl leading-relaxed tracking-[0.08em] font-medium text-accent mt-12">
            Wear your mood. Live your scent.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;