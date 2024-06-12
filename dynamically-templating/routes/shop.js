const express = require('express');
// const path = require('path');
// const rootDir = require('../util/path');
const productsController = require('../controllers/products');

// import adminRoutes too
// routes/admin.js has products[]
// const adminRoutes = require('./admin');

const router = express.Router();

router.get('/', productsController.getProducts);

module.exports = router;