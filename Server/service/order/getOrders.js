exports.getOrders = async (Request, DataModel) => {
    try {
        const orders = await DataModel.find({ buyer: Request.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        return { status: "success", data: orders};
    } catch (e) {
        return { status: "fail", data: e.toString()};
    }
};