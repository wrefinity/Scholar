import Mongoose from "mongoose";
const {Schema} = Mongoose

const SubSchema = Schema(
  {
    email: { type: String, required:true},
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Subcribe = Mongoose.model("Subscribe", SubSchema);
export default Subcribe;