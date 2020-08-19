import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { FiClipboard, FiShare2 } from "react-icons/fi";
import { diffChars } from "diff";
import Footer from "./Footer";

const socket = io();

const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      text-decoration: none;
    }

    h1 {
      font-weight: 300;
      font-size: 52px;
      color: #ccc;
      transition: 0.3s;
      margin: 1.5rem 0;
      &:hover {
        color: #555;
      }
    }
  }

  textarea {
    resize: vertical;
    width: 100%;
    height: 70vh;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 2rem;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    color: #777;
    line-height: 2;

    :focus {
      outline-color: #555;
    }
  }
`;

const TopButton = styled.button<{
  isDone: boolean;
  tooltip: string;
  doneTooltip?: string;
}>`
  background: #fff;
  border: none;
  position: relative;
  border-radius: 50%;
  padding: 1rem;
  font-size: 30px;
  color: #ccc;
  cursor: pointer;
  transition: 0.3s;
  outline: none;

  /* tooltip */
  &::after {
    content: ${(props) =>
      props.isDone ? `"${props.doneTooltip}"` : `"${props.tooltip}"`};
    position: absolute;
    background: #555;
    font-size: 13px;
    bottom: -16px;
    left: 50%;
    transform: translate3d(-50%, -8px, 0) scale(0.8);
    padding: 0.3rem 0.5rem;
    border-radius: 10px;
    color: #eee;
    opacity: 0;
    white-space: nowrap;
    z-index: 9999;
    transition: 0.2s;
  }
  &:hover {
    color: #555;
    ::after {
      opacity: 1;
      transform: translate3d(-50%, 0px, 0) scale(1);
    }
  }
`;

export default function Note() {
  const textareaRef = useRef(document.createElement("textarea"));

  // the id of the current note
  const { id } = useParams();

  // current text value of the note
  const [text, setText] = useState<string>("");

  // if the text has just been copied to clipboard
  const [isTextCopied, setIsTextCopied] = useState<boolean>(false);

  // initialize socket listeners
  useEffect(() => {
    // log any messages for now
    socket.on("message", (message: string) => {
      console.log(message);
    });

    // join the current note connection
    socket.emit("joinNote", id);

    // apply any changes received from sockets
    socket.on("update", (newText: string) => {
      setText(newText);
    });

    // autofocus note textarea
    if (textareaRef.current !== undefined) textareaRef.current.focus();

    // todo: return function for the user to leave
  }, [id]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // send diff to other users
    const newText = e.target.value;
    const diffs = diffChars(text, newText);
    socket.emit("diff", { diffs, id });
    // set current change
    setText(newText);
    // reset copied flag
    setIsTextCopied(false);
  };

  const handleCopyText = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsTextCopied(true);
      })
      .catch((err) => console.error(err));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.host}/note/${id}`);
  };

  return (
    <Container>
      <header>
        <Link to="/">
          <h1>conote</h1>
        </Link>
        <div>
          <TopButton
            onClick={handleCopyText}
            isDone={isTextCopied}
            tooltip="Copy note"
            doneTooltip="Note copied to clipboard"
          >
            <FiClipboard />
          </TopButton>
          <TopButton
            onClick={handleCopyLink}
            // isDone={linkCopied}
            isDone={false}
            tooltip="Copy link"
            doneTooltip="Link copied to clipboard"
          >
            <FiShare2 />
          </TopButton>
        </div>
      </header>
      <textarea ref={textareaRef} value={text} onChange={handleTextChange} />
      <Footer />
    </Container>
  );
}
