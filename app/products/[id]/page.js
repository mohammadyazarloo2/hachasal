"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  HiStar,
  HiShoppingCart,
  HiHeart,
  HiScale,
  HiHome,
  HiChevronLeft,
  HiEye,
  HiTag,
  HiInformationCircle,
  HiChat,
  HiThumbUp,
} from "react-icons/hi";
import { useToast } from "@/app/components/ui/toast";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/features/cartSlice";
import { useSession } from "next-auth/react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function ProductDetails() {
  const { data: session } = useSession();
  const params = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        await fetch(`/api/products/${params.id}/views`, {
          method: "POST",
        });
      } catch (error) {
        console.error("Error incrementing views:", error);
      }
    };

    if (params.id) {
      incrementViews();
    }
  }, [params.id]);

  useEffect(() => {
    if (product?.likedBy?.includes(session?.user?.id)) {
      setIsLiked(true);
    }
  }, [product, session]);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${params?.id}`);
      const data = await response.json();
      setProduct(data.product);

      // ترکیب تصویر اصلی با بقیه تصاویر
      const allImages = [
        { url: data.product.mainImage?.url, alt: data.product.mainImage?.alt },
        ...(data.product.images || []),
      ].filter((img) => img?.url); // حذف تصاویر خالی

      setSelectedImage(allImages[0]?.url);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    setLoading(false);
  };

  // اضافه کردن function لایک
  const handleLike = async () => {
    if (!session) {
      toast({
        title: "لطفا ابتدا وارد شوید",
      });
      return;
    }

    try {
      const method = isLiked ? "DELETE" : "POST";
      const response = await fetch(`/api/products/${params.id}/like`, {
        method: method,
      });
      const data = await response.json();

      if (data.error) {
        toast({
          title: data.error,
          variant: "destructive",
        });
        return;
      }

      setIsLiked(!isLiked);
      setProduct((prev) => ({
        ...prev,
        likes: data.likes,
        likedBy:
          method === "POST"
            ? [...(prev.likedBy || []), session.user.id]
            : prev.likedBy.filter((id) => id !== session.user.id),
      }));

      toast({
        title: data.message || (isLiked ? "لایک برداشته شد" : "محصول لایک شد"),
      });
    } catch (error) {
      toast({
        title: "خطا در ثبت لایک",
        variant: "destructive",
      });
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    toast({
      title: "به سبد خرید اضافه شد",
    });
  };

  const handleSubmitComment = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          text: comment,
        }),
      });

      if (response.ok) {
        setComment("");
        setRating(5);
        toast({
          title: "نظر شما با موفقیت ثبت شد",
        });
        // Refresh comments
        fetchProduct();
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 w-48 bg-gray-200 rounded mb-6"></div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-[500px] bg-gray-200 rounded-lg"></div>
              <div className="space-y-6">
                <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">محصول یافت نشد</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb product={product} categories={categories} />

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gallery Section */}
          <div className="space-y-4">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              {selectedImage ? (
                <Zoom
                  zoomMargin={80}
                  overlayBgColorEnd="rgba(0, 0, 0, 0.85)"
                  openTrigger="doubleClick"
                >
                  <Image
                    src={selectedImage}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform hover:scale-110"
                  />
                </Zoom>
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">تصویر محصول موجود نیست</span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { url: product.mainImage?.url, alt: product.mainImage?.alt },
                ...(product.images || []),
              ]
                .filter((img) => img?.url)
                .map((image, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(image.url)}
                    className={`relative h-24 rounded-lg overflow-hidden border-2 cursor-pointer ${
                      selectedImage === image.url
                        ? "border-amber-500"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || `تصویر ${idx + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-700">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isLiked
                        ? "bg-red-50 text-red-500"
                        : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
                    }`}
                  >
                    <HiHeart
                      className={`text-xl transition-colors duration-300 ${
                        isLiked ? "text-red-500 fill-red-500" : "text-gray-400"
                      }`}
                    />
                    <span>{product.likes || 0}</span>
                  </button>
                  <div className="flex items-center gap-2 text-gray-500">
                    <HiEye className="text-xl" />
                    <span>{product.views || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
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
              <span className="text-gray-600">({product.reviews} نظر)</span>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Attributes */}
            {product.attributes?.length > 0 && (
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                {product.attributes.map((attr, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <HiInformationCircle />
                    <span className="font-medium">{attr.name}:</span>
                    <span>{attr.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 text-gray-700">
                {product.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                  >
                    <HiTag className="inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Price & Cart */}
            <div className="pt-6 border-t">
              <div className="flex items-center justify-between mb-4 text-gray-700">
                {product?.price && (
                  <>
                    {product.discount ? (
                      <div>
                        <span className="text-3xl font-bold text-green-600">
                          {(
                            product.price *
                            (1 - product.discount / 100)
                          ).toLocaleString()}{" "}
                          تومان
                        </span>
                        <span className="text-lg text-gray-400 line-through mr-2">
                          {product.price.toLocaleString()} تومان
                        </span>
                      </div>
                    ) : (
                      <span className="text-3xl font-bold">
                        {product.price.toLocaleString()} تومان
                      </span>
                    )}
                  </>
                )}
              </div>

              <div className="flex items-center gap-4 text-gray-700">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.stock}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <HiShoppingCart className="text-xl" />
                  {product.stock ? "افزودن به سبد خرید" : "ناموجود"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      {product.specifications?.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 text-gray-700">
          <h2 className="text-xl font-bold mb-4">مشخصات فنی</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specifications.map((spec, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium">{spec.title}:</span>
                <span className="text-gray-600">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-700">
            <HiChat className="text-amber-500" />
            نظرات کاربران
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-600">
              <HiStar className="text-amber-400" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-sm">از 5</span>
            </div>
            <div className="text-sm text-gray-500">({product.reviews} نظر)</div>
          </div>
        </div>

        {/* Comment Form */}
        <div className="bg-amber-50 rounded-lg p-6 mb-8 text-gray-700">
          <h3 className="font-bold mb-4">نظر خود را ثبت کنید</h3>
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                className={`text-2xl ${
                  i < rating ? "text-amber-400" : "text-gray-300"
                }`}
                onClick={() => setRating(i + 1)}
              >
                <HiStar />
              </button>
            ))}
          </div>
          <textarea
            className="w-full p-4 border rounded-lg mb-4 resize-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            rows="4"
            placeholder="نظر خود را بنویسید..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={handleSubmitComment}
            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
          >
            ثبت نظر
          </button>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._id} className="border-b pb-6 last:border-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    {comment.user?.name?.[0] || "?"}
                  </div>
                  <div>
                    <div className="font-medium">{comment.user?.name}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <HiStar
                      key={i}
                      className={`${
                        i < comment.rating ? "text-amber-400" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{comment.text}</p>
              <div className="flex items-center gap-4 mt-4">
                <button className="flex items-center gap-1 text-gray-500 hover:text-amber-500">
                  <HiThumbUp />
                  <span className="text-sm">مفید بود</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {product.related?.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">محصولات مرتبط</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.related.map((item) => (
              <Link
                key={item._id}
                href={`/products/${item._id}`}
                className="group bg-white rounded-xl border hover:border-amber-200 overflow-hidden transition-all hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={item.mainImage?.url}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2">{item.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-medium">
                      {item.price?.toLocaleString()} تومان
                    </span>
                    <div className="flex items-center gap-1">
                      <HiStar className="text-amber-400" />
                      <span className="text-sm text-gray-600">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Breadcrumb({ product, categories }) {
  const categoryName =
    categories.find((cat) => cat._id === product.category)?.name ||
    product.category;

  return (
    <nav className="bg-white p-4 rounded-lg shadow-sm mb-6">
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

        <li className="flex items-center">
          <HiChevronLeft className="text-gray-400 mx-2" />
          <Link
            href={`/products?category=${product.category}`}
            className="text-gray-600 hover:text-amber-500 transition-colors duration-200"
          >
            {categoryName}
          </Link>
        </li>

        <li className="flex items-center">
          <HiChevronLeft className="text-gray-400 mx-2" />
          <span className="text-amber-500 font-medium">{product.name}</span>
        </li>
      </ol>
    </nav>
  );
}
