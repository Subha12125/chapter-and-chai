import React from 'react';

export const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="bg-[#fffdf9] p-4 sm:p-5 rounded-2xl border border-[#ebdcc2] flex flex-col sm:flex-row gap-4 items-center hover:border-[#dfc39d] transition-all shadow-sm">
      {/* Book Cover */}
      <div className="w-20 h-28 sm:w-20 sm:h-28 rounded-lg overflow-hidden book-spine-shadow border border-[#debfa2] shrink-0 bg-[#f4ebe1]">
        <img
          src={item.image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80'}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Book Info */}
      <div className="flex-1 text-center sm:text-left">
        <h3
          className="font-serif font-bold text-base sm:text-lg text-[#2a1710] line-clamp-1"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#735c4f] font-serif italic mt-0.5">
          by {item.author || 'Vintage Author'}
        </p>
        <p className="text-sm font-bold text-[#8b2e23] font-serif mt-1">
          ₹{item.price}
        </p>
      </div>

      {/* Quantity Stepper */}
      <div className="flex items-center gap-2 bg-[#f6ebd9] border border-[#e4d3be] rounded-xl p-1.5">
        <button
          onClick={() => onUpdateQuantity(item._id || item.id, item.quantity - 1)}
          className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#fffdfa] hover:bg-[#8b2e23] text-[#3d2319] hover:text-white transition-colors text-sm font-bold shadow-xs"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-7 text-center font-serif font-bold text-sm text-[#2a1710]">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item._id || item.id, item.quantity + 1)}
          className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#fffdfa] hover:bg-[#8b2e23] text-[#3d2319] hover:text-white transition-colors text-sm font-bold shadow-xs"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Total for item */}
      <div className="text-right hidden sm:block min-w-20">
        <span className="text-xs text-[#9f8365] block">Subtotal</span>
        <span className="font-serif font-bold text-base text-[#2a1710]">
          ₹{item.price * item.quantity}
        </span>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item._id || item.id)}
        className="p-2 text-[#9f8365] hover:text-[#8b2e23] hover:bg-[#f8ede0] rounded-xl transition-colors"
        title="Remove book from tote"
        aria-label="Remove item"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};
