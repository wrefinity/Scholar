import Mongoose from "mongoose";

const PergentSchema = new Mongoose.Schema(
  {
    image: { type: String },
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    payments: { type: Number, default: 0 },
    title: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "CatPergent",
      required: true,
    },
    voters: {
      type: [String],
      default: [],
      required: false,
    },
  },
  { timestamps: true }
);
const Pergent = Mongoose.model("Pergent", PergentSchema);
export default Pergent;
