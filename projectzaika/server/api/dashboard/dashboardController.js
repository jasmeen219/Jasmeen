const assigndeliveryModel= require("../assigndelivery/assigndeliveryModel")
const customerModel= require("../customer/customerModel")
const feedbackModel= require("../feedback/feedbackModel")
const menuModel= require("../menu/menuModel")
const orderModel= require("../order/orderModel")
const vendorModel= require("../vendor/vendorModel")

const dashboard= async(req,res)=>{
    var totalassigndeliveries = 0
    var totalcustomers = 0
    var totalfeedbacks = 0
    var totalmenus = 0
    var totalorders = 0
    var totalvendors = 0

await assigndeliveryModel.countDocuments()
.then ((tdel)=>{
    totalAssigndeliveries = tdel
})
await customerModel.countDocuments()
.then ((tcus)=>{
    totalCustomers = tcus
})
await feedbackModel.countDocuments()
.then ((tfee)=>{ 
    totalFeedbacks = tfee
})
await menuModel.countDocuments()
.then ((tmen)=>{
    totalMenus = tmen
})
await orderModel.countDocuments()
.then ((tord)=>{
    totalOrders = tord
})
await vendorModel.countDocuments()
.then ((tven)=>{
    totalVendors = tven
})

 res.send({
        status:200,
        success:true,
        message:"dashboard loaded!!",
        totalassigndeliveries: totalAssigndeliveries,
        totalcustomers: totalCustomers,
        totalfeedbacks: totalFeedbacks,
        totalmenus: totalMenus,
        totalorders: totalOrders,
        totalvendors: totalVendors

    })

}






module.exports={dashboard}