import Mongoose from "mongoose";

const GallerySchema = new Mongoose.Schema(
  {
    image: { type: String, required: true },
    content: { type: String },
    title: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const GalleryModel = Mongoose.model("Gallery", GallerySchema);
export default GalleryModel;
