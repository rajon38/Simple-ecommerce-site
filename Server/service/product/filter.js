exports.filter = async (Request, DataModel) => {
        try {
            const { radio } = Request.body;

            let args = {};
            if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
            console.log("args => ", args);

            const products = await DataModel.find(args);
            console.log("filtered products query => ", products.length);
            return { status: "success", data: products};
        } catch (e) {
            return { status: "fail", data: e.toString()};
        }
    };
