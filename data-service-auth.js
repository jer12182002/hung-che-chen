const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
let Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var userSchema = new Schema({
    "user": {type: String, unique: true},
    "password": String
});
var Comment; // to be defined on new connection (see initialize)

var dbURI = "mongodb://ucholoev:2423645Ular_@ds049486.mlab.com:49486/web322_a7"

module.exports.initialize = () => {
    console.log("step 1 initialize!")
    console.log("\n")
    return new Promise((resolve, reject) => {
        let db = mongoose.createConnection(dbURI);
        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            Comment = db.model("users", userSchema);
            resolve("MongoDB good");
        });
    });
};

module.exports.registerUser = (userData) => {
    console.log("register User!!")
    return new Promise((resolve, reject) => {
        if (userData.password != userData.password2) {
            reject("Passwords do not match.");
        } else {
        let newUser = new Comment(userData);
        newUser.save((err) => {
            resolve();
        }).catch((err) => {
            if (err) {
                if (err.code == 11000) {
                    reject("User Name already taken");
                } else {
                    reject("There was an error creating the user: ${user}");
                }
            }
            
        });
    }});
}

module.exports.checkUser = (userData) =>{
    console.log("check user !!!")
    return new Promise((resolve, reject) => {
        Comment.find({user: userData.user}).exec().then((user) => {
        console.log(("Sucess!!!!!!" + user));
        if (user == null) {
            reject('Can not find user: ' + userData.user);
        } else if (user[0].password != userData.password) {
            reject('Incorrect Password: ' + user[0].user );
        }
        resolve();
        }).catch((err) => {
            reject("Can not find user: " + userData.user);
        });
    });
};