import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, Plus, Minus, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Navbar({ 
  cartItems, 
  setCartItems, 
  isCartOpen, 
  setIsCartOpen, 
  wishlist,
  setShowWishlistOnly,
  showWishlistOnly
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF94B4', '#7DD3FC', '#86EFAC', '#FDBA74', '#D8B4FE']
    });
    alert('Thank you for your simulated purchase! 🎉');
    setCartItems([]);
    setIsCartOpen(false);
  };

  const handleWishlistToggle = () => {
    const nextVal = !showWishlistOnly;
    setShowWishlistOnly(nextVal);
    if (nextVal && location.pathname !== '/products') {
      navigate('/products');
    }
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate('/products', { state: { search: searchQuery } });
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full transition-all duration-300 glass border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/products" onClick={() => setShowWishlistOnly(false)} className="flex-shrink-0 flex items-center cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-babyPink to-babyPurple flex items-center justify-center text-white font-fredoka text-2xl font-bold shadow-md shadow-babyPink/30">
                👶
              </div>
              <span className="ml-3 font-fredoka text-2xl font-bold bg-gradient-to-r from-babyPink-dark via-babyPurple-dark to-babyBlue-dark bg-clip-text text-transparent">
                BabyNest
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8 font-medium text-sm">
              <Link to="/Categories" onClick={() => setShowWishlistOnly(false)} className={`transition-colors ${location.pathname.startsWith('/Categories') || location.pathname.startsWith('/categories') ? 'text-babyPink-dark font-bold' : 'text-slate-600 hover:text-babyPink-dark'}`}>Categories</Link>
              <Link to="/products" onClick={() => setShowWishlistOnly(false)} className={`transition-colors ${location.pathname === '/products' && !showWishlistOnly ? 'text-babyPink-dark font-bold' : 'text-slate-600 hover:text-babyPink-dark'}`}>Products</Link>
              <Link to="/Toys" onClick={() => setShowWishlistOnly(false)} className={`transition-colors ${location.pathname.toLowerCase() === '/toys' ? 'text-babyPink-dark font-bold' : 'text-slate-600 hover:text-babyPink-dark'}`}>Toys</Link>
              <Link to="/shop by age" onClick={() => setShowWishlistOnly(false)} className={`transition-colors ${location.pathname.toLowerCase().includes('age') ? 'text-babyPink-dark font-bold' : 'text-slate-600 hover:text-babyPink-dark'}`}>Shop By Age</Link>
              <Link to="/Featured products" onClick={() => setShowWishlistOnly(false)} className={`transition-colors ${location.pathname.toLowerCase().includes('featured') ? 'text-babyPink-dark font-bold' : 'text-slate-600 hover:text-babyPink-dark'}`}>Featured</Link>
              <Link to="/reviews" onClick={() => setShowWishlistOnly(false)} className={`transition-colors ${location.pathname === '/reviews' ? 'text-babyPink-dark font-bold' : 'text-slate-600 hover:text-babyPink-dark'}`}>Reviews</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search input */}
              <div className="hidden xl:flex items-center bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5 focus-within:ring-2 focus-within:ring-babyPink focus-within:bg-white transition-all w-60">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Press Enter to search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                  className="bg-transparent border-none outline-none text-xs w-full text-slate-600 placeholder-slate-400"
                />
              </div>

              {/* Wishlist Button */}
              <button 
                onClick={handleWishlistToggle} 
                className={`relative p-2.5 rounded-full transition-all duration-300 ${
                  showWishlistOnly 
                    ? 'bg-babyPink text-white shadow-md shadow-babyPink/30' 
                    : 'bg-white hover:bg-pink-50 text-slate-600 hover:text-babyPink border border-slate-100'
                }`}
                title="View Favorites"
              >
                <Heart className={`w-5 h-5 ${showWishlistOnly ? 'fill-current' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-babyPink-dark text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Cart Button */}
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="relative p-2.5 rounded-full bg-white hover:bg-blue-50 text-slate-600 hover:text-babyBlue border border-slate-100 transition-colors"
                title="Open Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-babyBlue-dark text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="lg:hidden p-2.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-2 flex flex-col">
            <Link 
              to="/Categories" 
              onClick={() => { setIsMobileMenuOpen(false); setShowWishlistOnly(false); }} 
              className="block px-3 py-2 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-babyPink-dark"
            >
              Categories
            </Link>
            <Link 
              to="/products" 
              onClick={() => { setIsMobileMenuOpen(false); setShowWishlistOnly(false); }} 
              className="block px-3 py-2 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-babyPink-dark"
            >
              Products
            </Link>
            <Link 
              to="/Toys" 
              onClick={() => { setIsMobileMenuOpen(false); setShowWishlistOnly(false); }} 
              className="block px-3 py-2 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-babyPink-dark"
            >
              Toys
            </Link>
            <Link 
              to="/shop by age" 
              onClick={() => { setIsMobileMenuOpen(false); setShowWishlistOnly(false); }} 
              className="block px-3 py-2 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-babyPink-dark"
            >
              Shop By Age
            </Link>
            <Link 
              to="/Featured products" 
              onClick={() => { setIsMobileMenuOpen(false); setShowWishlistOnly(false); }} 
              className="block px-3 py-2 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-babyPink-dark"
            >
              Featured Products
            </Link>
            <Link 
              to="/reviews" 
              onClick={() => { setIsMobileMenuOpen(false); setShowWishlistOnly(false); }} 
              className="block px-3 py-2 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-babyPink-dark"
            >
              Reviews
            </Link>
            {/* Search for mobile */}
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-full px-3 py-2 w-full mt-4">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full text-slate-600 placeholder-slate-400"
              />
            </div>
          </div>
        )}
      </header>

      {/* Cart Slider / Drawer overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md transform transition-all duration-500 ease-in-out bg-white shadow-2xl flex flex-col">
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-pink-50 to-blue-50">
                <h2 className="text-xl font-bold font-fredoka flex items-center text-slate-800">
                  <ShoppingBag className="w-5 h-5 text-babyPink-dark mr-2" /> Shopping Cart
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)} 
                  className="p-1 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <span className="text-5xl mb-4">🧸</span>
                    <h3 className="text-lg font-bold text-slate-700 font-fredoka">Your cart is empty</h3>
                    <p className="text-sm text-slate-400 mt-1 max-w-[240px]">Fill it with lovely essentials for your little one!</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 px-5 py-2.5 bg-gradient-to-r from-babyPink to-babyPurple hover:from-babyPink-dark hover:to-babyPurple-dark text-white rounded-full font-bold shadow-md shadow-babyPink/20 transition-all text-sm"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-center border-b border-slate-100 pb-4">
                      {/* Product image */}
                      <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-2 mr-4 flex-shrink-0 relative overflow-hidden">
                        <span className="text-3xl relative z-10">{item.emoji || '🍼'}</span>
                        <div className={`absolute inset-0 opacity-10 ${item.bgColor || 'bg-babyPink'}`}></div>
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-800 font-fredoka truncate">{item.name}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Price: ${item.price.toFixed(2)}</p>
                        
                        {/* Quantity controls */}
                        <div className="flex items-center mt-2.5">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="mx-3 text-sm font-bold text-slate-700">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Total & Trash */}
                      <div className="text-right ml-4">
                        <span className="text-sm font-bold text-slate-800">${(item.price * item.quantity).toFixed(2)}</span>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="block mt-2.5 ml-auto text-slate-400 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout / Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-slate-100 p-6 bg-slate-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-500 font-medium">Subtotal</span>
                    <span className="text-2xl font-bold font-fredoka text-slate-800">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-6">Shipping and taxes will be calculated at checkout.</p>
                  <button 
                    onClick={handleCheckout}
                    className="w-full py-4 bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue text-white font-bold rounded-full shadow-lg shadow-babyPink/30 hover:shadow-xl hover:shadow-babyPink/40 transition-all text-center tracking-wider font-fredoka uppercase text-sm"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
