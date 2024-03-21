const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

io.on("connection", (socket) => {
  socket.on("setUsername", (username) => {
    socket.data.username = username;
    console.log("username is set to " + username);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.data.username);
  });

  socket.on("message", (text) => {
    io.emit("receive_message", {
      text,
      username: socket.data.username,
      id: socket.id,
      time: new Date().toLocaleTimeString().slice(0, 5),
    });
  });
});
