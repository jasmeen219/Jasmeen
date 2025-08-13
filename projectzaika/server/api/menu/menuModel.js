const mongoose= require("mongoose");
const menuSchema=mongoose.Schema({
    autoId:{ type:Number, default:0},
    name:{ type:String, default:''},
    description:{ type:String, default:''},
    price:{ type:Number, default:''},
    image:{ type:String, default:''},
    category:{ type:String,default:''},//1-Breakfast,2-Lunch,3-Dinner
    day:{type:String, default:''},//1-Sunday,2-Monday,3-Tuesday,4-Wednesday,5-Thursday,6-Friday,7-Saturday
    status:{ type:Boolean,default:true},
    created_at:{ type:Date,default:Date.now()}

})
module.exports=mongoose.model("menu",menuSchema)
