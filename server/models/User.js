const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : false
    },
    confirmPassword : {
        type : String,
        required : false
    },
})

module.exports = mongoose.model("User" , UserSchema)