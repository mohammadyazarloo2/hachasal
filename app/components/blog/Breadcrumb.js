import { motion } from "framer-motion";
import Link from "next/link";
import { HiHome, HiChevronLeft } from "react-icons/hi";

export default function Breadcrumb({ category }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-4 mb-6"
    >
      <div className="flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="flex items-center gap-1 text-gray-600 hover:text-amber-500 transition-colors"
        >
          <HiHome className="text-lg" />
          <span>خانه</span>
        </Link>

        <HiChevronLeft className="text-gray-400" />
        
        <Link
          href="/blog"
          className="text-gray-600 hover:text-amber-500 transition-colors"
        >
          وبلاگ
        </Link>

        {category && (
          <>
            <HiChevronLeft className="text-gray-400" />
            <span className="text-amber-500">{category}</span>
          </>
        )}
      </div>
    </motion.nav>
  );
}
