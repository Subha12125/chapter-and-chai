import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/authContext';
import { Logo } from '../common/Logo';

export const SellerLogin = ({ onLoginSuccess, onBackToStore }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login, isLoading: authLoading } = useAuth();
  const [localLoading, setLocalLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalLoading(true);

    const result = await login(credentials.email, credentials.password);

    if (result.success) {
      if (result.user.role === 'admin') {
        toast.success('Welcome back, Bookseller! 📜☕');
        onLoginSuccess();
      } else {
        toast.error('Access restricted to verified storekeepers');
      }
    } else {
      toast.error(result.error || 'Invalid Bookseller Credentials');
    }

    setLocalLoading(false);
  };

  const isLoading = authLoading || localLoading;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-[#fffdf9] rounded-3xl shadow-xl border border-[#ebdcc2] p-8 sm:p-10">
        <div className="text-center mb-8">
          <Logo size="normal" showEstd={false} className="justify-center mb-4" />
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#2a1710] font-serif"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Bookseller <span className="text-[#8b2e23]">Portal</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#735c4f] mt-1.5 font-light">
            Authorized bookstore management & inventory access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#664f43] mb-1.5">
              Bookseller Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-[#faf6ef] border border-[#dfcaa9] text-sm text-[#2a1710] focus:bg-white focus:border-[#8b2e23] transition-all outline-none"
              placeholder="bookseller@chapterandchai.in"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#664f43] mb-1.5">
              Secret Passkey
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-[#faf6ef] border border-[#dfcaa9] text-sm text-[#2a1710] focus:bg-white focus:border-[#8b2e23] transition-all outline-none"
              placeholder="••••••••"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#2a1710] hover:bg-[#8b2e23] text-white font-bold py-3.5 rounded-xl shadow-md transition-all transform active:scale-95 text-sm sm:text-base ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Verifying Ledger...' : 'Access Inventory Dashboard'}
          </button>
        </form>

        <button
          onClick={onBackToStore}
          className="w-full mt-5 text-xs sm:text-sm font-semibold text-[#8c7468] hover:text-[#8b2e23] transition-colors"
        >
          ← Return to Storefront
        </button>

        {/* Demo credentials badge */}
        <div className="mt-8 p-4 bg-[#fbf7f0] rounded-2xl border border-[#ebdcc2]">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] font-bold text-[#8b2e23] uppercase tracking-wider">
              Demo Access Credentials
            </p>
            <button
              onClick={() => setCredentials({ email: 'admin@gmail.com', password: 'admin' })}
              className="text-[10px] bg-[#8b2e23] text-white px-2.5 py-1 rounded-md hover:bg-[#a13529] transition-colors font-bold uppercase tracking-wider"
            >
              Fill Demo
            </button>
          </div>
          <div className="space-y-1 text-xs text-[#523d32] font-mono">
            <p className="flex justify-between">
              <span className="text-[#8c7468]">Email:</span>
              <span className="font-semibold">admin@gmail.com</span>
            </p>
            <p className="flex justify-between">
              <span className="text-[#8c7468]">Password:</span>
              <span className="font-semibold">admin</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
