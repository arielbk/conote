import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  text-align: left;
  margin-top: 40px;
  font-size: 1.2rem;
  color: #ddd;
  position: relative;
  font-weight: 200;

  a {
    color: #ddd;
    display: inline-block;
    position: absolute;
    right: 0;
    transition: 0.3s;
    &:hover {
      color: #555;
      text-decoration: none;
    }
  }
`;

export default function Footer() {
  return (
    <Container>
      <a href="https://arielbk.com">arielbk.com</a>
    </Container>
  );
}
