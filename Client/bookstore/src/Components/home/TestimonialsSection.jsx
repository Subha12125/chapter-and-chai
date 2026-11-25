import React from 'react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Riya S.',
      role: 'Literature Enthusiast',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      rating: 5,
      quote:
        'A beautifully curated collection and super smooth shopping experience. My go-to for books!',
    },
    {
      name: 'Arjun M.',
      role: 'Avid Collector',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
      rating: 5,
      quote:
        'The packaging, the book quality, and the recommendations are just perfect. Feels like a real bookstore, online.',
    },
    {
      name: 'Meera K.',
      role: 'Poet & Teacher',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
      rating: 5,
      quote:
        'Opening a package from Chapter & Chai is like unwrapping a warm hug and finding your next favourite world.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2a1710] font-serif"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            What <span className="brush-underline">Our</span> Readers Say
          </h2>
          <p className="text-sm sm:text-base text-[#7a6254] mt-2 font-light">
            Genuine notes from bibliophiles across the country
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 rounded-full border border-[#ebdcc2] bg-[#fffdfa] hover:bg-[#f6ebd9] text-[#422c22] flex items-center justify-center transition-colors shadow-sm"
            aria-label="Previous testimonial"
          >
            ‹
          </button>
          <button
            className="w-10 h-10 rounded-full border border-[#ebdcc2] bg-[#fffdfa] hover:bg-[#f6ebd9] text-[#422c22] flex items-center justify-center transition-colors shadow-sm"
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>
      </div>

      {/* Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#fffdf9] p-6 sm:p-7 rounded-2xl border border-[#ebdcc2] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#8b2e23] shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-[#2a1710] font-serif text-base">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#8c7468]">{item.role}</p>
                </div>
              </div>

              {/* Quote mark and text */}
              <p className="text-sm sm:text-base text-[#463126] italic font-serif leading-relaxed">
                <span className="text-2xl text-[#8b2e23] font-serif leading-none mr-1.5">“</span>
                {item.quote}
                <span className="text-2xl text-[#8b2e23] font-serif leading-none ml-1.5">”</span>
              </p>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 mt-5 pt-4 border-t border-[#f4ebe1]">
              {[...Array(item.rating)].map((_, i) => (
                <span key={i} className="text-[#d49a3d] text-base">★</span>
              ))}
              <span className="text-xs font-semibold text-[#7d6557] ml-2">
                — {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

