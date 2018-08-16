import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Header from "./Header";

const Container = styled.div`
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.fg.default};
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.default};

  & > *,
  & > *::before,
  & > *::after {
    -webkit-font-smoothing: antialiased;
    box-sizing: inherit;
    font-family: ${({ theme }) => theme.fonts.default};
  }
`;

const Content = styled.div`
  height: 100%;
  padding: 40px;
`;

const Layout = ({ loggedIn, children }) => (
  <Container>
    <Header loggedIn={loggedIn} />
    <Content>{children}</Content>
  </Container>
);

Layout.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default Layout;
