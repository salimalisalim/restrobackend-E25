const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        reuired:true,
        minLength:[3, "Full name should have at least 3 characters!"],
        maxLength:[20, "Full name shouldn't exceed 20 characters!"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail, "Please enter a valid email"]
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('user', userSchema);
