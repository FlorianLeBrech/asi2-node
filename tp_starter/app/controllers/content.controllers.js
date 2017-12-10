'use strict';
var CONFIG = JSON.parse(process.env.CONFIG);
var fs = require("fs");
var utils = require("./../utils/utils.js");
var path = require("path");
var jf = require('jsonfile');
var utils = require("./../utils/utils.js");
var ContentModel = require("./../models/content.model")



class ContentController {


    static list(request, response) {

        var absolutePathContentDirectory = path.resolve(CONFIG.contentDirectory);
        var acc = {};
        var nbNotJson = 0;
        fs.readdir(absolutePathContentDirectory, (err, files) => {
            if (err) return response.end(err);
            //lecture du fichier

            var filesList = [];
            files.forEach(file1 => {
                    if (path.extname(file1) == ".json") {
                        filesList[Object.keys(filesList).length]= file1;
                    }
                })

            filesList.forEach(file => {
                    //Lecture du JSON
                    utils.readFileIfExists(utils.getDataFilePath(file),
                        function (err, obj) {
                            if (err) return response.end(err);
                            var tmp = JSON.parse(obj.toString());
                            acc['content.' + tmp.id] = tmp
                            //Retour du fichier Json quand tous les fichiers ont bien été traités
                            if (Object.keys(acc).length == Object.keys(filesList).length ) {
                                //return callback(null, acc);    // peut etre un tojson à rajouter      
                                response.json(acc);
                            }
                        });
            });
        })
    }

    static create(request, response) {
        var content = new ContentModel();

        if (!!request.body) {
            if (!!request.body.title) {
                if (!!request.body.type) {
                    //gestion juste avec le source
                    if (!!request.body.src) {
                        content.title = request.body.title;
                        content.type = request.body.type;
                        content.src = request.body.src;
                        ContentModel.create(content, function (err) {
                            if (err) {
                                return response.status(500).send(err);
                            }
                            else {
                                return response.send('{"success" : "Insert Successfully", "status" : 200}');
                            }
                        })
                    }
                    else if (!!request.file) {
                        content.title = request.body.title;
                        content.fileName = content.id + path.extname(request.file.originalname);
                        content.type = request.body.type;                       
                        utils.readFileIfExists(request.file.path,
                            function (err, obj) {
                                if (err)  
                                { 
                                     return response.status(500).send(err);
                                }
                                content.setData(obj);
                                ContentModel.create(content, function (err) {
                                    if (err) {
                                        return response.status(500).send(err);
                                    }
                                    else {
                                        return response.send('{"success" : "Updated Successfully", "status" : 200}');
                                    }
                                })
                            })
                    }
                }
            }
        }
    }
    static read(request, response) {
        var id = request.params.id;
        ContentModel.read(id, function (err, obj) {
            if (err) return response.end(err.toString());

            if (!!obj.fileName) {
                return response.sendFile(utils.getDataFilePath(obj.fileName));
            }
            else {
                return response.redirect(obj.src);
            }
        });
    }
}
module.exports = ContentController

