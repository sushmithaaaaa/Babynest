import React, { useState, useEffect } from 'react';
import { Sparkles, Gift } from 'lucide-react';

export default function OfferBanner({ onShopClick }) {
  // Set target date for 3 days from now
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-babyPeach via-babyPink to-babyPurple p-8 md:p-12 shadow-xl shadow-pink-100 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Decorative floating clouds/shapes */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full filter blur-xl animate-float"></div>
          <div className="absolute -bottom-10 left-10 w-32 h-32 bg-white/15 rounded-full filter blur-lg animate-float-delayed"></div>

          {/* Offer Details */}
          <div className="relative z-10 text-white text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
              <Gift className="w-3.5 h-3.5" />
              <span>Limited Time Bundle Deal</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold font-fredoka text-white leading-tight mb-4">
              Super Toddler Bundle Pack!
            </h2>
            
            <p className="text-white/90 text-sm sm:text-base mb-6 leading-relaxed">
              Get our award-winning organic romper, a matching feeding bowl, and a soft teething ring. Use code <span className="bg-white/25 px-2 py-0.5 rounded font-mono font-bold">BABYNST20</span> at checkout for an extra 20% off.
            </p>

            <button
              onClick={() => onShopClick('sale')}
              className="px-6 py-3 bg-white hover:bg-slate-50 text-babyPink-dark hover:text-babyPink font-bold rounded-full shadow-lg shadow-black/10 hover:scale-105 transition-all text-sm font-fredoka"
            >
              Claim Special Offer
            </button>
          </div>

          {/* Countdown Clock Container */}
          <div className="relative z-10 flex flex-col items-center justify-center bg-white/15 backdrop-blur-md border border-white/30 p-6 sm:p-8 rounded-3xl w-full lg:w-auto shadow-2xl">
            <p className="text-white font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-1.5 font-fredoka">
              <Sparkles className="w-3.5 h-3.5 animate-spin" /> Offer Ends In:
            </p>

            <div className="flex items-center gap-3 sm:gap-4 font-fredoka">
              {/* Days */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center text-slate-800 text-xl sm:text-2xl font-bold shadow-md">
                  {formatNumber(timeLeft.days)}
                </div>
                <span className="text-[10px] text-white/95 font-semibold uppercase tracking-wider mt-1.5">Days</span>
              </div>
              
              <span className="text-white text-2xl font-bold pb-4">:</span>

              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center text-slate-800 text-xl sm:text-2xl font-bold shadow-md">
                  {formatNumber(timeLeft.hours)}
                </div>
                <span className="text-[10px] text-white/95 font-semibold uppercase tracking-wider mt-1.5">Hours</span>
              </div>

              <span className="text-white text-2xl font-bold pb-4">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center text-slate-800 text-xl sm:text-2xl font-bold shadow-md">
                  {formatNumber(timeLeft.minutes)}
                </div>
                <span className="text-[10px] text-white/95 font-semibold uppercase tracking-wider mt-1.5">Mins</span>
              </div>

              <span className="text-white text-2xl font-bold pb-4">:</span>

              {/* Seconds */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center text-slate-800 text-xl sm:text-2xl font-bold shadow-md border-2 border-white/50 bg-rose-50 text-rose-500">
                  {formatNumber(timeLeft.seconds)}
                </div>
                <span className="text-[10px] text-white/95 font-semibold uppercase tracking-wider mt-1.5">Secs</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
