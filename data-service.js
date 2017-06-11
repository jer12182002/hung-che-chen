var employees=[];
var departments= [];
const fs=require('fs');


function initialize(){
    var count=1;
   
    return new Promise(function(resolve, reject){ // place our code inside a "Promise" function
       fs.readFile('./data/employees.json',(err,data)=>{
           if(err){
            reject("rejected!!");
        }else{
            var employees=JSON.parse(employees);
            count--;
            if(!count){
                 fs.readFile('./data/departments.json');
                 if(employees.lenght||departments.length){
                     reject("no results returned");
                 }else{
                     resolve();
                 }
            }
        }
       })
    });   
}


function getAllEmployees(){
    initialize().catch(function(reason){
        console.log(reason);
    })
    

}