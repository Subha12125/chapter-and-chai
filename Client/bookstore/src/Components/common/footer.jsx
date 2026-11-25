import React from 'react';
import { Logo } from './Logo';

export const Footer = ({ onNavigateCategory, onSellerClick }) => {
  return (
    <footer className="bg-[#fbf7f0] border-t border-[#ebdcc2] pt-14 pb-8 text-[#4a352a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-[#ebdcc2]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Logo size="large" />
            <p className="mt-3 text-sm text-[#735c4f] font-serif italic max-w-sm leading-relaxed">
              Books for modern readers, with an old-world soul. Inspired by the classic book lanes and quiet chai corners of India.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { name: 'Instagram', icon: '📸' },
                { name: 'YouTube', icon: '🎥' },
                { name: 'Facebook', icon: '📖' },
                { name: 'X', icon: '𝕏' },
              ].map((s) => (
                <button
                  key={s.name}
                  aria-label={s.name}
                  className="w-9 h-9 rounded-full bg-[#f4ebe1] hover:bg-[#8b2e23] hover:text-white border border-[#dfceba] flex items-center justify-center text-xs transition-colors"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#2a1710] uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#664f43]">
              <li>
                <button onClick={() => onNavigateCategory && onNavigateCategory('all')} className="hover:text-[#8b2e23] transition-colors">
                  All Books
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory && onNavigateCategory('fiction')} className="hover:text-[#8b2e23] transition-colors">
                  New Releases
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory && onNavigateCategory('biography')} className="hover:text-[#8b2e23] transition-colors">
                  Bestsellers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory && onNavigateCategory('mythology')} className="hover:text-[#8b2e23] transition-colors">
                  Gift Editions
                </button>
              </li>
            </ul>
          </div>

          {/* Collections Column */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#2a1710] uppercase tracking-wider mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#664f43]">
              <li>
                <button onClick={() => onNavigateCategory && onNavigateCategory('fiction')} className="hover:text-[#8b2e23] transition-colors">
                  Classics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory && onNavigateCategory('biography')} className="hover:text-[#8b2e23] transition-colors">
                  Staff Picks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory && onNavigateCategory('science')} className="hover:text-[#8b2e23] transition-colors">
                  By Genre
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory && onNavigateCategory('motivation')} className="hover:text-[#8b2e23] transition-colors">
                  By Mood
                </button>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#2a1710] uppercase tracking-wider mb-4">
              Help
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#664f43]">
              <li>
                <span className="hover:text-[#8b2e23] cursor-pointer transition-colors">
                  Orders & Delivery
                </span>
              </li>
              <li>
                <span className="hover:text-[#8b2e23] cursor-pointer transition-colors">
                  Returns & Refunds
                </span>
              </li>
              <li>
                <span className="hover:text-[#8b2e23] cursor-pointer transition-colors">
                  FAQs
                </span>
              </li>
              <li>
                <span className="hover:text-[#8b2e23] cursor-pointer transition-colors">
                  Contact Us
                </span>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#2a1710] uppercase tracking-wider mb-4">
              About
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#664f43]">
              <li>
                <span className="hover:text-[#8b2e23] cursor-pointer transition-colors">
                  Our Story
                </span>
              </li>
              <li>
                <span className="hover:text-[#8b2e23] cursor-pointer transition-colors">
                  Literary Journal
                </span>
              </li>
              <li>
                <span className="hover:text-[#8b2e23] cursor-pointer transition-colors">
                  Careers
                </span>
              </li>
              {onSellerClick && (
                <li>
                  <button onClick={onSellerClick} className="text-[#8b2e23] font-semibold hover:underline">
                    Seller Portal
                  </button>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8c7468]">
          <p>© {new Date().getFullYear()} Chapter & Chai Bookstore. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#2a1710] cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#2a1710] cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-[#2a1710] cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

