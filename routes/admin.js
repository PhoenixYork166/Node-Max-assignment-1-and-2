const express = require('express');

// calling Router from express.Router() method
// router is a pluggable mini Express app
const router = express.Router();

// router.use() = an agent pluggable into any Express app
// route.use() is similar to app.use()
// all request types

// Router handler for 
// add-product GET request
router.get('/add-product', (req, res, next) => {
    // This allows us to hook into this Funnel 
    // through which the HTTP request to send
    console.log(`Using another middleware!\nSending /add-product response`);
    console.log(`\n`);
    // Send a HTTP response with a Body

    // Start the Response & send the doctype & opening HTML tags
    res.write(`<!DOCTYPE html>`);
    res.write(`<html lang="en">`);

    // Head section with meta and title
    res.write(`<head>`);
    res.write(`<meta charset="UTF-8">`);
    res.write(`<meta name="viewport" content="widt=device-width, initial-scale=1.0">`);
    res.write(`<title>add-product page</title>`);
    res.write(`</head>`);

    // Body section
    res.write(`<body>`);
    res.write(`<form action="/admin/add-product" method="POST">`);
    res.write(`<input type="text" name="title">`);
    res.write(`<button type="submit">Add Product</button>`);
    res.write(`</form>`);
    res.write(`</body>`);

    // Closing HTML tags
    res.write(`</html>`);

    // Ending an HTML page
    res.end();
});

router.post('/add-product', (req, res, next) => {
    const body = req.body;
    console.log(`req.body.title:\n${body.title}`);
    res.status(301).redirect('/');
});

// Exporting this Router to global
module.exports = router;

