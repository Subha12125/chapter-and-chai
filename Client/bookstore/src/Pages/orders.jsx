import React from 'react';

export const Order = ({ cartItems = [], totalAmount = 0, onBackToStore }) => {
  return (
    <div className="min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[#ebdcc2]">
        <button
          onClick={onBackToStore}
          className="w-10 h-10 rounded-full bg-[#fffdf9] border border-[#ebdcc2] hover:bg-[#f4ebe1] text-[#3d2319] flex items-center justify-center transition-colors shadow-xs"
        >
          ←
        </button>
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#2a1710] font-serif"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Your Book Orders
          </h1>
          <p className="text-xs sm:text-sm text-[#735c4f]">
            Dispatches from Chapter & Chai Bookstore
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item._id || item.id}
                className="bg-[#fffdf9] p-4 sm:p-5 rounded-2xl border border-[#ebdcc2] flex gap-4 items-center shadow-xs"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-24 object-cover rounded-md border border-[#debfa2]"
                />
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-base text-[#2a1710]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#735c4f] font-serif italic mt-0.5">
                    by {item.author}
                  </p>
                  <p className="text-sm font-bold text-[#8b2e23] font-serif mt-1">
                    ₹{item.price}
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#edf6f0] text-[#2e6b47] border border-[#cbe4d4]">
                  In Preparation
                </span>
              </div>
            ))
          ) : (
            <div className="bg-[#fffdf9] p-12 rounded-3xl border border-[#ebdcc2] text-center">
              <span className="text-4xl block mb-2">📜</span>
              <p className="text-[#735c4f] font-serif">No active orders found.</p>
              <button
                onClick={onBackToStore}
                className="mt-4 px-5 py-2.5 rounded-xl bg-[#8b2e23] text-white text-xs font-bold hover:bg-[#a13529] transition-colors"
              >
                Browse Bookstore
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 bg-[#fffdf9] p-6 rounded-3xl border border-[#ebdcc2] shadow-sm h-fit">
          <h2
            className="text-lg font-bold font-serif text-[#2a1710] mb-4 pb-2 border-b border-[#ebdcc2]"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Order Receipt
          </h2>
          <div className="space-y-3 text-sm text-[#664f43]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-serif font-bold text-[#2a1710]">₹{totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-[#2e6b47] font-semibold">FREE</span>
            </div>
            <div className="border-t border-[#ebdcc2] pt-3 flex justify-between text-base font-serif font-bold text-[#2a1710]">
              <span>Total</span>
              <span className="text-[#8b2e23]">₹{totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
