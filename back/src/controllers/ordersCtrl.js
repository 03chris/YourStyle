const Order = require("../model/Order");
const User = require("../model/User");
const Cart = require("../model/Cart");

const { sendEmailNewOrder } = require("../helpers/helpers");

const newOrder = async (req, res) => {
  const { name, email, products, total } = req.body;
  const productsCart = await Cart.find();

  var hours = new Date().getHours();
  hours = hours > 9 ? hours : "0" + hours;
  var minutes = new Date().getMinutes();
  minutes = minutes > 9 ? minutes : "0" + minutes;

  if (!productsCart) {
    res.json({ message: "No hay productos en el carrito" });
  }

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.json({
        status: 400,
        message: "No se encontro una cuenta registrada con este mail",
      });
    }
    const newOrder = new Order({
      name,
      email,
      products,
      total,
      state: "generada",
      timestamp: `${hours}:${minutes}`,
    });
    const orderGenerated = newOrder.save();
    if (!orderGenerated) {
      return res.json({
        status: 400,
        message: "No se pudo realizar la compra",
      });
    }
    res.json({
      status: 200,
      orderGenerated,
    });
    sendEmailNewOrder(process.env.FROM_EMAIL, name, email, newOrder);
  });
};

getOrdersByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const myOrders = await Order.find({ email }).sort({ $natural: -1 });
    if (myOrders.length === 0) {
      return res.status(404).json({
        message: "No hay ordenes con este mail",
      });
    }
    res.json({ myOrders });
  } catch (err) {
    console.log(err);
  }
};

deleteOrders = async (_req, res) => {
  const orders = await Order.find();
  if (orders.length === 0) {
    return res.json({
      status: 404,
      order: "No hay ordernes para eliminar",
    });
  }
  await Order.deleteMany({});
  return res.json({
    status: 200,
    order: "Ordenes eliminadas",
  });
};

module.exports = { newOrder, getOrdersByEmail, deleteOrders };
