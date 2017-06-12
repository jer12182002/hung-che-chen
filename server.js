/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students. *
* Name: __hung-che,chen____ Student ID: _115472169____ Date: __June,11,2017________ *
* Online (Heroku) Link: _https://warm-taiga-21988.herokuapp.com________
* ********************************************************************************/


var express = require('./data-service.js');

var express = require("express");
var app = express();

var path = require("path");
var HTTP_PORT = process.env.PORT || 8001;

app.use(express.static('public'));

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on port:" + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
   res.sendFile(path.join(__dirname + "/views/home.html"));
});

// setup another route to listen on /about
app.get("/about", function(req,res){
   res.sendFile(path.join(__dirname + "/views/about.html"));
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);

app.get("/",(req,res)=>{
  res.send("Hello World!");
});

app.get("/employees",(req,res)=>{
  if(req.query.status){
    res.json({message: req.query.status});
  }else if(req.query.manager){
    res.json({message: req.query.manager});
  }else if(req.query.department){
    res.json({message: req.query.department});
  }else{
    //res.status(404);
    //res.send("Page Not Found");
    res.status(404).send("Page Not Found");
  }
});

app.listen("/data-service.js");
