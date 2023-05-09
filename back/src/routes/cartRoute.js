const router = require("express").Router();

const {
  getProductsCart,
  addProductCart,
  putProduct,
  deleteCart,
} = require("../controllers/cartCtrl");

router.get("/", getProductsCart);
router.post("/", addProductCart);
router.put("/:id", putProduct);
router.delete("/", deleteCart);

module.exports = router;
