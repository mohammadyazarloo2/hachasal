import Head from 'next/head';

export default function ArticleMeta({ article }) {
  return (
    <>
      <Head>
        <title>{article.seo?.title || article.title}</title>
        <meta name="description" content={article.seo?.description || article.excerpt} />
        <meta name="keywords" content={article.seo?.keywords?.join(', ') || article.tags?.join(', ')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={article.seo?.title || article.title} />
        <meta property="og:description" content={article.seo?.description || article.excerpt} />
        <meta property="og:image" content={article.mainImage?.url} />
        <meta property="og:type" content="article" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.seo?.title || article.title} />
        <meta name="twitter:description" content={article.seo?.description || article.excerpt} />
        <meta name="twitter:image" content={article.mainImage?.url} />
      </Head>
    </>
  );
}
