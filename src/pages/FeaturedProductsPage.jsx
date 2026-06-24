import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Sparkles, Flame, Percent } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FeaturedProductsPage({ products, cartItems, setCartItems, wishlist, setWishlist }) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (n) => String(n).padStart(2, '0');

  // Filter for hot products and sale products from shared products state
  const featuredItems = products.filter(p => p.badge === 'Hot' || p.badge === 'Sale' || p.oldPrice);

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const addToCart = (product, e) => {
    e.stopPropagation();
    confetti({
      particleCount: 30,
      spread: 40,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
      colors: ['#FF94B4', '#7DD3FC', '#86EFAC']
    });
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="py-12 bg-gradient-to-b from-orange-50/10 via-white to-pink-50/10 min-h-screen selection:bg-pink-100 selection:text-pink-650">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-babyPeach-dark bg-orange-50 px-3 py-1.5 rounded-full border border-orange-105 font-fredoka">
            Special Spotlight
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-fredoka text-slate-800 mt-4 leading-tight">
            Featured Products & Deals
          </h1>
          <p className="text-slate-500 mt-3 text-base">
            Discover our highest rated favorites, trending baby gears, and limited time clearance sales. Grab premium organic quality at special values.
          </p>
        </div>

        {/* Promotional Spotlight Board */}
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue p-8 md:p-10 shadow-xl shadow-pink-100 mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Glass background shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          
          <div className="relative z-10 text-white text-left max-w-lg">
            <span className="inline-flex items-center gap-1 bg-white/20 border border-white/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 font-fredoka">
              <Percent className="w-3.5 h-3.5" /> Bundle Discount
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-fredoka text-white leading-tight">
              Summer Bonanza Baby Bundle
            </h2>
            <p className="text-white/95 text-xs mt-2 leading-relaxed">
              Unlock a special 20% discount on orders of three or more featured organic toys or clothing pieces. Apply code <span className="bg-white/25 px-2 py-0.5 rounded font-mono font-bold">NESTDEAL20</span>.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="text-xs text-white/90">Promo ends in:</span>
              <div className="flex gap-1.5 font-fredoka text-xs bg-slate-900/20 backdrop-blur-md px-3 py-1 rounded-full font-bold">
                <span>{formatNum(timeLeft.hours)}h</span>:
                <span>{formatNum(timeLeft.minutes)}m</span>:
                <span>{formatNum(timeLeft.seconds)}s</span>
              </div>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-md border border-white/20 p-6 rounded-3xl w-full md:w-auto shrink-0 md:max-w-xs text-white text-left">
            <h4 className="text-xs font-bold font-fredoka text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" /> Certified Safe Quality:
            </h4>
            <p className="text-[10px] text-white/90 leading-relaxed">
              Every featured baby essential has been thoroughly tested for safety, durability, and hypoallergenic skin ratings. Rest easy knowing you're providing the absolute best for your little one.
            </p>
          </div>
        </div>

        {/* Featured Items Grid Title */}
        <div className="border-b border-slate-100 pb-4 mb-10 text-left">
          <h3 className="text-xl font-bold font-fredoka text-slate-800 flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-500 fill-current" /> Trending Now
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Top rated items that are selling fast this week.
          </p>
        </div>

        {featuredItems.length === 0 ? (
          <div className="bg-white rounded-[32px] p-12 text-center border border-slate-100 shadow-sm max-w-md mx-auto">
            <span className="text-5xl">🧸</span>
            <h3 className="text-lg font-bold font-fredoka text-slate-700 mt-4">Check back soon!</h3>
            <p className="text-xs text-slate-400 mt-1">We are updating our weekly featured products shelf.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((product) => {
              const isInWishlist = wishlist.includes(product.id);
              return (
                <div 
                  key={product.id}
                  onClick={() => navigate('/products', { state: { openModalId: product.id } })}
                  className="group bg-white rounded-[32px] border border-slate-100 p-5 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative flex flex-col justify-between cursor-pointer"
                >
                  {/* Badge */}
                  {product.badge && (
                    <span className={`absolute top-4 left-4 z-10 px-2.5 py-1 text-[10px] font-bold text-white rounded-full shadow-sm font-fredoka uppercase tracking-wider bg-rose-500`}>
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button 
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className={`absolute top-4 right-4 z-10 p-2 rounded-full border transition-all ${
                      isInWishlist 
                        ? 'bg-rose-50 text-rose-500 border-rose-100 fill-current' 
                        : 'bg-white text-slate-400 hover:text-rose-500 border-slate-100 hover:bg-rose-50'
                    }`}
                  >
                    <Heart className="w-4.5 h-4.5" />
                  </button>

                  <div>
                    {/* Product Image */}
                    <div className="aspect-square bg-slate-50 border border-slate-100/50 rounded-2xl flex items-center justify-center relative overflow-hidden mb-5">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          onError={(e) => { e.target.onError = null; e.target.src = "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=600&auto=format&fit=crop&q=80"; }}
                          className="w-full h-full object-cover relative z-10 transform group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-6xl relative z-10 group-hover:scale-110 transition-transform duration-300">{product.emoji}</span>
                      )}
                      <div className={`absolute inset-0 opacity-10 ${product.bgColor || 'bg-babyPink'}`}></div>
                    </div>

                    {/* Meta details */}
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex text-yellow-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                      <span className="text-[10px] text-slate-405 font-medium">({product.reviews} reviews)</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-805 font-fredoka truncate mb-1 text-left">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed text-left">
                      {product.description}
                    </p>
                  </div>

                  {/* Action row */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-55">
                    <div>
                      {product.oldPrice && (
                        <span className="text-xs text-slate-400 line-through mr-1.5 font-medium">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-base font-bold text-slate-800 font-fredoka">${product.price.toFixed(2)}</span>
                    </div>

                    <button 
                      onClick={(e) => addToCart(product, e)}
                      className="p-2.5 rounded-full bg-slate-100 group-hover:bg-babyPink text-slate-655 group-hover:text-white transition-all shadow-sm group-hover:shadow-md group-hover:shadow-pink-100"
                    >
                      <ShoppingCart className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
