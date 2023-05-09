const transport = require("./transport");

const sendEmailNewOrder = async (fromEmail, name, toEmail, order) => {
  let li = "";
  order.products.forEach((e) => {
    li = li + `<li> ${e.name} - Cantidad: ${e.amount} </li>`;
  });
  await transport
    .sendMail({
      from: `Admin ${fromEmail}`,
      to: toEmail,
      html: `<h1>Productos comprados:</h1>
            <ul>
                ${li}
            </ul>
          <h2> Total: ${order.total}$ </h2>
          <h2>Estado: ${order.state}</h2>`,
      subject: `Nueva compra de: ${name}`,
    })
    .then((data) => {
      console.log("Email enviado");
    })
    .catch((err) => console.log(err));
};

const sendEmailNewUser = async (fromEmail, toEmail, user, timestamp) => {
  await transport
    .sendMail({
      from: `Admin ${fromEmail}`,
      to: toEmail,
      html: `<h1>Detalles del registro:</h1>
            <ul>
                <li>Email: ${user.email}</li>
                <li>Nombre: ${user.name}</li>
                <li>Hora: ${timestamp}</li>
            </ul>`,
      subject: `Nuevo usuario registrado: ${user.email}`,
    })
    .then((data) => {
      console.log("Email enviado");
    })
    .catch((err) => console.log(err));
};

module.exports = { sendEmailNewUser, sendEmailNewOrder };
