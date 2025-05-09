const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offer = new Schema({
  title: String,
  body: String,
  date: Date,
  creator: String,
});

const offerTable = mongoose.model("offer", offer);

module.exports = offerTable;
