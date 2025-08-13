const menuModel = require("./menuModel")
const { uploadImg } = require("../../utilities/helper")

const add = (req, res) => {
    let errMsgs = []
    if (!req.body.name) {
        errMsgs.push("name is required!!")
    }
    if (!req.body.description) {
        errMsgs.push("description is required!!")
    }
    if (!req.file) {
        errMsgs.push("image is required!!")
    }
    if (!req.body.category) {
        errMsgs.push("category is required!!")
    }
    
    if (!req.body.day) {
        errMsgs.push("day is required!!")
    }
    
    if (!req.body.price) {
        errMsgs.push("price is required!!")
    }
    

    if (errMsgs.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: errMsgs
        })
    }
    else {


        menuModel.findOne({name:req.body.name})
            .then(async (menudatafind) => {

                if (!menudatafind) {

                    let menuObj = new menuModel()
                    menuObj.name = req.body.name
                    menuObj.description = req.body.description
                    menuObj.price = req.body.price
                    menuObj.day = req.body.day
                    menuObj.category = req.body.category
                   
                    if (req.file) {
                        try {
                            let url = await uploadImg(req.file.buffer)
                            menuObj.image = url
                        }
                        catch (err) {
                            res.send({
                                status: 400,
                                success: false,
                                message: "cloudnairy error!!"
                            })


                        }
                    }

                    menuObj.save().then((menudata) => {
                        res.send({
                            status: 200,
                            success: true,
                            message: "Menu Item inserted!!",
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
                else {
                    res.send({
                        status: 422,
                        success: false,
                        message: "Menu Item already exists!!",
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

}

const all = (req, res) => {
    menuModel.find().then((menudata) => {
       if(menudata==null){
           res.send({
               status: 409,
               success: false,
               message: "Data Not Fount!!"
             
           })
       }
       else{
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
        menuModel.findOne({ _id: req.body._id }).then((result) => {
            if (!result) {
                res.send({
                    success: false,
                    status: 404,
                    message: "Menu Item Not Found",
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
        menuModel.findOne({ _id: req.body._id }).then((result) => {
            if (!result) {
                res.send({
                    success: false,
                    status: 404,
                    message: "Menu Item Not Found",
                })
            } else {
                result.status=!result.status

                result.save()
                .then((savedResult)=>{
                    res.send({
                        success: true,
                        status: 200,
                        message: "Data Loaded",
                        data: savedResult
                    })
                })
               .catch(()=>{
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
        menuModel.findOne({ _id: req.body._id }).then(async(result) => {
            if (!result) {
                res.send({
                    success: false,
                    status: 404,
                    message: "Menu Item Not Found",
                })
            } else {
                if (req.body.name) {
                    result.name = req.body.name
                }
                if (req.body.description) {
                    result.description = req.body.description
                }
                if (req.body.price) {
                    result.price = req.body.price
                }
                if (req.body.category) {
                    result.category = req.body.category
                }
                if (req.file) {
                    try {
                        let url = await uploadImg(req.file.buffer)
                        result.image = url
                    }
                    catch (err) {
                        res.send({
                            status: 400,
                            success: false,
                            message: "cloudnairy error!!"
                        })


                    }
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