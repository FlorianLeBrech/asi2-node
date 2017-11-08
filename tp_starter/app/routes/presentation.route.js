var jf = require('jsonfile');          
var express = require("express");
var router = express.Router();
module.exports = router; 

var path = require("path");
var CONFIG = require("./../../config.json");
var absolutePathContentDirectory = path.resolve(CONFIG.contentDirectory);

//Load de la présentation 
router.route("/loadPres") 
 .all(function(request, response){
    const fs = require('fs');
    var absolutePathPresentationDirectory = path.resolve(CONFIG.presentationDirectory)  ;
    
    //lecture du dossier
    fs.readdir(absolutePathPresentationDirectory, (err, files) => {
        //lecture du fichier
        files.forEach(file => {
           var test = absolutePathPresentationDirectory+'\\'+file;             
           //  var test = absolutePathPresentationDirectory+'\\'+file;
           //Lecture du JSON
           jf.readFile( test, function(errFile, obj) {
                response.send(obj);                
            });      
        });
    })    
 })

 //Sauvegarde de la présentation
 router.route("/savePres") 
 .post(function(request, response){
    if (request.body.id){

    }    

})
    