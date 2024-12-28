import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    image: {
      url: String,
      alt: String,
    },
    media: {
      video: {
        url: String,
        title: String,
        provider: String, // youtube, vimeo, etc.
        size: String,
      },
      podcast: {
        url: String,
        title: String,
        duration: String,
        size: String,
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    attributes: [
      {
        name: String,
        type: String, // text, number, select, etc.
        required: Boolean,
        options: [String], // for select type
      },
    ],
    seo: {
      title: String,
      description: String,
      keywords: [String],
    },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
