const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { sendEmailNewUser } = require("../helpers/helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userFinded = await User.findOne({ email });
  if (userFinded) {
    return res.json({
      status: 400,
      message: "Ya existe un usuario con ese correo",
    });
  } else if (!name || !email || !password) {
    return res.json({
      status: 400,
      message: "Falta el nombre / correo / contraseña",
    });
  } else {
    const passwordEncrypted = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: passwordEncrypted,
      admin: false,
    });

    const user = await newUser.save();
    if (user) {
      var hours = new Date().getHours();
      hours = hours > 9 ? hours : "0" + hours;
      var minutes = new Date().getMinutes();
      minutes = minutes > 9 ? minutes : "0" + minutes;
      const timestamp = `${hours}:${minutes}`;
      res.json({
        status: 200,
        message: "Usuario creado correctamente",
      });
      sendEmailNewUser(process.env.FROM_EMAIL, user.email, user, timestamp);
    } else {
      res.json({
        status: 400,
        message: "Hubo un error",
      });
    }
  }
};

const getUserById = async (req, res) => {
  const { id } = req.user;

  if (id.length === 24) {
    User.findById(id).then((user) => {
      if (!user) {
        return res.json({
          message: "No se encontro ningun usuario con esa ID",
        });
      } else {
        const { _id, contraseña, __v, ...before } = user._doc;
        res.json(before);
      }
    });
  } else {
    res.json({ message: "Estas enviando una contraseña incorrecta" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.json({ message: "Usuario no encontrado" });
    }

    bcrypt.compare(password, user.password).then((isCorrect) => {
      if (isCorrect) {
        const { id, name, admin } = user;

        const data = {
          id,
          name,
        };

        const token = jwt.sign(data, process.env.SECRET, {
          expiresIn: 3600 /* 1h */,
        });

        res.json({
          message: "Usuario logeado correctamente",
          user: {
            id,
            name,
            admin,
            token,
          },
        });
      } else {
        return res.json({ message: "Contraseña incorrecta" });
      }
    });
  });
};

module.exports = { register, getUserById, login };
