import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { supabase } from './supabaseClient';

// Page Imports
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';
import ReviewsPage from './pages/ReviewsPage';
import ShopByAgePage from './pages/ShopByAgePage';
import FeaturedProductsPage from './pages/FeaturedProductsPage';
import ToysPage from './pages/ToysPage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import CustomBabyEssentials from './pages/CustomBabyEssentials';

// Admin Panel Imports
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminCustomers from './pages/AdminCustomers';
import AdminReviews from './pages/AdminReviews';

// Mock Defaults
import { mockProducts } from './data/products';
import { mockReviews } from './data/reviews';

// Scroll to top on route change for premium UX
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Admin Routing Guard
function ProtectedRoute() {
  const isAdminAuthenticated = localStorage.getItem('babynest_admin_authenticated') === 'true';
  return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

export default function App() {
  // 1. Shared Products State (Persisted)
  const [products, setProducts] = useState(() => {
    const local = localStorage.getItem('babynest_products');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        // Force reset if missing new items or contains old jewelry categories
        if (parsed.length < 22 || parsed.some(p => p.category === 'jewelry' || p.category === 'rings' || !p.age)) {
          localStorage.removeItem('babynest_products');
          return mockProducts;
        }
        return parsed;
      } catch (e) {
        return mockProducts;
      }
    }
    return mockProducts;
  });

  // 2. Shared Reviews State (Persisted)
  const [reviews, setReviews] = useState(() => {
    const local = localStorage.getItem('babynest_reviews');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        // Force reset if reviews are structurally outdated or empty
        if (parsed.length < 5 || !parsed.some(r => r.text.toLowerCase().includes('sheet') || r.text.toLowerCase().includes('crib'))) {
          localStorage.removeItem('babynest_reviews');
          return mockReviews;
        }
        return parsed;
      } catch (e) {
        return mockReviews;
      }
    }
    return mockReviews;
  });

  // 3. Wishlist State (Persisted)
  const [wishlist, setWishlist] = useState(() => {
    const local = localStorage.getItem('babynest_wishlist');
    return local ? JSON.parse(local) : [];
  });

  // 4. Cart Items State (Persisted)
  const [cartItems, setCartItems] = useState(() => {
    const local = localStorage.getItem('babynest_cart');
    return local ? JSON.parse(local) : [];
  });

  // 5. Orders State (Persisted)
  const [orders, setOrders] = useState(() => {
    const local = localStorage.getItem('babynest_orders');
    return local ? JSON.parse(local) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch all products from Supabase on mount
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Supabase fetch error:', error);
      } else {
        console.log('Supabase products data:', data);
      }
    }
    fetchProducts();
  }, []);

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('babynest_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('babynest_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('babynest_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('babynest_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('babynest_orders', JSON.stringify(orders));
  }, [orders]);

  // Wrapper layout to omit Navbar/Footer on Admin screens
  function StorefrontLayout() {
    return (
      <div className="min-h-screen bg-amber-50/10 flex flex-col justify-between selection:bg-pink-100 selection:text-pink-600">
        <div>
          <Navbar 
            cartItems={cartItems} 
            setCartItems={setCartItems}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            wishlist={wishlist}
          />
          <main>
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        
        {/* Storefront Routes */}
        <Route element={<StorefrontLayout />}>
          <Route path="/" element={<HomePage cartItems={cartItems} setCartItems={setCartItems} wishlist={wishlist} setWishlist={setWishlist} />} />
          
          <Route path="/categories" element={<CategoriesPage products={products} cartItems={cartItems} setCartItems={setCartItems} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/products" element={<ProductsPage products={products} cartItems={cartItems} setCartItems={setCartItems} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/toys" element={<ToysPage products={products} cartItems={cartItems} setCartItems={setCartItems} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/shop-by-age" element={<ShopByAgePage products={products} cartItems={cartItems} setCartItems={setCartItems} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/featured" element={<FeaturedProductsPage products={products} cartItems={cartItems} setCartItems={setCartItems} wishlist={wishlist} setWishlist={setWishlist} />} />
          
          <Route path="/reviews" element={<ReviewsPage reviews={reviews} setReviews={setReviews} />} />
          <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} setWishlist={setWishlist} cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} orders={orders} setOrders={setOrders} />} />
          <Route path="/custom-baby-essentials" element={<CustomBabyEssentials cartItems={cartItems} setCartItems={setCartItems} />} />
          
          {/* Backward compatible route aliases with clean redirects */}
          <Route path="/Categories" element={<Navigate to="/categories" replace />} />
          <Route path="/Toys" element={<Navigate to="/toys" replace />} />
          <Route path="/shop by age" element={<Navigate to="/shop-by-age" replace />} />
          <Route path="/Featured products" element={<Navigate to="/featured" replace />} />
          <Route path="/featured-products" element={<Navigate to="/featured" replace />} />
        </Route>

        {/* Admin Portal Authentication */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard products={products} orders={orders} reviews={reviews} />} />
            <Route path="products" element={<AdminProducts products={products} setProducts={setProducts} />} />
            <Route path="orders" element={<AdminOrders orders={orders} setOrders={setOrders} />} />
            <Route path="customers" element={<AdminCustomers orders={orders} />} />
            <Route path="reviews" element={<AdminReviews reviews={reviews} setReviews={setReviews} />} />
          </Route>
        </Route>

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
