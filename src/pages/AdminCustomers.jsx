import React, { useState } from 'react';
import { Search, Mail, UserCheck } from 'lucide-react';

export default function AdminCustomers({ orders }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Default mock base customers
  const defaultCustomers = [
    { id: 'CUST-308', name: 'Eleanor Vance', email: 'eleanor.vance@example.com', ordersCount: 0, totalSpent: 0, joinDate: 'Jan 12, 2026', status: 'Active' },
    { id: 'CUST-104', name: 'Liam Henderson', email: 'liam.henderson@example.com', ordersCount: 1, totalSpent: 124.50, joinDate: 'Feb 18, 2026', status: 'Active' },
    { id: 'CUST-912', name: 'Ava Montgomery', email: 'ava.m@example.com', ordersCount: 3, totalSpent: 412.90, joinDate: 'Mar 03, 2026', status: 'Active' },
    { id: 'CUST-205', name: 'James Peterson', email: 'james.p@example.com', ordersCount: 0, totalSpent: 0, joinDate: 'Apr 21, 2026', status: 'Inactive' },
    { id: 'CUST-588', name: 'Sophia Sterling', email: 'sophia.s@example.com', ordersCount: 2, totalSpent: 218.40, joinDate: 'May 04, 2026', status: 'Active' }
  ];

  // Calculate stats from orders placed dynamically and add/update customers
  const customerMap = {};
  defaultCustomers.forEach(cust => {
    customerMap[cust.email] = { ...cust };
  });

  orders.forEach(order => {
    const email = order.email;
    if (customerMap[email]) {
      customerMap[email].ordersCount += 1;
      customerMap[email].totalSpent += order.total;
      customerMap[email].status = 'Active';
    } else {
      // New dynamic customer from live checkout
      const randomId = 'CUST-' + Math.floor(100 + Math.random() * 900);
      customerMap[email] = {
        id: randomId,
        name: order.customerName,
        email: email,
        ordersCount: 1,
        totalSpent: order.total,
        joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        status: 'Active'
      };
    }
  });

  const finalCustomersList = Object.values(customerMap);

  // Filter list
  const filteredCustomers = finalCustomersList.filter(cust => 
    cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cust.email.toLowerCase().includes(searchQuery.toLowerCase())
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
            placeholder="Search name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-full pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-babyPink focus:bg-white transition-all font-semibold"
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        {filteredCustomers.length === 0 ? (
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
                    <td className="py-4 px-6 font-bold text-slate-800 font-fredoka">{cust.id}</td>
                    
                    {/* Profile */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-100 text-babyPink-dark flex items-center justify-center font-bold text-xs">
                        {cust.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-805 font-fredoka">{cust.name}</p>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-350" /> {cust.email}
                        </p>
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
