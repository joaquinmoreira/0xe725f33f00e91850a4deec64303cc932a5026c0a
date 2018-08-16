import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Ethereum } from "styled-icons/fa-brands";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 48px;
  margin-bottom: 20px;
  margin-top: 40px;
  line-height: 50px;
  text-align: center;
`;

const TagLine = styled.h2`
  font-weight: normal;
  font-size: 24px;
  margin-top: 0;
  margin-bottom: 120px;
  text-align: center;

  & > svg {
    height: 40px;
    vertical-align: middle;
  }
`;

const CTA = styled.p`
  font-size: 20px;

  & > a {
    color: ${({ theme }) => theme.colors.fg.accent};
    font-weight: bold;
    font-size: 130%;
    text-decoration: underline;

    &:hover {
      opacity: 0.8;
    }

    &:visited {
      color: ${({ theme }) => theme.colors.fg.accent};
    }
  }
`;

const Em = styled.span`
  color: ${({ theme }) => theme.colors.fg.accent};
`;

const Landing = () => (
  <Container>
    <Title>
      Proof of <Em>Existence</Em>
    </Title>
    <TagLine>
      Check of ownership and existence of files using <Ethereum />
    </TagLine>
    <CTA>
      <Link to="/upload">Upload a file</Link>
      &nbsp;to get started!
    </CTA>
  </Container>
);

export default Landing;
