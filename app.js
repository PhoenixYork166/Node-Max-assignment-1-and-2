// using Express
const express = require('express');

// importing module.exports = router in
// routes/admin.js
const adminRoutes = require('./routes/admin');

// importing module.exports = router in
// routes/shop.js
const shopRoutes = require('./routes/shop');

// importing module.exports = router in
// routes/404.js
const notFound = require('./routes/404');

// creating an Express application
const app = express();

// Using Express new built-in Body Parser middleware 
// to parse req.body
app.use(express.urlencoded({ extended: false }));

// Using middleware for adminRoutes
// routes/admin.js
// add '/admin' segment as a filter
app.use('/admin', adminRoutes);

// Using middleware for shopRoutes
// routes/shop.js
app.use(shopRoutes);

// Using middleware for 404 routes
// routes/404.js
app.use(notFound);

// Error Handler for all routes
app.use((error, req, res, next) => {
    console.error(`Error: ${error}`);
    res.status(501).send({ message: `Server Internal Error` });
})

const port = 3005;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});