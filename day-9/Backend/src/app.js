const express = require("express");
const noteModel = require("./Models/notes.models");
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors())

app.post("/api/notes",async (req,res)=>{

    const {title,description} = req.body;
    const note = await  noteModel.create({
        title,description
    })
  
    res.status(201).json({
        message:"Note created Successfully",
        note
    })

})

app.patch("/api/notes/:id" , async (req,res)=>{
    
    const id = req.params.id;

    const {description} = req.body

    await noteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        message:"Data updated Successfully"
    })


})

app.delete("/api/notes/:id",async(req,res)=>{

    const id = req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
      message:"Note Deleted Successfully"
    })
    

})

app.use("*name",(req,res)=>{
    res.send("Page not found")
})

app.get("/api/notes",async (req,res)=>{
    const notes = await  noteModel.find()
    res.status(200).json({
        message:"Data  Retrived",
        notes
    })

})




module.exports = app;