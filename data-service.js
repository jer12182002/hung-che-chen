//const fs = require('fs');
const Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'user', 'password', {
    host: 'ec2-23-21-96-159.compute-1.amazonaws.com',
    dialect: 'postgres', port: 5432, dialectOptions: {
        ssl: true
    }
});

//var employees = [];
//var departments = [];
//var empCount = 0;

module.exports.initialize = function () {

    // fetches the data from the .json files and converts it to an object in memory (local to this module)

   /* return new Promise(function (resolve, reject) {

        fs.readFile('./data/employees.json', (err, data) => {
            if (err) {
                reject("could not open employees.json");
            } else {
                employees = JSON.parse(data);
                empCount = employees.length;

                fs.readFile('./data/departments.json', (err, data) => {
                    if (err) {
                        reject("could not open departments.json");
                    } else {
                        departments = JSON.parse(data);

                        resolve();

                    }

                });
            }
        });
    });*/
    return new Promise(function (resolve, reject) { reject();
});
}

module.exports.getAllEmployees = function () {
    /*return new Promise(function (resolve, reject) {
        if (employees.length == 0) {
            reject("query returned 0 results");
        }

        resolve(employees);
    });*/
    return new Promise(function (resolve, reject) { reject();
});
};

module.exports.getEmployeesByStatus = function (status) {
   /* return new Promise(function (resolve, reject) {

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
    });*/
    return new Promise(function (resolve, reject) { reject();
});
};

module.exports.getEmployeesByDepartment = function (department) {
    /*return new Promise(function (resolve, reject) {
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
    });*/
    return new Promise(function (resolve, reject) { reject();
});
};

module.exports.getEmployeesByManager = function (manager) {
    /*return new Promise(function (resolve, reject) {
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
    });*/
    return new Promise(function (resolve, reject) { reject();
});
};

module.exports.getManagers = function () {
   /* return new Promise(function (resolve, reject) {
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
    });*/
    return new Promise(function (resolve, reject) { reject();
});
};

module.exports.getEmployeeByNum = function (num) {
   /* return new Promise(function (resolve, reject) {
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
    });*/
    return new Promise(function (resolve, reject) { reject();
});
};

module.exports.getDepartments = function () {
   /* return new Promise(function (resolve, reject) {

        if (departments.length == 0) {
            reject("query returned 0 results");
        }

        resolve(departments);
    });
*/
    return new Promise(function (resolve, reject) { reject();
});
};

module.exports.addEmployee = function (employeeData) {
    /*return new Promise(function (resolve, reject) {

        employeeData.isManager = (employeeData.isManager) ? true : false;

        empCount++;
        employeeData.employeeNum = empCount;
        employees.push(employeeData);

        resolve();
    });*/
    return new Promise(function (resolve, reject) { reject();
});

};

module.exports.updateEmployee = (employeeData) => {
    /*employeeData.isManager = (employeeData.isManager) ? true : false;
    return new Promise((resolve, reject) => {
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeNum == employeeData.employeeNum) {
                employees[i] = employeeData;
            }
        }
        if (employees.length == 0) {
            reject("error");
        }
        resolve(employees);
    });*/
    return new Promise(function (resolve, reject) { reject();
});
}