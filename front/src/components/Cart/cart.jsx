import { useContext, useState } from "react";
import { ItemCart } from "../ItemCart/itemCart";
import Context from "../../context/myContext";
import { Link } from "react-router-dom";
import Checkout from "./checkout";
import Swal from "sweetalert2";

const Cart = () => {
  const [modalShow, setModalShow] = useState(false);
  const { user, cartItems, deleteCart } = useContext(Context);

  const total = cartItems?.reduce(
    (previous, current) => previous + current.amount * current.price,
    0
  );

  const isLogged = () =>{
    if(!user.name){
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Debes iniciar sesión para realizar una compra",
        showConfirmButton: false,
        timer: 2000,
      });
    }else{
      setModalShow(true)
    }
  }

  return (
    <div className="p-3 text-center">
      {cartItems.length === 0 ? (
        <div className="p-5">
          <h1 className="mb-3">Tu carrito esta vacio</h1>
          <Link to={"/products"} className="btn btn-dark">
            Volver a la tienda
          </Link>
        </div>
      ) : (
        <div className="pt-5">
          {cartItems.map((item, i) => (
            <ItemCart key={i} item={item} />
          ))}
          <h2>Total: ${total}</h2>
          <button className="btn btn-dark m-2" onClick={deleteCart}>
            Vaciar carrito
          </button>
          <button
            onClick={() => isLogged()}
            className="btn btn-dark m-2"
          >
            Finalizar compra
          </button>
          <Checkout show={modalShow} onHide={() => setModalShow(false)} />
        </div>
      )}
    </div>
  );
};

export default Cart;
