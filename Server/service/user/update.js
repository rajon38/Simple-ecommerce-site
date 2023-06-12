const {hashPassword} = require("../../helpers/auth");
exports.update = async (Request, DataModel) =>{
    try {
        const { name, password } = Request.body;
        const user = await DataModel.findById(Request.user._id);


        // check password length
        if (password && password.length < 6) {
            return {status: "fail", error: "Password is required and should be min 6 characters long"};
        }
        // hash the password
        const hashedPassword = password ? await hashPassword(password) : undefined;

        const updated = await DataModel.findByIdAndUpdate(
            Request.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password
            },
            { new: true }
        );

        updated.password = undefined;
        return { status: "success", data: updated};
    } catch (e) {
        return { status: "fail", data: e.toString()};
    }
}