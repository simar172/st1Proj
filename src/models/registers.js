const mongoose=require("mongoose"); //It will import mongoose model
//It will create new Schema defining which type of data will be added with its variable name
const employeeSchema=new mongoose.Schema({   
 //firstName will be of type String and required:true means the field needs compulsory to be filled,if required:false then the field is not compulsory to be filled
 //unique:true is used to remove duplicacy of data 
    firstName:{
        type:String,
        required:true     
    },
    lastName:{
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    phone:
    {
        type:Number,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
});
//Register will make new object mongoose.model in which all the data will be stored in JSOn
const Register=new mongoose.model("Register",employeeSchema);
//Now we have to export the module Register
module.exports=Register;