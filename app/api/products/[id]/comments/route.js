import { connectMongoDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import ProductComments from "@/models/ProductComments";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req, { params }) {
  try {
    await connectMongoDB();
    const comments = await ProductComments.find({
      productId: params.id,
      status: "approved",
    })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();
    const body = await req.json();

    const comment = await ProductComments.create({
      productId: params.id,
      userId: session.user.id,
      rating: body.rating,
      text: body.text,
    });

    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
