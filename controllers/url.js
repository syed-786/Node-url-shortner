const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function gererateNewShortURL(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({
      error: "url is required",
    });
  }

  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  // const allUrls = await URL.find({});
  return res.render("home", {
    id: shortId,
    // urls: allUrls,
  });

  //   return res.status(201).json({ id: shortId });
}

async function redirectToURL(req, res) {
  const shortId = req.params.id;
  console.log("shortId: ", shortId);
  const entery = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    },
  );

  res.redirect(entery.redirectURL);
}

async function getAnalytics(req, res) {
  const shortId = req.params.id;
  const result = await URL.findOne({ shortId });

  if (!result) {
    return res.status(404).json({
      message: "url not found",
    });
  }

  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  gererateNewShortURL,
  redirectToURL,
  getAnalytics,
};
