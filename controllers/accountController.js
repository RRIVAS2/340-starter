const utilities = require("../utilities")
const accountModel = require("../models/account-model")  
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
    errors: null // <-- add this line
  })
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegistration(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null
  })
}





/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email
    })
    return
  }
  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      if(process.env.NODE_ENV === 'development') {
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      } else {
        res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
      }
      return res.redirect("/account/")
    }
    else {
      req.flash("message notice", "Please check your credentials and try again.")
      res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        account_email,
      })
    }
  } catch (error) {
    throw new Error('Access Forbidden')
  }
}


/* ****************************************
*  Deliver account management view
* *************************************** */
async function buildAccountManagement(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/account-management", {
    title: "Account Management",
    nav,
    errors: null
  })
}

/* ****************************************
*  Deliver update account view
* *************************************** */
async function buildUpdateAccount(req, res, next) {
  const account_id = req.params.account_id
  const accountData = await accountModel.getAccountById(account_id)
  //const accountDataArr = await accountModel.getByAccountId(account_id)
  //const accountData = accountDataArr[0]
  let nav = await utilities.getNav()
  res.render("account/update-account", {
    title: "Update Account",
    nav,
    errors: null,
    account_id: accountData.account_id,
    account_firstname: accountData.account_firstname,
    account_lastname: accountData.account_lastname,
    account_email: accountData.account_email
  })
}

/* ****************************************
*  Process Update Account
* *************************************** */
async function updateAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_id, account_firstname, account_lastname, account_email } = req.body

  const regResult = await accountModel.updateAccount(
    account_id,
    account_firstname,
    account_lastname,
    account_email
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you have updated your account ${account_firstname} ${account_lastname} email: ${account_email}. Please log in.`
    )
    res.status(201).render("account/account-management", {
      title: "Account Management",
      nav,
      errors: null
    })
  } else {
    req.flash("notice", "Sorry, the update failed.")
    res.status(501).render("account/update-account", {
      title: "Update Account",
      nav,
      errors: null
    })
  }
}


/* ****************************************
*  Process Update Password
* *************************************** */
async function updatePassword(req, res) {
  let nav = await utilities.getNav()
  const { account_id, account_password } = req.body

// Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, please enter a valid password.')
    res.status(500).render("account/update-account", {
      title: "Update Account",
      nav,
      errors: null
    })
  }


  const regResult = await accountModel.updatePassword(
    hashedPassword,
    account_id
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you have updated your password.`
    )
    res.status(201).render("account/account-management", {
      title: "Account Management",
      nav,
      errors: null
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/account-management", {
      title: "Account Management",
      nav,
      errors: null
    })
  }
}

module.exports = { buildLogin, buildRegistration, registerAccount, accountLogin, buildAccountManagement, buildUpdateAccount, updateAccount, updatePassword }