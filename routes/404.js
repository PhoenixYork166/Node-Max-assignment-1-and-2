const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

// calling Router from express.Router() method
// router is a pluggable mini Express app
const router = express.Router();

// Catch-all handler for any unhandled routes
router.use((req, res, next) => {
    console.log(`Hosting views/404.html through router.use\n`);

    const notFoundPage = path.join(rootDir, 'views', '404.html');

    console.log(`Users requested an undefined page :O`);
    // res.render('views/404.pug', data)
    res.status(404).render('404');
    // res.sendFile(filePath, (err) => {...}) 
    // to send HTML to non-defined requests
    // SEE any Filter paths in app.js e.g. '/1234'
    /*
    res.sendFile(notFoundPage, (err) => {
        if (err) {
            // Log the Error for server-side debugging
            console.error(`Error sending /views/404.html\n${err}\n`);

            // Check if the HTTP headers have already been sent
            if (res.headersSent) {
                // If HTTP Headers are sent
                // delegate to the default Express err handler
                return next(err);
            } else {
                // If HTTP headers are NOT sent
                // respond with a 500 Internal Server Error
                res.status(500).send(`Error sending /views/404.html`);
            }
        }
    });
    */
});

module.exports = router;