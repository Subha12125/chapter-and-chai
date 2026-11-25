import React from 'react';

export const CollectionsSection = ({ onSelectCategory }) => {
  const collections = [
    {
      id: 'new-releases',
      category: 'all',
      title: 'New Releases',
      description: 'The latest and most talked-about books.',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'classics',
      category: 'fiction',
      title: 'Classics',
      description: 'Timeless stories that always belong.',
      image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'gift-editions',
      category: 'mythology',
      title: 'Gift Editions',
      description: 'Beautiful editions for every special occasion.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'staff-picks',
      category: 'biography',
      title: 'Staff Picks',
      description: "Our team's favourite reads, just for you.",
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const handleCardClick = (category) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    const catalog = document.getElementById('catalog-section');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="collections-section" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2a1710] font-serif"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            <span className="brush-underline">Explore</span> Our Collections
          </h2>
          <p className="text-sm sm:text-base text-[#7a6254] mt-3 font-light">
            Hand-curated shelves organized with the love of a local bookkeeper
          </p>
        </div>

        <button
          onClick={() => handleCardClick('all')}
          className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#8b2e23] hover:text-[#5a1912] transition-colors group"
        >
          <span>View All Collections</span>
          <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {collections.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item.category)}
            className="group cursor-pointer rounded-2xl bg-[#fffdf9] border border-[#ebdcc2] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#dfc39d] transition-all duration-300 flex flex-col"
          >
            {/* Image Thumbnail */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#f4ebe1]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  className="text-lg font-bold text-[#2a1710] font-serif group-hover:text-[#8b2e23] transition-colors"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#7a6254] mt-1.5 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              {/* Bottom Arrow Button */}
              <div className="mt-4 flex justify-end">
                <span className="w-8 h-8 rounded-full bg-[#8b2e23] text-white flex items-center justify-center text-sm shadow-md transition-all duration-200 group-hover:bg-[#a13529] group-hover:translate-x-0.5">
                  →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

