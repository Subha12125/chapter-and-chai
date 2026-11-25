import React, { useState, useEffect } from 'react';
import { HeroSection } from '../Components/home/HeroSection';
import { ValuePropsBar } from '../Components/home/ValuePropsBar';
import { CollectionsSection } from '../Components/home/CollectionsSection';
import { BookList } from '../Components/product/bookList';
import { AboutSection } from '../Components/home/AboutSection';
import { TestimonialsSection } from '../Components/home/TestimonialsSection';
import { NewsletterSection } from '../Components/home/NewsletterSection';
import { bookService } from '../Services/bookService';
import { Loader } from '../Components/common/loader';

export const Home = ({
  onBookSelect,
  selectedCategory = 'all',
  onCategoryChange,
  searchQuery = '',
}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const result = await bookService.getAllBooks();
      if (result.success) {
        setBooks(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchBooks();
  }, []);

  const handleShopNow = () => {
    const catalog = document.getElementById('catalog-section');
    if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBrowsePicks = () => {
    const collections = document.getElementById('collections-section');
    if (collections) collections.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter books by category and search query
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === 'all' ||
      (book.genre && book.genre.toLowerCase() === selectedCategory.toLowerCase());

    const matchesSearch =
      !searchQuery ||
      book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="py-24">
        <Loader isLoading={true} message="Brewing hot chai & loading shelves..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] p-6">
        <div className="bg-[#fffdf9] text-[#732219] p-8 rounded-3xl border border-[#ebdcc2] max-w-md text-center shadow-lg">
          <span className="text-4xl block mb-2">📜</span>
          <h3 className="font-serif font-bold text-xl text-[#2a1710]">
            Could Not Fetch Book Catalog
          </h3>
          <p className="text-sm text-[#7a6254] mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-5 py-2.5 rounded-xl bg-[#8b2e23] text-white text-xs font-bold hover:bg-[#a13529] transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 1. Hero Storefront & Reading Nook Section */}
      <HeroSection
        onShopNowClick={handleShopNow}
        onBrowsePicksClick={handleBrowsePicks}
      />

      {/* 2. Value Proposition Feature Bar */}
      <ValuePropsBar />

      {/* 3. Explore Our Collections */}
      <CollectionsSection onSelectCategory={onCategoryChange} />

      {/* 4. Curated Catalog / Bestselling Books */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookList
          books={filteredBooks}
          onBookSelect={onBookSelect}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          searchQuery={searchQuery}
        />
      </div>

      {/* 5. About Us ("A Bookstore with a Reader's Heart") */}
      <AboutSection />

      {/* 6. What Our Readers Say (Testimonials) */}
      <TestimonialsSection />

      {/* 7. Stay in the Loop (Newsletter with 10% discount badge) */}
      <NewsletterSection />
    </div>
  );
};
