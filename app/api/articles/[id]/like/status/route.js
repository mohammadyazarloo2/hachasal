import { connectMongoDB } from '@/lib/mongodb';
import Article from '@/models/article';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  await connectMongoDB();
  const { id } = params;
  const mockUserId = new mongoose.Types.ObjectId();

  const article = await Article.findById(id);
  const hasLiked = article.likes?.includes(mockUserId);

  return Response.json({ hasLiked });
}
