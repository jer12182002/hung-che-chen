const fs = require('fs');

var employees = [];
var departments = [];
var empCount=0;

module.exports.initialize = function () {

    // fetches the data from the .json files and converts it to an object in memory (local to this module)

    return new Promise(function (resolve, reject) {

        fs.readFile('./data/employees.json', (err, data) =>{
            if (err) {
                reject("could not open employees.json");
            }else{
                employees = JSON.parse(data);

                fs.readFile('./data/departments.json', (err, data) => {
                    if (err) {
                        reject("could not open departments.json");
                    }else{
                        departments = JSON.parse(data);
                        empCount=employees.length;
                        resolve();
                    }
                });
            }
        });
    });
};


module.exports.getAllEmployees = function () {
    return new Promise(function (resolve, reject) {  
        if (employees.length == 0) {
            reject("query returned 0 results");
        }

        resolve(employees);
    });
};

module.exports.getEmployeesByStatus = function (status) {
    return new Promise(function (resolve, reject) {

        var filteredEmployeees = [];

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].status == status) {
                filteredEmployeees.push(employees[i]);
            }
        }

        if (filteredEmployeees.length == 0) {
            reject("query returned 0 results");
        }

        resolve(filteredEmployeees);
    });
};

module.exports.getEmployeesByDepartment = function (department) {
    return new Promise(function (resolve, reject) {
        var filteredEmployeees = [];

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].department == department) {
                filteredEmployeees.push(employees[i]);
            }
        }

        if (filteredEmployeees.length == 0) {
            reject("query returned 0 results");
        }

        resolve(filteredEmployeees);
    });
};

module.exports.getEmployeesByManager = function (manager) {
    return new Promise(function (resolve, reject) {
        var filteredEmployeees = [];

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeManagerNum == manager) {
                filteredEmployeees.push(employees[i]);
            }
        }

        if (filteredEmployeees.length == 0) {
            reject("query returned 0 results");
        }

        resolve(filteredEmployeees);
    });
};

module.exports.getManagers = function () {
    return new Promise(function (resolve, reject) {
        var filteredEmployeees = [];

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].isManager == true) {
                filteredEmployeees.push(employees[i]);
            }
        }

        if (filteredEmployeees.length == 0) {
            reject("query returned 0 results");
        }

        resolve(filteredEmployeees);
    });
};

module.exports.getEmployeeByNum = function (num) {
    return new Promise(function (resolve, reject) {
        var foundEmployee = null;

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeNum == num) {
                foundEmployee = employees[i];
            }
        }

        if (!foundEmployee) {
            reject("query returned 0 results");
        }

        resolve(foundEmployee);
    });
};

module.exports.getDepartments = function () {
    return new Promise(function (resolve, reject) {

        if (departments.length == 0) {
            reject("query returned 0 results");
        }

        resolve(departments);
    });

};

module.exports.addEmployee = (employeeInfo) => {
    empCount++;
    employeeNum+=empCount;
    //console.log( employeeNum);
    return new Promise((resolve, reject) => {
        employess.push(employeeInfo);
        if (employess.length == 0) {
            reject("Error");
        }
        resolve(employess);
    });
}


module.exports.updateEmployee = (employeeInfo) => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < employess.length; i++) {
            if (employess[i].employeeNum == employeeData.employeeNum) {
                employees[i]=employeeInfo;
            }
        }
        if (employess.length == 0) {
            reject("Error");
        }
        resolve(employess);
    });
}