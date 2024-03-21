import { useState } from "react";
import "./App.css";
import Join from "./components/join/join";
import Chat from "./components/chat/chat";

function App() {
  const [chatVisible, setChatVisible] = useState(false);
  const [socket, setSocket] = useState(null);

  return (
    <>
      <div>
        {chatVisible ? (
          <Chat socket={socket} />
        ) : (
          <Join setChatVisible={setChatVisible} setSocket={setSocket} />
        )}
      </div>
    </>
  );
}

export default App;
