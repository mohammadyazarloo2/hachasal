export default function ArticleSchema({ article }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.mainImage?.url,
    "datePublished": article.createdAt,
    "dateModified": article.updatedAt,
    "author": {
      "@type": "Person",
      "name": article.author?.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "Your Site Name",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yoursite.com/logo.png"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
