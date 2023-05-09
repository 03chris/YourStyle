import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2";
import MyContext from "../../context/myContext";
import { Link } from "react-router-dom";
import "./chat.css";

const socket = io("http://localhost:8080");

const Chat = () => {
  const { user } = useContext(MyContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [storedMessages, setStoredMessages] = useState([]);
  const [firstTime, setfirstTime] = useState(true);

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([message, ...messages]);
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);

  useEffect(() => {
    if (firstTime) {
      axios
        .get("http://localhost:8080/messages")
        .then(({ data }) => setStoredMessages(data.messages))
        .catch((error) => console.error(error));
      setfirstTime(false);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    var hours = new Date().getHours();
    hours = hours > 9 ? hours : "0" + hours;
    var minutes = new Date().getMinutes();
    minutes = minutes > 9 ? minutes : "0" + minutes;
    if (message !== "") {
      const newMessage = {
        from: user.email,
        body: message,
        timestamp: `${hours}:${minutes}`,
      };
      socket.emit(
        "message",
        newMessage.body,
        newMessage.from,
        newMessage.timestamp
      );
      await axios
        .post("http://localhost:8080/messages", {
          email: newMessage.from,
          message: newMessage.body,
        })
        .then((res) => {
          const { data } = res;
          if (data.status === 200) {
            setMessages([newMessage, ...messages]);
            setMessage("");
          }
        });
    } else {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Dejanos un mensaje",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDelete = async () => {
    await axios.delete("http://localhost:8080/messages").then((res) => {
      const { data } = res;
      if (data.status === 200) {
        setMessages([]);
        setStoredMessages([]);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Error",
        });
      }
    });
  };

  const deleteMessages = () => {
    Swal.fire({
      title: "Queres borrar todos los mensajes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Mensajes borrados!",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  return (
    <>
      {!user.email ? (
        <div className="text-center pt-5">
          <h1>Debes iniciar sesión para enviar mensajes!</h1>
          <Link to={"/user"} className="btn btn-dark mt-3">
            Iniciar sesión
          </Link>
        </div>
      ) : (
        <div className="container pt-5">
          <div className="row text-center">
            <div className="col-12 col-xl-6">
              <div className="m-auto">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <h1 className="font-bold">Chat</h1>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Dejanos tu mensaje..."
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      id="floatingTextarea"
                      maxLength="35"
                    />
                    <label htmlFor="floatingTextarea">Message</label>
                  </div>
                  <button className="btn btn-dark m-1 w-50">Enviar</button>
                </form>
                {messages.length === 0 && storedMessages.length === 0 ? (
                  <></>
                ) : (
                  <button
                    onClick={deleteMessages}
                    className="btn btn-dark m-1 w-50"
                  >
                    Borrar mensajes
                  </button>
                )}
              </div>
            </div>
            <div className="col-12 col-xl-6 pt-5">
              {messages.length === 0 && storedMessages.length === 0 ? (
                <h1>Aun no hay mensajes</h1>
              ) : (
                <div className="chat-body text-start">
                  {messages.map((message, i) => (
                    <div key={i} className="mb-3 w-75 m-auto">
                      <span className="position-relative">
                        <Link
                          className="email text-black fw-bold text-decoration-none"
                          to={`/chat/${message.from}`}
                        >
                          {message.from}
                        </Link>
                        : {message.body}
                        <span className="badge mt-1 fw-light position-absolute top-100 start-100 translate-middle text-black">
                          {message.timestamp}
                        </span>
                      </span>
                    </div>
                  ))}
                  {storedMessages.map((message, i) => (
                    <div key={i} className="mb-3 w-75 m-auto">
                      <span className="position-relative">
                        <Link
                          className="email opacity-50 fw-bold text-black text-decoration-none"
                          to={`/chat/${message.email}`}
                        >
                          {message.email}
                        </Link>
                        <span className="opacity-50">: {message.message}</span>
                        <span className="badge mt-1 fw-light position-absolute top-100 start-100 translate-middle text-black">
                          {message.timestamp}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
