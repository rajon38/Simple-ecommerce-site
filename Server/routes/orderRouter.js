const express =require("express");

const { requireSignIn, isAdmin } =require("../middlewares/auth.js");
const {getOrders,allOrders}=require('../Controllers/orderController');
const router = express.Router();



router.get("/orders", requireSignIn, getOrders);
router.get("/allOrders", requireSignIn, isAdmin, allOrders);

module.exports = router;