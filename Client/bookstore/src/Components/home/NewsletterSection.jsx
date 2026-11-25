import React, { useState } from 'react';
import toast from 'react-hot-toast';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    toast.success('Welcome to the Chapter & Chai Circle! 📜☕');
    setEmail('');
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-[#24130d] text-[#f7ece0] p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl border border-[#3e2418]">
        {/* Subtle botanical leaves watermark accent */}
        <div className="absolute -top-10 -left-10 w-48 h-48 opacity-10 pointer-events-none text-6xl">
          🌿
        </div>

        {/* Tilted Kraft Paper Tag */}
        <div className="absolute -top-1 sm:top-5 right-4 sm:right-10 transform rotate-6 z-20">
          <div className="bg-[#f1dfbf] text-[#341d13] px-4 py-2 rounded-lg font-serif font-bold text-xs sm:text-sm shadow-xl border-2 border-dashed border-[#b68f54] flex items-center gap-1.5 animate-bounce">
            <span>🏷️</span>
            <span>Get 10% off on your first order!</span>
          </div>
        </div>

        <div className="relative z-10 max-w-2xl">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#fdfbf7]"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Stay in the Loop
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#d8c3b0] font-light leading-relaxed">
            Join our newsletter for new arrivals, reading lists, quiet Sunday recommendations, and exclusive bookstore offers.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-7 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-[#fffdf9] text-[#2a1710] placeholder-[#8c7468] rounded-xl sm:rounded-2xl py-3.5 pl-11 pr-4 text-sm sm:text-base border border-transparent focus:border-[#d49a3d] focus:outline-none shadow-inner"
              />
              <svg
                className="w-5 h-5 text-[#8c7468] absolute left-3.5 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <button
              type="submit"
              className="px-6 sm:px-8 py-3.5 rounded-xl sm:rounded-2xl bg-[#8b2e23] hover:bg-[#a13529] text-white font-bold text-sm sm:text-base shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              {subscribed ? 'Subscribed! ☕' : 'Join Newsletter'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

