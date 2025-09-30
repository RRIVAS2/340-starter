// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const classificationValidate = require("../utilities/classification-validation")
const inventoryValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build item view
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInventoryId));

// Route to build inventory management view
router.get("/", utilities.handleErrors(invController.buildManagementView));


// Route to build add classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassificationView));

// Process the new classification data
router.post(
    '/add-classification', 
    classificationValidate.addClassificationRules(),
    classificationValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification))

// Route to build add inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventoryView));

// Process the new inventory data
router.post(
    '/add-inventory', 
    inventoryValidate.addInventoryRules(),
    inventoryValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory))


module.exports = router;