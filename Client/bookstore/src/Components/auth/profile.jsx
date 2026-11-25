import React from 'react';
import { useAuth } from '../../Context/authContext';

export const Profile = ({ onLogoutSuccess, onAdminClick }) => {
  const { user, logout } = useAuth();

  const currentMonthYear = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  const userData = user || {
    name: 'Book Collector',
    email: 'reader@chapterandchai.in',
    joinedDate: currentMonthYear,
    totalOrders: 0,
  };

  const formattedJoinedDate = user?.date
    ? new Date(user.date).toLocaleString('default', { month: 'long', year: 'numeric' })
    : user?.joinedDate || currentMonthYear;

  const handleLogout = () => {
    logout();
    if (onLogoutSuccess) onLogoutSuccess();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-[#fffdf9] rounded-3xl shadow-xl border border-[#ebdcc2] overflow-hidden">
        {/* Cover with deep forest green background */}
        <div className="h-36 bg-gradient-to-r from-[#173024] to-[#254c3a] relative p-6 flex justify-between items-start">
          <span className="text-[#dec5a3] font-serif text-sm tracking-wide">
            ❧ Chapter & Chai Reading Guild Membership ❧
          </span>
          <span className="text-2xl">☕</span>
        </div>

        <div className="px-6 sm:px-10 pb-10">
          <div className="relative flex flex-col sm:flex-row justify-between sm:items-end -mt-14 mb-8 gap-4">
            <div className="w-24 h-24 bg-[#fffdf9] rounded-2xl border-4 border-[#fffdf9] shadow-lg flex items-center justify-center text-3xl font-bold font-serif text-[#8b2e23] bg-[#f8ede0]">
              {userData.name.charAt(0)}
            </div>
            <button
              onClick={handleLogout}
              className="self-start sm:self-auto px-5 py-2.5 bg-[#2a1710] hover:bg-[#8b2e23] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              Sign Out
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-[#2a1710] font-serif"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {userData.name}
                </h2>
                <p className="text-[#735c4f] text-sm mt-0.5">{userData.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#fbf7f0] rounded-2xl border border-[#ebdcc2]">
                  <p className="text-[10px] font-bold text-[#9f8365] uppercase tracking-wider">
                    Member Since
                  </p>
                  <p className="text-[#2a1710] font-bold font-serif text-base mt-1">
                    {formattedJoinedDate}
                  </p>
                </div>
                <div className="p-4 bg-[#fbf7f0] rounded-2xl border border-[#ebdcc2]">
                  <p className="text-[10px] font-bold text-[#9f8365] uppercase tracking-wider">
                    Volumes Purchased
                  </p>
                  <p className="text-[#2a1710] font-bold font-serif text-base mt-1">
                    {userData.totalOrders || 0} Orders
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-serif font-bold text-[#2a1710] text-sm uppercase tracking-wider">
                Account Settings
              </h3>
              <button className="w-full text-left p-3 text-xs sm:text-sm font-semibold text-[#553e32] hover:bg-[#f6ebd9] hover:text-[#8b2e23] rounded-xl transition-all">
                Personal Details
              </button>
              <button className="w-full text-left p-3 text-xs sm:text-sm font-semibold text-[#553e32] hover:bg-[#f6ebd9] hover:text-[#8b2e23] rounded-xl transition-all">
                Delivery Addresses
              </button>
              {user?.role === 'admin' ? (
                <button
                  onClick={onAdminClick}
                  className="w-full text-left p-3 text-xs sm:text-sm font-bold text-[#fffdfa] bg-[#8b2e23] hover:bg-[#a13529] rounded-xl transition-all shadow-md shadow-[#8b2e23]/20"
                >
                  ⚙️ Bookstore Management Panel
                </button>
              ) : (
                <button
                  onClick={onAdminClick}
                  className="w-full text-left p-3 text-xs font-semibold text-[#9f8365] hover:text-[#8b2e23] hover:bg-[#f4ebe1] rounded-xl transition-colors"
                >
                  Seller / Admin Portal →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
