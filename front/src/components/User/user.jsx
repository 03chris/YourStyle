import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../../context/myContext";

import Login from "./login";
import Swal from "sweetalert2";
import Admin from "../Admin/admin";

const User = () => {
  const { user } = useContext(MyContext);

  const logOut = async () => {
    setTimeout(() => {
      window.localStorage.removeItem("token");
      window.location.reload()
    }, 1500);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Adios!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      {user.name ? (
        <>
          <div className="text-end mt-3 me-3">
            <Link className="btn btn-dark me-2" to={`/orders/${user.email}`}>
              Mis compras
            </Link>
            <button className="btn btn-dark" onClick={logOut}>
              Salir
            </button>
          </div>
          <div className="text-center p-5">
            <h3>{`¡Hola ${user.name}!`}</h3>
            <p>{`Mail : ${user.email}`}</p>
            {user.admin ? <Admin /> : <></>}
          </div>
        </>
      ) : (
        <>
          <Login className="text-start" />
        </>
      )}
    </>
  );
};

export default User;
