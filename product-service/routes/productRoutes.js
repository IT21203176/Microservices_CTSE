const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/search", productController.searchProducts);
router.get("/categories", productController.getCategories);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

router.post("/", authMiddleware, productController.addProduct);  
router.put("/:id", authMiddleware, productController.updateProduct); 
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;
