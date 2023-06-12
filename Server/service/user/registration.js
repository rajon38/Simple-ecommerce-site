const {hashPassword} = require("../../helpers/auth");
exports.registration = async (Request,DataModel)=>{
    try {
        // 1. destructure name, email, password from req.body
        const { name, email, password } = Request.body;
        // 2. all fields require validation
        if (!name.trim()) {
            return {status: "fail", error: "Name is required" };
        }
        if (!email) {
            return { status: "fail", error: "Email is required" };
        }
        if (!password || password.length < 6) {
            return { status: "fail", error: "Password must be at least 6 characters long" };
        }
        // 3. check if email is taken
        const existingUser = await DataModel.findOne({ email });
        if (existingUser) {
            return { status: "fail", error: "Email is taken" };
        }
        // 4. hash password
        const hashedPassword = await hashPassword(password);
        // 5. register user
        const user = await new DataModel({
            name,
            email,
            password: hashedPassword,
        }).save();
        // 7. send response
        return {
            status: "success",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            }
        };
    } catch (e) {
        return { status: "fail", data: e.toString()};
    }
}