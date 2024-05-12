const Ticket = require("../models/ticket");
const mongoose = require("mongoose");

exports.createTicket = async (req, res) => {
  try {
    const { flightId, userId,  totalPrice, } = req.body; // Assuming you send these details in the request body
    const newTicket = await Ticket.create({
      flight: mongoose.Types.ObjectId(flightId),
      user: mongoose.Types.ObjectId(userId),
      totalPrice,
    });
    res.json({
      success: true,
      message: "Ticket created successfully",
      ticket: newTicket,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { ticketId, price, date } = req.body; // Assuming you send these details in the request body
    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { price, date },
      { new: true }
    );
    res.json({
      success: true,
      message: "Ticket updated successfully",
      ticket: updatedTicket,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.removeTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    await Ticket.findByIdAndRemove(ticketId);
    res.json({ success: true, message: "Ticket removed successfully" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getAllTicket = async (req, res) => {
  try {
    const ticket = await Ticket.find()
      .populate("flight") // Populate flight details
      .populate("user"); // Populate user details
    res.json({ success: true, ticket });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.find({ user: ticketId })
    .populate("flight") // Populate flight details
    .populate("user"); // Populate user details

    res.json({ success: true, ticket });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
