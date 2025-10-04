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


// Route to build Login view
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement));



module.exports = router;