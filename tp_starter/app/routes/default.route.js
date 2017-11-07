var express = require("express");
var router = express.Router();
module.exports = router; 


router.route("/") 
 .all(function(request, response){
    response.send("it works");
 })
    