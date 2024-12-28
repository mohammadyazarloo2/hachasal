import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiStar, HiHeart, HiScale, HiShoppingCart } from "react-icons/hi";

export default function ProductCard({
  product,
  isFavorite,
  isComparing,
  onFavoriteClick,
  onCompareClick,
}) {
  console.log(product);
  return (
    <Link href={`/products/${product._id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden group"
      >
        <div className="relative h-48">
          <Image
            src={product.mainImage?.url || "/placeholder-product.jpg"}
            alt={product.mainImage?.alt || product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform group-hover:scale-110"
          />
          <div className="absolute top-3 right-3 space-y-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                onFavoriteClick();
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                ${
                  isFavorite
                    ? "bg-red-500 text-white"
                    : "bg-white/80 text-gray-600 hover:bg-white"
                }`}
            >
              <motion.div animate={{ scale: isFavorite ? [1, 1.2, 1] : 1 }}>
                <HiHeart
                  className={isFavorite ? "fill-current" : "stroke-current"}
                />
              </motion.div>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                onCompareClick();
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                ${
                  isComparing
                    ? "bg-amber-500 text-white"
                    : "bg-white/80 text-gray-600 hover:bg-white"
                }`}
            >
              <HiScale />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <HiStar
                  key={i}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-current"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviews} نظر)
            </span>
          </div>

          <h3 className="font-bold mb-2 text-gray-700">{product.name}</h3>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg text-gray-700">
              {new Intl.NumberFormat("fa-IR").format(product.price)} تومان
            </span>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <HiShoppingCart />
              <span>خرید</span>
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
