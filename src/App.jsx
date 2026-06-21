import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';
import ReviewsPage from './pages/ReviewsPage';
import ShopByAgePage from './pages/ShopByAgePage';
import FeaturedProductsPage from './pages/FeaturedProductsPage';
import ToysPage from './pages/ToysPage';

// Scroll to top on route change for premium UX
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
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

          <main>
            <Routes>
              {/* Home Route Redirects to Products */}
              <Route path="/" element={<Navigate to="/products" replace />} />

              {/* Categories Routes */}
              <Route path="/Categories" element={
                <CategoriesPage 
                  cartItems={cartItems} 
                  setCartItems={setCartItems} 
                  wishlist={wishlist} 
                  setWishlist={setWishlist} 
                />
              } />
              <Route path="/categories" element={
                <CategoriesPage 
                  cartItems={cartItems} 
                  setCartItems={setCartItems} 
                  wishlist={wishlist} 
                  setWishlist={setWishlist} 
                />
              } />

              {/* Products Route */}
              <Route path="/products" element={
                <ProductsPage 
                  cartItems={cartItems} 
                  setCartItems={setCartItems} 
                  wishlist={wishlist} 
                  setWishlist={setWishlist} 
                />
              } />

              {/* Reviews Route */}
              <Route path="/reviews" element={<ReviewsPage />} />

              {/* Shop by Age Routes */}
              <Route path="/shop by age" element={
                <ShopByAgePage 
                  cartItems={cartItems} 
                  setCartItems={setCartItems} 
                  wishlist={wishlist} 
                  setWishlist={setWishlist} 
                />
              } />
              <Route path="/shop-by-age" element={
                <ShopByAgePage 
                  cartItems={cartItems} 
                  setCartItems={setCartItems} 
                  wishlist={wishlist} 
                  setWishlist={setWishlist} 
                />
              } />

              {/* Featured Products Routes */}
              <Route path="/Featured products" element={
                <FeaturedProductsPage 
                  cartItems={cartItems} 
                  setCartItems={setCartItems} 
                  wishlist={wishlist} 
                  setWishlist={setWishlist} 
                />
              } />
              <Route path="/featured-products" element={
                <FeaturedProductsPage 
                  cartItems={cartItems} 
                  setCartItems={setCartItems} 
                  wishlist={wishlist} 
                  setWishlist={setWishlist} 
                />
              } />
              <Route path="/featured" element={
                <FeaturedProductsPage 
                  cartItems={cartItems} 
                  setCartItems={setCartItems} 
                  wishlist={wishlist} 
                  setWishlist={setWishlist} 
                />
              } />

              {/* Toys Routes */}
              <Route path="/Toys" element={
                <ToysPage 
                  cartItems={cartItems} 
                  setCartItems={setCartItems} 
                  wishlist={wishlist} 
                  setWishlist={setWishlist} 
                />
              } />
              <Route path="/toys" element={
                <ToysPage 
                  cartItems={cartItems} 
                  setCartItems={setCartItems} 
                  wishlist={wishlist} 
                  setWishlist={setWishlist} 
                />
              } />
            </Routes>
          </main>
        </div>

        {/* Footer Section */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

