import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { mockProducts } from '../data/products';

export default function WishlistPage({ wishlist, setWishlist, cartItems, setCartItems }) {
  const navigate = useNavigate();

  // Find products that are in the wishlist
  const wishlistItems = mockProducts.filter(product => wishlist.includes(product.id));

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item !== id));
  };

  const moveToCart = (product) => {
    // Add to cart
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Remove from wishlist
    removeFromWishlist(product.id);
  };

  return (
    <div className="py-12 bg-gradient-to-b from-pink-50/15 via-white to-sky-50/15 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-babyPink-dark bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100 font-fredoka">
            My Favorites
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-fredoka text-slate-800 mt-4 leading-tight">
            Your Baby Wishlist
          </h1>
          <p className="text-slate-500 mt-3 text-base">
            Keep track of all the organic essentials, soft booties, and wooden toys you plan to grab for your baby.
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          /* Empty State Page */
          <div className="bg-white rounded-[40px] border border-slate-100 p-16 text-center shadow-sm max-w-md mx-auto animate-float">
            <div className="w-24 h-24 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-5xl mx-auto mb-6">
              💝
            </div>
            <h3 className="text-xl font-bold font-fredoka text-slate-700">Wishlist is empty</h3>
            <p className="text-xs text-slate-400 mt-2 max-w-[280px] mx-auto leading-relaxed">
              Looks like you haven't saved any baby essentials yet. Browse our store and tap the heart icon to save products!
            </p>
            <Link 
              to="/products"
              className="mt-8 px-6 py-3.5 bg-gradient-to-r from-babyPink to-babyPurple text-white font-bold rounded-full text-xs font-fredoka shadow-md shadow-pink-100 hover:shadow-lg hover:scale-105 transition-all inline-flex items-center gap-1.5"
            >
              Start Exploring <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistItems.map((product) => (
              <div 
                key={product.id}
                onClick={() => navigate('/products', { state: { openModalId: product.id } })}
                className="group bg-white rounded-[32px] border border-slate-100 p-5 shadow-xs hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative flex flex-col justify-between cursor-pointer"
              >
                {/* Remove button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(product.id);
                  }}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full border border-slate-150 bg-white/90 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all shadow-xs"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div>
                  {/* Product Image */}
                  <div className="aspect-square bg-slate-50 border border-slate-100/50 rounded-2xl flex items-center justify-center relative overflow-hidden mb-5">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        onError={(e) => { e.target.onError = null; e.target.src = "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=600&auto=format&fit=crop&q=80"; }}
                        className="w-full h-full object-cover relative z-10 transform group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-6xl relative z-10">{product.emoji}</span>
                    )}
                    <div className={`absolute inset-0 opacity-10 ${product.bgColor || 'bg-babyPink'}`}></div>
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 font-fredoka uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 font-fredoka truncate mt-1 text-left">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 mb-4 leading-relaxed text-left">
                    {product.description}
                  </p>
                </div>

                {/* Price and Action Row */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                  <span className="text-base font-bold font-fredoka text-slate-800">
                    ${product.price.toFixed(2)}
                  </span>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      moveToCart(product);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-babyPink to-babyPurple text-white hover:from-babyPink-dark hover:to-babyPurple-dark rounded-full text-xs font-bold font-fredoka shadow-md shadow-pink-100 hover:scale-105 transition-all flex items-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Move to Cart
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
