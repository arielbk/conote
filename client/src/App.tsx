import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import { FiClipboard } from "react-icons/fi";

const socket = io();

const Container = styled.div<{ isCopied: boolean }>`
  font-family: Arial, Helvetica, sans-serif;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-weight: 300;
      font-size: 52px;
      color: #555;
    }

    #copy-button {
      position: relative;
      border-radius: 50%;
      padding: 1rem;
      font-size: 30px;
      color: #ccc;
      cursor: pointer;
      transition: 0.3s;

      /* tooltip */
      &::after {
        content: ${(props) =>
          props.isCopied ? "'Copied!'" : "'Copy to clipboard'"};
        position: absolute;
        background: #555;
        font-size: 13px;
        bottom: -20px;
        left: 50%;
        transform: translate(-50%);
        padding: 0.3rem 0.5rem;
        border-radius: 10px;
        color: #eee;
        opacity: 0;
        white-space: nowrap;
      }
      &:hover {
        color: #555;
        ::after {
          opacity: 1;
        }
      }
    }
  }

  textarea {
    width: 100%;
    height: auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 2rem;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    color: #777;

    :focus {
      outline-color: #555;
    }
  }
`;

function App() {
  // current text value of the note
  const [text, setText] = useState<string>("");
  // if the text has just been copied to clipboard
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // if the text changes here, transmit this change
  useEffect(() => {
    socket.emit("text", text);
    setIsCopied(false);
  }, [text]);

  // log any messages for now
  socket.on("message", (message: string) => {
    console.log(message);
  });

  // apply any changes received from sockets
  socket.on("text", (newText: string) => setText(newText));

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container isCopied={isCopied}>
      <header>
        <h1>Conote</h1>
        <div id="copy-button" onClick={handleCopy}>
          <FiClipboard />
        </div>
      </header>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
    </Container>
  );
}

export default App;
