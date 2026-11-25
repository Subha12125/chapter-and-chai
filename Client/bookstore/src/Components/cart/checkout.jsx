import React, { useState } from 'react';
import { useCart } from '../../Context/cartContext';
import { orderService } from '../../Services/orderService';
import toast from 'react-hot-toast';

export const Checkout = ({ onBackToCart }) => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).every((field) => field.trim())) {
      setIsSubmitting(true);

      const orderData = {
        items: cartItems.map((item) => ({
          bookId: item.id || item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: getTotalPrice(),
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },
        paymentDetails: {
          cardNumber: formData.cardNumber.replace(/\s/g, '').slice(-4),
        },
      };

      const result = await orderService.createOrder(orderData);
      setIsSubmitting(false);

      if (result.success) {
        toast.success('Your book parcel has been booked! 📜☕');
        clearCart();
        setTimeout(() => {
          onBackToCart();
        }, 1500);
      } else {
        toast.error(result.error || 'Failed to place order');
      }
    } else {
      toast.error('Please fill in all parcel shipping details');
    }
  };

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-[#ebdcc2]">
        <button
          onClick={onBackToCart}
          className="w-10 h-10 rounded-full bg-[#fffdf9] border border-[#ebdcc2] hover:bg-[#f4ebe1] text-[#3d2319] flex items-center justify-center transition-colors shadow-xs"
        >
          ←
        </button>
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#2a1710] font-serif"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Parcel Delivery & Checkout
          </h1>
          <p className="text-xs sm:text-sm text-[#735c4f]">
            Where should we send your handpicked volumes?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Container */}
        <div className="lg:col-span-7 bg-[#fffdf9] p-6 sm:p-8 rounded-3xl border border-[#ebdcc2] shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2
                className="text-lg font-bold font-serif text-[#2a1710] mb-4 flex items-center gap-2"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                <span>📬</span> Shipping Address
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#664f43] mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="e.g. Arundhati"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#faf6ef] border border-[#dfcaa9] rounded-xl text-sm text-[#2a1710] focus:bg-white focus:border-[#8b2e23] outline-none"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#664f43] mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="e.g. Roy"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#faf6ef] border border-[#dfcaa9] rounded-xl text-sm text-[#2a1710] focus:bg-white focus:border-[#8b2e23] outline-none"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-[#664f43] mb-1">Email for Receipt</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="reader@bookclub.in"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#faf6ef] border border-[#dfcaa9] rounded-xl text-sm text-[#2a1710] focus:bg-white focus:border-[#8b2e23] outline-none"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#664f43] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#faf6ef] border border-[#dfcaa9] rounded-xl text-sm text-[#2a1710] focus:bg-white focus:border-[#8b2e23] outline-none"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-[#664f43] mb-1">Street Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Apartment, House No., Lane / Street"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#faf6ef] border border-[#dfcaa9] rounded-xl text-sm text-[#2a1710] focus:bg-white focus:border-[#8b2e23] outline-none"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-[#664f43] mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Kolkata / Pune"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#faf6ef] border border-[#dfcaa9] rounded-xl text-sm text-[#2a1710] focus:bg-white focus:border-[#8b2e23] outline-none"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#664f43] mb-1">Postal Code (PIN)</label>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="700001"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#faf6ef] border border-[#dfcaa9] rounded-xl text-sm text-[#2a1710] focus:bg-white focus:border-[#8b2e23] outline-none"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="pt-4 border-t border-[#f0e4d2]">
              <h2
                className="text-lg font-bold font-serif text-[#2a1710] mb-4 flex items-center gap-2"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                <span>💳</span> Payment Verification
              </h2>

              <div>
                <label className="block text-xs font-semibold text-[#664f43] mb-1">
                  Card / UPI Reference (Simulated Secure Payment)
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="•••• •••• •••• 4242"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#faf6ef] border border-[#dfcaa9] rounded-xl text-sm text-[#2a1710] focus:bg-white focus:border-[#8b2e23] outline-none font-mono"
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || cartItems.length === 0}
              className="w-full py-4 bg-[#8b2e23] hover:bg-[#a13529] disabled:opacity-50 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-[#8b2e23]/25 transition-all flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Wrapping & Booking Order...' : 'Complete Purchase'}</span>
              <span>•</span>
              <span className="font-serif">₹{totalPrice}</span>
            </button>
          </form>
        </div>

        {/* Order Items Preview */}
        <div className="lg:col-span-5 bg-[#fffdf9] p-6 sm:p-7 rounded-3xl border border-[#ebdcc2] shadow-sm">
          <h2
            className="text-lg font-bold font-serif text-[#2a1710] mb-4 pb-3 border-b border-[#ebdcc2]"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Parcel Contents ({cartItems.length})
          </h2>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div
                key={item.id || item._id}
                className="flex items-center gap-3 p-3 bg-[#fbf7f0] rounded-xl border border-[#ebdcc2]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-16 object-cover rounded-md border border-[#debfa2]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#2a1710] font-serif truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#735c4f]">Qty: {item.quantity}</p>
                </div>
                <span className="text-xs font-serif font-bold text-[#8b2e23]">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#ebdcc2] space-y-2 text-sm text-[#664f43]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-serif font-bold text-[#2a1710]">₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-[#2e6b47] font-semibold">FREE</span>
            </div>
            <div className="flex justify-between text-base font-serif font-bold text-[#2a1710] pt-2 border-t border-[#ebdcc2]">
              <span>Total Payable</span>
              <span className="text-[#8b2e23]">₹{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
