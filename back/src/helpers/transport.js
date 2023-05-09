const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ETHEREAL_MAIL,
    pass: process.env.ETHEREAL_PWD,
  },
});

module.exports = transport;
