import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const categories = await Category.find({ status: "active" })
      .select("name image slug")
      .sort({ createdAt: -1 });
    
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
