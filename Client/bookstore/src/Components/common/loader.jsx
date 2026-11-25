import React from 'react';

export const Loader = ({ isLoading = false, message = 'Opening the bookstore...' }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#faf6ef]/92 backdrop-blur-md transition-all duration-300 select-none">
      <div className="relative flex flex-col items-center p-8 rounded-3xl bg-[#fffdf9]/95 border border-[#ebdcc2] shadow-2xl max-w-sm w-full mx-4 text-center">
        
        {/* Animated Vintage Book & Steaming Chai Icon */}
        <div className="relative w-32 h-28 flex items-center justify-center mb-6">
          
          {/* Ambient warm lamp glow behind the book */}
          <div className="absolute w-24 h-24 bg-[#d49a3d]/20 rounded-full blur-xl -top-2"></div>

          {/* Steaming Chai Cup */}
          <div className="absolute -top-3 z-30 flex flex-col items-center">
            {/* Animated Steam */}
            <div className="flex gap-1.5 h-6 mb-0.5 items-end">
              <span className="w-1 bg-[#d49a3d] rounded-full animate-steam-1 opacity-70"></span>
              <span className="w-1 bg-[#d49a3d] rounded-full animate-steam-2 opacity-80"></span>
              <span className="w-1 bg-[#d49a3d] rounded-full animate-steam-3 opacity-70"></span>
            </div>

            {/* Little Terracotta Kulhad */}
            <div className="relative">
              <div className="w-7 h-6 bg-[#9c422b] rounded-b-md border-t-2 border-[#d49a3d] shadow-sm flex items-center justify-center">
                <span className="text-[7px] text-[#f7ece0] font-serif font-bold">☕</span>
              </div>
            </div>
          </div>

          {/* 3D Open Book with Flipping Pages */}
          <div className="book-stage relative w-28 h-20 mt-6">
            
            {/* Left Cover (Base) */}
            <div className="absolute left-1 top-2 w-[52px] h-[64px] bg-[#7a2219] rounded-l-md shadow-md border-l-2 border-[#54150f] flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-[#fcf8f2] rounded-l-sm m-1 p-1.5 flex flex-col gap-1 border-r border-[#ebdcc2]">
                <div className="w-full h-[2px] bg-[#dfcbb1] rounded"></div>
                <div className="w-4/5 h-[2px] bg-[#dfcbb1] rounded"></div>
                <div className="w-full h-[2px] bg-[#dfcbb1] rounded"></div>
                <div className="w-3/4 h-[2px] bg-[#dfcbb1] rounded"></div>
              </div>
            </div>

            {/* Right Cover (Base) */}
            <div className="absolute right-1 top-2 w-[52px] h-[64px] bg-[#7a2219] rounded-r-md shadow-md border-r-2 border-[#54150f] flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-[#fcf8f2] rounded-r-sm m-1 p-1.5 flex flex-col gap-1 border-l border-[#ebdcc2]">
                <div className="w-full h-[2px] bg-[#dfcbb1] rounded"></div>
                <div className="w-4/5 h-[2px] bg-[#dfcbb1] rounded"></div>
                <div className="w-full h-[2px] bg-[#dfcbb1] rounded"></div>
                <div className="w-3/4 h-[2px] bg-[#dfcbb1] rounded"></div>
              </div>
            </div>

            {/* Golden Spine Bar */}
            <div className="absolute left-1/2 top-1.5 -translate-x-1/2 w-1.5 h-[66px] bg-gradient-to-b from-[#d49a3d] via-[#f3d393] to-[#ab7226] rounded-full z-40 shadow-xs"></div>

            {/* Flipping Page 1 */}
            <div className="page page-1 absolute left-1/2 top-3 w-[46px] h-[60px] bg-[#faf5ed] rounded-r-xs origin-left border-y border-r border-[#ebdcc2] p-1 flex flex-col gap-1 z-30">
              <div className="w-full h-[2px] bg-[#dfcaa9] rounded"></div>
              <div className="w-2/3 h-[2px] bg-[#dfcaa9] rounded"></div>
            </div>

            {/* Flipping Page 2 */}
            <div className="page page-2 absolute left-1/2 top-3 w-[46px] h-[60px] bg-[#fbf6ee] rounded-r-xs origin-left border-y border-r border-[#ebdcc2] p-1 flex flex-col gap-1 z-20">
              <div className="w-full h-[2px] bg-[#dfcaa9] rounded"></div>
              <div className="w-4/5 h-[2px] bg-[#dfcaa9] rounded"></div>
            </div>

            {/* Flipping Page 3 */}
            <div className="page page-3 absolute left-1/2 top-3 w-[46px] h-[60px] bg-[#fdfaf5] rounded-r-xs origin-left border-y border-r border-[#ebdcc2] p-1 flex flex-col gap-1 z-10">
              <div className="w-full h-[2px] bg-[#dfcaa9] rounded"></div>
              <div className="w-3/5 h-[2px] bg-[#dfcaa9] rounded"></div>
            </div>

          </div>
        </div>

        {/* Message and Bookstore branding */}
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7a2219] mb-1 font-sans">
            Chapter & Chai
          </p>
          <h3
            className="text-lg sm:text-xl font-serif font-bold text-[#2a1710]"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {message}
          </h3>

          {/* Warm Amber Pulsing Dots */}
          <div className="flex justify-center items-center gap-2 mt-3.5">
            <span className="w-2 h-2 rounded-full bg-[#7a2219] animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 rounded-full bg-[#d49a3d] animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 rounded-full bg-[#7a2219] animate-bounce"></span>
          </div>
        </div>

      </div>

      {/* Inline styles for smooth 3D page flip and steam effects */}
      <style>{`
        .book-stage {
          perspective: 600px;
          perspective-origin: center;
        }

        .page {
          transform-style: preserve-3d;
          box-shadow: 2px 2px 6px rgba(42, 23, 16, 0.12);
        }

        .page-1 {
          animation: flip 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .page-2 {
          animation: flip 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.25s;
        }

        .page-3 {
          animation: flip 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.5s;
        }

        @keyframes flip {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
            background-color: #faf5ed;
          }
          45% {
            background-color: #f1e4d3;
          }
          50% {
            transform: rotateY(-180deg);
            background-color: #ebdcc2;
          }
          55% {
            opacity: 1;
          }
          60% {
            opacity: 0;
            transform: rotateY(-180deg);
          }
          100% {
            transform: rotateY(0deg);
            opacity: 0;
          }
        }

        @keyframes steam {
          0% {
            height: 4px;
            transform: translateY(0);
            opacity: 0.2;
          }
          50% {
            height: 14px;
            transform: translateY(-4px);
            opacity: 0.9;
          }
          100% {
            height: 4px;
            transform: translateY(-10px);
            opacity: 0;
          }
        }

        .animate-steam-1 {
          animation: steam 1.4s ease-in-out infinite;
        }

        .animate-steam-2 {
          animation: steam 1.4s ease-in-out infinite 0.4s;
        }

        .animate-steam-3 {
          animation: steam 1.4s ease-in-out infinite 0.8s;
        }
      `}</style>
    </div>
  );
};
