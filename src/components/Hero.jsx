import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export default function Hero({ onShopClick }) {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-pink-50/35 to-transparent pt-10 pb-16 md:py-24">
      {/* Decorative Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-babyPink/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-babyBlue/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-babyPurple/15 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 text-center lg:text-left">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-pink-100 text-babyPink-dark text-sm font-semibold shadow-sm mb-6 animate-bounce-slow">
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Up to 40% Off Summer Sale</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-800 tracking-tight mb-6 font-fredoka">
              Nurturing Your <br />
              <span className="bg-gradient-to-r from-babyPink-dark via-babyPurple-dark to-babyBlue-dark bg-clip-text text-transparent">
                Baby's First Steps
              </span> <br />
              With Pure Love
            </h1>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Explore our handpicked collection of organic clothing, hypoallergenic feeding sets, premium educational toys, and ultra-cozy nursery bedding. Specially crafted for sensitive skin.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={() => onShopClick('all')}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-babyPink to-babyPurple hover:from-babyPink-dark hover:to-babyPurple-dark text-white font-bold rounded-full shadow-lg shadow-babyPink/30 hover:shadow-xl hover:shadow-babyPink/40 transition-all flex items-center justify-center gap-2 group font-fredoka"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => onShopClick('sale')}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-full shadow-md border border-slate-100 hover:border-slate-200 transition-all flex items-center justify-center gap-2 font-fredoka"
              >
                <span>View Offers</span>
              </button>
            </div>

            {/* Stats Row */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-100 pt-8 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold font-fredoka text-slate-800">10k+</p>
                <p className="text-xs text-slate-500 font-medium">Happy Babies</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold font-fredoka text-slate-800">100%</p>
                <p className="text-xs text-slate-500 font-medium">Organic Cotton</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold font-fredoka text-slate-800">4.9★</p>
                <p className="text-xs text-slate-500 font-medium">Customer Rating</p>
              </div>
            </div>
          </div>

          {/* Graphic Content */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Backdrop Geometric Shapes */}
            <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-pink-100/60 to-blue-100/60 filter blur-lg -z-10 animate-float"></div>
            
            {/* Image Container with custom floating details */}
            <div className="relative w-full max-w-lg md:max-w-md lg:max-w-full rounded-[40px] overflow-hidden border-8 border-white shadow-2xl shadow-slate-200">
              <img 
                src="/baby_hero.png" 
                alt="Cute baby playing with wooden toys" 
                className="w-full h-auto object-cover object-center max-h-[500px]"
              />
              {/* Overlay Glass Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-3xl glass shadow-lg flex items-center justify-between border border-white/50 animate-float-delayed">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🌿</span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 font-fredoka">Eco-Friendly Toys</h4>
                    <p className="text-[11px] text-slate-500">100% safe, non-toxic wood</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-babyPink-dark bg-pink-100/50 px-3 py-1 rounded-full border border-pink-200/50">
                  Certified
                </span>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-4 -right-2 bg-gradient-to-r from-babyYellow to-babyPeach text-white font-bold p-4 rounded-2xl shadow-lg animate-float flex flex-col items-center">
              <span className="text-xl">⭐</span>
              <span className="text-xs uppercase font-fredoka tracking-wider mt-1">Award Winning</span>
            </div>

            <div className="absolute top-1/3 -left-6 bg-white border border-slate-100 p-3.5 rounded-2xl shadow-lg animate-float-delayed flex items-center gap-2">
              <span className="p-1.5 rounded-full bg-blue-50 text-babyBlue-dark"><Heart className="w-4 h-4 fill-current" /></span>
              <div>
                <p className="text-xs font-bold text-slate-800 font-fredoka">Ultra Soft</p>
                <p className="text-[9px] text-slate-400">Guaranteed hypoallergenic</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
