const OTPSModel = require("../../models/OTPSModel")
const {hashPassword} = require("../../helpers/auth");

exports.UserResetPass = async (Request,DataModel)=>{
    let email = Request.body['email'];
    let OTPCode = Request.body['OTP'];
    let NewPass = Request.body['password'];
    let hashedPassword = await hashPassword(NewPass);
    let statusUpdate = 1;

    try {
        let OTPUsedCount = await OTPSModel.aggregate([{$match: {email: email, otp: OTPCode, status: statusUpdate}}, {$count: "total"}])

        if (OTPUsedCount.length>0){
            let PassUpdate = await DataModel.updateOne({email:email},{password: hashedPassword})
            return {status: "success", data: PassUpdate}
        }else {
            return {status: "fail", data: "Invalid Request"}
        }
    }catch (error){
        return {status: "fail", data: error.toString()}
    }
}