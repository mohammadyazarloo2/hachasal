import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0
  },
  mainImage: {
    url: String,
    alt: String
  },
  images: [{
    url: String,
    alt: String,
    order: Number
  }],
  media: {
    video: {
      url: String,
      duration: String,
      size: String,
      provider: String
    },
    podcast: {
      url: String,
      duration: String,
      size: String
    }
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  attributes: [{
    name: String,
    value: String
  }],
  specifications: [{
    title: String,
    value: String
  }],
  stock: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  tags: [String],
  slug: {
    type: String,
    unique: true
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
