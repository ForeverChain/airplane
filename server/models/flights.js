const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const flightsSchema = new mongoose.Schema({
  details: {}
});

module.exports = mongoose.model("flights", flightsSchema);
