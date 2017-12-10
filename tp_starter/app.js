'use strict';

var express = require("express");
var app = express();
var http = require("http");
var bodyParser = require('body-parser');
var path = require("path");

// Gestion de la variable CONFIG
var CONFIG = require("./config.json");

// Pour que la configuration soit accessible par tous les modules pour la suite,
// déclarer une variable CONFIG dans process.env et injecter la configuration en JSON "stringifier" comme ceci
process.env.CONFIG = JSON.stringify(CONFIG); 

var IOController = require("./app/controllers/io.controller.js");

//Parse automatique des datas
app.use(bodyParser.json());



app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 1000000,
    limit: '10mb'
  }));

  var utils = require("./app/utils/utils.js")
  
//Gestion des routes

//Route par défaut 
var defaultRoute = require("./app/routes/default.route.js"); 
app.use(defaultRoute);

//Route static 

//app.use('/admin', utils.checkAuthAdmin);
app.use("/admin", express.static(path.join(__dirname, "./public/admin")));
app.use("/watch", express.static(path.join(__dirname, "./public/watch")));

//Route presentation
var presentationRoute = require("./app/routes/presentation.route.js"); 
app.use(presentationRoute);

//Route content
var contentRoute = require("./app/routes/content.route.js"); 
app.use(contentRoute);

// init server
var server = http.createServer(app);
server.listen(CONFIG.port);


IOController.listen(server);

