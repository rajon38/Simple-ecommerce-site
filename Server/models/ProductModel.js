const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 160,},
    description: {
        type: String,
        required: true,
        maxlength: 2000,},
    price: {
        type: Number,
        trim: true,
        required: true,},
    photo: {
        data: Buffer,
        contentType: String},
    quantity: {type: Number, required:true},
    sold: {
        type: Number,
        default: 0,
    },
    shipping: {
        required: false,
        type: Boolean,
    },
},{timestamps: true, versionKey:false})

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;