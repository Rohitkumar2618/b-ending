const express = require("express")  
const catMe =               require("cat-me")

const app = express()

console.log(catMe())

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})