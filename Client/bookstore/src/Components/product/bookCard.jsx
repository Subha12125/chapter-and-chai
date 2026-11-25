import React from 'react';
import { useCart } from '../../Context/cartContext';
import toast from 'react-hot-toast';

export const BookCard = ({ book, onClick }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(book);
    toast.success(`"${book.title}" added to your tote! 📚☕`);
  };

  return (
    <article
      onClick={() => onClick(book)}
      className="group cursor-pointer rounded-2xl bg-[#fffdf9] border border-[#ebdcc2] hover:border-[#d49a3d] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Book Cover Container with Vintage Spine Shadow */}
      <div className="relative aspect-[3/4] bg-[#f4ebe1] overflow-hidden p-3 flex items-center justify-center">
        <div className="relative w-full h-full rounded-lg overflow-hidden book-spine-shadow border border-[#debfa2]/40">
          <img
            src={book.image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80'}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Book Spine Highlight Overlay */}
          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 via-white/10 to-transparent pointer-events-none" />
        </div>

        {/* Rating Badge */}
        <div className="absolute top-5 right-5 bg-[#fffdf9]/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#ebdcc2] shadow-sm flex items-center gap-1">
          <span className="text-[#d49a3d] text-xs">★</span>
          <span className="text-[11px] font-bold text-[#2a1710]">
            {book.rating && book.rating > 0 ? book.rating : '4.8'}
          </span>
        </div>

        {/* Genre Pill */}
        {book.genre && (
          <div className="absolute bottom-5 left-5 bg-[#2a1710]/85 text-[#f7ece0] text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full backdrop-blur-sm">
            {book.genre}
          </div>
        )}
      </div>

      {/* Book Metadata & Actions */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="font-serif font-bold text-base sm:text-lg text-[#2a1710] group-hover:text-[#8b2e23] transition-colors line-clamp-2 leading-snug"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            title={book.title}
          >
            {book.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#7a6254] font-serif italic mt-1 line-clamp-1">
            by {book.author || 'Vintage Author'}
          </p>

          {book.description && (
            <p className="text-xs text-[#8c7468] line-clamp-2 mt-2 leading-relaxed font-light">
              {book.description}
            </p>
          )}
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-[#f2e6d6] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#9f8365] tracking-wider">
              Price
            </span>
            <span className="text-lg sm:text-xl font-bold font-serif text-[#2a1710]">
              ₹{book.price}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8b2e23] hover:bg-[#a13529] text-white text-xs font-bold shadow-md shadow-[#8b2e23]/20 transition-all duration-200 transform active:scale-95"
            title="Add to tote"
          >
            <span>+</span>
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
};
