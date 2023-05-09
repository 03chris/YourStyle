const { model, Schema } = require("mongoose");

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  inCart: { type: Boolean, default: false },
  type: { type: String, required: true },
  price: { type: Number, required: true },
});

ProductSchema.method('toJSON', function () {
  const { __v, _id , ...products } = this.toObject();
  products.id = _id
  return products
});

module.exports = model("Product", ProductSchema);
