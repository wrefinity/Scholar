import Mongoose from "mongoose";

const PartnerSchema = new Mongoose.Schema(
   {
      image: { type: String},
   },
   { timestamps: true }
);

const Partner = Mongoose.model("Partner", PartnerSchema);
export default Partner;
