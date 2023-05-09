import React, { useContext } from "react";
import Context from "../../context/myContext";
import "./itemCart.css";
import { HiMinus } from "react-icons/hi";
import { GoPlus } from "react-icons/go";

export const ItemCart = ({ item }) => {
  const { editItemToCart } = useContext(Context);

  const { amount } = item;

  return (
    <div className="mb-2">
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <img src={item.img} alt={item.name} className="imgProducts" />
          <span className="fs-5 w-25">{item.name}</span>
          <span className="quantity rounded text-center fs-5">
            {item.amount}
          </span>
          <span className="fw-bold fs-5">${item.amount * item.price}</span>
          <div className="d-flex flex-column">
            <button
              disabled={amount === 1}
              className="btn btn-danger btn-sm mb-1"
              onClick={() => editItemToCart(item.id, "del", amount)}
            >
              <HiMinus />
            </button>
            <button
              className="btn btn-dark btn-sm"
              onClick={() => editItemToCart(item.id, "add", amount)}
            >
              <GoPlus />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};
