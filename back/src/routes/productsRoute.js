const router = require("express").Router();

const {
  getProducts,
  getProductsById,
  createProduct,
  deleteProductById,
  updateProduct,
} = require("../controllers/productsCtrl");

router.get("/", getProducts);
router.get("/:id", getProductsById);
router.post("/", createProduct);
router.delete("/:id", deleteProductById);
router.put("/:id", updateProduct);

module.exports = router;
