var CONFIG = require("./config.json");

var express = require("express");
var router = express.Router();
module.exports = router; 

var path = require("path");
var absolutePathContentDirectory = path.resolve(CONFIG.contentDirectory);
var absolutePathPresentationDirectory = path.resolve(CONFIG.presentationDirectory);

router.route(absolutePathContentDirectory) 
 .all(function(request, response){
    response.send("it works");
 })
    
 router.route(absolutePathPresentationDirectory) 
 .all(function(request, response){
    response.send("it works");
 })
    