const mongoose= require("mongoose");
const assigndeliverySchema=mongoose.Schema({
    autoId:{ type:Number, default:0},
    orderId:{type: mongoose.Schema.Types.ObjectId,ref:""},
    vendorId:{type: mongoose.Schema.Types.ObjectId,ref:""},
    status:{type:Boolean,default:true},//1-pending,2-delivered,3-cancelled
    created_at:{type:Date,default:Date.now()}

})
module.exports=mongoose.model("assigndelivery",assigndeliverySchema)