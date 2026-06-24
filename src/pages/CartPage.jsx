import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight, Percent, ArrowLeft, ClipboardList } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartPage({ cartItems, setCartItems, orders, setOrders }) {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);

  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate discount
  const discountAmount = cartSubtotal * (discountPercent / 100);
  const discountedSubtotal = cartSubtotal - discountAmount;
  
  // Shipping: free over $50, else $5.99
  const shippingCost = cartSubtotal > 50 || cartSubtotal === 0 ? 0 : 5.99;
  
  // Tax: 8%
  const taxCost = discountedSubtotal * 0.08;
  
  // Total
  const cartTotal = discountedSubtotal + shippingCost + taxCost;

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'NESTDEAL20' || code === 'NESTGOTS20') {
      setDiscountPercent(20);
      setCouponApplied(true);
      setCouponError(false);
    } else if (code === 'WELCOME10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
      setCouponApplied(false);
      setDiscountPercent(0);
    }
  };

  const handlePlaceOrder = () => {
    // Confetti effect
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF94B4', '#7DD3FC', '#86EFAC', '#FDBA74', '#D8B4FE']
    });

    const newOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      customerName: 'Eleanor Vance',
      email: 'eleanor.vance@example.com',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        emoji: item.emoji
      })),
      total: cartTotal,
      discount: discountAmount,
      shipping: shippingCost,
      tax: taxCost,
      status: 'Pending'
    };

    // Save order in state
    setOrders(prev => [newOrder, ...prev]);

    alert(`Order Placed Successfully! 🎉\nYour simulated order ID is ${newOrder.id}.`);
    
    // Clear cart
    setCartItems([]);
  };

  return (
    <div className="py-12 bg-gradient-to-b from-sky-50/15 via-white to-pink-50/15 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-babyBlue-dark bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100 font-fredoka">
            Checkout Center
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-fredoka text-slate-800 mt-4 leading-tight">
            Shopping Cart
          </h1>
          <p className="text-slate-500 mt-3 text-base">
            Review your baby choices, adjust quantities, and apply discount codes to checkout securely.
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty state */
          <div className="bg-white rounded-[40px] border border-slate-100 p-16 text-center shadow-sm max-w-md mx-auto animate-float">
            <div className="w-24 h-24 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-5xl mx-auto mb-6">
              🧸
            </div>
            <h3 className="text-xl font-bold font-fredoka text-slate-700">Your cart is empty</h3>
            <p className="text-xs text-slate-400 mt-2 max-w-[285px] mx-auto leading-relaxed">
              Looks like you haven't selected any nursery gear, baby swaddles, or teething toys yet.
            </p>
            <Link 
              to="/products"
              className="mt-8 px-6 py-3.5 bg-gradient-to-r from-babyPink to-babyPurple text-white font-bold rounded-full text-xs font-fredoka shadow-md shadow-pink-100 hover:shadow-lg hover:scale-105 transition-all inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Start Shopping
            </Link>
          </div>
        ) : (
          /* Cart contents */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Items Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-6">
                  <h3 className="font-bold text-lg font-fredoka text-slate-800 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-babyPink-dark" /> Cart Items ({cartItems.length})
                  </h3>
                  <button 
                    onClick={() => setCartItems([])}
                    className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors"
                  >
                    Clear All Items
                  </button>
                </div>

                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center border-b border-slate-50 pb-6 last:border-0 last:pb-0 gap-4">
                      {/* Product image */}
                      <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 relative">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            onError={(e) => { e.target.onError = null; e.target.src = "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=600&auto=format&fit=crop&q=80"; }}
                            className="w-full h-full object-cover relative z-10"
                          />
                        ) : (
                          <span className="text-4xl relative z-10">{item.emoji}</span>
                        )}
                        <div className={`absolute inset-0 opacity-10 ${item.bgColor || 'bg-babyPink'}`}></div>
                      </div>

                      {/* Info & Quantity controls */}
                      <div className="flex-1 text-center sm:text-left min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 font-fredoka uppercase tracking-wider">{item.category}</span>
                        <h4 className="text-sm font-bold text-slate-800 font-fredoka mt-0.5 truncate">{item.name}</h4>
                        <p className="text-xs text-slate-400 mt-1">Price: ${item.price.toFixed(2)}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-center sm:justify-start mt-3">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1.5 rounded-full border border-slate-200 hover:bg-slate-55 text-slate-500 hover:text-slate-800 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="mx-4 text-xs font-bold text-slate-700">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1.5 rounded-full border border-slate-200 hover:bg-slate-55 text-slate-500 hover:text-slate-800 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Total Item Cost & Remove Action */}
                      <div className="text-center sm:text-right shrink-0 flex sm:flex-col justify-between sm:justify-center items-center w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t border-slate-100 sm:border-0">
                        <div className="flex flex-col sm:items-end">
                          <span className="text-xs text-slate-400 sm:hidden">Total cost:</span>
                          <span className="text-sm font-bold text-slate-800 font-fredoka">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="sm:mt-3 p-2 text-slate-450 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                          title="Remove item"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Shopping Link */}
              <Link 
                to="/products"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-babyPink-dark hover:text-babyPink font-fredoka"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
              </Link>
            </div>

            {/* Checkout / Order Summary Panel */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Checkout Calculation Card */}
              <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm">
                <h3 className="font-bold text-lg font-fredoka text-slate-800 mb-6 border-b border-slate-50 pb-3">
                  Order Summary
                </h3>

                <div className="space-y-3.5 text-xs font-medium text-slate-500">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
                    <span className="font-bold text-slate-800">${cartSubtotal.toFixed(2)}</span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg">
                      <span className="flex items-center gap-1"><Percent className="w-3.5 h-3.5" /> Coupon Discount ({discountPercent}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Simulated Shipping</span>
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-md">Free</span>
                    ) : (
                      <span className="font-bold text-slate-800">${shippingCost.toFixed(2)}</span>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-bold text-slate-800">${taxCost.toFixed(2)}</span>
                  </div>

                  {shippingCost > 0 && (
                    <p className="text-[10px] text-slate-400 text-left bg-sky-50 p-2 rounded-xl border border-sky-100">
                      💡 Tip: Add <span className="font-bold text-babyBlue-dark">${(50 - cartSubtotal).toFixed(2)}</span> more to qualify for Free Shipping!
                    </p>
                  )}

                  <div className="border-t border-slate-100 pt-4 mt-4 flex justify-between items-center text-sm font-bold text-slate-800">
                    <span className="font-fredoka">Estimated Total</span>
                    <span className="text-xl font-fredoka text-babyPink-dark">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button 
                  onClick={handlePlaceOrder}
                  className="w-full py-4 bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue text-white font-bold rounded-full shadow-lg shadow-pink-100 hover:shadow-xl hover:scale-[1.01] transition-all text-center tracking-wider font-fredoka uppercase text-xs mt-6 flex items-center justify-center gap-2"
                >
                  Place Simulated Order <ClipboardList className="w-4 h-4" />
                </button>
              </div>

              {/* Coupon Code Input Card */}
              <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm">
                <h4 className="font-bold text-sm font-fredoka text-slate-800 mb-2">Apply Promo Code</h4>
                <p className="text-[10px] text-slate-400 mb-4">Try NESTDEAL20 (20% off) or WELCOME10 (10% off)</p>
                
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="ENTER CODE" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-100 rounded-full px-4 py-2.5 text-xs text-slate-750 font-bold focus:outline-none focus:ring-2 focus:ring-babyPink focus:bg-white uppercase placeholder-slate-400"
                    disabled={couponApplied}
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2.5 bg-slate-800 hover:bg-babyPink text-white font-bold rounded-full text-xs font-fredoka shadow-sm transition-all"
                    disabled={couponApplied}
                  >
                    Apply
                  </button>
                </form>

                {couponApplied && (
                  <p className="text-emerald-600 text-[10px] mt-2 font-bold text-left">
                    ✓ Promo applied! Discount active.
                  </p>
                )}

                {couponError && (
                  <p className="text-rose-500 text-[10px] mt-2 font-bold text-left">
                    ✗ Invalid promo code. Please try again.
                  </p>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
