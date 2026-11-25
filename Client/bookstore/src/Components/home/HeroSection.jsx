import React from 'react';
import cleanHeroBg from '../../Assets/chapter_and_chai_clean_bg.png';
import ribbonBrush from '../../Assets/ribbon_brush_exact.png';

export const HeroSection = ({ onShopNowClick, onBrowsePicksClick }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#162a22]">
      {/* 
        Hero Container:
        Displays the clean, unedited bookstore background at its native 1672x650 aspect ratio (2.57:1).
        All typography, painted brush ribbon, description, and buttons are fully coded in React/Tailwind.
      */}
      <div className="relative w-full max-w-[1920px] mx-auto select-none">
        {/* Clean Background Image (Storefront on left, clean green wall center, lamp & chai on right) */}
        <img
          src={cleanHeroBg}
          alt="Chapter & Chai Bookstore"
          className="w-full h-auto block select-none pointer-events-none"
        />

        {/* 
          Coded Content Overlay:
          Anchored at 68% from the left to center directly over the dark green wall,
          identically matching the design reference.
        */}
        <div className="absolute left-[68%] -translate-x-1/2 top-[50%] -translate-y-[52%] w-[38%] max-w-[480px] flex flex-col items-center text-center z-10 px-1 sm:px-2">
          
          {/* Coded Grand Heading */}
          <h1
            className="font-serif font-bold text-[#fffdfa] leading-[1.04] tracking-tight text-[clamp(1.2rem,3.2vw,3.6rem)] drop-shadow-sm select-none"
            style={{ fontFamily: '"Playfair Display", "DM Serif Display", Georgia, serif' }}
          >
            Chapter & Chai
          </h1>

          {/* Painted Golden Ribbon Banner */}
          <div className="my-[clamp(0.3rem,0.95vw,1.1rem)] w-[88%] max-w-[340px]">
            <img
              src={ribbonBrush}
              alt="Books • Conversations • Chai"
              className="w-full h-auto object-contain mx-auto select-none pointer-events-none drop-shadow-xs"
            />
          </div>

          {/* Coded Subtitle */}
          <p className="text-[#f5eadc] font-light text-[clamp(0.6rem,1.05vw,1.02rem)] leading-relaxed max-w-[420px] mx-auto select-none drop-shadow-xs">
            A cozy online bookstore inspired by India's classic book lanes — where every book finds a reader, and every reader finds a story.
          </p>

          {/* Coded CTA Buttons */}
          <div className="mt-[clamp(0.45rem,1.25vw,1.5rem)] flex items-center justify-center gap-[clamp(0.35rem,0.85vw,1rem)]">
            
            {/* Primary: Shop Now */}
            <button
              onClick={onShopNowClick}
              className="inline-flex items-center gap-1.5 px-[clamp(0.7rem,1.4vw,1.5rem)] py-[clamp(0.4rem,0.72vw,0.75rem)] rounded-md sm:rounded-lg bg-[#7a2219] hover:bg-[#8f281e] text-[#fffdfa] font-semibold text-[clamp(0.62rem,0.88vw,0.88rem)] shadow-md transition-all duration-200 border border-[#9c362b]/70 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span>Shop Now</span>
              <span className="text-[1.1em] leading-none">→</span>
            </button>

            {/* Secondary: Browse Curated Picks */}
            <button
              onClick={onBrowsePicksClick}
              className="inline-flex items-center gap-1.5 px-[clamp(0.65rem,1.3vw,1.45rem)] py-[clamp(0.4rem,0.72vw,0.75rem)] rounded-md sm:rounded-lg bg-black/30 hover:bg-black/50 text-[#fffdfa] font-semibold text-[clamp(0.62rem,0.88vw,0.88rem)] transition-all duration-200 border border-white/60 backdrop-blur-2xs transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <span>Browse Curated Picks</span>
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};
