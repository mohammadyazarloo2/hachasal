import { connectMongoDB } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;

    const product = await Product.findById(id);

    if (!product) {
      return Response.json({ message: 'Product not found' }, { status: 404 });
    }

    const related = await Product.find({
      category: product.category,
      _id: { $ne: id }
    }).limit(3);

    return Response.json({
      product,
      related
    });
    
  } catch (error) {
    console.log('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    return Response.json({ message: error.message }, { status: 500 });
  }
}
