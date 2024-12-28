"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from "framer-motion";
import ProductCard from "../components/products/ProductCard";
import ProductFilters from "../components/products/ProductFilters";
import ProductSort from "../components/products/ProductSort";
import Pagination from "../components/products/Pagination";
import Breadcrumb from "../components/products/Breadcrumb";
import CompareModal from "../components/products/CompareModal";
import { useToast } from "../components/ui/toast";
import ProductsSkeleton from "../components/products/ProductsSkeleton";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  // Initialize filters from URL
  useEffect(() => {
    const params = searchParams;
    setSelectedCategory(params.get('category') || 'all');
    setMinRating(parseInt(params.get('rating') || '0'));
    setSortBy(params.get('sort') || 'newest');
    setSelectedFeatures(params.get('features')?.split(',').filter(Boolean) || []);
    
    if (maxPrice > 0) {
      setPriceRange([
        parseInt(params.get('minPrice') || '0'),
        parseInt(params.get('maxPrice') || maxPrice.toString())
      ]);
    }
  }, [searchParams, maxPrice]);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = selectedCategory !== 'all'
        ? `/api/products?category=${selectedCategory}`
        : '/api/products';
      const response = await fetch(url);
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
        const highestPrice = Math.max(...data.map(p => p.price));
        setMaxPrice(highestPrice);
        if (priceRange[1] === 0) {
          setPriceRange([0, highestPrice]);
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply filters
    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory);
    }

    result = result.filter(p => 
      p.price >= priceRange[0] && 
      p.price <= priceRange[1] &&
      (p.rating || 0) >= minRating
    );

    if (selectedFeatures.length > 0) {
      result = result.filter(p => 
        selectedFeatures.every(feature => p.features?.includes(feature))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    setFilteredProducts(result);
    setTotalPages(Math.ceil(result.length / 6));
  }, [products, selectedCategory, priceRange, minRating, selectedFeatures, sortBy]);

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    const params = new URLSearchParams(searchParams);
    
    switch(type) {
      case 'category':
        value === 'all' ? params.delete('category') : params.set('category', value);
        setSelectedCategory(value);
        break;
      case 'price':
        if (value[0] > 0) params.set('minPrice', value[0]);
        else params.delete('minPrice');
        if (value[1] < maxPrice) params.set('maxPrice', value[1]);
        else params.delete('maxPrice');
        setPriceRange(value);
        break;
      case 'rating':
        value > 0 ? params.set('rating', value) : params.delete('rating');
        setMinRating(value);
        break;
      case 'features':
        const newFeatures = selectedFeatures.includes(value)
          ? selectedFeatures.filter(f => f !== value)
          : [...selectedFeatures, value];
        newFeatures.length > 0 
          ? params.set('features', newFeatures.join(','))
          : params.delete('features');
        setSelectedFeatures(newFeatures);
        break;
      case 'sort':
        value !== 'newest' ? params.set('sort', value) : params.delete('sort');
        setSortBy(value);
        break;
    }

    router.push(`/products?${params.toString()}`);
  };

  // Calculate displayed products
  const productsPerPage = 6;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  return loading ? <ProductsSkeleton /> : (
    <div className="max-w-7xl mx-auto px-4">
      <Breadcrumb category={selectedCategory} />
      
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <ProductFilters
            selectedCategory={selectedCategory}
            priceRange={priceRange}
            maxPrice={maxPrice}
            minRating={minRating}
            selectedFeatures={selectedFeatures}
            onCategoryChange={(value) => handleFilterChange('category', value)}
            onPriceChange={(value) => handleFilterChange('price', value)}
            onRatingChange={(value) => handleFilterChange('rating', value)}
            onFeatureChange={(value) => handleFilterChange('features', value)}
            onReset={() => {
              router.push('/products');
              setSelectedCategory('all');
              setPriceRange([0, maxPrice]);
              setMinRating(0);
              setSelectedFeatures([]);
              setSortBy('newest');
            }}
          />
        </div>

        <div className="col-span-12 lg:col-span-9">
          <ProductSort
            viewMode={viewMode}
            sortBy={sortBy}
            onViewModeChange={setViewMode}
            onSortChange={(value) => handleFilterChange('sort', value)}
            totalProducts={filteredProducts.length}
          />

          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          }`}>
            {displayedProducts.map(product => (
              <ProductCard
                key={product._id}
                product={product}
                isFavorite={favorites.includes(product._id)}
                isComparing={compareList.find(p => p._id === product._id)}
                onFavoriteClick={() => {
                  setFavorites(prev =>
                    prev.includes(product._id)
                      ? prev.filter(id => id !== product._id)
                      : [...prev, product._id]
                  );
                }}
                onCompareClick={() => {
                  setCompareList(prev => {
                    if (prev.find(p => p._id === product._id)) {
                      return prev.filter(p => p._id !== product._id);
                    }
                    if (prev.length < 3) {
                      return [...prev, product];
                    }
                    toast({
                      title: "حداکثر 3 محصول را می‌توانید مقایسه کنید",
                      variant: "destructive",
                    });
                    return prev;
                  });
                }}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <CompareModal
        products={compareList}
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
      />
    </div>
  );
}
