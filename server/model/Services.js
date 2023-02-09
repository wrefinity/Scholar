import Mongoose from "mongoose";

const ServiceSchema = new Mongoose.Schema(
   {
      image: { type: String},
      content: { type: String, required: true },
      title: { type: String, required: true },
   },
   { timestamps: true }
);

const ServiceModel = Mongoose.model("Service", ServiceSchema);
export default ServiceModel;
