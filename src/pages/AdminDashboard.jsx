import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, ShoppingCart, MessageSquare, Package, TrendingUp, ShieldAlert, ArrowRight } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard({ products, orders, reviews }) {
  const navigate = useNavigate();
  const [customerCount, setCustomerCount] = useState(0);

  // Statistics calculation
  const totalOrders = orders.length;
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const activeProductsCount = products.length;
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) 
    : '5.0';

  useEffect(() => {
    async function fetchCustomerCount() {
      try {
        const { count, error } = await supabase
          .from('customers')
          .select('*', { count: 'exact', head: true });

        if (error) throw error;
        setCustomerCount(count || 0);
      } catch (err) {
        console.error('Error fetching customer count:', err);
        // Fallback calculation using unique orders if error
        const uniqueEmails = new Set(orders.map(o => o.email));
        setCustomerCount(Math.max(5, uniqueEmails.size));
      }
    }
    fetchCustomerCount();
  }, [orders]);

  // Category sales distribution calculation for SVG Chart
  const categorySales = {
    clothing: 0,
    toys: 0,
    care: 0,
    feeding: 0,
    diapers: 0,
    furniture: 0,
    accessories: 0
  };

  // Populate sales from mock orders
  orders.forEach(order => {
    order.items?.forEach(item => {
      // Find category of the item
      const prod = products.find(p => p.id === item.id);
      const cat = prod ? prod.category : 'clothing';
      if (categorySales[cat] !== undefined) {
        categorySales[cat] += item.price * item.quantity;
      }
    });
  });

  // Fallback default sales for demo rendering if no orders placed yet
  const chartData = [
    { label: 'Clothing', value: categorySales.clothing || 320, color: '#FF94B4' },
    { label: 'Toys', value: categorySales.toys || 240, color: '#FDE047' },
    { label: 'Care', value: categorySales.care || 190, color: '#7DD3FC' },
    { label: 'Feeding', value: categorySales.feeding || 280, color: '#86EFAC' },
    { label: 'Diapers', value: categorySales.diapers || 150, color: '#38BDF8' },
    { label: 'Furniture', value: categorySales.furniture || 420, color: '#D8B4FE' },
    { label: 'Accessories', value: categorySales.accessories || 290, color: '#FDBA74' },
  ];

  const maxVal = Math.max(...chartData.map(d => d.value), 100);

  return (
    <div className="space-y-8 text-left">
      
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold font-fredoka text-slate-800">Control Dashboard</h2>
          <p className="text-xs text-slate-450 mt-1">Real-time statistics for BabyNest organic boutique.</p>
        </div>
        <div className="text-[11px] font-bold text-slate-400 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full font-fredoka">
          ⚡ System Live Updates
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Sales Card */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-fredoka">Total Revenues</span>
            <span className="text-2xl font-extrabold font-fredoka text-slate-800 block mt-1">${totalSales.toFixed(2)}</span>
            <span className="text-[9px] text-emerald-500 font-semibold mt-1 block">▲ 14.5% vs last week</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-pink-50 text-babyPink-dark flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-fredoka">Total Orders</span>
            <span className="text-2xl font-extrabold font-fredoka text-slate-800 block mt-1">{totalOrders}</span>
            <span className="text-[9px] text-emerald-500 font-semibold mt-1 block">▲ {totalOrders > 0 ? 'Placed live' : '0% pending'}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-babyYellow-dark flex items-center justify-center">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>

        {/* Products Card */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-fredoka">Active Products</span>
            <span className="text-2xl font-extrabold font-fredoka text-slate-800 block mt-1">{activeProductsCount}</span>
            <span className="text-[9px] text-slate-400 font-medium mt-1 block">Across 7 Categories</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-babyBlue-dark flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Reviews Card */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-fredoka">Rating Score</span>
            <span className="text-2xl font-extrabold font-fredoka text-slate-800 block mt-1">{avgRating} / 5.0</span>
            <span className="text-[9px] text-emerald-500 font-semibold mt-1 block">Based on {reviews.length} reviews</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-babyPurple-dark flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Visual Analytics Chart Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sales by Category SVG Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm font-fredoka text-slate-800 mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-babyPink-dark" /> Sales Distribution by Category
            </h3>
            <p className="text-[10px] text-slate-400 mb-6">Visual bar heights calculated dynamically in relation to max category purchase volumes.</p>
          </div>

          {/* SVG/Div Chart */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-slate-100 pb-2">
            {chartData.map((data, idx) => {
              const heightPct = (data.value / maxVal) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                  {/* Tooltip */}
                  <span className="absolute -top-6 bg-slate-800 text-white text-[9px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    ${data.value.toFixed(2)}
                  </span>
                  
                  {/* Bar */}
                  <div 
                    className="w-full rounded-t-lg transition-all duration-500 hover:brightness-95 cursor-pointer shadow-xs" 
                    style={{ 
                      height: `${Math.max(5, heightPct)}%`,
                      backgroundColor: data.color
                    }}
                  ></div>
                  
                  {/* Label */}
                  <span className="text-[9px] font-bold text-slate-500 truncate w-full text-center mt-2.5">
                    {data.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Small Analytics Side-Panel */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-100 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm font-fredoka text-slate-800 mb-4">Customer Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-450 font-medium">Customer Database</span>
                <span className="font-bold text-slate-800">{customerCount} accounts</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-450 font-medium">Simulated Traffic</span>
                <span className="font-bold text-slate-800">412 hits / hr</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-450 font-medium">Conversion Rate</span>
                <span className="font-bold text-slate-800">3.4% average</span>
              </div>
            </div>
          </div>

          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 text-[10px] leading-relaxed text-slate-500 text-left mt-6">
            <h4 className="font-bold font-fredoka text-slate-800 flex items-center gap-1 mb-1 text-xs">
              💡 Store tip:
            </h4>
            Add more premium GOTS items to baby clothing and toys categories to attract high-value nursery packages!
          </div>
        </div>

      </div>

      {/* Recent Orders table */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-4">
          <h3 className="font-bold text-sm font-fredoka text-slate-800">Recent Store Orders</h3>
          <button 
            onClick={() => navigate('/admin/orders')}
            className="text-[10px] font-bold font-fredoka text-babyPink-dark hover:text-babyPink flex items-center gap-1"
          >
            Manage All Orders <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No simulated orders placed yet. Place an order on the checkout page to view it here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4 text-center">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-slate-55 hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-800 font-fredoka">{order.id}</td>
                    <td className="py-3 px-4 text-slate-500">{order.date}</td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-700">{order.customerName}</p>
                      <p className="text-[10px] text-slate-400">{order.email}</p>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-500">
                      {order.items?.reduce((sum, i) => sum + i.quantity, 0) || 0}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">${order.total.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        order.status === 'Shipped' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        order.status === 'Cancelled' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                        'bg-yellow-50 text-yellow-600 border border-yellow-100'
                      }`}>
                        {order.status}
                      </span>
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
