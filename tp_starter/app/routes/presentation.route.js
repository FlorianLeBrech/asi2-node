var jf = require('jsonfile');          
var express = require("express");
var router = express.Router();
module.exports = router; 

var path = require("path");
var CONFIG = require("./../../config.json");
var absolutePathContentDirectory = path.resolve(CONFIG.contentDirectory);

router.route("/loadPres") 
 .all(function(request, response){
    const fs = require('fs');
    var absolutePathPresentationDirectory = path.resolve(CONFIG.presentationDirectory)  ;
    
    //lecture du dossier
    fs.readdir(absolutePathPresentationDirectory, (err, files) => {
        //lecture du fichier
        files.forEach(file => {
           // console.log(absolutePathPresentationDirectory+'\\'+file);
            var test = absolutePathPresentationDirectory+'\\'+file;
            //Lecture du JSON
            jf.readFile( test, function(errFile, obj) {
                response.send(obj);                
            });      
        });
    })    
 })
    
 router.route("/savePres") 
 .all(function(request, response){
    response.send("it works");
 })
    