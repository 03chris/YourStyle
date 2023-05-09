import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Detail from "../Detail/detail";
import axios from "axios";
import Error from "../Error/error";

const DetailContainer = () => {
  const [product, setProduct] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const getProductsById = async () => {
      await axios
        .get(`http://localhost:8080/products/${id}`)
        .then(({ data }) => setProduct(data));
    };
    getProductsById();
  }, [id]);

  return (
    <div className="pt-4 text-center">
      {product.name ? (
        <Detail product={product} />
      ) : (
        <Error message={'No existe este producto'}/>
      )}
    </div>
  );
};

export default DetailContainer;
