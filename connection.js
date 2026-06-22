const mongoose = require("mongoose");

function connectMondoDB(url) {
  return mongoose.connect(url);
}

module.exports = connectMondoDB;
