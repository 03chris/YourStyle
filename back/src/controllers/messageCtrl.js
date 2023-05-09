const Message = require("../model/Message.js");

saveMessages = async (req, res) => {
  const body = req.body;
  var hours = new Date().getHours();
  hours = hours > 9 ? hours : "0" + hours;
  var minutes = new Date().getMinutes();
  minutes = minutes > 9 ? minutes : "0" + minutes;
  const newMessage = {
    ...body,
    type: "client",
    timestamp: `${hours}:${minutes}`,
  };
  const message = new Message(newMessage);
  const messageSaved = await message.save(message);
  if (!messageSaved) {
    return res.json({
      status: 400,
      message: "No se pudo enviar el mensaje",
    });
  }
  return res.json({
    status: 200,
    messageSaved,
  });
};

getMessages = async (_req, res) => {
  const messages = await Message.find().sort({ $natural: -1 });
  if (messages.length === 0) {
    return res.status(404).json({
      message: "No hay mensajes para mostrar",
    });
  }
  return res.status(200).json({ messages });
};

getMessagesByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const myMessages = await Message.find({ email }).sort({ $natural: -1 });
    if (myMessages.length === 0) {
      return res.status(404).json({
        message: "No hay mensajes para mostrar",
      });
    }
    res.json({ myMessages });
  } catch (err) {
    console.log(err);
  }
};

deleteMessage = async (_req, res) => {
  const messages = await Message.find();
  if (messages) {
    const messagesDeleted = await Message.deleteMany({});
    if (messagesDeleted) {
      return res.json({
        status: 200,
        message: "Mensajes eliminados",
      });
    }
  }
  return res.json({
    status: 404,
    message: "No hay mensajes para eliminar",
  });
};

module.exports = {
  saveMessages,
  getMessages,
  getMessagesByEmail,
  deleteMessage,
};
