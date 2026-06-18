import React, { useState } from 'react';
import { Mail, Phone, MapPin, Heart, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address! 🍼');
      return;
    }
    
    // Confetti effect
    confetti({
      particleCount: 80,
      spread: 50,
      colors: ['#FF94B4', '#7DD3FC', '#86EFAC']
    });

    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-babyPink/5 rounded-full filter blur-3xl -z-0"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-babyBlue/5 rounded-full filter blur-3xl -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-850">
          
          {/* Column 1: Brand details */}
          <div className="lg:col-span-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-babyPink to-babyPurple flex items-center justify-center text-white font-fredoka text-xl font-bold">
                👶
              </div>
              <span className="ml-3 font-fredoka text-xl font-bold bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue bg-clip-text text-transparent">
                BabyNest
              </span>
            </div>
            
            <p className="text-slate-400 text-xs mt-4 leading-relaxed max-w-sm">
              We specialize in offering premium-grade, GOTS certified organic baby wear, non-toxic sensory wood toys, and allergy-safe nursery items. Designed with care, curated with love.
            </p>

            <div className="flex gap-3 mt-6">
              {['facebook', 'instagram', 'twitter', 'pinterest'].map((social) => (
                <a 
                  key={social}
                  href={`#${social}`}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-babyPink hover:text-white transition-all flex items-center justify-center text-xs font-bold capitalize text-slate-400"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold font-fredoka text-white tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#hero" className="hover:text-babyPink transition-colors">Home</a></li>
              <li><a href="#categories" className="hover:text-babyPink transition-colors">Categories</a></li>
              <li><a href="#products" className="hover:text-babyPink transition-colors">Products</a></li>
              <li><a href="#reviews" className="hover:text-babyPink transition-colors">Reviews</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold font-fredoka text-white tracking-wider uppercase mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#shipping" className="hover:text-babyPink transition-colors">Shipping Info</a></li>
              <li><a href="#returns" className="hover:text-babyPink transition-colors">Free Returns</a></li>
              <li><a href="#size-guide" className="hover:text-babyPink transition-colors">Size Guide</a></li>
              <li><a href="#faq" className="hover:text-babyPink transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-bold font-fredoka text-white tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-babyPink" /> Stay in the Loop
            </h4>
            
            <p className="text-slate-400 text-xs mb-4 leading-relaxed">
              Subscribe to get $10 off your first purchase, first look at new organic launches, and parenting tips.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 bg-slate-800 p-1.5 rounded-full border border-slate-700 focus-within:ring-2 focus-within:ring-babyPink focus-within:border-transparent transition-all">
              <input 
                type="email" 
                placeholder="Enter email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-none outline-none text-xs flex-1 px-3 py-1 text-white placeholder-slate-500"
                disabled={subscribed}
              />
              <button 
                type="submit" 
                className="bg-babyPink hover:bg-babyPink-dark text-white p-2.5 rounded-full shadow-md transition-all flex items-center justify-center"
                disabled={subscribed}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribed && (
              <p className="text-emerald-400 text-[11px] mt-2 font-semibold flex items-center gap-1 animate-bounce">
                🎉 Welcome to the Nest! Code baby-signup sent to your inbox.
              </p>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-6">
          <p className="flex items-center gap-1">
            &copy; 2026 BabyNest Shop. Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for healthy beginnings.
          </p>

          {/* Payment icons */}
          <div className="flex items-center gap-2">
            {['Visa', 'Mastercard', 'PayPal', 'ApplePay'].map((payment) => (
              <span 
                key={payment}
                className="px-2.5 py-1 bg-slate-800 border border-slate-700/60 rounded-md font-mono text-[9px] uppercase tracking-wider text-slate-300"
              >
                {payment}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
