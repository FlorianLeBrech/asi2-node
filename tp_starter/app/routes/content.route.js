// content.route.js
 "use strict"; 
var CONFIG = JSON.parse(process.env.CONFIG);
var multer = require("multer"); 
var express = require("express");
    
var contentController = require('./../controllers/content.controllers'); 

var router = express.Router(); module.exports = router; 

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/')
    },
    filename: function (req, file, cb) {
        if (file){
            cb(null, file.originalname);
        }
    }
  });
  var multerMiddleware = multer({ storage: storage });


router.get('/contents/:id', contentController.read);      
router.get('/contents', contentController.list);      
router.post("/contents", multerMiddleware.single("file"), contentController.create);


/*
   router.route('/contents')  
       .get(contentController.list)      
       .post(contentController.create); 
   router.route('/contents/:contentId')     
    .get(contentController.read)      
    .put(contentController.update)   
    .delete(contentController   .delete); 

   router.param('contentId', function(req, res, next, id) {  
          req.contentId = id;    
           next();    
        });*/