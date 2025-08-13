const mongoose= require("mongoose");
const vendorSchema=mongoose.Schema({
    autoId:{ type:Number, default:0},
    name:{ type:String, default:''},
    email:{ type:String, default:''},
    password:{ type:String, default:''},
    phonenumber:{ type:String, default:''},
    address:{ type:String, default:''},
    userId:{type: mongoose.Schema.Types.ObjectId,ref:"user"},  //ref from user model
    status:{type:Boolean,default:true},
    created_at:{type:Date,default:Date.now()}

})
module.exports=mongoose.model("vendor",vendorSchema)