import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Ethereum } from "styled-icons/fa-brands";
import Layout from "../Layout";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 48px;
  line-height: 50px;
  text-align: center;
`;

const TagLine = styled.h2`
  font-weight: normal;
  font-size: 24px;
  text-align: center;

  & > svg {
    height: 40px;
    vertical-align: middle;
  }
`;

const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: inherit;
`;

const CTA = styled.p`
  font-size: ${({ primary }) => (primary ? "20px" : "16px")};

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

const Or = styled.p`
  margin: 0;
  font-size: 20px;
  font-style: italic;
`;

const Em = styled.span`
  color: ${({ theme }) => theme.colors.fg.accent};
`;

const Landing = () => (
  <Layout>
    <Container>
      <Title>
        Proof of <Em>Existence</Em>
      </Title>
      <TagLine>
        Check of ownership and existence of files using <Ethereum />
      </TagLine>
      <CTAContainer>
        <CTA primary>
          <Link to="/upload">Upload a file</Link>
          &nbsp;to get started!
        </CTA>
        <Or>or</Or>
        <CTA>
          <Link to="/list">List</Link>
          &nbsp;your files
        </CTA>
      </CTAContainer>
    </Container>
  </Layout>
);

export default Landing;
