var employees=[];
var departments= [];
const fs=require('fs');


function initialize(){
    var count=1;
   
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
       fs.readFile('./data/employees.json',(err,data)=>{
           if(err){
            reject(err);
        }else{
            var employees=JSON.parse(employees);
            count--;
            if(!count){
                 fs.readFile('./data/departments.json');
                 if(employees.lenght||departments.length){
                     reject("unable to read file");
                 }else{
                     resolve();
                 }
            }
        }
       })
    });   
}


function getAllEmployees(){
   return new Promise(function(resolve, reject){
        if(!employees.length){
            reject("no results returned");
        }else{
            resolve(employees);
        }
   });
}


function getEmployeesByStatus(status){  //status is full time
    return new Promise(function(resolve,reject){
         if(!employees.length){
            reject("no results returned");
        }else{
            for(var i=0;i<employees.length;i++){
                if(employees[i].status==status){
                    resolve(employees[i]);
                }else{
                    reject("no results returned");
                }
            }
        }
    });
}


function getEmployeesByDepartment(department){  //department same as parameter(department)
    return new Promise(function(resolve,reject){
         if(!employees.length){
            reject("no results returned");
        }else{
               for(var i=0;i<employees.length;i++){
                if(employees[i].department==department){
                    resolve(employees[i]);
                }else{
                    reject("no results returned");
                }
            }
        }
    });
}

function getEmployeesByManager(manager){  
    return new Promise(function(resolve,reject){
         if(!employees.length){
            reject("no results returned");
        }else{
          for(var i=0;i<employees.length;i++){
                if(employees[i].manager==manager){
                    resolve(employees[i]);
                }else{
                    reject("no results returned");
                }
          }
        }
    });
}

function getEmployeeByNum(num){  
    return new Promise(function(resolve,reject){
         if(!employees.length){
            reject("no results returned");
        }else{
            for(var i=0;i<employees.length;i++){
                if(employees[i].Num==num){
                    resolve(employees[i]);
                }else{
                    reject("no results returned");
                }
            }
        }
    });
}

function getManagers(){  //isManager ==1
    var reEmp=[];
    var i=0;
    return new Promise(function(resolve,reject){
         if(!employees.length){
            reject("no results returned");
        }else{
           for(var i=0;i<employees.length;i++){
                if(employees[i].isManager){
                    reEmp[i]=employees[i];
                    i++;
                }else{
                    reject("no results returned");
                }
            }
            resolve(reEmp);
        }
    });
}

function getDepartments(){  //return full array
    return new Promise(function(resolve,reject){
        if(!departments.length){
            reject("no results returned");
        }else{
            resolve(departments);
        }
    });
}

