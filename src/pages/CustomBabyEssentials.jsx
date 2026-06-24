import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Gift, Heart, ShoppingCart, Info, Check, 
  HelpCircle, ChevronDown, CheckCircle2, Star, ShieldCheck, 
  Baby, Palette 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CustomBabyEssentials({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  // Form State
  const [productType, setProductType] = useState('Baby Care Kit');
  const [brand, setBrand] = useState('Nestling Pure');
  const [theme, setTheme] = useState('Cute Animals');
  const [color, setColor] = useState('Neutral Beige');
  const [quantity, setQuantity] = useState(1);
  const [giftWrapping, setGiftWrapping] = useState('Standard Wrap');
  const [babyName, setBabyName] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  // FAQ state
  const [openFaq, setOpenFaq] = useState(0);

  // Price matrix
  const basePrices = {
    'Baby Care Kit': 45.00,
    'Newborn Gift Set': 65.00,
    'Feeding Essentials Kit': 35.00,
    'Nursery Essentials Set': 85.50
  };

  const brandMarkups = {
    'Nestling Pure': 5.00,
    'Baby Hugs': 0.00,
    'Tiny Sprout': 0.00,
    'Organic Dreams': 10.00
  };

  const wrappingSurcharges = {
    'Standard Wrap': 0.00,
    'Sweet Ribbon': 3.50,
    'Deluxe Baby Cradle Box': 6.00
  };

  // Live Price Calculation
  const base = basePrices[productType] || 45.00;
  const brandCost = brandMarkups[brand] || 0;
  const wrappingCost = wrappingSurcharges[giftWrapping] || 0;
  const unitPrice = base + brandCost + wrappingCost;
  const totalPrice = unitPrice * quantity;

  // Add customized bundle to cart
  const handleAddToBag = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      colors: ['#FF94B4', '#7DD3FC', '#86EFAC']
    });

    const customProduct = {
      id: 'CUSTOM-' + Date.now(),
      name: `Custom ${productType} (${brand})`,
      price: unitPrice,
      bgColor: 'bg-gradient-to-tr from-pink-50 to-blue-50 text-pink-650',
      emoji: productType === 'Newborn Gift Set' ? '🎁' : 
             productType === 'Feeding Essentials Kit' ? '🍼' :
             productType === 'Nursery Essentials Set' ? '🛏️' : '🧼',
      description: `Personalized Theme: ${theme} (${color}). Wrap: ${giftWrapping}. Name/Msg: "${babyName || 'None'}". Note: "${specialInstructions || 'None'}"`,
      quantity: quantity,
      isCustom: true
    };

    setCartItems(prev => [...prev, customProduct]);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const faqs = [
    { q: "How long does custom packaging take to process?", a: "Because each Custom Kit is hand-assembled and inspected by our nursery team, custom packaging takes 1-2 business days to compile before shipment." },
    { q: "Are all products in these kits organic certified?", a: "Yes, GOTS certified organic materials are used standard across all our clothing, sheets, and toys. If selecting 'Organic Dreams' brand, we use premium raw linen and GOTS cotton exclusively." },
    { q: "Can I send the custom kit directly as a gift?", a: "Absolutely! Enter the parent's address at checkout. We include a packing slip without price details and display your customized message in beautiful calligraphy." },
    { q: "What is your return policy on custom orders?", a: "While we guarantee 100% safety and quality, custom-designed kits with custom name engravings are final sale unless damaged during transit." }
  ];

  return (
    <div className="bg-amber-50/10 min-h-screen selection:bg-pink-100 selection:text-pink-650 text-left">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border-b border-pink-100/50">
        <div className="absolute top-10 right-10 w-48 h-48 bg-pink-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-float-delayed"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-pink-100 shadow-sm text-xs font-bold text-babyPink-dark tracking-wider uppercase font-fredoka">
              <Gift className="w-4 h-4 text-babyPink" /> Bespoke Personalization
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-fredoka text-slate-800 mt-6 leading-tight">
              Create Your Custom <br />
              <span className="bg-gradient-to-r from-babyPink-dark via-babyPurple-dark to-babyBlue-dark bg-clip-text text-transparent">
                Baby Essentials Kit
              </span>
            </h1>
            <p className="text-slate-500 mt-4 text-sm sm:text-base leading-relaxed max-w-xl">
              Mix, match, and personalize premium GOTS clothing, organic wood stackers, and non-toxic care accessories. Tailored exactly to your baby's name, theme, and colors.
            </p>
          </div>
        </div>
      </section>

      {/* Main Customization Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Customization Form */}
          <div className="lg:col-span-7 bg-white rounded-[36px] border border-slate-100 p-6 md:p-8 shadow-xs space-y-8">
            
            {/* Step 1: Product Type */}
            <div>
              <h3 className="font-bold text-base font-fredoka text-slate-800 flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-full bg-pink-100 text-babyPink-dark font-bold flex items-center justify-center text-xs">1</span>
                Select Essentials Collection
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Baby Care Kit', desc: 'Wipes, grooming brushes, sound aid', price: 45 },
                  { name: 'Newborn Gift Set', desc: 'Romper, booties, knitted plush toy', price: 65 },
                  { name: 'Feeding Essentials Kit', desc: 'Silicone suction plates, adjust bibs', price: 35 },
                  { name: 'Nursery Essentials Set', desc: 'Muslin swaddles, cotton fitted sheets', price: 85.50 }
                ].map((type) => (
                  <button
                    key={type.name}
                    type="button"
                    onClick={() => setProductType(type.name)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      productType === type.name 
                        ? 'border-babyPink bg-pink-50/20 shadow-xs' 
                        : 'border-slate-100 hover:border-pink-100 bg-white'
                    }`}
                  >
                    <span className="font-bold text-slate-800 font-fredoka text-xs block">{type.name}</span>
                    <span className="text-[10px] text-slate-400 mt-1 block">{type.desc}</span>
                    <span className="text-[11px] font-bold text-babyPink-dark mt-2.5 block">Base: ${type.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Brand Selection */}
            <div>
              <h3 className="font-bold text-base font-fredoka text-slate-800 flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-full bg-yellow-100 text-babyYellow-dark font-bold flex items-center justify-center text-xs">2</span>
                Choose Brand Tier
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { name: 'Nestling Pure', desc: 'Standard organic', markup: 5 },
                  { name: 'Baby Hugs', desc: 'Daily comfort', markup: 0 },
                  { name: 'Tiny Sprout', desc: 'Wooden focus', markup: 0 },
                  { name: 'Organic Dreams', desc: 'Premium luxury', markup: 10 }
                ].map((b) => (
                  <button
                    key={b.name}
                    type="button"
                    onClick={() => setBrand(b.name)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${
                      brand === b.name 
                        ? 'border-babyPink bg-pink-50/10' 
                        : 'border-slate-100 hover:border-pink-100 bg-white'
                    }`}
                  >
                    <span className="font-bold text-slate-800 font-fredoka text-[11px] block">{b.name}</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">{b.desc}</span>
                    <span className="text-[10px] font-bold text-slate-500 mt-2 block">
                      {b.markup > 0 ? `+$${b.markup.toFixed(2)}` : 'Standard Price'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Theme and Color */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2 font-fredoka">Select Engraving Theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-full px-4 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-babyPink"
                >
                  <option value="Cute Animals">Cute Animals 🧸</option>
                  <option value="Princess Theme">Princess Theme 👑</option>
                  <option value="Space Explorer">Space Explorer 🚀</option>
                  <option value="Floral Garden">Floral Garden 🌸</option>
                  <option value="Neutral Cloud">Neutral Cloud ☁️</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2 font-fredoka">Color Preference</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Pastel Pink', color: '#FFB6C1' },
                    { name: 'Sky Blue', color: '#7DD3FC' },
                    { name: 'Soft Purple', color: '#D8B4FE' },
                    { name: 'Mint Green', color: '#86EFAC' },
                    { name: 'Neutral Beige', color: '#FFE0B2' }
                  ].map((col) => (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => setColor(col.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center relative ${
                        color === col.name ? 'border-slate-800 scale-105 ring-2 ring-slate-100' : 'border-white'
                      }`}
                      style={{ backgroundColor: col.color }}
                      title={col.name}
                    >
                      {color === col.name && (
                        <span className="text-[9px] text-slate-800 font-bold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 4: Wrapping & Gift Message */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-fredoka">Wrapping & Personalization</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Standard Wrap', price: 0 },
                  { name: 'Sweet Ribbon', price: 3.50 },
                  { name: 'Deluxe Baby Cradle Box', price: 6.00 }
                ].map((wrap) => (
                  <button
                    key={wrap.name}
                    type="button"
                    onClick={() => setGiftWrapping(wrap.name)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      giftWrapping === wrap.name 
                        ? 'border-babyPink bg-pink-50/10 text-babyPink-dark font-bold' 
                        : 'border-slate-100 hover:border-pink-100 bg-white text-slate-500'
                    }`}
                  >
                    <span className="font-fredoka text-[11px] block">{wrap.name}</span>
                    <span className="text-[9px] block mt-1">
                      {wrap.price > 0 ? `+$${wrap.price.toFixed(2)}` : 'Free'}
                    </span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1 font-fredoka">Baby Name or Gift Message</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Welcome Little Liam! / Sofia"
                    value={babyName}
                    onChange={(e) => setBabyName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-full px-4 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-babyPink"
                  />
                </div>
                
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1 font-fredoka">Packaging Special Instructions</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Deliver before 5PM / double wrap"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-full px-4 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-babyPink"
                  />
                </div>
              </div>
            </div>

            {/* Step 5: Quantity */}
            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase font-fredoka">Order Quantity</span>
              <div className="flex items-center">
                <button 
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-slate-200 hover:bg-slate-50 rounded-full text-slate-500"
                >
                  -
                </button>
                <span className="mx-4 text-sm font-bold text-slate-800">{quantity}</span>
                <button 
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-slate-200 hover:bg-slate-50 rounded-full text-slate-500"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Live Order Summary Column */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            
            {/* Glassmorphic Live Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-[36px] border border-slate-100 p-6 shadow-lg relative overflow-hidden flex flex-col justify-between">
              {/* Soft decorative background circles */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-babyPink/10 rounded-full filter blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-babyBlue/10 rounded-full filter blur-xl"></div>

              <div className="relative z-10">
                <h3 className="font-bold text-lg font-fredoka text-slate-800 mb-6 flex items-center gap-1.5 border-b border-slate-100/50 pb-3">
                  <Sparkles className="w-5 h-5 text-babyPink-dark" /> Custom Package Summary
                </h3>

                <div className="space-y-4 text-xs font-semibold text-slate-500 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Package Type:</span>
                    <span className="text-slate-805 font-fredoka font-bold">{productType}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Brand Tier:</span>
                    <span className="text-slate-700">{brand}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Theme Preference:</span>
                    <span className="text-slate-750 font-fredoka">{theme} ({color})</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Wrapping Standard:</span>
                    <span className="text-slate-700">{giftWrapping}</span>
                  </div>

                  <div className="flex justify-between border-t border-slate-50 pt-3">
                    <span className="text-slate-400">Calligraphy Inscription:</span>
                    <span className="text-slate-700 italic max-w-[200px] truncate">{babyName ? `"${babyName}"` : 'None Engraved'}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-405">Instructions:</span>
                    <span className="text-slate-700 max-w-[200px] truncate">{specialInstructions ? `"${specialInstructions}"` : 'None'}</span>
                  </div>

                  <div className="flex justify-between border-t border-slate-50 pt-3 text-xs font-medium">
                    <span>Base Unit Cost:</span>
                    <span>${unitPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Package Count:</span>
                    <span>x {quantity}</span>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-sm font-bold text-slate-800">
                    <span className="font-fredoka">Estimated Subtotal</span>
                    <span className="text-2xl font-fredoka text-babyPink-dark">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Trigger */}
              <button
                type="button"
                onClick={handleAddToBag}
                className={`w-full py-4 bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue text-white font-bold rounded-full shadow-lg shadow-pink-100/30 hover:scale-[1.01] transition-all text-center tracking-wider font-fredoka uppercase text-xs mt-8 flex items-center justify-center gap-2 ${
                  justAdded ? 'from-emerald-500 to-emerald-600 shadow-emerald-100' : ''
                }`}
              >
                {justAdded ? (
                  <>✓ Customized Kit Added</>
                ) : (
                  <><ShoppingCart className="w-4 h-4" /> Add Personalized Kit to Cart</>
                )}
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* Why Choose Baby Nest Section */}
      <section className="py-20 bg-white border-y border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-babyPink-dark bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100 font-fredoka">
              Our Commitments
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-fredoka text-slate-800 mt-4">
              Why Parents Choose Baby Nest?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { title: 'GOTS Organic Fibers', desc: 'Only certified organic skin cotton reaches our kits, protecting skin from allergens.', icon: '🌱' },
              { title: 'Pediatric Tested Safety', desc: 'All toys in our collections are chew-safe and satisfy mechanical guidelines.', icon: '🛡️' },
              { title: 'Eco-Friendly Materials', desc: 'Our packaging boxes and bamboo eco wipes are 100% biodegradable.', icon: '🌲' }
            ].map((item, index) => (
              <div key={index} className="p-8 rounded-[32px] border border-slate-100 hover:scale-105 transition-transform duration-300">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h4 className="font-bold text-base font-fredoka text-slate-800 mt-4">{item.title}</h4>
                <p className="text-xs text-slate-450 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Baby Care Recommendations & Tips Section */}
      <section className="py-20 bg-gradient-to-b from-white to-pink-50/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-babyBlue-dark bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100 font-fredoka">
              Parenting Guide
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-fredoka text-slate-800 mt-4">
              Nesting Tips & Care Guidelines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Choosing Teething Toys', tip: 'Always select non-toxic sustainable beechwood with water-based sealants. Wooden toys are self-sterilizing and stimulate early sensory coordination.', date: 'Infants' },
              { title: 'Healthy Sleeping Routine', tip: 'Muslin swaddles should be breathable GOTS cotton to keep body temperature regulated. Standard fit sheets help prevent sleep suffocation.', date: 'Newborns' },
              { title: 'Transition to Solids', tip: 'Silicone food-grade plate sets with strong suction bases avoid spill stress and allow babies to practice independent finger food holds safely.', date: 'Sitters' }
            ].map((tip, idx) => (
              <div key={idx} className="bg-white p-6 rounded-[28px] border border-slate-100 text-left flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-pink-50 text-babyPink-dark font-fredoka uppercase tracking-wider">
                    {tip.date}
                  </span>
                  <h4 className="font-bold text-sm font-fredoka text-slate-800 mt-3">{tip.title}</h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{tip.tip}</p>
                </div>
                <p className="text-[10px] text-babyPink-dark font-bold mt-6 flex items-center gap-1 cursor-pointer">
                  Learn more nesting steps →
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-babyPurple-dark bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100 font-fredoka">
            Common Inquiries
          </span>
          <h2 className="text-3xl font-extrabold font-fredoka text-slate-800 mt-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between font-bold text-xs text-slate-800 hover:bg-slate-50/50 transition-colors"
                >
                  <span className="font-fredoka text-left flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-babyPink-dark shrink-0" /> {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 pt-1 text-xs text-slate-500 border-t border-slate-50/50 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
