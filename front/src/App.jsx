import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Register from "./components/User/register";
import User from "./components/User/user";
import NavBar from "./components/NavBar/navbar";
import Home from "./components/Home/home";
import Products from "./components/ProductsContainer/productsContainer";
import DetailContainer from "./components/DetailContainer/detailContainer";
import Cart from "./components/Cart/cart";
import Orders from "./components/Orders/orders";
import Chat from "./components/Chat/chat";
import ChatDetail from "./components/Chat/chatDetail";
import Footer from "./components/Footer/footer";
import Error from "./components/Error/error";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/products" element={<Products />} />
        <Route path="/type/:type" element={<Products />} />
        <Route path="/products/:id" element={<DetailContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders/:email" element={<Orders />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:email" element={<ChatDetail />} />
        <Route path="*" element={<Error message={"Ruta no encontrada"} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
