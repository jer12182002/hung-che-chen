// const mongoose = require('mongoose');
// const chalk = require('chalk');
// let Schema = mongoose.Schema;

// mongoose.Promise = global.Promise;

// var userSchema = new Schema({
//     "user": {type: String, unique: true},
//     "password": String
// });
// var Comment; // to be defined on new connection (see initialize)
// //TODO: here need MongoDBURI:

// var dbURI = "mongodb://hchen224:20028121reJ!@ds051903.mlab.com:51903/web322_a7"
// //
// module.exports.initialize = () => {
//     console.log("============================================");
//     console.log("===                                      ===");
//     console.log("===    MongoDB for auth initialize       ===");
//     console.log("===                                      ===");
//     console.log("============================================");
//     console.log("\n")
//     console.log(">>> DB dbURI: " + dbURI + " <<<");
//     console.log("\n")
//     return new Promise((resolve, reject) => {
//         let db = mongoose.createConnection(dbURI);
//         db.on('error', (err) => {
//             reject(err); // reject the promise with the provided error
//         });
//         db.once('open', () => {
//             Comment = db.model("users", userSchema);
//             resolve("Secess initialize MongoDB");
//         });
//     });
// };

// module.exports.registerUser = (userData) => {
//     console.log("============================================");
//     console.log("===                                      ===");
//     console.log("===           registerUser Function      ===");
//     console.log("===                                      ===");
//     console.log("============================================");
//     console.log("\n");
//     return new Promise((resolve, reject) => {
//         if (userData.password != userData.password2) {
//             reject("Passwords do not match.");
//         } else {
//         let newUser = new Comment(userData);
//         newUser.save((err) => {
//             console.log(chalk.blue("===   Object is saving in the database.  ==="));
//             console.log(chalk.blue("============================================"));
//             console.log(userData);
//             console.log(chalk.blue("============================================"));
//             console.log(chalk.blue("This is User object id from userSchema: " + newUser._id));
//             resolve();
//         }).catch((err) => {
//             if (err) {
//                 if (err.code == 11000) {
//                     reject("User Name already taken");
//                 } else {
//                     reject("There was an error creating the user: ${user}");
//                 }
//             }
//             // reject("There was an error creating the user222222");
//         });
//     }});
// }

// module.exports.checkUser = (userData) =>{
//     console.log(chalk.blue("============================================="));
//     console.log(chalk.blue("===                                       ==="));
//     console.log(chalk.blue("===     This is checkUser function        ==="));
//     console.log(chalk.blue("===                                       ==="));
//     console.log(chalk.blue("============================================="));
//     console.log(">>> userName: " + chalk.green(userData.user) + " <<<");
//     return new Promise((resolve, reject) => {
//         Comment.find({user: userData.user}).exec().then((user) => {
//         console.log(chalk.bgCyan("Sucess!!!!!!" + user));
//         if (user == null) {
//             reject('Unable to find user: ' + userData.user);
//         } else if (user[0].password != userData.password) {
//             reject('Incorrect Password for user: ' + user[0].user);
//         }
//         resolve();
//         }).catch((err) => {
//             console.log(chalk.bgCyan("There is Error"));
//             reject("Unable to find user: " + userData.user);
//         });
//     });
// };
const mongoose = require('mongoose');
const chalk = require('chalk');
let Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var userSchema = new Schema({
    "user": {type: String, unique: true},
    "password": String
});
var Comment; // to be defined on new connection (see initialize)

var dbURI = "mongodb://ucholoev:2423645Ular_@ds049486.mlab.com:49486/web322_a7"

module.exports.initialize = () => {
    console.log("============================================");
    console.log("===                                      ===");
    console.log("===    MongoDB for auth initialize       ===");
    console.log("===                                      ===");
    console.log("============================================");
    console.log("\n")
    console.log(">>> DB dbURI: " + dbURI + " <<<");
    console.log("\n")
    return new Promise((resolve, reject) => {
        let db = mongoose.createConnection(dbURI);
        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            Comment = db.model("users", userSchema);
            console.log(chalk.bgCyan("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n"));
            resolve("Secess initialize MongoDB");
        });
    });
};

module.exports.registerUser = (userData) => {
    console.log("============================================");
    console.log("===                                      ===");
    console.log("===           registerUser Function      ===");
    console.log("===                                      ===");
    console.log("============================================");
    console.log("\n");
    return new Promise((resolve, reject) => {
        if (userData.password != userData.password2) {
            reject("Passwords do not match.");
        } else {
        let newUser = new Comment(userData);
        newUser.save((err) => {
            console.log(chalk.blue("===   Object is saving in the database.  ==="));
            console.log(chalk.blue("============================================"));
            console.log(userData);
            console.log(chalk.blue("============================================"));
            console.log(chalk.blue("This is User object id from userSchema: " + newUser._id));
            resolve();
        }).catch((err) => {
            if (err) {
                if (err.code == 11000) {
                    reject("User Name already taken");
                } else {
                    reject("There was an error creating the user: ${user}");
                }
            }
            // reject("There was an error creating the user222222");
        });
    }});
}

module.exports.checkUser = (userData) =>{
    console.log(chalk.blue("============================================="));
    console.log(chalk.blue("===                                       ==="));
    console.log(chalk.blue("===     This is checkUser function        ==="));
    console.log(chalk.blue("===                                       ==="));
    console.log(chalk.blue("============================================="));
    console.log(">>> userName: " + chalk.green(userData.user) + " <<<");
    return new Promise((resolve, reject) => {
        Comment.find({user: userData.user}).exec().then((user) => {
        console.log(chalk.bgCyan("Sucess!!!!!!" + user));
        if (user == null) {
            reject('Unable to find user: ' + userData.user);
        } else if (user[0].password != userData.password) {
            reject('Incorrect Password for user: ' + '<strong>'+ user[0].user +'</strong>');
        }
        resolve();
        }).catch((err) => {
            console.log(chalk.bgCyan("There is Error"));
            reject("Unable to find user: " + userData.user);
        });
    });
};