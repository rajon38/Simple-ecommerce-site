exports.allProducts = async (Request,DataModel) => {
    try {
        const products = await DataModel.find()
            .select("-photo")
            .sort({ createdAt: -1 });

        return { status: "success", data: products};
    } catch (e) {
        return { status: "fail", data: e.toString()};
    }
}