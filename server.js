var express = require("express");
var app = express();
var path = require("path");
var dataService = require("./data-service.js");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');



var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.engine(".hbs", exphbs({
  extname: ".hbs",
  defaultLayout: 'layout',
  helpers: {
    equal: function (lvalue, rvalue, options) {
      if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
      if (lvalue != rvalue) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    }
  }
}));
app.set("view engine", ".hbs");

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", (req, res) => {
  res.render("home");
});

// setup another route to listen on /about
app.get("/about", (req, res) => {
  res.render("about");
});

// NEW ROUTES FOR ASSIGNMENT 3 ///////////////////

app.get("/employees", (req, res) => {


  if (req.query.status) {
    dataService.getEmployeesByStatus(req.query.status).then((data) => {
      res.render("employeeList", { data: data, title: "Employees" });
    }).catch((err) => {
      res.render("employeeList", { data: {}, title: "Employees" });
    });

  } else if (req.query.department) {
    dataService.getEmployeesByDepartment(req.query.department).then((data) => {
      res.render("employeeList", { data: data, title: "Employees"});
    }).catch((err) => {
      res.render("employeeList", { data: {}, title: "Employees" });
    });


  } else if (req.query.manager) {
    dataService.getEmployeesByManager(req.query.manager).then((data) => {
      res.render("employeeList", { data: data, title: "Employees" });
    }).catch((err) => {
      res.render("employeeList", { data: {}, title: "Employees" });
    });

  } else {
    dataService.getAllEmployees().then((data) => {
      res.render("employeeList", { data: data, title: "Employees" });
    }).catch((err) => {
      res.render("employeeList", { data: {}, title: "Employees" });
    });
  }


});

app.get("/employee/:empNum", (req, res) => {

  dataService.getEmployeeByNum(req.params.empNum).then((data) => {
    res.render("employee", { data: data });
  }).catch((err) => {
    res.status(404).send("Employee Not Found");
  });

});

app.get("/managers", (req, res) => {

  dataService.getManagers().then((data) => {
    res.render("employeeList", { data: data, title: "Employees (Managers)" });
  }).catch((err) => {
    res.render("employeeList", { data: {}, title: "Employees (Managers)" });
  });

});  // (view an employee by employeeId)

app.get("/departments", (req, res) => {

  dataService.getDepartments().then((data) => {
    res.render("departmentList", { data: data, title: "Departments" });
  }).catch((err) => {
    res.render("departmentList", { data: {}, title: "Departments" });
  });

});

app.get("/employees/add", (req,res) => {
  res.render("addEmployee");
});

app.post("/employees/add", (req, res) => {
  dataService.addEmployee(req.body).then(()=>{
    res.redirect("/employees");
  });
});

app.post("/employee/update", (req, res) => { 
    
    dataService.updateEmployee(req.body).then( (data) => {
      console.log(req.body); 
      res.redirect("/employees"); 
    }).catch(function(err){
      console.log(err);
  });
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// setup http server to listen on HTTP_PORT
dataService.initialize().then(function () {
  app.listen(HTTP_PORT, onHttpStart);
}).catch(function () {
  console.log("unable to start dataService");
});

//////////////////////////////////////////////////

