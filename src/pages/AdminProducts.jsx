import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AdminProducts({ products, setProducts }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('clothing');
  const [formPrice, setFormPrice] = useState('');
  const [formOldPrice, setFormOldPrice] = useState('');
  const [formEmoji, setFormEmoji] = useState('👶');
  const [formImage, setFormImage] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formAge, setFormAge] = useState('0-12 Months');

  // Categories list
  const categoriesList = [
    { id: 'clothing', label: 'Baby Clothing' },
    { id: 'toys', label: 'Baby Toys' },
    { id: 'care', label: 'Baby Care' },
    { id: 'feeding', label: 'Feeding' },
    { id: 'diapers', label: 'Diapers' },
    { id: 'furniture', label: 'Baby Furniture' },
    { id: 'accessories', label: 'Baby Accessories' }
  ];

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product? 🚨')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleOpenAddModal = () => {
    setModalMode('add');
    setSelectedProductId(null);
    setFormName('');
    setFormCategory('clothing');
    setFormPrice('');
    setFormOldPrice('');
    setFormEmoji('👶');
    setFormImage('');
    setFormDescription('');
    setFormBadge('');
    setFormAge('0-12 Months');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setModalMode('edit');
    setSelectedProductId(product.id);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormPrice(String(product.price));
    setFormOldPrice(product.oldPrice ? String(product.oldPrice) : '');
    setFormEmoji(product.emoji || '🍼');
    setFormImage(product.image || '');
    setFormDescription(product.description);
    setFormBadge(product.badge || '');
    setFormAge(product.age || '0-12 Months');
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formName || !formPrice || !formDescription) {
      alert('Please fill in Name, Price, and Description!');
      return;
    }

    const priceNum = parseFloat(formPrice);
    const oldPriceNum = formOldPrice ? parseFloat(formOldPrice) : undefined;

    if (modalMode === 'add') {
      const newProduct = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        name: formName,
        price: priceNum,
        oldPrice: oldPriceNum,
        rating: 5.0,
        reviews: 0,
        category: formCategory,
        emoji: formEmoji,
        bgColor: formCategory === 'clothing' ? 'bg-pink-100 text-pink-650' : 
                 formCategory === 'toys' ? 'bg-yellow-100 text-yellow-650' : 
                 formCategory === 'care' ? 'bg-sky-100 text-sky-655' : 
                 formCategory === 'feeding' ? 'bg-emerald-105 text-emerald-655' : 
                 formCategory === 'diapers' ? 'bg-sky-50 text-blue-650' :
                 formCategory === 'furniture' ? 'bg-purple-100 text-purple-650' : 'bg-orange-100 text-orange-650',
        image: formImage || undefined,
        description: formDescription,
        badge: formBadge || undefined,
        colors: ['#FFB6C1', '#80DEEA'],
        age: formAge
      };

      setProducts(prev => [newProduct, ...prev]);
    } else {
      setProducts(prev => prev.map(p => {
        if (p.id === selectedProductId) {
          return {
            ...p,
            name: formName,
            price: priceNum,
            oldPrice: oldPriceNum,
            category: formCategory,
            emoji: formEmoji,
            image: formImage || undefined,
            description: formDescription,
            badge: formBadge || undefined,
            age: formAge
          };
        }
        return p;
      }));
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold font-fredoka text-slate-800">Manage Catalog Products</h2>
          <p className="text-xs text-slate-450 mt-1">Add, update, or remove products in real time.</p>
        </div>
        
        <button
          onClick={handleOpenAddModal}
          className="px-5 py-3 bg-gradient-to-r from-babyPink to-babyPurple text-white font-bold rounded-full text-xs font-fredoka shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Search & filters row */}
      <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input 
            type="text" 
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-full pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-babyPink focus:bg-white transition-all font-semibold"
          />
        </div>

        {/* Categories select */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-slate-50 border border-slate-100 rounded-full px-4 py-2 text-xs font-semibold text-slate-650 focus:outline-none focus:ring-2 focus:ring-babyPink transition-all w-full sm:w-auto"
        >
          <option value="all">All Categories</option>
          {categoriesList.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>

      </div>

      {/* Products table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-450">
            No catalog items match your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase bg-slate-50/50">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Age Bracket</th>
                  <th className="py-4 px-6">Stats</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-slate-55 hover:bg-slate-50/50 transition-colors">
                    
                    {/* Visual details */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover relative z-10" />
                        ) : (
                          <span className="text-xl relative z-10">{product.emoji}</span>
                        )}
                        <div className={`absolute inset-0 opacity-10 ${product.bgColor || 'bg-babyPink'}`}></div>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 font-fredoka truncate max-w-[160px]">{product.name}</p>
                        <p className="text-[9px] text-slate-400">ID: #{product.id}</p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6 font-semibold text-slate-500 font-fredoka">
                      {categoriesList.find(c => c.id === product.category)?.label || product.category}
                    </td>

                    {/* Pricing */}
                    <td className="py-4 px-6 font-bold text-slate-800">
                      <span>${product.price.toFixed(2)}</span>
                      {product.oldPrice && (
                        <span className="text-[10px] text-slate-400 line-through block font-medium">${product.oldPrice.toFixed(2)}</span>
                      )}
                    </td>

                    {/* Age Range */}
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-pink-50 border border-pink-100 text-babyPink-dark font-fredoka">
                        {product.age}
                      </span>
                    </td>

                    {/* Reviews */}
                    <td className="py-4 px-6 text-slate-500 text-[11px]">
                      <p className="font-bold">★ {product.rating}</p>
                      <p className="text-[9px] text-slate-400 font-medium">({product.reviews} reviews)</p>
                    </td>

                    {/* CRUD Actions */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-1.5 rounded-lg text-slate-450 hover:text-babyBlue-dark hover:bg-sky-50 transition-all"
                          title="Edit product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1.5 rounded-lg text-slate-450 hover:text-red-500 hover:bg-rose-50 transition-all"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>

          {/* Modal Container */}
          <div className="relative bg-white rounded-[40px] shadow-2xl overflow-hidden max-w-lg w-full border border-slate-100 p-8 transform transition-all animate-float">
            
            {/* Close */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-105 text-slate-450 hover:bg-slate-205 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-extrabold font-fredoka text-slate-800 mb-6">
              {modalMode === 'add' ? 'Create New Baby Product' : 'Modify Baby Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-semibold text-left">
              
              {/* Product Name */}
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1 font-fredoka">Product Name</label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Organic Cotton Swaddle"
                  className="w-full bg-slate-50 border border-slate-100 rounded-full px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-babyPink"
                  required
                />
              </div>

              {/* Category & Age Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1 font-fredoka">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-full px-3 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-babyPink"
                  >
                    {categoriesList.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1 font-fredoka">Age Milestone</label>
                  <input 
                    type="text" 
                    value={formAge}
                    onChange={(e) => setFormAge(e.target.value)}
                    placeholder="e.g. 0-12 Months"
                    className="w-full bg-slate-50 border border-slate-100 rounded-full px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-babyPink"
                  />
                </div>
              </div>

              {/* Price & Old Price Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1 font-fredoka">Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="24.99"
                    className="w-full bg-slate-50 border border-slate-100 rounded-full px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-babyPink"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1 font-fredoka">Original Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={formOldPrice}
                    onChange={(e) => setFormOldPrice(e.target.value)}
                    placeholder="Leave blank if no sale"
                    className="w-full bg-slate-50 border border-slate-100 rounded-full px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-babyPink"
                  />
                </div>
              </div>

              {/* Image & Emoji Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1 font-fredoka">Fallback Emoji</label>
                  <input 
                    type="text" 
                    value={formEmoji}
                    onChange={(e) => setFormEmoji(e.target.value)}
                    placeholder="🍼"
                    className="w-full bg-slate-50 border border-slate-100 rounded-full px-4 py-2.5 text-center text-lg focus:outline-none focus:ring-2 focus:ring-babyPink"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1 font-fredoka">Image URL</label>
                  <input 
                    type="text" 
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-full px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-babyPink"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1 font-fredoka">Description</label>
                <textarea 
                  rows="3"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Provide GOTS cotton safety details or non-toxic materials guidelines..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-babyPink resize-none"
                  required
                ></textarea>
              </div>

              {/* Badge */}
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1 font-fredoka">Spotlight Badge</label>
                <select
                  value={formBadge}
                  onChange={(e) => setFormBadge(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-full px-3 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-babyPink"
                >
                  <option value="">No special badge</option>
                  <option value="New">New</option>
                  <option value="Sale">Sale</option>
                  <option value="Hot">Hot</option>
                </select>
              </div>

              {/* Submit */}
              <button 
                type="submit"
                className="w-full py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all tracking-wider text-xs font-fredoka uppercase mt-6"
              >
                {modalMode === 'add' ? 'Publish Item' : 'Save Changes'}
              </button>

            </form>
          </div>

        </div>
      )}

    </div>
  );
}
