const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timeStamp: { type: Number } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // the ref must exactly match the model name string you passed to mongoose.model(). In your case, that’s "user" for userModel
    },
  },
  { timestamps: true },
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
