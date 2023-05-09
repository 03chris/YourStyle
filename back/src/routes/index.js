const router = require("express").Router();

// Health check

router.get("/", (_req, res) => {
  res.status(200).json({
    message: "Api running",
  });
});

// User

const { register, getUserById, login } = require("../controllers/userCtrl");

const verifyToken = require("../middlewares/verifyToken");

router.post("/register", register);
router.get("/user", verifyToken, getUserById);
router.post("/login", login);

// Ecommerce

const products = require("./productsRoute");
const cart = require("./cartRoute");

router.use("/products", products);
router.use("/cart", cart);

// Orders

const {
  newOrder,
  getOrdersByEmail,
  deleteOrders,
} = require("../controllers/ordersCtrl");

router.get("/orders/:email", getOrdersByEmail);
router.post("/orders", newOrder);
router.delete("/orders", deleteOrders);

// Chat

const {
  saveMessages,
  getMessages,
  getMessagesByEmail,
  deleteMessage,
} = require("../controllers/messageCtrl");

router.post("/messages", saveMessages);
router.get("/messages", getMessages);
router.get("/messages/:email", getMessagesByEmail);
router.delete("/messages", deleteMessage);

module.exports = router;
