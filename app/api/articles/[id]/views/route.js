import { connectMongoDB } from '@/lib/mongodb';
import Article from '@/models/article';

export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;

    const article = await Article.findById(id);
    return Response.json({ views: article.views });
    
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;

    const article = await Article.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    return Response.json({ views: article.views });
    
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
