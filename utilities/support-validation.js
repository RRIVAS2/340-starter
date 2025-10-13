const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const accountModel = require("../models/support-model")
  
  /*  **********************************
  *  Create Ticket Data Validation Rules
  * ********************************* */
  validate.createTicketRules = () => {
    return [
 
      // check classification and cannot already exist in the database
      body("ticket_subject")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide a subject."),

      body("ticket_description")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide a description."),

      body("account_id")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide an account ID.")
    ]
  }
    module.exports =  validate
