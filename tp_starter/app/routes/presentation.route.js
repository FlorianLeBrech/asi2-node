var jf = require('jsonfile');          
var express = require("express");
var router = express.Router();
const fs = require('fs');
var utils = require ("./../utils/utils.js");


module.exports = router; 

var path = require("path");
var CONFIG = require("./../../config.json");

//Load de la présentation 
router.route("/loadPres") 
 .all(function(request, response){
    var absolutePathPresentationDirectory = path.resolve(CONFIG.presentationDirectory);
    var ret;


    // géré la boucle fini sinon pb

    //lecture du dossier
    fs.readdir(absolutePathPresentationDirectory, (err, files) => {
        //lecture du fichier
        files.forEach(file => {
           //Lecture du JSON
            utils.readFileIfExists(path.join(absolutePathPresentationDirectory,file), function(errFile, obj) {
            ret = ret+obj;
            });      
        });
        response.send(ret);
    })    
 })


 //Sauvegarde de la présentation
 router.route("/savePres") 
    .post(function (request, response){
        
        //Récupération de l'ID
        var idJson = request.body.id;

        //Calcul du path
        var absolutePathPresentationDirectory = path.resolve(CONFIG.presentationDirectory)  ;
        
        //Enregistrement du fichier json
        jf.writeFile(absolutePathPresentationDirectory + "\\" + idJson + ".json",request.body,function(err){
            if (err) throw err;
            });
            response.send("fichier créé");
        }) 
    