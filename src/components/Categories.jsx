import React from 'react';

export default function Categories({ activeCategory, setActiveCategory }) {
  const categoriesList = [
    { id: 'all', name: 'All Products', emoji: '✨', bgColor: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200' },
    { id: 'clothing', name: 'Clothing', emoji: '👕', bgColor: 'bg-pink-50 hover:bg-pink-100 text-babyPink-dark border-pink-100' },
    { id: 'toys', name: 'Organic Toys', emoji: '🧸', bgColor: 'bg-yellow-50 hover:bg-yellow-100 text-babyYellow-dark border-yellow-100' },
    { id: 'feeding', name: 'Feeding', emoji: '🍼', bgColor: 'bg-emerald-50 hover:bg-emerald-100 text-babyMint-dark border-emerald-100' },
    { id: 'diapering', name: 'Diapering', emoji: '🧼', bgColor: 'bg-sky-50 hover:bg-sky-100 text-babyBlue-dark border-sky-100' },
    { id: 'nursery', name: 'Nursery & Cribs', emoji: '🛏️', bgColor: 'bg-purple-50 hover:bg-purple-100 text-babyPurple-dark border-purple-100' },
    { id: 'gear', name: 'Gear & Strollers', emoji: '🛒', bgColor: 'bg-orange-50 hover:bg-orange-100 text-babyPeach-dark border-orange-100' }
  ];

  return (
    <section id="categories" className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold font-fredoka text-slate-800">
            Shop by Category
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Everything your little star needs, organized neatly into cute custom collections.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {categoriesList.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  // Auto scroll to products section
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group flex flex-col items-center p-5 rounded-3xl border-2 transition-all duration-300 ${
                  isActive 
                    ? 'border-babyPink-dark bg-white shadow-lg shadow-pink-100 scale-105' 
                    : 'border-transparent bg-slate-50/50 hover:scale-105'
                }`}
              >
                {/* Icon Circle */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform duration-300 group-hover:rotate-6 ${category.bgColor}`}>
                  {category.emoji}
                </div>

                {/* Name */}
                <span className="text-xs font-bold font-fredoka text-slate-700 tracking-wide text-center group-hover:text-babyPink-dark transition-colors">
                  {category.name}
                </span>

                {/* Arrow hint on active */}
                {isActive && (
                  <span className="mt-2 text-[10px] font-bold text-babyPink-dark animate-bounce font-fredoka">
                    Selected
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
