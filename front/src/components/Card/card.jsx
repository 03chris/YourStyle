import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ product }) => {
  return (
    <div className="col-12 col-xl-4">
      <div className="card mt-3 mb-3">
        <Link to={`/products/${product.id}`}>
          <img src={product.img} className="card-img-top" alt={product.name} />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <Link to={`/products/${product.id}`} className="btn btn-dark">
            Ver mas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
