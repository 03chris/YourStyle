const Cart = require("../model/Cart");
const Product = require("../model/Product");

const getProductsCart = async (_req, res) => {
  const productsCart = await Cart.find();

  if (productsCart) {
    res.json({ productsCart });
  } else {
    res.json({ message: "No hay productos en el carrito" });
  }
};

const addProductCart = async (req, res) => {
  const { name, description, img, type, price } = req.body;

  const isInProducts = await Product.findOne({ name });

  const verified =
    name !== "" &&
    description !== "" &&
    img !== "" &&
    type !== "" &&
    price !== "";

  const isInCart = await Cart.findOne({ name });

  if (!isInProducts) {
    res.status(400).json({
      message: "Este producto no se encuentra en nuestra base de datos",
    });
  } else if (verified && !isInCart) {
    const newProductInCart = new Cart({
      name,
      description,
      img,
      type,
      price,
      amount: 1,
      timestamp: new Date().toUTCString(),
    });
    await Product.updateOne(isInProducts, { $set: { inCart: true } });
    const productAdded = newProductInCart.save();
    if (!productAdded) {
      res.json({
        message: "Error al agregar el producto al carrito",
      });
    }
    res.json({
      message: "El producto fue agregado al carrito",
      productAdded,
    });
  } else if (isInCart) {
    res.status(400).json({
      message: "El producto ya esta en el carrito",
    });
  }
};

const putProduct = async (req, res) => {
  const { id } = req.params;
  const { query } = req.query;
  const body = req.body;

  const findProduct = await Cart.findById(id);

  if (!query) {
    res.status(404).json({ message: "Debes enviar una query" });
  } else if (findProduct && query === "add") {
    body.amount = body.amount + 1;
    const amountUpdated = await Cart.findByIdAndUpdate(id, body);
    if (amountUpdated) {
      res.json({
        message: "Producto actualizado",
      });
    }
  } else if (findProduct && query === "del") {
    body.amount = body.amount - 1;
    const amountUpdated = await Cart.findByIdAndUpdate(id, body);
    if (amountUpdated) {
      res.json({
        message: "Producto actualizado",
      });
    }
  } else {
    res.status(400).json({ message: "Ocurrio un error" });
  }
};

const deleteCart = async (_req, res) => {
  const productsCart = await Cart.find();
  if (productsCart) {
    const productsDeleted = await Cart.deleteMany({});
    if (productsDeleted) {
      res.json({
        status: 200,
        message: "Carrito eliminado",
      });
      await Product.updateMany({ inCart: true }, { $set: { inCart: false } });
    }
  } else {
    res.json({ message: "No hay productos en el carrito" });
  }
};

module.exports = {
  getProductsCart,
  addProductCart,
  putProduct,
  deleteCart,
};
