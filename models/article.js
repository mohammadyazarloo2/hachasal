import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    mainImage: {
      url: String,
      alt: String,
    },
    images: [
      {
        url: String,
        alt: String,
        order: Number,
      },
    ],
    media: {
      video: {
        url: String,
        title: String,
        duration: String,
        size: String,
        provider: {
          type: String,
          default: "youtube",
        },
      },
      podcast: {
        url: String,
        title: String,
        duration: String,
        size: String,
      },
    },
    category: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    seo: {
      title: String,
      description: String,
      keywords: [String],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
  },
  {
    timestamps: true,
  }
);

const Article =
  mongoose.models.Article || mongoose.model("Article", articleSchema);

export default Article;
