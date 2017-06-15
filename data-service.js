var employees=[];
var departments= [];
const fs=require('fs');


module.exports.initialize = function(){
    var errCount=0;
    return new Promise((resolve,reject)=>{
        try{
            fs.readFile('./data/employees.json',(err, data)=>{
               if(!err){ 
                    employess = JSON.parse(data);
                }else{
                    throw err;
                }
            });

            fs.readFile('./data/departments.json',(err,data)=>{
                if(!err){
                     departments = JSON.parse(data);
                }else{
                    throw err;
                }   
                
            });
        }catch(err){
            reject("Can't read file!");
        }
        //console.log("!@@@@@@= "+departments.length);
        resolve("Read file successfullly!");
    });
}

module.exports.getAllEmployees = function(){
       return new Promise(function(resolve,reject){
           if (employees.length == 0){
              // console.log(employees.lenth);
            reject("no results returned!!!");
        }
        resolve(employees);
    })
}

module.exports.getEmployeesByStatus=function(status){  //status is full time
    var statusArr=[];
    var count=0;
    return new Promise(function(resolve,reject){
         if(!employees.length){
           reject("no results returned");
        }else{
            for (var i = 0; i < employess.length; i++) {
                 if (employess[i].status==status) {
                    statusArr.push(employess[i]);    
                    count++;   
                 }
            }
            if (!count) {
                     reject("no results returned");
             }
        }
        resolve(statusArr);
     });
}



module.exports.getEmployeesByDepartment=function (department){  //department same as parameter(department)
    var deptArr=[];
    var count=0;
    return new Promise(function(resolve,reject){
         if(!employees.length){
            reject("no results returned");
        }else{
            for (var i = 0; i < employess.length; i++) {
                 if (employess[i].department==department) {
                    deptArr.push(employess[i]);    
                    count++;   
                 }
            }
            if (!count) {
                     reject("no results returned");
             }
        }
        resolve(deptArr);
     });
}

module.exports.getEmployeesByManager=function(manager){  
   var manaArr=[];
   var count=0;
    return new Promise(function(resolve,reject){
         if(employees.length==0){
            reject("no results returned");
        }else{
            for (var i = 0; i < employess.length; i++) {
                 if (employess[i].employeeManagerNum==manager) {
                    manaArr.push(employess[i]);    
                    count++;   
                 }
            }
            if (!count) {
                     reject("no results returned");
             }
        }
        resolve(manaArr);
     });
}

module.exports.getEmployeeByNum=function (num){  
    var numArr=[];
    var count=0;
    return new Promise(function(resolve,reject){
         if(!employees.length){
            reject("no results returned");
        }else{
            for (var i = 0; i < employess.length; i++) {
                 if (employess[i].employeeNum==num) {
                    numArr.push(employess[i]);    
                    count++;   
                 }
            }
            if (!count) {
                     reject("no results returned");
             }
        }
        resolve(numArr);
     });
}





module.exports.getManagers = function() {
    var empArr = [];
    var count=0;
    return new Promise(function(resolve,reject){
        if(employess.length == 0){
           reject("no results returned");
        }else{
            for (var i = 0; i < employess.length; i++) {
                 if (employess[i].isManager) {
                    empArr.push(employess[i]);    
                    count++;   
                 }
            }
            if (!count) {
                     reject("no results returned");
             }
        }
        resolve(empArr);
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


