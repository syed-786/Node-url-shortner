const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
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
