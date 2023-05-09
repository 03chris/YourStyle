import React, { useContext, useState } from "react";
import Context from "../../context/myContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Detail = ({ product }) => {
  const [changeButton, setChangeButton] = useState(true);

  const { addItemToCart } = useContext(Context);

  const onAdd = () => {
    setChangeButton(false);
    addItemToCart(product);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Agregado al carrito",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <div className="container p-5 mt-3">
      <div className="card-hover">
        <div className="row">
          <div className="col-md-4">
            <img src={product.img} className="img-fluid" alt={product.name} />
          </div>
          <div className="col-md-8 m-auto text-center">
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.description}</p>
              {changeButton && !product.inCart ? (
                <>
                  <p className="card-text fs-4">${product.price}</p>
                  <button className="btn btn-dark" onClick={() => onAdd()}>
                    Comprar
                  </button>
                </>
              ) : (
                <div className="row d-flex justify-content-center">
                  <Link
                    to={"/cart"}
                    className="col-12 col-xl-6 btn btn-dark m-1 w-50"
                  >
                    Ir al carrito
                  </Link>
                  <Link
                    to={"/products"}
                    className="col-12 col-xl-6 btn btn-dark m-1 w-50"
                  >
                    Volver a la tienda
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
