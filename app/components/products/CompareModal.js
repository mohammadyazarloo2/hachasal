import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiStar } from "react-icons/hi";

function CompareItem({ title, value }) {
  return (
    <div className="border-b pb-2">
      <span className="text-gray-600 text-sm">{title}:</span>
      <div className="mt-1">{value}</div>
    </div>
  );
}

export default function CompareModal({ products, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-auto"
          >
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">مقایسه محصولات</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="space-y-4">
                  <Image
                    src={product.mainImage?.url || '/placeholder-product.jpg'}
                    width={200}
                    height={200}
                    alt={product.name}
                    className="rounded-lg mx-auto"
                  />
                  <h3 className="font-bold text-center">{product.name}</h3>

                  <div className="space-y-3">
                    <CompareItem
                      title="قیمت"
                      value={`${product.price.toLocaleString()} تومان`}
                    />
                    <CompareItem
                      title="امتیاز"
                      value={
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <HiStar
                              key={i}
                              className={i < product.rating ? "fill-current" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      }
                    />
                    <CompareItem
                      title="ویژگی‌ها"
                      value={
                        <div className="flex flex-wrap gap-1">
                          {product.features?.map((feature) => (
                            <span
                              key={feature}
                              className="bg-amber-50 text-amber-600 text-xs px-2 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
