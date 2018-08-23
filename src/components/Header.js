import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Container = styled.header`
  height: 50px;
  background: ${({ theme }) => theme.colors.bg.secondary};
  display: flex;
  width: 100vw;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const Header = () => (
  <Container>
    <Logo>
      <Link to="/">Pruf</Link>
    </Logo>
  </Container>
);

export default Header;
