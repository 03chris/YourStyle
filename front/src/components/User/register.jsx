import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { MdEmail } from "react-icons/md";
import { FaKey, FaUser } from "react-icons/fa";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { name, email, password } = inputs;

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name !== "" && email !== "" && password !== "") {
      const User = {
        name,
        email,
        password,
      };
      setLoading(true);
      await axios
        .post("http://localhost:8080/register", User)
        .then((res) => {
          const { data } = res;
          if (data.status === 400) {
            setMensaje(data.message);
          } else {
            setMensaje(data.message);
            setInputs({ name: "", password: "", email: "" });
            setTimeout(() => {
              setMensaje("");
              navigate("/user");
            }, 1500);
          }
        })
        .catch((err) => {
          console.error(err);
          setMensaje("Hubo un error");
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        });

      setLoading(false);
    } else {
      setMensaje("Faltan rellenar campos");
      setTimeout(() => {
        setMensaje("");
      }, 1500);
    }
  };

  return (
    <>
      <div className="formContainer m-auto">
        <h3>Bienvenido a la pagina</h3>
        <h2>De Registro!</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="inputContainer">
            <div className="left">
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => HandleChange(e)}
                value={name}
                name="name"
                id="name"
                type="text"
                placeholder="Name..."
                autoComplete="off"
              />
            </div>
            <FaUser className="fs-5" />
          </div>

          <div className="inputContainer">
            <div className="left">
              <label htmlFor="email">email</label>
              <input
                onChange={(e) => HandleChange(e)}
                value={email}
                name="email"
                id="email"
                type="email"
                placeholder="email..."
                autoComplete="off"
              />
            </div>
            <MdEmail className="fs-4" />
          </div>

          <div className="inputContainer">
            <div className="left">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => HandleChange(e)}
                value={password}
                name="password"
                id="password"
                type="password"
                placeholder="Password..."
                autoComplete="off"
              />
            </div>
            <FaKey className="fs-5" />
          </div>

          <button type="submit">
            {loading ? "Cargando..." : "Registrarme"}
          </button>
          <p>
            Ya tienes una cuenta?{" "}
            <b onClick={() => navigate("/user")}>Inicia Sesión!</b>
          </p>
        </form>
        {message && (
          <div className="alert alert-dark text-center" role="alert">
            {message}
          </div>
        )}
      </div>
    </>
  );
};

export default Register;
