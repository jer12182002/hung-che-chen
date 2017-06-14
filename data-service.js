/*var employees=[];
var departments= [];
const fs=require('fs');


module.exports.initialize=function(){
    var count=1;
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
       fs.readFile('./data/employees.json',(err,data)=>{
           if(err){
            reject(err);
        }else{
            employees[]=JSON.parse(employees);
            count--;
            if(!count){
                 fs.readFile('./data/departments.json');
                 departments[]=JSON.parse(departments);
                 if(employees.lenght||departments.length){
                     reject("unable to read file");
                 }else{
                     resolve("Read file successfully");
                 }
            }
        }
       })
    });   
}


module.exports.getAllEmpoyees=function(){
   return new Promise(function(resolve, reject){
        if(!employees.length){
            reject("no results returned");
        }else{
            resolve(employees);
        }
   });
}


module.exports.getEmployeesByStatu=function(status){  //status is full time
    var statusArr=[];
    var count=0;
    return new Promise(function(resolve,reject){
         if(!employees.length){
            reject("no results returned");
        }else{
            for(var i=0;i<employees.length;i++){
                if(employees[i].status!=status){
                    statusArr[count]=employees[i];
                    count++;    
                }
                resolve(statusArr);
            }
        }
    });
}


module.exports.getEmployeesByDepartment=function (department){  //department same as parameter(department)
    var deptArr=[];
    var count=0;
    return new Promise(function(resolve,reject){
         if(!employees.length){
            reject("no results returned");
        }else{
               for(var i=0;i<employees.length;i++){
                if(employees[i].department==department){
                    dept[count]=employees[i];
                    count++;
                }
                resolve(deptArr);
            }
        }
    });
}

module.exports.getEmployeesByManager=function(manager){  
   var manaArr=[];
   var count=0;
    return new Promise(function(resolve,reject){
         if(!employees.length){
            reject("no results returned");
        }else{
          for(var i=0;i<employees.length;i++){
                if(employees[i].manager==manager){
                    manaArr[count]=employees[i];
                    count++;
                }
                resolve(manaArr);
          }
        }
    });
}

mpdule.exports.getEmployeeByNum=function (num){  
    var numArr=[];
    var count=0;
    return new Promise(function(resolve,reject){
         if(!employees.length){
            reject("no results returned");
        }else{
            for(var i=0;i<employees.length;i++){
                if(employees[i].Num==num){
                   numArr[count]=employees[i];
                   count++;
                }
            }resolve(numArr);
        }
    });
}

module.exports.getManagers=function(){  //isManager ==1
    var reEmp=[];
    var count=0;
    return new Promise(function(resolve,reject){
         if(!employees.length){
            reject("no results returned");
        }else{
           for(var i=0;i<employees.length;i++){
                if(employees[i].isManager){
                    reEmp[count]=employees[i];
                    count++;
                }
            }
            resolve(reEmp);
        }
    });
}

module.exports.getDepartments=function (){  //return full array
    return new Promise(function(resolve,reject){
        if(!departments.length){
            reject("no results returned");
        }else{
            resolve(departments);
        }
    });
}

*/

// Create by Xiaochen Wang

var fs = require("fs");

var employess = []; //global array
var departments = []; //global array

module.exports.initialize = function(){
    return new Promise(function(resolve,reject){
        try{
            fs.readFile('./data/employees.json', function(err, data){
                if(err) throw err;
                employess = JSON.parse(data);
            });
            fs.readFile('./data/departments.json', function(err,data){
                if(err) throw err;
                departments = JSON.parse(data);
            });
        }catch(ex){
            reject("Unable to read file!");
        }
        resolve("Good!!! It's successfully read JSON file.");
    });
}
// alternative solution for initialize JSON file:
// module.exports.initialize = function(){
//     return new Promise(function (resolve,reject){
//         fs.readFile('./data/departments.json', function(err,data){
//             if(err){
//                 reject("Can Not Open Employees.json File");
//             }else{
//                 employess = JSON.parse(data);

//                 fs.readFile('./data/employees.json', function(err,data){
//                     if(err){
//                         reject("Can Not Open Department.json File ");
//                     }else{
//                         departments = JSON.parse(data);
//                     }
//                 });
//             }
//         });
//     });
// }

module.exports.getAllEmployees = function(){
    var arryAllEmployees=[];
    return new Promise(function(resolve,reject){
        for (var i = 0; i < employess.length; i++) {
            arryAllEmployees.push(employess[i]);
        }
        if (arryAllEmployees.length == 0){
            reject("No Result Returned!!!");
        }
    resolve(arryAllEmployees);
    })
}

module.exports.getEmployeesByStatus = function(status){
    var arryByStatus = [];
    return new Promise(function(resolve,reject){
        for(let i = 0; i < employess.length; i++){
            if(employess[i].status == status){
                arryByStatus.push(employess[i]);
            }
        }
        if (arryByStatus.length == 0){
            reject("No Result Returned!!!");
        }
        resolve(arryByStatus);
    });
}

module.exports.getEmployeesByDepartment = function(department){
    var arryByDepartment = [];
    return new Promise(function(resolve,reject){
        for(let i = 0; i < employess.length; i++){
            if(employess[i].department == department){
                arryByDepartment.push(employess[i]);
            }
        }
        if(arryByDepartment.length == 0){
            reject("No Result Returned!!!");
        }
    resolve(arryByDepartment);
    });
}

module.exports.getEmployeesByManager = function(manager) {
    var arrayGetEmployeesByMannager = [];

    return new Promise(function(resolve,reject) {
        for (let i = 0; i < employess.length; i++) {
            if (employess[i].employeeManagerNum == manager) {
                arrayGetEmployeesByMannager.push(employess[i]);
            }
        }
        if (arrayGetEmployeesByMannager.length == 0 ) {
            reject("No Result Returned!!!");
        }
    resolve(arrayGetEmployeesByMannager);
    });
}

module.exports.getEmployeeByNum = function(num) {
    return new Promise(function(resolve,reject){
        for(let j = 0; j < employess.length; j++){
            if(employess[j].employeeNum == num){
                resolve(employess[j]);
            }
        }
    reject("No Result Returned!!!");
    });
}

module.exports.getManagers = function() {
    var arryGetManagers = [];
    return new Promise(function(resolve,reject){
        if(employess.length == 0){
            reject("No Result Returned!!!");
        }else{
            for (var q = 0; q < employess.length; q++) {
                 if (employess[q].isManager == true) {
                    arryGetManagers.push(employess[q]);       
                 }
            }
            if (arryGetManagers.length == 0) {
                     reject("No Result Returned!!!");
             }
        }
        resolve(arryGetManagers);
     });
}

module.exports.getDepartments = function() {
    var arryGetDepartments = [];
    return new Promise(function(resolve,reject){
        if(employess.length == 0){
            reject("No Result Returned!!!");
        }else{
            for (var v = 0; v < departments.length; v++) {
                arryGetDepartments.push(departments[v]);       
            }
            if (arryGetDepartments.length == 0) {
                reject("No Result Return!!!");
            }
        }
    resolve(arryGetDepartments);
    });
}