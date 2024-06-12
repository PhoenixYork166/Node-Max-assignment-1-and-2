const express = require('express');
// const path = require('path');
// const rootDir = require('../util/path');

// calling Router from express.Router() method
// router is a pluggable mini Express app
const router = express.Router();
const errorController = require('../controllers/error');

// Catch-all handler for any unhandled routes
router.use(errorController.get404Page);

module.exports = router;