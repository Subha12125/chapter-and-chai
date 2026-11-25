import React, { useState } from 'react';
import { useAuth } from '../../Context/authContext';
import { Logo } from '../common/Logo';

export const Login = ({ onSwitchToRegister, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [localError, setLocalError] = useState('');
  const { login, isLoading, error: authError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!formData.email || !formData.password) {
      setLocalError('Please enter both your email and password');
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      setFormData({ email: '', password: '' });
      if (onLoginSuccess) onLoginSuccess();
    } else {
      setLocalError(result.error || 'Login failed. Please check credentials.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-[#fffdf9] rounded-3xl shadow-xl border border-[#ebdcc2] p-8 sm:p-10">
        <div className="flex flex-col items-center text-center mb-8">
          <Logo size="normal" showEstd={false} className="mb-4" />
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#2a1710] font-serif"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Welcome Back, <span className="text-[#8b2e23]">Reader</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#735c4f] mt-1.5 font-light">
            Sign in to access your saved books, tote, and orders
          </p>
        </div>

        {(localError || authError) && (
          <div className="mb-6 p-4 bg-[#fbf4f3] text-[#8b2e23] text-xs font-semibold rounded-2xl border border-[#edd5d2]">
            {localError || authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#664f43] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-[#faf6ef] border border-[#dfcaa9] text-sm text-[#2a1710] focus:bg-white focus:border-[#8b2e23] transition-all outline-none"
              placeholder="reader@bookclub.in"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#664f43] mb-1.5">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-[#faf6ef] border border-[#dfcaa9] text-sm text-[#2a1710] focus:bg-white focus:border-[#8b2e23] transition-all outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#8b2e23] hover:bg-[#a13529] text-white font-bold py-3.5 rounded-xl shadow-md shadow-[#8b2e23]/25 transition-all transform active:scale-95 text-sm sm:text-base ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Verifying...' : 'Sign In to Bookshelf'}
          </button>
        </form>

        <p className="text-center mt-8 text-xs sm:text-sm text-[#735c4f]">
          First time visiting?
          <button
            onClick={onSwitchToRegister}
            className="ml-2 text-[#8b2e23] font-bold hover:underline"
          >
            Create Reader Membership
          </button>
        </p>
      </div>
    </div>
  );
};
