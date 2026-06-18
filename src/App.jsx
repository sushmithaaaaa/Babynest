import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import OfferBanner from './components/OfferBanner';
import Products from './components/Products';
import Reviews from './components/Reviews';
import Brands from './components/Brands';
import Footer from './components/Footer';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Helper function to handle clicks that trigger a shop scroll + category set
  const handleShopRedirect = (category) => {
    setActiveCategory(category);
    setShowWishlistOnly(false);
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-amber-50/10 flex flex-col justify-between selection:bg-pink-100 selection:text-pink-600">
      <div>
        {/* Navbar */}
        <Navbar 
          cartItems={cartItems} 
          setCartItems={setCartItems}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          wishlist={wishlist}
          showWishlistOnly={showWishlistOnly}
          setShowWishlistOnly={setShowWishlistOnly}
        />

        {/* Hero Section */}
        <Hero onShopClick={handleShopRedirect} />

        {/* Categories Section */}
        <Categories 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        {/* Products Section */}
        <Products 
          cartItems={cartItems}
          setCartItems={setCartItems}
          wishlist={wishlist}
          setWishlist={setWishlist}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          showWishlistOnly={showWishlistOnly}
        />

        {/* Offer Banner */}
        <OfferBanner onShopClick={handleShopRedirect} />

        {/* Testimonials/Reviews Section */}
        <Reviews />

        {/* Brands Section */}
        <Brands />
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
