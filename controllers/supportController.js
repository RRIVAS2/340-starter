const supportModel = require("../models/support-model")
const utilities = require("../utilities/")
const accountModel = require("../models/account-model")  
const supportController = {}

/* ***************************
 *  Build contact support view
 * ************************** */
supportController.buildContactSupport = async function (req, res, next) {
  let nav = await utilities.getNav()
  const account_id = res.locals.accountData.account_id
  res.render("./support/contact", {
    title: "Contact Support",
    nav,
    account_id, 
    errors: null
  })
}

/* ****************************************
*  Support Ticket Submission
* *************************************** */
supportController.submitSupportTicket = async function (req, res) {
  let nav = await utilities.getNav()
  const { ticket_subject, ticket_description, account_id } = req.body


  const ticketResult = await supportModel.createSupportTicket(
    ticket_subject,
    ticket_description,
    account_id
  )

  if (ticketResult) {
    req.flash(
      "notice",
      `Your support ticket has been submitted successfully.`
    )
    res.status(201).render("account/account-management", {
      title: "Account Management",
      nav,
      errors: null
    })
  } else {
    req.flash("notice", "Sorry, the ticket submission failed.")
    res.status(501).render("support/contact", {
      title: "Contact Support",
      nav,
      errors: null
    })
  }
}


/* ***************************
 *  Build see tickets view
 * ************************** */
supportController.buildTicketsView = async function (req, res, next) {
  let nav = await utilities.getNav()
  const account_id = res.locals.accountData.account_id
  let ticketTable = await utilities.buildTicketTable(account_id)
  res.render("./support/tickets", {
    title: "View Tickets",
    nav,
    account_id,
    ticketTable,
    errors: null
  })
}


module.exports = supportController