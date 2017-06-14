var employees=[];
var departments= [];
const fs=require('fs');


module.exports.initialize=function(){
    var count=1;
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
       fs.readFile('./data/employees.json',(err,data)=>{
           if(err){
            reject("Initialize Error");
        }else{
            employees=JSON.parse(employees);
            count--;
            if(!count){
                 fs.readFile('./data/departments.json');
                 departments=JSON.parse(departments);
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
         if(employees.length==0){
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

module.exports.getEmployeeByNum=function (num){  
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


