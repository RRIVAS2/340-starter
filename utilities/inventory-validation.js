const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const accountModel = require("../models/inventory-model")


/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id  } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList()
    res.render("inventory/add-inventory", {
      errors,
      title: "Add Inventory",
      nav,
      classificationList,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    })
    return
  }
  next()
}

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkModifyData = async (req, res, next) => {
  const { inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id  } = req.body
  let errors = []
  errors = validationResult(req)
  const itemName = `${inv_make} ${inv_model}`
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList()
    res.render("inventory/modify-inventory", {
      errors,
      title: "Modify " + itemName,
      nav,
      classificationList,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    })
    return
  }
  next()
}


  /*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
  validate.addInventoryRules = () => {
    return [
 
      // check classification and cannot already exist in the database
      body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide a make."),

      body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide a model."),

      body("inv_year")
        .trim()
        .escape()
        .notEmpty()
        .matches(/^[0-9]+$/)
        .withMessage("Please provide a valid year."),

      body("inv_description")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide a description."),

       body("inv_image")
        .trim()
        .notEmpty()
        .withMessage("Please provide an image path."),

      body("inv_thumbnail")
        .trim()
        .notEmpty()
        .withMessage("Please provide a thumbnail path."),

      body("inv_price")
        .trim()
        .escape()
        .notEmpty()
        .matches(/^[0-9]+$/)
        .withMessage("Please provide a valid price."),

      body("inv_miles")
        .trim()
        .escape()
        .notEmpty()
        .matches(/^[0-9]+$/)
        .withMessage("Please provide a valid mileage."),

     body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .matches(/^[A-Za-z0-9]+$/)
        .withMessage("Please provide a valid color.")
    ]
  }


  module.exports =  validate 