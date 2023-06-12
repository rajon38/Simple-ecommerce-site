exports.listProduct = async (Request, DataModel) =>{
    try {
        const perPage = 12;
        const page = Request.params.page ? Request.params.page : 1;

        const products = await DataModel.find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });

        return { status: "success", data: products};
    } catch (e) {
        return { status: "fail", data: e.toString()};
    }
}