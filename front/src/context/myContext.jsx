import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const MyContext = createContext();

export const Provider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:8080/user`, {
          headers: {
            token: token,
          },
        })
        .then(({ data }) => setUser(data))
        .catch((err) => console.error(err));
    }
  }, [token]);

  const getProducts = async () => {
    await axios
      .get("http://localhost:8080/products")
      .then(({ data }) => setProducts(data));
  };

  const getProductsCart = async () => {
    return await axios
      .get("http://localhost:8080/cart")
      .then(({ data }) => setCartItems(data.productsCart))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getProducts();
    getProductsCart();
  }, []);

  const addItemToCart = async (product) => {
    const { name, description, img, type, price } = product;

    await axios.post("http://localhost:8080/cart", {
      name,
      description,
      img,
      type,
      price,
    });

    await getProducts();
    await getProductsCart();
  };

  const editItemToCart = async (id, query, amount) => {
    await axios.put(`http://localhost:8080/cart/${id}?query=${query}`, {
      amount,
    });

    await getProducts();
    await getProductsCart();
  };

  const handleDelete = async () => {
    await axios.delete("http://localhost:8080/cart").then(({ data }) => {
      if (data.status === 200) {
        console.log("Carrito eliminado!");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Error",
        });
      }
    });

    await getProducts();
    await getProductsCart();
  };

  const deleteCart = () => {
    Swal.fire({
      title: "Queres vaciar el carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      }
    });
  };

  return (
    <MyContext.Provider
      value={{
        user,
        cartItems,
        products,
        addItemToCart,
        editItemToCart,
        deleteCart,
        handleDelete,
        getProducts,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
