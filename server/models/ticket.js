const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ticketSchema = new mongoose.Schema({
  flight: { type: ObjectId, ref: "flights" }, // Reference to the flights collection
  user: { type: ObjectId, ref: "Users" }, // Reference to the Users collection
  totalPrice: Number, // Price of the ticket
});

module.exports = mongoose.model("tickets", ticketSchema);
