// Needed Resources 
const express = require("express")
const router = new express.Router() 
const supportController = require("../controllers/supportController")
const utilities = require("../utilities")
const supportValidate = require("../utilities/support-validation")

// Route to build Contact Support view
router.get("/contact", utilities.handleErrors(supportController.buildContactSupport));

// Route to process the support ticket submission
router.post(
    "/contact", 
    utilities.checkLogin, 
    supportValidate.createTicketRules(),
    utilities.handleErrors(supportController.submitSupportTicket));

// Route to build Tickets view
router.get("/tickets", utilities.handleErrors(supportController.buildTicketsView));

module.exports = router;