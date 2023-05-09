import React, { useContext, useEffect, useState } from "react";
import Context from "../../context/myContext";
import Card from "../Card/card";
import { useParams } from "react-router-dom";
import Error from "../Error/error";

const Products = () => {
  const [typeProduct, setTypeProduct] = useState([]);

  const { products } = useContext(Context);

  const { type } = useParams();

  useEffect(() => {
    if (type) {
      const filter = products.filter((e) => e.type === type);
      setTypeProduct(filter);
    } else {
      setTypeProduct(products);
    }
  }, [type, setTypeProduct, products]);

  return (
    <div className="container-fluid p-5 row mx-0">
      {typeProduct.length === 0 ? (
        <Error message={`No se encontraron productos de tipo ${type}`} />
      ) : (
        <>
          {typeProduct.map((product, i) => (
            <Card product={product} key={i} />
          ))}
        </>
      )}
    </div>
  );
};

export default Products;
