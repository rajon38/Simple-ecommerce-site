const express =require("express");
const formidable =require("express-formidable");

// middlewares
const { requireSignIn, isAdmin } =require("../middlewares/auth.js");
//controllers
const {createProduct, listProducts, allProducts, productsSearch, deleteProduct, updateProduct, singleProduct, filteredProducts, relatedProducts}= require('../Controllers/productController')
const router = express.Router();

router.post("/createProduct", requireSignIn, isAdmin, formidable(), createProduct);
router.get("/products", allProducts);
router.get("/productById/:productId", singleProduct)
router.get("/deleteProduct/:productId", requireSignIn, isAdmin, deleteProduct);
router.post("/updateProduct/:productId", requireSignIn, isAdmin, formidable(), updateProduct);
router.post("/filteredProducts", filteredProducts);
router.get("/list-products/:page", listProducts);
router.get("/products/search/:keyword", productsSearch);
router.get("/related-products/:productId", relatedProducts);

module.exports= router;