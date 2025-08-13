const vendorModel = require("./vendorModel")
const userModel= require("../user/userModel")
const bcrypt = require("bcrypt")
const { uploadImg } = require("../../utilities/helper")

const add = (req, res) => {
    var errMsgs = [];
    if (!req.body.name) {
        errMsgs.push("name is required!!")
    }
    if (!req.body.email) {
        errMsgs.push("email is required!!")
    }
    if (!req.body.password) {
        errMsgs.push("password is required!!")
    }
    if (!req.body.phonenumber) {
        errMsgs.push("phonenumber is required!!")
    }
    if (!req.body.address) {
        errMsgs.push("address is required!!")
    }
    if (errMsgs.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: errMsgs,

        })

    }
    else {
        //logic
        userModel.findOne({ email: req.body.email })
            .then((userdata) => {
                if (userdata == null) {
                    //register 
                    let userObj = new userModel()
                    userObj.name = req.body.name
                    userObj.email = req.body.email
                    userObj.password = bcrypt.hashSync(req.body.password, 10)
                    userObj.userType = 3
                    userObj.save()
                    .then((usersaved)=>{

                        let vendorObj= new vendorModel()
                        vendorObj.name= req.body.name
                        vendorObj.email= req.body.email
                        vendorObj.password= req.body.password
                        vendorObj.phonenumber= req.body.phonenumber
                        vendorObj.address= req.body.address
                        vendorObj.userId= usersaved._id
                        vendorObj.save().then((vendorsaved)=>{
                            res.send({
                                status:200,
                                success: true,
                                message: "Customer Saved!!",
                                data:vendorsaved
                            })

                        })
                        .catch((err) => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "InternelA server error!!",
                                errMsg: err

                            })
                        })

                        

                    }).catch((err) => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "InternelB server error!!",
                                errMsg: err

                            })
                        })

                }
                else {
                    res.send({
                        status: 422,
                        success: false,
                        message: "user already exists with same email!!!"
                    })
                }

            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "InternelC server error!!",
                    errMsg: err

                })
            })
    }
}


const all = (req, res) => {
    vendorModel.find().populate("userId").then((menudata) => {
        if (menudata == null) {
            res.send({
                status: 409,
                success: false,
                message: "Customer Not Fount!!"

            })
        }
        else {
            res.send({
                status: 200,
                success: true,
                message: "Data inserted!!",
                data: menudata
            })
        }
    })
        .catch((err) => {
            res.send({
                status: 500,
                success: false,
                message: "Internel server error",
                errmessages: err
            })
        })


}

const single = (req, res) => {
    let validation = ""

    if (!req.body._id) {
        validation += "_id is required. "
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 402,
            message: validation,
        })
    }
    else {
        vendorModel.findOne({ _id: req.body._id }).populate("userId").then((result) => {
            if (!result) {
                res.send({
                    success: false,
                    status: 404,
                    message: "Customer Not Found",
                })
            } else {
                res.send({
                    success: true,
                    status: 200,
                    message: "Data Loaded",
                    data: result
                })
            }

        }).catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: err.message
            })
        })
    }
}

const DeleteSingle = (req, res) => {
    let validation = ""

    if (!req.body._id) {
        validation += "_id is required. "
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 402,
            message: validation,
        })
    }
    else {
        vendorModel.findOne({ _id: req.body._id })
        .then((result) => {
            
            if (!result) {
                res.send({
                    success: false,
                    status: 404,
                    message: "Customer Not Found",
                })
            } else {
                userModel.findOne({_id: result.userId})
                .then((user)=>{
                  
                if(user==null){
                    // user not found
                }
                else{
                    user.status=!user.status
                    user.save()

                     result.status = !result.status

                result.save()
                    .then((savedResult) => {
                        res.send({
                            success: true,
                            status: 200,
                            message: "Data Loaded",
                            data: savedResult
                        })
                    })
                    .catch(() => {
                        res.send({
                            success: false,
                            status: 409,
                            message: "Data not Loaded"
                        })
                    })
                }

               }).catch(()=>{

               })


            }

        }).catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: err.message
            })
        })
    }
}

const UpdateSingle = (req, res) => {
    let validation = ""

    if (!req.body._id) {
        validation += "_id is required. "
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 402,
            message: validation,
        })
    }
    else {
        vendorModel.findOne({ _id: req.body._id }).then(async (result) => {
            if (!result) {
                res.send({
                    success: false,
                    status: 404,
                    message: "Customer Details Not Found",
                })
            } else {
                if (req.body.name) {
                    result.name = req.body.name
                }
                if (req.body.meals) {
                    result.meals = req.body.meals
                }
                if (req.body.mealdate) {
                    result.mealdate = req.body.mealdate
                }
                if (req.body.deliveryaddress) {
                    result.deliveryaddress = req.body.deliveryaddress
                }

                result.save()
                    .then((savedResult) => {
                        res.send({
                            success: true,
                            status: 200,
                            message: "Data Loaded",
                            data: savedResult
                        })
                    })
                    .catch(() => {
                        res.send({
                            success: false,
                            status: 409,
                            message: "Data not Loaded"
                        })
                    })


            }

        }).catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: err.message
            })
        })
    }
}



module.exports = {
    add,all,single,DeleteSingle,UpdateSingle
}
