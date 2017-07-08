//const fs = require('fs');
const Sequelize = require('sequelize');
var sequelize = new Sequelize('d6aguqpd1crrta', 'xujhrkbrwhwgtv', '02ee72beb19c187b9edfb240c9baf99d7f4fcb5b2a3a44daf37da7949b00f774', {
    host: 'ec2-23-21-96-159.compute-1.amazonaws.com',
    dialect: 'postgres', port: 5432, dialectOptions: {
        ssl: true
    }
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((err) => {
    console.log('Unable to connect to the database:', err);
});

// Creating Data Models
const Employee = sequelize.define('Employee',{
    employeeNum:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addresCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    matritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
    }, {
        createdAt: false, // disable createdAt
        updatedAt: false // disable updatedAt
});

const Department = sequelize.define('Department',{
    departmentId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentName: Sequelize.STRING
    }, {
        createdAt: false, // disable createdAt
        updatedAt: false // disable updatedAt
});

module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then((Employee) => {
            resolve();
        }).then((Department) => {
            resolve();
        }).catch((err) => {
            reject("unable to sync the database");
        });
        reject();
    });
}

module.exports.getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve(Employee.findAll());
        }).catch((err) => {
            reject("no results returned.");
        });
    });
}

module.exports.getEmployeesByStatus = (status) => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve(Employee.findAll({
                where:{
                    status: status
                }}));
        }).catch((err) => {
            reject("no results returned.");
        });
    });
}

module.exports.getEmployeesByDepartment = (department) => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve(Employee.findAll({
                where:{
                    department: department
            }}));
        }).catch((err) => {
            reject("no results returned.");
        });
    });
}

module.exports.getEmployeesByManager = (manager) => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve(Employee.findAll({
                where:{
                    employeeManagerNum: manager
                }
            }));
            }).catch((err) => {
                reject("no results returned.");
        });
    });
}

module.exports.getEmployeeByNum = (num) => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve(Employee.findAll({
                where:{
                    employeeNum: num
                }
            }));
            }).catch((err) => {
                reject("no results returned.");
        });
    });
}

module.exports.getManagers = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve(Employee.findAll({
                where:{
                    isManager: true
                }})
            );
        }).catch((err) => {
            reject("no results returned.")
        });
    });
}

module.exports.getDepartments = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve(Department.findAll());
        }).catch((err) => {
            reject("no results returned.");
        });
    });
}

module.exports.addEmployee = (employeeData) => {
    employeeData.isManager = (employeeData.isManager) ? true : false;
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            for (let x in employeeData) {
                if(employeeData[x] == ""){
                    employeeData[x] = null;
                }
            }
            resolve(Employee.create({
                employeeNum: employeeData.employeeNum,
                firstName: employeeData.firstName,
                last_name: employeeData.last_name,
                email: employeeData.email,
                SSN: employeeData.SSN,
                addressStreet: employeeData.addressStreet,
                addresCity: employeeData.addresCity,
                isManager: employeeData.isManager,
                addressState: employeeData.addressState,
                addressPostal: employeeData.addressPostal,
                employeeManagerNum: employeeData.employeeManagerNum,
                status: employeeData.status,
                department: employeeData.department,
                hireDate: employeeData.hireDate}));
            }).catch(() => {
                reject("unable to create employee.");
            });
        }).catch(() => {
            reject("unable to create employee.");
    });
}

module.exports.updateEmployee = (employeeData) => {
    employeeData.isManager = (employeeData.isManager) ? true : false;
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            for (let x in employeeData) {
                if(employeeData[x] == ""){
                    employeeData[x] = null;
                }
            }
            resolve(Employee.update({
                firstName: employeeData.firstName,
                last_name: employeeData.last_name,
                email: employeeData.email,
                addressStreet: employeeData.addressStreet,
                addresCity: employeeData.addresCity,
                addressPostal: employeeData.addressPostal,
                addressState: employeeData.addressPostal,
                isManager: employeeData.isManager,
                employeeManagerNum: employeeData.employeeManagerNum,
                status: employeeData.status,
                department: employeeData.department
            }, { where: {
                employeeNum: employeeData.employeeNum
            }}));
        }).catch(() => {
            reject("unable to create employee.");
        });
    });
}

//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------


