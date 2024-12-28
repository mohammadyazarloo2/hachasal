"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiClock, HiUser, HiEye, HiHeart } from "react-icons/hi";
import Breadcrumb from "../../components/blog/Breadcrumb";
import RelatedArticles from "../../components/blog/RelatedArticles";
import ArticleShare from "../../components/blog/ArticleShare";
import ArticleComments from "../../components/blog/ArticleComments";
import ArticleMedia from "../../components/blog/ArticleMedia";
import ArticleMeta from "../../components/blog/ArticleMeta";
import ArticleSchema from "../../components/blog/ArticleSchema";
import ArticleAnalytics from "../../components/blog/ArticleAnalytics";
import VideoPlayer from "../../components/blog/VideoPlayer";
import { useSession } from "next-auth/react";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [views, setViews] = useState(0);
  const { data: session } = useSession();

  const checkLikeStatus = async () => {
    const response = await fetch(`/api/articles/${id}/like/status`);
    const data = await response.json();
    setHasLiked(data.hasLiked);
  };

  useEffect(() => {
    if (id) {
      fetchArticle();
      updateViews();
      checkLikeStatus();
    }
  }, [id]);

  const updateViews = async () => {
    const response = await fetch(`/api/articles/${id}/views`, {
      method: "POST",
    });
    const data = await response.json();
    setViews(data.views);
  };

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/articles/${id}`);
      const data = await response.json();
      setArticle(data.article);
      setRelatedArticles(data.related || []);
      setLikes(data.article?.likes?.length || 0);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching article:", error);
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    const response = await fetch(`/api/articles/${id}/like`, {
      method: 'POST'
    });
    const data = await response.json();
    setLikes(data.likes);
    setHasLiked(data.hasLiked);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <>
      <ArticleMeta article={article} />
      <ArticleSchema article={article} />

      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumb category={article.category} />

        <div className="grid grid-cols-12 gap-6">
          <article className="col-span-12 lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-96">
                <Image
                  src={article.mainImage?.url}
                  alt={article.mainImage?.alt || article.title}
                  fill
                  className="object-cover"
                />
              </div>

              <button
                onClick={handleLike}
                className={`flex items-center gap-2 ${
                  hasLiked ? "text-red-500" : "text-gray-700"
                }`}
              >
                <HiHeart
                  className={`text-xl ${hasLiked ? "fill-current" : ""}`}
                />
                <span>{likes}</span>
              </button>

              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4 text-gray-700">
                  {article.title}
                </h1>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <HiClock />
                      <span>
                        {new Date(article.createdAt).toLocaleDateString(
                          "fa-IR"
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HiEye />
                      <span>{article.views}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <HiUser />
                    <span>{article.author?.name}</span>
                  </div>
                </div>

                <ArticleMedia article={article} />

                <div
                  className="prose prose-lg max-w-none mt-6 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {article.tags?.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            <div className="mt-6">
              <ArticleShare article={article} />
            </div>

            <div className="mt-6">
              <ArticleAnalytics articleId={article._id} />
            </div>

            <div className="mt-6">
              <ArticleComments articleId={article._id} />
            </div>
          </article>

          <aside className="col-span-12 lg:col-span-4">
            <RelatedArticles articles={relatedArticles} />
          </aside>
        </div>
      </div>
    </>
  );
}
