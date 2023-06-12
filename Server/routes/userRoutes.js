const express =require("express");

// middlewares
const { requireSignIn, isAdmin } =require("../middlewares/auth.js");
// controllers
const {register, login, updateProfile, RecoverVerifyOTP, RecoverVerifyEmail, RecoverPassword}= require("../Controllers/userController")

const router = express.Router();

router.post("/register", register);
router.post("/login",login)

router.get("/auth-check", requireSignIn, (req, res) => {
    res.json({ ok: true });
});
router.get("/admin-check", requireSignIn, isAdmin, (req, res) => {
    res.json({ ok: true });
});
router.post("/profile", requireSignIn, updateProfile);

router.get("/recoverVarifyEmail/:email",RecoverVerifyEmail);
router.get("/recoverVarifyOTP/:email/:otp",RecoverVerifyOTP);
router.post("/resetPass",RecoverPassword);


module.exports= router;

