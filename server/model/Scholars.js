import Mongoose from "mongoose";

const scholarItem = new Mongoose.Schema(
  {
    postId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    // personal information
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    middlename: { type: String },
    email: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    localGovt: { type: String },
    country: { type: String, required: true },

    //  education information
    scholarType: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    scholarName: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Type",
      required: true,
    },
    idCard: { type: String },
    letter: { type: String },
    result: { type: String, rquired: true },
    passport: { type: String, required: true },
    signature: { type: String, required: true },
  },
  { timestamps: true }
);

const scholarSchema = new Mongoose.Schema({
  userId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  scholarships: [scholarItem],
});

const scholarModel = Mongoose.model("Scholarship", scholarSchema);
export default scholarModel;
