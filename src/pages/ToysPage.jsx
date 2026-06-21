import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/products';
import { Heart, Star, ShoppingCart, ShieldAlert, BadgeCheck, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ToysPage({ cartItems, setCartItems, wishlist, setWishlist }) {
  const navigate = useNavigate();

  // Filter for toys category only
  const toyProducts = mockProducts.filter(p => p.category === 'toys');

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
    <div className="py-12 bg-gradient-to-b from-yellow-50/15 via-white to-pink-50/15 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-babyYellow-dark bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100 font-fredoka">
            Sensory Playroom
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-fredoka text-slate-800 mt-4 leading-tight">
            Organic & Wooden Toys
          </h1>
          <p className="text-slate-500 mt-3 text-base">
            No chemicals, no batteries, and no plastics. Just pure sustainable beechwood, organic cotton fibers, and water-based dye. Nurturing imagination naturally.
          </p>
        </div>

        {/* Safety Badge row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          {[
            { title: '100% Non-Toxic', desc: 'Water-based organic dyes with zero chemical fumes, completely chew-safe.', icon: '🎨', color: 'bg-pink-50 border-pink-100 text-pink-600' },
            { title: 'ASTM Certified', desc: 'Thoroughly tested for mechanical and physical toy safety guidelines.', icon: '🛡️', color: 'bg-blue-50 border-blue-100 text-blue-600' },
            { title: 'Sustainable Wood', desc: 'Sourced from FSC-certified sustainable forests to protect baby\'s planet.', icon: '🌲', color: 'bg-emerald-50 border-emerald-100 text-emerald-600' }
          ].map((badge, idx) => (
            <div key={idx} className={`p-5 rounded-[28px] border text-left flex gap-4 items-start bg-white hover:scale-105 transition-transform duration-300`}>
              <span className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${badge.color}`}>{badge.icon}</span>
              <div>
                <h4 className="font-bold text-sm text-slate-800 font-fredoka">{badge.title}</h4>
                <p className="text-xs text-slate-450 mt-1 leading-relaxed">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toys Grid */}
        <div className="border-b border-slate-100 pb-4 mb-10 text-left">
          <h3 className="text-xl font-bold font-fredoka text-slate-850">
            Organic Toy Collection ({toyProducts.length})
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Handcrafted sensory stackers, building blocks, and cuddly hand-knits.
          </p>
        </div>

        {toyProducts.length === 0 ? (
          <div className="bg-white rounded-[32px] p-12 text-center border border-slate-100 shadow-sm max-w-md mx-auto">
            <span className="text-5xl">🧸</span>
            <h3 className="text-lg font-bold font-fredoka text-slate-700 mt-4">Toybox is empty!</h3>
            <p className="text-xs text-slate-400 mt-1">We are crafting new toys. Check back shortly!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {toyProducts.map((product) => {
              const isInWishlist = wishlist.includes(product.id);
              return (
                <div 
                  key={product.id}
                  onClick={() => navigate('/products', { state: { openModalId: product.id } })}
                  className="group bg-white rounded-[32px] border border-slate-100 p-5 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative flex flex-col justify-between cursor-pointer"
                >
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-4 left-4 z-10 px-2.5 py-1 text-[10px] font-bold text-white rounded-full bg-babyYellow-dark shadow-sm font-fredoka uppercase tracking-wider">
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
                    {/* Emoji Image placeholder */}
                    <div className="aspect-square bg-slate-50 border border-slate-100/50 rounded-2xl flex items-center justify-center relative overflow-hidden mb-5">
                      <span className="text-6xl relative z-10 group-hover:scale-110 transition-transform duration-300">{product.emoji}</span>
                      <div className={`absolute inset-0 opacity-10 ${product.bgColor || 'bg-babyPink'}`}></div>
                    </div>

                    {/* Meta details */}
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex text-yellow-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                      <span className="text-[10px] text-slate-400 font-medium">({product.reviews} reviews)</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-800 font-fredoka truncate mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Action row */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
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
                      className="p-2.5 rounded-full bg-slate-100 group-hover:bg-babyPink text-slate-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-md group-hover:shadow-pink-100"
                    >
                      <ShoppingCart className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Play Advice Column */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto text-left">
          <div className="w-14 h-14 rounded-full bg-yellow-50 text-babyYellow-dark border border-yellow-100 flex items-center justify-center shrink-0">
            <Lightbulb className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-base font-fredoka text-slate-800">Pediatrician Play Advice</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Toddlers learn through tactile sensations and basic spatial patterns. Simple objects like alphabet blocks and shape sorters foster independent problem-solving skills and spatial coordination far better than electronic toys. Always choose toys that encourage active doing rather than passive watching.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
