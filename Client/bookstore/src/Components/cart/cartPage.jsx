import React from 'react';
import { CartItem } from './cartItem';
import { useCart } from '../../Context/cartContext';
import toast from 'react-hot-toast';

export const CartPage = ({ onCheckout, onBackToStore }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  const handleRemove = (id, title) => {
    removeFromCart(id);
    toast.error(`Removed "${title}" from tote`);
  };

  const handleUpdateQuantity = (id, quantity, title) => {
    updateQuantity(id, quantity);
    if (quantity === 0) {
      toast.error(`Removed "${title}" from tote`);
    }
  };

  const totalPrice = getTotalPrice();
  const qualifiesForFreeShipping = totalPrice >= 799;

  return (
    <div className="min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back button & page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#ebdcc2]">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToStore}
            className="w-10 h-10 rounded-full bg-[#fffdf9] border border-[#ebdcc2] hover:bg-[#f4ebe1] text-[#3d2319] flex items-center justify-center transition-colors shadow-xs"
            title="Return to shelves"
          >
            ←
          </button>
          <div>
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2a1710] font-serif"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Your Reading Tote
            </h1>
            <p className="text-xs sm:text-sm text-[#735c4f] mt-0.5">
              Carefully wrapped with brown kraft paper and collectible bookmarks
            </p>
          </div>
        </div>

        <span className="self-start sm:self-auto px-4 py-1.5 rounded-full bg-[#f4ebe1] text-[#732219] border border-[#dfcaa9] text-xs font-bold font-serif">
          {cartItems.length} {cartItems.length === 1 ? 'Volume' : 'Volumes'} Selected
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item._id || item.id}
                item={item}
                onRemove={() => handleRemove(item._id || item.id, item.title)}
                onUpdateQuantity={(id, q) => handleUpdateQuantity(id, q, item.title)}
              />
            ))
          ) : (
            <div className="bg-[#fffdf9] p-12 sm:p-16 rounded-3xl border border-[#ebdcc2] text-center shadow-sm">
              <span className="text-6xl block mb-4">🧺</span>
              <h2
                className="text-2xl font-serif font-bold text-[#2a1710]"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                Your Reading Tote is Empty
              </h2>
              <p className="text-sm text-[#735c4f] mt-2 max-w-md mx-auto font-light leading-relaxed">
                Take your time to browse through our quiet shelves. There is a book waiting to be read with your evening cup of chai.
              </p>
              <button
                onClick={onBackToStore}
                className="mt-6 px-7 py-3.5 rounded-2xl bg-[#8b2e23] hover:bg-[#a13529] text-white font-bold text-sm shadow-md transition-all"
              >
                Explore Curated Shelves →
              </button>
            </div>
          )}
        </div>

        {/* Order Summary Receipt */}
        <div className="lg:col-span-4 bg-[#fffdf9] p-6 sm:p-7 rounded-3xl border border-[#ebdcc2] shadow-md relative">
          {/* Subtle vintage stamp accent */}
          <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-[#a88a77] uppercase border border-[#debfa2] px-2 py-0.5 rounded">
            INV #{Math.floor(1000 + Math.random() * 9000)}
          </div>

          <h2
            className="text-xl font-bold font-serif text-[#2a1710] mb-5 pb-3 border-b border-[#f0e4d2]"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Order Summary
          </h2>

          <div className="space-y-3.5 text-sm text-[#664f43] mb-6">
            <div className="flex justify-between items-center">
              <span>Books Subtotal</span>
              <span className="font-serif font-bold text-[#2a1710]">₹{totalPrice}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Packaging & Bookmarks</span>
              <span className="text-[#2e6b47] font-semibold">Complimentary</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Standard Delivery</span>
              <span className="text-[#2e6b47] font-semibold">
                {qualifiesForFreeShipping ? 'FREE' : '₹50'}
              </span>
            </div>

            {!qualifiesForFreeShipping && totalPrice > 0 && (
              <p className="text-xs text-[#8b2e23] bg-[#fbf4f3] p-2 rounded-xl border border-[#edd5d2]">
                💡 Add ₹{799 - totalPrice} more for free doorstep delivery!
              </p>
            )}

            <div className="border-t border-dashed border-[#dfcaa9] pt-4 mt-2 flex justify-between items-baseline">
              <div>
                <span className="text-base font-bold font-serif text-[#2a1710] block">
                  Estimated Total
                </span>
                <span className="text-[11px] text-[#9f8365]">Inclusive of all taxes</span>
              </div>
              <span className="text-2xl font-serif font-bold text-[#8b2e23]">
                ₹{qualifiesForFreeShipping ? totalPrice : totalPrice + 50}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={onCheckout}
            disabled={cartItems.length === 0}
            className="w-full py-4 bg-[#8b2e23] hover:bg-[#a13529] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-[#8b2e23]/25 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <span>→</span>
          </button>

          <button
            onClick={onBackToStore}
            className="w-full mt-3 py-3 bg-[#f6ebd9] hover:bg-[#edd8be] text-[#3d2319] font-semibold text-xs sm:text-sm rounded-2xl transition-colors"
          >
            Continue Browsing
          </button>

          {/* Reassurance notes */}
          <div className="mt-6 pt-5 border-t border-[#f4ebe1] space-y-2 text-xs text-[#8c7468]">
            <p className="flex items-center gap-2">
              <span>🛡️</span> Verified safe & secure checkout
            </p>
            <p className="flex items-center gap-2">
              <span>🌿</span> Eco-friendly book parcel packaging
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
