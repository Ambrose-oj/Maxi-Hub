// src/pages/ProductPage.jsx
import ScentPyramid from '../components/sections/ScentPyramid';

const ProductPage = () => {
  return (
    <main className="pt-20 px-4 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
      {/* LEFT SIDE: Images */}
      <section className="w-full md:w-1/2">
        <img src="/bottle-shot.jpg" className="rounded-2xl" alt="Sunday Morning Perfume" />
      </section>

      {/* RIGHT SIDE: Details */}
      <section className="w-full md:w-1/2">
        <span className="text-accent uppercase tracking-widest text-sm font-bold">New Arrival</span>
        <h1 className="font-serif text-4xl mt-2 mb-4">Sunday Morning</h1>
        <p className="text-xl font-medium mb-6">$85.00</p>
        
        <p className="text-gray-600 leading-relaxed mb-8">
          A crisp, airy scent that feels like fresh linen and golden sunlight. 
          Perfect for quiet mornings and effortless style.
        </p>

        <button className="w-full bg-ink text-white py-4 rounded-full mb-12 hover:bg-accent transition-colors">
          Add to Bag
        </button>

        {/* WHERE THE COMPONENT LIVES */}
        <div className="border-t border-gray-100 pt-8">
          <h3 className="font-serif text-2xl mb-4">The Scent Profile</h3>
          <ScentPyramid 
            top="Sicilian Lemon, Bergamot" 
            heart="White Rose, Jasmine" 
            base="Cedarwood, Musk" 
          />
        </div>
      </section>
    </main>
  );
};


// const ScentPyramid = ({ top, heart, base }) => {
//   return (
//     <div className="my-8 space-y-4">
//       <div className="flex items-center gap-4">
//         <span className="w-16 text-xs font-bold uppercase tracking-widest text-accent">Top</span>
//         <div className="h-px flex-1 bg-gray-200"></div>
//         <span className="text-sm text-gray-600">{top}</span>
//       </div>
//       <div className="flex items-center gap-4">
//         <span className="w-16 text-xs font-bold uppercase tracking-widest text-accent">Heart</span>
//         <div className="h-px flex-1 bg-gray-200"></div>
//         <span className="text-sm text-gray-600">{heart}</span>
//       </div>
//       <div className="flex items-center gap-4">
//         <span className="w-16 text-xs font-bold uppercase tracking-widest text-accent">Base</span>
//         <div className="h-px flex-1 bg-gray-200"></div>
//         <span className="text-sm text-gray-600">{base}</span>
//       </div>
//     </div>
//   );
// };