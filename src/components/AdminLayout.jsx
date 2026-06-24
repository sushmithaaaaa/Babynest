import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, MessageSquare, 
  Store, LogOut, Menu, X, Baby 
} from 'lucide-react';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('babynest_admin_authenticated');
    navigate('/admin/login');
  };

  const navItems = [
    { path: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: 'products', label: 'Products', icon: Package },
    { path: 'orders', label: 'Orders', icon: ShoppingCart },
    { path: 'customers', label: 'Customers', icon: Users },
    { path: 'reviews', label: 'Reviews', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row text-slate-700 selection:bg-pink-100 selection:text-pink-600">
      
      {/* Mobile Top Navbar */}
      <header className="lg:hidden bg-slate-900 text-white h-16 px-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-babyPink flex items-center justify-center text-sm">👶</div>
          <span className="font-fredoka text-lg font-bold">BabyNest Admin</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 rounded-lg bg-slate-800 text-slate-350 hover:bg-slate-700 transition-colors"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out shrink-0
        lg:translate-x-0 lg:static lg:h-screen
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Logo / Title */}
          <div className="hidden lg:flex items-center gap-3 mb-8 border-b border-slate-800 pb-5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-babyPink to-babyPurple flex items-center justify-center text-white text-lg font-bold">
              👶
            </div>
            <div>
              <h1 className="font-fredoka text-base font-bold text-white leading-tight">BabyNest</h1>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Admin Control</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200
                    ${isActive 
                      ? 'bg-babyPink text-white shadow-md shadow-pink-900/10' 
                      : 'hover:bg-slate-800 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-4.5 h-4.5 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="space-y-2 border-t border-slate-800 pt-5 mt-auto">
          {/* Back to store */}
          <NavLink
            to="/products"
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold hover:bg-slate-800 hover:text-white transition-all"
          >
            <Store className="w-4 h-4 shrink-0" />
            <span>Go to Storefront</span>
          </NavLink>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold text-rose-400 hover:bg-rose-950/20 hover:text-rose-350 transition-all text-left"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile menu */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        ></div>
      )}

      {/* Main View Area */}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto p-4 sm:p-6 lg:p-10">
        <Outlet />
      </main>

    </div>
  );
}
