const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let customerSupportRequest = new Schema({
  product_type: {
    type: String,
    required: true,
  },
  issue_type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  policy_upload: {
    type: Buffer,
    required: false,
    default: "",
  },
  submitted_by: { type: mongoose.Types.ObjectId, required: false, ref: "User" },
  assigned_to: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: "User",
    default: null,
  },
  date_of_submission: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
    default: null,
  },
});
module.exports = mongoose.model("SupportRequest", customerSupportRequest);
