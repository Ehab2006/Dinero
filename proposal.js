const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const proposal = new Schema({
  isAgree: Boolean,
  agreeDate: Date,
  main: String,
  date: Date,
  creator: String,
  company: String,
  offerId: String,
});

const proposalTable = mongoose.model("proposal", proposal);

module.exports = proposalTable;
