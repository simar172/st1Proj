const mongoose = require("mongoose"); //It will import Mongoose Module
//The following code will connect database with frontend
        mongoose.connect("mongodb://localhost:27017/userRegistration", {
        }).then(() => {
            console.log(`connection successful`);
        }).catch((e) => {
            console.log(`connection failed`);
        })
