const mongoose = require("mongoose");


// connect db
// mongoose.connect("mongodb+srv://jasmeen2127:jazz2109@node.ydtf39p.mongodb.net/zaikazest")
mongoose.connect("mongodb://127.0.0.1:27017/zaikazest")
.then(() => {
    console.log("Database Connected");    
})
.catch((err) => {
    console.log("Error in database", err);
})