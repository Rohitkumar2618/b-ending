const express = require("express")
const mongoose = require("mongoose")

const app = express();
app.use(express.json())


const notes = []

// Post
app.post("/notes",(req,res)=>{
    console.log(req.body)

    notes.push(req.body);

    res.status(201).json({
        message:"Note created succesfully"
    })
})

// update

app.patch("/notes/:index",(req,res)=>{

    const index = req.params.index;
    notes[index].description = req.body.description

    res.status(200).json({
         message:"Note Update succesfully"
    })

})

// delete

app.delete("/notes/:index",(req,res)=>{

    const index = req.params.index;
    delete notes[index];

    res.status(200).json({
         message:"Note deleted succesfully"
    })

})

// get
app.get('/notes',(req,res)=>{
    res.json(notes)
})




function conectToDB(){
    mongoose.connect("mongodb+srv://rohitkumarmankar26akrk_db_user:dCVVsJ4mKmS5SIBs@cluster0.lwestzb.mongodb.net/day-6").then(()=>{
        console.log("DB Connected succesfully")
    })
}

conectToDB()


module.exports = app;
