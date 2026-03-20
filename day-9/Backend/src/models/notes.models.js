const mongoose = require("mongoose");


const noteSchema = mongoose.Schema({
    title:String,
    description:String
})


const noteModel = mongoose.model("notess",noteSchema);


module.exports = noteModel