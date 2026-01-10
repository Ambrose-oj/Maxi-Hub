// const products = [
//   { id: 1, name: "Sunday Morning", price: "85", mood: "Fresh", image: "/p1.jpg" },
//   { id: 2, name: "Midnight Tokyo", price: "95", mood: "Woody", image: "/p2.jpg" },
//   { id: 3, name: "Desert Rose", price: "110", mood: "Floral", image: "/p3.jpg" },
//   // Add more as needed
// ];

// const Shop = () => {
//   return (
//     <div className="pt-32 pb-20 px-6 bg-canvas min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="font-serif text-4xl mb-12 text-ink">The Collection</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
//           {products.map((product) => (
//             <div key={product.id} className="group cursor-pointer">
//               <div className="aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm mb-4">
//                 <img 
//                   src={product.image} 
//                   alt={product.name}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                 />
//               </div>
//               <h3 className="font-serif text-xl text-ink">{product.name}</h3>
//               <p className="text-xs uppercase tracking-widest text-accent mb-2">{product.mood}</p>
//               <p className="text-ink font-medium">${product.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;



function Shop() {
  const products = [
    { id: 1, name: "Velvet Oud", price: "$120", mood: "Woody" },
    { id: 2, name: "Morning Dew", price: "$95", mood: "Floral" },
    { id: 3, name: "Midnight Musk", price: "$110", mood: "Musk" },
    { id: 4, name: "Sunday Morning", price: "$85", mood: "Fresh" },
    { id: 5, name: "Midnight Tokyo", price: "$95", mood: "Vanilla" },
    { id: 6, name: "Desert Rose", price: "$110", mood: "Floral" },
  ];

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
              {/* Image Placeholder (frosted glass luxury feel) */}
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-xl group-hover:shadow-2xl group-hover:scale-105 transition-all duration-500 ease-out">
                {/* Replace with real image later: <img src={product.image} alt="" className="w-full h-full object-cover" /> */}
              </div>

              {/* Text Content */}
              <div className="mt-10 text-center">
                {/* Product Name - Elegant serif with generous letter spacing */}
                <h3 className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-ink mb-6">
                  {product.name}
                </h3>

                {/* Price - Prominent, bold, accent color, wide tracking */}
                <p className="text-3xl md:text-4xl font-medium text-accent tracking-wider mb-4">
                  {product.price}
                </p>

                {/* Mood - Small uppercase tag with wide letter spacing for luxury feel */}
                <p className="text-sm uppercase tracking-[0.4em] text-ink/60">
                  {product.mood}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;