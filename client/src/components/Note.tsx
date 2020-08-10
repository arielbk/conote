import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { FiClipboard, FiShare2 } from "react-icons/fi";
import { diffChars } from "diff";

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

    a {
      text-decoration: none;
    }

    h1 {
      font-weight: 300;
      font-size: 52px;
      color: #ccc;
      transition: 0.3s;
      &:hover {
        color: #555;
      }
    }

    button {
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
    resize: vertical;
    width: 100%;
    height: 70vh;
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

export default function Note() {
  // the id of the current note
  const { id } = useParams();

  // current text value of the note
  const [text, setText] = useState<string>("");
  // if the text has just been copied to clipboard
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // initialize socket listeners
  useEffect(() => {
    // log any messages for now
    socket.on("message", (message: string) => {
      console.log(message);
    });

    // join the current note connection
    socket.emit("joinNote", id);

    // apply any changes received from sockets
    socket.on("diff", (diff: any) => {
      let newText = "";
      diff.forEach(
        ({
          count,
          added,
          removed,
          value,
        }: {
          // todo: define a type for these diffs
          count: number;
          added: boolean;
          removed: boolean;
          value: string;
        }) => {
          if (!removed) newText += value;
        }
      );
      setText(newText);
    });

    // todo: return function for the user to leave
  }, [id]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // send diff to other users
    const newText = e.target.value;
    const diff = diffChars(text, newText);
    socket.emit("diff", diff);
    // set current change
    setText(newText);
    // reset copied flag
    setIsCopied(false);
  };

  const handleCopyText = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => console.error(err));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.host}/note/${id}`);
  };

  return (
    <Container isCopied={isCopied}>
      <header>
        <Link to="/">
          <h1>conote</h1>
        </Link>
        <div>
          <button onClick={handleCopyText}>
            <FiClipboard />
          </button>
          <button onClick={handleCopyLink}>
            <FiShare2 />
          </button>
        </div>
      </header>
      <textarea value={text} onChange={handleTextChange} />
    </Container>
  );
}
