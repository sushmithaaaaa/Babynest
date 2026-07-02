import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function AdminCustomers({ orders }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function fetchCustomers() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }
        setCustomers(data || []);
      } catch (err) {
        console.error('Error fetching customers:', err);
        setErrorMsg('Could not load customers from Supabase. Make sure the customers table exists.');
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  // Calculate stats from orders placed dynamically and add/update customers
  const finalCustomersList = customers.map(cust => {
    // Find all orders for this customer by email
    const customerOrders = orders.filter(o => o.email?.toLowerCase() === cust.email?.toLowerCase());
    const ordersCount = customerOrders.length;
    const totalSpent = customerOrders.reduce((sum, o) => sum + o.total, 0);
    
    // Format join date nicely
    const joinDate = cust.created_at
      ? new Date(cust.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : 'N/A';

    const location = [cust.city, cust.state].filter(Boolean).join(', ') || '';

    return {
      id: cust.id,
      name: cust.full_name || 'Unnamed Customer',
      email: cust.email,
      phone: cust.phone || '',
      location: location,
      ordersCount,
      totalSpent,
      joinDate,
      status: ordersCount > 0 ? 'Active' : 'New'
    };
  });

  // Filter list
  const filteredCustomers = finalCustomersList.filter(cust => 
    cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cust.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 text-left">
      
      {/* Title Header */}
      <div>
        <h2 className="text-2xl font-extrabold font-fredoka text-slate-800">Customer Base</h2>
        <p className="text-xs text-slate-450 mt-1">Review profiles, shopping behavior, and total life expenditures.</p>
      </div>

      {/* Toolbar Search */}
      <div className="bg-white rounded-3xl border border-slate-105 p-4 shadow-xs">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input 
            type="text" 
            placeholder="Search name, email, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-full pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-babyPink focus:bg-white transition-all font-semibold"
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-24 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-babyPink animate-spin" />
            <span className="font-fredoka font-semibold">Loading Customer Profiles...</span>
          </div>
        ) : errorMsg ? (
          <div className="py-16 text-center text-xs text-rose-500 bg-rose-50/50 m-4 rounded-2xl border border-rose-100 font-semibold p-4">
            ⚠️ {errorMsg}
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-450">
            No shopper profiles match search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase bg-slate-50/50">
                  <th className="py-4 px-6">Customer ID</th>
                  <th className="py-4 px-6">Profile</th>
                  <th className="py-4 px-6 text-center">Orders Count</th>
                  <th className="py-4 px-6">Total Spent</th>
                  <th className="py-4 px-6">Join Date</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="border-b border-slate-55 hover:bg-slate-50/50 transition-colors">
                    
                    {/* ID */}
                    <td className="py-4 px-6 font-bold text-slate-800 font-fredoka" title={cust.id}>
                      {cust.id ? `${cust.id.substring(0, 8)}...` : 'N/A'}
                    </td>
                    
                    {/* Profile */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-100 text-babyPink-dark flex items-center justify-center font-bold text-xs shrink-0">
                        {cust.name ? cust.name[0].toUpperCase() : '?'}
                      </div>
                      <div>
                        <p className="font-bold text-slate-805 font-fredoka">{cust.name}</p>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-350" /> {cust.email}
                          {cust.phone && <span className="text-slate-300">|</span>}
                          {cust.phone && <span className="flex items-center gap-0.5"><Phone className="w-3 h-3 text-slate-350" /> {cust.phone}</span>}
                        </p>
                        {cust.location && (
                          <p className="text-[9px] text-slate-400 flex items-center gap-0.5 mt-0.5 font-medium">
                            <MapPin className="w-3 h-3 text-slate-350" /> {cust.location}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Orders count */}
                    <td className="py-4 px-6 text-center font-bold text-slate-500">
                      {cust.ordersCount}
                    </td>

                    {/* Total spent */}
                    <td className="py-4 px-6 font-bold text-slate-800">
                      ${cust.totalSpent.toFixed(2)}
                    </td>

                    {/* Join date */}
                    <td className="py-4 px-6 text-slate-500">{cust.joinDate}</td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        cust.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                          : cust.status === 'New'
                          ? 'bg-sky-50 text-sky-600 border border-sky-100'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}>
                        {cust.status}
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
