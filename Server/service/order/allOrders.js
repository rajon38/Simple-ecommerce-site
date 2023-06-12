exports.allOrders = async (Request, DataModel) => {
    try {
        const orders = await DataModel.find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: "-1" });
        return { status: "success", data: orders};
    } catch (e) {
        return { status: "fail", data: e.toString()};
    }
};