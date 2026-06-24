import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Heart, ShoppingCart, Sparkles, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { mockProducts } from '../data/products';

export default function HomePage({ cartItems, setCartItems, wishlist, setWishlist }) {
  const navigate = useNavigate();

  // Standard 7 categories
  const categories = [
    { id: 'clothing', name: 'Baby Clothing', emoji: '👕', desc: 'Organic rompers & booties', color: 'from-pink-100 to-rose-100 text-pink-650' },
    { id: 'toys', name: 'Baby Toys', emoji: '🧸', desc: 'Wooden sensory blocks', color: 'from-yellow-100 to-amber-100 text-amber-650' },
    { id: 'care', name: 'Baby Care', emoji: '🧼', desc: 'Eco wipes & grooming kits', color: 'from-sky-105 to-blue-100 text-blue-650' },
    { id: 'feeding', name: 'Feeding', emoji: '🍼', desc: 'Silicone suction plates', color: 'from-emerald-100 to-teal-100 text-teal-655' },
    { id: 'diapers', name: 'Diapers', emoji: '🩲', desc: 'Plant-based eco diapers', color: 'from-sky-50 to-blue-50 text-sky-655' },
    { id: 'furniture', name: 'Baby Furniture', emoji: '🛏️', desc: 'Soft sheets & pine cribs', color: 'from-purple-100 to-indigo-100 text-purple-655' },
    { id: 'accessories', name: 'Baby Accessories', emoji: '🎒', desc: 'Travel strollers & carriers', color: 'from-orange-100 to-amber-100 text-orange-655' }
  ];

  // Best sellers (e.g. top rated products)
  const bestSellers = mockProducts.slice(0, 4);

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const addToCart = (product, e) => {
    e.stopPropagation();
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
    <div className="bg-amber-50/10 min-h-screen selection:bg-pink-100 selection:text-pink-650">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-32 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
        {/* Visual elements */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-pink-200/40 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-float-delayed"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero text */}
            <div className="lg:col-span-7 text-left">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-pink-100 shadow-sm text-xs font-bold text-babyPink-dark tracking-wider uppercase font-fredoka">
                <Sparkles className="w-4.5 h-4.5 text-babyPink" /> Welcome to BabyNest Shop
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold font-fredoka text-slate-800 mt-6 leading-[1.15]">
                Nurture Your Little One <br />
                <span className="bg-gradient-to-r from-babyPink-dark via-babyPurple-dark to-babyBlue-dark bg-clip-text text-transparent">
                  With Pure Organic Love
                </span>
              </h1>
              <p className="text-slate-500 mt-6 text-sm sm:text-base leading-relaxed max-w-xl">
                Discover GOTS-certified organic clothing, chew-safe wooden toys, pediatrician-approved baby care, and ergonomic nursery accessories. Created with zero toxins, pure safety, and soft pastel aesthetics.
              </p>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <Link 
                  to="/products"
                  className="px-8 py-4 bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue text-white font-bold rounded-full shadow-lg shadow-pink-150 hover:shadow-xl hover:scale-105 transition-all text-sm font-fredoka flex items-center gap-2"
                >
                  Shop Essentials <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/categories"
                  className="px-8 py-4 bg-white border border-slate-200 hover:border-pink-200 text-slate-700 hover:text-babyPink-dark font-bold rounded-full shadow-sm hover:shadow-md transition-all text-sm font-fredoka"
                >
                  Browse Collections
                </Link>
              </div>

              {/* Value flags */}
              <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-pink-100/50">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-babyPink-dark shrink-0">🌱</span>
                  <span className="text-[11px] font-bold text-slate-600 font-fredoka">100% GOTS Organic</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-babyBlue-dark shrink-0">🛡️</span>
                  <span className="text-[11px] font-bold text-slate-600 font-fredoka">Chew-Safe Toxins Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-babyMint-dark shrink-0">🧸</span>
                  <span className="text-[11px] font-bold text-slate-600 font-fredoka">Pediatrician Approved</span>
                </div>
              </div>
            </div>

            {/* Hero image container */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-80 sm:w-96 aspect-square rounded-[48px] bg-gradient-to-tr from-pink-100 via-purple-100 to-blue-100 shadow-xl overflow-hidden p-6 border-4 border-white flex items-center justify-center animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=800&auto=format&fit=crop&q=80" 
                  alt="Happy Organic Baby" 
                  className="w-full h-full object-cover rounded-[36px]"
                />
                {/* Floating tags */}
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm shadow-md rounded-2xl px-3.5 py-2 flex items-center gap-2 border border-pink-50">
                  <span className="text-xl">👕</span>
                  <div>
                    <p className="text-[10px] font-bold font-fredoka text-slate-800">Soft Rompers</p>
                    <p className="text-[9px] text-slate-400 font-bold">100% Cotton</p>
                  </div>
                </div>
                <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm shadow-md rounded-2xl px-3.5 py-2 flex items-center gap-2 border border-blue-50">
                  <span className="text-xl">🧸</span>
                  <div>
                    <p className="text-[10px] font-bold font-fredoka text-slate-800">Wooden Toys</p>
                    <p className="text-[9px] text-slate-400 font-bold">Chew Safe</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Promo banner strip */}
      <div className="bg-slate-900 text-white py-4 overflow-hidden relative border-y border-slate-850">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-center text-xs font-semibold tracking-wider font-fredoka uppercase">
          <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-babyPink" /> Free Shipping on Orders Over $50</span>
          <span className="hidden md:inline text-slate-700">|</span>
          <span className="flex items-center gap-1.5"><RotateCcw className="w-4 h-4 text-babyBlue" /> 30-Day Hassle-Free Return Guarantee</span>
          <span className="hidden md:inline text-slate-700">|</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-babyMint" /> 100% Hypoallergenic Safety Checked</span>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-babyPurple-dark bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100 font-fredoka">
            Explore Collections
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-fredoka text-slate-800 mt-4">
            Shop by Baby Category
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Carefully curated sets to support every stage of early sensory growth, comfortable sleep, hygiene, and safe mobility.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate('/products', { state: { category: cat.id } })}
              className="group bg-white rounded-[32px] border border-slate-100 p-5 shadow-xs hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${cat.color.split(' ')[0]} flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {cat.emoji}
              </div>
              <h3 className="font-fredoka text-xs font-bold text-slate-800 mt-4 group-hover:text-babyPink-dark transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-[9px] text-slate-400 font-medium mt-1 leading-snug line-clamp-2">
                {cat.desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Summer clearance promotional block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue p-10 md:p-14 shadow-lg shadow-pink-100 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="absolute top-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-xl -z-0"></div>
          
          <div className="relative z-10 text-white text-left max-w-2xl">
            <span className="bg-white/20 border border-white/30 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 inline-block font-fredoka">
              🌿 Organic Clearance Spotlight
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-fredoka text-white leading-tight">
              Flat 20% Off GOTS Clothing
            </h2>
            <p className="text-white/95 text-xs sm:text-sm mt-3 leading-relaxed">
              Equip your baby's nursery wardrobe with our certified pure organic cotton swaddles, rompers, and booties. Keeps baby cool in summer and cozy in winter. Enter code <span className="bg-white/20 px-2 py-0.5 rounded font-mono font-bold font-fredoka text-xs">NESTGOTS20</span> at checkout.
            </p>
            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => navigate('/products', { state: { category: 'clothing' } })}
                className="px-6 py-3 bg-white text-babyPink-dark hover:text-white hover:bg-babyPink font-bold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all text-xs font-fredoka"
              >
                Claim Discount
              </button>
            </div>
          </div>

          <div className="w-full lg:w-96 aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-lg relative shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1544171255-409db4afea71?w=600&auto=format&fit=crop&q=80" 
              alt="Organic Swaddles" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-pink-50/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div className="text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-babyPink-dark bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100 font-fredoka">
                Trending Choice
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-fredoka text-slate-800 mt-4">
                Parent Favorites & Best Sellers
              </h2>
              <p className="text-slate-500 mt-1 text-sm">
                Our most loved, highest rated baby essentials this season.
              </p>
            </div>
            
            <Link 
              to="/products"
              className="text-xs font-bold font-fredoka text-babyPink-dark hover:text-babyPink flex items-center gap-1 shrink-0"
            >
              See All Catalog Products <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Product list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => {
              const isInWishlist = wishlist.includes(product.id);
              return (
                <div 
                  key={product.id}
                  onClick={() => navigate('/products', { state: { openModalId: product.id } })}
                  className="group bg-white rounded-[32px] border border-slate-100 p-5 shadow-xs hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative flex flex-col justify-between cursor-pointer"
                >
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-4 left-4 z-10 px-2.5 py-1 text-[10px] font-bold text-white rounded-full bg-babyPink shadow-sm font-fredoka uppercase tracking-wider">
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
                      <span className="text-[10px] text-slate-400 font-medium">({product.reviews} reviews)</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-800 font-fredoka truncate mb-1 text-left">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed text-left">
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
                      className="p-2.5 rounded-full bg-slate-100 group-hover:bg-babyPink text-slate-655 group-hover:text-white transition-all shadow-sm group-hover:shadow-md group-hover:shadow-pink-100"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
