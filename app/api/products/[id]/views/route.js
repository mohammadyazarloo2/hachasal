import { NextResponse } from "next/server";
import { connectMongoDB } from '@/lib/mongodb';
import Product from "@/models/Product";

export async function POST(req, { params }) {
  try {
    await connectMongoDB();
    
    const product = await Product.findByIdAndUpdate(
      params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ views: product.views });
    
  } catch (error) {
    return NextResponse.json(
      { error: "Error incrementing views" },
      { status: 500 }
    );
  }
}
