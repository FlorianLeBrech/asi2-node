var CONFIG = require("./../../config.json");
var path = require("path");
var utils = require ("./../utils/utils.js");
var jf = require('jsonfile');
var fs = require('fs');
var absolutePathContentDirectory = path.resolve(CONFIG.contentDirectory);


class ContentModel{
    
    constructor(jsonContent) {
        this.type = jsonContent.type;
        this.id = utils.generateUUID();
        this.title = jsonContent.title; 
        this.src = jsonContent.src; 
        this.fileName = utils.getNewFileName();
        //Gestion du champ data
         // this.data = jsonContent.data;
        /*var request = require('request').defaults({ encoding: null });        
        request.get(this.jsonContent.src, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                    data = new Buffer(body);
            }
        })*/
    }


    //Fonctions lié à la classe (static)
    static create(ContentModel, callback) {

        //Gestion des chemins
        var contentMetaJsonFileName = path.join(absolutePathContentDirectory, ContentModel.id + ".meta.json");
        var contentFileName = path.join(absolutePathContentDirectory, ContentModel.id);
        
        // gestion des case avancé 
        switch(ContentModel.type){
            case "img" : 
                //Stockage du fichier Json
                jf.writeFile(contentMetaJsonFileName, JSON.parse(ContentModel),function(err){
                    if (err) throw err;
                })
                //Stockage de Content
                jf.writeFile(contentMetaJsonFileName,contentFileName.data,function(err){
                    if (err) throw err;
                })
                break;
            case "img_url" :
                //Stockage du fichier Json
                jf.writeFile(contentMetaJsonFileName,JSON.parse(ContentModel),function(err){
                    if (err) throw err;
                })
                break;
            case "video" : 
                //Stockage du fichier Json
                jf.writeFile(contentMetaJsonFileName,JSON.parse(ContentModel),function(err){
                    if (err) throw err;
                })
                //Stockage de Content
                jf.writeFile(contentMetaJsonFileName,contentFileName.data,function(err){
                    if (err) throw err;
                })
                break;
            case "web" : 
                //Stockage du fichier Json
                jf.writeFile(contentMetaJsonFileName,JSON.parse(ContentModel),function(err){
                    if (err) throw err;
                })
                //Stockage de Content
                jf.writeFile(contentMetaJsonFileName,contentFileName.data,function(err){
                    if (err) throw err;
                })
                break;                
            default : 
                break;
        }
   }
    
    static read(id, callback) {
        var absolutePathContentDirectory = path.resolve(CONFIG.contentDirectory);        
        return utils.readFileIfExists(utils.getMetaFilePath(id));
    }
    
    static update(ContentModel, callback) {
        //Gestion des chemins
        var contentMetaJsonFileName = path.join(absolutePathContentDirectory, ContentModel.id + ".meta.json");
        var contentFileName = path.join(absolutePathContentDirectory, ContentModel.id);

        jf.writeFile(contentMetaJsonFileName, JSON.parse(ContentModel),function(err){
            if (err) throw err;
        })
        if (ContentModel.type=="img" && ContentModel.getData()!= null){
            if (ContentModel.getData().length>0){
                //Mise à jour du fichier 
                jf.writeFile(contentMetaJsonFileName,contentFileName.data,function(err){
                    if (err) throw err;
                })
            }
        }
    }
    
    static delete(id, callback) {
      
    }
}