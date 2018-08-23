import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Logo from "../Logo";
import { Container } from "../Layout";

const ERROR_TYPES = {
  NOT_FOUND: "NOT_FOUND",
  MISSING_WEB3: "MISSING_WEB3",
  METAMASK_LOCKED: "METAMASK_LOCKED",
  GENERIC: "GENERIC"
};

const StyledContainer = Container.extend`
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${({ theme }) => theme.colors.fg.accent};
  padding: 100px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.bg.default};
  text-align: center;

  & > * {
    margin-bottom: 40px;
  }
`;

const BigLogo = Logo.extend`
  font-size: 80px;
  color: ${({ theme }) => theme.colors.bg.default};
`;

const ErrorPage = ({ type }) => (
  <StyledContainer>
    <BigLogo>Pruf</BigLogo>
    <p>
      {(() => {
        if (type === ERROR_TYPES.NOT_FOUND) {
          return <Fragment>Page Not Found.</Fragment>;
        } else if (type === ERROR_TYPES.MISSING_WEB3) {
          return (
            <Fragment>
              This page needs <strong>Web3</strong> but is not supported on this
              browser, please use a browser with built-in Web3 support or
              install <strong>Metamask</strong>.
            </Fragment>
          );
        } else if (type === ERROR_TYPES.METAMASK_LOCKED) {
          return <Fragment>Ensure Metamask is unlocked.</Fragment>;
        } else if (type === ERROR_TYPES.GENERIC) {
          return <Fragment>Oops! Something went wrong.</Fragment>;
        }
      })()}
    </p>
  </StyledContainer>
);

ErrorPage.propTypes = {
  type: PropTypes.string.isRequired
};

export { ERROR_TYPES };
export default ErrorPage;
