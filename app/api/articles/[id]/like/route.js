import { connectMongoDB } from '@/lib/mongodb';
import Article from '@/models/article';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return Response.json({ message: 'Authentication required' }, { status: 401 });
    }

    await connectMongoDB();
    const { id } = params;
    const userId = session.user.id;

    const article = await Article.findById(id);
    
    if (!article) {
      return Response.json({ message: 'Article not found' }, { status: 404 });
    }

    const hasLiked = article.likes?.includes(userId);
    
    if (hasLiked) {
      article.likes = article.likes.filter(id => id.toString() !== userId.toString());
    } else {
      if (!article.likes) {
        article.likes = [];
      }
      article.likes.push(userId);
    }
    
    await article.save();

    return Response.json({ 
      likes: article.likes.length,
      hasLiked: !hasLiked 
    });

  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}