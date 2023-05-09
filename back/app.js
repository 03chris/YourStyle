require("dotenv").config();
const logger = require("morgan");
const mongooseConnect = require("./src/config/connect");

const express = require("express");
const cors = require("cors");

const router = require("./src/routes/index");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
mongooseConnect();
app.use(logger("dev"));

app.use("/", router);

// socket.io
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origins: "*",
    methods: ["GET", "POST"],
    credentials: false,
  },
});

io.on("connection", (socket) => {
  socket.on("message", (body, from) => {
    socket.broadcast.emit("message", {
      body,
      from,
    });
  });
});

module.exports = server;
