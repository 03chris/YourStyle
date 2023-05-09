import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import MyContext from "../../context/myContext";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const Admin = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();
  const { getProducts } = useContext(MyContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    const verified =
      name !== "" &&
      description !== "" &&
      img !== "" &&
      type !== "" &&
      price > 0;
    if (verified) {
      const newProduct = {
        name,
        description,
        img,
        type,
        price,
      };
      await axios
        .post("http://localhost:8080/products", newProduct)
        .then((res) => {
          const { data } = res;
          if (data.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Producto creado correctamente",
              showConfirmButton: false,
              timer: 1000,
            });
            setName("");
            setDescription("");
            setImg("");
            setType("");
            setPrice(0);
            navigate("/");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Faltan rellenar campos",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    await getProducts();
  };

  return (
    <>
      <h2 className="text-center pt-4 pb-3">Crea un nuevo producto</h2>
      <form onSubmit={(e) => onSubmit(e)} className="w-75 m-auto">
        <div className="form-floating mb-3">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="form-control"
            placeholder="Name..."
            autoComplete="off"
          />
          <label htmlFor="floatingInput">Nombre</label>
        </div>

        <div className="form-floating mb-3">
          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            className="form-control"
            placeholder="description..."
            autoComplete="off"
          />
          <label htmlFor="floatingInput">Descripción</label>
        </div>

        <div className="form-floating mb-3">
          <input
            onChange={(e) => setImg(e.target.value)}
            value={img}
            type="text"
            className="form-control"
            placeholder="URL..."
            autoComplete="off"
          />
          <label htmlFor="floatingInput">URL</label>
        </div>

        <FloatingLabel className="mb-3" controlId="floatingSelect" label="Tipo">
          <Form.Select
            aria-label="Floating label select example"
            onChange={(e) => setType(e.target.value)}
          >
            <option>Selecciona la categoria</option>
            <option value="remeras">Remeras</option>
            <option value="pantalones">Pants</option>
          </Form.Select>
        </FloatingLabel>

        <div className="form-floating mb-3">
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            className="form-control"
            placeholder="Price..."
            autoComplete="off"
          />
          <label htmlFor="floatingInput">Precio</label>
        </div>

        <button type="submit" className="btn btn-dark">
          Crear
        </button>
      </form>
    </>
  );
};

export default Admin;
