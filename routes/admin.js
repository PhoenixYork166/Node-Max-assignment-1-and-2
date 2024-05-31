const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

// calling Router from express.Router() method
// router is a pluggable mini Express app
const router = express.Router();

// router.use() = an agent pluggable into any Express app
// route.use() is similar to app.use()
// all request types

// Router handler for 
// /admin/add-product GET request handler
router.get('/add-product', (req, res, next) => {
    console.log(`router.get is serving views/add-product.html`);

    const addProductPage = path.join(rootDir, 'views', 'add-product.html');

    // res.sendFile(filePath, (err) => {...}) 
    // to send HTML to '/add-product' requests
    // SEE any Filter paths in app.js e.g. '/admin/add-product'
    res.sendFile(addProductPage, (err) => {
        if (err) {
            // Log the Error for server-side debugging
            console.error(`Error sending /views/add-product.html\n${err}`);

            // Check if the HTTP headers have already been sent
            if (res.headersSent) {
                // If HTTP Headers are sent
                // delegate to the default Express err handler
                return next(err);
            } else {
                // If HTTP headers are NOT sent
                // respond with a 500 Internal Server Error
                res.status(500).send(`Error sending /views/add-product.html`);
            }
        }
    });
});

// /admin/add-product POST request handler
router.post('/add-product', (req, res, next) => {
    const body = req.body;
    console.log(`req.body.title:\n${body.title}`);
    res.status(301).redirect('/');
});

// Exporting this Router to global
module.exports = router;

