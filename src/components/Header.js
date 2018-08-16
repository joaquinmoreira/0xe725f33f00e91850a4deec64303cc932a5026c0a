import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.header`
  height: 50px;
  background: ${({ theme }) => theme.colors.bg.secondary};
  display: flex;
  width: 100vw;
  padding: 20px;
  align-items: center;
`;

const Logo = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.fg.accent};

  & > a {
    text-decoration: none;

    &:hover,
    &:active,
    &:visited {
      color: ${({ theme }) => theme.colors.fg.accent};
    }
  }
`;

const Nav = styled.ul`
  margin-left: auto;
  list-style-type: none;
  font-size: 18px;

  & > li {
    border: 0;
    display: inline;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Header = ({ loggedIn }) => (
  <Container>
    <Logo>
      <Link to="/">Pruf</Link>
    </Logo>
    <Nav>
      <li>{loggedIn ? "Logout" : "Sign in"}</li>
    </Nav>
  </Container>
);

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

export default Header;
