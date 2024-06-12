exports.get404Page = (req, res, next) => {
    try {
        console.log(`Hosting views/404.html through router.use is in progress\n`);
        console.log(`Users requested an undefined page :O\n`);

        // res.render('views/404.pug', data)
        res.status(404).render('404', { 
            pageTitle: '404 Page NOT found',
            message: `404 This page was NOT found`
        });
    } catch (err) {
        console.error(`Error while rendering 404 page:\n${err}\n`);

        /* Check if HTTP headers have already been sent */
        if (res.headersSent) {
            /* If headers are sent, delegate to default Express error handler */
            next(err);
        } else {
            /* If HTTP headers are NOT sent, respond with a 500 Internal Server Error */
            res.status(501).send(`Error while trying to display 404 NOT found page :(`);
        }
    }
    /*
    res.sendFile(filePath, (err) => {...}) 
    to send HTML to non-defined requests
    SEE any Filter paths in app.js e.g. '/1234'
    */
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
};