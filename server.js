/*********************************************************************************
* WEB322 – Assignment 08 
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this 
* assignment has been copied manually or electronically from any other source (including web sites) or 
* distributed to other students. 
*
* Name: _HUNG-CHE,CHEN_____ Student ID: _115472169___ Date: __2017/07/11____ 
*
* Online (Heroku) Link: https://warm-taiga-21988.herokuapp.com/
* ********************************************************************************/

var express = require("express");
var app = express();
var path = require("path");
var dataService = require("./data-service.js");
const dataServiceComments = require("./data-service-comments.js");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const clientSessions = require("client-sessions");
const dataServiceAuth = require("./data-service-auth");


var HTTP_PORT = process.env.PORT || 8080;

function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}

const user = {
  username: ""
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));


// Load CSS file
app.use(express.static('public'));

app.use(clientSessions({
  cookieName: "session", // this is the object name that will be added to 'req'
  secret: "A7_web322", // this should be a long un-guessable string.
  duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
  activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(HTTP_PORT, function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
    return new Promise((res,req) => {
        dataService.initialize().then(()=> {
            console.log(chalk.green("connected to dataService. step-1"));
        }).catch((err) => {
            console.log(err);
        });
        dataServiceComments.initialize().then(()=>{
            console.log("connected to dataServiceComments. step-2");
        }).catch((err)=>{
            console.log(err);
        });
        dataServiceAuth.initialize().then(() => {
            console.log("data-service-auth.js    initialize success!!");
          
           }).catch((err) => {
               console.log(err);
        });
            console.log("!!!!!!!!!!!!!!!2 steps gone through. whole initializes works well!!!!!");
    });
});


app.use(express.static('public'));

// setup http server to listen on HTTP_PORT
// dataService.initialize().then(function () {
//   app.listen(HTTP_PORT, onHttpStart());
// }).catch(function (err) {
//   console.log(err);
// });

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
  res.render("home", {user: req.session.user});
});

// setup another route to listen on /about
app.get("/about", (req, res) => {
    dataServiceComments.getAllComments().then((dataFromPromise) => {
        res.render("about", {data: dataFromPromise,user: req.session.user});
    }).catch(() => {
        res.render("about");
    });
});
// NEW ROUTES FOR ASSIGNMENT 3 ///////////////////

app.get("/employees", ensureLogin, (req, res) => {


  if (req.query.status) {
    dataService.getEmployeesByStatus(req.query.status).then((data) => {
      res.render("employeeList", { data: data, title: "Employees", user: req.session.user});
    }).catch((err) => {
      res.render("employeeList", { data: {}, title: "Employees" });
    });

  } else if (req.query.department) {
    dataService.getEmployeesByDepartment(req.query.department).then((data) => {
      res.render("employeeList", { data: data, title: "Employees", user: req.session.user});
    }).catch((err) => {
      res.render("employeeList", { data: {}, title: "Employees" });
    });


  } else if (req.query.manager) {
    dataService.getEmployeesByManager(req.query.manager).then((data) => {
      res.render("employeeList", { data: data, title: "Employees", user: req.session.user});
    }).catch((err) => {
      res.render("employeeList", { data: {}, title: "Employees" });
    });

  } else {
    dataService.getAllEmployees().then((data) => {
      res.render("employeeList", { data: data, title: "Employees", user: req.session.user});
    }).catch((err) => {
      res.render("employeeList", { data: {}, title: "Employees" });
    });
  }


});

app.get("/employee/:empNum", ensureLogin, (req, res) => {
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
             res.render("employee", { viewData: viewData, user: req.session.user}); // render the "employee" view
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

app.get("/managers", ensureLogin,(req, res) => {

  dataService.getManagers().then((data) => {
    res.render("employeeList", { data: data, title: "Employees (Managers)", user: req.session.user});
  }).catch((err) => {
    res.render("employeeList", { data: {}, title: "Employees (Managers)" });
  });

});  // (view an employee by employeeId)

app.get("/departments", ensureLogin, (req, res) => {

  dataService.getDepartments().then((data) => {
    res.render("departmentList", { data: data, title: "Departments", user: req.session.user});
  }).catch((err) => {
    res.render("departmentList", { data: {}, title: "Departments" });
  });
});


app.get("/employees/add", ensureLogin, (req, res) => {
    dataService.getDepartments().then((data) => {
        res.render("addEmployee",{departments: data, user: req.session.user});
    }).catch((err) => {
        res.render("addEmployee", {departments: []});
    });
});

app.post("/employees/add", ensureLogin, (req, res) => {
  dataService.addEmployee(req.body).then(()=>{
    res.redirect("/employees");
  });
});

app.post("/employee/update", ensureLogin, (req, res) => {
  dataService.updateEmployee(req.body).then( (data) => {
      console.log(req.body);
      res.redirect("/employees");
    }).catch(function(err){
      console.log(err);
  });
});


app.get("/departments/add", ensureLogin, (req, res) => {
    res.render("addDepartments", {title: "Department"});
});


app.post("/departments/add", ensureLogin, (req, res) => {
    dataService.addDepartment(req.body).then((data) => {
        res.redirect("/departments");
    }).catch(() => {
        console.log(err);
    });
});


app.post("/department/update", ensureLogin, (req,res) => {
    dataService.updateDepartment(req.body).then((data) => {
        res.redirect("/departments");
    });
});


app.get("/department/:departmentId", ensureLogin, (req, res) => {
    dataService.getDepartmentById(req.params.departmentId).then((data) => {
        res.render("department", {
           data: data
        });
    }).catch((err) => {
        res.status(404).send("Department Not Found");
    });
});


app.get("/employee/delete/:empNum", ensureLogin, (req, res) => {
    dataService.deleteEmployeeByNum(req.params.empNum).then((data) => {
        res.redirect("/employees");
    }).catch((err) => {
        res.status(500).send("Unable to Remove Employee / Employee not found");
    });
});

app.post("/about/addComment", (req, res) => {
    dataServiceComments.addComment(req.body).then((data) => {
        res.redirect("/about");
    }).catch(() => {
        res.reject("error to the console");
        res.redirect("/about");
    });
});

app.post("/about/addReply", (req, res) => {
    dataServiceComments.addReply(req.body).then((data) => {
        res.redirect("/about");
    }).catch((err) => {
        reject("error to the console");
        redirect("/about");
    });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    dataServiceAuth.registerUser(req.body).then(() => {
        res.render("register", {successMessage: "User created"});
    }).catch((err) => {
        res.render("register", {errorMessage: err, user: req.body.user});
    });
});

app.post("/login", (req, res) => {

    dataServiceAuth.checkUser(req.body).then(() => {
        const username = req.body.user;
        req.session.user = {
            username: username
        };
        console.log(chalk.bgGreen(JSON.stringify(req.session)));
        res.redirect("/employees");
    }).catch((err) => {
        res.render("login", {errorMessage: err, user: req.body.user});
    });
});

app.post("/api/updatePassword", (req, res) =>{
    dataServiceAuth.checkUser({ user: req.body.user, password: req.body.currentPassword}).then(() => {
        console.log(chalk.bgBlue("The_password_already_checked"));
        dataServiceAuth.updatePassword(req.body).then(() => {
            console.log(chalk.bgBlue(">>>Now Update the password!!!!"));
            console.log(chalk.yellow(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+req.body.user));
            res.send({successMessage: "Password changed successfully for user: ", user: req.body.user});
        }).catch((err) => {
            console.log(chalk.red(">>>Error Update the password!!!!"));
            res.send({errorMessage: err});
        });
    }).catch((err) => {
        reject({errorMessage: err});
    });
});

app.get("/logout", (req, res) => {
    req.session.reset();
    res.redirect('/');
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});