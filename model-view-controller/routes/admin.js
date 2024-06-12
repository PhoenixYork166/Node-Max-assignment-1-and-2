const path = require('path');
const express = require('express');

// const rootDir = require('../util/path');

// import our product controller
const productsController = require('../controllers/products');

// calling Router from express.Router() method
// router is a pluggable mini Express app
const router = express.Router();

/*
router.use() = an agent pluggable into any Express app
route.use() is similar to app.use()
all request types
*/

// Router handler for
// /admin/add-product GET request handler
router.get('/add-product', productsController.getAddProduct
);

// /admin/add-product POST request handler
router.post('/add-product', productsController.postAddProduct);

// Exporting this Router to global
module.exports = router;

// Another way of exporting Express Routes
/*
exports.routes = router;
exports.products = products;
*/

