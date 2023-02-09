import Mongoose from "mongoose";

const AboutSchema = new Mongoose.Schema(
   {
      note: { type: String},
   },
   { timestamps: true }
);

const About = Mongoose.model("About", AboutSchema);
export default About;