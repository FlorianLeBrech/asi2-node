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

// IMPORTANT  : dans les autres modules, l'accès à la configuration sera faite comme cela
// var CONFIG = JSON.parse(process.env.CONFIG); 


// init server
var server = http.createServer(app);
server.listen(CONFIG.port);

//Gestion des routes
app.use(bodyParser.json());
//Route par défaut 
var defaultRoute = require("./app/routes/default.route.js"); 
app.use(defaultRoute);

//Route static 

app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));

//Route presentation
var presentationRoute = require("./app/routes/presentation.route.js"); 
app.use(presentationRoute);