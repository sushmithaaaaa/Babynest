import React, { useState } from 'react';
import { Search, Eye, X, ShieldAlert, Award } from 'lucide-react';

export default function AdminOrders({ orders, setOrders }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Header Title */}
      <div>
        <h2 className="text-2xl font-extrabold font-fredoka text-slate-800">Order Management</h2>
        <p className="text-xs text-slate-450 mt-1">Monitor simulated checkouts and dispatch statuses.</p>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input 
            type="text" 
            placeholder="Search order ID, email, name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-full pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-babyPink focus:bg-white transition-all font-semibold"
          />
        </div>

        {/* Status select */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-50 border border-slate-100 rounded-full px-4 py-2 text-xs font-semibold text-slate-650 focus:outline-none focus:ring-2 focus:ring-babyPink transition-all w-full sm:w-auto"
        >
          <option value="all">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-450">
            No simulated orders found. Place an order on the cart checkout page to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase bg-slate-50/50">
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6 text-center">Items Count</th>
                  <th className="py-4 px-6">Total Price</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-55 hover:bg-slate-50/50 transition-colors">
                    
                    {/* ID */}
                    <td className="py-4 px-6 font-bold text-slate-800 font-fredoka">{order.id}</td>
                    
                    {/* Date */}
                    <td className="py-4 px-6 text-slate-500">{order.date}</td>

                    {/* Customer */}
                    <td className="py-4 px-6">
                      <p className="font-semibold text-slate-700">{order.customerName}</p>
                      <p className="text-[10px] text-slate-405">{order.email}</p>
                    </td>

                    {/* Quantity */}
                    <td className="py-4 px-6 text-center font-bold text-slate-500">
                      {order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0}
                    </td>

                    {/* Total */}
                    <td className="py-4 px-6 font-bold text-slate-800">${order.total.toFixed(2)}</td>

                    {/* Status Select */}
                    <td className="py-4 px-6">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        className={`text-[10px] font-bold rounded-full px-2.5 py-1 border focus:outline-none cursor-pointer ${
                          order.status === 'Delivered' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' :
                          order.status === 'Shipped' ? 'bg-blue-50 border-blue-200 text-blue-600' :
                          order.status === 'Cancelled' ? 'bg-rose-50 border-rose-200 text-rose-600' :
                          order.status === 'Processing' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' :
                          'bg-yellow-55 border-yellow-205 text-yellow-600'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* View Details */}
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 rounded-lg text-slate-450 hover:text-babyPink-dark hover:bg-pink-50 transition-all"
                        title="View order details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setSelectedOrder(null)}></div>

          {/* Modal Container */}
          <div className="relative bg-white rounded-[40px] shadow-2xl overflow-hidden max-w-lg w-full border border-slate-100 p-8 transform transition-all animate-float">
            
            {/* Close */}
            <button 
              onClick={() => setSelectedOrder(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-105 text-slate-450 hover:bg-slate-205 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-extrabold font-fredoka text-slate-800 border-b border-slate-50 pb-3 mb-6">
              Order Receipt: <span className="text-babyPink-dark">{selectedOrder.id}</span>
            </h3>

            {/* Customer info */}
            <div className="mb-6 space-y-2 text-xs font-semibold text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase font-fredoka">Customer Information</p>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-1">
                <p><span className="text-slate-400">Name:</span> {selectedOrder.customerName}</p>
                <p><span className="text-slate-400">Email:</span> {selectedOrder.email}</p>
                <p><span className="text-slate-400">Checkout Date:</span> {selectedOrder.date}</p>
                <p className="flex items-center gap-1.5 mt-2">
                  <span className="text-slate-400">Dispatch:</span> 
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    selectedOrder.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                    selectedOrder.status === 'Shipped' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                    selectedOrder.status === 'Cancelled' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                    'bg-yellow-50 text-yellow-600 border border-yellow-100'
                  }`}>
                    {selectedOrder.status}
                  </span>
                </p>
              </div>
            </div>

            {/* Items list */}
            <div className="space-y-2 text-left mb-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase font-fredoka">Items Breakdown</p>
              <div className="max-h-48 overflow-y-auto space-y-3 pr-2">
                {selectedOrder.items?.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0 last:pb-0 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.emoji || '🍼'}</span>
                      <div>
                        <p className="font-bold text-slate-800 font-fredoka truncate max-w-[180px]">{item.name}</p>
                        <p className="text-[10px] text-slate-450">${item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-800">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Receipt calculation */}
            <div className="border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500 space-y-1.5 text-right">
              {selectedOrder.discount > 0 && (
                <p className="text-emerald-600 font-bold">Coupon Applied: -${selectedOrder.discount.toFixed(2)}</p>
              )}
              <p>Simulated Shipping: {selectedOrder.shipping === 0 ? 'Free' : `$${selectedOrder.shipping.toFixed(2)}`}</p>
              <p>Simulated Taxes (8%): ${selectedOrder.tax.toFixed(2)}</p>
              <p className="text-sm font-bold text-slate-800 border-t border-slate-50 pt-2 mt-2 font-fredoka">
                Receipt Paid Total: <span className="text-babyPink-dark text-base font-fredoka">${selectedOrder.total.toFixed(2)}</span>
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
