import { motion } from "framer-motion";
import Link from "next/link";
import { HiHome, HiChevronLeft } from "react-icons/hi";

export default function Breadcrumb({ category }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-4 mb-6 mt-5"
    >
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 text-gray-600 hover:text-amber-500 transition-colors duration-200"
            >
              <HiHome className="text-lg" />
              <span>خانه</span>
            </Link>
          </li>

          <li className="flex items-center">
            <HiChevronLeft className="text-gray-400 mx-2" />
            <Link
              href="/products"
              className="text-gray-600 hover:text-amber-500 transition-colors duration-200"
            >
              محصولات
            </Link>
          </li>

          {category && (
            <li className="flex items-center">
              <HiChevronLeft className="text-gray-400 mx-2" />
              <span className="text-amber-500 font-medium">
                {category.name}
              </span>
            </li>
          )}
        </ol>
      </div>
    </motion.nav>
  );
}
