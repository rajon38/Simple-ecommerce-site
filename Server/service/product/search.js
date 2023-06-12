exports.search = async (Request, DataModel) => {
    try {
        const { keyword } = Request.params;
        const results = await DataModel.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ],
        }).select("-photo");

        return { status: "success", data: results};
    } catch (e) {
        return { status: "fail", data: e.toString()};
    }
}