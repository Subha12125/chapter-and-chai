import React from 'react';

export const AboutSection = () => {
  return (
    <section id="about-section" className="relative py-16 sm:py-24 bg-[#fbf6ee] border-t border-[#ebdcc2] overflow-hidden">
      {/* Decorative subtle background elements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Visual Vignette */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#fffdf9] bg-[#ebdcc2]">
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80"
                alt="Antique books, glowing warm desk lamp, and a steaming teacup"
                className="w-full h-[360px] sm:h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a1710]/40 via-transparent to-transparent" />
            </div>

            {/* Handcrafted Quote badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#fffdfa] border border-[#ebdcc2] rounded-2xl p-4 shadow-xl max-w-xs hidden sm:block">
              <div className="flex items-center gap-3">
                <span className="text-2xl">☕</span>
                <div>
                  <p className="text-xs font-serif italic text-[#341d13]">
                    "Every book smells of rain, tea, and forgotten memories."
                  </p>
                  <p className="text-[10px] font-sans font-bold text-[#8b2e23] uppercase tracking-wider mt-1">
                    — The Chai Scribe
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Description */}
          <div className="lg:col-span-7 relative z-10 pl-0 lg:pl-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#8b2e23] mb-3">
              <span className="w-8 h-[1.5px] bg-[#8b2e23]"></span>
              <span>About Us</span>
              <span className="w-8 h-[1.5px] bg-[#8b2e23]"></span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2a1710] font-serif leading-[1.2]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              A Bookstore with a <span className="brush-underline">Reader's</span> Heart
            </h2>

            <div className="mt-6 space-y-4 text-base sm:text-lg text-[#5d473b] leading-relaxed font-light">
              <p>
                <strong className="font-semibold text-[#2a1710]">Chapter & Chai</strong> is an independent online bookstore born from a love for books, thoughtful curation, and unhurried reading.
              </p>
              <p>
                We bring together new voices, timeless classics, and beautiful editions — for curious minds, lifelong readers, and everyone in between. Every package we send comes with the fragrance of good paper, handpicked bookmarks, and a warm cup of inspiration.
              </p>
            </div>

            {/* Small stats/badges */}
            <div className="mt-8 pt-6 border-t border-[#ebdcc2] grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#8b2e23]">10,000+</p>
                <p className="text-xs text-[#7d6557] font-medium mt-1">Cherished Reads</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#8b2e23]">100%</p>
                <p className="text-xs text-[#7d6557] font-medium mt-1">Original Editions</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#8b2e23]">4.9 ★</p>
                <p className="text-xs text-[#7d6557] font-medium mt-1">Reader Love</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

