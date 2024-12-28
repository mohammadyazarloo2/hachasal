import { connectMongoDB } from "@/lib/mongodb";
import Article from "@/models/article";

export async function GET() {
  try {
    await connectMongoDB();
    const tags = await Article.distinct('tags');
    return Response.json(tags);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
