const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middleware/authMiddleware");
const { User } = require("../models/userModel");
const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allURLs = await URL.find({}).populate("createdBy", "name email"); //Mongoose populate will map the createdBy to its user name and email. Basicly it will join the result from both URL and User collections.
  return res.render("home", {
    urls: allURLs,
  });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const allURL = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allURL,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  const user = req?.user;
  if (user) {
    return res.redirect("/");
  }
  return res.render("login");
});
module.exports = router;
