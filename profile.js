const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profile = new Schema({
  type: String,
  img: String,
  name: String,
  mail: String,
  bio: String,
  address:String
});

const profileTable = mongoose.model("profile", profile);

module.exports = profileTable;
