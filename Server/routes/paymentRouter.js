const express =require("express");

const { requireSignIn, isAdmin } =require("../middlewares/auth.js");
const {processPayment,orderStatus,getToken}= require('../service/payment/processPayment')
const router = express.Router();


router.get("/braintree/token", getToken);
router.post("/braintree/payment", requireSignIn, processPayment);
router.post("/order-status/:orderId", requireSignIn, isAdmin, orderStatus);

module.exports= router;