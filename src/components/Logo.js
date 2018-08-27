import styled from "styled-components";

const Logo = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.fg.accent};

  & > a {
    text-decoration: none;

    &:hover,
    &:active,
    &:visited,
    &:focus {
      color: ${({ theme }) => theme.colors.fg.accent};
    }
  }
`;

export default Logo;
