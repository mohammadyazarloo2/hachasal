import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectMongoDB();
    const features = await Product.distinct('attributes.value');
    return Response.json(features);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
