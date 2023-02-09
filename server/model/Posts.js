import Mongoose from "mongoose";

// TODO: define a static function to update status if date exceed
const postSchema = new Mongoose.Schema(
  {
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: { type: String },
    benefit: { graduate: String, underGraduate: String, postGraduate: String },
    title: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Type",
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "close"],
      default: "open",
    },
    body: { type: String, required: true },
    amount: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    eligibility: {
      graduate: String,
      underGraduate: String,
      postGraduate: String,
    },
    eligible_country: { type: Array, default: [], required: true },
    country: { type: String, required: true },
    host: { type: String, required: true },
    deadline: { type: String, required: true },
  },
  { timestamps: true }
);

const postModel = Mongoose.model("Post", postSchema);
export default postModel;

// const doc = new Group({
//   title: 'Jedi Order',
//   members: [{ firstName: 'Luke', lastName: 'Skywalker' }]
// });
