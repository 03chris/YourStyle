const { model, Schema } = require("mongoose");

const MessageSchema = new Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, required: true },
  timestamp: { type: String, required: false },
});

MessageSchema.method('toJSON', function () {
  const { __v, _id , ...messages } = this.toObject();
  messages.id = _id
  return messages
});

module.exports = model("Message", MessageSchema);
