import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Header from "./Header";

export const Container = styled.div`
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.fg.default};
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.default};
  height: 100%;

  & > *,
  & > *::before,
  & > *::after {
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.fonts.default};
  }
`;

const Content = styled.div`
  height: 100%;
  overflow: hidden;
  padding: 40px;
`;

const Layout = ({ children }) => (
  <Container>
    <Header />
    <Content>{children}</Content>
  </Container>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
