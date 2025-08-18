const userModel = require("./userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
let secretkey = "123#@"



const login = (req,res)=>{
    var errMsgs = []
    if(!req.body.email){
            errMsgs.push("email is required!!")
    }
    if(!req.body.password){
            errMsgs.push("password is required!!")
    }
    if(errMsgs.length>0){
        res.send({
                    status:422,
                    success:false,
                    message:errMsgs,
                })
    }
    else{
        userModel.findOne({email:req.body.email})
        .populate("")
        .then((userData)=>{
            console.log("userData",userData);
            
            if(userData == null){
                res.send({
                    status:404,
                    success:false,
                    message:"Account not exists",
                  
                })
            }
            else{
                    bcrypt.compare(req.body.password,userData.password,function(err,isMatch){
                            if(!isMatch){
                                res.send({
                                    status:422,
                                    success:false,
                                    message:"password is wrong",
                                  
                                })
                            }
                            else{
                                let payload = {
                                    _id:userData._id,
                                    name:userData.name,
                                    userType:userData.userType,
                                    email:userData.email
                                }
                                let token = jwt.sign(payload,secretkey) 
                                res.send({
                                    status:200,
                                    success:true,
                                    message:"Login successfully!!!",
                                    data:userData,
                                    token:token
                                  
                                })
                            }
                    })
            }

        })
        .catch((err)=>{
            res.send({
                status:500,
                success:false,
                message:"Internel server error",
                errmessages:err
            })
        })
    }
} 
const changePassword = (req,res)=>{
    var errMsgs = []
    if(!req.body.userId){
            errMsgs.push("userId is required!!")
    }
    if(!req.body.oldpassword){
            errMsgs.push("oldpassword is required!!")
    }
    if(!req.body.newpassword){
            errMsgs.push("newpassword is required!!")
    }
    if(!req.body.confirmpassword){
            errMsgs.push("confirmpassword is required!!")
    }
    if(errMsgs.length>0){
        res.send({
                    status:422,
                    success:false,
                    message:errMsgs,
                })
    }
    else{
        if(req.body.newpassword == req.body.confirmpassword){
              userModel.findOne({_id:req.body.userId}) 
              .then((userdata)=>{
                        console.log("userdata",userdata);
                    if(userdata == null){
                        res.send({
                            status:404,
                            success:false,
                            message:"Account not exists",
                          
                        })    
                    }
                    else{
                        bcrypt.compare(req.body.oldpassword,userdata.password,function(err,ismatch){
                            if(!ismatch){
                                res.send({
                                    status:422,
                                    success:false,
                                    message:"old password is wrong",
                                  
                                })     
                            }
                            else{
                                //update password
                                userdata.password =bcrypt.hashSync(req.body.newpassword,10)
                                userdata.save()
                                .then((updatedata)=>{
                                    res.send({
                                        status:200,
                                        success:true,
                                        message:"password updated successfully!",
                                        data:updatedata
                                    })       
                                })
                                .catch((err)=>{
                                    res.send({
                                        status:500,
                                        success:false,
                                        message:"Internel server error",
                                        errmessages:err
                                    })
                                })   
                            }
                        })
                    }
                        
              })
              .catch((err)=>{
                res.send({
                    status:500,
                    success:false,
                    message:"Internel server error",
                    errmessages:err
                })
            })    
        }
        
        else{
            res.send({
                status:422,
                success:false,
                message:"new password is not match with confirm password!!",
            })
        }
    }
}
module.exports = {login,changePassword}