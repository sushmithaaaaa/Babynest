import React, { useState } from 'react';
import { Star, ShieldCheck, PenTool, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReviewsPage({ reviews, setReviews }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [avatar, setAvatar] = useState('👩‍🍼');
  const [text, setText] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !role || !text) {
      alert('Please fill out all fields to submit your review! 🍼');
      return;
    }

    const newReview = {
      id: Math.max(...reviews.map(r => r.id), 0) + 1,
      name,
      role,
      rating: Number(rating),
      text,
      avatar,
      bgColor: 'bg-gradient-to-tr from-pink-50 to-blue-50',
      date: 'Just now',
      status: 'Approved' // Auto-approved for customer display
    };

    setReviews([newReview, ...reviews]);
    
    // Confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      colors: ['#FF94B4', '#7DD3FC', '#86EFAC', '#FDBA74']
    });

    // Reset form
    setName('');
    setRole('');
    setRating(5);
    setAvatar('👩‍🍼');
    setText('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  const renderStars = (ratingCount) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < ratingCount ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} 
      />
    ));
  };

  // Filter reviews to show only Approved ones on storefront (or all if not moderated yet)
  const approvedReviews = reviews.filter(r => r.status === undefined || r.status === 'Approved');

  // Calculate statistics
  const totalReviews = approvedReviews.length;
  const avgRating = totalReviews > 0 
    ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : '5.0';
  
  // Calculate star distributions
  const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  approvedReviews.forEach(r => {
    const star = Math.round(r.rating);
    if (starCounts[star] !== undefined) starCounts[star]++;
  });

  return (
    <div className="py-12 bg-gradient-to-b from-purple-50/15 via-white to-pink-50/15 min-h-screen selection:bg-pink-100 selection:text-pink-650">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-babyPink-dark bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100 font-fredoka">
            Parent Testimonials
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-fredoka text-slate-800 mt-4 leading-tight">
            What Parents Say About Us
          </h1>
          <p className="text-slate-500 mt-3 text-base">
            We are dedicated to safety and organic certified comfort. Read honest reviews and ratings from our community of moms, dads, and guardians.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start">
          
          {/* Left Column: Ratings Summary & Write Review Form */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Rating Breakdown card */}
            <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm text-left">
              <h3 className="font-bold text-lg font-fredoka text-slate-805 mb-4">Ratings Summary</h3>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-extrabold text-slate-805 font-fredoka">{avgRating}</span>
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {renderStars(Math.round(parseFloat(avgRating)))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Based on {totalReviews} parent reviews</span>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = starCounts[stars] || 0;
                  const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={stars} className="flex items-center text-xs font-medium text-slate-500 gap-3">
                      <span className="w-12 text-right flex items-center justify-end gap-1 font-semibold text-slate-700">
                        {stars} <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 inline" />
                      </span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-babyPink to-babyPurple rounded-full transition-all duration-500" 
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                      <span className="w-8 text-right text-slate-400">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Write a Review Form Card */}
            <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm relative overflow-hidden text-left">
              {/* Highlight background blobs */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-babyPink/5 rounded-full filter blur-xl"></div>
              
              <h3 className="font-bold text-lg font-fredoka text-slate-800 mb-2 flex items-center gap-2">
                <PenTool className="w-4.5 h-4.5 text-babyPink-dark" /> Share Your Story
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Your experience helps other parents make healthy choices.
              </p>

              {successMsg && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 text-xs font-semibold animate-bounce flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                  <span>Review published! Thank you for sharing your love! 🎉</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
                {/* Parent Name */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1 font-fredoka">Your Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Eleanor Vance" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-full px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-babyPink focus:bg-white transition-all text-xs"
                  />
                </div>

                {/* Baby Milestone / Role */}
                <div>
                  <label className="text-[10px] font-bold text-slate-505 block mb-1 font-fredoka">Baby Milestone / Age</label>
                  <input 
                    type="text" 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Mom of Liam (4 months)" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-full px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-babyPink focus:bg-white transition-all text-xs"
                  />
                </div>

                {/* Star rating buttons */}
                <div>
                  <label className="text-[10px] font-bold text-slate-505 block mb-2 font-fredoka">Your Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setRating(num)}
                        className={`p-2 rounded-xl border transition-all ${
                          rating >= num 
                            ? 'bg-yellow-50 border-yellow-200 text-yellow-500 scale-105 shadow-sm shadow-yellow-100' 
                            : 'bg-slate-50 border-slate-100 text-slate-300'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${rating >= num ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Avatar emojis */}
                <div>
                  <label className="text-[10px] font-bold text-slate-505 block mb-2 font-fredoka">Select Avatar Emoji</label>
                  <div className="flex flex-wrap gap-2">
                    {['👩‍🍼', '👨‍🍼', '🧔', '👩', '👨', '👶', '🧸', '🐣'].map((emoji) => (
                      <button
                        type="button"
                        key={emoji}
                        onClick={() => setAvatar(emoji)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl transition-all border ${
                          avatar === emoji 
                            ? 'bg-pink-50 border-pink-200 scale-110' 
                            : 'bg-slate-50 border-transparent hover:bg-slate-100'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Text */}
                <div>
                  <label className="text-[10px] font-bold text-slate-505 block mb-1 font-fredoka">Your Feedback</label>
                  <textarea 
                    rows="4"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Describe product materials, wash durability, baby comfort..." 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-babyPink focus:bg-white transition-all text-xs resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue text-white font-bold rounded-full shadow-md shadow-pink-100 hover:shadow-lg transition-all tracking-wide text-xs font-fredoka uppercase"
                >
                  Publish My Review
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Reviews List Grid */}
          <div className="lg:col-span-8 space-y-6 text-left">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg font-fredoka text-slate-805">Reviews & Diaries ({totalReviews})</h3>
            </div>

            {approvedReviews.length === 0 ? (
              <div className="bg-white rounded-[32px] p-12 border border-slate-100 shadow-sm text-center">
                <span className="text-4xl">✍️</span>
                <p className="text-slate-400 text-xs mt-2">No reviews have been published yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {approvedReviews.map((rev) => (
                  <div 
                    key={rev.id} 
                    className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all relative overflow-hidden"
                  >
                    <div>
                      {/* Header: Avatar, Name, Stars */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm bg-gradient-to-tr from-pink-50 to-blue-50`}>
                          {rev.avatar}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-808 font-fredoka">{rev.name}</h4>
                          <p className="text-[10px] text-slate-400 font-semibold">{rev.role}</p>
                        </div>
                      </div>

                      <div className="flex text-yellow-400 mb-3 gap-0.5">
                        {renderStars(rev.rating)}
                      </div>

                      <blockquote className="text-xs text-slate-600 leading-relaxed font-normal italic mb-6">
                        "{rev.text}"
                      </blockquote>
                    </div>

                    {/* Footer: Verified check & Date */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-auto">
                      <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified Parent
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium">{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
