const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const chalk = require('chalk');
let Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var userSchema = new Schema({
    "user": {type: String, unique: true},
    "password": String
});
var Comment; // to be defined on new connection (see initialize)

var dbURI = "mongodb://web322_18:hchen224@ds051903.mlab.com:51903/web322_a7";

module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        let db = mongoose.createConnection(dbURI);
        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            Comment = db.model("users", userSchema);
            Comment.remove({ }, function (err) { });
            resolve("Secess initialize MongoDB");
        });
    });
};

module.exports.registerUser = (userData) => {
    return new Promise((resolve, reject) => {
        if (userData.password != userData.password2) {
            reject("Passwords do not match.");
        } else {
            let newUser = new Comment(userData);
             bcrypt.genSalt(10, function(err, salt) { // Generate a "salt" using 10 rounds
                if (err) {
                    reject("There was an error encrypting the password");
                }
                bcrypt.hash(userData.password, salt, function(err, hash) { // encrypt the password: "myPassword123"
                    // TODO: Store the resulting "hash" value in the DB
                    console.log(chalk.yellow(hash));
                    newUser.password = hash;
                    console.log(chalk.red(newUser));
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
            // reject("There was an error creating the user222222");
                    });
                });
             });
        }});
    }

module.exports.checkUser = (userData) =>{
    console.log(">>> userName: " + chalk.green(userData.user) + " <<<");
    console.log(">>> userName: " + chalk.green(userData.password) + " <<<");

    return new Promise((resolve, reject) => {
        Comment.find({user: userData.user}).exec().then((user) => {
        console.log(chalk.bgCyan("Sucess!!!!!!" + user));
        if (user == null) {
            reject('Unable to find user: ' + userData.user);
        } else {
           hash = user[0].password;

            bcrypt.compare(user[0].password, hash).then((res) => {
                res === true; //if it matches and res === false if it does not match
                console.log(chalk.bgCyan(hash));
                resolve();
            });

            bcrypt.compare(user[0].password, hash).then((res) => {
                res === false; 
                reject("Unable to find user: " + userData.user);
            });
        }
        }).catch((err) => {
            console.log(chalk.bgCyan("There is Error"));
            reject("Unable to find user: " + userData.user);
        });
    });
};

module.exports.updatePassword = (userData) => {
    return new Promise((resolve, reject) => {
        Comment.update({ user: userData.user },
        { $set: { password: hash } },
        { multi: false }).exec().then((res) => {
            resolve();
        }).catch((err) => {
            reject("There was an error updating the password for " + userData.user);
        });
    });
};