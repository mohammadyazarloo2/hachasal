import { connectMongoDB } from '@/lib/mongodb';
import Article from '@/models/article';

export async function GET(request) {
  await connectMongoDB();
  
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = 6;
  const category = searchParams.get('category');
  const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];

  const query = {};
  if (category && category !== 'all') {
    query.category = category;
  }
  if (tags.length > 0) {
    query.tags = { $in: tags };
  }

  const totalArticles = await Article.countDocuments(query);
  const articles = await Article.find(query)
    .sort({ publishedAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('author', 'name avatar');

  return Response.json({
    articles,
    pagination: {
      pages: Math.ceil(totalArticles / limit),
      current: page
    }
  });
}
