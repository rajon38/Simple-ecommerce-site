exports.related = async (Request, DataModel) =>{
    try {
        const { productId } = Request.params;

        const related = await DataModel.find({
            _id: { $ne: productId },
        })
            .select("-photo")
            .populate("price")
            .limit(3);

        return { status: "success", data: related};
    } catch (e) {
        return { status: "fail", data: e.toString()};
    }
}