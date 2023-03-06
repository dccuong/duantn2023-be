import mongoose, { Schema } from "mongoose";
const imgPrdSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      minlength: 3,
    },
    url1: {
      type: String,
      require: true,
    },
    url2: {
      type: String,
      require: true,
    },
    url3: {
      type: String,
      require: true,
    },
    url4: {
      type: String,
    },
    url5: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

imgPrdSchema.pre(/^find/, function (next) {
    this.populate("products");
  
    next();
  });
  
  imgPrdSchema.virtual("products", {
    ref: "Product",
    foreignField: "imgPrd",
    localField: "_id",
  });
export default mongoose.model("imgPrdSchema", imgPrdSchema);
