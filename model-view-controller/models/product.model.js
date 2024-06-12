const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

/* Defining the Interface for each new product
using an ES6 a Class */
module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    /* Default a Public Method to append products[{}]
    into rootDir/data/products.json */
    save() {
        /*
        pushing the entire product {} object into products[]
        products.push(this);
        */
        /*
        use our rootDir helper function that points to projectFolder
        let's create a rootDir/data folder for storing each new product into rootDir/data/products.json for pretending to be a database
        */
        const p = path.join(
            rootDir, 
            'data', 
            'products.json'
        );

        /* Reading entire data/products.json into memory... */
        fs.readFile(p, (err, fileContent) => {
            // preparing to store file contents as array of objects [{}]
            let products = [];

            /* only Parse data/products.json file as JSON objects
            if there's NO any errors */
            if (!err) {
                try {
                    products = JSON.parse(fileContent);
                } catch (parseError) {
                    console.error(`Error parsing JSON:`);
                    console.error(parseError);
                    console.log(`\n`);
                }
            }

            /* appending entire product {} into products[] */
            products.push(this);

            /* 
            Now, we have products[{productKey1: productValue1}]
            Next time we add a new product {}
            We'll have products
            [
                {productKey1: productValue1}, 
                {productKey2: productValue2}
            ]
            JSON.stringify to put back { objectKey: objectValue }
            back to { "productKey1": "productValue1" } 
            */
            fs.writeFile(p, JSON.stringify(products), (writeErr) => {
                if (writeErr) {
                    console.error(`fs.writeFile error:\n${writeErr}`);
                }
            });                
        });
    }

    /*
    Allowing Class.method() access without 'extends'
    'static' = 'public static' in TypeScript
    a Class.method() need NOT to be instantiated before using
    */
    static fetchAll(cb) {
        const p = path.join(
            rootDir, 
            'data', 
            'products.json'
        );

        fs.readFile(p, (err, fileContent) => {
            if (err) {
                /* if error => always return an empty [] 
                return [];
                */
               // a callback to pass in an empty array[]
               cb([]);
            }
            /* 
            data/products.json | We have this design pattern
            products[
                {"productTitle1":"productValue1"}, {"productTitle2":"productValue2"}
            ]
            */
            // using the passed in callback 'cb' to parse JSON data
            cb(JSON.parse(fileContent));
        });
    }
};