import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiClock, HiUser, HiEye, HiHeart } from "react-icons/hi";

import { useState } from "react";

export default function ArticleCard({ article }) {
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group"
    >
      <Link href={`/blog/${article._id}`}>
        <div className="relative h-48">
          <Image
            src={article.mainImage?.url}
            alt={article.mainImage?.alt || article.title}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
          {article.category && (
            <span className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-sm">
              {article.category}
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/blog/${article.slug}`}>
          <h3 className="font-bold text-xl text-gray-700 mb-2 group-hover:text-amber-500 transition-colors">
            {article.title}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <HiClock />
              <span>
                {new Date(article.createdAt).toLocaleDateString("fa-IR")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <HiEye />
              <span>{article.views}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <HiUser />
            <span className="text-gray-700">{article.author?.name}</span>
          </div>
        </div>

        {article.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        
      </div>
    </motion.div>
  );
}
