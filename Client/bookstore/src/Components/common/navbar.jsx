import React, { useState } from 'react';
import { Logo } from './Logo';

export const Navbar = ({
  cartCount = 0,
  onCategoryChange,
  onCartClick,
  onProfileClick,
  onHomeClick,
  searchQuery = '',
  onSearchChange,
  onNavigateSection,
}) => {
  const [isBooksMenuOpen, setIsBooksMenuOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const genres = [
    { id: 'all', name: 'All Books' },
    { id: 'biography', name: 'Biography' },
    { id: 'fiction', name: 'Fiction' },
    { id: 'motivation', name: 'Motivation' },
    { id: 'mythology', name: 'Mythology' },
    { id: 'children', name: 'Children' },
    { id: 'science', name: 'Science' },
  ];

  const collections = [
    { id: 'new-releases', name: 'New Releases', category: 'all' },
    { id: 'classics', name: 'Classics', category: 'fiction' },
    { id: 'gift-editions', name: 'Gift Editions', category: 'mythology' },
    { id: 'staff-picks', name: 'Staff Picks', category: 'biography' },
  ];

  const handleNavClick = (sectionId) => {
    onHomeClick();
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] w-full select-none shadow-xs">
      {/* 1. Slim Announcement Bar - matches mockup */}
      <div className="bg-[#2c120c] text-[#f7ede2] text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide border-b border-[#3d1a12]">
        <div className="flex items-center justify-center gap-2">
          <span>🚚</span>
          <span>Free Shipping on Orders Above ₹799</span>
          <span className="text-[#a47b64] mx-1 opacity-70">|</span>
          <span>New Arrivals Every Week</span>
        </div>
      </div>

      {/* 2. Main Parchment Navbar - exact color #f6eee3 blending seamlessly with exact logo */}
      <nav className="bg-[#f6eee3] border-b border-[#decab3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[64px] gap-2 sm:gap-4">
            
            {/* Left: Vintage Brand Logo */}
            <div onClick={onHomeClick} className="cursor-pointer shrink-0 py-1">
              <Logo size="normal" />
            </div>

            {/* Center: Clean Literary Nav Links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {/* Home with rust red underline */}
              <button
                onClick={onHomeClick}
                className="relative py-1 text-sm font-semibold text-[#2a1710] hover:text-[#7a251c] transition-colors"
              >
                <span>Home</span>
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#7a251c] rounded-full"></span>
              </button>

              {/* Books ▾ */}
              <div
                className="relative"
                onMouseEnter={() => setIsBooksMenuOpen(true)}
                onMouseLeave={() => setIsBooksMenuOpen(false)}
              >
                <button
                  className="flex items-center gap-1 py-1 text-sm font-medium text-[#3b271d] hover:text-[#7a251c] transition-colors"
                >
                  <span>Books</span>
                  <svg className="w-3 h-3 text-[#735c4f]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isBooksMenuOpen && (
                  <div className="absolute top-full -left-2 w-48 bg-[#fffdfa] border border-[#e2d4c3] shadow-lg rounded-xl p-2 z-50 animate-in fade-in duration-100">
                    {genres.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => {
                          onCategoryChange(genre.id);
                          setIsBooksMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs font-medium text-[#2a1710] hover:bg-[#f4ebe1] hover:text-[#7a251c] rounded-lg transition-colors"
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Collections ▾ */}
              <div
                className="relative"
                onMouseEnter={() => setIsCollectionsOpen(true)}
                onMouseLeave={() => setIsCollectionsOpen(false)}
              >
                <button
                  onClick={() => handleNavClick('collections-section')}
                  className="flex items-center gap-1 py-1 text-sm font-medium text-[#3b271d] hover:text-[#7a251c] transition-colors"
                >
                  <span>Collections</span>
                  <svg className="w-3 h-3 text-[#735c4f]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isCollectionsOpen && (
                  <div className="absolute top-full -left-2 w-52 bg-[#fffdfa] border border-[#e2d4c3] shadow-lg rounded-xl p-2 z-50 animate-in fade-in duration-100">
                    {collections.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onCategoryChange(item.category);
                          setIsCollectionsOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs font-medium text-[#2a1710] hover:bg-[#f4ebe1] hover:text-[#7a251c] rounded-lg transition-colors"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavClick('catalog-section')}
                className="py-1 text-sm font-medium text-[#3b271d] hover:text-[#7a251c] transition-colors"
              >
                New Releases
              </button>

              <button
                onClick={() => handleNavClick('about-section')}
                className="py-1 text-sm font-medium text-[#3b271d] hover:text-[#7a251c] transition-colors"
              >
                About
              </button>
            </div>

            {/* Right: Search Input + Profile + Shopping Cart */}
            <div className="flex items-center gap-3 sm:gap-4">
              
              {/* Rounded pill search bar with magnifying glass */}
              <div className="relative w-40 sm:w-56 md:w-64">
                <input
                  type="text"
                  placeholder="Search books, authors, genres..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                  className="w-full bg-[#fffdfa] border border-[#dfcfbd] rounded-full py-1.5 pl-8 pr-3 text-[11px] sm:text-xs text-[#2a1710] placeholder-[#8c7468] outline-none focus:border-[#7a251c] transition-colors shadow-2xs"
                />
                <svg
                  className="w-3.5 h-3.5 text-[#735c4f] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
              </div>

              {/* Minimal Line Outline Profile Icon */}
              <button
                onClick={onProfileClick}
                className="p-1 text-[#2a1710] hover:text-[#7a251c] transition-colors"
                title="Account"
                aria-label="Account profile"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.65"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </button>

              {/* Minimal Line Outline Shopping Cart Icon with Red Badge */}
              <button
                onClick={onCartClick}
                className="relative p-1 text-[#2a1710] hover:text-[#7a251c] transition-colors"
                title="Shopping Cart"
                aria-label="Shopping Cart"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.65"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                {/* Red Circular Badge */}
                <span className="absolute -top-1 -right-1.5 bg-[#8b2e23] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1 text-[#2a1710]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#fffdfa] border-t border-[#e2d4c3] px-4 py-3 space-y-2 text-xs">
            <button
              onClick={() => {
                onHomeClick();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1.5 font-semibold text-[#7a251c]"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('catalog-section')}
              className="block w-full text-left py-1.5 text-[#3b271d]"
            >
              All Books
            </button>
            <button
              onClick={() => handleNavClick('collections-section')}
              className="block w-full text-left py-1.5 text-[#3b271d]"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('about-section')}
              className="block w-full text-left py-1.5 text-[#3b271d]"
            >
              About
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
