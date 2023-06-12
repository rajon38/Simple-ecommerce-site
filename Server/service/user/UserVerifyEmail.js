const OTPSModel = require("../../models/OTPSModel")
const SendEmailUtility = require("../../helpers/SendEmailUtility");

exports.UserVerifyEmail = async (Request, DataModel)=>{
    try {
        //email acc query
        let email = Request.params.email;
        let OTPCode = Math.floor(100000 + Math.random() * 900000);

        let UserCount = (await DataModel.aggregate([{$match: {email:email}}, {$count:"total"}]))
        if (UserCount.length>0){
            //OTP
            await OTPSModel.create({email:email, otp: OTPCode});
            //email send
            let SendEmail = await SendEmailUtility(email, "Your PIN Code is="+ OTPCode,"Inventory Pin Verification");
            return {status: "success", data: SendEmail}
        }else {
            return {status: "fail", data: "No User Found"}
        }
    }catch (error){
        return {status: "fail", data: error.toString()}
    }
}