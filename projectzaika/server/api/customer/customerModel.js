const mongoose= require("mongoose");
const customerSchema=mongoose.Schema({
    autoId:{ type:Number, default:''},
    name:{ type:String, default:''},
    email:{ type:String, default:''},
    meals:{ type:String, default:''},
    price:{ type:String, default:''},
    mealdate:{ type:String, default:''},
    deliveryaddress:{ type:String, default:''},
    userId:{type: mongoose.Schema.Types.ObjectId,ref:"user"},   //ref from user model
    status:{type:Boolean,default:true},
    created_at:{type:Date,default:Date.now()}
})
module.exports=mongoose.model("customer",customerSchema)