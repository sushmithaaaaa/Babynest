import React, { useState } from 'react';
import { Heart, Eye, ShoppingCart, Star, X, Check, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const mockProducts = [
  {
    id: 1,
    name: 'Organic Cotton Romper',
    price: 24.99,
    oldPrice: 29.99,
    rating: 4.8,
    reviews: 124,
    category: 'clothing',
    emoji: '👕',
    bgColor: 'bg-pink-100 text-pink-600',
    description: 'Hypoallergenic, breathable romper made from 100% GOTS certified organic cotton. Designed with flat seams and nickel-free snaps for easy diaper changes and ultimate baby comfort.',
    badge: 'Sale',
    colors: ['#FFB6C1', '#80DEEA', '#FFF3E0'],
    age: '0-12 Months'
  },
  {
    id: 2,
    name: 'Wooden Alphabet Blocks',
    price: 19.99,
    rating: 4.9,
    reviews: 86,
    category: 'toys',
    emoji: '🧸',
    bgColor: 'bg-yellow-100 text-yellow-600',
    description: 'Classic sensory blocks handcrafted from sustainable beechwood and colored with water-based non-toxic paint. Encourages early motor skills, counting, spelling, and creative stacking.',
    badge: 'New',
    colors: ['#FFE082', '#A5D6A7', '#CE93D8'],
    age: '12+ Months'
  },
  {
    id: 3,
    name: 'Silicone Suction Plate Set',
    price: 15.99,
    rating: 4.7,
    reviews: 142,
    category: 'feeding',
    emoji: '🍼',
    bgColor: 'bg-emerald-100 text-emerald-600',
    description: 'BPA-free food-grade silicone plate with strong suction base to prevent spills. Features rounded edges and includes a soft-tip ergonomic spoon designed for baby-led weaning.',
    badge: 'Hot',
    colors: ['#A5D6A7', '#80DEEA', '#FFB6C1'],
    age: '6+ Months'
  },
  {
    id: 4,
    name: 'Bamboo Eco Wipes (80pcs)',
    price: 8.49,
    oldPrice: 10.99,
    rating: 4.6,
    reviews: 215,
    category: 'diapering',
    emoji: '🧼',
    bgColor: 'bg-sky-100 text-sky-600',
    description: '100% biodegradable baby wipes made from organic bamboo fibers. Infused with pure water, chamomile, and aloe extract to soothe and protect ultra-sensitive skin.',
    badge: 'Sale',
    colors: ['#FFFFFF'],
    age: 'Newborns+'
  },
  {
    id: 5,
    name: 'Organic Cotton Crib Sheet',
    price: 29.99,
    rating: 4.8,
    reviews: 64,
    category: 'nursery',
    emoji: '🛏️',
    bgColor: 'bg-purple-100 text-purple-600',
    description: 'Luxuriously soft fitted crib sheets with 360-degree elastic hem. Fits all standard mattresses, offering breathable comfort to guarantee peaceful sleep for your baby.',
    badge: '',
    colors: ['#E1BEE7', '#B3E5FC', '#FFF9C4'],
    age: '0-24 Months'
  },
  {
    id: 6,
    name: 'Lightweight Travel Stroller',
    price: 189.99,
    oldPrice: 219.99,
    rating: 4.9,
    reviews: 48,
    category: 'gear',
    emoji: '🛒',
    bgColor: 'bg-orange-100 text-orange-600',
    description: 'Premium lightweight aluminum travel stroller with a true one-hand fold system. Extremely compact, includes multi-position reclining seat, and features a sun canopy with UPF 50+ protection.',
    badge: 'Hot',
    colors: ['#374151', '#9CA3AF', '#FFB6C1'],
    age: '6-36 Months'
  },
  {
    id: 7,
    name: 'Knitted Bunny Plush Toy',
    price: 14.99,
    rating: 4.8,
    reviews: 93,
    category: 'toys',
    emoji: '🐰',
    bgColor: 'bg-yellow-100 text-yellow-600',
    description: 'Cuddly hand-knitted rabbit toy made with soft organic cotton yarn. Features embroidered eyes for newborn safety and emits a soft rattle sound when shaken.',
    badge: 'New',
    colors: ['#FFF9C4', '#F8BBD0', '#E0F2F1'],
    age: 'Newborns+'
  },
  {
    id: 8,
    name: 'Silicone Bib Bundle (3 Pack)',
    price: 18.99,
    oldPrice: 24.99,
    rating: 4.7,
    reviews: 78,
    category: 'feeding',
    emoji: '🍽️',
    bgColor: 'bg-emerald-100 text-emerald-600',
    description: 'Set of three waterproof silicone bibs with deep front crumb catchers. Fully adjustable neck fasteners designed to fit comfortably from 4 months to 3 years old. Wipe-clean and dishwasher safe.',
    badge: 'Sale',
    colors: ['#80DEEA', '#FFB6C1', '#A5D6A7'],
    age: '4+ Months'
  }
];

export default function Products({ 
  cartItems, 
  setCartItems, 
  wishlist, 
  setWishlist,
  activeCategory,
  setActiveCategory,
  showWishlistOnly
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [justAddedId, setJustAddedId] = useState(null);

  // Filter products based on active category or wishlist toggle
  const filteredProducts = mockProducts.filter(product => {
    if (showWishlistOnly) {
      return wishlist.includes(product.id);
    }
    if (activeCategory === 'all') return true;
    if (activeCategory === 'sale') return product.badge === 'Sale' || product.oldPrice;
    return product.category === activeCategory;
  });

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const addToCart = (product, e) => {
    if (e) e.stopPropagation();
    
    // Confetti effect from the cursor
    if (e) {
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: ['#FF94B4', '#7DD3FC', '#86EFAC']
      });
    }

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1500);
  };

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`w-4 h-4 ${i <= full ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} 
        />
      );
    }
    return stars;
  };

  return (
    <section id="products" className="py-16 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-extrabold font-fredoka text-slate-800">
              {showWishlistOnly ? 'Your Favorites 💖' : 'Our Essential Products'}
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              {showWishlistOnly 
                ? 'Your curated wishlist of love. Click products to see detail or add them to cart.' 
                : 'Highest safety standards, GOTS organic certified items for healthy growth.'}
            </p>
          </div>

          {/* Inline filters */}
          {!showWishlistOnly && (
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0 bg-white p-1.5 rounded-full border border-slate-100 shadow-sm">
              {['all', 'clothing', 'toys', 'feeding', 'sale'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold font-fredoka transition-all capitalize ${
                    activeCategory === cat 
                      ? 'bg-babyPink text-white shadow-md shadow-pink-100' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {cat === 'all' ? 'Show All' : cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm max-w-md mx-auto">
            <span className="text-5xl">🥺</span>
            <h3 className="text-lg font-bold font-fredoka text-slate-700 mt-4">No products found</h3>
            <p className="text-sm text-slate-400 mt-1">
              {showWishlistOnly 
                ? 'No items favorited yet. Start exploring and click the heart icon!' 
                : 'Try clearing your filters to see all available baby products.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group relative bg-white rounded-3xl border border-slate-100 p-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Badges and wishlist icon */}
                  <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5">
                    {product.badge && (
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full text-white ${
                        product.badge === 'Sale' ? 'bg-rose-400' : 
                        product.badge === 'New' ? 'bg-amber-400' : 'bg-violet-400'
                      }`}>
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <button 
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className={`absolute top-6 right-6 z-10 p-2 rounded-full border bg-white/80 backdrop-blur-sm transition-all hover:scale-110 ${
                      wishlist.includes(product.id)
                        ? 'border-pink-200 text-rose-500'
                        : 'border-slate-100 text-slate-400 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                  </button>

                  {/* Image wrapper */}
                  <div className="relative w-full aspect-square rounded-2xl bg-slate-50 flex items-center justify-center p-6 overflow-hidden mb-5">
                    {/* Big central emoji */}
                    <span className="text-6xl z-10 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      {product.emoji}
                    </span>
                    {/* Subtle circle layer */}
                    <div className={`absolute w-32 h-32 rounded-full filter blur-xl opacity-30 -z-0 ${product.bgColor.split(' ')[0]}`}></div>
                    
                    {/* Visual Hover effect details overlay */}
                    <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-3 bg-white text-slate-800 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-1.5 text-xs font-bold font-fredoka">
                        <Eye className="w-4 h-4" /> Quick View
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <span className="text-[10px] font-bold font-fredoka text-slate-400 tracking-wider uppercase">
                    {product.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-800 mt-1 font-fredoka group-hover:text-babyPink-dark transition-colors truncate">
                    {product.name}
                  </h3>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mt-1.5">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="text-xs font-medium text-slate-400 ml-1">({product.reviews})</span>
                  </div>
                </div>

                {/* Price and Cart button */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-50">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold font-fredoka text-slate-800">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button 
                    onClick={(e) => addToCart(product, e)}
                    className={`p-2.5 rounded-full transition-all duration-300 ${
                      justAddedId === product.id
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200 scale-105'
                        : 'bg-gradient-to-r from-babyPink to-babyPurple text-white hover:from-babyPink-dark hover:to-babyPurple-dark shadow-md shadow-pink-100 hover:scale-105'
                    }`}
                    title="Add to Cart"
                  >
                    {justAddedId === product.id ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setSelectedProduct(null)}></div>
            
            {/* Content card */}
            <div className="relative bg-white rounded-[40px] shadow-2xl overflow-hidden max-w-2xl w-full border border-slate-100 flex flex-col md:flex-row transform transition-all">
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Visual */}
              <div className="md:w-1/2 bg-slate-50 flex items-center justify-center p-8 relative min-h-[300px]">
                <span className="text-8xl relative z-10">{selectedProduct.emoji}</span>
                <div className={`absolute w-48 h-48 rounded-full filter blur-2xl opacity-20 ${selectedProduct.bgColor.split(' ')[0]}`}></div>
                <div className="absolute bottom-6 left-6 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  ID: #{selectedProduct.id}
                </div>
              </div>

              {/* Product Info */}
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 bg-slate-100 text-[10px] font-bold rounded-full text-slate-500 uppercase font-fredoka">
                      {selectedProduct.category}
                    </span>
                    <span className="px-2.5 py-1 bg-pink-50 text-[10px] font-bold rounded-full text-babyPink-dark font-fredoka flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> {selectedProduct.age}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-fredoka text-slate-800 mt-4">
                    {selectedProduct.name}
                  </h3>

                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex">{renderStars(selectedProduct.rating)}</div>
                    <span className="text-xs font-medium text-slate-500">
                      {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Options Swatches */}
                  <div className="mt-6">
                    <h4 className="text-xs font-bold font-fredoka text-slate-600 mb-2">Available Pastel Colors</h4>
                    <div className="flex gap-2">
                      {selectedProduct.colors.map((color) => (
                        <div 
                          key={color} 
                          className="w-6 h-6 rounded-full border-2 border-white ring-2 ring-slate-100 cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price and Cart Addition */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold font-fredoka text-slate-800">${selectedProduct.price.toFixed(2)}</span>
                      {selectedProduct.oldPrice && (
                        <span className="text-sm text-slate-400 line-through">${selectedProduct.oldPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={(e) => {
                      addToCart(selectedProduct, e);
                      setSelectedProduct(null);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-babyPink to-babyPurple hover:from-babyPink-dark hover:to-babyPurple-dark text-white font-bold rounded-full shadow-lg shadow-pink-100 flex items-center gap-2 hover:scale-105 transition-all text-xs font-fredoka"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add To Cart
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
