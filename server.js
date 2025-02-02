/*********************************************************************************

WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source (including 3rd party web sites) or distributed to other students.

Name: Uny Li (Shiyu)
Student ID: 152950234 
Date: 2 Feb 2025
Cyclic Web App URL: 
GitHub Repository URL: https://github.com/yuyuUNny/web322-app

********************************************************************************/ 


const storeService = require('./store-service');

const express = require('express');

const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/about');
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

app.get('/shop', (req, res) => {
  storeService.getPublishedItems()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({message: err}));
});

app.get('/items', (req, res) => {
  storeService.getAllItems()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({message: err}));
});

app.get('/categories', (req, res) => {
  storeService.getCategories()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({message: err}));
});

app.get((req, res) =>{
  res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});

storeService.initialize().then(
  () => {
    app.listen(PORT, () => {
      console.log(`Express http server listening on port ${PORT}`);
    })
  }).catch((err) => {
    console.log("Initialized error");
  });




