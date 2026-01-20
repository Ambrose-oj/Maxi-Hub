import { useCart } from '../context/CartContext';
import { products } from '../../data/products';
import { useSearchParams, useNavigate } from 'react-router-dom';

function Shop({ onCartClick }) { // Keeping onCartClick as a prop
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get('q')?.trim() || '';

  // Filter products by name and mood (case-insensitive)
  const filteredProducts = query
    ? products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.mood && product.mood.toLowerCase().includes(query.toLowerCase()))
      )
    : products;

  const handleAdd = (product) => {
    addToCart(product);
    if (onCartClick) onCartClick(); // Opens the cart drawer after adding
  };

  const handleClearSearch = () => {
    setSearchParams({}); // Removes the ?q= param → back to full collection
    // Alternative: navigate('/shop');
  };

  return (
    <div className="pt-32 px-6 min-h-screen bg-canvas mb-15">
      <div className="max-w-7xl mx-auto">
        {/* Title + Clear Search Button */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-2xl md:text-3xl pb-5 text-ink italic tracking-wide">
            {query ? `Search results for "${query}"` : 'The Collection'}
          </h2>

          {query && (
            <button
              onClick={handleClearSearch}
              className="mt-6 text-sm uppercase tracking-[0.2em] text-ink/60 hover:text-ink transition"
            >
              Clear search →
            </button>
          )}
        </div>

        {/* No Results Message */}
        {query && filteredProducts.length === 0 && (
          <p className="text-center text-ink/60 text-lg py-20">
            No scents found for "{query}". Try searching for something else.
          </p>
        )}

        {/* Product Grid */}
        {(query ? filteredProducts.length > 0 : true) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer flex flex-col"
              >
                {/* Image */}
                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white/10 backdrop-blur">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-col flex-1 justify-between pt-6 min-h-[140px]">
                  <div className="mb-5 text-center">
                    <h3 className="font-serif text-2xl tracking-[0.2em] text-ink mb-4">
                      {product.name}
                    </h3>

                    <p className="text-2xl font-medium text-accent tracking-wider mb-4">
                      NGN {product.price}
                    </p>

                    <p className="text-sm uppercase tracking-[0.4em] text-ink/60">
                      {product.mood}
                    </p>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    onClick={() => handleAdd(product)}
                    className="mt-auto mt-6 text-[10px] uppercase tracking-[0.2em] px-6 py-2 hover:bg-ink hover:text-white transition-all border border-ink/20 py-3"
                  >
                    Add to bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;




// CODE WITHOUT THE SEARCH FUNCTION
// import { useCart } from '../context/CartContext';
// import { products } from '/data/products';

// function Shop() {
//   const { addToCart } = useCart();
  
// const handleAdd = (product) => {
//     addToCart(product);
//     onCartClick(); 
//   };
  
//   return (
//     <div className="pt-32 px-6 min-h-screen bg-canvas mb-15">
//       <div className="max-w-7xl mx-auto">
//         {/* Title */}
//         <h2 className="font-serif text-5xl md:text-6xl mb-20 text-ink italic text-center tracking-wide">
//           The Collection
//         </h2>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
//           {products.map((product) => (
//             <div key={product.id} className="group cursor-pointer flex flex-col">

//           {/* Image */}
//         <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white/10 backdrop-blur">
//         <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
//       </div>

//           {/* Text content – now flex column that grows */}

//       <div className="flex flex-col flex-1 justify-between pt-6 min-h-[140px]">
//         <div className='mb-5 text-center'>
//           <h3 className="font-serif text-2xl md:text-2xl tracking-[0.2em] text-ink mb-4">
//           {product.name}
//           </h3>

//                     {/* LINE CLAMP  */}
//           {/* <h3 className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-ink mb-4 line-clamp-2">
//                   {product.name}
//              </h3> */}


//           {/* Price */}
//           <p className="text-2xl md:text-2xl font-medium text-accent tracking-wider mb-4">
//            NGN {product.price}
//           </p>

//           {/* Mood */}
//           <p className="text-sm uppercase tracking-[0.4em] text-ink/60">
//             {product.mood}
//           </p>
//         </div>

//             {/* Button pushed to bottom */}
//         <button
//             onClick={() => handleAdd(product)}
//             className="mt-auto mt-6 text-[10px] uppercase tracking-[0.2em] px-6 py-2 hover:bg-ink hover:text-white transition-all border border-ink/20 py-3"
//         >
//             Add to Bag
//         </button>
//       </div>
//     </div>
    
    
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Shop;

