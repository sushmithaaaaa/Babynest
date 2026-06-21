import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { mockProducts } from '../data/products';
import { Heart, Eye, ShoppingCart, Star, X, Check, ShieldCheck, Search, SlidersHorizontal } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProductsPage({ cartItems, setCartItems, wishlist, setWishlist }) {
  const location = useLocation();
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(250); // Max is stroller at 189.99
  const [sortBy, setSortBy] = useState('popular');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [justAddedId, setJustAddedId] = useState(null);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Read location state redirects (e.g. from Home page category clicks)
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
    if (location.state?.openModalId) {
      const prod = mockProducts.find(p => p.id === location.state.openModalId);
      if (prod) {
        setSelectedProduct(prod);
      }
    }
    // Clear location state to prevent sticky behaviors on reload
    window.history.replaceState({}, document.title);
  }, [location]);

  // Filtering Logic
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviews - a.reviews;
    return b.id - a.id; // default popular/new
  });

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const addToCart = (product, e) => {
    if (e) e.stopPropagation();
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
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} 
      />
    ));
  };

  return (
    <div className="py-12 bg-gradient-to-b from-sky-50/10 via-white to-pink-50/10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-babyPink-dark bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100 font-fredoka">
            Premium Catalogue
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-fredoka text-slate-800 mt-4 leading-tight">
            Our Baby Essentials
          </h1>
          <p className="text-slate-500 mt-3 text-base">
            BPA-free materials, certified organic cotton, and completely non-toxic paints. Designed to protect your baby and provide developmental enrichment.
          </p>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm shrink-0 sticky top-24">
            <h3 className="font-bold text-lg font-fredoka text-slate-855 mb-6 flex items-center gap-2 border-b border-slate-50 pb-3">
              <SlidersHorizontal className="w-5 h-5 text-babyPink-dark" /> Filters
            </h3>

            {/* Search Input */}
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 font-fredoka">Search Products</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Romper, Blocks..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-full pl-9 pr-4 py-2.5 text-xs text-slate-650 focus:outline-none focus:ring-2 focus:ring-babyPink focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3 font-fredoka">Category</label>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'All Products' },
                  { id: 'clothing', label: 'Clothing' },
                  { id: 'toys', label: 'Toys' },
                  { id: 'feeding', label: 'Feeding' },
                  { id: 'diapering', label: 'Diapering' },
                  { id: 'nursery', label: 'Nursery' },
                  { id: 'gear', label: 'Gear & Travel' },
                ].map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3.5 py-2 rounded-full text-xs font-semibold font-fredoka transition-all ${
                      selectedCategory === cat.id 
                        ? 'bg-babyPink text-white font-bold' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-fredoka">
                <span>Max Price</span>
                <span className="text-babyPink-dark">${priceRange}</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="250" 
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-babyPink"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                <span>$5</span>
                <span>$250</span>
              </div>
            </div>

            {/* Clear Filters Button */}
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPriceRange(250);
                setSortBy('popular');
              }}
              className="w-full py-2.5 border border-slate-200 hover:border-babyPink text-slate-500 hover:text-babyPink-dark transition-all rounded-full text-xs font-bold font-fredoka"
            >
              Clear All Filters
            </button>
          </aside>

          {/* Main Product Panel */}
          <div className="flex-1 w-full">
            {/* Top Toolbar */}
            <div className="bg-white rounded-3xl border border-slate-100 p-4 mb-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-500 font-medium">
                Showing <span className="font-bold text-slate-800">{sortedProducts.length}</span> organic items
              </p>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Mobile Filter Button */}
                <button 
                  onClick={() => setShowFiltersMobile(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full text-xs font-bold text-slate-655 hover:bg-slate-50 transition-all font-fredoka"
                >
                  <SlidersHorizontal className="w-4 h-4 text-babyPink-dark" /> Filters
                </button>

                {/* Sorting Select */}
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-100 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 focus:outline-none focus:ring-2 focus:ring-babyPink transition-all flex-1 sm:flex-initial"
                >
                  <option value="popular">Popular & Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating: High to Low</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>
            </div>

            {/* Mobile Filter Drawer Drawer */}
            {showFiltersMobile && (
              <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
                <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowFiltersMobile(false)}></div>
                <div className="absolute inset-y-0 left-0 max-w-full flex">
                  <div className="w-screen max-w-xs bg-white shadow-xl flex flex-col p-6 overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-6">
                      <h3 className="font-bold text-lg font-fredoka text-slate-800 flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5 text-babyPink-dark" /> Filters
                      </h3>
                      <button onClick={() => setShowFiltersMobile(false)} className="p-1 rounded-full hover:bg-slate-100">
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>

                    {/* Search */}
                    <div className="mb-6">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 font-fredoka">Search</label>
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input 
                          type="text" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="e.g. Romper..."
                          className="w-full bg-slate-50 border border-slate-100 rounded-full pl-9 pr-4 py-2.5 text-xs text-slate-650 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="mb-6">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3 font-fredoka">Category</label>
                      <div className="space-y-1">
                        {[
                          { id: 'all', label: 'All Products' },
                          { id: 'clothing', label: 'Clothing' },
                          { id: 'toys', label: 'Toys' },
                          { id: 'feeding', label: 'Feeding' },
                          { id: 'diapering', label: 'Diapering' },
                          { id: 'nursery', label: 'Nursery' },
                          { id: 'gear', label: 'Gear & Travel' },
                        ].map((cat) => (
                          <button 
                            key={cat.id}
                            onClick={() => {
                              setSelectedCategory(cat.id);
                              setShowFiltersMobile(false);
                            }}
                            className={`w-full text-left px-3.5 py-2 rounded-full text-xs font-semibold font-fredoka transition-all ${
                              selectedCategory === cat.id 
                                ? 'bg-babyPink text-white font-bold' 
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-8">
                      <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-fredoka">
                        <span>Max Price</span>
                        <span className="text-babyPink-dark">${priceRange}</span>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="250" 
                        value={priceRange} 
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-babyPink"
                      />
                    </div>

                    {/* Clear Filters */}
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setPriceRange(250);
                        setShowFiltersMobile(false);
                      }}
                      className="w-full py-2.5 border border-slate-200 text-slate-500 rounded-full text-xs font-bold font-fredoka"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-[32px] p-16 text-center border border-slate-100 shadow-sm max-w-md mx-auto">
                <span className="text-5xl">🧸</span>
                <h3 className="text-lg font-bold font-fredoka text-slate-700 mt-4 font-fredoka">No products match</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-[240px] mx-auto">
                  Try adjusting your search criteria, raising the price cap, or clearing active filters.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setPriceRange(250);
                  }}
                  className="mt-6 px-5 py-2.5 bg-gradient-to-r from-babyPink to-babyPurple text-white font-bold rounded-full text-xs font-fredoka hover:shadow-md hover:scale-105 transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map((product) => {
                  const isInWishlist = wishlist.includes(product.id);
                  return (
                    <div 
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className="group relative bg-white rounded-[32px] border border-slate-100 p-5 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        {/* Badges and wishlist icon */}
                        <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5">
                          {product.badge && (
                            <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full text-white font-fredoka uppercase tracking-wider ${
                              product.badge === 'Sale' ? 'bg-rose-400 shadow-sm shadow-rose-100' : 
                              product.badge === 'New' ? 'bg-amber-400 shadow-sm shadow-amber-100' : 'bg-violet-400 shadow-sm shadow-violet-100'
                            }`}>
                              {product.badge}
                            </span>
                          )}
                        </div>

                        <button 
                          onClick={(e) => toggleWishlist(product.id, e)}
                          className={`absolute top-6 right-6 z-10 p-2 rounded-full border bg-white/80 backdrop-blur-sm transition-all hover:scale-110 ${
                            isInWishlist
                              ? 'border-pink-200 text-rose-500'
                              : 'border-slate-100 text-slate-400 hover:text-rose-500'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                        </button>

                        {/* Image wrapper */}
                        <div className="relative w-full aspect-square rounded-2xl bg-slate-50 flex items-center justify-center p-6 overflow-hidden mb-5">
                          {/* Big central emoji */}
                          <span className="text-6.5xl z-10 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
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
                        <h3 className="text-sm font-bold text-slate-800 mt-1 font-fredoka group-hover:text-babyPink-dark transition-colors truncate">
                          {product.name}
                        </h3>

                        {/* Stars */}
                        <div className="flex items-center gap-1 mt-1.5">
                          <div className="flex">{renderStars(product.rating)}</div>
                          <span className="text-xs font-medium text-slate-400 ml-1">({product.reviews} reviews)</span>
                        </div>
                      </div>

                      {/* Price and Cart button */}
                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-50">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-bold font-fredoka text-slate-800">
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
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setSelectedProduct(null)}></div>
            
            {/* Content card */}
            <div className="relative bg-white rounded-[40px] shadow-2xl overflow-hidden max-w-2xl w-full border border-slate-100 flex flex-col md:flex-row transform transition-all animate-float">
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
                    <span className="text-xs font-medium text-slate-505">
                      {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Options Swatches */}
                  {selectedProduct.colors && selectedProduct.colors.length > 0 && (
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
                  )}
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
    </div>
  );
}
