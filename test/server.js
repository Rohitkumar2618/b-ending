const app = require("./src/app")

const connectToDb = require("./src/config/database")

connectToDb()

app.listen(3000,()=>{
    console.log("Server run on port no : 3000")
})

