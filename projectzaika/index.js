const express = require("express")
const app = express()
const port = 4001
const db= require("./server/config/db")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
var apis= require("./server/routes/apiRoutes")

 app.use("/api",apis)
const seeder= require("./server/config/seeder")
seeder.adminreg()

  app.get("/",(req,res)=>{
    res.send("Welcome to my server")
})


               

app.listen(port,(err)=>{
    if(err){
        console.log("Error in the system",err);
    }
    else{
        console.log("system is running",port);
    }

})
