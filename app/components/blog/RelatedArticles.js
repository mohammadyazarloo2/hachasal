import Link from 'next/link';
import Image from 'next/image';

export default function RelatedArticles({ articles }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Related Articles</h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <Link 
            href={`/blog/${article._id}`} 
            key={article._id}
            className="flex gap-4 group"
          >
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h3 className="font-semibold group-hover:text-blue-600">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {article.excerpt.substring(0, 80)}...
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
