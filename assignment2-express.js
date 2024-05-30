// using Express
const express = require('express');

// creating an Express application
const app = express();

// 2. Create an Express.js app which funnels the requests
// through 2 middleware functions that log something to the console
// & return 1 response

// Log middleware 1
app.use((req, res, next) => {
    try {
        console.log(`console logging 1`);
    } catch (err) {
        console.error(`Error: ${err}`);
    }
    next();
});

// Log middleware 2
app.use((req, res, next) => {
    try {
        console.log(`console logging 2`);
    } catch (err) {
        console.error(`Error: ${err}`);
    }
    next();
});

// Route handler for /
app.get('/', (req, res) => {
    try {
        console.log(`sending / route response ;)`);
    } catch (err) {
        console.error(`Error for /: ${err}`);
    }
    res.status(200).send(`<h1>This is / page</h1>`);
});

// Route handler for /users
app.get('/users', (req, res) => {
    try {
        console.log(`sending /users response ;)`);
    } catch (err) {
        console.error(`Error for /users: ${err}`);
    }
    res.status(200).send(`<h1>This is /users page`);
});

// Catch-all route handlers for any other GET requests NOT matched
app.get('*', (req, res) => {
    console.log(`users requested a 404 page :(`);
    res.status(404).send(`<h1>404 NOT found ;(</h1>`);
});

// Error handling middleware should be placed after all
// other middleware & routes
// Only needed if there're potential errors to catch
app.use((err, req, res, next) => {
    console.error(`Server Intenal Error: ${err}`);
    res.status(501).send(`Server Internal Error :(`);
});

const port = 3005;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});