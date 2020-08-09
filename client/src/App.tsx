import React from "react";
import io from "socket.io-client";

const socket = io();

function App() {
  socket.on("message", (message: Text) => {
    console.log(message);
  });
  return <div className="App">This is the basis for the app</div>;
}

export default App;
