exports.singleProduct = async (Request, DataModel) =>{
    try {
        const userId = Request.params.productId
        const product = await DataModel.findById(userId);
        return { status: "success", data: product};
    } catch (e) {
        return { status: "fail", data: e.toString()};
    }
}