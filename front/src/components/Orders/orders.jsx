import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import MyContext from "../../context/myContext";
import Error from "../Error/error";

const Orders = () => {
  const [order, setOrder] = useState([]);
  const { email } = useParams();

  const { user } = useContext(MyContext);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/orders/${email}`)
      .then(({ data }) => setOrder(data.myOrders))
      .catch((error) => console.error(error));
  }, [email]);

  return (
    <div className="text-center w-75 m-auto p-3">
      <div>
        {user.email === email ? (
          <>
            {order.length === 0 ? (
              <>
                <h1>Aun no realizaste compras!</h1>
                <Link to={"/products"} className="btn btn-dark mt-4">
                  Ir a la tienda
                </Link>
              </>
            ) : (
              <>
                <h1 className="mb-5">Mis compras</h1>
                {order.map((order, i) => (
                  <div key={i} className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span className="m-2">{order.timestamp}</span>
                      <span className="m-2 fw-bold text-success">
                        {order.state}
                      </span>
                    </div>
                    <div className="text-end">
                      {order.products.map((item, i) => (
                        <div key={i}>
                          <div className="text-start">
                            <ul className="list-group">
                              <li className="list-group-item rounded-1 d-flex justify-content-between">
                                <div className="ms-2">
                                  <div className="fw-bold">{item.name}</div>
                                  {item.description}
                                </div>
                                <div>
                                  <div className="badge bg-dark rounded-pill me-3">
                                    {item.amount}
                                  </div>
                                  <span className="fw-bold fs-6">
                                    ${item.amount * item.price}
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))}
                      <span className="m-1 fw-bold fs-5">
                        Total ${order.total}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <Error message={"Ruta no encontrada"} />
        )}
      </div>
    </div>
  );
};

export default Orders;
