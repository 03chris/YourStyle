import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const ChatDetail = () => {
  const [message, setMessage] = useState([]);

  const { email } = useParams();

  const getMessages = async () => {
    await axios
      .get(`http://localhost:8080/messages/${email}`)
      .then(({ data }) => setMessage(data.myMessages))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="text-center pt-5">
      {message.length === 0 ? (
        <h1>No hay mensajes con este mail</h1>
      ) : (
        <>
          <h1 className="mb-5">Mensajes de {email}</h1>
          <div className="chat-body-detail">
            {message.map((message, i) => (
              <div key={i} className="mb-3">
                <span className="position-relative">
                  <b>{message.email}</b>: {message.message}
                  <span className="badge mt-1 fw-light position-absolute top-100 start-100 translate-middle text-black">
                    {message.timestamp}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatDetail;
