
const express = require("express")

const app = express()

app.use(express.json())

const notes = []

app.post("/notes",(req,res)=>{
    console.log(req.body);
    notes.push(req.body);
    res.send("Note added successfully")
})

app.delete("/notes/:index",(req,res)=>{
    console.log(req.params.index);
    delete notes[req.params.index]
    res.send("Note deleted successfully")

})


app.patch("/notes/:index",(req,res)=>{
    const index = req.params.index
    notes[index].description  = req.body.description
    res.send("Note updated successfully")
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})




module.exports = app