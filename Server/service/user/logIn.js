const {comparePassword} = require("../../helpers/auth");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ThisIsTopSecret"

exports.logIn = async (Request, DataModel) => {
    try {
        // 1. destructure name, email, password from req.body
        const { email, password } = Request.body;
        // 2. all fields require validation
        if (!email) {
            return {status: "fail", error: "Email is required" };
        }
        if (!password || password.length < 6) {
            return {status: "fail", error: "Password must be at least 6 characters long" };
        }
        // 3. check if email is taken
        const user = await DataModel.findOne({ email });
        if (!user) {
            return {status: "fail", error: "User not found" };
        }
        // 4. compare password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return {status: "fail", error: "Invalid email or password" };
        }
        // 5. create signed jwt
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: "7d",
        });
        // 7. send response
        return {
            status: "success",
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            },
            token,
        };
    } catch (e) {
        return { status: "fail", data: e.toString()};
    }
}