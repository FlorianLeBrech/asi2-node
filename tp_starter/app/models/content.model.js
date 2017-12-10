'use strict';

var CONFIG = JSON.parse(process.env.CONFIG);
var path = require("path");
var utils = require("./../utils/utils.js");
var jf = require('jsonfile');
var fs = require('fs');
var absolutePathContentDirectory = path.resolve(CONFIG.contentDirectory);


class ContentModel {

// traitement peut être a améliorer / revoir
    constructor(jsonContent) {       

        if (!!jsonContent) {
          /*
            this.type = (!!jsonContent && !!jsonContent.type) ? jsonContent.body.type : null;
            this.title = (!!jsonContent && !!jsonContent.title) ? jsonContent.body.title : null;
            this.src = (!!jsonContent && !!jsonContent.src) ? jsonContent.body.src : null;
            this.fileName = (!!jsonContent && !!jsonContent.fileName) ? jsonContent.body.fileName : null;
            this.id = (!!jsonContent && !!jsonContent.title) ? jsonContent.body.id : this.id = utils.generateUUID();
          */
            this.type = (!!jsonContent && !!jsonContent.type) ? jsonContent.type : null;
            this.title = (!!jsonContent && !!jsonContent.title) ? jsonContent.title : null;
            this.src = (!!jsonContent && !!jsonContent.src) ? jsonContent.src : null;
            this.fileName = (!!jsonContent && !!jsonContent.fileName) ? jsonContent.fileName : null;
            this.id = (!!jsonContent && !!jsonContent.title) ? jsonContent.id : this.id = utils.generateUUID();
        }
        else {
            this.id = utils.generateUUID();
            this.title = "";
            this.type = "";
            this.src = "";
            this.fileName = "";
        }
        //Gestion du champ data
        var data = "";
        this.getData = function () { return data; };
        this.setData = function (newData) { data = newData; };
    }


    //Fonctions lié à la classe (static)
    static create(contentModel, callback) {

        //test contentModel
        if (contentModel != undefined) {
            
        if (contentModel.type == undefined){
            return callback(new Error("Le fichier n'est pas de type json"));            
        } 
        if (contentModel.id==undefined){
            return callback(new Error("L'id ne doit pas être null"));
        } 
        if (contentModel.title==undefined){
            return callback(new Error("Le titre ne doit pas être null"));
        }  
        if (contentModel.type==undefined){
            return callback(new Error("Le type ne doit pas être null"));
        } 
        if (contentModel.src==undefined){
            return callback(new Error("Le src ne doit pas être null"));
        }   

        //Gestion des chemins
        var contentMetaJsonFileNamePath = utils.getMetaFilePath(contentModel.id);
        var contentFileName = utils.getDataFilePath(contentModel.fileName);

        var data = false;



        // gestion des case avancé 
        if (!!contentModel.getData() ) {
                jf.writeFile(contentMetaJsonFileNamePath, contentModel, function (err) {
                    if (err) return callback(err);
                    fs.writeFile(contentFileName, contentModel.getData(), function (err) {
                        if (err) return callback(err);
                        data = true;
                        return callback(null);
                    })
                })
        }
        else {
            jf.writeFile(contentMetaJsonFileNamePath, contentModel, function (err) {
                if (err) return callback(err);
                return callback(null);                
            })
        }
    }
}

    static read(id, callback) {

        //test contentModel
        if (id==null){
            return callback(new Error("L'id ne doit pas être null"));
        } 
        var contentMetaJsonFileNamePath = utils.getMetaFilePath(id);
        utils.readFileIfExists(contentMetaJsonFileNamePath,
            function (err, obj) {
                if (err) return callback(err);
                var contentModel = new ContentModel();
                var tmp = JSON.parse(obj.toString());
                contentModel.id = tmp.id;
                contentModel.type = tmp.type;
                contentModel.title = tmp.title;
                contentModel.fileName = tmp.fileName;
                contentModel.src = tmp.src;
                return callback(null, contentModel);                
                 });
    }

    static update(contentModel, callback) {
        //test contentModel
        if (contentModel.id==null){
            return callback(new Error("L'id ne doit pas être null"));
        } 
        //Gestion des chemins
        var contentMetaJsonFileNamePath = utils.getMetaFilePath(contentModel.id);
        var contentFileName = utils.getDataFilePath(contentModel.id);

        ContentModel.read(contentModel.id, function (err, data) {
            if (err) return callback(err);
            var contentFileName = utils.getDataFilePath(data.fileName);
            utils.fileExists(contentFileName,
                function (err, obj) {
                    if (err) return console.log(err);
                    fs.unlink(contentFileName, function (err) {
                        if (err) return console.log(err);
                        console.log('data deleted successfully');
                        ContentModel.create(contentModel, function (err) {
                            if (err) return console.log(err);
                            return callback(null);
                        })
                    })
                })

        })
    }

    static delete(id, callback) {
        var contentMetaJsonFileNamePath = utils.getMetaFilePath(id);
        ContentModel.read(id, function (err, data) {
            if (err) return callback(err);
            var contentFileName = utils.getDataFilePath(data.fileName);
            utils.fileExists(contentFileName,
                function (err, obj) {
                    if (err) return callback(err);
                    fs.unlink(contentFileName, function (err) {
                        if (err) return callback(err);
                        console.log('data deleted successfully');
                        utils.fileExists(contentMetaJsonFileNamePath,
                            function (err, obj) {
                                if (err) return callback(err);
                                
                                fs.unlink(contentMetaJsonFileNamePath, function (err) {
                                    if (err) return callback(err);
                                    console.log('json deleted successfully');
                                    return callback(null);
                                })
                            })
                    })
                })
        })
    }
}



module.exports = ContentModel