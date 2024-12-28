import { motion } from "framer-motion";
import { HiFilter, HiStar } from "react-icons/hi";
import { useState, useEffect } from "react";

export default function ProductFilters({
  selectedCategory,
  priceRange,
  maxPrice,
  minRating,
  selectedFeatures,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onFeatureChange,
  onReset,
}) {
  const [categories, setCategories] = useState([]);
  const [productFeatures, setProductFeatures] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProductFeatures();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const fetchProductFeatures = async () => {
    try {
      const response = await fetch('/api/products/features');
      const data = await response.json();
      // Ensure we always set an array
      setProductFeatures(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching features:', error);
      setProductFeatures([]);
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
              key={category._id}
              onClick={() => onCategoryChange(category._id)}
              className={`w-full text-gray-700 text-right py-2 px-3 rounded-lg transition-colors ${
                selectedCategory === category._id
                  ? "bg-amber-50 text-amber-600"
                  : "hover:bg-gray-50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3 text-gray-700">محدوده قیمت</h3>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max={maxPrice}
            step={Math.ceil(maxPrice / 100)}
            value={priceRange[1]}
            onChange={(e) => onPriceChange([0, parseInt(e.target.value)])}
            className="w-full accent-amber-500 text-gray-700"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>
              از {new Intl.NumberFormat("fa-IR").format(priceRange[0])} تومان
            </span>
            <span>
              تا {new Intl.NumberFormat("fa-IR").format(priceRange[1]+205000)} تومان
            </span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">امتیاز محصول</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => onRatingChange(rating)}
              className={`w-full flex items-center gap-2 py-2 px-3 rounded-lg transition-colors ${
                minRating === rating ? "bg-amber-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <HiStar
                    key={i}
                    className={i < rating ? "fill-current" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">و بالاتر</span>
            </button>
          ))}
        </div>
      </div>

      {/* Features Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3 text-gray-700">ویژگی‌های محصول</h3>
        <div className="space-y-2">
          {productFeatures.map((feature) => (
            <label key={feature} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFeatures.includes(feature)}
                onChange={() => onFeatureChange(feature)}
                className="rounded text-amber-500 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={onReset}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition-colors"
      >
        پاک کردن فیلترها
      </button>
    </motion.div>
  );
}
