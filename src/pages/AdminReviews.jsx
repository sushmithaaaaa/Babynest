import React, { useState } from 'react';
import { Trash2, CheckCircle, Search, AlertCircle, ShieldCheck } from 'lucide-react';

export default function AdminReviews({ reviews, setReviews }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter reviews
  const filteredReviews = reviews.filter(rev => 
    rev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rev.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteReview = (id) => {
    if (window.confirm('Are you sure you want to delete this review? 🚨')) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleToggleApprove = (id) => {
    setReviews(prev => prev.map(r => {
      if (r.id === id) {
        // Toggle simulated status badge
        const newStatus = r.status === 'Approved' ? 'Pending' : 'Approved';
        return { ...r, status: newStatus };
      }
      return r;
    }));
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Title block */}
      <div>
        <h2 className="text-2xl font-extrabold font-fredoka text-slate-800">Review Moderation</h2>
        <p className="text-xs text-slate-450 mt-1">Approve, verify, or remove user-submitted product feedback.</p>
      </div>

      {/* Toolbar Search */}
      <div className="bg-white rounded-3xl border border-slate-105 p-4 shadow-xs">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input 
            type="text" 
            placeholder="Search reviews by text or parent name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-full pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-babyPink focus:bg-white transition-all font-semibold"
          />
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        {filteredReviews.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-450">
            No customer reviews match search criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase bg-slate-50/50">
                  <th className="py-4 px-6">Parent Info</th>
                  <th className="py-4 px-6">Rating</th>
                  <th className="py-4 px-6">Review Content</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((rev) => (
                  <tr key={rev.id} className="border-b border-slate-55 hover:bg-slate-50/50 transition-colors">
                    
                    {/* Parent avatar & Info */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl shrink-0">
                        {rev.avatar || '👩‍🍼'}
                      </div>
                      <div>
                        <p className="font-bold text-slate-805 font-fredoka">{rev.name}</p>
                        <p className="text-[10px] text-slate-400 font-semibold">{rev.role}</p>
                      </div>
                    </td>

                    {/* Rating stars */}
                    <td className="py-4 px-6">
                      <span className="font-bold text-slate-800 text-[11px] block">★ {rev.rating}.0 / 5.0</span>
                      <span className="text-[9px] text-slate-405 font-medium">({rev.rating >= 4 ? 'Positive' : 'Critical'})</span>
                    </td>

                    {/* Review text */}
                    <td className="py-4 px-6 max-w-xs">
                      <blockquote className="text-slate-600 leading-relaxed font-normal italic truncate">
                        "{rev.text}"
                      </blockquote>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-slate-500 font-medium">{rev.date}</td>

                    {/* Status badge */}
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleToggleApprove(rev.id)}
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold border transition-colors ${
                          rev.status === 'Approved' 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                            : 'bg-yellow-50 border-yellow-200 text-yellow-600'
                        }`}
                        title="Click to toggle status"
                      >
                        {rev.status || 'Approved'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleToggleApprove(rev.id)}
                          className="p-1.5 rounded-lg text-slate-450 hover:text-emerald-500 hover:bg-emerald-50 transition-all"
                          title="Toggle Approval Status"
                        >
                          <CheckCircle className="w-4.5 h-4.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          className="p-1.5 rounded-lg text-slate-450 hover:text-red-500 hover:bg-rose-50 transition-all"
                          title="Delete review"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
