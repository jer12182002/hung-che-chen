/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students. *
* Name: __hung-che,chen____ Student ID: _115472169____ Date: __June,11,2017________ *
* Online (Heroku) Link: _https://warm-taiga-21988.herokuapp.com________
* ********************************************************************************/
var express = require("express");
var app = express();
var path = require("path");

var data_service = require('./data-service.js');
var HTTP_PORT = process.env.PORT || 8080;

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
//app.listen(HTTP_PORT, onHttpStart);

app.get("/",(req,res)=>{
   res.sendFile(path.join(__dirname + "/views/home.html"));
});




app.get("/employees", function(req,res){

    if(req.query.status){
      data_service.getEmployeesByStatus(req.query.status).then((data)=>{
        res.json(data);
      }).catch((err)=>{
        res.json({message: err});
      });
    }else if(req.query.department){
      data_service.getEmployeesByDepartment(req.query.department).then((data)=>{
        res.json(data);
      }).catch((err)=>{
        res.json({message: err});
      });
    }else if(req.query.manager){
      data_service.getEmployeesByManager(req.query.manager).then((data)=>{
        res.json(data);
      }).catch((err)=>{
        res.json({message: err});
      });
    }else{
      data_service.getAllEmployees().then((data)=>{
        res.json(data);
      }).catch((err)=>{
        res.json({message: err});
      });
    }
});

app.get("/employee/:num", function(req,res){
  data_service.getEmployeeByNum(req.params.num).then((data)=>{
    res.json(data);
  }).catch((err)=>{
      res.json({message: err});
  });
});

app.get("/managers", function(req,res){
      data_service.getManagers().then((data)=>{
        res.json(data);
      }).catch((err)=>{
        res.json({message: err});
      });
});

app.get("/departments", function(req,res){
      data_service.getDepartments().then((data)=>{
        res.json(data);
      }).catch((err)=>{
        res.json({message: err});
      });
});

app.use(function(req, res) {
  res.status(404).send("Sorry!!!!!!!>>>Page Not Found! <<<:(");
});

//app.listen(HTTP_PORT, onHttpStart);


/*
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
*/

data_service.initialize().then(()=>{
  app.listen(HTTP_PORT,onHttpStart);
}).catch((error)=>{
  console.log(error);
});