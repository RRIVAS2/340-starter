const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid
  })
}




/* ***************************
 *  Build item view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const invId = req.params.invId
  const data = await invModel.getByInventoryId(invId)
  const view = await utilities.buildInventoryIdView(data[0])
  let nav = await utilities.getNav()
  const itemModel = `${data[0].inv_make} - ${data[0].inv_model}`; 
  res.render("./inventory/inventoryid", {
    title: itemModel,
    nav,
    view
  })
}


/* ***************************
 *  Build inventory management view
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null
  })
}


/* ***************************
 *  Build add classification view
 * ************************** */
invCont.buildAddClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null
  })
}


/* ****************************************
*  Classification Registration
* *************************************** */
invCont.addClassification = async function (req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  const regResult = await invModel.addClassification(
    classification_name )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${classification_name}.`
    )
    res.status(201).render("inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null
    })
  }
}


/* ***************************
 *  Build add inventory view
 * ************************** */
invCont.buildAddInventoryView = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
    title: "Add Inventory",
    classificationList,
    nav,
    errors: null
  })
}


/* ****************************************
*  Inventory Registration
* *************************************** */
invCont.addInventory = async function (req, res) {
  let nav = await utilities.getNav()
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id  } = req.body
  let classificationList = await utilities.buildClassificationList()


  const regResult = await invModel.addInventory(
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
    )

  if (regResult) {
    req.flash(
      "notice",
      `Car: ${inv_make} - ${inv_model} - ${inv_year} is registered.`
    )
    res.status(201).render("inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("inventory/add-inventory", {
      title: "Add Inventory",
      classificationList,
      nav,
      errors: null
    })
  }
}


  module.exports = invCont