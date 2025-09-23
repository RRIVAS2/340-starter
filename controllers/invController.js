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


  module.exports = invCont