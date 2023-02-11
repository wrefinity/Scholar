import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// defined plugin
import dbConn from "./database/db.js";
import userRoute from "./Router/Users.js";
import postRoute from "./Router/Post.js";
import commentRoute from "./Router/Comments.js";
import categoriesRoute from "./Router/Categories.js";
import aboutRoute from "./Router/About.js";
import galleryRoute from "./Router/Gallery.js";
import memberRoute from "./Router/Members.js";
import partnerRoute from "./Router/Partners.js";
import serviceRoute from "./Router/Services.js";
import scholarRoute from "./Router/scholar.js";
import typeRoute from "./Router/Typess.js";
import errorHandler from "./middleware/errorMiddleware.js";
import notFoundMiddleware from "./middleware/not_found.js";

const app = express();
dotenv.config();
app.set("trust proxy", 1);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "UPDATE"],
  })
);
app.use(xss());
app.use(mongoSanitize());
app.use("/public", express.static("./public"));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(bodyParser.json({ limit: "40mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "40mb", extended: true }));

// invoking the database
dbConn();

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/comments", commentRoute);
app.use("/api/about", aboutRoute);
app.use("/api/galleries", galleryRoute);
app.use("/api/members", memberRoute);
app.use("/api/services", serviceRoute);
app.use("/api/partners", partnerRoute);
app.use("/api/scholarships", scholarRoute);
app.use("/api/types", typeRoute);

app.use(errorHandler);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server running on port ${PORT}`));
