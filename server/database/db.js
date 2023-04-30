import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../model/Users.js";
dotenv.config();

let Mongo = "";
{
  process.env.isProduction == "true"
    ? (Mongo = process.env.MONGO_PROD_URI)
    : (Mongo = process.env.MONGO_DEV_URI);
}

export default async () => {
  await mongoose
    .connect(Mongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async (res) => {
      console.log("databse connected");
      const admin = await User.findOne({ isAdmin: true });
      if (!admin) {
        await User.create({
          fullname: process.env.FULL_NAME,
          email: process.env.ADMIN_EMAIL,
          isAdmin: true,
          password: process.env.ADMIN_PASSWORD,
        });
      }
    })
    .catch((err) => {});
};
mongoose.set("strictQuery", true);
