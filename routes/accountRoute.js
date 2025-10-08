// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require("../utilities/account-validation")

// Route to build Login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to build Register view
router.get("/registration", utilities.handleErrors(accountController.buildRegistration));


// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)



// Process the registration data
router.post(
    '/register', 
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount))


// Route to account management view
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement));

// Route to update account view
router.get("/edit/:account_id", utilities.checkLogin, utilities.handleErrors(accountController.buildUpdateAccount));

// Route to process the update account data
router.post(
    "/update-account", 
    utilities.checkLogin, 
    regValidate.updateRules(),
    utilities.handleErrors(accountController.updateAccount));

// Route to process the update password data
router.post(
    "/update-password", 
    utilities.checkLogin, 
    regValidate.updateRules(),
    utilities.handleErrors(accountController.updatePassword));


router.get("/logout", (req, res) => {
  res.clearCookie("jwt")
  req.flash("notice", "You have been logged out.")
  res.redirect("/")
})

module.exports = router;