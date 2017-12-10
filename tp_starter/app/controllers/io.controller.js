'use strict';


var io = require('socket.io');

var fs = require('fs');
var path = require('path');

var CONFIG = JSON.parse(process.env.CONFIG);
var ContentModel = require("./../models/content.model.js");



this.listen = function(server) {
	var socketMap = {};
	var ioServer = io(server);
	var mapIdClient = {};
    var presentation; //ajout de presentation.idCurrentSlid
    ioServer.on('connection', function(socket){
            console.log('a user connected');
            
               socket.on('disconnect', function(){
              console.log('user disconnected');
            });
            socket.on('data_comm', function(idClient){
               mapIdClient[Object.keys(mapIdClient).length]=idClient;
            });
            
              socket.on('slidEvent', function(jsonObject){          
                switch(jsonObject.CMD) {
                    case "START" :
                    var contentList=[];                                        
                    utils.readFileIfExists(utils.getPresentationPath(file),
                    function (err, obj) {
                        if (err) return  //gestion de l'erreur
                        var presentation = JSON.parse(obj.toString());
                        presentation.idCurrentSlid =  0;
                        //get de l'id du first element qu'on stock dans le controller
                        if (!!presentation.slidArray[0].contentMap[0]){
                            var nbOfElement=  Object.keys(presentation.slidArray[0]).length;           
                            for (var i = 0; i<nbOfElement ; i++){
                                ContentModel.read(presentation.slidArray[0].contentMap[0],function(err,contentModel){
                                     contentList[Object.keys(contentList).length] = contentModel;
                                });
                            }                
                        }
                        io.emit("slidEvent", contentList);                                           
                    });
                    break;
                    
                case "PAUSE":
                    break;

                case "END" :
                    var contentList=[];        
                    presentation.idCurrentSlid= Object.keys(presentation.slidArray[0]).length;                    
                    if (!!presentation.slidArray[0].contentMap[0]){
                        var nbOfElement=  Object.keys(presentation.slidArray[0]).length;
                        
                        for (var i = 0; i<nbOfElement ; i++){
                        ContentModel.read(presentation.slidArray[0].contentMap[presentation.idCurrentSlid+1],function(err,contentModel){
                            contentList[Object.keys(contentList).length] = contentModel;
                        });
                        }                
                    }
                    io.emit("slidEvent", contentList);                                             
                    
                    break;

                case "BEGIN":               
                    break;  

                case "PREV":
                    var contentList=[];                                                        
                    if (!!presentation.slidArray[0].contentMap[0]){
                        var nbOfElement=  Object.keys(presentation.slidArray[0]).length;
                        
                        for (var i = 0; i<nbOfElement ; i++){
                        ContentModel.read(presentation.slidArray[0].contentMap[presentation.idCurrentSlid-1],function(err,contentModel){
                            contentList[Object.keys(contentList).length] = contentModel;
                        });
                        }                
                    }
                    io.emit("slidEvent", contentList);             
                    break;    

                case "NEXT":
                    var contentList=[];                                                        
                    if (!!presentation.slidArray[0].contentMap[0]){
                        var nbOfElement=  Object.keys(presentation.slidArray[0]).length;
                        
                        for (var i = 0; i<nbOfElement ; i++){
                        ContentModel.read(presentation.slidArray[0].contentMap[presentation.idCurrentSlid+1],function(err,contentModel){
                            contentList[Object.keys(contentList).length] = contentModel;
                        });
                        }                
                    }
                    io.emit("slidEvent", contentList);           
                    break;                                    
                default:

            }


              this.title = (!!jsonContent && !!jsonContent.title) ? jsonContent.title : null;
                //Récupération de la commande : 

                //Traitement de la commande 

                
            });
          });        
        }

    