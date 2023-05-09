import React, { useContext, useState } from "react";
import MyContext from "../../context/myContext";
import axios from "axios";
import Swal from "sweetalert2";

import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router";

const Checkout = (props) => {
  const [name, setName] = useState("");
  const { user, cartItems, handleDelete } = useContext(MyContext);

  const total = cartItems?.reduce(
    (previous, current) => previous + current.amount * current.price,
    0
  );

  const navigate = useNavigate();

  const buyButton = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8080/orders", {
        name: name,
        email: user.email,
        products: cartItems,
        total,
      })
      .then((res) => {
        const { data } = res;
        if (data.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Compra realizada con exito!",
            showConfirmButton: false,
            timer: 1500,
          });
          handleDelete();
          props.onHide();
          setTimeout(() => {
            navigate(`/orders/${user.email}`);
          }, 1500);
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <form onSubmit={buyButton}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            A nombre de quien se realiza la compra?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Name..."
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <label htmlFor="floatingInput">Nombre</label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-dark" disabled={name === ""}>
            Comprar
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Checkout;
