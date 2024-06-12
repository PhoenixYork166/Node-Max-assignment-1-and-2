// Preparing to store products as an array
// const products = [];

// import class Product model from ../models/product.model.js
const Product = require('../models/product.model');

exports.getAddProduct = (req, res, next) => {
    console.log(`Hosting views/add-product.html through router.get\n`);

    /*
    We are NOT using res.render() method to render an html page here
    const addProductPage = path.join(rootDir, 'views', 'add-product.html');

    res.render('views/add-product.pug', data) defaults to rootDir/views
    res.render('.pug', data) will look up .pug files
    & pass in templates
    */
    res.render('add-product', { 
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
    /*
    res.sendFile(filePath, (err) => {...}) 
    // to send HTML to '/add-product' requests
    SEE any Filter paths in app.js e.g. '/admin/add-product'
    */

    /*
    res.sendFile(addProductPage, (err) => {
        if (err) {
            // Log the Error for server-side debugging
            console.error(`Error sending /views/add-product.html\n${err}`);

            // Check if the HTTP headers have already been sent
            if (res.headersSent) {
                // If HTTP Headers are sent
                // delegate to the default Express err handler
                return next(err);
            } else {
                // If HTTP headers are NOT sent
                // respond with a 500 Internal Server Error
                res.status(500).send(`Error sending /views/add-product.html`);
            }
        }
    });
    */
};

exports.postAddProduct = (req, res, next) => {
    console.log(`req.body.title:\n${req.body.title}\n`);

    /* create a new products[] by instantiating class Product */
    const product = new Product(req.body.title);

    /* Pushing a new object into const products = []; array
    products.push({ title: req.body.title }); */

    /* using Product.save() method to save a product */
    product.save();
    res.status(301).redirect('/');
};

exports.getProducts = (req, res, next) => {
    /* This allows us to hook into this Funnel 
    through which the HTTP request to send */
    console.log(`Hosting of views/shop.html through router.get\n`);

    // using 'public static method' Product.fetchAll(cb): void
    // to retrieve products[{}] stored in data/products.json file
    Product.fetchAll((products) => {
        // Calling back products stored in ./routes/admin.js
        console.log(`routes/shop.js\nadminRoutes.products:`);
        console.log(products);
        console.log(`\n`);

        /*
        Using Pug Templating Engine specified in app.js
        app.set('view engine', 'pug');
        within this module => res.render() Pug templates

        res.render('views/.pug', data) defaults to rootDir/views folder
        res.render('.pug', data) will look up .pug files
        & pass in templates
        */
        res.render('shop', { 
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
        /*
        point this res.sendFile() to views/shop.html
        PATH must be absolute
        __dirname = current directory = routes folder
        .. = 1 upper directory
        */
        /*const shopPage = path.join(rootDir, 'views', 'shop.html');
        res.sendFile(filePath, (err) => {...}) 
        to send HTML to '/' requests
        */
        /*
        res.sendFile(shopPage, (err) => {
            if (err) {
                // Log the Error for server-side debugging
                console.error(`Error sending /views/shop.html\n${err}\n`);

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
        */
        /*
        Send a HTTP response with a Body
        res.status(200).send({ message: `Request received` });
        */
    });
};