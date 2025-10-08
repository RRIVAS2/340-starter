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
router.get("/", utilities.checkInventoryAuth,utilities.handleErrors(invController.buildManagementView));


// Route to build add classification view
router.get("/add-classification", utilities.checkInventoryAuth,utilities.handleErrors(invController.buildAddClassificationView));

// Process the new classification data
router.post(
    '/add-classification', 
    utilities.checkInventoryAuth,
    classificationValidate.addClassificationRules(),
    classificationValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification))

// Route to build add inventory view
router.get("/add-inventory", utilities.checkInventoryAuth, utilities.handleErrors(invController.buildAddInventoryView));

// Process the new inventory data
router.post(
    '/add-inventory', 
    utilities.checkInventoryAuth,
    inventoryValidate.addInventoryRules(),
    inventoryValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory))

// Process the get inventory by classificationId ajax request
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));

// Process the modify inventory view
router.get("/edit/:inv_id", utilities.checkInventoryAuth, utilities.handleErrors(invController.editInventoryView));

// Process the modify inventory data
router.post(
    "/modify-inventory/",
    utilities.checkInventoryAuth,
    inventoryValidate.addInventoryRules(),
    inventoryValidate.checkModifyData,
    utilities.handleErrors(invController.updateInventory))

// Process the delete inventory view
router.get("/delete/:inv_id", utilities.checkInventoryAuth,utilities.handleErrors(invController.deleteInventoryView));

// Process the modify inventory data
router.post(
    "/delete-inventory/",
    utilities.checkInventoryAuth,
    utilities.handleErrors(invController.deleteInventory))

module.exports = router;