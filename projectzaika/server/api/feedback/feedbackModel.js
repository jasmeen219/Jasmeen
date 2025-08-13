const mongoose= require("mongoose");
const feedbackSchema=mongoose.Schema({
    // userId:{type: mongoose.Schema.Types.ObjectId,ref:""},  //ref from user model
    // orderId:{type: mongoose.Schema.Types.ObjectId,ref:"order"},
    autoId:{ type:Number, default:0},
    userId:{type: String, default:''},
    orderId:{type: String, default:''},
    review:{type: String, default:''},
    rating:{type: String, default:''},
    status:{ type:Boolean,default:true},
    created_at:{ type:Date,default:Date.now()}

})
module.exports=mongoose.model("feedback",feedbackSchema)
