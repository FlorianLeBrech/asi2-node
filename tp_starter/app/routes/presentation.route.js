'use strict';

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
 .get(function(request, response){
    var absolutePathPresentationDirectory = path.resolve(CONFIG.presentationDirectory);
    var acc = {};

    fs.readdir(absolutePathPresentationDirectory, (err, files) => {
        //lecture du fichier
        files.forEach(file => {
           //Lecture du JSON
           utils.readFileIfExists(utils.getPresentationPath(file), 
           function (err, obj){
                if (err) throw err;
                var tmp = JSON.parse(obj.toString());  
                acc['pres.' + tmp.id] = tmp
                //Retour du fichier Json quand tous les fichiers ont bien été traités
                if (Object.keys(acc).length==files.length)  {
                 response.json(acc);         
                }
           });           
        });
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
        jf.writeFile(utils.getPresentationPath(idJson) + ".json",request.body,function(err){
            if (err) throw err;
            });
            response.send("fichier créé");
        }) 
    