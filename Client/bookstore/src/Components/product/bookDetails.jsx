import React from 'react';
import { useCart } from '../../Context/cartContext';
import toast from 'react-hot-toast';

export const BookDetails = ({ book, onClose }) => {
  const { addToCart } = useCart();

  if (!book) return null;

  const handleAddToCart = () => {
    addToCart(book);
    toast.success(`"${book.title}" added to your tote! 📚☕`);
  };

  return (
    <div
      className="fixed z-[500] inset-0 bg-[#160d09]/75 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#fffdf9] rounded-3xl border border-[#ebdcc2] max-w-3xl w-full max-h-[92vh] overflow-y-auto relative shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Antique Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 bg-[#f4ebe1] hover:bg-[#8b2e23] text-[#3d2319] hover:text-white rounded-full border border-[#dec5a3] transition-all duration-200 flex items-center justify-center z-20 group"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row gap-8 p-6 sm:p-10">
          {/* Book Cover with Vintage Spine Effect */}
          <div className="flex-shrink-0 w-full md:w-64 mx-auto md:mx-0 flex justify-center items-start">
            <div className="relative w-48 sm:w-56 md:w-full aspect-[2/3] rounded-xl overflow-hidden book-spine-shadow border border-[#debfa2]">
              <img
                src={book.image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80'}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/35 via-white/10 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Book Information */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8b2e23] mb-2">
                <span>{book.genre || 'Literature'}</span>
              </div>

              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2a1710] font-serif leading-tight"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                {book.title}
              </h2>

              <p className="text-base sm:text-lg text-[#735c4f] font-serif italic mt-1.5 mb-3">
                by {book.author || 'Renowned Author'}
              </p>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mb-4 text-sm">
                <div className="flex text-[#d49a3d]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="font-bold text-[#2a1710]">{book.rating || '4.8'}</span>
                <span className="text-[#8c7468]">({book.reviews || '28'} reader reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-5 pb-4 border-b border-[#ebdcc2] flex items-baseline gap-3">
                <span className="text-3xl font-serif font-bold text-[#2a1710]">
                  ₹{book.price}
                </span>
                <span className="text-xs text-[#2e6b47] bg-[#edf6f0] border border-[#cbe4d4] px-2.5 py-0.5 rounded-full font-semibold">
                  In Stock & Ready to Dispatch
                </span>
              </div>

              {/* Synopsis */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#9f8365] mb-2">
                  About This Edition
                </h4>
                <p className="text-sm sm:text-base text-[#523d32] leading-relaxed font-light">
                  {book.description ||
                    'A timeless treasure bound for readers who seek stories with depth, quiet contemplation, and unforgettable characters.'}
                </p>
              </div>

              {/* Metadata Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#fbf7f0] p-4 rounded-2xl border border-[#ebdcc2] text-xs mb-6">
                <div>
                  <span className="block text-[#9f8365] font-medium">Genre</span>
                  <span className="font-semibold text-[#2a1710]">{book.genre || 'General'}</span>
                </div>
                <div>
                  <span className="block text-[#9f8365] font-medium">Format</span>
                  <span className="font-semibold text-[#2a1710]">Collector's Hardcover</span>
                </div>
                <div>
                  <span className="block text-[#9f8365] font-medium">Language</span>
                  <span className="font-semibold text-[#2a1710]">English</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-xl sm:rounded-2xl bg-[#8b2e23] hover:bg-[#a13529] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#8b2e23]/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <span>🛒</span>
                <span>Add to Tote • ₹{book.price}</span>
              </button>

              <button
                onClick={onClose}
                className="py-3.5 px-5 rounded-xl sm:rounded-2xl bg-[#f4ebe1] hover:bg-[#ebdcc2] text-[#3d2319] font-semibold text-sm transition-colors border border-[#debfa2]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
