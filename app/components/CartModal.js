import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/app/redux/features/cartSlice";
import Image from "next/image";
import { HiX, HiPlus, HiMinus, HiTrash } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function CartModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl"
          >
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-bold text-gray-700">سبد خرید</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <HiX className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {items.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex gap-4 mb-4 p-3 border rounded-lg"
                    >
                      <div className="relative w-20 h-20">
                        {item.product.image ? (
                          <Image
                            src={item.product.mainImage?.url}
                            alt={item.product.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded">
                            <span className="text-gray-700 text-xs">
                              بدون تصویر
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 text-gray-700">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <div className="text-amber-600">
                          {item.product.price.toLocaleString()} تومان
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  productId: item.product._id,
                                  quantity: Math.max(0, item.quantity - 1),
                                })
                              )
                            }
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <HiMinus className="w-4 h-4" />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  productId: item.product._id,
                                  quantity: item.quantity + 1,
                                })
                              )
                            }
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <HiPlus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              dispatch(removeFromCart(item.product._id))
                            }
                            className="p-1 text-red-500 hover:bg-red-50 rounded ml-auto"
                          >
                            <HiTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t p-4 text-gray-700">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">جمع کل:</span>
                    <span className="font-bold">
                      {total.toLocaleString()} تومان
                    </span>
                  </div>
                  <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600">
                    تکمیل خرید
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
