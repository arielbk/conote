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
  width: 212px;
  transition: 0.3s;
  :focus {
    outline-color: #555;
  }
  :hover {
    color: #555;
  }
`;

const StyledInput = styled.input`
  display: block;
  text-align: center;
  margin: 1rem auto;
  padding: 1rem 2rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 24px;
  color: #777;
  width: 212px;
  :placeholder {
    color: #777;
  }
  :focus {
    outline-color: #555;
  }
  :placeholder:hover {
    color: #555;
  }
`;

function Welcome() {
  const history = useHistory();
  const [codeInput, setCodeInput] = useState("");

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
      <StyledForm onSubmit={handleJoinNote}>
        <StyledButton onClick={handleCreateNote}>Create a note</StyledButton>
        <StyledInput
          placeholder="Note code"
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          onBlur={(e) => setCodeInput("")}
        />
      </StyledForm>
      <Footer />
    </Container>
  );
}

export default Welcome;
