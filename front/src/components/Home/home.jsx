import React from "react";
import Products from "../ProductsContainer/productsContainer";

import './home.css'

const Home = () => {
  return (
    <>
      <div className="main-container">
          <div className="container-fluid gx-0">
              <div className="background-container d-flex flex-column justify-content-center">
                  <p className="fw-bold fs-1 ms-5">CHANGE</p>
                  <p className="fw-bold fs-1 ms-5">WITH</p>
                  <p className="fw-bold fs-1 ms-5">US</p>
              </div>
          </div>
      </div>
      <Products />
    </>
  );
};

export default Home;
