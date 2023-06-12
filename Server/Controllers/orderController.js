const DataModel = require('../models/OrderModel');
const {allOrders} = require("../service/order/allOrders");
const {getOrders} = require("../service/order/getOrders");

exports.allOrders = async (req,res)=>{
    let Result = await allOrders(req,DataModel)
    res.status(200).json(Result)
}


exports.getOrders = async (req,res)=>{
    let Result = await getOrders(req,DataModel)
    res.status(200).json(Result)
}