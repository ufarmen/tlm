///////////////////////////
/* HYPERSTELLAR FRONTEND */
///////////////////////////

/* PUBLIC NODE.JS MODULES */
var express = require("express");
var app = express();
var router = express.Router();
var fs = require("fs");
var bodyParser = require('body-parser');
//var mongoClient = require('mongodb').MongoClient;
var path = __dirname + '/views/';
//var assert = require('assert');


/* PRIVATE NODE.JS MODULES */
var pshell = require("./node_private_modules/powershell-api.js");
var nodeRestApi = require('./node_private_modules/rest-api.js');


/* GLOBAL VARIABLES */
//var url = 'mongodb://localhost:27017/mydb';


/* MODULE 'APP' */
app.use("/",router);
app.use(express.static(path));

app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.listen(3000,function(){
  console.log("Hyperstellar Frontend listening to Port:3000");   
});


/* MODULE 'ROUTER' */
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

// GET
router.get("/", function (req,res) {
  res.sendFile(path + "index.html");
});

router.get("/opprett", function (req,res) {
  res.sendFile(path + "opprett.html");
});


// POST
router.post("/newVM", urlencodedParser, function (req,res) {
    if (!req.body) return res.sendStatus(400)
    
    var jsonData = JSON.stringify(req.body);
    jsonData = "'" + jsonData + "'";
   
    console.log(jsonData);
    res.write(jsonData);
    pshell.executeScript(res,"C:\\Scripts\\New-HyperstellarVM.ps1",[jsonData]);
});


// PUT
router.put("/updateVM", urlencodedParser, function (req,res) {
    if (!req.body) return res.sendStatus(400)
    
    var jsonData = JSON.stringify(req.body);
    jsonData = "'" + jsonData + "'";
    
    console.log(jsonData);
    res.write(jsonData);  
    pshell.executeScript(res,"<script-path>",[jsonData]);
});

// DELETE
router.delete("/deleteVM", urlencodedParser, function (req,res) {
    if (!req.body) return res.sendStatus(400)
    
    var jsonData = JSON.stringify(req.body);
    jsonData = "'" + jsonData + "'";
    
    console.log(jsonData);
    res.write(jsonData);
    pshell.executeScript(res,"<script-path>",[jsonData]);   
});


