const { model, Schema } = require("mongoose");

const OrderSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  products: { type: Array, required: true },
  total: { type: Number, required: true },
  state: { type: String, required: true },
  timestamp: { type: String, required: false },
});

module.exports = model("Order", OrderSchema);
