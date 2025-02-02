//const { publicDecrypt } = require('crypto');
const fs = require('fs');
//const { resolve } = require('path');

let items = [];
let categories = [];

function initialize() {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/items.json', 'utf8', (err, data) => {
            if (err) {
                reject("Unable to read the items file");
                return;
            }
            try {
                items = JSON.parse(data);
            } catch(err) {
                reject("Unable to read the items file");
                return;
            }
            fs.readFile('./data/categories.json', 'utf8', (err, data) => {
                if (err) {
                    reject("Unable to read the categories file");
                    return;
                }
                try {
                    categories = JSON.parse(data);
                    resolve();
                } catch(err) {
                    reject("Unable to read categories file");
                    //return;
                }
            });
        });
    });
}

function getAllItems() {
    return new Promise((resolve, reject) => {
        if (items.length > 0) {
            resolve(items);
        } else {
            reject("No result returned");
        }
    });
}

function getPublishedItems() {
    return new Promise((resolve, reject) => {
        let PublishedItems = items.filter(
            item => item.published === true
        );
        if (PublishedItems.length > 0) {
            resolve(PublishedItems);
        } else {
            reject("No results returned");
        }
    });
}

function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length > 0) {
            resolve(categories);
        } else {
            reject("No results returned");
        }
    });
}

module.exports = { initialize, getAllItems, getPublishedItems, getCategories};