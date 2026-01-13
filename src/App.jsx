import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Navbar from './components/layout/Navbar';
import Quiz from './pages/Quiz';
import CartDrawer from './components/layout/CartDrawer';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas overflow-hidden">
      {/* <Navbar setIsCartOpen={setIsCartOpen} /> */}
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/quiz" element={<Quiz />} />
        
      </Routes>
    </div>
  );
}

export default App;
