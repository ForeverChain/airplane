const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket");

// Route for creating a new ticket
router.post("/", ticketController.createTicket);

// Route for updating an existing ticket
router.put("/update/:ticketId", ticketController.updateTicket);

// Route for removing a ticket
router.delete("/remove/:ticketId", ticketController.removeTicket);

// Route for retrieving all tickets
router.get("/", ticketController.getAllTicket);

// Route for retrieving a specific ticket by ID
router.get("/:ticketId", ticketController.getTicketById);

module.exports = router;
