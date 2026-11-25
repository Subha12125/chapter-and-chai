import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../Context/authContext';
import { bookService } from '../../Services/bookService';
import { orderService } from '../../Services/orderService';
import { Loader } from '../../Components/common/loader';
import { Logo } from '../../Components/common/Logo';

const StatCard = ({ title, value, icon, trend }) => (
  <div className="bg-[#fffdf9] p-6 rounded-3xl border border-[#ebdcc2] shadow-sm hover:border-[#dfcaa9] transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-2xl bg-[#f8ede0] text-[#8b2e23]">
        {icon}
      </div>
      {trend && (
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#edf6f0] text-[#2e6b47]">
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-[#8c7468] text-xs font-bold uppercase tracking-wider">{title}</h3>
    <p className="text-2xl sm:text-3xl font-serif font-bold text-[#2a1710] mt-1">{value}</p>
  </div>
);

export const AdminDashboard = ({ onBackToStore }) => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    price: '',
    genre: '',
    stock: '',
    description: '',
    image: '',
    isBestSeller: false,
  });

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    const result = await bookService.getAllBooks();
    if (result.success) {
      setBooks(result.data);
    }
    setLoading(false);
  }, []);

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    const result = await orderService.getAllOrders(token);
    if (result.success) {
      setOrders(result.data);
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    if (activeTab === 'books' || activeTab === 'overview') {
      fetchBooks();
    }
    if (activeTab === 'orders' || activeTab === 'overview') {
      fetchOrders();
    }
  }, [activeTab, fetchBooks, fetchOrders]);

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('Authentication error: Token missing. Please log out and log in again.');
      return;
    }

    setLoading(true);
    const result = await bookService.addBook({ ...newBook, id: Date.now() }, token);
    if (result.success) {
      alert('Book added to inventory successfully! 📚');
      setShowAddModal(false);
      setNewBook({
        title: '',
        author: '',
        price: '',
        genre: '',
        stock: '',
        description: '',
        image: '',
        isBestSeller: false,
      });
      fetchBooks();
    } else {
      alert('Error: ' + result.error);
    }
    setLoading(false);
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm('Are you sure you want to retire this book from shelves?')) {
      if (!token) return;
      setLoading(true);
      const result = await bookService.deleteBook(id, token);
      if (result.success) {
        fetchBooks();
      } else {
        alert('Error: ' + result.error);
      }
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    if (!token) return;
    setLoading(true);
    const result = await orderService.updateOrderStatus(orderId, newStatus, token);
    if (result.success) {
      setOrders(orders.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)));
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    } else {
      alert('Error updating status: ' + result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#faf6ef] flex flex-col lg:flex-row">
      {loading && <Loader isLoading={true} message="Updating store ledger..." />}

      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-[#fffdf9] border-b lg:border-b-0 lg:border-r border-[#ebdcc2] p-6 lg:fixed lg:h-full z-20 flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <Logo size="small" showEstd={false} />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8b2e23] block mt-2">
              Bookstore Office & Inventory
            </span>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: 'overview', label: 'Ledger Overview', icon: '📊' },
              { id: 'books', label: 'Inventory (Shelves)', icon: '📚' },
              { id: 'orders', label: 'Customer Parcels', icon: '📦' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-[#8b2e23] text-white shadow-md shadow-[#8b2e23]/25'
                    : 'text-[#5d473b] hover:bg-[#f6ebd9]'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={onBackToStore}
          className="mt-6 flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-[#8b2e23] hover:bg-[#fbf4f3] border border-[#edd5d2] transition-colors"
        >
          <span>←</span>
          <span>Return to Storefront</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 p-6 sm:p-10">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#ebdcc2]">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold text-[#2a1710] font-serif capitalize"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {activeTab === 'overview'
                ? 'Store Ledger Overview'
                : activeTab === 'books'
                ? 'Inventory Catalog'
                : 'Reader Orders'}
            </h1>
            <p className="text-xs sm:text-sm text-[#735c4f] mt-0.5">
              Welcome, {user?.name || 'Storekeeper'}! Keep the shelves cozy and stocked.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#fffdf9] p-2 pr-4 rounded-2xl border border-[#ebdcc2]">
            <div className="w-10 h-10 rounded-xl bg-[#8b2e23] text-white font-serif font-bold flex items-center justify-center">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <div>
              <p className="text-xs font-bold text-[#2a1710]">{user?.name || 'Head Bookseller'}</p>
              <p className="text-[10px] text-[#9f8365] font-semibold uppercase tracking-wider">
                Authorized Storekeeper
              </p>
            </div>
          </div>
        </header>

        {/* Stats on Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            <StatCard
              title="Books Listed"
              value={books.length}
              icon="📚"
              trend="+Live"
            />
            <StatCard
              title="Total Orders"
              value={orders.length}
              icon="📦"
            />
            <StatCard
              title="Gross Sales"
              value={`₹${orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0)}`}
              icon="💰"
            />
            <StatCard
              title="Low Inventory"
              value={books.filter((b) => (b.stock || 0) < 5).length}
              icon="⚠️"
            />
          </div>
        )}

        {/* Books Table */}
        {(activeTab === 'books' || activeTab === 'overview') && (
          <div className="bg-[#fffdf9] rounded-3xl border border-[#ebdcc2] shadow-sm overflow-hidden mb-10">
            <div className="px-6 py-5 border-b border-[#f0e4d2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2
                  className="text-lg font-bold font-serif text-[#2a1710]"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  Book Inventory
                </h2>
                <p className="text-xs text-[#735c4f]">Manage titles, genres, and active stocks</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-5 py-2.5 bg-[#8b2e23] hover:bg-[#a13529] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>+</span>
                <span>Add New Book to Shelf</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#faf6ef] text-[#8c7468] uppercase font-bold text-[10px] tracking-wider">
                    <th className="px-6 py-4">Title & Author</th>
                    <th className="px-6 py-4">Genre</th>
                    <th className="px-6 py-4 text-right">Price</th>
                    <th className="px-6 py-4 text-center">Stock</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f2e6d6]">
                  {books.map((b) => (
                    <tr key={b._id || b.id} className="hover:bg-[#fbf7f0] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={b.image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=150&q=80'}
                            alt={b.title}
                            className="w-10 h-14 object-cover rounded border border-[#debfa2]"
                          />
                          <div>
                            <p className="font-serif font-bold text-[#2a1710] line-clamp-1">
                              {b.title}
                            </p>
                            <p className="text-xs text-[#735c4f] font-serif italic">
                              {b.author}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold bg-[#f4ebe1] text-[#732219]">
                          {b.genre}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-serif font-bold text-[#2a1710]">
                        ₹{b.price}
                      </td>
                      <td className="px-6 py-4 text-center font-bold">
                        <span className={(b.stock || 0) < 5 ? 'text-[#8b2e23]' : 'text-[#2a1710]'}>
                          {b.stock || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteBook(b._id || b.id)}
                          className="p-1.5 text-[#9f8365] hover:text-[#8b2e23] hover:bg-[#fbf4f3] rounded-lg transition-colors"
                          title="Delete book"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Table */}
        {(activeTab === 'orders' || activeTab === 'overview') && (
          <div className="bg-[#fffdf9] rounded-3xl border border-[#ebdcc2] shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-[#f0e4d2]">
              <h2
                className="text-lg font-bold font-serif text-[#2a1710]"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                Customer Orders & Dispatches
              </h2>
              <p className="text-xs text-[#735c4f]">Track and update shipping status</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#faf6ef] text-[#8c7468] uppercase font-bold text-[10px] tracking-wider">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f2e6d6]">
                  {orders.map((o) => (
                    <tr key={o._id} className="hover:bg-[#fbf7f0] transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-[#735c4f]">
                        #{o._id?.slice(-6)?.toUpperCase()}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-[#2a1710]">
                          {o.shippingAddress?.name || o.user?.name || 'Reader'}
                        </p>
                        <p className="text-[11px] text-[#8c7468]">
                          {o.shippingAddress?.email || o.user?.email}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right font-serif font-bold text-[#8b2e23]">
                        ₹{o.totalAmount}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            o.status === 'Delivered'
                              ? 'bg-[#edf6f0] text-[#2e6b47]'
                              : o.status === 'Shipped'
                              ? 'bg-[#f6ebd9] text-[#ab7226]'
                              : 'bg-[#fbf4f3] text-[#8b2e23]'
                          }`}
                        >
                          {o.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(o)}
                          className="px-3 py-1.5 rounded-lg bg-[#f4ebe1] hover:bg-[#8b2e23] hover:text-white text-[#3d2319] text-xs font-semibold transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-[#8c7468]">
                        No reader orders recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] bg-[#160d09]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fffdf9] rounded-3xl border border-[#ebdcc2] max-w-xl w-full p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#ebdcc2]">
              <h2
                className="text-xl font-bold font-serif text-[#2a1710]"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                Add New Volume to Shelf
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-[#f4ebe1] text-[#3d2319] hover:bg-[#8b2e23] hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddBook} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#664f43] mb-1">Title</label>
                  <input
                    required
                    type="text"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    className="w-full p-3 bg-[#faf6ef] border border-[#dfcaa9] rounded-xl text-sm"
                    placeholder="Book Title"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#664f43] mb-1">Author</label>
                  <input
                    required
                    type="text"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    className="w-full p-3 bg-[#faf6ef] border border-[#dfcaa9] rounded-xl text-sm"
                    placeholder="Author Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#664f43] mb-1">Price (₹)</label>
                  <input
                    required
                    type="number"
                    value={newBook.price}
                    onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                    className="w-full p-3 bg-[#faf6ef] border border-[#dfcaa9] rounded-xl text-sm"
                    placeholder="499"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#664f43] mb-1">Genre</label>
                  <input
                    required
                    type="text"
                    value={newBook.genre}
                    onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                    className="w-full p-3 bg-[#faf6ef] border border-[#dfcaa9] rounded-xl text-sm"
                    placeholder="Fiction"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#664f43] mb-1">Stock</label>
                  <input
                    required
                    type="number"
                    value={newBook.stock}
                    onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })}
                    className="w-full p-3 bg-[#faf6ef] border border-[#dfcaa9] rounded-xl text-sm"
                    placeholder="15"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#664f43] mb-1">Cover Image URL</label>
                <input
                  required
                  type="text"
                  value={newBook.image}
                  onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
                  className="w-full p-3 bg-[#faf6ef] border border-[#dfcaa9] rounded-xl text-sm"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#664f43] mb-1">Synopsis</label>
                <textarea
                  rows="3"
                  value={newBook.description}
                  onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                  className="w-full p-3 bg-[#faf6ef] border border-[#dfcaa9] rounded-xl text-sm"
                  placeholder="Tell readers about this story..."
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl bg-[#f4ebe1] text-[#3d2319] font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#8b2e23] text-white font-bold text-sm shadow-md"
                >
                  Publish to Shelves
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] bg-[#160d09]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fffdf9] rounded-3xl border border-[#ebdcc2] max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#ebdcc2]">
              <div>
                <h3
                  className="text-lg font-bold font-serif text-[#2a1710]"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  Order #{selectedOrder._id?.slice(-6)?.toUpperCase()}
                </h3>
                <p className="text-xs text-[#735c4f]">Customer Parcel Details</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full bg-[#f4ebe1] text-[#3d2319] hover:bg-[#8b2e23] hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#523d32]">
              <div className="bg-[#faf6ef] p-4 rounded-2xl border border-[#ebdcc2]">
                <p className="font-bold text-[#2a1710] mb-1">
                  Recipient: {selectedOrder.shippingAddress?.name}
                </p>
                <p className="text-xs text-[#735c4f]">
                  {selectedOrder.shippingAddress?.email} • {selectedOrder.shippingAddress?.phone}
                </p>
                <p className="text-xs text-[#523d32] mt-2">
                  {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city} -{' '}
                  {selectedOrder.shippingAddress?.postalCode}
                </p>
              </div>

              <div>
                <p className="font-bold text-[#2a1710] mb-2 uppercase text-[10px] tracking-wider text-[#8c7468]">
                  Ordered Titles
                </p>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between p-2.5 bg-[#fbf7f0] rounded-xl border border-[#ebdcc2]"
                    >
                      <span>
                        {item.title || 'Volume'} (x{item.quantity})
                      </span>
                      <span className="font-serif font-bold text-[#8b2e23]">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#ebdcc2] flex justify-between items-center">
                <span className="font-bold text-[#2a1710]">Update Status:</span>
                <div className="flex gap-1.5">
                  {['Pending', 'Shipped', 'Delivered'].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleUpdateStatus(selectedOrder._id, s)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedOrder.status === s
                          ? 'bg-[#8b2e23] text-white'
                          : 'bg-[#f4ebe1] text-[#3d2319] hover:bg-[#ebdcc2]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
