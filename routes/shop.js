const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    // This allows us to hook into this Funnel 
    // through which the HTTP request to send
    console.log(`router.get is serving views/shop.html`);

    // point this res.sendFile() to views/shop.html
    // PATH must be absolute
    // __dirname = current directory = routes folder
    // .. = 1 upper directory
    const shopPage = path.join(rootDir, 'views', 'shop.html');

    // res.sendFile(filePath, (err) => {...}) 
    // to send HTML to '/' requests
    res.sendFile(shopPage, (err) => {
        if (err) {
            // Log the Error for server-side debugging
            console.error(`Error sending /views/shop.html\n${err}`);

            // Check if the HTTP headers have already been sent
            if (res.headersSent) {
                // If HTTP Headers are sent
                // delegate to the default Express err handler
                return next(err);
            } else {
                // If HTTP headers are NOT sent
                // respond with a 500 Internal Server Error
                res.status(500).send(`Error sending /views/shop.html`);
            }
        }
    });

    // Send a HTTP response with a Body
    // res.status(200).send({ message: `Request received` });
});

// module.exports export all objects to rootDir
module.exports = router;