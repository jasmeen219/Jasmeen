const mongoose= require("mongoose");
const orderSchema=mongoose.Schema({
    autoId:{ type:Number, default:0},
    userId:{type: mongoose.Schema.Types.ObjectId,ref:"user"},
    menuitemId:{type: mongoose.Schema.Types.ObjectId,ref:"menu"},
    shipping:{ type:String, default:''},
    address:{ type:String, default:''},
    name:{ type:String, default:''},
    contact:{ type:String, default:''},
    email:{ type:String, default:''},
    total:{ type:Number,default:''},
    status:{ type:Boolean,default:true},//1-Placed,2-Confirmed,3-Shipped,4-Delivered,5-Cancelled
    created_at:{ type:Date,default:Date.now()}

})
module.exports=mongoose.model("order",orderSchema)
