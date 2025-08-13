const userModel = require("../api/user/userModel")
const bcrypt = require("bcrypt")
const adminreg = ()=>{
        userModel.findOne({email:"jasmeenk@gmail.com"})
        .then((userdata)=>{
                    if(userdata == null){
                            let userObj = new userModel()
                            userObj.name = "Jasmeen"
                            userObj.email ="jasmeenk@gmail.com"
                            userObj.password = bcrypt.hashSync("219",10)
                            userObj.userType = 1
                        userObj.save()
                            .then((admindata)=>{
                                        console.log("admin added successfully!!");
                                        
                            })
                            .catch((err)=>{
                                    console.log("Internel server error",err);

                            })
                    }
                    else{
                        console.log("admin already added!!");
                        
                    }
        })
        .catch((err)=>{
                console.log("Internel server error",err);
                
        })
}

module.exports = {adminreg}