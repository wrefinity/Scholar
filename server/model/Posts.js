import Mongoose from "mongoose";

// TODO: define a static function to update status if date exceed
const postSchema = new Mongoose.Schema(
  {
    image: { type: String },
    benefit: { graduate: String, underGraduate: String, postGraduate: String },
    body: { type: String, required: true },
    categoryId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    eligibility: {
      graduate: String,
      underGraduate: String,
      postGraduate: String,
    },
    isDeleted: { type: Boolean, default: false },
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
