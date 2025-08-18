const router= require("express").Router()
const multer=require("multer")
const storage=multer.memoryStorage()
const upload=multer({storage: storage})
const customerController= require("../api/customer/customerController")

router.post("/customer/add",customerController.add)





// menu
const menuController= require("../api/menu/menuController")
router.post("/menu/add",upload.single("image"),menuController.add),
router.post("/menu/all",menuController.all)
router.post("/menu/single",menuController.single)
router.post("/menu/DeleteSingle",menuController.DeleteSingle)
router.post("/menu/UpdateSingle",menuController.UpdateSingle)

// feedback
const feedbackController= require("../api/feedback/feedbackController")
router.post("/feedback/add",feedbackController.add)
router.post("/feedback/all",feedbackController.all)
router.post("/feedback/single",feedbackController.single)
router.post("/feedback/DeleteSingle",feedbackController.DeleteSingle)
router.post("/feedback/UpdateSingle",feedbackController.UpdateSingle)

// order
const orderController= require("../api/order/orderController")
router.post("/order/add",orderController.add)
router.post("/order/all",orderController.all)
router.post("/order/single",orderController.single)
router.post("/order/DeleteSingle",orderController.DeleteSingle)
router.post("/order/UpdateSingle",orderController.UpdateSingle)

// user
const userController= require("../api/user/userController")
router.post("/user/login",userController.login)
router.post("/user/changepassword",userController.changePassword)

// assigndelivery
const assigndeliveryController= require("../api/assigndelivery/assigndeliveryController")
router.post("/assigndelivery/add",assigndeliveryController.add)
router.post("/assigndelivery/all",assigndeliveryController.all)
router.post("/assigndelivery/single",assigndeliveryController.single)
router.post("/assigndelivery/DeleteSingle",assigndeliveryController.DeleteSingle)
router.post("/assigndelivery/UpdateSingle",assigndeliveryController.UpdateSingle)

// customer
router.post("/customer/all",customerController.all)
router.post("/customer/single",customerController.single)
router.post("/customer/DeleteSingle",customerController.DeleteSingle)
router.post("/customer/UpdateSingle",customerController.UpdateSingle)

// vendor
const vendorController= require("../api/vendor/vendorController")
router.post("/vendor/add",vendorController.add)
router.post("/vendor/all",vendorController.all)
router.post("/vendor/single",vendorController.single)
router.post("/vendor/DeleteSingle",vendorController.DeleteSingle)
router.post("/vendor/UpdateSingle",vendorController.UpdateSingle)

//dashboard
const dashboardController= require("../api/dashboard/dashboardController")
router.post("/dashboard",dashboardController.dashboard)






module.exports = router