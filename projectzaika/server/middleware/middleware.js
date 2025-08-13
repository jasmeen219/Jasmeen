const jwt = require("jsonwebtoken")
let secretkey = "219"
module.exports = (req,res,next)=>{
        let token = req.headers["authorization"];
        jwt.verify(token,secretkey,function(err,data){
            if(err != null){
                    res.json({
                        status:422,
                        success:false,
                        message:"unauthorized access!!"
                    })

            }
            else{
                req.decoded = data;
                next();
            }
        })
}