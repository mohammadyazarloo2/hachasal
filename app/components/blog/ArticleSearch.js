import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiX } from 'react-icons/hi';

export default function ArticleSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm py-4"
    >
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="جستجو در مقالات..."
          className="w-full bg-gray-50 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                onSearch('');
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <HiX />
            </button>
          )}
          <button
            type="submit"
            className="text-amber-500 hover:text-amber-600"
          >
            <HiSearch className="text-xl" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
