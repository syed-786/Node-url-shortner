const express = require("express");
const connectMongoDB = require("./connection");
const urlRouter = require("./routes/url");
const userRoute = require("./routes/userRoute");
const path = require("path");
const URL = require("./models/url");
const staticRouter = require("./routes/staticRouter");
const cookieParser = require("cookie-parser");
const {
  checkAuthentication,
  restrictTo,
} = require("./middleware/authMiddleware");

const port = 3001;
const app = express();

connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("MongoDB connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuthentication);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRouter);
app.use("/user", userRoute);
app.use("/", staticRouter);

// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", {
//     urls: allUrls,
//   });
// });

app.listen(port, () => console.log(`Server is running on port ${port}`));
