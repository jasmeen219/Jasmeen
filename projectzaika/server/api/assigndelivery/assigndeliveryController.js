const assigndeliveryModel = require("./assigndeliveryModel")
const { uploadImg } = require("../../utilities/helper")

const add = (req, res) => {
    let errMsgs = []
    if (!req.body.orderId) {
        errMsgs.push("orderId is required!!")
    }
    if (!req.body.vendorId) {
        errMsgs.push("vendorId is required!!")
    }
    if (errMsgs.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: errMsgs
        })
    }
    else {
        let assigndeliveryobj = new assigndeliveryModel()
        assigndeliveryobj.orderId = req.body.orderId
        assigndeliveryobj.vendorId = req.body.vendorId
       


        assigndeliveryobj.save().then((orderdata) => {
            res.send({
                status: 200,
                success: true,
                message: "Delivery assigned!!",
                data: orderdata
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
    assigndeliveryModel.find().populate("userId").then((orderdata) => {
        if (orderdata == null) {
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
                data: orderdata
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
        assigndeliveryModel.findOne({ _id: req.body._id }).populate("userId").then((result) => {
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
        assigndeliveryModel.findOne({ _id: req.body._id }).then((result) => {
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
        assigndeliveryModel.findOne({ _id: req.body._id }).then(async (result) => {
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
