import mongoose, { Schema, ObjectId } from "mongoose";
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 3,
    },
    price: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    categoryId: {
      type: [ObjectId],
      ref: "Cateproduct",
    },
    imgPrdId: {
      type: ObjectId,
      ref: "imgPrdSchema",
    },

    slug: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", ProductSchema);