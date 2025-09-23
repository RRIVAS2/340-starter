// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities");
const intentionalErrorController = require("../controllers/intentionalErrorController");


// Route to build item view
router.get("/", utilities.handleErrors(intentionalErrorController.triggerError));



module.exports = router;