import { connectMongoDB } from '@/lib/mongodb';
import Comment from '@/app/models/Comment';

export async function GET(request, { params }) {
  await connectMongoDB();
  const { articleId } = params;

  const comments = await Comment.find({ article: articleId })
    .populate('author', 'name avatar')
    .sort({ createdAt: -1 });

  return Response.json(comments);
}

export async function POST(request, { params }) {
  await connectMongoDB();
  const { articleId } = params;
  const { content, parentId } = await request.json();

  const comment = await Comment.create({
    content,
    article: articleId,
    parent: parentId,
    author: request.user._id // You'll need to implement authentication
  });

  const populatedComment = await comment.populate('author', 'name avatar');

  return Response.json(populatedComment);
}
