"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HiStar,
  HiUser,
  HiLockOpen,
  HiUserAdd,
  HiShoppingCart,
} from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); // Initialize with empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
      setSelectedCategory(data[0]?._id); // Select first category by default
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
    setLoading(false);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = selectedCategory
        ? `/api/products?category=${selectedCategory}`
        : "/api/products";
      const response = await fetch(url);
      const data = await response.json();
      // Ensure we're setting an array of products
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error fetching products:", error);
      setProducts([]); // Fallback to empty array on error
    }
    setLoading(false);
  };

  const LoadingSkeleton = () => {
    return (
      <div className="animate-pulse">
        {/* Categories Skeleton */}
        <div className="bg-white/50 backdrop-blur-sm border border-amber-100 rounded-2xl p-3 mb-6 mt-4">
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 w-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Skeleton */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-gray-200 rounded-xl h-64"></div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-8">
                <div className="h-6 w-32 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl border">
                    <div className="h-52 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 w-3/4 bg-gray-200 rounded mb-4"></div>
                      <div className="flex justify-between items-center mb-4">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="h-4 w-12 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-10 bg-gray-200 rounded-lg"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          {/* Categories Carousel */}
          <div className="relative bg-white/50 backdrop-blur-sm border border-amber-100 rounded-2xl p-3 mb-6 mt-4">
            <Swiper
              modules={[FreeMode, Navigation]}
              spaceBetween={12}
              slidesPerView="auto"
              freeMode={true}
              navigation={true}
              className="categories-swiper !px-2"
            >
              {categories.map((category) => (
                <SwiperSlide key={category._id} className="!w-auto">
                  <Link href={`/products?category=${category._id}`}>
                    <button
                      onClick={() => setSelectedCategory(category._id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm transition-all duration-300
          ${
            selectedCategory === category._id
              ? "bg-amber-400 shadow-lg shadow-amber-400/20 scale-105 text-black"
              : "bg-white hover:bg-gray-50"
          }`}
                    >
                      {category.image && (
                        <Image
                          src={category.image.url}
                          alt={category.image.alt}
                          width={24}
                          height={24}
                          className="object-cover"
                        />
                      )}
                      <span className="font-medium whitespace-nowrap text-black">
                        {category.name}
                      </span>
                    </button>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-4">
                <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl shadow-lg overflow-hidden">
                  <h3 className="p-4 text-white font-bold border-b border-white/10">
                    دسترسی سریع
                  </h3>
                  <div className="p-2">
                    <Link
                      href="/users"
                      className="flex items-center gap-2 p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <HiUser className="text-xl" />
                      <span>صفحه کاربری</span>
                    </Link>
                    <Link
                      href="/login"
                      className="flex items-center gap-2 p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <HiLockOpen className="text-xl" />
                      <span>ورود به سایت</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="col-span-12 lg:col-span-9">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-gray-700">
                    محصولات ویژه
                  </h2>
                  <Link
                    href="/products"
                    className="text-amber-500 hover:text-amber-600 transition-colors"
                  >
                    مشاهده همه →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Link
                      href={`/products/${product._id}`}
                      key={product._id}
                      className="group bg-white rounded-xl border hover:border-amber-200 overflow-hidden transition-all hover:shadow-xl"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={
                            product.mainImage?.url || "/placeholder-image.jpg"
                          } // Add a fallback image
                          alt={product.mainImage?.alt || product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 mb-2">
                          {product.name}
                        </h3>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-green-600 font-medium">
                            {new Intl.NumberFormat("fa-IR").format(
                              product.price
                            )}{" "}
                            تومان
                          </span>
                          <div className="flex items-center gap-1">
                            <HiStar className="text-amber-400" />
                            <span className="text-sm text-gray-600">
                              {product.likes || 0}
                            </span>
                          </div>
                        </div>
                        <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg py-2.5 flex items-center justify-center gap-2 transition-all">
                          <HiShoppingCart className="text-xl" />
                          افزودن به سبد
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
