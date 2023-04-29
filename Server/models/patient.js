require("dotenv").config();
const mongoose = require("mongoose");
const PatientSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  patientName: {
    type: String,
    required: [true, "Please provide patient name."],
    maxlength: 50,
    minlength: 2,
  },
  picture: {
    type: String,
    required: [true, "Please provide image."],
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
