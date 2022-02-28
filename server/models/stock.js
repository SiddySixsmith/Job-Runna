const mongoose = require("mongoose");

const { Schema } = mongoose;

const stockSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  stockType: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    trim: true,
  },
  size: {
    type: String,
    required: true,
    trim: true,
  },
  grit: {
    type: String,
    required: true,
    trim: true,
  },
});
const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
