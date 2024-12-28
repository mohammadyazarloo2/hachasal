"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from "framer-motion";
import ArticleCard from "../components/blog/ArticleCard";
import ArticleFilters from "../components/blog/ArticleFilters";
import ArticleSearch from "../components/blog/ArticleSearch";
import Pagination from "../components/blog/Pagination";
import Breadcrumb from "../components/blog/Breadcrumb";
import ArticleAnalytics from "../components/blog/ArticleAnalytics";

export default function BlogPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        category: selectedCategory !== 'all' ? selectedCategory : '',
        tags: selectedTags.join(','),
        page: currentPage.toString()
      });

      const response = await fetch(`/api/articles?${params}`);
      const data = await response.json();
      
      if (data.articles) {
        setArticles(data.articles);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, selectedTags, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Breadcrumb category={selectedCategory} />
      
      <ArticleSearch 
        onSearch={(term) => {
          // Handle search logic
        }} 
      />
      
      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-12 lg:col-span-3">
          <ArticleFilters
            selectedCategory={selectedCategory}
            selectedTags={selectedTags}
            onCategoryChange={setSelectedCategory}
            onTagChange={(tag) => {
              setSelectedTags(prev => 
                prev.includes(tag) 
                  ? prev.filter(t => t !== tag)
                  : [...prev, tag]
              );
            }}
          />
        </div>

        <div className="col-span-12 lg:col-span-9">
          <ArticleAnalytics />
          
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {articles.map(article => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          )}

          {articles.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
