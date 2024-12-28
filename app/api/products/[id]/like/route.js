import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Product from "@/models/Product";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'لطفا وارد شوید' }, { status: 401 });
    }

    await connectMongoDB();
    const product = await Product.findById(params.id);
    
    if (!product) {
      return NextResponse.json({ error: 'محصول یافت نشد' }, { status: 404 });
    }

    // Check if user already liked
    if (product.likedBy.includes(session.user.id)) {
      return NextResponse.json({ error: 'شما قبلا این محصول را لایک کرده‌اید' }, { status: 400 });
    }

    // Add user to likedBy array
    product.likedBy.push(session.user.id);
    product.likes = product.likedBy.length;
    await product.save();

    return NextResponse.json({ 
      success: true,
      likes: product.likes,
      isLiked: true
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'لطفا وارد شوید' }, { status: 401 });
    }

    await connectMongoDB();
    const product = await Product.findById(params.id);
    
    if (!product) {
      return NextResponse.json({ error: 'محصول یافت نشد' }, { status: 404 });
    }

    // Remove user from likedBy array with proper type checking
    product.likedBy = product.likedBy.filter(id => 
      id && session.user.id && id.toString() !== session.user.id.toString()
    );
    product.likes = product.likedBy.length;
    await product.save();

    return NextResponse.json({ 
      success: true,
      likes: product.likes,
      isLiked: false
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}