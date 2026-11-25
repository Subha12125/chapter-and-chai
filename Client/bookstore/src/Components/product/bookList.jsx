import React from 'react';
import { BookCard } from './bookCard';

export const BookList = ({
  books,
  onBookSelect,
  selectedCategory,
  onCategoryChange,
  searchQuery,
}) => {
  const categories = [
    { id: 'all', label: 'All Titles' },
    { id: 'fiction', label: 'Fiction' },
    { id: 'biography', label: 'Biography' },
    { id: 'motivation', label: 'Motivation' },
    { id: 'mythology', label: 'Mythology' },
    { id: 'children', label: 'Children' },
    { id: 'science', label: 'Science' },
  ];

  return (
    <section id="catalog-section" className="py-12 sm:py-16">
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8b2e23] mb-2">
            <span>❧</span> Curated Shelves <span>❧</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2a1710] font-serif"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Bestselling <span className="brush-underline">Books</span>
          </h2>
          <p className="text-sm sm:text-base text-[#7a6254] mt-2 font-light">
            {searchQuery
              ? `Showing results matching "${searchQuery}"`
              : 'Handpicked reads currently beloved by our readers and tea drinkers'}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isSelected = (selectedCategory || 'all').toLowerCase() === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange && onCategoryChange(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#8b2e23] text-[#fffdfa] shadow-md shadow-[#8b2e23]/25'
                    : 'bg-[#fffdf9] text-[#553c30] border border-[#ebdcc2] hover:bg-[#f5ecde] hover:border-[#debfa2]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Book Grid */}
      {books && books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
          {books.map((book) => (
            <BookCard
              key={book._id || book.id}
              book={book}
              onClick={onBookSelect}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-[#fffdf9] border border-[#ebdcc2] p-12 text-center max-w-lg mx-auto shadow-sm my-8">
          <span className="text-5xl block mb-3">📖</span>
          <h3
            className="text-xl font-bold text-[#2a1710] font-serif"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            No Books Found on This Shelf
          </h3>
          <p className="text-sm text-[#7a6254] mt-2 font-light">
            We couldn't find any books in this section. Try selecting another genre or clearing your search.
          </p>
          <button
            onClick={() => onCategoryChange && onCategoryChange('all')}
            className="mt-5 px-5 py-2.5 rounded-xl bg-[#8b2e23] text-white text-xs font-bold hover:bg-[#a13529] transition-colors"
          >
            Show All Books
          </button>
        </div>
      )}
    </section>
  );
};
