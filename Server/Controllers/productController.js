const DataModel = require('../models/ProductModel');
const {create} = require("../service/product/create");
const {allProducts} = require("../service/product/allProducts");
const {singleProduct} = require("../service/product/singleProduct");
const {update} = require("../service/product/update");
const {remove} = require("../service/product/remove");
const {filter} = require("../service/product/filter");
const {listProduct} = require("../service/product/listProduct");
const {search} = require("../service/product/search");
const {related} = require("../service/product/related");

exports.createProduct = async (req,res)=>{
    let Result = await create(req,DataModel)
    res.status(200).json(Result)
}


exports.allProducts = async (req,res)=>{
    let Result = await allProducts(req,DataModel)
    res.status(200).json(Result)
}


exports.singleProduct = async (req,res) => {
    let Result = await singleProduct(req,DataModel)
    res.status(200).json(Result)
}


exports.updateProduct = async (req,res) => {
    let Result = await update(req,DataModel)
    res.status(200).json(Result)
}

exports.deleteProduct = async (req,res) => {
    let Result = await remove(req,DataModel)
    res.status(200).json(Result)
}


exports.filteredProducts = async (req,res) => {
    let Result = await filter(req,DataModel)
    res.status(200).json(Result)
}


exports.listProducts = async (req,res) => {
    let Result = await listProduct(req,DataModel)
    res.status(200).json(Result)
}


exports.productsSearch = async (req,res) => {
    let Result = await search(req,DataModel)
    res.status(200).json(Result)
}


exports.relatedProducts = async (req,res) => {
    let Result = await related(req,DataModel)
    res.status(200).json(Result)
}