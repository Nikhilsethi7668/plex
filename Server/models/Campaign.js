const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  PAN: {
    type: String,
    unique: true,
    required: true,
    match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // PAN validation
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
