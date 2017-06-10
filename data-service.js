var employees=[];
var departments= [];



function initialize(){
    var count=1;
   const fs=require('fs');
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
       fs.readFile('./data/employees.json',(err,data)=>{
           if(err){
            reject("rejected!!");
        }else{
            var employees=JSON.parse(employees);
            count--;
            if(!count){
                var departments=JSON.parse(departments);
                 resolve();
            }
           
        }
       })
    });   
}
