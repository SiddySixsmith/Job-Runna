const mongoose = require("mongoose");

const { Schema } = mongoose;

const machineSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  modelNumber: {
    type: String,
    required: true,
    trim: true,
  },
});

const Machine = mongoose.model("Machine", machineSchema);

module.exports = Machine;
