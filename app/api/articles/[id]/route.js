import { connectMongoDB } from '@/lib/mongodb';
import Article from '@/models/article';

export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;

    const article = await Article.findById(id)
      .populate('author', 'name avatar')
      .select('+likes');

    if (!article) {
      return Response.json({ message: 'Article not found' }, { status: 404 });
    }

    const related = await Article.find({
      category: article.category,
      _id: { $ne: id }
    })
      .limit(3)
      .populate('author', 'name avatar');

    return Response.json({
      article: {
        ...article._doc,
        likesCount: article.likes?.length || 0,
      },
      related
    });
    
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
