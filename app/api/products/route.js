import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET(request) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const query = {
      status: "active",
      ...(category && { category }),
    };

    const products = await Product.find(query)
      .select("name price mainImage likes stock")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
