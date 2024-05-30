const express = require('express');

// calling Router from express.Router() method
// router is a pluggable mini Express app
const router = express.Router();

// Catch-all handler for any unhandled routes
router.use((req, res, next) => {
    res.status(404).send(`
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width", initial-scale="1.0">
        <title>404 NOT found</title>
    </head>
    <body>
        <h1>404 - Page NOT found :(</h1>
        <p>The page you are looking for might have been remove :(</p>
    </body>
    </html>
    `);
});

module.exports = router;