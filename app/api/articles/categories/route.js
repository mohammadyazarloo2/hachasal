import { connectMongoDB } from "@/lib/mongodb";
import Article from "@/models/article";

export async function GET() {
  try {
    await connectMongoDB();
    const categories = await Article.distinct('category');
    return Response.json(categories);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
