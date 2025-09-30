const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const accountModel = require("../models/inventory-model")


/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "Add Classification",
      nav,
      classification_name
    })
    return
  }
  next()
}



  /*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
  validate.addClassificationRules = () => {
    return [
 
      // check classification and cannot already exist in the database
      body("classification_name")
        .trim()
        .notEmpty()
        .matches(/^[A-Za-z0-9]+$/)
        .withMessage("A valid classification is required.")
        .custom(async (classification_name) => {
          const classificationExists = await accountModel.checkExistingClassification(classification_name)
          if (classificationExists){
            throw new Error("This classification name is already in use. Please choose another.")
          }
        })
    ]
  }


  module.exports =  validate 