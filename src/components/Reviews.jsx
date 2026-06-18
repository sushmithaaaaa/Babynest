import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';

const mockReviews = [
  {
    id: 1,
    name: 'Sarah Montgomery',
    role: 'Mom of Chloe (6 months)',
    rating: 5,
    text: "The organic crib sheets are incredibly soft! They fit perfectly on our standard mattress, and Chloe slept for 6 hours straight on the first night. That is a total game-changer for this tired mom!",
    avatar: '👩‍🍼',
    bgColor: 'bg-pink-100',
    date: '2 days ago'
  },
  {
    id: 2,
    name: 'David Kaelen',
    role: 'Dad of Noah (14 months)',
    rating: 5,
    text: "Highly recommend the wooden stacking blocks! Not only are they beautiful to look at, but they are completely non-toxic. My son chews on them constantly, and the organic dye doesn't chip at all.",
    avatar: '👨‍🍼',
    bgColor: 'bg-blue-100',
    date: '1 week ago'
  },
  {
    id: 3,
    name: 'Jessica Patel',
    role: 'Mom of Leo (9 months)',
    rating: 5,
    text: "The suction divider plate actually stays stuck to the highchair! I have tried three different brands, and this is the first one my son couldn't fling onto the floor. Super easy to wipe clean too.",
    avatar: '👩‍⚕️',
    bgColor: 'bg-emerald-100',
    date: '2 weeks ago'
  },
  {
    id: 4,
    name: 'Marcus Thorne',
    role: 'Dad of Sofia (18 months)',
    rating: 5,
    text: "The lightweight travel stroller was a lifesaver during our flight. It folds up in a split second with one hand, fit right in the overhead bin, and handles bumpy pavements smoothly. Worth every cent.",
    avatar: '🧔',
    bgColor: 'bg-orange-100',
    date: '3 weeks ago'
  }
];

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? mockReviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === mockReviews.length - 1 ? 0 : prev + 1));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <section id="reviews" className="py-16 bg-gradient-to-b from-white to-pink-50/20 relative overflow-hidden">
      {/* Decorative Pastel Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-babyPink/5 rounded-full filter blur-3xl -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold font-fredoka text-slate-800">
            Loved by Parents
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Read honest feedback from moms and dads who trust BabyNest for their little angels.
          </p>
        </div>

        {/* Testimonial Slider Card */}
        <div className="relative bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-xl shadow-pink-100/40">
          {/* Quote Icon overlay */}
          <div className="absolute top-10 right-10 text-pink-100">
            <Quote className="w-20 h-20 fill-current opacity-60" />
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            {/* Avatar Circle */}
            <div className="flex-shrink-0">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-md ${mockReviews[activeIndex].bgColor}`}>
                {mockReviews[activeIndex].avatar}
              </div>
            </div>

            {/* Testimonial Text */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex justify-center md:justify-start gap-1 mb-4">
                {renderStars(mockReviews[activeIndex].rating)}
              </div>

              <blockquote className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal italic">
                "{mockReviews[activeIndex].text}"
              </blockquote>

              {/* Author Info */}
              <div className="mt-6 flex flex-col md:flex-row md:items-center justify-center md:justify-between border-t border-slate-100 pt-4 gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 font-fredoka">
                    {mockReviews[activeIndex].name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {mockReviews[activeIndex].role}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    <ShieldCheck className="w-4.5 h-4.5" /> Verified Parent
                  </span>
                  <span className="text-[10px] text-slate-400">{mockReviews[activeIndex].date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Slider Controllers */}
          <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 flex gap-2">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors bg-white shadow-sm"
              title="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors bg-white shadow-sm"
              title="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sliding Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {mockReviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'w-8 bg-babyPink-dark' : 'w-2.5 bg-pink-100'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
