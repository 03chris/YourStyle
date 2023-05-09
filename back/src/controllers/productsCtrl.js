const Product = require("../model/Product");

const getProducts = async (_req, res) => {
  const products = await Product.find();
  if (products) {
    res.json(products);
  } else {
    res.json({ mensaje: "No hay productos" });
  }
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.json({ message: "Producto no encontrado" });
    }
  } catch (err) {
    console.error(err);
  }
};

const createProduct = async (req, res) => {
  const { name, description, img, type, price } = req.body;

  const newProduct = {
    name,
    description,
    img,
    inCart: false,
    type,
    price,
  };

  const verified =
    name !== "" && description !== "" && img !== "" && type !== "" && price > 0;

  if (verified) {
    const product = new Product(newProduct);
    const productCreated = await product.save();
    if (productCreated) {
      res.json({ status: 200, message: "Producto agregado!" });
    } else {
      res.json({ status: 400, message: "No se pudo crear el producto" });
    }
  } else {
    res.json({
      status: 400,
      message: "Faltan rellenar campos",
    });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const productDelected = await Product.deleteOne({ _id: id });
    if (productDelected) {
      res.json({
        response: `Producto con el id: ${id} eliminado`,
      });
    } else {
      res.json({ message: "Producto no encontrado" });
    }
  } catch (err) {
    console.log(`Error ${err}`);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productUpdated = await Product.findByIdAndUpdate(id, req.body);
  if (productUpdated) {
    res.json({ message: "Producto actualizado" });
  } else {
    res.json({ message: "No se puedo actualizar el producto" });
  }
};

module.exports = {
  getProducts,
  getProductsById,
  createProduct,
  deleteProductById,
  updateProduct,
};
