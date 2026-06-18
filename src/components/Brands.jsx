import React from 'react';

const brandsList = [
  { name: 'Pampers', logo: '👶', color: 'text-emerald-500 hover:bg-emerald-50' },
  { name: "Carter's", logo: '🍼', color: 'text-blue-500 hover:bg-blue-50' },
  { name: 'Huggies', logo: '🧸', color: 'text-rose-500 hover:bg-rose-50' },
  { name: 'Chicco', logo: '🛒', color: 'text-orange-500 hover:bg-orange-50' },
  { name: 'Philips Avent', logo: '🍽️', color: 'text-purple-500 hover:bg-purple-50' },
  { name: 'Fisher-Price', logo: '🐰', color: 'text-amber-500 hover:bg-amber-50' }
];

export default function Brands() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold font-fredoka text-slate-400 tracking-widest uppercase mb-8">
          Trusted by Top Brands Worldwide
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {brandsList.map((brand) => (
            <div 
              key={brand.name}
              className={`flex items-center justify-center gap-3 p-5 rounded-2xl border border-slate-100 hover:border-transparent bg-slate-50/50 hover:shadow-lg hover:shadow-slate-100/50 hover:scale-105 transition-all duration-300 cursor-pointer ${brand.color}`}
            >
              <span className="text-2xl">{brand.logo}</span>
              <span className="font-fredoka font-bold text-slate-600 hover:text-slate-800 text-sm tracking-wide">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
