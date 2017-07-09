/*********************************************************************************
* WEB322 – Assignment 05 
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this 
* assignment has been copied manually or electronically from any other source (including web sites) or 
* distributed to other students. 
* 
* Name: _HUNG-CHE,CHEN_____ Student ID: _115472169___ Date: __2017/07/08____ 
* 
* Online (Heroku) Link: ________________________________________________________ 
* ********************************************************************************/

var express = require("express");
var app = express();
var path = require("path");
var dataService = require("./data-service.js");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

var HTTP_PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// app.listen(HTTP_PORT, onHttpStart);





// setup http server to listen on HTTP_PORT
dataService.initialize().then(function () {
  app.listen(HTTP_PORT, onHttpStart());
}).catch(function (err) {
  console.log(err);
});

//////////////////////////////////////////////////

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
// function onHttpStart() {
//   console.log("Express http server listening on: " + HTTP_PORT);
// }

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
    // initialize an empty object to store the values
    let viewData = {};
    dataService.getEmployeeByNum(req.params.empNum).then((data) => {
        viewData.data = data; //store employee data in the "viewData" object as "data"
    }).catch(() => {
        viewData.data = null; // set employee to null if there was an error
    }).then(dataService.getDepartments).then((data) => {
        viewData.departments = data; // store department data in the "viewData" object as "departments"
                                     // loop through viewData.departments and once we have found the departmentId that matches
                                     // the employee's "department" value, add a "selected" property to the matching
                                     // viewData.departments object
        for (let i = 0; i < viewData.departments.length; i++) {
            if (viewData.departments[i].departmentId == viewData.data[0].department) {
                viewData.departments[i].selected = true;
            }
        }
      
    }).catch(() => {
        viewData.departments = []; // set departments to empty if there was an error
    }).then(() => {
        if (viewData.data == null){ // if no employee - return an error
           
            res.status(404).send("Employee Not Found!!!");
        } else {
             res.render("employee", { viewData: viewData }); // render the "employee" view
        }
    });
});

// app.get("/employee/:empNum", (req, res) => {

//   dataService.getEmployeeByNum(req.params.empNum).then((departments) => {
//     res.render("employee", { data: departments });
//   }).catch((err) => {
//     res.status(404).send("Employee Not Found");
//   });

// });

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


app.get("/employees/add", (req, res) => {
    dataService.getDepartments().then((data) => {
        // res.send(data); Test 
        res.render("addEmployee",{departments: data});
    }).catch((err) => {
        res.render("addEmployee", {departments: []});
    });
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


app.get("/departments/add", (req, res) => {
    res.render("addDepartments", {title: "Department"});
});


app.post("/departments/add", (req, res) => {
    dataService.addDepartment(req.body).then((data) => {
        res.redirect("/departments");
    }).catch(() => {
        console.log(err);
    });
});


app.post("/department/update", (req,res) => {
    dataService.updateDepartment(req.body).then((data) => {
        res.redirect("/departments");
    });
});


app.get("/department/:departmentId", (req, res) => {
    dataService.getDepartmentById(req.params.departmentId).then((data) => {
        res.render("department", {
           data: data
        });
    }).catch((err) => {
        res.status(404).send("Department Not Found");
    });
});


app.get("/employee/delete/:empNum", (req, res) => {
    dataService.deleteEmployeeByNum(req.params.empNum).then((data) => {
        res.redirect("/employees");
    }).catch((err) => {
        res.status(500).send("Unable to Remove Employee / Employee not found");
    });
});


app.use((req, res) => {
  res.status(404).send("Page Not Found");
});