const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers["token"];

  if (token) {
    jwt.verify(token, process.env.SECRET, (error, data) => {
      if (error) return res.status(400).json({ mensaje: "Token invalido" });
      else {
        req.user = data;
        next();
      }
    });
  } else {
    res.json({ status: 403, mensaje: "Debes iniciar sesión" });
  }
};

module.exports = verifyToken;
