const DataModel = require("../models/UserModel")
const OTPSModel = require("../models/OTPSModel");
const {registration} = require("../service/user/registration");
const {logIn} = require("../service/user/logIn");
const {update} = require("../service/user/update");
const {UserVerifyEmail} = require("../service/user/UserVerifyEmail");
const {UserVerifyOTP} = require("../service/user/UserVerifyOTP");
const {UserResetPass} = require("../service/user/UserResetPass");

exports.register = async (req, res) => {
    let Result = await registration(req,DataModel)
    res.status(200).json(Result)
};


exports.login = async (req, res) => {
    let Result = await logIn(req,DataModel)
    res.status(200).json(Result)
};


exports.updateProfile = async (req, res) => {
    let Result = await update(req,DataModel)
    res.status(200).json(Result)
};


exports.RecoverVerifyEmail = async (req,res)=>{
    let Result = await UserVerifyEmail(req,DataModel)
    res.status(200).json(Result)
}

exports.RecoverVerifyOTP = async (req,res)=>{
    let Result = await UserVerifyOTP(req,OTPSModel)
    res.status(200).json(Result)
}

exports.RecoverPassword = async (req,res)=>{
    let Result = await UserResetPass(req,DataModel)
    res.status(200).json(Result)
}