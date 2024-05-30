// using Express
const express = require('express');
const bodyParser = require('body-parser');

// creating an Express application
const app = express();

// Using bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to parse URL-encoded req.body
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
    console.log(`Responding to /`);
    console.log(`\n`);
    next();
});

// Route handler for /add-product
app.get('/add-product', (req, res) => {
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
    res.write(`<form action="/product" method="POST">`);
    res.write(`<input type="text" name="title">`);
    res.write(`<button type="submit">Add Product</button>`);
    res.write(`</form>`);
    res.write(`</body>`);

    // Closing HTML tags
    res.write(`</html>`);

    // Ending an HTML page
    res.end();
    // because res.status(200).send(); above 
    // has already ended this middleware with a Response
    // using a next() here will be problematic
    // next(); // remove this line
});

// Middleware for /product page
// Extracting what users sent us into runtime console
app.post('/product', (req, res, next) => {
    const body = req.body;
    console.log(`req.body.title:\n${body.title}`);
    res.status(301).redirect('/');
});

// Adding another Express Middleware
// for route '/'
app.use('/', (req, res, next) => {
    // This allows us to hook into this Funnel 
    // through which the HTTP request to send
    console.log(`Using a middleware!`);

    // Send a HTTP response with a Body
    res.status(200).send({ message: `Request received` });
});

// execute functions stored in ./routes
// for incoming requests
// const server = http.createServer(app);

// console.log(`routes.someText: ${routes.someText}`);

const port = 3005;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});