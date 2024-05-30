const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    // This allows us to hook into this Funnel 
    // through which the HTTP request to send
    console.log(`Using a middleware!`);

    // Send a HTTP response with a Body
    res.status(200).send({ message: `Request received` });
});

module.exports = router;