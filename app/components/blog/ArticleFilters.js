import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiFilter } from "react-icons/hi";

export default function ArticleFilters({
  selectedCategory,
  selectedTags,
  onCategoryChange,
  onTagChange
}) {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/articles/categories');
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/articles/tags');
      const data = await response.json();
      setTags(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 sticky top-4"
    >
      <div className="flex items-center gap-2 mb-6">
        <HiFilter className="text-xl text-amber-500" />
        <h2 className="font-bold text-gray-700">فیلترها</h2>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3 text-gray-700">دسته‌بندی</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-right py-2 px-3 rounded-lg transition-colors ${
                selectedCategory === category
                  ? "bg-amber-50 text-amber-600"
                  : "hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tags Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3 text-gray-700">برچسب‌ها</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagChange(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-amber-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
