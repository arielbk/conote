import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import uid from "uid";

const Container = styled.div`
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
  }
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 24px;
  color: #777;
`;

function Welcome() {
  const history = useHistory();

  const handleCreateNote = () => {
    const id = uid(6);
    history.push(`/note/${id}`);
  };

  return (
    <Container>
      <header>
        <h1>conote</h1>
      </header>
      <StyledButton onClick={handleCreateNote}>Create a note</StyledButton>
    </Container>
  );
}

export default Welcome;
