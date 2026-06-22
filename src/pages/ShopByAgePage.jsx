import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/products';
import { Heart, Star, ShoppingCart, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const ageMilestones = [
  {
    id: 'newborn',
    name: 'Newborns',
    bracket: '0 - 3 Months',
    emoji: '🐣',
    developmentTitle: 'Tactile Comfort & Sound Sleep',
    milestones: [
      'Visual tracking of high contrast patterns',
      'Hearing sensitivity and responding to soothing sounds',
      'Reflexive gripping and need for swaddled secure touch',
    ],
    bgColor: 'from-pink-50 to-rose-50 border-pink-100 text-rose-600',
    accentColor: 'text-rose-500'
  },
  {
    id: 'infant',
    name: 'Teething Infants',
    bracket: '3 - 6 Months',
    emoji: '👶',
    developmentTitle: 'Reaching, Grabbing & Teething',
    milestones: [
      'Reaching with hands and exploring textures',
      'Putting objects in mouth for oral exploration',
      'Beginning baby-led weaning and chewing gums',
    ],
    bgColor: 'from-blue-50 to-sky-50 border-blue-100 text-sky-600',
    accentColor: 'text-sky-500'
  },
  {
    id: 'explorer',
    name: 'Little Sitters',
    bracket: '6 - 12 Months',
    emoji: '🧸',
    developmentTitle: 'Coordination, Stacking & Feeding',
    milestones: [
      'Sitting up independently and crawling',
      'Improving pincer grasp and object manipulation',
      'Eating solid purees and self-feeding sets',
    ],
    bgColor: 'from-emerald-50 to-teal-50 border-emerald-105 text-emerald-600',
    accentColor: 'text-emerald-500'
  },
  {
    id: 'toddler',
    name: 'Active Toddlers',
    bracket: '12+ Months',
    emoji: '🏃',
    developmentTitle: 'Alphabet, Stacking & Walking',
    milestones: [
      'Walking, stacking shapes, and active play',
      'Early vocabulary, alphabet blocks, and spelling',
      'Imitative play, outdoor travel, and strollers',
    ],
    bgColor: 'from-yellow-50 to-amber-50 border-yellow-100 text-amber-600',
    accentColor: 'text-amber-500'
  }
];

// Helper to filter products by age brackets
const filterProductsByAge = (ageId, products) => {
  if (ageId === 'newborn') {
    return products.filter(p => p.age.toLowerCase().includes('newborn') || p.age.toLowerCase().includes('0-12') || p.age.toLowerCase().includes('0-24') || p.age.toLowerCase().includes('0-6'));
  }
  if (ageId === 'infant') {
    return products.filter(p => p.age.toLowerCase().includes('0-12') || p.age.toLowerCase().includes('3-') || p.age.toLowerCase().includes('4+') || p.age.toLowerCase().includes('0-6'));
  }
  if (ageId === 'explorer') {
    return products.filter(p => p.age.toLowerCase().includes('6+') || p.age.toLowerCase().includes('6-36') || p.age.toLowerCase().includes('0-24') || p.age.toLowerCase().includes('0-12'));
  }
  if (ageId === 'toddler') {
    return products.filter(p => p.age.toLowerCase().includes('12+') || p.age.toLowerCase().includes('6-36') || p.age.toLowerCase().includes('0-24') || p.age.toLowerCase().includes('3-36'));
  }
  return products;
};

export default function ShopByAgePage({ cartItems, setCartItems, wishlist, setWishlist }) {
  const [selectedAge, setSelectedAge] = useState('newborn');
  const navigate = useNavigate();

  const activeAgeData = ageMilestones.find(a => a.id === selectedAge);
  const matchedProducts = filterProductsByAge(selectedAge, mockProducts);

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
    <div className="py-12 bg-gradient-to-b from-yellow-50/10 via-white to-pink-50/10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-babyYellow-dark bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100 font-fredoka">
            Developmental Shopping
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-fredoka text-slate-800 mt-4 leading-tight">
            Shop by Age & Milestone
          </h1>
          <p className="text-slate-500 mt-3 text-base">
            Select your baby's current age milestone to view products chosen to support their sensory, cognitive, and physical development.
          </p>
        </div>

        {/* Age Milestones Timeline Selectors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {ageMilestones.map((age) => {
            const isActive = selectedAge === age.id;
            return (
              <button
                key={age.id}
                onClick={() => setSelectedAge(age.id)}
                className={`group flex flex-col items-center p-6 rounded-[32px] border-2 transition-all duration-300 ${
                  isActive 
                    ? 'border-babyPink bg-white shadow-xl shadow-pink-100/50 scale-105' 
                    : 'border-slate-100 bg-white hover:border-pink-100 hover:scale-[1.02]'
                }`}
              >
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{age.emoji}</span>
                <span className="font-fredoka text-sm font-bold text-slate-800 group-hover:text-babyPink-dark transition-colors">
                  {age.name}
                </span>
                <span className="text-xs text-slate-400 font-bold mt-1 font-fredoka">
                  {age.bracket}
                </span>
              </button>
            );
          })}
        </div>

        {/* Milestone Educational Dashboard */}
        {activeAgeData && (
          <div className={`rounded-[36px] bg-gradient-to-r ${activeAgeData.bgColor} border p-8 md:p-10 mb-16 shadow-sm flex flex-col md:flex-row gap-8 items-center justify-between`}>
            <div className="max-w-xl text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/60 px-3 py-1 rounded-full border border-white/80 font-fredoka">
                Developmental Guide ({activeAgeData.bracket})
              </span>
              <h2 className="text-2xl font-bold font-fredoka text-slate-800 mt-4">
                {activeAgeData.developmentTitle}
              </h2>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                During this milestone, baby's brain cells form millions of sensory synapses every second. Choosing organic materials and developmentally-sound objects helps support safe exploration.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md rounded-[28px] p-6 border border-white/50 w-full md:w-auto shrink-0 md:max-w-md">
              <h4 className="text-xs font-bold text-slate-800 font-fredoka mb-3 flex items-center gap-1.5">
                <Award className={`w-4.5 h-4.5 ${activeAgeData.accentColor}`} /> Key Milestones:
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium text-left">
                {activeAgeData.milestones.map((m, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeAgeData.accentColor}`} />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Curated Products List */}
        <div className="mb-10 text-left">
          <h3 className="text-xl font-bold font-fredoka text-slate-800">
            Recommended Products for {activeAgeData?.name}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Safe, non-toxic products matching this age group's sensory and developmental goals.
          </p>
        </div>

        {matchedProducts.length === 0 ? (
          <div className="bg-white rounded-[32px] p-12 text-center border border-slate-100 shadow-sm max-w-md mx-auto">
            <span className="text-5xl">🧸</span>
            <h3 className="text-lg font-bold font-fredoka text-slate-700 mt-4">Updating list...</h3>
            <p className="text-xs text-slate-400 mt-1">Our designers are curating items for this bracket.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {matchedProducts.map((product) => {
              const isInWishlist = wishlist.includes(product.id);
              return (
                <div 
                  key={product.id}
                  onClick={() => navigate('/products', { state: { openModalId: product.id } })}
                  className="group bg-white rounded-[32px] border border-slate-100 p-5 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative flex flex-col justify-between cursor-pointer"
                >
                  {/* Badge */}
                  <span className="absolute top-4 left-4 z-10 px-2.5 py-1 text-[10px] font-bold text-white rounded-full bg-babyBlue shadow-sm font-fredoka uppercase tracking-wider">
                    {product.age}
                  </span>

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

                    <h3 className="text-sm font-bold text-slate-800 font-fredoka truncate mb-1">
                      {product.name}
                    </h3>
                    
                    {/* Developmental Tip */}
                    <div className="bg-pink-50/50 text-[10px] text-babyPink-dark font-bold px-2 py-1 rounded-md mb-3 border border-pink-100/35 font-fredoka">
                      🌿 Perfect for developmental tracking
                    </div>

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
