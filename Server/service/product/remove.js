exports.remove = async (Request, DataModel) => {
    try {
        const productId = Request.params.productId
        await DataModel.findByIdAndDelete(
            productId
        )
        return { status: "success"};
    } catch (e) {
        return { status: "fail", data: e.toString()};
    }
}