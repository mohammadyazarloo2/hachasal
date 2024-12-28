import { motion } from "framer-motion";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center gap-4 mt-8"
    >
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
      >
        <HiChevronRight className="text-xl" />
      </button>

      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`w-10 h-10 rounded-lg transition-colors ${
              currentPage === i + 1
                ? "bg-amber-500 text-white"
                : "bg-white hover:bg-gray-50 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
      >
        <HiChevronLeft className="text-xl" />
      </button>
    </motion.div>
  );
}
