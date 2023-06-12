const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const OrderSchema = new mongoose.Schema({
    user: [{type: ObjectId, ref: 'User'}],
    address: {type: String, required: true},
    payment: {},
    products: [{ type: ObjectId, ref: 'Product' }],
    status: {
        type: String,
        default: "Pending",
        enum: [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
        ],
    },
    totalPrice: {type: Number, required: true},
},{versionKey:false})

const OrderModel = mongoose.model('orders',OrderSchema);
module.exports = OrderModel;