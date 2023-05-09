import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";

import "./styles.css";

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [message, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { email, password } = inputs;

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      const User = {
        email,
        password,
      };
      setLoading(true);
      await axios
        .post("http://localhost:8080/login", User)
        .then((res) => {
          const { data } = res;
          setMensaje(data.message);
          setTimeout(() => {
            setMensaje("");
            localStorage.setItem("token", data?.user.token);
            window.location.reload()
            navigate("/user");
          }, 1500);
        })
        .catch((err) => {
          console.error(err);
          setMensaje("email u contraseña incorrecta");
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        });
      setInputs({ email: "", password: "" });
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
        <h2>De Inicio de Sesión!</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="inputContainer">
            <div className="left">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => HandleChange(e)}
                value={email}
                name="email"
                id="email"
                type="email"
                placeholder="Email..."
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
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
          <p>
            Aun no tienes cuenta?{" "}
            <b onClick={() => navigate("/register")}>Registrate!</b>
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

export default Login;
