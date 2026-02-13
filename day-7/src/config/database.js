const mongoose = require("mongoose")


function connectToDb(){

    mongoose.connect("mongodb+srv://rohitkumarmankar26akrk_db_user:dCVVsJ4mKmS5SIBs@cluster0.lwestzb.mongodb.net/day-7").then(()=>{
        console.log("Connect to DB")
    })

}


module.exports = connectToDb;