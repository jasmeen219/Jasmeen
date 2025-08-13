const orderModel = require("./orderModel")
const { uploadImg } = require("../../utilities/helper")

const add = (req, res) => {
    let errMsgs = []
    if (!req.body.userId) {
        errMsgs.push("userId is required!!")
    }
    if (!req.body.menuitemId) {
        errMsgs.push("menuitemId is required!!")
    }
    if (!req.body.shipping) {
        errMsgs.push("shipping is required!!")
    }
    if (!req.body.address) {
        errMsgs.push("address is required!!")
    }
    if (!req.body.name) {
        errMsgs.push("name is required!!")
    }
    if (!req.body.contact) {
        errMsgs.push("contact is required!!")
    }
    if (!req.body.email) {
        errMsgs.push("email is required!!")
    }
    if (!req.body.total) {
        errMsgs.push("total is required!!")
    }
    if (errMsgs.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: errMsgs
        })
    }
    else {
        let orderobj = new orderModel()
        orderobj.menuitemId = req.body.menuitemId
        orderobj.userId = req.body.userId
        orderobj.shipping = req.body.shipping
        orderobj.address = req.body.address
        orderobj.name = req.body.name
        orderobj.email = req.body.email
        orderobj.contact = req.body.contact
        orderobj.total = req.body.total


        orderobj.save().then((menudata) => {
            res.send({
                status: 200,
                success: true,
                message: "Order created!!",
                data: menudata
            })
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

}

const all = (req, res) => {
    orderModel.find().populate("userId").then((menudata) => {
        if (menudata == null) {
            res.send({
                status: 409,
                success: false,
                message: "Order Not Fount!!"

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
        orderModel.findOne({ _id: req.body._id }).populate("userId").then((result) => {
            if (!result) {
                res.send({
                    success: false,
                    status: 404,
                    message: "Order Not Found",
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
        orderModel.findOne({ _id: req.body._id }).then((result) => {
            if (!result) {
                res.send({
                    success: false,
                    status: 404,
                    message: "Order Not Found",
                })
            } else {
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
        orderModel.findOne({ _id: req.body._id }).then(async (result) => {
            if (!result) {
                res.send({
                    success: false,
                    status: 404,
                    message: "Order Not Found",
                })
            } else {
                if (req.body.orderId) {
                    result.orderId = req.body.orderId
                }
                if (req.body.userId) {
                    result.userId = req.body.userId
                }
                if (req.body.review) {
                    result.review = req.body.review
                }
                if (req.body.rating) {
                    result.rating = req.body.rating
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
