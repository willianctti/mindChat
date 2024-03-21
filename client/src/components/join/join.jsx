import { useRef } from "react";
import io from "socket.io-client";

export default function join({ setChatVisible, setSocket }) {
  const usernameRef = useRef();

  const handleSubmit = async () => {
    const username = usernameRef.current.value;
    if (!username) return;
    if (username.trim().length === 0) return;
    const socket = await io.connect("http://localhost:3001");

    socket.emit("setUsername", username);
    setSocket(socket);
    setChatVisible(true);
  };

  return (
    <div>
      <h1>What is your username?</h1>
      <input type="text" ref={usernameRef} placeholder="Username:" />
      <button onClick={() => handleSubmit()}>Join</button>
    </div>
  );
}
