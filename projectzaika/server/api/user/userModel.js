const mongoose= require("mongoose")
const userSchema = new mongoose.Schema({
    autoId:{ type:Number, default:0},
    name:{type:String,default:""},
    email:{type:String,default:""},
    password:{type:String,default:""},
    userType:{type:Number,default:3},//1-admin,2-customer,3-vendor/delivery
    status:{type:Boolean,default:true},
    created_at:{type:Date,default:Date.now()}

})

module.exports = new mongoose.model("user",userSchema)