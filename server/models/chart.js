const mongoose = require("mongoose");

const ChartSchema = new mongoose.Schema(
  {
    chartHistory: Object,
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("charts", ChartSchema);