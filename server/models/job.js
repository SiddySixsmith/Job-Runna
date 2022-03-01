const mongoose = require("mongoose");

const { Schema } = mongoose;

const jobSchema = new Schema({
  siteAddress: {
    type: String,
    required: true,
    trim: true,
  },
  jobDescription: {
    type: String,
  },
  builderName: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    trim: true,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  meterage: {
    type: String,
    required: true,
    trim: true,
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
