const { model, Schema } = require("mongoose");

const CartSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: String, required: false },
});

CartSchema.method("toJSON", function () {
  const { __v, _id, ...cart } = this.toObject();
  cart.id = _id;
  return cart;
});

module.exports = model("Cart", CartSchema);
