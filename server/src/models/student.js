const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    firstname : {
        type:String,
        // required:true,
        // minlength:3
    },
    lastname : {
        type:String,
        // required:true,
        // minlength:3
    },
   email : {
        type:String,
        required:true,
        unique:true,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("Invalid Email");
        //     }
        // }
    },
    country:{
        type:String,
    },
    state:{
        type:String,
    },
    city:{
        type:String,
    },
    gender:{
        type:String,
    },
    dob: {
        type:String,
    },
    age: {
        type:String,
    }
})


const Student = new mongoose.model('Student', studentSchema);

module.exports = Student;
