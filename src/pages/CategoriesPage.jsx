import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/products';
import { Heart, Star, ShoppingCart, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const categoriesListData = [
  { 
    id: 'clothing', 
    name: 'Soft Clothing', 
    emoji: '👕', 
    bgColor: 'bg-pink-50 text-babyPink-dark border-pink-100',
    hoverBg: 'hover:bg-pink-100',
    description: '100% organic cotton, breathable rompers, swaddles, and booties, gentle on sensitive baby skin.',
    itemsCount: 0 
  },
  { 
    id: 'toys', 
    name: 'Organic Toys', 
    emoji: '🧸', 
    bgColor: 'bg-yellow-50 text-babyYellow-dark border-yellow-100',
    hoverBg: 'hover:bg-yellow-100',
    description: 'Non-toxic, chemical-free wooden alphabet blocks, shape sorters, and cotton hand-knitted plush toys.',
    itemsCount: 0 
  },
  { 
    id: 'feeding', 
    name: 'Feeding Sets', 
    emoji: '🍼', 
    bgColor: 'bg-emerald-50 text-babyMint-dark border-emerald-100',
    hoverBg: 'hover:bg-emerald-100',
    description: 'Food-grade silicone plates with suction bases, ergonomic bibs, and BPA-free training pacifiers.',
    itemsCount: 0 
  },
  { 
    id: 'diapering', 
    name: 'Diapering & Care', 
    emoji: '🧼', 
    bgColor: 'bg-sky-50 text-babyBlue-dark border-sky-100',
    hoverBg: 'hover:bg-sky-100',
    description: 'Biodegradable bamboo eco-wipes, gentle washing items, and changing mats to keep baby fresh.',
    itemsCount: 0 
  },
  { 
    id: 'nursery', 
    name: 'Nursery & Sleep', 
    emoji: '🛏️', 
    bgColor: 'bg-purple-50 text-babyPurple-dark border-purple-100',
    hoverBg: 'hover:bg-purple-100',
    description: 'Luxurious fitted crib sheets, sleep sound machines, and cotton storage baskets for peaceful nights.',
    itemsCount: 0 
  },
  { 
    id: 'gear', 
    name: 'Travel & Gear', 
    emoji: '🛒', 
    bgColor: 'bg-orange-50 text-babyPeach-dark border-orange-100',
    hoverBg: 'hover:bg-orange-100',
    description: 'Lightweight travel strollers, multi-position baby carriers, and diaper bags for outdoor comfort.',
    itemsCount: 0 
  }
];

// Calculate counts dynamically
categoriesListData.forEach(cat => {
  cat.itemsCount = mockProducts.filter(p => p.category === cat.id).length;
});

export default function CategoriesPage({ cartItems, setCartItems, wishlist, setWishlist }) {
  const [selectedCategory, setSelectedCategory] = useState('clothing');
  const navigate = useNavigate();

  const filteredProducts = mockProducts.filter(p => p.category === selectedCategory);

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
    <div className="py-12 bg-gradient-to-b from-pink-50/10 via-white to-sky-50/10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-babyPurple-dark bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100 font-fredoka">
            Explore Collections
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-fredoka text-slate-800 mt-4 leading-tight">
            Shop by Category
          </h1>
          <p className="text-slate-500 mt-3 text-base sm:text-lg leading-relaxed">
            Organized beautifully into specialized collections. Select a category below to discover premium products carefully curated for safety, comfort, and sensory growth.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categoriesListData.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group flex flex-col p-6 rounded-[32px] border-2 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  isActive 
                    ? 'border-babyPink bg-white shadow-xl shadow-pink-100 scale-105' 
                    : 'border-slate-100 bg-white hover:border-pink-200 hover:scale-[1.02] shadow-sm'
                }`}
              >
                {/* Decorative blob inside */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-all group-hover:scale-110 ${category.bgColor}`}></div>

                <div className="flex items-center gap-4 mb-4">
                  {/* Emoji Avatar */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 group-hover:rotate-6 ${category.bgColor}`}>
                    {category.emoji}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-fredoka text-slate-850 group-hover:text-babyPink-dark transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-xs font-bold text-slate-400">
                      {category.itemsCount} Premium Items
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-500 mb-6 leading-relaxed flex-1">
                  {category.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className={`text-xs font-bold font-fredoka flex items-center gap-1 ${
                    isActive ? 'text-babyPink-dark' : 'text-slate-400 group-hover:text-babyPink-dark'
                  }`}>
                    {isActive ? 'Currently viewing' : 'Explore collection'} 
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Category Products Title */}
        <div className="border-t border-slate-100 pt-16 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-fredoka text-slate-800 flex items-center gap-3">
              <span>{categoriesListData.find(c => c.id === selectedCategory)?.emoji}</span>
              <span>Curated {categoriesListData.find(c => c.id === selectedCategory)?.name}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Showing all organic certified products matching this custom shelf.
            </p>
          </div>
          <button 
            onClick={() => navigate('/products', { state: { category: selectedCategory } })}
            className="px-5 py-2.5 bg-gradient-to-r from-babyPink to-babyPurple hover:from-babyPink-dark hover:to-babyPurple-dark text-white rounded-full font-bold shadow-md shadow-pink-100 transition-all font-fredoka text-xs"
          >
            Open in Full Store View
          </button>
        </div>

        {/* Selected Category Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-[32px] p-12 text-center border border-slate-100 shadow-sm max-w-md mx-auto">
            <span className="text-5xl">📦</span>
            <h3 className="text-lg font-bold font-fredoka text-slate-700 mt-4">No items available</h3>
            <p className="text-xs text-slate-400 mt-1">We are updating this shelf. Please check back shortly!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const isInWishlist = wishlist.includes(product.id);
              return (
                <div 
                  key={product.id}
                  onClick={() => navigate('/products', { state: { openModalId: product.id } })}
                  className="group bg-white rounded-[32px] border border-slate-100 p-5 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative flex flex-col justify-between cursor-pointer"
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
                      <ShoppingCart className="w-4 h-4" />
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
