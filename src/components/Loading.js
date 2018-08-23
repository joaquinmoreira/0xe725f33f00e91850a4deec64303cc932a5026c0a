import styled from "styled-components";

const Loading = styled.div`
  display: block;
  margin: 0 auto;
  width: 64px;
  height: 64px;

  &::after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px auto;
    border-radius: 50%;
    border: ${({ theme }) => `5px solid ${theme.colors.fg.accent}`};
    border-color: ${({ theme }) =>
      `${theme.colors.fg.accent} transparent
      ${theme.colors.fg.accent} transparent`};
    animation: ring 1.2s linear infinite;
  }

  @keyframes ring {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
