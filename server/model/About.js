import Mongoose from "mongoose";

const AboutSchema = new Mongoose.Schema(
  {
    note: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const About = Mongoose.model("About", AboutSchema);
export default About;
