// using Express
const express = require('express');
const path = require('path');

// importing routes defined by module.exports = router 
// from routes/admin.js
const adminRoutes = require('./routes/admin');

// importing module.exports = router in
// routes/shop.js
const shopRoutes = require('./routes/shop');

// importing module.exports = router in
// routes/404.js
const notFound = require('./routes/404');

const rootDir = require('./util/path');

// creating an Express application
const app = express();

// Implementing Pug Templating Enginer
// app.set('name', 'value);
// app.set('view engine', 'hbs');
app.set('view engine', 'pug');

// Express.js defaults rootDir/views to 'views'
app.set('views', 'views');

console.log(`rootDir:`);
console.log(rootDir);
console.log(`\n`);

// Using Express new built-in Body Parser middleware 
// to parse req.body
app.use(express.urlencoded({ extended: false }));

// Express middleware to serve static files
app.use(express.static(path.join(rootDir, 'public')));

// Using middleware for adminRoutes
// routes/admin.js
// add '/admin' segment as a filter path
// app.use('/admin', adminRoutes);

// As we changed the way we export objects in routes/admin.js
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