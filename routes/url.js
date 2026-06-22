const express = require("express");
const {
  gererateNewShortURL,
  redirectToURL,
  getAnalytics,
} = require("../controllers/url");
const router = express.Router();

router.post("/", gererateNewShortURL);
router.get("/:id", redirectToURL);
router.get("/analytics/:id", getAnalytics);

module.exports = router;
