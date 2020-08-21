import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import uid from "uid";
import Footer from "./Footer";

const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-weight: 300;
      font-size: 52px;
      color: #555;
      margin: 1.5rem 0;
    }
  }
`;

const StyledForm = styled.form`
  margin-bottom: 5rem;
`;

const StyledButton = styled.button`
  margin: 1rem 0;
  padding: 1rem 2rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 24px;
  color: #777;
  min-width: 212px;
  width: 38%;
  transition: 0.3s;
  :focus {
    outline-color: #555;
  }
  :hover {
    color: #555;
    cursor: pointer;
  }
`;

const StyledInput = styled.input<{ isFocused: boolean; isHover: boolean }>`
  display: block;
  text-align: ${(props) => (props.isFocused ? "left" : "center")};
  margin: 1rem auto;
  padding: 1rem 2rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 24px;
  color: #555;
  min-width: 212px;
  width: 38%;
  -webkit-appearance: none;
  outline-color: #555;
  transition: 0.3s;
  :hover {
    cursor: pointer;
  }
  &::placeholder {
    color: ${(props) => {
      if (props.isFocused) return "#eee";
      if (props.isHover) return "#555";
      return "#777";
    }};
  }
`;

function Welcome() {
  const history = useHistory();
  const [codeInput, setCodeInput] = useState("");
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);
  const [isInputHover, setIsInputHover] = useState<boolean>(false);

  const handleCreateNote = () => {
    const id = uid(6);
    history.push(`/note/${id}`);
  };
  const handleJoinNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/note/${codeInput}`);
  };

  return (
    <Container>
      <header>
        <h1>conote</h1>
      </header>
      <StyledForm data-cy="code-form" onSubmit={handleJoinNote}>
        <StyledButton
          data-cy="create-button"
          onClick={handleCreateNote}
          type="button"
        >
          Create a note
        </StyledButton>
        <StyledInput
          data-cy="code-input"
          placeholder="Note code"
          value={codeInput}
          isFocused={isInputFocus}
          isHover={isInputHover}
          onChange={(e) => setCodeInput(e.target.value)}
          onFocus={(e) => setIsInputFocus(true)}
          onBlur={(e) => {
            setCodeInput("");
            setIsInputFocus(false);
          }}
          onMouseEnter={(e) => setIsInputHover(true)}
          onMouseLeave={(e) => setIsInputHover(false)}
        />
      </StyledForm>
      <Footer />
    </Container>
  );
}

export default Welcome;
