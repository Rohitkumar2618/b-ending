const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true, "With this email user is already exists"]

    },
    password:String
})

const userModel =  mongoose.model("users", userSchema)

module.exports = userModel