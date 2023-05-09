import { useContext, useEffect, useState } from "react";
import Context from "../../context/myContext";

import { BsBag } from "react-icons/bs";

export const Bag = () => {
  const { cartItems } = useContext(Context);

  const [productsLength, setProductsLength] = useState(0);

  useEffect(() => {
    setProductsLength(
      cartItems?.reduce((previous, current) => previous + current.amount, 0)
    );
  }, [cartItems]);

  return (
    <>
      <BsBag className="fs-4" />
      <span className="badge position-absolute translate-middle rounded-pill bg-white text-black">
        {productsLength}
      </span>
    </>
  );
};
