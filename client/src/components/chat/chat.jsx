import { useEffect, useRef, useState } from "react";
import "./styles.css";
export default function chat({ socket }) {
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessageList([...messageList, message]);
    });

    return () => socket.off("receive_message");
  }, [socket, messageList]);

  const handleSubmit = () => {
    const message = messageRef.current.value;
    if (!message) return;
    if (message.trim().length === 0) return;

    socket.emit("message", message);
    setMessageList([...messageList, message]);
    clearInput();
    console.log("messageList", socket.id);
  };

  const clearInput = () => {
    messageRef.current.value = "";
  };
  return (
    <div>
      <h1>MindChat</h1>
      {!socket && <p>Connecting...</p>}
      {messageList && messageList.length === 0 && <p>No messages yet</p>}
      {messageList && messageList.length === 0 && <p>Start a conversation!</p>}
      {messageList.map((message, index) => (
        <p
          key={index}
          style={{
            color: message.username === "you" ? "blue" : "black",
            fontWeight: message.username === "you" ? "bold" : "normal",
            backgroundColor: message.id === socket.id ? "lightblue" : "white",
            textAlign: message.id === socket.id ? "right" : "left",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          }}
        >
          {message.username}: {message.text} ({message.time})
        </p>
      ))}
      <input type="text" ref={messageRef} placeholder="Message:" />
      <button onClick={() => handleSubmit()}>Send</button>
    </div>
  );
}
