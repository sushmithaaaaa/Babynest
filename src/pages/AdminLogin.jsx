import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, KeyRound, Sparkles } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password.trim() === 'admin123') {
      localStorage.setItem('babynest_admin_authenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setErrorMsg('Invalid administrator credentials.');
    }
  };

  const handleDemoUnlock = () => {
    localStorage.setItem('babynest_admin_authenticated', 'true');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-100 via-purple-100 to-blue-100 p-4 font-sans selection:bg-pink-100 selection:text-pink-650">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-[40px] p-8 md:p-10 shadow-2xl border border-white flex flex-col justify-between relative overflow-hidden animate-float">
        {/* Visual elements */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-babyPink/25 rounded-full filter blur-xl"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-babyBlue/20 rounded-full filter blur-xl"></div>

        <div>
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-babyPink to-babyPurple flex items-center justify-center text-white font-fredoka text-3xl font-bold shadow-lg shadow-pink-100/50 mx-auto">
              👶
            </div>
            <h2 className="text-2xl font-extrabold font-fredoka text-slate-805 mt-4">
              BabyNest Admin Panel
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Authorized personnel secure sign-in portal.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3 bg-red-50 border border-red-150 rounded-2xl text-red-700 text-xs font-semibold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-medium text-left">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1 font-fredoka">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-full px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-babyPink focus:bg-white transition-all text-xs font-semibold"
                placeholder="Enter admin username"
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1 font-fredoka">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-full px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-babyPink focus:bg-white transition-all text-xs font-semibold"
                placeholder="Enter password"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all tracking-wider text-xs font-fredoka uppercase mt-6 flex items-center justify-center gap-2"
            >
              Sign In <KeyRound className="w-4.5 h-4.5" />
            </button>
          </form>
        </div>

        {/* Demo shortcut */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400">
            For demonstration, you can bypass directly:
          </p>
          <button 
            onClick={handleDemoUnlock}
            className="mt-2 text-xs font-bold text-babyPink-dark hover:text-babyPink flex items-center justify-center gap-1 mx-auto font-fredoka"
          >
            <Sparkles className="w-3.5 h-3.5" /> Fast Demo Access
          </button>
        </div>

      </div>
    </div>
  );
}
