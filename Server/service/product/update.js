const fs = require("fs");
exports.update = async (Request, DataModel) => {
    try {
        const { title, description, price, quantity, shipping } =
            Request.fields;
        const { photo } = Request.files;

        switch (true) {
            case !title?.trim():
                return {status: "fail", error: "Name is required" };
            case !description?.trim():
                return {status: "fail", error: "Description is required" };
            case !price?.trim():
                return {status: "fail", error: "Price is required" };
            case !quantity?.trim():
                return {status: "fail", error: "Quantity is required" };
            case !shipping?.trim():
                return {status: "fail", error: "Shipping is required" };
            case photo && photo.size > 1000000:
                return {status: "fail", error: "Image should be less than 1mb in size" };
        }



        // update product
        const product = await DataModel.findByIdAndUpdate(
            Request.params.productId,
            {
                ...Request.fields
            },
            { new: true }
        );

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        return { status: "success", data: product};
    } catch (e) {
        return { status: "fail", data: e.toString()};
    }
}